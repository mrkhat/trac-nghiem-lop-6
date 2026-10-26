/* ===== UX P0: gom nhom HK1/HK2 cho o chon bai + nut "Hoc tiep" =====
   - Chay tren trang hoc (index.html) cua cac mon co o .bai-sel, va trang HĐTN (nut #pickrow).
   - Gom nhom theo VI TRI option (thu tu bai trong trang), so bai HK1 lay theo muc-luc SGK:
     khtn 13, lichsu 10, dialy 24 (gom bai 0), nguvan 5, tienganh 6, gdcd 6, congnghe 9,
     tinhoc 9, nghethuat 12. Chi option KHONG phai tong ket moi dem vao chi tieu HK1.
     Option chua 'Hoc ki 1' -> nhom Hoc ki 1, chua 'Hoc ki 2' -> nhom Hoc ki 2.
     Option 'Tong ket' nhung KHONG chua 'Hoc ki' (tong ket ca nam) giu ngoai nhom, o cuoi.
     Quy tac chung cho moi mon, khong hardcode theo mon.
   - Nut "Hoc tiep" luu/khoi phuc qua localStorage <mon>_lesson (trang hoc) — trang quiz
     dung khoa rieng <mon>_quiz_lesson (xem buildLessonSel trong quiz.html).
   - Khong dung cham logic goc: chi sap xep lai option trong select, gia tri option giu nguyen,
     ham dong bo san co cua trang van chay theo value. */
(function () {
  var _parts = location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  var _last = _parts[_parts.length - 1] || '';
  var seg = /\.html?$/.test(_last) ? (_parts[_parts.length - 2] || '') : _last;
  var HK1 = { khtn: 13, lichsu: 10, dialy: 24, nguvan: 5, tienganh: 6, gdcd: 6, congnghe: 9, tinhoc: 9, nghethuat: 12 };
  var storeKey = seg + '_lesson';
  function load() { try { return localStorage.getItem(storeKey); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(storeKey, v); } catch (e) {} }
  function isTongKet(t) { return t.indexOf('Tổng kết') >= 0; }
  function resumeBtn(text, onClick, anchor) {
    if (document.querySelector('.ux-resume')) return null;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'ux-resume';
    b.textContent = '▶ Học tiếp: ' + text;
    b.style.cssText = 'display:block;margin:10px auto;padding:12px 20px;font-size:17px;font-weight:700;color:#fff;background:#2e7d32;border:none;border-radius:12px;cursor:pointer;min-height:48px;';
    b.addEventListener('click', function () { onClick(); b.remove(); });
    anchor.parentNode.insertBefore(b, anchor);
    return b;
  }
  function isHK1(t) { return t.indexOf('Học kì 1') >= 0; }
  function isHK2(t) { return t.indexOf('Học kì 2') >= 0; }
  function groupSelect(sel) {
    if (sel.dataset.uxGrouped) return;
    var opts = Array.prototype.slice.call(sel.options);
    if (opts.length < 2) return;
    var hk1 = HK1[seg];
    if (!hk1) return;
    var tail = [], main = [];
    opts.forEach(function (o) {
      if (isTongKet(o.text) && !isHK1(o.text) && !isHK2(o.text)) tail.push(o);
      else main.push(o);
    });
    var lessons = 0;
    main.forEach(function (o) { if (!isTongKet(o.text)) lessons++; });
    if (lessons <= hk1) return;
    var cur = sel.value;
    var g1 = document.createElement('optgroup'); g1.label = 'Học kì 1';
    var g2 = document.createElement('optgroup'); g2.label = 'Học kì 2';
    var seen = 0;
    main.forEach(function (o) {
      if (isHK1(o.text)) g1.appendChild(o);
      else if (isHK2(o.text)) g2.appendChild(o);
      else if (seen < hk1) { g1.appendChild(o); seen++; }
      else { g2.appendChild(o); seen++; }
    });
    sel.innerHTML = '';
    sel.appendChild(g1); sel.appendChild(g2);
    tail.forEach(function (o) { sel.appendChild(o); });
    sel.value = cur;
    sel.dataset.uxGrouped = '1';
  }
  function initBaiSel() {
    var sels = document.querySelectorAll('.bai-sel');
    if (!sels.length) return false;
    var ready = false;
    sels.forEach(function (sel) {
      if (sel.options.length > 1) { groupSelect(sel); ready = true; }
      if (!sel.dataset.uxSave) {
        sel.dataset.uxSave = '1';
        sel.addEventListener('change', function () { save(sel.value); });
      }
    });
    if (!ready) return false;
    var stored = load();
    if (stored) {
      var first = sels[0], opt = null;
      Array.prototype.forEach.call(first.options, function (o) { if (o.value === stored) opt = o; });
      if (opt && first.value !== stored) {
        resumeBtn(opt.text, function () {
          sels.forEach(function (s) { s.value = stored; s.dispatchEvent(new Event('change')); });
        }, first);
      }
    }
    return true;
  }
  function initHdtn() {
    var row = document.getElementById('pickrow');
    if (!row) return false;
    var btns = row.querySelectorAll('.pick');
    if (!btns.length) return false;
    btns.forEach(function (b) {
      if (!b.dataset.uxSave) {
        b.dataset.uxSave = '1';
        b.addEventListener('click', function () { save(b.textContent); });
      }
    });
    var stored = load();
    if (stored) {
      var target = null, current = null;
      btns.forEach(function (b) {
        if (b.textContent === stored) target = b;
        if (b.classList.contains('on')) current = b;
      });
      if (target && target !== current) {
        resumeBtn(stored, function () { target.click(); }, row);
      }
    }
    return true;
  }
  function init() { return seg === 'hdtn' ? initHdtn() : initBaiSel(); }
  var tries = 0;
  var iv = setInterval(function () { tries++; if (init() || tries > 20) clearInterval(iv); }, 300);
  document.addEventListener('DOMContentLoaded', init);
})();
