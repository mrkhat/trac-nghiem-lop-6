/* ===== TRẠNG THÁI FLASHCARD THỐNG NHẤT + ÔN CÁCH QUÃNG (1 → 3 → 7 NGÀY) =====
   Một khóa duy nhất cho mỗi môn: <mon>_fcquiz_v1 (Toán: toan6_fcquiz_v1).
   Ba chỗ học thẻ (thẻ trong bài học, tab Ôn luyện, tab Flashcard) dùng CHUNG kho này.
   Giá trị: { "<cid>": { n: số lần thuộc liên tiếp 0–3, due: mốc thời gian (ms) cần ôn lại } }
   cid: 'f:' + id thẻ trong cards-data (flashcard), 'm:' + mã băm nội dung mặt trước
   (thẻ Nhớ nhanh), 'q:' + mã băm câu hỏi (Toán: thẻ ghi nhớ từ ngân hàng câu hỏi).
   Bấm "Đã thuộc": n tăng (tối đa 3), hẹn ôn lại sau 1 / 3 / 7 ngày theo n.
   Bấm "Chưa thuộc": n về 0, thẻ quay lại nhóm chưa thuộc ngay.
   Thẻ đã thuộc nhưng ĐÃ TỚI HẠN ôn lại được tính như chưa thuộc (xếp đầu hàng đợi). */
(function () {
  var DAY = 86400000, STEPS = [1, 3, 7];
  function hash(s) {
    s = String(s == null ? '' : s);
    var h = 5381;
    for (var i = 0; i < s.length; i++) { h = ((h << 5) + h + s.charCodeAt(i)) | 0; }
    return (h >>> 0).toString(36);
  }
  function keyFor(mon) { return mon === 'toan' ? 'toan6_fcquiz_v1' : mon + '_fcquiz_v1'; }
  function loadRaw(mon) {
    try { var o = JSON.parse(localStorage.getItem(keyFor(mon)) || '{}'); return (o && typeof o === 'object') ? o : {}; }
    catch (e) { return {}; }
  }
  function saveRaw(mon, st) { try { localStorage.setItem(keyFor(mon), JSON.stringify(st)); } catch (e) {} }
  function normFront(s) {
    s = String(s == null ? '' : s);
    if (s.indexOf('<') >= 0) { try { var d = document.createElement('div'); d.innerHTML = s; s = d.textContent || ''; } catch (e) {} }
    return s.replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function fcStore(mon) {
    /* Doc lai localStorage moi lan dung: nhieu giao dien tren cung trang dung chung
       mot kho, tranh ban sao cu ghi de tien do cua nhau. */
    function entryOf(st, cid) { var e = st[cid]; return (e && typeof e === 'object') ? e : null; }
    function isKnown(cid) { var e = entryOf(loadRaw(mon), cid); return !!(e && e.n >= 1 && e.due > Date.now()); }
    function isDue(cid) { var e = entryOf(loadRaw(mon), cid); return !!(e && e.n >= 1 && e.due <= Date.now()); }
    function setKnown(cid, ok) {
      var st = loadRaw(mon);
      var e = entryOf(st, cid) || { n: 0, due: 0 };
      if (ok) { e.n = Math.min((e.n || 0) + 1, 3); e.due = Date.now() + STEPS[e.n - 1] * DAY; }
      else { e.n = 0; e.due = Date.now(); }
      st[cid] = e; saveRaw(mon, st);
    }
    function absorb(cid) { var st = loadRaw(mon); if (!entryOf(st, cid)) { st[cid] = { n: 1, due: Date.now() + DAY }; saveRaw(mon, st); } }
    function countKnown(cids) { var st = loadRaw(mon), n = 0; cids.forEach(function (c) { var e = entryOf(st, c); if (e && e.n >= 1 && e.due > Date.now()) n++; }); return n; }
    function countDue(cids) { var st = loadRaw(mon), n = 0; cids.forEach(function (c) { var e = entryOf(st, c); if (e && e.n >= 1 && e.due <= Date.now()) n++; }); return n; }
    function clearPool(cids) { var st = loadRaw(mon); cids.forEach(function (c) { delete st[c]; }); saveRaw(mon, st); }
    return { isKnown: isKnown, isDue: isDue, setKnown: setKnown, absorb: absorb, countKnown: countKnown, countDue: countDue, clearPool: clearPool };
  }

  /* Di trú tiến độ cũ của thẻ trong bài học: <mon>_flash_v1 { id-thẻ: 1 } -> 'f:' + id. Xoá khóa cũ sau khi di trú. */
  function fcMigrateFlash(mon) {
    var st = fcStore(mon);
    [mon + '_flash_v1', mon + '_flash_v2'].forEach(function (key) {
      try {
        var old = JSON.parse(localStorage.getItem(key) || 'null');
        if (old && typeof old === 'object') {
          var isArr = Array.isArray(old);
          Object.keys(old).forEach(function (id) {
            if (!old[id]) return;
            var cid = isArr ? ('c:' + id) : (/^\d+$/.test(id) ? ('c:' + id) : ('f:' + id));
            st.absorb(cid);
          });
          localStorage.removeItem(key);
        }
      } catch (e) {}
    });
    return st;
  }

  /* Di trú tiến độ cũ của tab Ôn luyện: onluyen_<mon> { id-thẻ: 1, 'nnK': 1 }.
     nnItems = danh sách thẻ Nhớ nhanh theo ĐÚNG thứ tự cũ để ánh xạ 'nnK' -> thẻ thứ K. */
  function fcMigrateOnluyen(mon, nnItems) {
    var st = fcStore(mon);
    try {
      var old = JSON.parse(localStorage.getItem('onluyen_' + mon) || 'null');
      if (old && typeof old === 'object') {
        Object.keys(old).forEach(function (id) {
          if (!old[id]) return;
          if (id.indexOf('nn') === 0) {
            var k = parseInt(id.slice(2), 10);
            var it = (nnItems || [])[k - 1];
            if (it) st.absorb('m:' + hash(normFront(it.f != null ? it.f : it.front)));
          } else if (/^\d+$/.test(id)) st.absorb('c:' + id);
          else st.absorb('f:' + id);
        });
        localStorage.removeItem('onluyen_' + mon);
      }
    } catch (e) {}
    return st;
  }

  /* Di trú tiến độ cũ của tab Flashcard: khóa thống nhất từng lưu { vị-trí: 1 }.
     items = danh sách thẻ (đã có .cid) theo đúng thứ tự vị trí cũ. */
  function fcMigrateQuizUids(mon, items) {
    var raw = null;
    try { raw = JSON.parse(localStorage.getItem(keyFor(mon)) || 'null'); } catch (e) { raw = null; }
    if (!raw || typeof raw !== 'object') return;
    var keys = Object.keys(raw);
    var legacy = keys.length > 0 && keys.every(function (k) { return /^\d+$/.test(k) && (raw[k] === 1 || raw[k] === true); });
    if (!legacy) return;
    var st = {};
    keys.forEach(function (k) {
      var it = (items || [])[parseInt(k, 10)];
      if (it && it.cid) st[it.cid] = { n: 1, due: Date.now() + DAY };
    });
    saveRaw(mon, st);
  }

  window.fcHash = hash;
  window.fcStore = fcStore;
  window.fcMigrateFlash = fcMigrateFlash;
  window.fcMigrateOnluyen = fcMigrateOnluyen;
  window.fcMigrateQuizUids = fcMigrateQuizUids;
  window.fcNormFront = normFront;
  window.fcCidF = function (id) { return 'f:' + id; };
  window.fcCidC = function (i) { return 'c:' + i; };
  window.fcCidM = function (front) { return 'm:' + hash(normFront(front)); };
  window.fcCidQ = function (text) { return 'q:' + hash(normFront(text)); };
})();
