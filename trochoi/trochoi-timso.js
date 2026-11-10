/* ============================================================================
   TroChoiTimSo — trò "Tìm số luyện mắt" (Toán 6, tab Trò chơi)
   Theo phương án đã duyệt: ke-hoach-tro-choi-sudoku-tim-so.md (§2 Tìm số, §5).
   ----------------------------------------------------------------------------
   CÁCH TÍCH HỢP (người tích hợp làm, file này KHÔNG tự sửa index.html):
     <div id="gameTimSo"></div>
     <script src="trochoi-timso.js"></script>
     <script>TroChoiTimSo.init(document.getElementById('gameTimSo'));</script>
   API:
     TroChoiTimSo.init(container)            — dựng giao diện vào container
                                              (gọi nhiều lần cũng không nhân
                                              đôi sự kiện; gọi lại chỉ vẽ lại)
     TroChoiTimSo.newGame(level)             — ván mới; level: 'lamquen' |
                                              'muc1' | 'muc2' | 'warmup'
                                              (chấp nhận cả '4x4','5x5','6x6',
                                              '1','2','khoidong')
     TroChoiTimSo.buildPrintSheet()          — trả về phần tử .print-sheet
                                              chứa TỜ ĐỀ (1 ma trận, KHÔNG
                                              có đáp án)
     TroChoiTimSo.buildAnswerSheet()         — trả về phần tử .print-sheet
                                              chứa TỜ ĐÁP ÁN riêng (chỉ ba
                                              mẹ giữ, các số mục tiêu đã
                                              khoanh sẵn)
   LUẬT (đúng từng chữ phương án):
     - Chỉ tìm lần lượt 1 → 2 → 3…, MỘT số một lúc ("Tìm số 7"), tìm xong
       mới hiện số tiếp theo. Không đưa danh sách nhiều số cùng lúc.
     - Làm quen 4×4 tìm 1→8; Mức 1 (mặc định) 5×5 tìm 1→10; Mức 2 6×6
       tìm 1→20. Không 1–50, 1–100, 7×7, tìm theo điều kiện.
     - Ván "Khởi động" riêng: máy chỉ định 1 số, 5 lượt/ván.
     - Bấm 1 lần là chấm ngay, không nút xác nhận. Đúng: ô xanh lá #e8f5e9
       + ✓ + vòng khoanh giữ lại. Sai: ô nháy đỏ ~600ms rồi về như cũ +
       dòng "Chưa phải số N, em nhìn lại nhé." Không trừ điểm, không khóa ô.
     - KHÔNG gợi ý, KHÔNG nút Kiểm tra riêng, KHÔNG đồng hồ trong lúc
       chơi, KHÔNG âm thanh, KHÔNG điểm, KHÔNG xếp hạng, KHÔNG lưu tiến
       trình (không localStorage).
     - Thắng: khen nỗ lực "Em kiên nhẫn tìm hết, giỏi lắm." (không khen
       nhanh); xong ván mới hiện 1 dòng thời gian.
     - In: 1 ma trận/tờ A4, @page A4 lề 12mm, @media print chỉ hiện
       .print-sheet. Tờ bé không có đáp án; đáp án in riêng.
   SỬA LỖI SAU KIỂM CHỨNG CỦA PARENT (2026-11-07, giữ đúng ý phương án):
     - Mức Làm quen trước đây: 8 ô còn lại là số 1–9 lặp lại theo đúng
       chữ phương án, nên một ô nhiễu CÓ THỂ hiện đúng số đang cần tìm
       (ví dụ ô nhiễu hiện số 5 trong lúc đang tìm số 5) mà bấm vào vẫn
       tính sai vì trò chấm theo ô — bé nhìn số mà bấm đúng số vẫn bị
       sai, trên tờ in ba mẹ đối chiếu cũng khó xử. Đã sửa: ô nhiễu ở
       mức Làm quen chỉ lấy từ {0, 9} — vẫn là số 1 chữ số như phương
       án dự phòng đã ghi (chỉ dùng số 1–9), nhưng không bao giờ trùng
       với số mục tiêu 1–8, nên mọi ô hiện đúng số cần tìm đều là ô
       đúng, cả trên máy lẫn trên giấy. Các mức khác không đổi (nhiễu
       11–25 / 21–36 vốn đã không trùng mục tiêu).
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Mức độ (đúng §2) ---------- */
  var LEVELS = {
    lamquen: { key: 'lamquen', label: 'Làm quen · 4×4 · Tìm 1 → 8', short: '4×4 · Làm quen',
               size: 4, targets: 8, noisePool: [0, 9], noiseMode: 'repeat', cellFont: 22 },
    muc1:    { key: 'muc1', label: 'Mức 1 · 5×5 · Tìm 1 → 10', short: '5×5 · Mức 1',
               size: 5, targets: 10, noiseMin: 11, noiseMax: 25, noiseMode: 'unique', cellFont: 22 },
    muc2:    { key: 'muc2', label: 'Mức 2 · 6×6 · Tìm 1 → 20', short: '6×6 · Mức 2',
               size: 6, targets: 20, noiseMin: 21, noiseMax: 36, noiseMode: 'unique', cellFont: 20 }
  };
  var WARMUP_ROUNDS = 5;      /* ván khởi động: 5 lượt */
  var WARMUP_SIZE = 5;        /* bảng khởi động 5×5, các số 1–25 */
  var WRONG_MS = 600;         /* ô sai nháy đỏ ~600ms rồi về như cũ */

  var containerEl = null;     /* container đã init gần nhất */
  var styleInjected = false;

  /* ---------- Tiện ích ---------- */
  function range(a, b) { var out = []; for (var i = a; i <= b; i++) out.push(i); return out; }
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function el(tag, cls, text) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (text !== undefined && text !== null) d.textContent = text;
    return d;
  }
  function fmtTime(ms) {
    var s = Math.round(ms / 1000);
    if (s < 60) return 'Em làm xong trong chưa tới 1 phút.';
    var m = Math.round(s / 60);
    return 'Em làm xong trong ' + m + ' phút.';
  }
  function normLevel(level) {
    var v = String(level === undefined || level === null ? 'muc1' : level)
      .toLowerCase().replace(/[\s_-]/g, '');
    if (v === 'lamquen' || v === '4x4' || v === '4' || v === 'lamquen44') return 'lamquen';
    if (v === 'muc2' || v === '6x6' || v === '6' || v === '2') return 'muc2';
    if (v === 'warmup' || v === 'khoidong' || v === 'khoi' || v === 'khoi' + 'dong') return 'warmup';
    return 'muc1'; /* mặc định: Mức 1 */
  }

  /* ---------- Sinh bảng ---------- */
  function genSeqBoard(levelKey) {
    var L = LEVELS[levelKey];
    var cells = range(1, L.targets).map(function (n) { return { n: n, isTarget: true }; });
    var noise = [];
    if (L.noiseMode === 'unique') {
      noise = range(L.noiseMin, L.noiseMax);
    } else {
      /* Làm quen: ô nhiễu chỉ lấy từ noisePool {0, 9} — số 1 chữ số,
         không bao giờ trùng số mục tiêu 1–8 (xem lưu ý đầu file). */
      var need = L.size * L.size - L.targets;
      var pool = L.noisePool || [L.noiseMin];
      for (var i = 0; i < need; i++) {
        noise.push(pool[Math.floor(Math.random() * pool.length)]);
      }
    }
    noise.forEach(function (n) { cells.push({ n: n, isTarget: false }); });
    return shuffle(cells);
  }
  /* 1 lượt khởi động: bảng 5×5 gồm các số 1–25 xáo lại, 1 số được chỉ định. */
  function genWarmupRound() {
    var nums = shuffle(range(1, 25));
    var target = nums[Math.floor(Math.random() * nums.length)];
    var cells = nums.map(function (n) { return { n: n, isTarget: (n === target) }; });
    return { cells: cells, target: target };
  }

  function freshState(levelKey, mode) {
    var st = {
      level: levelKey, mode: mode, cells: [], found: {},
      next: 1, total: 0, foundCount: 0,
      target: null, warmupRound: 1,
      startedAt: Date.now(), won: false, wrongTimers: {}
    };
    if (mode === 'warmup') {
      var r = genWarmupRound();
      st.cells = r.cells; st.target = r.target; st.total = WARMUP_ROUNDS;
    } else {
      st.cells = genSeqBoard(levelKey);
      st.total = LEVELS[levelKey].targets;
      st.next = 1;
    }
    return st;
  }
  function getState() { return containerEl && containerEl._tsState ? containerEl._tsState : null; }
  function gridSize(st) { return st.mode === 'warmup' ? WARMUP_SIZE : LEVELS[st.level].size; }
  function cellFont(st) { return st.mode === 'warmup' ? 22 : LEVELS[st.level].cellFont; }
  function levelLabel(st) {
    return st.mode === 'warmup' ? 'Khởi động · 5×5 · Tìm 1 số' : LEVELS[st.level].label;
  }
  function countText(st) {
    if (st.mode === 'warmup') return 'Đã tìm: ' + st.foundCount + '/' + WARMUP_ROUNDS + ' lượt · Lượt ' + Math.min(st.warmupRound, WARMUP_ROUNDS) + '/' + WARMUP_ROUNDS;
    return 'Đã tìm: ' + st.foundCount + '/' + st.total;
  }
  function targetText(st) {
    return 'Tìm số ' + (st.mode === 'warmup' ? st.target : st.next);
  }

  /* ---------- CSS (khớp khuôn trang Toán: nút ≥48px, chữ ≥16px) ---------- */
  function injectStyle() {
    if (styleInjected || !document.head) return;
    if (document.getElementById('trochoi-timso-style')) { styleInjected = true; return; }
    var css = [
      '.ts-wrap{max-width:560px;margin:0 auto;text-align:center}',
      '.ts-wrap h2{font-size:22px;color:#1b5e20;margin:6px 0}',
      '.ts-rules{font-size:17px;color:#37474f;line-height:1.65;margin:6px 0 10px;text-align:left}',
      '.ts-lvls{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:10px 0}',
      '.ts-lvl{min-height:48px;padding:10px 14px;border-radius:10px;border:2px solid #90a4ae;background:#fff;color:#37474f;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer}',
      '.ts-lvl.on{background:#2e7d32;border-color:#2e7d32;color:#fff}',
      '.ts-warm{min-height:48px;padding:10px 18px;border-radius:10px;border:2px solid #00897b;background:#fff;color:#00897b;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer}',
      '.ts-warm.on{background:#00897b;color:#fff}',
      '.ts-target{font-size:30px;font-weight:800;color:#0d47a1;margin:10px 0 2px;line-height:1.2}',
      '.ts-count{font-size:17px;font-weight:700;color:#37474f;margin:2px 0 6px}',
      '.ts-bar{height:10px;background:#e0e0e0;border-radius:6px;overflow:hidden;margin:6px 0 4px}',
      '.ts-bar>i{display:block;height:100%;background:#43a047;width:0%}',
      '.ts-msg{font-size:17px;font-weight:600;color:#c62828;min-height:26px;margin:4px 0 8px}',
      '.ts-grid{display:grid;gap:8px;width:100%;max-width:351px;margin:0 auto}',
      '.ts-cell{position:relative;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;background:#fff;border:2px solid #90a4ae;border-radius:10px;color:#263238;font-weight:700;font-family:inherit;cursor:pointer;padding:0}',
      '.ts-cell .ts-num{display:flex;align-items:center;justify-content:center;width:1.9em;height:1.9em}',
      '.ts-cell.ts-found{background:#e8f5e9;border-color:#43a047;cursor:default}',
      '.ts-cell.ts-found .ts-num{border:3px solid #2e7d32;border-radius:50%}',
      '.ts-cell.ts-found .ts-check{position:absolute;top:1px;right:5px;font-size:18px;font-weight:800;color:#2e7d32;line-height:1}',
      '.ts-cell.ts-wrong{background:#ffebee;border-color:#e53935;color:#c62828}',
      '.ts-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:14px 0 4px}',
      '.ts-btns button{min-height:48px;padding:10px 16px;border-radius:10px;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer;border:1.5px solid #b0bec5;background:#fff;color:#37474f}',
      '.ts-btns button.ts-primary{background:#43a047;border-color:#43a047;color:#fff}',
      '.ts-note{font-size:15px;color:#555;margin:6px 0}',
      '.ts-win{display:none;background:#e8f5e9;border:2px solid #43a047;border-radius:12px;padding:16px;margin:14px 0;text-align:center;font-size:18px;line-height:1.6}',
      '.ts-win.show{display:block}',
      '.ts-win .ts-time{font-size:16px;color:#37474f;margin-top:6px}',
      /* --- Tờ in: chỉ dùng khi in, màn hình luôn ẩn (.print-sheet) --- */
      '.print-sheet{display:none}',
      '.ts-ps{color:#000;background:#fff;font-family:inherit;text-align:left}',
      '.ts-ps-title{font-size:16pt;font-weight:700;margin:0 0 3mm}',
      '.ts-ps-name{font-size:12pt;margin:0 0 3mm}',
      '.ts-ps-name .ts-dots{display:inline-block;min-width:55mm;border-bottom:1px dotted #000}',
      '.ts-ps-name .ts-dots.short{min-width:28mm}',
      '.ts-ps-line{font-size:14pt;margin:0 0 3mm}',
      '.ts-ps-targets{display:flex;flex-wrap:wrap;gap:2mm;margin:0 0 4mm}',
      '.ts-pbox{width:28mm;height:28mm;border:1.5px solid #000;display:flex;align-items:center;justify-content:center;font-size:20pt;font-weight:700}',
      '.ts-pbox.small{width:25mm;height:25mm}',
      '.ts-pmatrix{border-collapse:collapse;margin:0 auto 4mm}',
      '.ts-pmatrix td{border:1.5px solid #000;text-align:center;font-weight:700;vertical-align:middle}',
      '.ts-pmatrix.ts-pm24 td{width:24mm;height:24mm;font-size:19pt}',
      '.ts-pmatrix.ts-pm20 td{width:20mm;height:20mm;font-size:18pt}',
      '.ts-pmatrix.ts-pans td{width:15mm;height:15mm;font-size:14pt}',
      '.ts-acircle{display:flex;align-items:center;justify-content:center;width:12mm;height:12mm;margin:0 auto;border:2.5px solid #000;border-radius:50%}',
      '.ts-ps-found{font-size:13pt;margin:0 0 3mm}',
      '.ts-ps-note{font-size:10.5pt;margin:0;line-height:1.5}',
      '@page{size:A4;margin:12mm}',
      '@media print{',
      '  body.ts-dang-in>*:not(.print-sheet){display:none !important}',
      '  body.ts-dang-in .print-sheet{display:block !important}',
      '}'
    ].join('\n');
    var s = document.createElement('style');
    s.id = 'trochoi-timso-style';
    s.textContent = css;
    document.head.appendChild(s);
    styleInjected = true;
  }

  /* ---------- Vẽ giao diện ---------- */
  function render() {
    var st = getState();
    if (!st || !containerEl) return;
    var size = gridSize(st);
    var html = '';
    html += '<div class="ts-wrap">';
    html += '<h2>🔢 Tìm số luyện mắt</h2>';
    if (st.mode === 'warmup') {
      html += '<p class="ts-rules">1) Máy nói một số, ví dụ "Tìm số 17".<br>2) Em tìm đúng số đó trên bảng rồi bấm vào.<br>3) Tìm đúng 5 lượt là thắng.</p>';
    } else {
      html += '<p class="ts-rules">1) Trên bảng có nhiều số.<br>2) Em tìm số 1 trước, bấm vào số 1.<br>3) Rồi tìm số 2, số 3… tìm đủ tới số cuối là thắng.</p>';
    }
    html += '<div class="ts-lvls" role="group" aria-label="Đổi mức">';
    Object.keys(LEVELS).forEach(function (k) {
      html += '<button type="button" class="ts-lvl' + (st.mode === 'seq' && st.level === k ? ' on' : '') +
        '" data-ts-action="level" data-ts-level="' + k + '">' + LEVELS[k].short + '</button>';
    });
    html += '<button type="button" class="ts-warm' + (st.mode === 'warmup' ? ' on' : '') +
      '" data-ts-action="warmup">▶ Khởi động</button>';
    html += '</div>';
    html += '<div class="ts-target" data-ts-part="target">' + targetText(st) + '</div>';
    html += '<div class="ts-bar"><i data-ts-part="bar" style="width:' + Math.round(st.foundCount / st.total * 100) + '%"></i></div>';
    html += '<div class="ts-count" data-ts-part="count">' + countText(st) + '</div>';
    html += '<p class="ts-msg" data-ts-part="msg" aria-live="polite"></p>';
    html += '<div class="ts-grid" style="grid-template-columns:repeat(' + size + ',1fr)" data-ts-part="grid">';
    st.cells.forEach(function (c, i) {
      var found = !!st.found[i];
      html += '<button type="button" class="ts-cell' + (found ? ' ts-found' : '') +
        '" style="font-size:' + cellFont(st) + 'px" data-ts-idx="' + i + '" data-ts-num="' + c.n +
        '" data-ts-target="' + (c.isTarget ? 1 : 0) + '"' + (found ? ' disabled' : '') + '>' +
        '<span class="ts-num">' + c.n + '</span>' + (found ? '<span class="ts-check">✓</span>' : '') + '</button>';
    });
    html += '</div>';
    html += '<div class="ts-btns">';
    html += '<button type="button" class="ts-primary" data-ts-action="new">🔀 Ván mới</button>';
    html += '<button type="button" data-ts-action="print">🖨️ In đề</button>';
    html += '<button type="button" data-ts-action="print-answer">🖨️ In đáp án (cho ba mẹ)</button>';
    html += '<button type="button" data-ts-action="home">🏠 Về lại</button>';
    html += '</div>';
    html += '<p class="ts-note">In từ máy tính sẽ đẹp hơn.</p>';
    html += '<div class="ts-win' + (st.won ? ' show' : '') + '" data-ts-part="win">';
    html += '🎉 <b>Thắng rồi!</b><br>Em kiên nhẫn tìm hết, giỏi lắm.';
    if (st.won) html += '<div class="ts-time" data-ts-part="time">' + fmtTime(Date.now() - st.startedAt) + '</div>';
    html += '<div class="ts-btns"><button type="button" class="ts-primary" data-ts-action="new">🔀 Ván mới</button>' +
      '<button type="button" data-ts-action="home">🏠 Về lại</button></div>';
    html += '</div>';
    html += '</div>';
    containerEl.innerHTML = html;
  }

  function updateHeads() {
    var st = getState();
    if (!st || !containerEl) return;
    var q = function (sel) { return containerEl.querySelector('[data-ts-part="' + sel + '"]'); };
    var t = q('target'); if (t) t.textContent = st.won ? '🎉 Thắng rồi!' : targetText(st);
    var c = q('count'); if (c) c.textContent = countText(st);
    var b = q('bar'); if (b) b.style.width = Math.round(st.foundCount / st.total * 100) + '%';
  }
  function setMsg(text) {
    if (!containerEl) return;
    var m = containerEl.querySelector('[data-ts-part="msg"]');
    if (m) m.textContent = text || '';
  }
  function showWin() {
    var st = getState();
    if (!st || !containerEl) return;
    var w = containerEl.querySelector('[data-ts-part="win"]');
    if (!w) return;
    w.classList.add('show');
    var time = w.querySelector('[data-ts-part="time"]');
    if (!time) {
      time = el('div', 'ts-time');
      time.setAttribute('data-ts-part', 'time');
      w.insertBefore(time, w.querySelector('.ts-btns'));
    }
    time.textContent = fmtTime(Date.now() - st.startedAt);
  }

  /* ---------- Chơi ---------- */
  function onCellClick(cellBtn) {
    var st = getState();
    if (!st || st.won) return;
    var idx = parseInt(cellBtn.getAttribute('data-ts-idx'), 10);
    if (st.found[idx]) return;
    var cell = st.cells[idx];
    var want = st.mode === 'warmup' ? st.target : st.next;
    if (cell.isTarget && cell.n === want) {
      /* Đúng: xanh lá + ✓ + vòng khoanh giữ lại, chuyển sang số tiếp theo. */
      st.found[idx] = true;
      st.foundCount++;
      setMsg('');
      cellBtn.classList.add('ts-found');
      cellBtn.setAttribute('disabled', '');
      var num = cellBtn.querySelector('.ts-num');
      if (num) num.classList.add('ts-circled');
      if (!cellBtn.querySelector('.ts-check')) {
        var chk = el('span', 'ts-check', '✓');
        cellBtn.appendChild(chk);
      }
      if (st.mode === 'warmup') {
        if (st.foundCount >= WARMUP_ROUNDS) {
          st.won = true;
          updateHeads();
          showWin();
        } else {
          st.warmupRound++;
          var r = genWarmupRound();
          st.cells = r.cells; st.target = r.target; st.found = {};
          render(); /* lượt mới: bảng mới */
        }
      } else {
        if (st.foundCount >= st.total) {
          st.won = true;
          updateHeads();
          showWin();
        } else {
          st.next++;
          updateHeads();
        }
      }
    } else {
      /* Sai: nháy đỏ ~600ms rồi về như cũ + dòng chữ, không trừ điểm, bấm lại được ngay. */
      setMsg('Chưa phải số ' + want + ', em nhìn lại nhé.');
      if (st.wrongTimers[idx]) clearTimeout(st.wrongTimers[idx]);
      cellBtn.classList.add('ts-wrong');
      st.wrongTimers[idx] = setTimeout(function () {
        cellBtn.classList.remove('ts-wrong');
        delete st.wrongTimers[idx];
      }, WRONG_MS);
    }
  }

  function clearWrongTimers(st) {
    Object.keys(st.wrongTimers).forEach(function (k) { clearTimeout(st.wrongTimers[k]); });
    st.wrongTimers = {};
  }

  function newGameInternal(levelKey, mode) {
    var st = getState();
    if (!st) return false;
    clearWrongTimers(st);
    var ns = freshState(levelKey, mode);
    containerEl._tsState = ns;
    setMsg('');
    render();
    return true;
  }

  /* ---------- In ấn ---------- */
  function currentSheetState() {
    var st = getState();
    if (st) return st;
    /* Chưa mở ván nào: dùng 1 bảng Mức 1 mặc định để in, không chạm giao diện. */
    return freshState('muc1', 'seq');
  }
  function buildMatrixTable(st, forAnswer) {
    var size = gridSize(st);
    var cellCls = size >= 6 ? 'ts-pm20' : 'ts-pm24';
    var table = el('table', 'ts-pmatrix ' + (forAnswer ? 'ts-pans' : cellCls));
    for (var r = 0; r < size; r++) {
      var tr = document.createElement('tr');
      for (var c = 0; c < size; c++) {
        var cell = st.cells[r * size + c];
        var td = document.createElement('td');
        if (forAnswer && cell.isTarget) {
          var circ = el('span', 'ts-acircle', String(cell.n));
          td.appendChild(circ);
        } else {
          td.textContent = String(cell.n);
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  }
  function buildPrintSheet() {
    var st = currentSheetState();
    var sheet = el('div', 'print-sheet ts-print-sheet');
    var inner = el('div', 'ts-ps');
    sheet.appendChild(inner);
    inner.appendChild(el('div', 'ts-ps-title', '🔢 Tìm số luyện mắt — ' + levelLabel(st)));
    var name = el('div', 'ts-ps-name');
    name.appendChild(document.createTextNode('Họ tên: '));
    var d1 = el('span', 'ts-dots'); name.appendChild(d1);
    name.appendChild(document.createTextNode('   Ngày: '));
    var d2 = el('span', 'ts-dots short'); name.appendChild(d2);
    inner.appendChild(name);
    inner.appendChild(el('p', 'ts-ps-line', 'Tìm và khoanh tròn các số sau:'));
    /* Danh sách số cần tìm ở TRÊN ma trận, 5–6 ô vuông 1 hàng, mỗi ô ~28mm.
       Mức 2 có 20 số nên dùng ô 25mm để cả tờ vẫn gọn trong 1 trang A4. */
    /* Ván khởi động chỉ tìm 1 số chỉ định: danh sách in chỉ có đúng số đó. */
    var targets = st.mode === 'warmup' ? [st.target] : range(1, st.total);
    var small = targets.length > 10;
    var list = el('div', 'ts-ps-targets');
    targets.forEach(function (n) { list.appendChild(el('div', 'ts-pbox' + (small ? ' small' : ''), String(n))); });
    inner.appendChild(list);
    inner.appendChild(buildMatrixTable(st, false));
    inner.appendChild(el('p', 'ts-ps-found', 'Tìm được: ...... / ' + st.total + ' số'));
    inner.appendChild(el('p', 'ts-ps-note',
      'Ghi chú: Khi khoanh được một số, em có thể viết số thứ tự nhỏ ①②… cạnh số vừa khoanh để ba mẹ biết em khoanh có đúng thứ tự không.'));
    return sheet;
  }
  function buildAnswerSheet() {
    var st = currentSheetState();
    var sheet = el('div', 'print-sheet ts-print-sheet');
    var inner = el('div', 'ts-ps');
    sheet.appendChild(inner);
    inner.appendChild(el('div', 'ts-ps-title', '🔢 Tìm số luyện mắt — Đáp án (chỉ ba mẹ giữ)'));
    inner.appendChild(el('p', 'ts-ps-line', levelLabel(st)));
    inner.appendChild(buildMatrixTable(st, true));
    inner.appendChild(el('p', 'ts-ps-note',
      'Các số cần tìm: 1 → ' + st.total + '. Đối chiếu vòng khoanh của bé với bảng này.'));
    return sheet;
  }
  function doPrint(kind) {
    if (typeof document === 'undefined' || !document.body) return false;
    var old = document.body.querySelector('.print-sheet.ts-print-sheet');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var sheet = kind === 'answer' ? buildAnswerSheet() : buildPrintSheet();
    document.body.appendChild(sheet);
    if (typeof window.print !== 'function') {
      if (sheet.parentNode) sheet.parentNode.removeChild(sheet);
      return false;
    }
    document.body.classList.add('ts-dang-in');
    var cleaned = false;
    var cleanup = function () {
      if (cleaned) return;
      cleaned = true;
      document.body.classList.remove('ts-dang-in');
      if (sheet.parentNode) sheet.parentNode.removeChild(sheet);
      if (window.removeEventListener) window.removeEventListener('afterprint', cleanup);
    };
    if (window.addEventListener) window.addEventListener('afterprint', cleanup);
    window.print();
    setTimeout(cleanup, 5000); /* dự phòng nếu afterprint không bắn */
    return true;
  }

  /* ---------- Sự kiện (delegation: init nhiều lần cũng chỉ gắn 1 lần) ---------- */
  function onContainerClick(ev) {
    var st = getState();
    if (!st) return;
    var t = ev.target;
    var cell = t && t.closest ? t.closest('.ts-cell') : null;
    if (cell && containerEl.contains(cell)) { onCellClick(cell); return; }
    var btn = t && t.closest ? t.closest('[data-ts-action]') : null;
    if (!btn || !containerEl.contains(btn)) return;
    var action = btn.getAttribute('data-ts-action');
    if (action === 'level') {
      newGameInternal(btn.getAttribute('data-ts-level') || 'muc1', 'seq');
    } else if (action === 'warmup') {
      newGameInternal(st.level, 'warmup');
    } else if (action === 'new') {
      newGameInternal(st.level, st.mode);
    } else if (action === 'print') {
      doPrint('sheet');
    } else if (action === 'print-answer') {
      doPrint('answer');
    } else if (action === 'home') {
      /* Về lại: ẩn khung trò, báo cho trang tích hợp qua sự kiện. */
      containerEl.style.display = 'none';
      var evt;
      try {
        evt = new CustomEvent('trochoitimso:ve-lai', { bubbles: true });
      } catch (e) {
        evt = document.createEvent('Event');
        evt.initEvent('trochoitimso:ve-lai', true, false);
      }
      containerEl.dispatchEvent(evt);
    }
  }

  function init(container) {
    if (typeof container === 'string') container = document.getElementById(container);
    if (!container) return false;
    injectStyle();
    containerEl = container;
    container.style.display = '';
    if (!container._tsState) {
      container._tsState = freshState('muc1', 'seq'); /* mặc định: Mức 1 */
    }
    if (!container._tsBound) {
      container.addEventListener('click', onContainerClick);
      container._tsBound = true;
    }
    render();
    return true;
  }

  function newGame(level) {
    if (!containerEl || !getState()) return false;
    var v = normLevel(level);
    if (v === 'warmup') return newGameInternal(getState().level, 'warmup');
    return newGameInternal(v, 'seq');
  }

  window.TroChoiTimSo = {
    init: init,
    newGame: newGame,
    buildPrintSheet: buildPrintSheet,
    buildAnswerSheet: buildAnswerSheet
  };
})();
