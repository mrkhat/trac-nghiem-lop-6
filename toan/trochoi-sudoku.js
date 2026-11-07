/* ===== TRO CHOI SUDOKU 4x4 (Toan 6) — file tu dung, chi can 1 container id="gameSudoku" =====
   Cach dung (nguoi tich hop them vao toan/index.html):
     <div id="gameSudoku"></div>
     <script src="trochoi-sudoku.js"></script>
     <script>TroChoiSudoku.init(document.getElementById('gameSudoku'));</script>
   - Chi Sudoku 4x4, 2 muc: De (11 o cho san, 5 o trong), Vua (8 o cho san, 8 o trong).
   - De co nghiem duy nhat: sinh luoi day dung truoc, bot dan tung so, moi lan bot chay
     bo giai kiem tra con dung 1 nghiem, khong con thi giu so do lai.
   - Khong bam gio trong luc choi, khong diem, khong xep hang, khong luu tien trinh
     (khong luu tru cuc bo). Khong go ban phim may, khong o text nhap so.
   - So sai KHONG dinh vao o (o van trong), o rung nhe + dong chu bao loi.
   - Goi y 2 nac, toi da 3 lan/van, khong dien ho.
   - In: to be KHONG co dap an (2 de/to A4); to dap an rieng cho ba me. */
(function () {
  'use strict';

  var SIZE = 4;            // chi 4x4
  var BOX = 2;             // hop 2x2
  var LEVELS = {
    de:  { label: 'Dễ', givens: 11, blanks: 5 },
    vua: { label: 'Vừa', givens: 8, blanks: 8 }
  };
  var MAX_HINTS = 3;
  var WRONG_MSG = 'Số này đã có trong hàng này rồi, em thử số khác nhé.';
  var RULES = [
    '1) Mỗi hàng ngang, mỗi cột dọc, mỗi ô vuông nhỏ — mỗi số chỉ có 1 lần.',
    '2) Bấm vào ô trống, rồi bấm số ở dưới.',
    '3) Điền hết các ô trống là thắng.'
  ];

  /* ---------- bo giai / sinh de (nghiem duy nhat) ---------- */
  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function rowOf(i) { return Math.floor(i / SIZE); }
  function colOf(i) { return i % SIZE; }
  function boxOf(i) {
    return Math.floor(rowOf(i) / BOX) * BOX + Math.floor(colOf(i) / BOX);
  }

  // Dem so nghiem cua luoi (0 = trong), dung som khi dat limit.
  function countSolutions(grid, limit) {
    var count = 0;
    var g = grid.slice();
    function usedIn(r, c, b, v) {
      for (var k = 0; k < SIZE; k++) {
        if (g[r * SIZE + k] === v) return true;
        if (g[k * SIZE + c] === v) return true;
      }
      var br = Math.floor(r / BOX) * BOX, bc = Math.floor(c / BOX) * BOX;
      for (var dr = 0; dr < BOX; dr++)
        for (var dc = 0; dc < BOX; dc++)
          if (g[(br + dr) * SIZE + bc + dc] === v) return true;
      return false;
    }
    function solve() {
      if (count >= limit) return;
      var idx = -1;
      for (var i = 0; i < SIZE * SIZE; i++) {
        if (g[i] === 0) { idx = i; break; }
      }
      if (idx === -1) { count++; return; }
      var r = rowOf(idx), c = colOf(idx);
      var nums = shuffled([1, 2, 3, 4]);
      for (var n = 0; n < nums.length; n++) {
        var v = nums[n];
        if (!usedIn(r, c, 0, v)) {
          g[idx] = v;
          solve();
          g[idx] = 0;
          if (count >= limit) return;
        }
      }
    }
    solve();
    return count;
  }

  function fullGrid() {
    var g = [];
    for (var i = 0; i < SIZE * SIZE; i++) g.push(0);
    (function fill(pos) {
      if (pos >= SIZE * SIZE) return true;
      var r = rowOf(pos), c = colOf(pos);
      var nums = shuffled([1, 2, 3, 4]);
      for (var n = 0; n < nums.length; n++) {
        var v = nums[n], ok = true;
        for (var k = 0; k < SIZE; k++) {
          if (g[r * SIZE + k] === v || g[k * SIZE + c] === v) { ok = false; break; }
        }
        if (!ok) continue;
        var br = Math.floor(r / BOX) * BOX, bc = Math.floor(c / BOX) * BOX;
        for (var dr = 0; dr < BOX && ok; dr++)
          for (var dc = 0; dc < BOX; dc++)
            if (g[(br + dr) * SIZE + bc + dc] === v) { ok = false; break; }
        if (!ok) continue;
        g[pos] = v;
        if (fill(pos + 1)) return true;
        g[pos] = 0;
      }
      return false;
    })(0);
    return g;
  }

  // Sinh 1 de: tra ve { puzzle:[16], solution:[16] } voi dung so o trong yeu cau,
  // nghiem duy nhat. Thu nhieu lan, lay ban tot nhat neu khong dat du so o trong.
  function makePuzzle(levelKey) {
    var target = LEVELS[levelKey].blanks;
    var best = null, bestBlanks = -1;
    for (var attempt = 0; attempt < 300; attempt++) {
      var sol = fullGrid();
      var p = sol.slice();
      var order = shuffled([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      var removed = 0;
      for (var k = 0; k < order.length && removed < target; k++) {
        var idx = order[k];
        var bak = p[idx];
        p[idx] = 0;
        if (countSolutions(p, 2) === 1) { removed++; }
        else { p[idx] = bak; }
      }
      if (removed > bestBlanks) {
        bestBlanks = removed;
        best = { puzzle: p.slice(), solution: sol.slice() };
      }
      if (removed === target) return best;
    }
    return best;
  }

  function givensCount(puzzle) {
    var n = 0;
    for (var i = 0; i < puzzle.length; i++) if (puzzle[i] !== 0) n++;
    return n;
  }

  /* ---------- CSS (khop khuon trang Toan: nut >=44px, chu >=16px) ---------- */
  var CSS = [
    '.sdk-wrap{max-width:480px;margin:0 auto;text-align:center}',
    '.sdk-wrap h2{font-size:22px;margin:6px 0 2px}',
    '.sdk-sub{font-size:17px;color:#37474f;margin:2px 0 8px}',
    '.sdk-levels{display:flex;gap:8px;justify-content:center;margin:6px 0 10px}',
    '.sdk-levels button{min-height:44px;padding:8px 22px;border-radius:10px;border:2px solid #90a4ae;background:#fff;color:#37474f;font-size:17px;font-weight:700;font-family:inherit;cursor:pointer}',
    '.sdk-levels button.on{background:#1565c0;border-color:#1565c0;color:#fff}',
    '.sdk-rules{text-align:left;font-size:17px;line-height:1.7;margin:4px auto 12px;max-width:450px;padding-left:22px;color:#263238}',
    '.sdk-grid{display:grid;grid-template-columns:repeat(4,1fr);width:100%;max-width:450px;margin:0 auto;border:3px solid #37474f;background:#fff}',
    '.sdk-cell{aspect-ratio:1/1;border:1px solid #bdbdbd;background:#fff;font-size:21px;font-weight:700;font-family:inherit;color:#1565c0;cursor:pointer;padding:0;line-height:1}',
    '.sdk-cell:nth-child(4n+2){border-right:3px solid #37474f}',
    '.sdk-cell:nth-child(n+5):nth-child(-n+8){border-bottom:3px solid #37474f}',
    '.sdk-cell.given{color:#616161;cursor:default}',
    '.sdk-cell.rel{background:#e3f2fd}',
    '.sdk-cell.sel{background:#fff8e1}',
    '.sdk-cell.hintcell{background:#fff3e0;box-shadow:inset 0 0 0 3px #fb8c00}',
    '.sdk-cell.shake{animation:sdkShake .35s ease}',
    '@keyframes sdkShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}50%{transform:translateX(4px)}75%{transform:translateX(-3px)}}',
    '@media(min-width:640px){.sdk-cell{font-size:24px}}',
    '.sdk-msg{min-height:26px;font-size:17px;font-weight:600;color:#37474f;margin:10px 0 6px;line-height:1.5}',
    '.sdk-keys{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:450px;margin:0 auto}',
    '.sdk-key{height:52px;font-size:22px;font-weight:700;font-family:inherit;border-radius:10px;border:2px solid #1565c0;background:#fff;color:#1565c0;cursor:pointer}',
    '.sdk-key:active{background:#e3f2fd}',
    '.sdk-key-off{height:52px;border:none;background:transparent}',
    '.sdk-keyrow{display:flex;gap:8px;max-width:450px;margin:8px auto 0}',
    '.sdk-keyrow button{flex:1;height:52px;font-size:17px;font-weight:700;font-family:inherit;border-radius:10px;border:2px solid #90a4ae;background:#fff;color:#37474f;cursor:pointer}',
    '.sdk-tools{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:14px 0 4px}',
    '.sdk-tools button{min-height:48px;padding:10px 16px;border-radius:10px;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer;border:1.5px solid #b0bec5;background:#fff;color:#263238}',
    '.sdk-tools button:disabled{opacity:.45;cursor:default}',
    '.sdk-tools .sdk-primary{background:#1565c0;border-color:#1565c0;color:#fff}',
    '.sdk-print-note{font-size:15px;color:#666;margin:4px 0 0}',
    '.sdk-win{display:none;background:#e8f5e9;border:2px solid #43a047;border-radius:12px;padding:18px;margin:14px 0;text-align:center;font-size:18px}',
    '.sdk-win.show{display:block}',
    '.sdk-win .sdk-time{font-size:17px;color:#37474f;margin:8px 0 12px}',
    '.sdk-win .sdk-tools{margin:4px 0 0}',
    /* --- to in: chi hien .print-sheet, an toan bo trang --- */
    '.print-sheet{display:none}',
    '@page{size:A4;margin:12mm}',
    '@media print{',
    ' body.sdk-printing>*:not(.print-sheet){display:none !important}',
    ' body.sdk-printing .print-sheet{display:block !important;color:#000;background:#fff}',
    ' .sdk-print-grid{width:88mm;height:88mm;display:grid;grid-template-columns:repeat(4,22mm);grid-auto-rows:22mm;border:2.5px solid #000;margin:0 auto 8mm}',
    ' .sdk-print-cell{border:1px solid #000;font-size:16pt;font-weight:700;text-align:center;line-height:22mm}',
    ' .sdk-print-cell:nth-child(4n+2){border-right:2.5px solid #000}',
    ' .sdk-print-cell:nth-child(n+5):nth-child(-n+8){border-bottom:2.5px solid #000}',
    '}',
    ''
  ].join('\n');

  function injectCss() {
    if (document.getElementById('sdk-style')) return;
    var st = document.createElement('style');
    st.id = 'sdk-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ---------- trang thai van ---------- */
  var state = {
    level: 'de',
    puzzle: null,      // [16] so cho san, 0 = trong
    solution: null,    // [16] dap an day du cua van dang choi
    user: null,        // [16] so be dien, 0 = chua dien
    selected: -1,      // o dang chon (-1 = chua chon)
    hintsUsed: 0,
    hintCell: -1,      // o goi y dang to sang (-1 = khong co)
    hintLevel: 0,      // 0 = chua goi y, 1 = da to sang o, 2 = da cho so thieu cua hang
    won: false,
    startTime: 0,
    lastPrint: null,   // [{puzzle, solution} x 2] cua to de vua in (de in dap an khop)
    container: null,
    els: null
  };

  function el(tag, cls, text) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (text !== undefined && text !== null) d.textContent = text;
    return d;
  }

  /* ---------- dung giao dien (chi 1 lan / container) ---------- */
  function buildUi(container) {
    var wrap = el('div', 'sdk-wrap');
    wrap.appendChild(el('h2', null, '🎮 Sudoku 4×4'));

    wrap.appendChild(el('p', 'sdk-sub', 'Dùng các số 1, 2, 3, 4.'));

    var levels = el('div', 'sdk-levels');
    var btnDe = el('button', 'on', 'Dễ');
    btnDe.type = 'button';
    btnDe.setAttribute('data-level', 'de');
    var btnVua = el('button', null, 'Vừa');
    btnVua.type = 'button';
    btnVua.setAttribute('data-level', 'vua');
    levels.appendChild(btnDe);
    levels.appendChild(btnVua);
    wrap.appendChild(levels);

    var rules = el('ol', 'sdk-rules');
    RULES.forEach(function (r) { rules.appendChild(el('li', null, r)); });
    wrap.appendChild(rules);

    var grid = el('div', 'sdk-grid');
    grid.setAttribute('role', 'grid');
    var cells = [];
    for (var i = 0; i < 16; i++) {
      (function (idx) {
        var c = el('button', 'sdk-cell');
        c.type = 'button';
        c.setAttribute('role', 'gridcell');
        c.addEventListener('click', function () { onCellClick(idx); });
        cells.push(c);
        grid.appendChild(c);
      })(i);
    }
    wrap.appendChild(grid);

    var msg = el('p', 'sdk-msg', '');
    msg.setAttribute('aria-live', 'polite');
    wrap.appendChild(msg);

    // Ban phim so tren man hinh: 3 cot x 3 hang (1-9), chi dung 1-4.
    var keys = el('div', 'sdk-keys');
    var keyBtns = {};
    [1, 2, 3, 4].forEach(function (n) {
      var b = el('button', 'sdk-key', String(n));
      b.type = 'button';
      b.setAttribute('aria-label', 'Số ' + n);
      b.addEventListener('click', function () { onDigit(n); });
      keyBtns[n] = b;
      keys.appendChild(b);
    });
    for (var s = 0; s < 5; s++) {
      var off = el('span', 'sdk-key-off', '');
      off.setAttribute('aria-hidden', 'true');
      keys.appendChild(off);
    }
    wrap.appendChild(keys);

    var keyrow = el('div', 'sdk-keyrow');
    var btnErase = el('button', null, '⌫ Xóa');
    btnErase.type = 'button';
    btnErase.addEventListener('click', onErase);
    /* Chỉ giữ 1 nút làm ván mới ("🔀 Ván mới" ở hàng công cụ bên dưới);
       nút "🔄 Đề mới" trùng hành động nên đã bỏ để bé khỏi bấm nhầm. */
    keyrow.appendChild(btnErase);
    wrap.appendChild(keyrow);

    var tools = el('div', 'sdk-tools');
    var btnHint = el('button', 'sdk-primary', '💡 Gợi ý (3 lần)');
    btnHint.type = 'button';
    btnHint.addEventListener('click', onHint);
    var btnNew = el('button', null, '🔀 Ván mới');
    btnNew.type = 'button';
    btnNew.addEventListener('click', function () { newGame(state.level); });
    var btnPrint = el('button', null, '🖨️ In đề');
    btnPrint.type = 'button';
    btnPrint.addEventListener('click', function () { printSheet('de'); });
    var btnPrintAns = el('button', null, '🖨️ In đáp án (cho ba mẹ)');
    btnPrintAns.type = 'button';
    btnPrintAns.addEventListener('click', function () { printSheet('dap-an'); });
    var btnHome = el('button', null, '🏠 Về lại');
    btnHome.type = 'button';
    btnHome.addEventListener('click', onHome);
    tools.appendChild(btnHint);
    tools.appendChild(btnNew);
    tools.appendChild(btnPrint);
    tools.appendChild(btnPrintAns);
    tools.appendChild(btnHome);
    wrap.appendChild(tools);

    wrap.appendChild(el('p', 'sdk-print-note', 'In từ máy tính sẽ đẹp hơn.'));

    var win = el('div', 'sdk-win');
    win.appendChild(el('div', null, '🎉 Thắng rồi! Em điền đúng hết bảng này.'));
    var timeLine = el('p', 'sdk-time', '');
    win.appendChild(timeLine);
    var winTools = el('div', 'sdk-tools');
    var btnWinNew = el('button', 'sdk-primary', '🔀 Ván mới');
    btnWinNew.type = 'button';
    btnWinNew.addEventListener('click', function () { newGame(state.level); });
    var btnWinHome = el('button', null, '🏠 Về lại');
    btnWinHome.type = 'button';
    btnWinHome.addEventListener('click', onHome);
    winTools.appendChild(btnWinNew);
    winTools.appendChild(btnWinHome);
    win.appendChild(winTools);
    wrap.appendChild(win);

    container.appendChild(wrap);

    btnDe.addEventListener('click', function () { newGame('de'); });
    btnVua.addEventListener('click', function () { newGame('vua'); });

    return {
      wrap: wrap, grid: grid, cells: cells, msg: msg,
      btnDe: btnDe, btnVua: btnVua, btnHint: btnHint,
      win: win, timeLine: timeLine
    };
  }

  /* ---------- logic choi ---------- */
  function conflicts(idx, v) {
    var r = rowOf(idx), c = colOf(idx), b = boxOf(idx);
    for (var k = 0; k < SIZE; k++) {
      var ri = r * SIZE + k, ci = k * SIZE + c;
      if (ri !== idx && valueAt(ri) === v) return true;
      if (ci !== idx && valueAt(ci) === v) return true;
    }
    var br = Math.floor(r / BOX) * BOX, bc = Math.floor(c / BOX) * BOX;
    for (var dr = 0; dr < BOX; dr++)
      for (var dc = 0; dc < BOX; dc++) {
        var bi = (br + dr) * SIZE + bc + dc;
        if (bi !== idx && valueAt(bi) === v) return true;
      }
    return false;
  }

  function valueAt(idx) {
    if (state.puzzle[idx] !== 0) return state.puzzle[idx];
    return state.user[idx];
  }

  function candidates(idx) {
    var out = [];
    for (var v = 1; v <= 4; v++) if (!conflicts(idx, v)) out.push(v);
    return out;
  }

  function paint() {
    var els = state.els;
    if (!els) return;
    for (var i = 0; i < 16; i++) {
      var c = els.cells[i];
      var given = state.puzzle[i] !== 0;
      c.textContent = given ? String(state.puzzle[i]) : (state.user[i] !== 0 ? String(state.user[i]) : '');
      c.disabled = given;
      c.classList.toggle('given', given);
      c.classList.toggle('sel', i === state.selected);
      var rel = false;
      if (state.selected >= 0 && i !== state.selected) {
        rel = rowOf(i) === rowOf(state.selected) ||
              colOf(i) === colOf(state.selected) ||
              boxOf(i) === boxOf(state.selected);
      }
      c.classList.toggle('rel', rel);
      c.classList.toggle('hintcell', i === state.hintCell && state.hintLevel >= 1);
      c.classList.remove('shake');
    }
    els.btnDe.classList.toggle('on', state.level === 'de');
    els.btnVua.classList.toggle('on', state.level === 'vua');
    var left = MAX_HINTS - state.hintsUsed;
    els.btnHint.disabled = left <= 0 || state.won;
    els.btnHint.textContent = left > 0 ? ('💡 Gợi ý (còn ' + left + ' lần)') : '💡 Gợi ý (hết)';
  }

  function setMsg(text) {
    if (state.els) state.els.msg.textContent = text;
  }

  function onCellClick(idx) {
    if (state.won) return;
    if (state.puzzle[idx] !== 0) return; // o cho san khoa lai, bam khong duoc
    state.selected = idx;
    paint();
  }

  function onDigit(v) {
    if (state.won) return;
    if (state.selected < 0) {
      setMsg('Em bấm vào một ô trống trước nhé.');
      return;
    }
    var idx = state.selected;
    if (state.puzzle[idx] !== 0) return;
    if (state.user[idx] === v) return; // da co dung so do roi
    if (conflicts(idx, v)) {
      // So sai KHONG dinh vao o: o van trong, rung nhe + dong chu bao loi.
      var c = state.els.cells[idx];
      c.classList.remove('shake');
      void c.offsetWidth; // chay lai animation rung
      c.classList.add('shake');
      setMsg(WRONG_MSG);
      return;
    }
    state.user[idx] = v;
    setMsg('');
    paint();
    checkWin();
  }

  function onErase() {
    if (state.won) return;
    if (state.selected < 0) return;
    var idx = state.selected;
    if (state.puzzle[idx] !== 0) return;
    if (state.user[idx] !== 0) {
      state.user[idx] = 0;
      setMsg('');
      paint();
    }
  }

  function onHint() {
    if (state.won) return;
    if (state.hintsUsed >= MAX_HINTS) {
      setMsg('Em đã dùng hết 3 lần gợi ý của ván này rồi.');
      return;
    }
    // Nac 2: neu nac 1 dang to sang 1 o trong thi cho biet cac so con thieu cua hang do.
    if (state.hintLevel === 1 && state.hintCell >= 0 && state.user[state.hintCell] === 0 && state.puzzle[state.hintCell] === 0) {
      state.hintsUsed++;
      state.hintLevel = 2;
      var r = rowOf(state.hintCell);
      var missing = [];
      for (var v = 1; v <= 4; v++) {
        var has = false;
        for (var k = 0; k < SIZE; k++) if (valueAt(r * SIZE + k) === v) { has = true; break; }
        if (!has) missing.push(v);
      }
      setMsg('Hàng ngang này còn thiếu các số: ' + missing.join(', ') + '.');
      paint();
      return;
    }
    // Nac 1: to sang o nen lam (o trong co it lua chon nhat).
    state.hintsUsed++;
    var bestIdx = -1, bestN = 99;
    for (var i = 0; i < 16; i++) {
      if (state.puzzle[i] === 0 && state.user[i] === 0) {
        var n = candidates(i).length;
        if (n < bestN) { bestN = n; bestIdx = i; }
      }
    }
    if (bestIdx < 0) { state.hintsUsed--; setMsg(''); return; }
    state.hintCell = bestIdx;
    state.hintLevel = 1;
    state.selected = bestIdx;
    setMsg('Em thử nhìn ô tô màu cam nhé. Ô đó làm được đấy.');
    paint();
  }

  function checkWin() {
    for (var i = 0; i < 16; i++) if (valueAt(i) === 0) return;
    state.won = true;
    var secs = Math.max(0, Math.round((Date.now() - state.startTime) / 1000));
    var mins = Math.floor(secs / 60);
    state.els.timeLine.textContent = mins < 1
      ? 'Em làm xong trong chưa tới 1 phút.'
      : 'Em làm xong trong ' + mins + ' phút.';
    state.els.win.classList.add('show');
    setMsg('');
    paint();
  }

  function onHome() {
    if (!state.container) return;
    state.container.style.display = 'none';
    var evt;
    try {
      evt = new CustomEvent('sudoku:home', { bubbles: true });
    } catch (e) {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('sudoku:home', true, false, null);
    }
    state.container.dispatchEvent(evt);
  }

  /* ---------- in an ---------- */
  function printGridEl(values) {
    var g = el('div', 'sdk-print-grid');
    for (var i = 0; i < 16; i++) {
      var c = el('div', 'sdk-print-cell', values[i] !== 0 ? String(values[i]) : ' ');
      g.appendChild(c);
    }
    return g;
  }

  // To de: 2 de 4x4/to A4, KHONG chua dap an (chi so cho san, o trong de trang).
  function buildPrintSheet() {
    var level = LEVELS[state.level];
    var items = [];
    for (var n = 0; n < 2; n++) items.push(makePuzzle(state.level));
    state.lastPrint = items;
    var sheet = el('div', 'print-sheet');
    sheet.appendChild(el('h2', null, 'Sudoku — Mức ' + level.label));
    sheet.appendChild(el('p', null, 'Họ tên: ..............................   Ngày: ..../..../....   Điểm: ..../....'));
    var rules = el('ol', null);
    RULES.forEach(function (r) { rules.appendChild(el('li', null, r)); });
    sheet.appendChild(rules);
    items.forEach(function (it, k) {
      sheet.appendChild(el('p', null, 'Đề ' + (k + 1)));
      sheet.appendChild(printGridEl(it.puzzle));
    });
    return sheet;
  }

  // To dap an rieng cho ba me: luoi da dien du, khop voi to de vua in (neu co).
  function buildAnswerSheet() {
    var level = LEVELS[state.level];
    var items = state.lastPrint;
    if (!items) {
      items = [];
      for (var n = 0; n < 2; n++) items.push(makePuzzle(state.level));
      state.lastPrint = items;
    }
    var sheet = el('div', 'print-sheet');
    sheet.appendChild(el('h2', null, 'Đáp án — chỉ ba mẹ giữ'));
    sheet.appendChild(el('p', null, 'Sudoku — Mức ' + level.label));
    items.forEach(function (it, k) {
      sheet.appendChild(el('p', null, 'Đề ' + (k + 1)));
      sheet.appendChild(printGridEl(it.solution));
    });
    return sheet;
  }

  function printSheet(kind) {
    var old = document.querySelector('body > .print-sheet');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var sheet = kind === 'dap-an' ? buildAnswerSheet() : buildPrintSheet();
    document.body.appendChild(sheet);
    document.body.classList.add('sdk-printing');
    var done = false;
    var cleanup = function () {
      if (done) return;
      done = true;
      document.body.classList.remove('sdk-printing');
      if (sheet.parentNode) sheet.parentNode.removeChild(sheet);
      if (typeof window !== 'undefined' && window.removeEventListener) {
        window.removeEventListener('afterprint', cleanup);
      }
    };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('afterprint', cleanup);
    }
    try {
      if (typeof window.print === 'function') window.print();
    } catch (e) { /* may in khong co san (vd. test): van don dep */ }
    setTimeout(cleanup, 1000);
  }

  /* ---------- API cong khai ---------- */
  function newGame(level) {
    if (level && LEVELS[level]) state.level = level;
    var made = makePuzzle(state.level);
    state.puzzle = made.puzzle;
    state.solution = made.solution;
    state.user = [];
    for (var i = 0; i < 16; i++) state.user.push(0);
    state.selected = -1;
    state.hintsUsed = 0;
    state.hintCell = -1;
    state.hintLevel = 0;
    state.won = false;
    state.startTime = Date.now();
    if (state.els) {
      state.els.win.classList.remove('show');
      setMsg('');
      paint();
    }
  }

  function init(container) {
    injectCss();
    if (!container) container = document.getElementById('gameSudoku');
    if (!container) return;
    if (container.getAttribute('data-sdk-init') === '1') return; // goi nhieu lan khong nhan doi su kien
    container.setAttribute('data-sdk-init', '1');
    container.style.display = '';
    state.container = container;
    state.els = buildUi(container);
    newGame(state.level);
  }

  window.TroChoiSudoku = {
    init: init,
    newGame: newGame,
    buildPrintSheet: buildPrintSheet,
    buildAnswerSheet: buildAnswerSheet,
    // Chi phuc vu kiem thu: doc trang thai van (khong dung de hien dap an cho be).
    _getState: function () {
      return {
        level: state.level,
        puzzle: state.puzzle ? state.puzzle.slice() : null,
        solution: state.solution ? state.solution.slice() : null,
        user: state.user ? state.user.slice() : null,
        hintsUsed: state.hintsUsed,
        won: state.won,
        lastPrint: state.lastPrint ? state.lastPrint.map(function (it) {
          return { puzzle: it.puzzle.slice(), solution: it.solution.slice() };
        }) : null
      };
    }
  };
})();
