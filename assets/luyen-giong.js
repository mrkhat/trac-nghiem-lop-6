/* ============================================================
   LUYEN-GIONG.JS — Luyện nói + chấm phát âm cho trang Tiếng Anh
   - Chỉ dùng Web Speech API có sẵn trong trình duyệt, KHÔNG cần
     máy chủ, KHÔNG cần API key, KHÔNG gửi dữ liệu về trang quiz.
   - Cách chấm: so từng từ trong câu mẫu với câu máy nghe được
     (không phân biệt hoa/thường, bỏ dấu câu). 3 sao = đúng hết,
     2 sao = đúng >= 70%, 1 sao = đúng được 1 phần, 0 sao = chưa đúng.
   - Trình duyệt không hỗ trợ nhận diện: nút vẫn bấm được nhưng chỉ
     hiện lời nhắn, không chấm (không làm hỏng trang).
   - Nút 🎤 dùng class .spk để bộ xử lý lật thẻ bỏ qua (không lật
     thẻ khi bấm mic), nhưng KHÔNG mang data-speak nên không kích
     hoạt đọc mẫu.
   - Từ đọc sai hiện kèm nút 🔊 (class .spk, data-speak = đúng từ
     đó): bấm vào chỉ đọc đúng từ đó để bé nghe rồi nói lại.
   ============================================================ */
(function(){
  function norm(s){
    // XÓA dấu nháy (don't -> dont, Anna's -> annas) rồi mới tách từ,
    // để bé không bị trừ điểm oan chỉ vì máy nghe không ghi dấu nháy.
    // (Không thay nháy bằng khoảng trắng vì sẽ tách don't thành don + t.)
    return String(s || '').toLowerCase().replace(/[’‘']/g, '')
      .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function esc(s){
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* Biến thể Anh-Anh/Anh-Mỹ: máy nhận diện đặt en-US nên hay nghe
     "maths" thành "math", "favourite" thành "favorite"... — bé đọc đúng
     vẫn bị trừ oan. Chấp nhận cả 2 dạng để phần nghe và phần đọc khớp
     nhau (áp cho cả luyện từ và luyện câu, vì câu ví dụ cũng có các
     từ này: "Maths is my favourite subject.", "...centre of the city."). */
  var BIEN_THE = {maths:['math'], math:['maths'],
    programme:['program'], program:['programme'],
    recognise:['recognize'], recognize:['recognise'],
    favourite:['favorite'], favorite:['favourite'],
    centre:['center'], center:['centre']};
  function danhGia(mau, noi){
    var t = norm(mau).split(' ').filter(Boolean);
    var n = norm(noi).split(' ').filter(Boolean);
    var con = n.slice(), dung = [], sai = [];
    t.forEach(function(w){
      var i = con.indexOf(w), k;
      if(i < 0 && BIEN_THE[w]){
        for(k = 0; k < BIEN_THE[w].length; k++){ i = con.indexOf(BIEN_THE[w][k]); if(i >= 0) break; }
      }
      if(i >= 0){ dung.push(w); con.splice(i, 1); } else sai.push(w);
    });
    var pct = t.length ? Math.round(dung.length * 100 / t.length) : 0;
    var sao = pct === 100 ? 3 : (pct >= 70 ? 2 : (dung.length > 0 ? 1 : 0));
    return {tong: t.length, dung: dung.length, sai: sai, pct: pct, sao: sao};
  }
  function hoTro(){
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
  /* Luyện câu: Chrome tự ngắt khi bé ngừng nói chừng 1 giây rồi chấm
     ngay phần đã nghe được, nên câu dài hay bị chấm thiếu. Sửa bằng
     cách: câu (mẫu > 1 từ) thì nghe liên tục + nhận kết quả tạm, chỉ
     chấm khi bé im lặng đủ 3 giây hoặc quá 30 giây; luyện từ (1 từ)
     giữ nguyên chấm ngay như cũ. */
  function nghe(mau, cb){
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){ cb('unsupported'); return; }
    var done = false, r;
    var laCau = norm(mau).split(' ').filter(Boolean).length > 1;
    var cuoi = '', tam = '', lanCuoi = 0, henGio = null, batDau = Date.now();
    function fin(err, txt){
      if(done) return; done = true;
      if(henGio) clearInterval(henGio);
      try{ r.stop(); }catch(e){}
      cb(err, txt);
    }
    try{
      r = new SR();
      r.lang = 'en-US'; r.continuous = laCau; r.interimResults = laCau; r.maxAlternatives = 1;
      r.onresult = function(e){
        var i, res;
        if(!laCau){
          var t = '';
          try{ t = e.results[0][0].transcript; }catch(err){}
          fin(null, t);
          return;
        }
        for(i = e.resultIndex; i < e.results.length; i++){
          res = e.results[i];
          try{
            if(res.isFinal){ cuoi += (cuoi ? ' ' : '') + res[0].transcript; tam = ''; }
            else tam = res[0].transcript;
          }catch(err){}
        }
        lanCuoi = Date.now();
      };
      r.onerror = function(e){ fin((e && e.error) || 'error'); };
      r.onnomatch = function(){ if(!laCau) fin('nomatch'); };
      r.onend = function(){
        if(laCau){
          var txt = (cuoi + ' ' + tam).trim();
          fin(txt ? null : 'nomatch', txt);
        } else fin('nomatch');
      };
      r.start();
      if(laCau){
        lanCuoi = Date.now();
        henGio = setInterval(function(){
          var now = Date.now();
          var txt = (cuoi + ' ' + tam).trim();
          if(txt && now - lanCuoi > 3000){ fin(null, txt); }
          else if(now - batDau > 30000){ fin(txt ? null : 'nomatch', txt); }
        }, 500);
      }
    }catch(err){ fin('error'); }
  }
  /* ===== ĐÁNH DẤU "ĐÃ HOÀN THÀNH" KHI CHẤM 3 SAO =====
     - Thẻ lật (fcbox): gọi hàm đánh dấu thẻ hiện tại mà trang
       tienganh/index.html gắn lên chính .fcbox đó (setKnown cho
       thẻ hiện tại + render lại số lượng/thanh tiến trình, KHÔNG
       chuyển thẻ, KHÔNG gọi tick). render() tạo lại nội dung mặt
       thẻ nên phải tìm lại .lg-kq mới rồi mới ghi kết quả + dòng
       "✓ Đã hoàn thành" vào đó.
     - Lưới từ vựng (vcard): gắn huy hiệu .lg-done vào đúng thẻ từ
       đó và lưu từ vào localStorage key riêng 'tienganh_lg_done'
       để tải lại trang vẫn còn huy hiệu (khôi phục ở cuối file).
     - 1-2 sao: không đánh dấu gì. */
  var LG_DONE_KEY = 'tienganh_lg_done';
  function lgDoneDoc(){
    try{
      var v = JSON.parse(localStorage.getItem(LG_DONE_KEY) || '[]');
      return Array.isArray(v) ? v : [];
    }catch(e){ return []; }
  }
  function lgThemDone(tu){
    if(!tu) return;
    var arr = lgDoneDoc();
    if(arr.indexOf(tu) < 0){ arr.push(tu); try{ localStorage.setItem(LG_DONE_KEY, JSON.stringify(arr)); }catch(e){} }
  }
  function lgGanHuyHieuVcard(vcard){
    if(!vcard || vcard.querySelector('.lg-done')) return;
    var b = document.createElement('div');
    b.className = 'lg-done';
    b.style.cssText = 'color:#2e7d32;font-weight:bold;font-size:14px;margin-top:6px;text-align:center';
    b.textContent = '✓ Đã hoàn thành';
    vcard.appendChild(b);
  }
  function khoiPhucVcard(){
    var done = lgDoneDoc();
    if(!done.length) return;
    document.querySelectorAll('.vcard').forEach(function(vc){
      var w = vc.querySelector('.vword');
      if(w && done.indexOf(w.textContent.trim()) >= 0) lgGanHuyHieuVcard(vc);
    });
  }
  function hienKetQua(box, mau, transcript){
    var r = danhGia(mau, transcript);
    var face = (box && box.closest) ? box.closest('.fc-face') : null;
    var fcbox = face ? face.closest('.fcbox') : null;
    var vcard = (!fcbox && box && box.closest) ? box.closest('.vcard') : null;
    if(r.sao === 3 && fcbox && typeof fcbox.__lgMarkCurrentKnown === 'function'){
      fcbox.__lgMarkCurrentKnown();
      var moi = face.querySelector('.lg-kq');
      if(moi) box = moi;
    }
    var sao = r.sao > 0 ? '⭐'.repeat(r.sao) : '💪';
    var msg = r.sao === 3 ? 'Đúng hết! Giỏi quá!'
      : r.sao === 2 ? 'Gần đúng rồi! Nói lại từ chưa đúng nhé:'
      : r.sao === 1 ? 'Được một phần rồi, cố lên! Nói lại từ:'
      : 'Chưa đúng, nghe mẫu rồi nói lại nhé:';
    var miss = r.sai.length ? ' ' + r.sai.map(function(w){
      return '<b style="color:#c62828">' + esc(w) + '</b> <button class="spk lg-loa" data-speak="' + esc(w) + '" title="Nghe đọc đúng từ này">🔊</button>';
    }).join(', ') : '';
    box.innerHTML = '<span>' + sao + ' ' + msg + '</span>' + miss
      + '<span style="color:#666"> (máy nghe: “' + esc(transcript) + '”)</span>';
    if(r.sao === 3){
      if(fcbox){
        var dong = document.createElement('div');
        dong.className = 'lg-done';
        dong.style.cssText = 'color:#2e7d32;font-weight:bold;font-size:14px;margin-top:6px;text-align:center';
        dong.textContent = '✓ Đã hoàn thành';
        box.appendChild(dong);
      } else if(vcard){
        var wEl = vcard.querySelector('.vword');
        var tu = wEl ? wEl.textContent.trim() : '';
        if(tu){ lgThemDone(tu); lgGanHuyHieuVcard(vcard); }
      }
    }
  }
  document.addEventListener('click', function(e){
    var b = (e.target && e.target.closest) ? e.target.closest('[data-mic]') : null;
    if(!b) return;
    var scope = b.closest('.fc-face') || b.closest('.vcard') || b.closest('.mini-face') || b.closest('.qa') || b.parentElement;
    var kq = scope ? scope.querySelector('.lg-kq') : null;
    var mau = b.getAttribute('data-mic') || '';
    if(!hoTro()){
      if(kq) kq.innerHTML = '<span style="color:#b34700">Trình duyệt này chưa hỗ trợ chấm giọng nói. Bé vẫn nghe mẫu và đọc theo nhé!</span>';
      return;
    }
    var old = b.innerHTML;
    b.disabled = true; b.innerHTML = '🎙️ Đang nghe…';
    if(kq) kq.textContent = 'Bé nói đi…';
    nghe(mau, function(err, transcript){
      b.disabled = false; b.innerHTML = old;
      if(err || !transcript){
        if(kq) kq.innerHTML = '<span style="color:#b34700">Chưa nghe rõ, bé bấm mic nói lại nhé!</span>';
        return;
      }
      if(kq) hienKetQua(kq, mau, transcript);
    });
  });
  khoiPhucVcard();
  window.LuyenGiong = {danhGia: danhGia, hoTro: hoTro, nghe: nghe, norm: norm,
    hienKetQua: hienKetQua, khoiPhucDaHoanThanh: khoiPhucVcard, LG_DONE_KEY: LG_DONE_KEY};
})();
