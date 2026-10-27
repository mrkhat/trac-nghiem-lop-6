/* ============================================================
   GIONG-DOC.JS — Ô chọn giọng đọc dùng chung cho mọi môn
   (nguyên tắc một nguồn duy nhất: KHÔNG copy code này vào
   từng trang; trang nào cần chỉ khai báo cấu hình + nạp file).

   CÁCH DÙNG (trang khai báo TRƯỚC khi nạp script này, giống
   mẫu window.NAV_DATA của đợt menu):
     <script>
       window.GIONG_DOC = {
         langs: ['en-GB', 'en-US'],   // ngôn ngữ ưu tiên, theo thứ tự
         key: 'tienganh_voice',       // key localStorage riêng từng môn
         mount: '.viewctl',           // selector neo (lấy phần tử ĐẦU TIÊN khớp)
         mountMode: 'after',          // 'after' | 'before' | 'inside'
         label: '🔊 Giọng đọc:'       // nhãn hiển thị trước ô select
       };
     </script>
     <script src="../assets/giong-doc.js"></script>

   Hành vi:
   - Nạp giọng qua speechSynthesis.getVoices() và BẮT BUỘC nghe
     sự kiện voiceschanged (Chrome lúc đầu thường trả danh sách
     rỗng, giọng chỉ về sau khi voiceschanged bắn).
   - Chỉ liệt kê giọng khớp ngôn ngữ trong `langs` (so theo tiền tố,
     'en_GB' coi như 'en-GB'); giọng khớp mục langs càng sớm càng
     đứng trước; giọng cùng gốc ngôn ngữ nhưng không khớp mục nào
     (vd en-AU khi langs là en-GB/en-US) xếp cuối làm dự phòng.
   - Lựa chọn nhớ vào localStorage theo `key` từng môn, nên đổi ở
     trang này sang trang khác cùng môn vẫn nhớ (index + quiz của
     Tiếng Anh dùng chung key 'tienganh_voice').
   - Giọng đã chọn không còn trên máy -> tự fallback giọng mặc định
     (giọng đầu tiên theo thứ tự ưu tiên), KHÔNG xóa key đã lưu
     (giọng có thể chỉ tạm vắng khi danh sách chưa nạp xong).
   - Máy không có giọng phù hợp: ô select hiện 1 mục ghi chú, kèm
     dòng ghi chú nhẹ; hàm đọc vẫn chạy bằng giọng mặc định của
     trình duyệt (không kẹt, không lỗi).
   - Tự vẽ 1 ô select + inject style tối thiểu scoped cho chính
     select đó (class .giong-*) nên chạy được cả trang không nạp
     common.css (vd quiz.html). Mỗi trang chỉ vẽ đúng 1 ô: nếu đã
     có .giong-select thì không vẽ thêm.
   - Tốc độ đọc KHÔNG thuộc file này: trang gọi truyền rate vào
     từng lần đọc (xem API dưới), nên ô tốc độ riêng của trang
     (vd .rb-rate của Ngữ văn) vẫn giữ nguyên vai trò của nó.

   API dùng chung (window.GiongDoc):
   - GiongDoc.config            cấu hình đã chốt của trang
   - GiongDoc.getVoices()       danh sách giọng đã lọc + sắp xếp
   - GiongDoc.getVoice()        giọng đang chọn (đã fallback mặc định)
   - GiongDoc.getSelectedValue() giá trị voiceURI đang lưu (có thể null)
   - GiongDoc.makeUtterance(text, {rate, lang, onend, onerror})
                                tạo SpeechSynthesisUtterance đã gắn
                                giọng + ngôn ngữ, CHƯA đọc, CHƯA cancel
                                -> dùng khi trang cần tự điều khiển
                                speak/cancel/onend (vd quiz, nguvan).
   - GiongDoc.applyVoice(utt, {lang})  gắn giọng vào utterance có sẵn
   - GiongDoc.speak(text, {rate, lang, onend, onerror})
                                đọc ngay (cancel câu đang đọc rồi mới
                                đọc); trả về utterance, hoặc null nếu
                                không đọc được. Trang chỉ cần nghe mẫu
                                đơn giản thì dùng hàm này là đủ.
   - GiongDoc.onReady(cb)       cb chạy khi danh sách giọng đã về
                                (gọi ngay nếu đã có giọng).
   - GiongDoc.refresh()         nạp lại danh sách + vẽ lại ô select.

   ------------------------------------------------------------
   CÁCH NỐI CHO NGỮ VĂN (follow-up, KHÔNG đổi interface trên):
   1. Trước script này, khai báo:
        window.GIONG_DOC = {
          langs: ['vi-VN', 'vi'],
          key: 'nguvan_voice',
          mount: '.rb-head',        // hoặc neo phù hợp của trang
          mountMode: 'after',
          label: '🔊 Giọng đọc bài:'
        };
      (mount dùng querySelector nên chỉ gắn sau phần tử ĐẦU TIÊN
      khớp; nếu muốn 1 ô chung cho cả trang thì neo vào phần tử
      ngoài các khối bài đọc, đừng neo vào từng .readbox — file
      này cố tình chỉ vẽ đúng 1 ô mỗi trang.)
   2. Trong khối đọc nguvan hiện tại, thay phần tự chọn viVoice
      bằng GiongDoc, giữ nguyên mọi logic khác (chia câu, watchdog,
      .rb-rate, nút dừng):
        // thay: if (viVoice) u.voice = viVoice;
        // bằng: GiongDoc.applyVoice(u, { lang: 'vi-VN' });
        // và tốc độ vẫn lấy từ readRate của trang:
        //   u.rate = readRate;  (đặt SAU applyVoice hoặc truyền
        //   rate vào makeUtterance nếu dùng makeUtterance)
      Hoặc gọn hơn cho từng câu/đoạn:
        var u = GiongDoc.makeUtterance(txt, { rate: readRate, lang: 'vi-VN' });
      rồi gắn u.onend / u.onerror như code cũ và synth.speak(u)
      (KHÔNG dùng GiongDoc.speak ở đây vì nó cancel câu đang đọc).
   3. Ghi chú "máy chưa có giọng tiếng Việt" của nguvan giữ nguyên
      logic hiển thị, chỉ đổi nguồn kiểm tra: có giọng phù hợp hay
      không thì hỏi GiongDoc.getVoices().length > 0 thay vì viVoice.
   4. Key 'nguvan_voice' tách biệt 'tienganh_voice' nên 2 môn nhớ
      giọng riêng, không lẫn nhau.
   ============================================================ */
(function () {
  'use strict';
  if (window.GiongDoc) return; /* nạp 2 lần cũng chỉ chạy 1 lần */
  var cfgRaw = window.GIONG_DOC || {};
  var config = {
    langs: (cfgRaw.langs && cfgRaw.langs.length) ? cfgRaw.langs.slice() : ['en-GB', 'en-US'],
    key: cfgRaw.key || 'giong_doc_voice',
    mount: cfgRaw.mount || null,
    mountMode: cfgRaw.mountMode || 'after',
    label: cfgRaw.label || '🔊 Giọng đọc:'
  };
  /* Giá trị đã lưu của user; null = chưa chọn bao giờ. Giữ riêng
     khỏi select để lần voiceschanged nạp lại vẫn khôi phục được. */
  var savedValue = null;
  try { savedValue = window.localStorage.getItem(config.key); } catch (e) { savedValue = null; }
  if (savedValue === '') savedValue = null;

  var voicesAll = [];   /* toàn bộ giọng máy trả về */
  var voicesFit = [];   /* giọng đã lọc + sắp xếp theo langs */
  var selectEl = null, noteEl = null, styleDone = false;
  var readyCbs = [], readyFired = false;

  function normLang(s) {
    return String(s || '').replace(/_/g, '-').toLowerCase();
  }
  function baseLang(s) {
    var n = normLang(s);
    return n.split('-')[0];
  }
  /* Điểm ưu tiên: khớp mục langs càng sớm càng nhỏ; giọng cùng gốc
     (vd en-AU) nhưng không khớp mục nào -> xếp sau tất cả các mục. */
  function scoreOf(voice) {
    var vl = normLang(voice.lang);
    for (var i = 0; i < config.langs.length; i++) {
      var e = normLang(config.langs[i]);
      if (vl === e || vl.indexOf(e + '-') === 0) return i;
    }
    var base = baseLang(config.langs[0]);
    if (vl === base || vl.indexOf(base + '-') === 0) return config.langs.length;
    return -1; /* không khớp ngôn ngữ -> loại */
  }
  function voiceValue(v) {
    return v.voiceURI || (v.name + '|' + v.lang);
  }
  function refreshVoices() {
    var synth = window.speechSynthesis;
    if (!synth || typeof synth.getVoices !== 'function') { voicesAll = []; voicesFit = []; }
    else {
      try { voicesAll = synth.getVoices() || []; } catch (e) { voicesAll = []; }
      var scored = [];
      for (var i = 0; i < voicesAll.length; i++) {
        var sc = scoreOf(voicesAll[i]);
        if (sc >= 0) scored.push({ v: voicesAll[i], sc: sc });
      }
      scored.sort(function (a, b) {
        if (a.sc !== b.sc) return a.sc - b.sc;
        var na = String(a.v.name || ''), nb = String(b.v.name || '');
        return na < nb ? -1 : (na > nb ? 1 : 0);
      });
      voicesFit = scored.map(function (x) { return x.v; });
    }
    renderSelect();
    if (voicesFit.length && !readyFired) {
      readyFired = true;
      var cbs = readyCbs; readyCbs = [];
      cbs.forEach(function (cb) { try { cb(); } catch (e) {} });
    }
  }
  function defaultVoice() {
    return voicesFit.length ? voicesFit[0] : null;
  }
  function findByValue(val) {
    if (!val) return null;
    for (var i = 0; i < voicesFit.length; i++) {
      if (voiceValue(voicesFit[i]) === val) return voicesFit[i];
    }
    return null;
  }
  function currentVoice() {
    /* Ưu tiên giọng user đã chọn; không còn thì fallback mặc định. */
    return findByValue(savedValue) || defaultVoice();
  }
  function injectStyle() {
    if (styleDone || !document.head) return;
    var st = document.createElement('style');
    st.setAttribute('data-giong-doc', '1');
    st.textContent =
      '.giong-wrap{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:10px 0}' +
      '.giong-label{font-size:16px;font-weight:600;color:#37474f}' +
      '.giong-select{min-height:44px;padding:10px 12px;border-radius:8px;border:1.5px solid #b0bec5;background:#fff;font-size:16px;font-family:inherit;max-width:100%;cursor:pointer}' +
      '.giong-select:disabled{opacity:.7;cursor:default}' +
      '.giong-note{font-size:14px;color:#78909c}';
    document.head.appendChild(st);
    styleDone = true;
  }
  function mountWrap(wrap) {
    var anchor = null;
    if (config.mount) {
      try { anchor = document.querySelector(config.mount); } catch (e) { anchor = null; }
    }
    if (!anchor) { /* không tìm được neo: để đầu trang, vẫn thấy được */
      if (document.body) document.body.insertBefore(wrap, document.body.firstChild);
      return;
    }
    if (config.mountMode === 'inside') anchor.appendChild(wrap);
    else if (config.mountMode === 'before') anchor.parentNode.insertBefore(wrap, anchor);
    else if (anchor.parentNode) anchor.parentNode.insertBefore(wrap, anchor.nextSibling);
    else anchor.appendChild(wrap);
  }
  function ensureSelect() {
    var existing = document.querySelector('.giong-select');
    if (existing) { selectEl = existing; return false; }
    injectStyle();
    var wrap = document.createElement('div');
    wrap.className = 'giong-wrap';
    var label = document.createElement('label');
    label.className = 'giong-label';
    label.textContent = config.label;
    var sel = document.createElement('select');
    sel.className = 'giong-select';
    sel.setAttribute('aria-label', config.label);
    label.htmlFor = sel.id = 'giong-select';
    noteEl = document.createElement('span');
    noteEl.className = 'giong-note';
    noteEl.hidden = true;
    wrap.appendChild(label);
    wrap.appendChild(sel);
    wrap.appendChild(noteEl);
    mountWrap(wrap);
    selectEl = sel;
    sel.addEventListener('change', function () {
      savedValue = sel.value || null;
      try {
        if (savedValue) window.localStorage.setItem(config.key, savedValue);
        else window.localStorage.removeItem(config.key);
      } catch (e) {}
    });
    return true;
  }
  function renderSelect() {
    if (!document.body) return;
    ensureSelect();
    if (!selectEl) return;
    var cur = currentVoice();
    var curVal = cur ? voiceValue(cur) : '';
    if (!window.speechSynthesis) {
      selectEl.innerHTML = '';
      var o0 = document.createElement('option');
      o0.textContent = 'Thiết bị không hỗ trợ đọc bằng giọng nói';
      o0.disabled = true; o0.selected = true;
      selectEl.appendChild(o0);
      selectEl.disabled = true;
      if (noteEl) { noteEl.textContent = ''; noteEl.hidden = true; }
      return;
    }
    selectEl.disabled = false;
    if (!voicesFit.length) {
      selectEl.innerHTML = '';
      var o1 = document.createElement('option');
      o1.textContent = 'Chưa có giọng phù hợp — đang dùng giọng mặc định';
      o1.disabled = true; o1.selected = true;
      selectEl.appendChild(o1);
      selectEl.disabled = true;
      if (noteEl) {
        noteEl.textContent = 'Máy này chưa có giọng ' + config.langs[0] +
          ' nên đang đọc bằng giọng mặc định của máy.';
        noteEl.hidden = false;
      }
      return;
    }
    if (noteEl) { noteEl.textContent = ''; noteEl.hidden = true; }
    /* Vẽ lại options nhưng giữ lựa chọn hiện tại (kẻo voiceschanged
       bắn giữa chừng làm mất lựa chọn của user). */
    var prev = selectEl.value;
    selectEl.innerHTML = '';
    voicesFit.forEach(function (v) {
      var o = document.createElement('option');
      o.value = voiceValue(v);
      o.textContent = v.name + ' (' + v.lang + ')';
      selectEl.appendChild(o);
    });
    var want = findByValue(savedValue) ? savedValue : (findByValue(prev) ? prev : curVal);
    selectEl.value = want;
    if (!selectEl.value && curVal) selectEl.value = curVal;
    /* Đồng bộ savedValue với giọng thực tế đang dùng khi chưa có lựa
       chọn nào (lần đầu): lần đọc sau dùng đúng giọng đang hiện. */
    if (!savedValue && cur) savedValue = voiceValue(cur);
  }
  function applyVoice(utt, opts) {
    opts = opts || {};
    var v = null;
    if (opts.voice) v = opts.voice;
    else v = currentVoice();
    if (v) {
      try { utt.voice = v; } catch (e) {}
      if (!opts.lang) {
        try { utt.lang = v.lang; } catch (e) {}
      }
    }
    if (opts.lang) {
      try { utt.lang = opts.lang; } catch (e) {}
    }
    return utt;
  }
  function makeUtterance(text, opts) {
    opts = opts || {};
    if (typeof SpeechSynthesisUtterance === 'undefined') return null;
    var u = new SpeechSynthesisUtterance(text);
    if (typeof opts.rate === 'number') u.rate = opts.rate;
    if (opts.pitch !== undefined) u.pitch = opts.pitch;
    if (opts.volume !== undefined) u.volume = opts.volume;
    applyVoice(u, opts);
    if (opts.onend) u.onend = opts.onend;
    if (opts.onerror) u.onerror = opts.onerror;
    return u;
  }
  function speak(text, opts) {
    opts = opts || {};
    try {
      if (!window.speechSynthesis) return null;
      var u = makeUtterance(text, opts);
      if (!u) return null;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
      return u;
    } catch (e) { return null; }
  }
  var api = {
    config: config,
    getVoices: function () { return voicesFit.slice(); },
    getAllVoices: function () { return voicesAll.slice(); },
    getVoice: currentVoice,
    getSelectedValue: function () { return savedValue; },
    makeUtterance: makeUtterance,
    applyVoice: applyVoice,
    speak: speak,
    refresh: refreshVoices,
    onReady: function (cb) {
      if (readyFired || voicesFit.length) { try { cb(); } catch (e) {} }
      else readyCbs.push(cb);
    }
  };
  window.GiongDoc = api;
  /* Nạp giọng: gọi getVoices() ngay để Chrome bắt đầu nạp, rồi nghe
     voiceschanged để vẽ lại khi danh sách về (lúc đầu hay rỗng). */
  function bindVoicesChanged() {
    var synth = window.speechSynthesis;
    if (!synth) return;
    if (typeof synth.addEventListener === 'function') {
      synth.addEventListener('voiceschanged', refreshVoices);
    } else if ('onvoiceschanged' in synth) {
      var prev = synth.onvoiceschanged;
      synth.onvoiceschanged = function () {
        try { if (typeof prev === 'function') prev(); } catch (e) {}
        refreshVoices();
      };
    }
  }
  bindVoicesChanged();
  refreshVoices();
  /* Script có thể chạy trước khi <body> parse xong (khi trang đặt
     script ngay sau neo ở đầu trang): đợi DOM sẵn rồi vẽ lại 1 lần. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { renderSelect(); });
  }
})();
