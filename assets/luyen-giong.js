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
  function danhGia(mau, noi){
    var t = norm(mau).split(' ').filter(Boolean);
    var n = norm(noi).split(' ').filter(Boolean);
    var con = n.slice(), dung = [], sai = [];
    t.forEach(function(w){
      var i = con.indexOf(w);
      if(i >= 0){ dung.push(w); con.splice(i, 1); } else sai.push(w);
    });
    var pct = t.length ? Math.round(dung.length * 100 / t.length) : 0;
    var sao = pct === 100 ? 3 : (pct >= 70 ? 2 : (dung.length > 0 ? 1 : 0));
    return {tong: t.length, dung: dung.length, sai: sai, pct: pct, sao: sao};
  }
  function hoTro(){
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
  function nghe(mau, cb){
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){ cb('unsupported'); return; }
    var done = false, r;
    function fin(err, txt){
      if(done) return; done = true;
      try{ r.stop(); }catch(e){}
      cb(err, txt);
    }
    try{
      r = new SR();
      r.lang = 'en-US'; r.continuous = false; r.interimResults = false; r.maxAlternatives = 1;
      r.onresult = function(e){
        var t = '';
        try{ t = e.results[0][0].transcript; }catch(err){}
        fin(null, t);
      };
      r.onerror = function(e){ fin((e && e.error) || 'error'); };
      r.onnomatch = function(){ fin('nomatch'); };
      r.onend = function(){ fin('nomatch'); };
      r.start();
    }catch(err){ fin('error'); }
  }
  function hienKetQua(box, mau, transcript){
    var r = danhGia(mau, transcript);
    var sao = r.sao > 0 ? '⭐'.repeat(r.sao) : '💪';
    var msg = r.sao === 3 ? 'Đúng hết! Giỏi quá!'
      : r.sao === 2 ? 'Gần đúng rồi! Nói lại từ chưa đúng nhé:'
      : r.sao === 1 ? 'Được một phần rồi, cố lên! Nói lại từ:'
      : 'Chưa đúng, nghe mẫu rồi nói lại nhé:';
    var miss = r.sai.length ? ' <b style="color:#c62828">' + esc(r.sai.join(', ')) + '</b>' : '';
    box.innerHTML = '<span>' + sao + ' ' + msg + '</span>' + miss
      + '<span style="color:#666"> (máy nghe: “' + esc(transcript) + '”)</span>';
  }
  document.addEventListener('click', function(e){
    var b = (e.target && e.target.closest) ? e.target.closest('[data-mic]') : null;
    if(!b) return;
    var scope = b.closest('.fc-face') || b.closest('.vcard') || b.parentElement;
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
  window.LuyenGiong = {danhGia: danhGia, hoTro: hoTro, nghe: nghe, norm: norm};
})();
