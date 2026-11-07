/* ===== TRO CHOI NHO N1 + N2 (Toan 6) — file tu dung, chi can 1 container id="gameNho" =====
   Cach dung (nguoi tich hop them vao toan/index.html):
     <div id="gameNho"></div>
     <script src="trochoi-nho.js"></script>
     <script>TroChoiNho.init(document.getElementById('gameNho'));</script>
   - CHI lam N1 "The nao bien mat?" va N2 "Xep dung thu tu" (phuong an §3).
     KHONG lam N3 "Nho day so", KHONG lam "Do lai cau vua hoc",
     KHONG lam tro nho vi tri 12-16 o lat up, KHONG lam bien the "Xep lai cac buoc giai".
   - The lay tu kho the be da hoc cua Toan (theory.json: 21 the — ten khai niem + hinh SVG
     + cong thuc dau tien). Thu tu uu tien nguon the khi init:
       1) tham so cards truyen vao init(container, cards) / setCards(cards);
       2) window.TroChoiNhoCards (nguoi tich hop nap tu theory.json);
       3) window.__THEORY / window.THEORY (cac muc theory.json: name + svg + formulas);
       4) fetch('theory.json') neu 3 nguon tren chua co (chi chay tren trang that);
       5) window.QUIZ_BANK (quiz.json, 114 cau): chi lay dap an dung ngan (<=28 ky tu,
          khac nhau) lam the chu — dung khi khong co theory;
       6) danh sach du phong cung trong file: ten + cong thuc dau tien cua 21 muc
          theory.json (chep nguyen van, khong bia noi dung moi).
     Ham getPoolSource() cho biet the dang dung lay tu nguon nao.
   - N1: hien 3 the (mac dinh 15 giay, khong hien dong ho dem nguoc), che lai, lay di 1 the,
     hoi "The nao vua bien mat?" — be chi bam chon trong 3 lua chon. Dung: o xanh + hien
     lai the da mat. Sai: nhay do, cho chon lai. Quen: nut "Xem lai 5 giay". Dung 2 van
     lien tiep thi len 4 the. Khong tru diem, khong bam gio.
   - N2: hien 3 the theo 1 thu tu (khong dem nguoc), be bam "Giau di" khi nho roi — be tu
     quyet luc nao giau. 3 the xao lai, be bam theo dung thu tu luc nay. Bam dung: o xanh
     + huy hieu so ①②③ ngay tren the; the GIU NGUYEN vi tri, khong tu nhay xep lai.
     Bam lai the da chon de bo so do (cac so sau tu don lai). Bam sai: nhay do nhe, cho
     bam lai. Thang quen (2 van lien tiep) thi len 4 the, roi 5 the. Khong tru diem.
   - Chung: khong dong ho trong luc choi (xong van moi hien 1 dong thoi gian), khong diem,
     khong xep hang, khong luu tien trinh (khong localStorage), khong am thanh.
     Moi van 3-5 phut. Loi ngan, mot y mot dong, chu >=16px, nut >=44px, khong tran ngang.
   - In: buildPrintSheet() = to in chung N1+N2 cho be (KHONG dap an); buildAnswerSheet() =
     to dap an N2 rieng cho ba me (N1 khong can dap an in vi ba me tu che). Nut in trong
     giao dien dung 2 ham nay. To dap an khop voi to de vua in gan nhat.
   - init() goi duoc nhieu lan ma khong nhan doi su kien (1 listener uy quyen duy nhat
     tren container + CSS chi chen 1 lan). */
(function () {
  'use strict';

  /* ---------- kho the du phong: ten + cong thuc dau tien cua 21 muc theory.json ---------- */
  var FALLBACK_CARDS = [
    { id: 'tap-hop', label: 'Tập hợp', sub: 'A = {1; 3; 5; 7; 9}' },
    { id: 'tia-so', label: 'Tia số', sub: 'a < b khi điểm a nằm bên trái điểm b' },
    { id: 'truc-so-nguyen', label: 'Trục số (số nguyên)', sub: 'a và −a là hai số đối nhau' },
    { id: 'tam-giac-deu', label: 'Tam giác đều', sub: 'C = a × 3' },
    { id: 'hinh-vuong', label: 'Hình vuông', sub: 'C = a × 4' },
    { id: 'luc-giac-deu', label: 'Lục giác đều', sub: 'C = a × 6' },
    { id: 'hinh-chu-nhat', label: 'Hình chữ nhật', sub: 'C = (a + b) × 2' },
    { id: 'hinh-thoi', label: 'Hình thoi', sub: 'C = a × 4' },
    { id: 'hinh-binh-hanh', label: 'Hình bình hành', sub: 'C = (a + b) × 2' },
    { id: 'hinh-thang-can', label: 'Hình thang cân', sub: 'C = a + b + c × 2' },
    { id: 'tam-giac-thuong', label: 'Tam giác thường (bổ trợ)', sub: 'C = a + b + c' },
    { id: 'tam-giac-vuong', label: 'Tam giác vuông (bổ trợ)', sub: 'C = a + b + c' },
    { id: 'phan-so', label: 'Phân số bằng nhau', sub: 'a/b = (a × m)/(b × m) = (a : n)/(b : n)' },
    { id: 'hon-so', label: 'Hỗn số dương', sub: 'a b/c = (a × c + b)/c' },
    { id: 'diem-duong-thang', label: 'Điểm và đường thẳng', sub: 'Qua 2 điểm chỉ có 1 đường thẳng' },
    { id: 'tia', label: 'Tia', sub: 'Tia OA, tia OB đối nhau' },
    { id: 'doan-thang-trung-diem', label: 'Đoạn thẳng và trung điểm', sub: 'MA = MB = AB : 2' },
    { id: 'goc', label: 'Góc', sub: 'Nhọn < 90° < Tù < 180°' },
    { id: 'so-do-goc', label: 'Số đo góc', sub: 'góc xOz = góc xOy + góc yOz' },
    { id: 'bieu-do-cot', label: 'Biểu đồ cột', sub: 'Cột cao hơn = số lớn hơn' },
    { id: 'bieu-do-cot-kep', label: 'Biểu đồ cột kép', sub: '9 − 6 = 3' }
  ];

  var BADGES = ['①', '②', '③', '④', '⑤'];
  var VIEW_MS_N1 = 15000;   /* N1: nhin 15 giay (muc mac dinh cho be yeu) */
  var REVIEW_MS = 5000;     /* xem lai: 5 giay */

  /* ---------- tien ich ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function el(tag, cls, text) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (text != null) d.textContent = text;
    return d;
  }
  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function normCard(c) {
    if (!c) return null;
    var label = String(c.label || c.name || '').trim();
    if (!label) return null;
    var sub = '';
    if (c.sub) sub = String(c.sub).trim();
    else if (c.formulas && c.formulas[0] && c.formulas[0].f) sub = String(c.formulas[0].f).trim();
    return { id: String(c.id || label), label: label, sub: sub, svg: c.svg ? String(c.svg) : '' };
  }
  function dedupeCards(list) {
    var seen = {}, out = [];
    list.forEach(function (c) {
      var n = normCard(c);
      if (n && !seen[n.label]) { seen[n.label] = 1; out.push(n); }
    });
    return out;
  }
  function mapTheory(arr) {
    if (!arr || !arr.length) return [];
    return dedupeCards(arr.filter(function (t) { return t && t.name; }).map(function (t) {
      return { id: t.id || t.name, label: t.name, sub: '', svg: t.svg || '', formulas: t.formulas || [] };
    }));
  }
  function fmtTime(ms) {
    var s = Math.round(ms / 1000);
    if (s < 60) return 'Em làm xong trong ' + s + ' giây.';
    var m = Math.floor(s / 60);
    return 'Em làm xong trong ' + m + ' phút ' + (s % 60) + ' giây.';
  }

  /* ---------- CSS (khuon trang Toan: chu >=16px, nut >=44px, xanh la / xanh duong / do) ---------- */
  var CSS = [
    '.tcn-sec{border:2px solid #a5d6a7;background:#f7fbf7;border-radius:12px;padding:14px;margin:12px 0}',
    '.tcn-sec h3{font-size:20px;color:#1b5e20;margin:0 0 6px}',
    '.tcn-rule{font-size:17px;line-height:1.6;color:#37474f;margin:4px 0}',
    '.tcn-q{font-size:19px;font-weight:700;text-align:center;color:#0d47a1;margin:10px 0}',
    '.tcn-msg{min-height:26px;font-size:17px;font-weight:600;color:#37474f;margin:10px 0 6px;line-height:1.5;text-align:center}',
    '.tcn-cards{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:12px 0}',
    '.tcn-card{flex:1 1 100px;max-width:170px;min-width:100px;background:#fff;border:2px solid #90a4ae;border-radius:12px;padding:10px;min-height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative}',
    '.tcn-card svg{max-width:100%;max-height:90px;pointer-events:none}',
    '.tcn-card-label{font-size:18px;font-weight:700;color:#0d47a1;line-height:1.3}',
    '.tcn-card-sub{font-size:15px;color:#555;margin-top:4px;line-height:1.3}',
    '.tcn-card.down{background:#e3f2fd;border-style:dashed}',
    '.tcn-card.down .tcn-card-label{font-size:34px;color:#1565c0}',
    '.tcn-card.missing-slot{border:2px dashed #e53935;background:#fff}',
    '.tcn-card.missing-slot .tcn-card-label{font-size:34px;color:#e53935}',
    '.tcn-card.ok{background:#e8f5e9;border-color:#43a047}',
    '.tcn-card.sai{background:#ffebee;border-color:#e53935;animation:tcnShake .35s ease}',
    '.tcn-badge{position:absolute;top:-12px;right:-8px;width:34px;height:34px;border-radius:50%;background:#1565c0;color:#fff;font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center;z-index:2}',
    '.tcn-pick{flex:1 1 100px;max-width:170px;min-width:100px;background:#fff;border:2px solid #90a4ae;border-radius:12px;padding:10px;min-height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;cursor:pointer;font-family:inherit}',
    '.tcn-pick svg{max-width:100%;max-height:90px;pointer-events:none}',
    '.tcn-pick.ok{background:#e8f5e9;border-color:#43a047}',
    '.tcn-pick.sai{background:#ffebee;border-color:#e53935;animation:tcnShake .35s ease}',
    '@keyframes tcnShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}50%{transform:translateX(4px)}75%{transform:translateX(-3px)}}',
    '.tcn-choices{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:10px 0}',
    '.tcn-choice{min-height:48px;min-width:100px;flex:1;max-width:200px;padding:10px 14px;font-size:18px;font-weight:700;border-radius:10px;border:2px solid #1565c0;background:#fff;color:#1565c0;cursor:pointer;font-family:inherit}',
    '.tcn-choice.ok{background:#e8f5e9;border-color:#43a047;color:#2e7d32}',
    '.tcn-choice.sai{background:#ffebee;border-color:#e53935;color:#c62828;animation:tcnShake .35s ease}',
    '.tcn-tools{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:12px 0 4px}',
    '.tcn-btn{min-height:48px;padding:10px 18px;border-radius:10px;font-size:17px;font-weight:700;font-family:inherit;cursor:pointer;border:2px solid #90a4ae;background:#fff;color:#37474f}',
    '.tcn-btn.primary{background:#2e7d32;border-color:#2e7d32;color:#fff}',
    '.tcn-btn.blue{background:#1565c0;border-color:#1565c0;color:#fff}',
    '.tcn-win{background:#e8f5e9;border:2px solid #43a047;border-radius:12px;padding:14px;margin:12px 0;text-align:center;font-size:18px}',
    '.tcn-time{font-size:17px;color:#37474f;margin:8px 0}',
    '.tcn-note{font-size:15px;color:#666;text-align:center;margin:4px 0}',
    /* --- to in: chi hien .print-sheet, an toan bo trang --- */
    '.print-sheet{display:none}',
    '@page{size:A4;margin:12mm}',
    '@media print{',
    ' body.tcn-printing>*:not(.print-sheet){display:none !important}',
    ' body.tcn-printing .print-sheet{display:block !important;color:#000;background:#fff}',
    ' .tcn-print h2{font-size:20pt;margin:0 0 4mm}',
    ' .tcn-print h3{font-size:16pt;margin:6mm 0 2mm}',
    ' .tcn-print p{font-size:13pt;line-height:1.5;margin:2mm 0}',
    ' .tcn-pgrid{display:grid;grid-template-columns:1fr 1fr;gap:4mm;margin:3mm 0}',
    ' .tcn-pcard{border:1.5px solid #000;border-radius:3mm;padding:4mm;text-align:center;min-height:24mm}',
    ' .tcn-pname{font-size:18pt;font-weight:700}',
    ' .tcn-psub{font-size:13pt;margin-top:1mm}',
    ' .tcn-prow{display:flex;align-items:center;gap:5mm;margin:3mm 0}',
    ' .tcn-pbox{width:18mm;height:18mm;border:1.5px solid #000;display:inline-flex;align-items:center;justify-content:center;font-size:16pt;font-weight:700;flex:none}',
    '}',
    ''
  ].join('\n');

  function injectCss() {
    if (document.getElementById('tcn-style')) return;
    var st = document.createElement('style');
    st.id = 'tcn-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ---------- trang thai (chi trong bo nho, khong localStorage) ---------- */
  var state = {
    pool: [], poolSource: '',
    opts: { viewMsN1: VIEW_MS_N1, reviewMsN1: REVIEW_MS, reviewMsN2: REVIEW_MS },
    container: null, elN1: null, elN2: null,
    n1: { level: 3, wins: 0, phase: 'idle', cards: [], missingIdx: -1, missing: null, choices: [], timer: null, startMs: 0, msg: '', levelMsg: '' },
    n2: { level: 3, wins: 0, phase: 'idle', cards: [], order: [], shown: [], picks: [], timer: null, startMs: 0, msg: '', levelMsg: '' },
    lastPrint: null   /* {n1:[card x4], seqs:[{display:[card], order:[card]} x2]} cua to vua in */
  };

  /* ---------- nguon the ---------- */
  function collectCards(arg) {
    var got = null, src = '';
    if (arg && arg.length) { got = dedupeCards(arg); src = 'init-arg'; }
    if ((!got || got.length < 3) && typeof window !== 'undefined' && window.TroChoiNhoCards && window.TroChoiNhoCards.length) {
      got = dedupeCards(window.TroChoiNhoCards); src = 'window.TroChoiNhoCards';
    }
    if ((!got || got.length < 3) && typeof window !== 'undefined') {
      var th = window.__THEORY || window.THEORY;
      if (th && th.length) { got = mapTheory(th); src = 'theory.json (window.__THEORY)'; }
    }
    if ((!got || got.length < 6) && typeof window !== 'undefined' && window.QUIZ_BANK && window.QUIZ_BANK.length) {
      var seen = {}, list = [];
      window.QUIZ_BANK.forEach(function (it) {
        if (!it || !it.options || it.answer == null) return;
        var a = String(it.options[it.answer] || '').trim();
        if (a && a.length <= 28 && !seen[a]) { seen[a] = 1; list.push({ id: 'q' + it.id, label: a, sub: '' }); }
      });
      if (list.length >= 6) { got = list; src = 'quiz.json (QUIZ_BANK: dap an dung ngan)'; }
    }
    if (!got || got.length < 3) { got = dedupeCards(FALLBACK_CARDS); src = 'fallback (ten + cong thuc theory.json)'; }
    return { cards: got, source: src };
  }

  function tryFetchTheory() {
    /* Chi nang cap kho the khi dang dung ban du phong / quiz; chay tren trang that. */
    if (state.poolSource !== 'fallback (ten + cong thuc theory.json)' &&
        state.poolSource.indexOf('quiz.json') !== 0) return;
    if (typeof fetch !== 'function') return;
    try {
      fetch('theory.json').then(function (r) { return r.json(); }).then(function (arr) {
        var mapped = mapTheory(arr);
        if (mapped.length >= 6) {
          state.pool = mapped;
          state.poolSource = 'theory.json (fetch)';
          if (state.n1.phase === 'idle') renderN1();
          if (state.n2.phase === 'idle') renderN2();
        }
      }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- ve the ---------- */
  function cardHtml(c, extraClass, badge) {
    var s = '<div class="tcn-card' + (extraClass ? ' ' + extraClass : '') + '">';
    if (badge) s += '<span class="tcn-badge">' + badge + '</span>';
    if (c.svg) s += '<div class="tcn-card-svg">' + c.svg + '</div>';
    s += '<div class="tcn-card-label">' + esc(c.label) + '</div>';
    if (c.sub) s += '<div class="tcn-card-sub">' + esc(c.sub) + '</div>';
    s += '</div>';
    return s;
  }
  function downCardHtml() {
    return '<div class="tcn-card down"><div class="tcn-card-label">?</div></div>';
  }
  function missingSlotHtml() {
    return '<div class="tcn-card missing-slot"><div class="tcn-card-label">?</div><div class="tcn-card-sub">Thẻ đã mất</div></div>';
  }
  function cardsRowHtml(cards) {
    return '<div class="tcn-cards">' + cards.map(function (c) { return cardHtml(c); }).join('') + '</div>';
  }
  function setMsg(secEl, text) {
    if (!secEl) return;
    var m = secEl.querySelector('.tcn-msg');
    if (m) m.textContent = text;
  }

  /* ================= N1 — "The nao bien mat?" ================= */
  function makeN1Choices(missing, shown) {
    var shownIds = {};
    shown.forEach(function (c) { shownIds[c.id] = 1; });
    var distract = shuffled(state.pool.filter(function (c) { return !shownIds[c.id]; }))
      .slice(0, state.n1.level - 1);
    return shuffled([missing].concat(distract));
  }

  function newGameN1() {
    var g = state.n1;
    if (g.timer) { clearTimeout(g.timer); g.timer = null; }
    if (state.pool.length < 3) {
      g.phase = 'idle'; g.msg = 'Chưa có đủ thẻ, em tải lại trang nhé.';
      renderN1(); return;
    }
    var picked = shuffled(state.pool).slice(0, g.level);
    g.cards = picked;
    g.missingIdx = Math.floor(Math.random() * picked.length);
    g.missing = picked[g.missingIdx];
    g.choices = makeN1Choices(g.missing, picked);
    g.phase = 'show'; g.startMs = Date.now(); g.msg = ''; g.levelMsg = '';
    renderN1();
    g.timer = setTimeout(function () {
      if (state.n1.phase === 'show') { state.n1.phase = 'ask'; renderN1(); }
    }, state.opts.viewMsN1);
  }

  function n1Review() {
    var g = state.n1;
    if (g.phase !== 'ask') return;
    if (g.timer) { clearTimeout(g.timer); g.timer = null; }
    g.phase = 'review';
    renderN1();
    g.timer = setTimeout(function () {
      if (state.n1.phase === 'review') { state.n1.phase = 'ask'; renderN1(); }
    }, state.opts.reviewMsN1);
  }

  function n1Choose(idx, btn) {
    var g = state.n1;
    if (g.phase !== 'ask') return;
    var ch = g.choices[idx];
    if (!ch) return;
    if (ch.id === g.missing.id) {
      if (g.timer) { clearTimeout(g.timer); g.timer = null; }
      g.phase = 'done';
      g.wins++;
      if (g.wins >= 2 && g.level === 3) { g.level = 4; g.wins = 0; g.levelMsg = 'Em chơi giỏi quá, lên 4 thẻ nhé!'; }
      renderN1();
    } else {
      btn.classList.add('sai');
      setMsg(state.elN1, 'Chưa đúng, em chọn lại nhé.');
      setTimeout(function () { btn.classList.remove('sai'); }, 600);
    }
  }

  function renderN1() {
    var g = state.n1, sec = state.elN1;
    if (!sec) return;
    var h = '<h3>🧠 N1 — Thẻ nào biến mất?</h3>'
      + '<p class="tcn-rule">1) Em nhìn kỹ các thẻ.</p>'
      + '<p class="tcn-rule">2) Máy che lại, lấy đi 1 thẻ.</p>'
      + '<p class="tcn-rule">3) Em chọn thẻ vừa biến mất.</p>';
    if (g.phase === 'idle') {
      h += '<p class="tcn-msg">' + esc(g.msg || 'Em bấm “Bắt đầu” để chơi nhé.') + '</p>'
        + '<div class="tcn-tools"><button type="button" class="tcn-btn primary" data-tcn="n1-start">▶ Bắt đầu</button></div>';
    } else if (g.phase === 'show') {
      h += '<p class="tcn-msg">Em nhìn kỹ các thẻ này nhé.</p>'
        + cardsRowHtml(g.cards)
        + '<p class="tcn-note">Máy sẽ che lại sau ít giây.</p>';
    } else if (g.phase === 'review') {
      h += '<p class="tcn-msg">Em nhìn lại nhé.</p>' + cardsRowHtml(g.cards);
    } else if (g.phase === 'ask') {
      h += '<p class="tcn-q">Thẻ nào vừa biến mất?</p><div class="tcn-cards">';
      g.cards.forEach(function (c, i) {
        h += (i === g.missingIdx) ? missingSlotHtml() : downCardHtml();
      });
      h += '</div><div class="tcn-choices">';
      g.choices.forEach(function (ch, i) {
        h += '<button type="button" class="tcn-choice" data-tcn="n1-choice" data-idx="' + i + '">' + esc(ch.label) + '</button>';
      });
      h += '</div><p class="tcn-msg">' + esc(g.msg || 'Em bấm vào 1 thẻ để chọn nhé.') + '</p>'
        + '<div class="tcn-tools">'
        + '<button type="button" class="tcn-btn" data-tcn="n1-review">👀 Xem lại 5 giây</button>'
        + '<button type="button" class="tcn-btn" data-tcn="n1-new">🔀 Ván mới</button>'
        + '</div>';
    } else if (g.phase === 'done') {
      h += '<div class="tcn-cards">';
      g.cards.forEach(function (c, i) {
        h += (i === g.missingIdx) ? cardHtml(c, 'ok') : downCardHtml();
      });
      h += '</div><div class="tcn-win">🎉 Đúng rồi! Đây là thẻ đã mất.'
        + '<div class="tcn-time">' + esc(fmtTime(Date.now() - g.startMs)) + '</div>'
        + (g.levelMsg ? '<div>' + esc(g.levelMsg) + '</div>' : '')
        + '<div class="tcn-tools"><button type="button" class="tcn-btn primary" data-tcn="n1-new">🔀 Ván mới</button></div>'
        + '</div>';
    }
    sec.innerHTML = h;
  }

  /* ================= N2 — "Xep dung thu tu" ================= */
  function newGameN2() {
    var g = state.n2;
    if (g.timer) { clearTimeout(g.timer); g.timer = null; }
    if (state.pool.length < 3) {
      g.phase = 'idle'; g.msg = 'Chưa có đủ thẻ, em tải lại trang nhé.';
      renderN2(); return;
    }
    var picked = shuffled(state.pool).slice(0, g.level);
    g.cards = picked;
    g.order = picked.map(function (c) { return c.id; });
    g.shown = [];
    g.picks = [];
    g.phase = 'show'; g.startMs = Date.now(); g.msg = ''; g.levelMsg = '';
    renderN2();
  }

  function n2Hide() {
    var g = state.n2;
    if (g.phase !== 'show') return;
    var s = shuffled(g.cards);
    var tries = 0;
    while (tries++ < 5 && s.map(function (c) { return c.id; }).join() === g.order.join()) s = shuffled(g.cards);
    g.shown = s;
    g.phase = 'recall';
    renderN2();
  }

  function n2Review() {
    var g = state.n2;
    if (g.phase !== 'recall') return;
    if (g.timer) { clearTimeout(g.timer); g.timer = null; }
    g.phase = 'review';
    renderN2();
    g.timer = setTimeout(function () {
      if (state.n2.phase === 'review') { state.n2.phase = 'recall'; renderN2(); }
    }, state.opts.reviewMsN2);
  }

  function n2Pick(id, btn) {
    var g = state.n2;
    if (g.phase !== 'recall') return;
    var pos = g.picks.indexOf(id);
    if (pos >= 0) {
      /* Bam lai the da chon de bo so do; cac so sau tu don lai. */
      g.picks.splice(pos, 1);
      g.msg = '';
      renderN2();
      return;
    }
    /* The tiep theo phai la the som nhat trong thu tu goc ma be chua chon. */
    var next = null;
    for (var i = 0; i < g.order.length; i++) {
      if (g.picks.indexOf(g.order[i]) < 0) { next = g.order[i]; break; }
    }
    if (id === next) {
      g.picks.push(id);
      g.msg = '';
      if (g.picks.length === g.order.length) {
        var ok = g.picks.every(function (v, k) { return v === g.order[k]; });
        if (ok) {
          g.phase = 'done';
          g.wins++;
          if (g.wins >= 2 && g.level < 5) {
            g.level++;
            g.wins = 0;
            g.levelMsg = 'Em chơi giỏi quá, lên ' + g.level + ' thẻ nhé!';
          }
        } else {
          g.msg = 'Thứ tự chưa đúng, em bấm lại 1 thẻ để bỏ số rồi xếp lại nhé.';
        }
      }
      renderN2();
    } else {
      btn.classList.add('sai');
      setMsg(state.elN2, 'Chưa phải thẻ này, em thử lại nhé.');
      setTimeout(function () { btn.classList.remove('sai'); }, 600);
    }
  }

  function n2PickHtml(c) {
    var g = state.n2;
    var pos = g.picks.indexOf(c.id);
    var badge = pos >= 0 ? BADGES[pos] : '';
    var s = '<button type="button" class="tcn-pick' + (pos >= 0 ? ' ok' : '') + '" data-tcn="n2-pick" data-id="' + esc(c.id) + '">';
    if (badge) s += '<span class="tcn-badge">' + badge + '</span>';
    if (c.svg) s += '<div class="tcn-card-svg">' + c.svg + '</div>';
    s += '<div class="tcn-card-label">' + esc(c.label) + '</div>';
    if (c.sub) s += '<div class="tcn-card-sub">' + esc(c.sub) + '</div>';
    s += '</button>';
    return s;
  }

  function renderN2() {
    var g = state.n2, sec = state.elN2;
    if (!sec) return;
    var h = '<h3>🔢 N2 — Xếp đúng thứ tự</h3>'
      + '<p class="tcn-rule">1) Em nhớ thứ tự các thẻ.</p>'
      + '<p class="tcn-rule">2) Em bấm “Giấu đi” khi nhớ rồi.</p>'
      + '<p class="tcn-rule">3) Em bấm lại theo đúng thứ tự lúc nãy.</p>';
    if (g.phase === 'idle') {
      h += '<p class="tcn-msg">' + esc(g.msg || 'Em bấm “Bắt đầu” để chơi nhé.') + '</p>'
        + '<div class="tcn-tools"><button type="button" class="tcn-btn primary" data-tcn="n2-start">▶ Bắt đầu</button></div>';
    } else if (g.phase === 'show') {
      h += '<p class="tcn-msg">Em nhớ thứ tự này nhé.</p>'
        + '<p class="tcn-note">Từ trái sang phải.</p>'
        + cardsRowHtml(g.cards)
        + '<div class="tcn-tools">'
        + '<button type="button" class="tcn-btn primary" data-tcn="n2-hide">🙈 Giấu đi</button>'
        + '<button type="button" class="tcn-btn" data-tcn="n2-new">🔀 Ván mới</button>'
        + '</div>';
    } else if (g.phase === 'review') {
      h += '<p class="tcn-msg">Em nhìn lại thứ tự nhé.</p>' + cardsRowHtml(g.cards);
    } else if (g.phase === 'recall') {
      h += '<p class="tcn-msg">Em bấm theo đúng thứ tự lúc nãy nhé.</p>'
        + '<div class="tcn-cards">' + g.shown.map(n2PickHtml).join('') + '</div>'
        + '<p class="tcn-msg">' + esc(g.msg || 'Bấm lại thẻ đã chọn để bỏ số đó.') + '</p>'
        + '<div class="tcn-tools">'
        + '<button type="button" class="tcn-btn" data-tcn="n2-review">👀 Xem lại thứ tự 5 giây</button>'
        + '<button type="button" class="tcn-btn" data-tcn="n2-new">🔀 Ván mới</button>'
        + '</div>';
    } else if (g.phase === 'done') {
      h += '<div class="tcn-cards">'
        + g.cards.map(function (c, i) { return cardHtml(c, 'ok', BADGES[i]); }).join('')
        + '</div><div class="tcn-win">🎉 Thắng rồi! Em xếp đúng hết.'
        + '<div class="tcn-time">' + esc(fmtTime(Date.now() - g.startMs)) + '</div>'
        + (g.levelMsg ? '<div>' + esc(g.levelMsg) + '</div>' : '')
        + '<div class="tcn-tools"><button type="button" class="tcn-btn primary" data-tcn="n2-new">🔀 Ván mới</button></div>'
        + '</div>';
    }
    sec.innerHTML = h;
  }

  /* ================= In ================= */
  function takeCards(n, used) {
    var avail = shuffled(state.pool).filter(function (c) { return !used[c.id]; });
    var out = avail.slice(0, n);
    out.forEach(function (c) { used[c.id] = 1; });
    if (out.length < n) {
      var more = shuffled(state.pool).filter(function (c) {
        return out.map(function (x) { return x.id; }).indexOf(c.id) < 0;
      }).slice(0, n - out.length);
      out = out.concat(more);
    }
    return out;
  }
  function makePrintPair() {
    var used = {};
    var n1 = takeCards(4, used);
    function seq(n) {
      var order = takeCards(n, used);
      var display = shuffled(order);
      var tries = 0;
      while (tries++ < 5 && display.map(function (c) { return c.id; }).join() === order.map(function (c) { return c.id; }).join()) {
        display = shuffled(order);
      }
      return { display: display, order: order };
    }
    return { n1: n1, seqs: [seq(3), seq(4)] };
  }
  function printRowHtml(c, boxText) {
    var row = el('div', 'tcn-prow');
    row.appendChild(el('span', 'tcn-pbox', boxText));
    row.appendChild(el('span', 'tcn-pname', c.label));
    return row;
  }

  /* To in chung N1+N2 cho be — KHONG dap an. */
  function buildPrintSheet() {
    var pair = makePrintPair();
    state.lastPrint = pair;
    var sheet = el('div', 'print-sheet tcn-print');
    sheet.appendChild(el('h2', null, 'Trò chơi nhớ — Tờ chơi'));
    sheet.appendChild(el('p', null, 'Họ tên: ..............................   Ngày: ..../..../....'));
    sheet.appendChild(el('h3', null, 'N1 — Thẻ nào biến mất?'));
    sheet.appendChild(el('p', null, 'Em nhìn kỹ 4 thẻ. Ba mẹ che 1 thẻ. Em nói tên thẻ bị che.'));
    var grid = el('div', 'tcn-pgrid');
    pair.n1.forEach(function (c) {
      var card = el('div', 'tcn-pcard');
      card.appendChild(el('div', 'tcn-pname', c.label));
      if (c.sub) card.appendChild(el('div', 'tcn-psub', c.sub));
      grid.appendChild(card);
    });
    sheet.appendChild(grid);
    sheet.appendChild(el('h3', null, 'N2 — Xếp đúng thứ tự'));
    sheet.appendChild(el('p', null, 'Ba mẹ cho em xem các thẻ theo thứ tự trước, rồi che lại. Em viết số 1, 2, 3… vào ô □ theo thứ tự em nhớ.'));
    pair.seqs.forEach(function (sq, k) {
      sheet.appendChild(el('p', null, 'Dãy ' + (k + 1)));
      sq.display.forEach(function (c) { sheet.appendChild(printRowHtml(c, '□')); });
    });
    sheet.appendChild(el('p', null, 'In từ máy tính sẽ đẹp hơn.'));
    return sheet;
  }

  /* To dap an N2 rieng cho ba me — khop voi to de vua in gan nhat. N1 khong co dap an in. */
  function buildAnswerSheet() {
    var pair = state.lastPrint;
    if (!pair) {
      pair = makePrintPair();
      state.lastPrint = pair;
    }
    var sheet = el('div', 'print-sheet tcn-print');
    sheet.appendChild(el('h2', null, 'Đáp án N2 — chỉ ba mẹ giữ'));
    sheet.appendChild(el('p', null, 'Trò chơi nhớ — tờ đáp án N2. (N1 không có đáp án in: ba mẹ tự che thẻ.)'));
    pair.seqs.forEach(function (sq, k) {
      sheet.appendChild(el('p', null, 'Dãy ' + (k + 1)));
      sq.display.forEach(function (c) {
        var num = sq.order.map(function (x) { return x.id; }).indexOf(c.id) + 1;
        sheet.appendChild(printRowHtml(c, String(num)));
      });
      sheet.appendChild(el('p', null, 'Thứ tự đúng: ' + sq.order.map(function (c) { return c.label; }).join(' → ')));
    });
    return sheet;
  }

  function printSheet(kind) {
    var old = document.querySelector('body > .print-sheet');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var sheet = kind === 'dap-an' ? buildAnswerSheet() : buildPrintSheet();
    document.body.appendChild(sheet);
    document.body.classList.add('tcn-printing');
    var done = false;
    var cleanup = function () {
      if (done) return;
      done = true;
      document.body.classList.remove('tcn-printing');
      if (sheet.parentNode) sheet.parentNode.removeChild(sheet);
      if (typeof window !== 'undefined' && window.removeEventListener) {
        window.removeEventListener('afterprint', cleanup);
      }
    };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('afterprint', cleanup);
    }
    setTimeout(cleanup, 3000);
    if (typeof window !== 'undefined' && typeof window.print === 'function') window.print();
  }

  /* ================= init (goi duoc nhieu lan, khong nhan doi su kien) ================= */
  function onContainerClick(e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-tcn]') : null;
    if (!t || !state.container || !state.container.contains(t)) return;
    var act = t.getAttribute('data-tcn');
    if (act === 'n1-start' || act === 'n1-new') newGameN1();
    else if (act === 'n1-review') n1Review();
    else if (act === 'n1-choice') n1Choose(parseInt(t.getAttribute('data-idx'), 10), t);
    else if (act === 'n2-start' || act === 'n2-new') newGameN2();
    else if (act === 'n2-hide') n2Hide();
    else if (act === 'n2-review') n2Review();
    else if (act === 'n2-pick') n2Pick(t.getAttribute('data-id'), t);
    else if (act === 'print') printSheet('de');
    else if (act === 'print-ans') printSheet('dap-an');
  }

  function init(container, cards, opts) {
    var root = null;
    if (typeof container === 'string') root = document.querySelector(container);
    else if (container && container.nodeType === 1) root = container;
    if (!root) root = document.getElementById('gameNho');
    if (!root) return;
    if (opts) {
      if (opts.viewMsN1) state.opts.viewMsN1 = opts.viewMsN1;
      if (opts.reviewMsN1) state.opts.reviewMsN1 = opts.reviewMsN1;
      if (opts.reviewMsN2) state.opts.reviewMsN2 = opts.reviewMsN2;
    }
    if (state.n1.timer) { clearTimeout(state.n1.timer); state.n1.timer = null; }
    if (state.n2.timer) { clearTimeout(state.n2.timer); state.n2.timer = null; }
    state.n1.phase = 'idle'; state.n1.msg = '';
    state.n2.phase = 'idle'; state.n2.msg = '';
    var found = collectCards(cards);
    state.pool = found.cards;
    state.poolSource = found.source;
    state.container = root;
    injectCss();
    root.innerHTML = '<div class="tcn-sec" id="gameNhoN1"></div>'
      + '<div class="tcn-sec" id="gameNhoN2"></div>'
      + '<div class="tcn-tools">'
      + '<button type="button" class="tcn-btn" data-tcn="print">🖨️ In tờ chơi</button>'
      + '<button type="button" class="tcn-btn blue" data-tcn="print-ans">🖨️ In đáp án N2 (cho ba mẹ)</button>'
      + '</div>'
      + '<p class="tcn-note">In từ máy tính sẽ đẹp hơn.</p>';
    state.elN1 = root.querySelector('#gameNhoN1');
    state.elN2 = root.querySelector('#gameNhoN2');
    if (!root.__tcnBound) {
      root.addEventListener('click', onContainerClick);
      root.__tcnBound = true;
    }
    renderN1();
    renderN2();
    tryFetchTheory();
  }

  function setCards(cards) {
    var found = collectCards(cards);
    state.pool = found.cards;
    state.poolSource = found.source;
    if (state.n1.phase === 'idle') renderN1();
    if (state.n2.phase === 'idle') renderN2();
  }

  window.TroChoiNho = {
    init: init,
    newGameN1: newGameN1,
    newGameN2: newGameN2,
    buildPrintSheet: buildPrintSheet,
    buildAnswerSheet: buildAnswerSheet,
    setCards: setCards,
    getCards: function () { return state.pool.slice(); },
    getPoolSource: function () { return state.poolSource; },
    _state: state
  };
})();
