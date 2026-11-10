/* ===== TRO CHOI N3 "NHO NOI DUNG" (Toan 6) — file tu dung, chi can 1 container id="gameNhoNoiDung" =====
   Cach dung (nguoi tich hop them vao toan/index.html):
     <div id="gameNhoNoiDung"></div>
     <script src="trochoi-nhonoidung.js?v=20261108"></script>
     <script>TroChoiNhoNoiDung.init(document.getElementById('gameNhoNoiDung'), theory);</script>
   - CHI lam N3 "Nho noi dung" (phuong an ke-hoach-tro-choi-nho-noi-dung.md §1-§12).
     2 cach choi, moi vong chi 1 cach: Cach 1 "Nhin roi nho" (xem 20 giay) va
     Cach 2 "Nghe roi nho" (may doc tieng Viet). 1 vong 5 cau, moi cau 1 the khac nhau.
   - Noi dung CHI lay tu theory.json (21 the). LOAI RA: tap-hop, hon-so,
     bieu-do-cot-kep, truc-so-nguyen; phan-so chi dung vi du 6/8 = 3/4 (khong dung
     cong thuc tong quat a/b...); goc chi dung vi du goc xOy = 60° (khong dung chuoi
     phan loai Nhon < 90° < Tu < 180°). Moi cau = 1 the: 1 hinh SVG + ten + 1 cong
     thuc rut gon TAY (<= ~120 ky tu) + chu thich rut gon 5-7 tu. Khong bia noi dung
     moi, khong lay nguyen fact dai. 5 cau mau moi cach trong §4 la hat giong dau
     tien; them cau cho du 17 the dung duoc.
   - Thu tu de: cau dau moi vong la the co doan hien thi NGAN NHAT trong 5 the cua
     vong do (do theo do dai chuoi display). Cac cau sau xao tron theo do dai tang dan.
   - Cham diem theo §5 (KHONG theo vi du 7,5đ o §12 — vi du do tinh theo trong so
     deu, mau thuan voi thang nhom 3/4/3 cua §5): moi cau 10 diem = ten khai niem 3đ
     (1 tu khoa) + cong thuc 4đ (2 tu khoa, moi tu 2đ) + y chinh 3đ (1 tu khoa).
     Thieu 1 tu khoa cong thuc = 8đ; thieu tu khoa ten/y chinh = 7đ. So phai khop
     tuyet doi; dung sai 1 ky tu cho tu dai >=5 ky tu (khong ap cho so/ten rieng).
   - Lich su: chi tro nay, localStorage khoa toan6_nhonoidung_v1, toi da 20 vong.
   - In: CHI in bao cao lich su cho ba me (khong in de/cau hoi).
   - Giong doc: KHONG nap ../assets/giong-doc.js — file do luon tu ve 1 o select
     giong (khong co mount thi chen len dau <body>), trang Toan khong co neo/viewctl
     cho o do nen se lam o select la xuat hien tren dau moi bai Toan. Tro nay tu
     chon giong theo §3: getVoices() ngay + nghe voiceschanged, uu tien lang vi-VN
     > vi, roi ten chua "Vietnamese"/"Tieng Viet", cuoi cung giong mac dinh.
     rate mac dinh 0.85 ("Doc cham"), "Doc thuong" = 1.0.
   - Bai hoc bat buoc (loi N1 dot truoc): CSS dat width:100% + height:auto cho svg
     trong the (.tnnd-card-svg{width:100%} va .tnnd-card-svg svg{width:100%}).
   - Nguon the khi init (giong Nho): 1) tham so cards truyen vao init/setCards;
     2) window.__THEORY / window.THEORY; 3) kho du phong trong file (noi dung tay
     cua 17 the dung duoc, svg trong — chi dung khi theory chua ve). KHONG fetch
     theory.json lan nua; polling setCards(theory) 40 lan x 500ms do trang tich hop
     dam nhiem (giong Nho). Ham getPoolSource() cho biet the dang dung lay tu dau. */
(function () {
  'use strict';

  /* ---------- noi dung tay: 17 the dung duoc (display/spoken/kw) ----------
     display: ten + 1 cong thuc + chu thich rut gon (<= ~120 ky tu).
     spoken: doan may doc, < 15 tu, <= 140 ky tu (ky hieu da chuyen thanh loi).
     kw: 4 tu khoa/cau theo thu tu [ten 3đ, cong thuc 2đ, cong thuc 2đ, y chinh 3đ].
     Tu khoa viet o dang DA CHUAN HOA (khong dau, token chuan: x = nhan, chia = phep
     chia, do = °, be hon = <, lon hon = >) de khop ham norm() ben duoi.
     extra: cum them 3-5 tu (tu fact trong theory.json) de keo dai doan o vong 2+. */
  var ITEMS = [
    { id: 'hinh-vuong', display: 'Hình vuông — Chu vi: C = a × 4; a là độ dài cạnh',
      spoken: 'Hình vuông. Chu vi bằng cạnh nhân bốn.', extra: 'bốn cạnh bằng nhau',
      kw: [{ t: 'hinh vuong', pts: 3 }, { t: 'c = a', pts: 2 }, { t: 'a x 4', pts: 2 }, { t: 'do dai canh', pts: 3 }] },
    { id: 'tam-giac-deu', display: 'Tam giác đều — Chu vi: C = a × 3; a là độ dài cạnh',
      spoken: 'Tam giác đều. Chu vi bằng cạnh nhân ba.', extra: 'ba cạnh bằng nhau',
      kw: [{ t: 'tam giac deu', pts: 3 }, { t: 'c = a', pts: 2 }, { t: 'a x 3', pts: 2 }, { t: 'do dai canh', pts: 3 }] },
    { id: 'hinh-chu-nhat', display: 'Hình chữ nhật — S = a × b; chiều dài a, chiều rộng b',
      spoken: 'Hình chữ nhật. Diện tích bằng dài nhân rộng.', extra: 'bốn góc vuông',
      kw: [{ t: 'hinh chu nhat', pts: 3 }, { t: 's = a', pts: 2 }, { t: 'a x b', pts: 2 }, { t: 'chieu dai chieu rong', pts: 3 }] },
    { id: 'luc-giac-deu', display: 'Lục giác đều — C = a × 6; a là độ dài cạnh',
      spoken: 'Lục giác đều. Chu vi bằng cạnh nhân sáu.', extra: 'sáu cạnh bằng nhau',
      kw: [{ t: 'luc giac deu', pts: 3 }, { t: 'c = a', pts: 2 }, { t: 'a x 6', pts: 2 }, { t: 'do dai canh', pts: 3 }] },
    { id: 'hinh-thoi', display: 'Hình thoi — C = a × 4; a là độ dài cạnh',
      spoken: 'Hình thoi. Chu vi bằng cạnh nhân bốn.', extra: 'bốn cạnh bằng nhau',
      kw: [{ t: 'hinh thoi', pts: 3 }, { t: 'c = a', pts: 2 }, { t: 'a x 4', pts: 2 }, { t: 'do dai canh', pts: 3 }] },
    { id: 'hinh-binh-hanh', display: 'Hình bình hành — S = a × h; đáy a, chiều cao h',
      spoken: 'Hình bình hành. Diện tích bằng đáy nhân chiều cao.', extra: 'cạnh đối song song',
      kw: [{ t: 'hinh binh hanh', pts: 3 }, { t: 's = a', pts: 2 }, { t: 'a x h', pts: 2 }, { t: 'chieu cao h', pts: 3 }] },
    { id: 'hinh-thang-can', display: 'Hình thang cân — S = (a + b) × h : 2; a đáy lớn, b đáy nhỏ',
      spoken: 'Hình thang cân. Diện tích bằng tổng hai đáy nhân chiều cao chia hai.', extra: 'hai cạnh bên bằng nhau',
      kw: [{ t: 'hinh thang can', pts: 3 }, { t: 's = a + b', pts: 2 }, { t: 'x h chia 2', pts: 2 }, { t: 'day lon day nho', pts: 3 }] },
    { id: 'tam-giac-thuong', display: 'Tam giác thường — C = a + b + c; ba cạnh cộng lại',
      spoken: 'Tam giác thường. Chu vi bằng ba cạnh cộng lại.', extra: 'ba cạnh khác nhau',
      kw: [{ t: 'tam giac thuong', pts: 3 }, { t: 'c = a', pts: 2 }, { t: 'a + b + c', pts: 2 }, { t: 'ba canh cong lai', pts: 3 }] },
    { id: 'tam-giac-vuong', display: 'Tam giác vuông — C = a + b + c; cạnh huyền dài nhất',
      spoken: 'Tam giác vuông. Chu vi bằng ba cạnh cộng lại.', extra: 'một góc vuông',
      kw: [{ t: 'tam giac vuong', pts: 3 }, { t: 'c = a', pts: 2 }, { t: 'a + b + c', pts: 2 }, { t: 'canh huyen dai nhat', pts: 3 }] },
    { id: 'phan-so', display: 'Phân số bằng nhau — 6/8 = 3/4; chia cả tử và mẫu cho 2',
      spoken: 'Sáu phần tám bằng ba phần bốn.', extra: 'cùng một phần',
      kw: [{ t: 'phan so bang nhau', pts: 3 }, { t: '6 / 8', pts: 2, alt: ['sau phan tam'] }, { t: '3 / 4', pts: 2, alt: ['ba phan bon'] }, { t: 'chia ca tu va mau cho 2', pts: 3 }] },
    { id: 'tia-so', display: 'Tia số — a < b; điểm a nằm bên trái điểm b',
      spoken: 'Tia số. a bé hơn b khi a ở bên trái b.', extra: 'bên phải lớn hơn',
      kw: [{ t: 'tia so', pts: 3 }, { t: 'a be hon b', pts: 2 }, { t: 'diem a nam ben trai', pts: 2 }, { t: 'ben trai be hon', pts: 3 }] },
    { id: 'diem-duong-thang', display: 'Điểm và đường thẳng — Qua 2 điểm chỉ có 1 đường thẳng; điểm nằm trên đường thẳng',
      spoken: 'Điểm và đường thẳng. Qua hai điểm chỉ có một đường thẳng.', extra: 'điểm thuộc đường thẳng',
      kw: [{ t: 'diem va duong thang', pts: 3 }, { t: 'qua 2 diem', pts: 2, alt: ['qua hai diem'] }, { t: 'chi co 1 duong thang', pts: 2, alt: ['chi co mot duong thang'] }, { t: 'nam tren duong thang', pts: 3 }] },
    { id: 'tia', display: 'Tia — Tia OA, tia OB đối nhau; chung gốc O, ngược hướng',
      spoken: 'Tia OA và tia OB đối nhau, chung gốc O.', extra: 'ngược hướng nhau',
      kw: [{ t: 'tia', pts: 3 }, { t: 'tia oa', pts: 2 }, { t: 'tia ob', pts: 2 }, { t: 'chung goc o', pts: 3 }] },
    { id: 'doan-thang-trung-diem', display: 'Đoạn thẳng và trung điểm — AB = 10 cm, MA = 5 cm; 10 : 2 = 5',
      spoken: 'Trung điểm chia đoạn thẳng thành hai phần bằng nhau.', extra: 'MA bằng MB',
      kw: [{ t: 'doan thang va trung diem', pts: 3, alt: ['trung diem'] }, { t: 'ab = 10 cm', pts: 2 }, { t: 'ma = 5 cm', pts: 2 }, { t: '10 chia 2 = 5', pts: 3 }] },
    { id: 'goc', display: 'Góc — Góc xOy = 60°; 60 độ bé hơn 90 độ, góc nhọn',
      spoken: 'Góc xOy bằng sáu mươi độ, là góc nhọn.', extra: 'đỉnh O ở giữa',
      kw: [{ t: 'goc', pts: 3 }, { t: 'goc xoy', pts: 2 }, { t: '60 do', pts: 2, alt: ['sau muoi do'] }, { t: 'goc nhon', pts: 3 }] },
    { id: 'so-do-goc', display: 'Số đo góc — góc xOz = góc xOy + góc yOz; Oy nằm giữa Ox, Oz',
      spoken: 'Số đo góc. Góc xOz bằng góc xOy cộng góc yOz.', extra: 'đơn vị là độ',
      kw: [{ t: 'so do goc', pts: 3 }, { t: 'goc xoz = goc xoy', pts: 2 }, { t: 'goc xoy + goc yoz', pts: 2 }, { t: 'oy nam giua ox oz', pts: 3 }] },
    { id: 'bieu-do-cot', display: 'Biểu đồ cột — Cột cao hơn = số lớn hơn; gióng đầu cột sang trục dọc',
      spoken: 'Biểu đồ cột. Cột cao hơn là số lớn hơn.', extra: 'trục dọc đọc số',
      kw: [{ t: 'bieu do cot', pts: 3 }, { t: 'cot cao hon', pts: 2 }, { t: 'so lon hon', pts: 2 }, { t: 'giong dau cot sang truc doc', pts: 3 }] }
  ];
  var EXCLUDED = ['tap-hop', 'hon-so', 'bieu-do-cot-kep', 'truc-so-nguyen'];
  var LS_KEY = 'toan6_nhonoidung_v1';
  var LS_STATE = 'toan6_nhonoidung_state_v1'; /* luu do kho + so vong de tai lai trang khong mat */
  var MAX_ROUNDS = 20;
  var ROUND_LEN = 5;
  var TIPS = [
    'Lần sau nhìn hình, đọc to công thức 2 lần rồi mới ghi.',
    'Lần sau che đáp án, tự nói lại 1 lần rồi mới ghi.',
    'Lần sau ghi tên khái niệm trước, rồi mới ghi công thức.',
    'Lần sau đọc chậm từng cụm, ghi ngay cụm vừa đọc.'
  ];

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
  function lev(a, b) {
    var m = a.length, n = b.length, i, j, d = [];
    if (!m) return n;
    if (!n) return m;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
    }
    return d[m][n];
  }

  /* Chuan hoa §5: chu thuong, bo dau tieng Viet, gop khoang trang, bo dau cau,
     chuan hoa so (dau phay thap phan -> dau cham, bo dau phan cach nghin),
     map dong nghia: x, X, sao, ×, "nhan" -> "x"; ÷, hai cham, "chia" -> "chia"; "do" thay °. */
  function norm(s) {
    var t = String(s == null ? '' : s).toLowerCase();
    t = t.replace(/(\d),(\d)/g, '$1.$2');                 /* 1,5 -> 1.5 */
    t = t.replace(/(\d)[.](\d{3})(?=\D|$)/g, '$1$2');    /* 1.000 -> 1000 */
    t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
    t = t.replace(/[×\*]/g, ' x ').replace(/nhân/g, ' x ');
    t = t.replace(/÷/g, ' chia ').replace(/:/g, ' chia ');
    t = t.replace(/°/g, ' do ');
    t = t.replace(/∈/g, ' thuoc ').replace(/</g, ' be hon ').replace(/>/g, ' lon hon ');
    t = t.replace(/−/g, ' - ');
    t = t.replace(/\//g, ' / ').replace(/=/g, ' = ').replace(/\+/g, ' + ');
    t = t.replace(/[^a-z0-9\/=+\- .]/g, ' ');
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }
  function wordsOf(normed) { return normed ? normed.split(' ') : []; }
  function wordHit(w, typedWords) {
    for (var i = 0; i < typedWords.length; i++) {
      var tw = typedWords[i];
      if (tw === w) return true;
      if (/^[a-z]+$/.test(w) && w.length >= 5 && /^[a-z]+$/.test(tw) && lev(w, tw) <= 1) return true;
    }
    return false;
  }
  function kwHit(cand, typedNorm, typedWords) {
    var padded = ' ' + typedNorm + ' ';
    if (padded.indexOf(' ' + cand + ' ') >= 0) return true;
    if (/\d/.test(cand)) return false; /* so: khop tuyet doi, khong dung sai */
    var ws = cand.split(' ');
    if (ws.length === 1) return wordHit(cand, typedWords);
    for (var i = 0; i < ws.length; i++) if (!wordHit(ws[i], typedWords)) return false;
    return true;
  }
  /* Tim lai dang co dau cua 1 tu khoa (da chuan hoa) trong doan hien thi, de
     hien "Con thieu" bang chu co dau cho be/ba me de doc. Khong tim thay thi
     tra lai chinh tu khoa — chi doi cach hien, khong doi cach cham. */
  function displayPhrase(text, normKw) {
    var words = String(text || '').split(/\s+/).filter(Boolean);
    var nws = words.map(function (w) { return norm(w); });
    var kw = String(normKw || '').split(' ').filter(Boolean);
    if (!kw.length || !words.length) return normKw;
    for (var i = 0; i + kw.length <= nws.length; i++) {
      var ok = true;
      for (var j = 0; j < kw.length; j++) if (nws[i + j] !== kw[j]) { ok = false; break; }
      if (ok) return words.slice(i, i + kw.length).join(' ');
    }
    return normKw;
  }
  function missDisplayList(displayText, miss) {
    return (miss || []).map(function (k) { return displayPhrase(displayText, k); });
  }
  /* Cham 1 cau: tra {score, hit:[tu khoa], miss:[tu khoa], missDisp:[dang co dau]}. */
  function grade(typed, item) {
    var tn = norm(typed), tw = wordsOf(tn), score = 0, hit = [], miss = [];
    item.kw.forEach(function (k) {
      var cands = [k.t].concat(k.alt || []);
      var ok = false;
      for (var i = 0; i < cands.length; i++) if (kwHit(cands[i], tn, tw)) { ok = true; break; }
      if (ok) { score += k.pts; hit.push(k.t); } else miss.push(k.t);
    });
    var disp = '';
    try { disp = qDisplay(item); } catch (e) { disp = item.display || ''; }
    return { score: score, hit: hit, miss: miss, missDisp: missDisplayList(disp, miss) };
  }
  /* Chuyen ky hieu thanh loi (§3) — dung khi can doc mot doan chua co ban spoken tay. */
  function toSpeech(text) {
    var t = String(text || '');
    t = t.replace(/\{([^}]*)\}/g, 'tập hợp gồm $1');
    t = t.replace(/(\d+)\/(\d+)/g, '$1 phần $2');
    t = t.replace(/[×\*]/g, ' nhân ').replace(/÷/g, ' chia ').replace(/:/g, ' chia ');
    t = t.replace(/=/g, ' bằng ').replace(/°/g, ' độ ').replace(/∈/g, ' thuộc ');
    t = t.replace(/</g, ' bé hơn ').replace(/>/g, ' lớn hơn ');
    t = t.replace(/−/g, ' trừ ');
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }
  function splitSpoken(text) {
    var parts = String(text || '').split(/(?<=[.!?])\s+/);
    var out = [], cur = '';
    parts.forEach(function (p) {
      if (!p) return;
      if ((cur + ' ' + p).trim().length <= 140) cur = (cur + ' ' + p).trim();
      else { if (cur) out.push(cur); cur = p; }
    });
    if (cur) out.push(cur);
    return out.length ? out : [String(text || '')];
  }

  /* ---------- CSS ---------- */
  var CSS = [
    '.tnnd-sec{border:2px solid #a5d6a7;background:#f7fbf7;border-radius:12px;padding:14px;margin:12px 0;box-sizing:border-box;max-width:100%}',
    '.tnnd-sec h3{font-size:20px;color:#1b5e20;margin:0 0 6px}',
    '.tnnd-rule{font-size:17px;line-height:1.6;color:#37474f;margin:4px 0}',
    '.tnnd-msg{min-height:26px;font-size:17px;font-weight:600;color:#37474f;margin:10px 0 6px;line-height:1.5;text-align:center}',
    '.tnnd-note{font-size:15px;color:#666;text-align:center;margin:4px 0;line-height:1.5}',
    '.tnnd-warn{font-size:16px;color:#e65100;text-align:center;margin:6px 0;line-height:1.5}',
    '.tnnd-tools{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:12px 0 4px}',
    '.tnnd-btn{min-height:48px;padding:10px 18px;border-radius:10px;font-size:17px;font-weight:700;font-family:inherit;cursor:pointer;border:2px solid #90a4ae;background:#fff;color:#37474f;box-sizing:border-box;max-width:100%}',
    '.tnnd-btn.primary{background:#2e7d32;border-color:#2e7d32;color:#fff}',
    '.tnnd-btn.blue{background:#1565c0;border-color:#1565c0;color:#fff}',
    '.tnnd-btn:disabled{opacity:.45;cursor:default}',
    '.tnnd-btn.sel{background:#e3f2fd;border-color:#1565c0;color:#0d47a1}',
    '.tnnd-big{min-height:56px;font-size:19px;padding:12px 22px}',
    '.tnnd-card{background:#fff;border:2px solid #90a4ae;border-radius:12px;padding:12px;max-width:420px;margin:12px auto;text-align:center;box-sizing:border-box}',
    '.tnnd-card-svg{width:100%}',
    '.tnnd-card-svg svg{width:100%;height:auto;max-width:100%;display:block}',
    '.tnnd-card-name{font-size:20px;font-weight:700;color:#0d47a1;margin-top:6px;line-height:1.3}',
    '.tnnd-card-text{font-size:18px;color:#37474f;margin-top:6px;line-height:1.5}',
    '.tnnd-timer{font-size:44px;font-weight:800;text-align:center;color:#1565c0;line-height:1.1}',
    '.tnnd-timer.low{color:#ef6c00}',
    '.tnnd-bar{height:12px;background:#e0e0e0;border-radius:6px;overflow:hidden;margin:8px auto;max-width:420px}',
    '.tnnd-bar>i{display:block;height:100%;background:#43a047;border-radius:6px}',
    '.tnnd-bar.low>i{background:#ef6c00}',
    '.tnnd-syms{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 4px}',
    '.tnnd-sym{min-width:44px;min-height:44px;padding:6px 10px;font-size:20px;border-radius:8px;border:1.5px solid #90a4ae;background:#fff;cursor:pointer;font-family:inherit}',
    '.tnnd-input{width:100%;min-height:120px;font-size:18px;font-family:inherit;line-height:1.5;padding:10px;border-radius:10px;border:2px solid #90a4ae;box-sizing:border-box;resize:vertical}',
    '.tnnd-input:disabled{background:#f5f5f5;color:#37474f}',
    '.tnnd-stars{font-size:30px;text-align:center;letter-spacing:4px;color:#f9a825}',
    '.tnnd-score{font-size:20px;font-weight:700;text-align:center;color:#1b5e20;margin:6px 0}',
    '.tnnd-compare{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}',
    '@media (max-width:520px){.tnnd-compare{grid-template-columns:1fr}}',
    '.tnnd-col{background:#fff;border:1.5px solid #b0bec5;border-radius:10px;padding:10px;font-size:17px;line-height:1.6;box-sizing:border-box;overflow-wrap:break-word}',
    '.tnnd-col h4{margin:0 0 6px;font-size:17px;color:#37474f}',
    '.tnnd-ok{background:#c8e6c9;border-radius:4px;padding:0 3px}',
    '.tnnd-miss{background:#ffe082;border-radius:4px;padding:0 3px}',
    '.tnnd-sum{background:#e8f5e9;border:2px solid #43a047;border-radius:12px;padding:14px;margin:12px 0;text-align:center;font-size:18px;line-height:1.6}',
    '.tnnd-hist{border-top:1px solid #c8e6c9;margin-top:10px;padding-top:8px}',
    '.tnnd-hrow{border:1.5px solid #b0bec5;border-radius:10px;padding:10px;margin:8px 0;background:#fff;font-size:17px;line-height:1.5;box-sizing:border-box}',
    '.tnnd-hrow .tnnd-hhead{display:flex;gap:8px;align-items:center;flex-wrap:wrap}',
    '.tnnd-hrow .tnnd-hhead button{flex:1;min-height:44px;text-align:left;background:none;border:none;font-size:17px;font-family:inherit;cursor:pointer;color:#0d47a1;font-weight:700;padding:4px}',
    '.tnnd-x{min-width:44px;min-height:44px;border-radius:8px;border:1.5px solid #b0bec5;background:#fff;color:#78909c;font-size:18px;cursor:pointer}',
    '.tnnd-hitem{margin:8px 0;padding:8px;border-top:1px dashed #b0bec5;font-size:16px;line-height:1.6}',
    '.tnnd-small{font-size:15px;color:#78909c;background:none;border:none;cursor:pointer;font-family:inherit;min-height:44px;padding:6px 10px}',
    '.tnnd-q{font-size:19px;font-weight:700;text-align:center;color:#0d47a1;margin:10px 0}',
    /* --- to in bao cao lich su: chi hien .print-sheet, an toan bo trang --- */
    '.print-sheet{display:none}',
    '@page{size:A4;margin:12mm}',
    '@media print{',
    ' body.tnnd-printing>*:not(.print-sheet){display:none !important}',
    ' body.tnnd-printing .print-sheet{display:block !important;color:#000;background:#fff}',
    ' .tnnd-print h2{font-size:20pt;margin:0 0 4mm}',
    ' .tnnd-print h3{font-size:16pt;margin:6mm 0 2mm}',
    ' .tnnd-print p{font-size:13pt;line-height:1.5;margin:2mm 0}',
    ' .tnnd-print table{width:100%;border-collapse:collapse;font-size:12pt;margin:3mm 0}',
    ' .tnnd-print th,.tnnd-print td{border:1px solid #000;padding:2mm;text-align:left;vertical-align:top}',
    '}',
    ''
  ].join('\n');

  function injectCss() {
    if (document.getElementById('tnnd-style')) return;
    var st = document.createElement('style');
    st.id = 'tnnd-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ---------- trang thai ---------- */
  var state = {
    pool: [], poolSource: '',
    container: null,
    phase: 'home',           /* home | view | listen | input | result | summary | review | history */
    mode: null,              /* 'nhin' | 'nghe' */
    level: 1,                /* do kho 1..4 (§6) */
    roundNo: 1,
    round: null,             /* {items:[q], idx, score, startMs, results:[]} */
    cur: null,               /* {item, viewLeft, viewTotal, reviewUsed, listenLeft, listenTotal, timerId} */
    histOpenId: null,
    histPrintId: null,
    confirmClear: 0,
    speech: { supported: false, hasVi: false, voice: null, error: false, speaking: false },
    rateSlow: true           /* true = 0.85, false = 1.0 */
  };

  /* ---------- nguon the (giong Nho, khong fetch theory.json) ---------- */
  function itemById(id) {
    for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i];
    return null;
  }
  function buildPool(theoryArr) {
    var out = [];
    if (theoryArr && theoryArr.length) {
      theoryArr.forEach(function (t) {
        if (!t || !t.id || EXCLUDED.indexOf(t.id) >= 0) return;
        var base = itemById(t.id);
        if (!base) return;
        var c = { id: base.id, name: t.name || base.id, svg: t.svg || '',
          display: base.display, spoken: base.spoken, extra: base.extra, kw: base.kw };
        out.push(c);
      });
    }
    return out;
  }
  function fallbackPool() {
    return ITEMS.map(function (b) {
      return { id: b.id, name: b.display.split(' — ')[0], svg: '',
        display: b.display, spoken: b.spoken, extra: b.extra, kw: b.kw };
    });
  }
  function collectCards(arg) {
    var got = null, src = '';
    if (arg && arg.length) { got = buildPool(arg); src = 'init-arg'; }
    if ((!got || got.length < ROUND_LEN) && typeof window !== 'undefined') {
      var th = window.__THEORY || window.THEORY;
      if (th && th.length) { got = buildPool(th); src = 'theory.json (window.__THEORY)'; }
    }
    if (!got || got.length < ROUND_LEN) { got = fallbackPool(); src = 'fallback (17 the dung duoc, noi dung tay theo theory.json)'; }
    return { cards: got, source: src };
  }

  /* ---------- giong doc (tu chon theo §3, khong dung giong-doc.js) ---------- */
  function synth() {
    return (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis : null;
  }
  function pickVoice() {
    var s = synth();
    state.speech.supported = !!s;
    if (!s) { state.speech.hasVi = false; state.speech.voice = null; return; }
    var list = [];
    try { list = s.getVoices() || []; } catch (e) { list = []; }
    var vi = [], other = [];
    list.forEach(function (v) {
      var lang = String(v.lang || '').replace(/_/g, '-').toLowerCase();
      var name = String(v.name || '').toLowerCase();
      if (lang === 'vi-vn' || lang.indexOf('vi-vn') === 0) vi.unshift(v);
      else if (lang === 'vi' || lang.indexOf('vi-') === 0) vi.push(v);
      else if (name.indexOf('vietnamese') >= 0 || name.indexOf('tiếng việt') >= 0 || name.indexOf('tieng viet') >= 0) vi.push(v);
      else other.push(v);
    });
    state.speech.hasVi = vi.length > 0;
    state.speech.voice = vi.length ? vi[0] : (list.length ? list[0] : null);
  }
  function bindVoices() {
    var s = synth();
    if (!s) return;
    pickVoice();
    try {
      if (typeof s.addEventListener === 'function') s.addEventListener('voiceschanged', pickVoice);
      else s.onvoiceschanged = pickVoice;
    } catch (e) {}
  }
  function stopSpeech() {
    var s = synth();
    if (s) { try { s.cancel(); } catch (e) {} }
    state.speech.speaking = false;
  }
  function clearTimer() {
    if (state.cur && state.cur.timerId) { clearInterval(state.cur.timerId); state.cur.timerId = null; }
  }
  function stopAll() { stopSpeech(); clearTimer(); }
  /* Doc 1 doan (chia <=140 ky tu). onend: het doan; onerror: loi may -> dung vong. */
  function speakText(text, onend, onerror) {
    var s = synth();
    if (!s || typeof SpeechSynthesisUtterance === 'undefined') { if (onerror) onerror(); return; }
    var chunks = splitSpoken(text);
    var i = 0, stopped = false;
    state.speech.speaking = true;
    function next() {
      if (stopped) return;
      if (i >= chunks.length) { state.speech.speaking = false; if (onend) onend(); return; }
      var u;
      try { u = new SpeechSynthesisUtterance(chunks[i]); } catch (e) { state.speech.speaking = false; if (onerror) onerror(); return; }
      u.lang = 'vi-VN';
      u.rate = state.rateSlow ? 0.85 : 1.0;
      if (state.speech.voice) { try { u.voice = state.speech.voice; } catch (e) {} }
      u.onend = function () { i++; next(); };
      u.onerror = function () { stopped = true; state.speech.speaking = false; if (onerror) onerror(); };
      try { s.speak(u); } catch (e) { stopped = true; state.speech.speaking = false; if (onerror) onerror(); }
    }
    next();
  }
  function speechErrorStop() {
    /* §9: loi doc giua chung hoac khong co giong -> dung vong, KHONG tinh diem. */
    state.speech.error = true;
    stopAll();
    if (state.round) { state.round = null; state.cur = null; }
    state.phase = 'home';
    render();
  }

  /* ---------- do kho (§6) ---------- */
  function levelSettings() {
    var lv = state.level;
    return {
      viewSecs: lv >= 3 ? 15 : 20,
      listenTotal: lv >= 4 ? 2 : 3,
      longText: lv >= 2
    };
  }
  function qDisplay(item) {
    var ls = levelSettings();
    if (ls.longText && item.extra) return item.display + '; ' + item.extra;
    return item.display;
  }
  function qSpoken(item) {
    var ls = levelSettings();
    if (ls.longText && item.extra) return item.spoken.replace(/\.?\s*$/, '') + '. ' + toSpeech(item.extra) + '.';
    return item.spoken;
  }

  /* ---------- vong ---------- */
  function newRound(mode) {
    stopAll();
    if (state.pool.length < ROUND_LEN) { state.phase = 'home'; render(); return; }
    var picked = shuffled(state.pool).slice(0, ROUND_LEN);
    /* Cau dau vong la the de nhat: doan hien thi ngan nhat; cac cau sau theo do dai tang dan. */
    picked.sort(function (a, b) { return qDisplay(a).length - qDisplay(b).length; });
    state.mode = mode;
    state.round = { items: picked, idx: 0, score: 0, startMs: Date.now(), results: [] };
    state.phase = (mode === 'nhin') ? 'view' : 'listen';
    startQuestion();
  }
  function startQuestion() {
    stopAll();
    var r = state.round;
    if (!r || r.idx >= r.items.length) { finishRound(); return; }
    var item = r.items[r.idx];
    var ls = levelSettings();
    state.cur = { item: item, viewLeft: ls.viewSecs, viewTotal: ls.viewSecs,
      reviewUsed: false, listenLeft: ls.listenTotal - 1, listenTotal: ls.listenTotal,
      timerId: null, typed: '' };
    if (state.mode === 'nhin') {
      state.phase = 'view';
      render();
      state.cur.timerId = setInterval(function () {
        if (!state.cur || state.phase !== 'view') { clearTimer(); return; }
        state.cur.viewLeft--;
        var t = state.container && state.container.querySelector('.tnnd-timer');
        var bar = state.container && state.container.querySelector('.tnnd-bar>i');
        var barWrap = state.container && state.container.querySelector('.tnnd-bar');
        var warn = state.container && state.container.querySelector('.tnnd-warn');
        if (t) {
          t.textContent = String(Math.max(0, state.cur.viewLeft));
          if (state.cur.viewLeft <= 5) t.classList.add('low');
        }
        if (bar) bar.style.width = Math.max(0, state.cur.viewLeft / state.cur.viewTotal * 100) + '%';
        if (barWrap && state.cur.viewLeft <= 5) barWrap.classList.add('low');
        if (warn && state.cur.viewLeft <= 5) warn.hidden = false;
        if (state.cur.viewLeft <= 0) { clearTimer(); toInput(); }
      }, 1000);
    } else {
      state.phase = 'listen';
      render();
      speakText(qSpoken(item), null, speechErrorStop);
    }
  }
  function toInput() {
    stopAll();
    if (!state.round || !state.cur) return;
    state.phase = 'input';
    render();
    var ta = state.container && state.container.querySelector('.tnnd-input');
    if (ta) ta.focus();
  }
  function submitAnswer() {
    if (state.phase !== 'input' || !state.round || !state.cur) return;
    var ta = state.container && state.container.querySelector('.tnnd-input');
    var typed = ta ? ta.value : '';
    stopAll();
    var res = grade(typed, state.cur.item);
    var rec = { cardId: state.cur.item.id, prompt: qDisplay(state.cur.item),
      expected: qDisplay(state.cur.item), typed: typed, score: res.score,
      hit: res.hit, miss: res.miss, missDisp: res.missDisp };
    state.round.results.push(rec);
    state.round.score += res.score;
    state.cur.typed = typed;
    state.cur.result = res;
    state.phase = 'result';
    render();
  }
  function nextQuestion() {
    stopAll();
    if (!state.round) return;
    state.round.idx++;
    if (state.round.idx >= state.round.items.length) finishRound();
    else startQuestion();
  }
  function finishRound() {
    stopAll();
    if (!state.round) { state.phase = 'home'; render(); return; }
    var r = state.round;
    var secs = Math.max(1, Math.round((Date.now() - r.startMs) / 1000));
    saveRound({ id: 'r' + Date.now() + Math.floor(Math.random() * 1000),
      ts: new Date().toISOString(), mode: state.mode, score: r.score, total: 50,
      secs: secs, items: r.results });
    /* Duoi 25/50 thi o lai do kho cu; tu 25 tro len thi len 1 muc (toi da 4). */
    if (r.score >= 25 && state.level < 4) state.level++;
    state.roundNo++;
    try { window.localStorage.setItem(LS_STATE, JSON.stringify({ level: state.level, roundNo: state.roundNo })); } catch (e) {}
    state.phase = 'summary';
    render();
  }

  /* ---------- lich su (§7) ---------- */
  function loadHistory() {
    try {
      var raw = window.localStorage.getItem(LS_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      return arr.filter(function (r) { return r && typeof r === 'object' && typeof r.score === 'number' && Array.isArray(r.items); });
    } catch (e) { return []; }
  }
  function saveHistory(arr) {
    try { window.localStorage.setItem(LS_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function saveRound(rec) {
    var arr = loadHistory();
    arr.unshift(rec);
    if (arr.length > MAX_ROUNDS) arr = arr.slice(0, MAX_ROUNDS);
    saveHistory(arr);
  }
  function fmtDate(iso) {
    try {
      var d = new Date(iso);
      var dd = ('0' + d.getDate()).slice(-2), mm = ('0' + (d.getMonth() + 1)).slice(-2);
      return dd + '/' + mm + '/' + d.getFullYear();
    } catch (e) { return ''; }
  }
  function modeLabel(m) { return m === 'nghe' ? 'Nghe rồi nhớ' : 'Nhìn rồi nhớ'; }

  /* ---------- in bao cao lich su (§8) ---------- */
  function buildHistorySheet(rounds) {
    var sheet = el('div', 'print-sheet tnnd-print');
    sheet.appendChild(el('h2', null, 'Báo cáo trò Nhớ nội dung — cho ba mẹ'));
    sheet.appendChild(el('p', null, 'Lịch sử để ba mẹ biết con yếu khái niệm nào, không dùng để nhắc/mắng.'));
    rounds.forEach(function (r) {
      sheet.appendChild(el('h3', null, fmtDate(r.ts) + ' — ' + modeLabel(r.mode) + ' — điểm nhớ ' + r.score + '/' + r.total));
      var tb = el('table', null);
      var head = el('tr', null);
      ['Câu', 'Điểm nhớ', 'Bài bé ghi', 'Đáp án đúng'].forEach(function (h) { head.appendChild(el('th', null, h)); });
      tb.appendChild(head);
      r.items.forEach(function (it, i) {
        var tr = el('tr', null);
        tr.appendChild(el('td', null, String(i + 1)));
        tr.appendChild(el('td', null, String(it.score) + '/10'));
        tr.appendChild(el('td', null, it.typed || '(bé chưa ghi gì)'));
        tr.appendChild(el('td', null, it.expected || ''));
        tb.appendChild(tr);
      });
      sheet.appendChild(tb);
    });
    return sheet;
  }
  function printHistory(roundId) {
    var arr = loadHistory();
    var rounds = roundId ? arr.filter(function (r) { return r.id === roundId; }) : arr.slice(0, 5);
    if (!rounds.length) return;
    var old = document.querySelector('body > .print-sheet');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var sheet = buildHistorySheet(rounds);
    document.body.appendChild(sheet);
    document.body.classList.add('tnnd-printing');
    var done = false;
    var cleanup = function () {
      if (done) return;
      done = true;
      document.body.classList.remove('tnnd-printing');
      if (sheet.parentNode) sheet.parentNode.removeChild(sheet);
      if (typeof window !== 'undefined' && window.removeEventListener) window.removeEventListener('afterprint', cleanup);
    };
    if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('afterprint', cleanup);
    if (typeof window !== 'undefined' && typeof window.print === 'function') window.print();
  }

  /* ---------- ve giao dien ---------- */
  function starsFor(score) {
    var n = score >= 10 ? 3 : (score >= 7 ? 2 : (score >= 1 ? 1 : 0));
    var s = '';
    for (var i = 0; i < 3; i++) s += (i < n) ? '★' : '☆';
    return s;
  }
  function praiseFor(score) {
    if (score >= 10) return 'Nhớ được hết rồi, giỏi lắm!';
    if (score >= 7) return 'Nhớ được ý chính rồi, giỏi lắm!';
    if (score >= 4) return 'Nhớ được một phần rồi, cố thêm chút nữa nhé.';
    if (score >= 1) return 'Con đã cố ghi rồi, lần sau sẽ nhớ hơn.';
    return 'Chưa nhớ được câu này, không sao, mình ôn lại nhé.';
  }
  function highlightExpected(item, hit, miss) {
    /* To xanh tu nho dung, to vang tu thieu (theo tu khoa).
       So display theo token (tach ca "6/8" thanh 6 / 8), chuan hoa tung token roi
       tim day token lien tiep khop tu khoa — vi tu khoa o dang chuan hoa (khong dau,
       "x" thay "×", "do" thay "°") khong khop truc tiep chuoi hien thi. */
    var text = qDisplay(item);
    var parts = text.split(/(\s+)/); /* giu khoang trang lam phan tu rieng */
    var toks = []; /* {part, sub, norm, cls} — cls: '' | 'tnnd-ok' | 'tnnd-miss' */
    parts.forEach(function (p, pi) {
      if (/^\s+$/.test(p) || p === '') { toks.push({ part: pi, sub: p, norm: '', sep: true }); return; }
      var subs = p.match(/[A-Za-zÀ-ỹ0-9]+|./g) || [p];
      subs.forEach(function (s) { toks.push({ part: pi, sub: s, norm: norm(s), sep: false }); });
    });
    function mark(kwText, cls) {
      var words = kwText.split(' ');
      var seq = toks.filter(function (t) { return !t.sep && t.norm !== ''; });
      for (var i = 0; i + words.length <= seq.length; i++) {
        var ok = true;
        for (var j = 0; j < words.length; j++) if (seq[i + j].norm !== words[j]) { ok = false; break; }
        if (ok) {
          for (var k = 0; k < words.length; k++) if (!seq[i + k].cls) seq[i + k].cls = cls;
          return;
        }
      }
    }
    hit.forEach(function (k) { mark(k, 'tnnd-ok'); });
    miss.forEach(function (k) { mark(k, 'tnnd-miss'); });
    var out = '';
    toks.forEach(function (t) {
      if (t.sep) out += esc(t.sub);
      else if (t.cls) out += '<span class="' + t.cls + '">' + esc(t.sub) + '</span>';
      else out += esc(t.sub);
    });
    return out;
  }
  function inputHtml() {
    var syms = ['×', '÷', '°', '{', '}', ';', '='];
    var h = '<div class="tnnd-syms">' + syms.map(function (s) {
      return '<button type="button" class="tnnd-sym" data-tnnd="sym" data-sym="' + esc(s) + '">' + esc(s) + '</button>';
    }).join('') + '</div>'
      + '<textarea class="tnnd-input" data-tnnd-input placeholder="Ghi lại những gì con nhớ…"></textarea>'
      + '<div class="tnnd-tools">'
      + '<button type="button" class="tnnd-btn" data-tnnd="rewrite">✏️ Viết lại</button>'
      + '<button type="button" class="tnnd-btn primary" data-tnnd="submit">Nộp bài</button>'
      + '</div>';
    return h;
  }
  function render() {
    var root = state.container;
    if (!root) return;
    var h = '';
    var sp = state.speech;
    if (state.phase === 'home') {
      h += '<h3>🧠 N3 — Nhớ nội dung</h3>'
        + '<p class="tnnd-rule">Em nhìn hoặc nghe một nội dung ngắn.</p>'
        + '<p class="tnnd-rule">Rồi em ghi lại những gì em nhớ.</p>'
        + '<p class="tnnd-rule">Mỗi vòng có 5 câu.</p>';
      if (state.speech.error) {
        h += '<p class="tnnd-warn">Máy đọc bị lỗi giữa chừng nên vòng này không tính điểm.<br>Con chơi lại nhé.</p>';
        state.speech.error = false;
      }
      h += '<div class="tnnd-tools">'
        + '<button type="button" class="tnnd-btn primary tnnd-big" data-tnnd="mode-nhin">👀 Nhìn rồi nhớ</button>'
        + '<button type="button" class="tnnd-btn blue tnnd-big" data-tnnd="mode-nghe"' + (sp.supported ? '' : ' disabled') + '>👂 Nghe rồi nhớ</button>'
        + '</div>';
      if (!sp.supported) h += '<p class="tnnd-note">Máy này không đọc được, con chơi cách Nhìn nhé.</p>';
      else if (!sp.hasVi) h += '<p class="tnnd-note">Máy này chưa có giọng tiếng Việt nên đang đọc bằng giọng mặc định của máy.<br>Ba mẹ có thể dùng Edge hoặc cài gói tiếng Việt.</p>';
      h += '<p class="tnnd-note">Độ khó vòng này: vòng ' + state.roundNo + ' (mức ' + state.level + '/4).</p>';
    } else if (state.phase === 'view' && state.cur) {
      var c = state.cur;
      h += '<h3>🧠 N3 — Nhớ nội dung</h3>'
        + '<p class="tnnd-q">Câu ' + (state.round.idx + 1) + ' / 5 — Em nhìn kỹ nhé.</p>'
        + '<div class="tnnd-timer">' + c.viewLeft + '</div>'
        + '<div class="tnnd-bar"><i style="width:' + (c.viewLeft / c.viewTotal * 100) + '%"></i></div>'
        + '<p class="tnnd-warn" ' + (c.viewLeft <= 5 ? '' : 'hidden') + '>Sắp hết giờ!</p>'
        + '<div class="tnnd-card">'
        + (c.item.svg ? '<div class="tnnd-card-svg">' + c.item.svg + '</div>' : '')
        + '<div class="tnnd-card-name">' + esc(c.item.name) + '</div>'
        + '<div class="tnnd-card-text">' + esc(qDisplay(c.item)) + '</div>'
        + '</div>'
        + '<div class="tnnd-tools">'
        + '<button type="button" class="tnnd-btn" data-tnnd="review"' + (c.reviewUsed ? ' disabled' : '') + '>👀 Xem lại (còn ' + (c.reviewUsed ? 0 : 1) + ')</button>'
        + '<button type="button" class="tnnd-btn primary" data-tnnd="to-input">Nhớ rồi, ghi lại</button>'
        + '</div>';
    } else if (state.phase === 'listen' && state.cur) {
      var l = state.cur;
      h += '<h3>🧠 N3 — Nhớ nội dung</h3>'
        + '<p class="tnnd-q">Câu ' + (state.round.idx + 1) + ' / 5 — Em nghe kỹ nhé.</p>'
        + '<p class="tnnd-msg">🎧 Máy đang đọc…</p>'
        + '<p class="tnnd-note">Nghe xong, em bấm “Ghi lại” để viết những gì em nhớ.</p>'
        + '<div class="tnnd-tools">'
        + '<button type="button" class="tnnd-btn" data-tnnd="replay"' + (l.listenLeft <= 0 ? ' disabled' : '') + '>🔊 Nghe lại (còn ' + Math.max(0, l.listenLeft) + ')</button>'
        + '<button type="button" class="tnnd-btn" data-tnnd="rate-slow"' + (state.rateSlow ? ' disabled' : '') + '>🐢 Đọc chậm</button>'
        + '<button type="button" class="tnnd-btn" data-tnnd="rate-normal"' + (!state.rateSlow ? ' disabled' : '') + '>▶️ Đọc thường</button>'
        + '</div>'
        + '<div class="tnnd-tools"><button type="button" class="tnnd-btn primary" data-tnnd="to-input">✏️ Ghi lại</button></div>';
      if (!sp.hasVi && sp.supported) h += '<p class="tnnd-note">Máy này chưa có giọng tiếng Việt nên đang đọc bằng giọng mặc định của máy.</p>';
    } else if (state.phase === 'input' && state.cur) {
      h += '<h3>🧠 N3 — Nhớ nội dung</h3>'
        + '<p class="tnnd-q">Câu ' + (state.round.idx + 1) + ' / 5 — Em ghi lại nhé.</p>';
      if (state.mode === 'nhin') h += '<p class="tnnd-msg">Hết giờ xem rồi! Giờ ghi lại nhé.</p>';
      else h += '<p class="tnnd-msg">Nghe xong rồi! Giờ ghi lại nhé.</p>';
      h += inputHtml();
    } else if (state.phase === 'result' && state.cur && state.cur.result) {
      var r = state.cur.result, it = state.cur.item;
      var typedEmpty = !(state.cur.typed || '').trim();
      var missTxt = typedEmpty ? 'Con chưa ghi gì cả. Đáp án đúng ở bên cạnh nhé.'
        : (r.miss.length ? 'Gần đúng rồi, còn thiếu ý này: ' + (r.missDisp || r.miss).join(', ') + '.' : '');
      h += '<h3>🧠 N3 — Nhớ nội dung</h3>'
        + '<div class="tnnd-stars">' + starsFor(r.score) + '</div>'
        + '<div class="tnnd-score">Điểm nhớ câu này: ' + r.score + ' / 10</div>'
        + '<p class="tnnd-msg">' + esc(praiseFor(r.score)) + '</p>'
        + (missTxt ? '<p class="tnnd-msg">' + esc(missTxt) + '</p>' : '')
        + '<div class="tnnd-compare">'
        + '<div class="tnnd-col"><h4>✏️ Bài bé đã ghi</h4>' + esc(state.cur.typed || '(bé chưa ghi gì)') + '</div>'
        + '<div class="tnnd-col"><h4>✅ Đáp án đúng</h4>' + highlightExpected(it, r.hit, r.miss) + '</div>'
        + '</div>'
        + '<p class="tnnd-note">💡 ' + esc(TIPS[state.round.idx % TIPS.length]) + '</p>'
        + '<div class="tnnd-tools"><button type="button" class="tnnd-btn primary" data-tnnd="next">'
        + (state.round.idx + 1 >= state.round.items.length ? 'Xem tổng kết vòng' : 'Câu tiếp theo') + '</button></div>';
    } else if (state.phase === 'summary' && state.round) {
      var rr = state.round;
      var totalHit = 0, totalKw = 0;
      rr.results.forEach(function (x) { totalHit += x.hit.length; totalKw += x.hit.length + x.miss.length; });
      var weak = null;
      rr.results.forEach(function (x) { if (x.miss.length && (!weak || x.score < weak.score)) weak = x; });
      var verdict = rr.score >= 40 ? 'Nhớ rất tốt!' : (rr.score >= 30 ? 'Nhớ tốt!' : 'Con đã cố hết vòng rồi!');
      h += '<h3>🧠 N3 — Nhớ nội dung</h3>'
        + '<div class="tnnd-sum">🎉 ' + verdict + '<br>'
        + 'Điểm nhớ vòng này: ' + rr.score + ' / 50<br>'
        + 'Số từ khóa nhớ được: ' + totalHit + ' / ' + totalKw + '<br>'
        + (weak ? 'Cần ôn lại: ' + esc(weak.expected) : 'Con nhớ hết mọi ý rồi!') + '</div>'
        + '<div class="tnnd-tools">'
        + '<button type="button" class="tnnd-btn primary" data-tnnd="new-round">🔄 Chơi vòng mới</button>'
        + '<button type="button" class="tnnd-btn" data-tnnd="review-round">👀 Xem lại các câu</button>'
        + '</div>';
    } else if (state.phase === 'review' && state.round) {
      h += '<h3>🧠 N3 — Nhớ nội dung</h3><p class="tnnd-q">Xem lại các câu vừa chơi</p>';
      state.round.results.forEach(function (x, i) {
        h += '<div class="tnnd-hitem"><b>Câu ' + (i + 1) + ' — điểm nhớ ' + x.score + '/10</b><br>'
          + '✏️ Bé ghi: ' + esc(x.typed || '(bé chưa ghi gì)') + '<br>'
          + '✅ Đáp án: ' + esc(x.expected) + '<br>'
          + (x.miss.length ? '🟡 Còn thiếu: ' + esc((x.missDisp || x.miss).join(', ')) : '🟢 Nhớ đủ hết.') + '</div>';
      });
      h += '<div class="tnnd-tools"><button type="button" class="tnnd-btn primary" data-tnnd="new-round">🔄 Chơi vòng mới</button>'
        + '<button type="button" class="tnnd-btn" data-tnnd="home">🏠 Về màn hình chọn cách chơi</button></div>';
    } else if (state.phase === 'history') {
      h += renderHistoryHtml();
    }
    root.innerHTML = '<div class="tnnd-sec" data-tnnd>' + h + '</div>'
      + '<div class="tnnd-tools"><button type="button" class="tnnd-btn" data-tnnd="history">📋 Lịch sử đã chơi — Ba mẹ xem</button></div>';
  }
  function renderHistoryHtml() {
    var arr = loadHistory();
    var h = '<h3>📋 Lịch sử đã chơi — Ba mẹ xem</h3>'
      + '<p class="tnnd-rule">Lịch sử để ba mẹ biết con yếu khái niệm nào, không dùng để nhắc/mắng.</p>'
      + '<p class="tnnd-rule">Tối đa 1–2 vòng/ngày, mỗi vòng 3–5 phút. Bé mệt thì dừng, để hôm sau làm lại.</p>';
    if (!arr.length) {
      h += '<p class="tnnd-msg">Chưa có vòng nào được lưu.</p>';
    } else {
      h += '<div class="tnnd-hist">';
      arr.forEach(function (r) {
        var open = state.histOpenId === r.id;
        h += '<div class="tnnd-hrow"><div class="tnnd-hhead">'
          + '<button type="button" data-tnnd="hist-toggle" data-id="' + esc(r.id) + '">'
          + (open ? '▾ ' : '▸ ') + esc(fmtDate(r.ts)) + ' — ' + esc(modeLabel(r.mode))
          + ' — điểm nhớ ' + r.score + '/' + r.total + '</button>'
          + '<button type="button" class="tnnd-x" data-tnnd="hist-del" data-id="' + esc(r.id) + '" title="Xóa vòng này">×</button>'
          + '</div>';
        if (open) {
          r.items.forEach(function (it, i) {
            h += '<div class="tnnd-hitem"><b>Câu ' + (i + 1) + ' — ' + it.score + '/10</b><br>'
              + '✏️ Bé ghi: ' + esc(it.typed || '(bé chưa ghi gì)') + '<br>'
              + '✅ Đáp án: ' + esc(it.expected) + '<br>'
              + (it.miss.length ? '🟡 Còn thiếu: ' + esc((it.missDisp || missDisplayList(it.expected, it.miss)).join(', ')) : '🟢 Nhớ đủ hết.') + '</div>';
          });
          h += '<div class="tnnd-tools"><button type="button" class="tnnd-btn" data-tnnd="hist-print" data-id="' + esc(r.id) + '">🖨️ In cho ba mẹ (vòng này)</button></div>';
        }
        h += '</div>';
      });
      h += '</div>'
        + '<div class="tnnd-tools">'
        + '<button type="button" class="tnnd-btn" data-tnnd="hist-print-all">🖨️ In cho ba mẹ (5 vòng gần nhất)</button>'
        + '<button type="button" class="tnnd-small" data-tnnd="hist-clear">' + (state.confirmClear === 1 ? 'Chắc chắn xóa? Không lấy lại được.' : 'Xóa hết lịch sử') + '</button>'
        + '</div>';
    }
    h += '<div class="tnnd-tools"><button type="button" class="tnnd-btn" data-tnnd="home">🏠 Về màn hình chọn cách chơi</button></div>';
    return h;
  }

  /* ---------- su kien (1 listener uy quyen tren container) ---------- */
  function onContainerClick(e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-tnnd]') : null;
    if (!t || !state.container || !state.container.contains(t)) return;
    var act = t.getAttribute('data-tnnd');
    if (act === 'mode-nhin') { newRound('nhin'); }
    else if (act === 'mode-nghe') { if (state.speech.supported) newRound('nghe'); }
    else if (act === 'review') {
      if (state.phase === 'view' && state.cur && !state.cur.reviewUsed) {
        state.cur.reviewUsed = true;
        state.cur.viewLeft += 10;
        state.cur.viewTotal += 10;
        render();
        /* render() ve lai dong ho; khoi dong lai timer tu gia tri moi. */
        if (state.cur) {
          clearTimer();
          state.cur.timerId = setInterval(function () {
            if (!state.cur || state.phase !== 'view') { clearTimer(); return; }
            state.cur.viewLeft--;
            var tm = state.container && state.container.querySelector('.tnnd-timer');
            var bar = state.container && state.container.querySelector('.tnnd-bar>i');
            var barWrap = state.container && state.container.querySelector('.tnnd-bar');
            var warn = state.container && state.container.querySelector('.tnnd-warn');
            if (tm) { tm.textContent = String(Math.max(0, state.cur.viewLeft)); if (state.cur.viewLeft <= 5) tm.classList.add('low'); }
            if (bar) bar.style.width = Math.max(0, state.cur.viewLeft / state.cur.viewTotal * 100) + '%';
            if (barWrap && state.cur.viewLeft <= 5) barWrap.classList.add('low');
            if (warn && state.cur.viewLeft <= 5) warn.hidden = false;
            if (state.cur.viewLeft <= 0) { clearTimer(); toInput(); }
          }, 1000);
        }
      }
    }
    else if (act === 'to-input') { toInput(); }
    else if (act === 'replay') {
      if (state.phase === 'listen' && state.cur && state.cur.listenLeft > 0) {
        state.cur.listenLeft--;
        stopSpeech();
        speakText(qSpoken(state.cur.item), null, speechErrorStop);
        render();
      }
    }
    else if (act === 'rate-slow') { state.rateSlow = true; render(); }
    else if (act === 'rate-normal') { state.rateSlow = false; render(); }
    else if (act === 'sym') {
      var ta = state.container && state.container.querySelector('.tnnd-input');
      if (ta && !ta.disabled) {
        var sym = t.getAttribute('data-sym') || '';
        var s = ta.selectionStart != null ? ta.selectionStart : ta.value.length;
        var en = ta.selectionEnd != null ? ta.selectionEnd : ta.value.length;
        ta.value = ta.value.slice(0, s) + sym + ta.value.slice(en);
        var pos = s + sym.length;
        try { ta.setSelectionRange(pos, pos); } catch (err) {}
        ta.focus();
      }
    }
    else if (act === 'rewrite') {
      var ta2 = state.container && state.container.querySelector('.tnnd-input');
      if (ta2) { ta2.value = ''; ta2.focus(); }
    }
    else if (act === 'submit') { submitAnswer(); }
    else if (act === 'next') { nextQuestion(); }
    else if (act === 'new-round') { stopAll(); state.round = null; state.cur = null; state.phase = 'home'; render(); }
    else if (act === 'review-round') { state.phase = 'review'; render(); }
    else if (act === 'home') { stopAll(); state.round = null; state.cur = null; state.phase = 'home'; render(); }
    else if (act === 'history') { stopAll(); state.confirmClear = 0; state.phase = 'history'; render(); }
    else if (act === 'hist-toggle') {
      var id = t.getAttribute('data-id');
      state.histOpenId = (state.histOpenId === id) ? null : id;
      render();
    }
    else if (act === 'hist-del') {
      var delId = t.getAttribute('data-id');
      var arr = loadHistory().filter(function (r) { return r.id !== delId; });
      saveHistory(arr);
      if (state.histOpenId === delId) state.histOpenId = null;
      render();
    }
    else if (act === 'hist-clear') {
      if (state.confirmClear === 0) { state.confirmClear = 1; render(); }
      else { saveHistory([]); state.confirmClear = 0; state.histOpenId = null; render(); }
    }
    else if (act === 'hist-print') { printHistory(t.getAttribute('data-id')); }
    else if (act === 'hist-print-all') { printHistory(null); }
  }

  /* ---------- init ---------- */
  function init(container, cards, opts) {
    var root = null;
    if (typeof container === 'string') root = document.querySelector(container);
    else if (container && container.nodeType === 1) root = container;
    if (!root) root = document.getElementById('gameNhoNoiDung');
    if (!root) return;
    stopAll();
    state.phase = 'home'; state.round = null; state.cur = null;
    /* Khoi phuc do kho + so vong da luu (neu co) de tai lai trang khong mat tien do. */
    try {
      var savedState = JSON.parse(window.localStorage.getItem(LS_STATE) || 'null');
      if (savedState) {
        if (savedState.level >= 1 && savedState.level <= 4) state.level = savedState.level;
        if (savedState.roundNo >= 1) state.roundNo = savedState.roundNo;
      }
    } catch (e) {}
    var found = collectCards(cards);
    state.pool = found.cards;
    state.poolSource = found.source;
    state.container = root;
    injectCss();
    bindVoices();
    if (!root.__tnndBound) {
      root.addEventListener('click', onContainerClick);
      root.__tnndBound = true;
    }
    if (typeof window !== 'undefined' && window.addEventListener && !root.__tnndUnloadBound) {
      window.addEventListener('beforeunload', stopAll);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAll();
      });
      root.__tnndUnloadBound = true;
    }
    render();
  }
  function setCards(cards) {
    var found = collectCards(cards);
    state.pool = found.cards;
    state.poolSource = found.source;
    if (state.phase === 'home') render();
  }

  window.TroChoiNhoNoiDung = {
    init: init,
    setCards: setCards,
    getCards: function () { return state.pool.slice(); },
    getPoolSource: function () { return state.poolSource; },
    getItems: function () { return ITEMS.map(function (x) { return x; }); },
    printHistory: printHistory,
    _norm: norm,
    _grade: grade,
    _toSpeech: toSpeech,
    _splitSpoken: splitSpoken,
    _saveRound: saveRound,
    _loadHistory: loadHistory,
    _state: state
  };
})();
