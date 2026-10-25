# ĐẶC TẢ KHUNG CHUNG — WEB HỌC LỚP 6 (trac-nghiem-lop-6)

> **Tài liệu duy nhất để làm môn mới và sửa môn cũ. Môn nào làm sau cũng phải theo đúng file này, không tự chế một kiểu riêng.**
> Chốt ngày 2026-10-25. Nguồn chuẩn thực tế: cây `quiz-site/` hiện có (8 môn) + các chuẩn đã chốt ở commit `d55ebf1` (CSS + fcDeck thống nhất) và đợt review 2026-10-22 (604/604 đáp án, 77 lỗi nội dung, 19 file giao diện).
> Ngoại lệ duy nhất được phép lệch khung: **Toán** (tự luận, không flashcard). Mọi môn còn lại, kể cả môn mới, đều phải khớp khung dưới đây.

## 0. Phạm vi chốt (2026-10-25)

- **Bỏ hẳn Giáo dục thể chất** khỏi dự án. Không làm, không đề xuất lại.
- **Đã có (8 thẻ live):** Khoa học tự nhiên, Toán, Lịch sử, Địa lí, Ngữ văn, Tiếng Anh, Giáo dục công dân, Công nghệ.
  Lưu ý cách đếm của Bộ: Lịch sử + Địa lí trên web tách 2 thẻ, nhưng theo Chương trình GDPT 2018 đó là **1 môn Lịch sử và Địa lí**. Vì vậy tính theo Bộ, 8 thẻ = 7/10 môn bắt buộc.
- **Làm luôn trong đợt này:** Hoạt động trải nghiệm, hướng nghiệp 6 — cả năm học, đủ 9 chủ đề SGK KNTT (là hoạt động giáo dục bắt buộc, không phải môn thi kiến thức truyền thống — xem §12).
- **Còn thiếu sau đợt này (2 môn):** Tin học, Nghệ thuật (Âm nhạc + Mĩ thuật). Chưa làm thì ghi là chưa làm, không ghi số câu giả.

## 1. Nguyên tắc vàng

1. **Một nguồn dữ liệu duy nhất, không sao chép lệch.** Trang học (`index.html`) và trang bài tập (`quiz.html`) của cùng một môn phải dùng chung `cards-data.js`. Thẻ nhớ nhanh trong bài học là nguồn cho tab Ôn luyện — không chép tay lại ở `quiz.html`.
2. **Copy mẫu chuẩn, chỉ đổi chỗ liệt kê.** Môn mới = copy `gdcd/` (mẫu gần nhất, đủ 4 chế độ + flashcard + ôn luyện) rồi đổi theo checklist §13. Không viết lại engine, không viết lại `quiz.html` từ đầu.
3. **Không sửa môn cũ khi làm môn mới.** Không đổi khóa localStorage, không đổi CSS chung vì một môn.
4. **Không bịa nội dung SGK.** Cái gì chưa đối chiếu được thì ghi rõ "chưa đối chiếu" trong `README.md` của môn đó (xem §11), không viết như thể đã chắc.
5. **Số liệu phải lấy từ file thật.** Số câu trên trang chủ phải bằng số phần tử trong `questions.json`. Bài học lịch sử của dự án từng ghi sai (trang chủ ghi Lịch sử 71 câu trong khi file có 85 câu) — đó là lỗi cấm lặp lại.

## 2. Cấu trúc thư mục chuẩn của một môn

```
<slug>/                 # slug không dấu, viết thường: khtn, lichsu, dialy, nguvan,
                        # tienganh, gdcd, congnghe, hdtn (môn mới). Toán là ngoại lệ: toan/
  index.html            # trang học
  quiz.html             # trang bài tập
  questions.json        # ngân hàng trắc nghiệm (xem §6)
  flashcards.json       # thẻ flashcard, cùng dữ liệu với cards-data.js (xem §6)
  minicards.json        # thẻ ⚡ Nhớ nhanh trong bài học (xem §6)
  cards-data.js         # NGUỒN DUY NHẤT cho flashcard: const IMG + const CARDS
  README.md             # phạm vi, nguồn, số liệu, điểm chưa chắc (xem §11)
hinh-anh/<slug>/        # ảnh của môn, đặt ngoài thư mục môn (xem §10)
assets/
  common.css            # CSS chung — môn mới CHỈ link, không sửa, không chép lại
  fc-onluyen.css        # CSS trang quiz / ôn luyện
  fc-onluyen.js         # engine fcDeck + onluyenBoot dùng cho quiz.html
  fc-state.js           # kho tiến độ thống nhất <mon>_fcquiz_v1
```

## 3. Trang chủ (`index.html` ở gốc)

- Một thẻ `<a class="card">` cho một môn/hạng mục, gồm: icon, tên môn + lớp, dòng mô tả ngắn.
- Dòng mô tả phải ghi đúng: số câu trắc nghiệm thật trong `questions.json`, phạm vi học kì (mặc định các môn hiện tại chỉ làm **Học kì 1**), bộ sách (KNTT / Global Success cho Tiếng Anh).
- Thứ tự thẻ hiện tại giữ nguyên; môn mới chèn vào cuối, không xáo thứ tự thẻ cũ.
- Trang chủ dùng chung khối CSS chuẩn (§8). Không thêm CSS riêng cho trang chủ vì một môn.

## 4. Trang học (`<slug>/index.html`) — khung bắt buộc

Thứ tự bắt buộc, từ trên xuống dưới:

1. Topnav: link `← 📚 Trang chủ Lớp 6` (dạng nút ghost, xem §8).
2. `h1`: tên môn + Học kì 1. Dòng `sub`: bộ sách + cách học (từng bài một).
3. Topmenu: 2 nút — `📝 Bài tập & Thi thử` (sang `quiz.html`) và `🃏 Flashcard tổng hợp` (sang `quiz.html#flash`).
4. `div.part.part1` — Phần 1: Học tập (học từng bài). Ghi rõ nhãn bài nếu có (ví dụ GDCD: ⭐ Ôn giữa kì 1 = Bài 1–3, 📚 Sau giữa kì 1 = Bài 4–6). Nhãn này chỉ là gợi ý vì PPCT từng trường có thể lệch — phải ghi chú đó trong README.
5. Thanh chế độ xem (`#viewbar`): 2 chế độ `📄 Từng bài` (mặc định) / `📚 Xem tất cả`, khóa localStorage `<slug>_view_mode` (`single`/`all`), nút chọn bài `#pickrow` + `⬅ Bài trước` / `Bài sau ➡`. Chế độ Từng bài chỉ hiện 1 bài (`body.mode-single .lesson` ẩn, `.lesson.cur` hiện).
6. Mỗi bài là một `div.lesson#bai<N>` với `style="--c:#..."` (màu nhấn riêng của bài, không đổi màu nhấn của môn khác). Trong bài, theo thứ tự:
   - Badge (nếu có, ví dụ ôn giữa kì).
   - `h3`: `Bài N. Tên bài` — tên bài phải khớp tên trong `questions.json`/`quiz.html` (không đặt 2 tên khác nhau cho cùng một bài).
   - Hook: 1 tình huống ngắn, gần với bé (class `hook`).
   - Nội dung: danh sách ý ngắn, **một ý một dòng**, câu ngắn. Từ khó giải thích ngay tại chỗ bằng lời thường.
   - Thẻ ⚡ Nhớ nhanh (`.minicard`): bấm lật, **không chấm điểm, không lưu trạng thái**. Ít nhất 1 thẻ/bài, mẫu GDCD là 2 thẻ/bài.
   - Câu kiểm tra nhanh trong bài (`.qa.qmini`): nút `✔ Vừa rồi…` bấm hiện đáp án; mỗi bài ít nhất 1 câu, kèm 1 câu `🎯 Bắt ý chính` nếu môn đó áp dụng (GDCD áp dụng, không bắt buộc cho mọi môn nhưng nếu có thì phải theo đúng mẫu: đáp án giải thích vì sao lựa chọn kia chỉ là chi tiết phụ).
   - Hộp `⭐ Điểm cần nhớ` (class `moc`): **đúng 4 ý/bài**, mỗi ý một dòng ngắn.
   - Khối flashcard của bài: `div.fcbox[data-cards="chỉ số thẻ của bài"]` — chỉ số phải khớp `CARDS` trong `cards-data.js`.
7. Phần Tổng kết (`#sumwrap`): `🏁 Phần Tổng kết — Ôn lại cả học kì 1`, gồm flashcard tổng ôn (`data-cards="all"`) và link sang `quiz.html`.
8. Script cuối trang, theo đúng thứ tự: `cards-data.js`, `../assets/fc-state.js`, rồi script nội tuyến gồm: bật/tắt `.qa`, lật `.minicard`, engine fcDeck (copy nguyên văn — xem §7), chế độ xem. **Không được sửa engine khi copy.**

Phần tùy chọn (được phép có hoặc không, nhưng nếu có phải dùng đúng class đã có, không chế class mới thay thế khung): nút 🔊 Nghe bài (mẫu GDCD/Ngữ văn: speechSynthesis vi-VN, tô sáng phần đang đọc `.rb-on`, nút ⏹ Dừng, tự dừng khi chuyển bài, cảnh báo khi máy thiếu giọng Việt), sơ đồ tư duy, gallery ảnh, trò chơi trong bài học. Tùy chọn không được làm vỡ khung bắt buộc.

## 5. Trang bài tập (`<slug>/quiz.html`) — khung bắt buộc

Copy từ `gdcd/quiz.html` và chỉ đổi các điểm sau (danh sách đầy đủ, không đổi gì khác nếu không có lý do ghi trong README):

- `<title>`, `h1`, link `🏠 Về trang <Tên môn> (phần Học tập)`.
- Dòng `qcount`: `<số câu> câu trắc nghiệm • Học kì 1 (Bài 1–6) • sách <tên bộ>` — số câu do JS đếm từ file, không ghi tay.
- `onluyenBoot({lsKey:'onluyen_<slug>', subject:'<Tên môn> 6', ...})`.
- `FC_MON='<slug>'`.
- `FC_BAI`: mảng ánh xạ từng thẻ flashcard sang bài của nó (ví dụ 30 thẻ, 5 thẻ/bài → `[1×5, 2×5, 3×5, 4×5, 5×5, 6×5]`).
- `buildFlashItems()`: dựng mặt trước/mặt sau từ `CARDS` + `IMG`; **nếu thẻ không có ảnh thì bỏ hẳn thẻ `<img>`, không được render `src="undefined"`**.
- Tên bài trong ô chọn bài: nếu `LESSON_NAMES` là `null` thì hiển thị `Bài N` — môn nào có tên bài riêng thì khai `LESSON_NAMES` đầy đủ, không để một nửa.

Các chế độ bắt buộc, giữ nguyên nhãn và hành vi:

| Chế độ | Hành vi bắt buộc |
|---|---|
| 📚 Chọn bài để luyện | Ô select lọc cho cả 3 chế độ dưới. Mặc định "Tất cả các bài". |
| Học tập (`study`) | Hiện toàn bộ câu của bài đã chọn trên một trang; bé **bấm chọn đáp án** (không phải nút "Xem đáp án"), hiện đúng/sai + giải thích ngay từng câu. |
| Luyện tập (`practice`) | Làm từng câu một, biết đúng/sai ngay, có màn kết quả + nút `🔁 Làm lại bài này`, `🏠 Về trang chọn`, `📖 Đọc lại bài học`, `Chỉ xem câu sai (N)`, `Làm lại N câu sai`. |
| 🧠 Kiểm tra thử (`exam`) | Tối đa 20 câu ngẫu nhiên trong bài đã chọn; **không bấm giờ** — nhãn phải ghi rõ "20 câu. Biết đúng sai ngay từng câu. Không bấm giờ." Không được gọi là "Thi thử" kèm icon đồng hồ. |
| 🃏 Flashcard (tab) | Tổng hợp flashcard + thẻ nhớ nhanh của cả môn, lọc theo bài đang chọn. Dùng chung nguồn `cards-data.js` + `minicards.json`. |
| Ôn luyện | Gom toàn bộ flashcard + thẻ nhớ nhanh, dùng `onluyenBoot` + `fc-state.js`. |
| 🎮 Trò chơi (tùy chọn) | Nếu có: ghép cặp trong phạm vi bài đang chọn, thẻ sai tự úp lại sau 950ms, ghép hết hiện khung thắng. Không đổi 950ms nếu chưa cập nhật test tương ứng. |

Màn kết quả dùng thang khen 4 mức, đúng chữ: ≥80% "🎉 Xuất sắc! Em nhớ bài rất chắc."; 50–79% "👍 Khá tốt! Em xem lại mấy câu sai ở dưới rồi thử lại nhé."; 30–49% "💪 Em đã cố gắng làm hết bài rồi. Mình xem lại phần giải thích ở câu sai, rồi làm lại một lần nữa nhé."; <30% "🌱 Không sao đâu! Bài này hơi khó. Em quay lại đọc bài học một lần nữa, rồi mình làm lại từ đầu nhé." Cấm câu cụt "💪 Cần ôn thêm!" ở mức thấp nhất. Trong danh sách xem lại, dùng "Em chọn:", không dùng "Bạn chọn:".
Khi tải câu hỏi lỗi: hiện "Chưa tải được câu hỏi. Em kiểm tra mạng rồi bấm nút Tải lại nhé." + nút 🔄 Tải lại, và `start()` phải chặn khi danh sách câu hỏi rỗng (không được vào màn làm bài trắng).

## 6. Dữ liệu — schema bắt buộc

### questions.json — mảng JSON, mỗi phần tử đúng 6 trường:

```json
{"id": 1, "question": "…?", "options": ["A. …", "B. …", "C. …", "D. …"],
 "answer": 0, "explanation": "…", "bai": 1}
```

- `id`: liên tục từ 1, không trùng, không khuyết. `bai`: số bài, khớp `id="bai<N>"` ở trang học và `FC_BAI` ở quiz.
- `options`: đúng 4 phương án, ghi sẵn tiền tố `A. `, `B. `, `C. `, `D. `. `answer`: chỉ số 0–3 của đáp án đúng.
- `explanation`: ngắn, thân thiện, giải thích vì sao đúng. **Cấm mở đầu bằng "Đúng rồi!", "Chính xác!"** — vì khi bé chọn sai, trang sẽ ghép thành "❌ Sai. Đúng rồi! …" (lỗi đã bắt ở review 2026-10-22: GDCD 54/54, Công nghệ 45/81 câu mắc lỗi này).
- Phân bố đáp án toàn ngân hàng phải cân (A/B/C/D lệch nhau tối đa vài câu, mẫu GDCD 13/14/14/13 trên 54 câu). Trong từng bài, câu hỏi sắp từ dễ đến khó: nhận biết → hiểu → tình huống vận dụng.
- **Không lộ đáp án bằng độ dài:** đáp án đúng không được là phương án dài nhất một cách hệ thống (lỗi đã bắt: GDCD 85%, Công nghệ 65% câu có đáp án đúng dài nhất). Kiểm tra bằng script đếm trước khi push.
- Mọi kiến thức trong câu trắc nghiệm phải **đã dạy trong bài học tương ứng**. Câu nào chưa dạy thì hoặc bổ sung bài học, hoặc bỏ câu.

### flashcards.json / minicards.json / cards-data.js

- `flashcards.json`: mảng `{b, t:"fc", f, a, fi}` — `b` = số bài, `f` = mặt hỏi, `a` = mặt đáp án, `fi` = đường dẫn ảnh (có thể rỗng nếu thẻ không có ảnh).
- `minicards.json`: mảng `{b, t:"mn", f, a, fi}` — thẻ ⚡ Nhớ nhanh, đáp án ngắn hơn flashcard.
- `cards-data.js` là nguồn duy nhất cho trang học + quiz:
  ```js
  const IMG={key:"../hinh-anh/<slug>/ten-file.webp", …};
  const CARDS=[["Mặt hỏi","Mặt đáp án","key"], …];
  ```
  Thứ tự `CARDS` quyết định `data-cards` ở trang học và `FC_BAI` ở quiz — đổi thứ tự là phải đổi cả hai chỗ, và ghi vào README.
- Chuẩn số lượng cho môn mới (theo mẫu GDCD/Công nghệ): trắc nghiệm **9 câu/bài**, flashcard **5 thẻ/bài**, thẻ nhớ nhanh **2 thẻ/bài**. Môn có số bài khác thì giữ tỉ lệ này, không tự đặt số lẻ (ví dụ Công nghệ từng lệch: Bài 2 chỉ 4 câu, Bài 8 chỉ 5 câu — đã phải sửa lên 9 câu/bài).
- Phạm vi mặc định: **Học kì 1** (các môn hiện tại đều chỉ làm HK1). Muốn làm HK2 thì làm thành đợt riêng, không trộn vào file HK1.

## 7. Flashcard + tiến độ — engine fcDeck (không sửa)

- Một engine duy nhất `fcDeck`: 1 thẻ/lần, thẻ chưa thuộc xếp trước, bấm thẻ lật 3D **0,45s**.
- Nút chuẩn: `↺ Chưa thuộc` / `✔ Đã thuộc`. ✔ = dấu ✔ nảy pop + thẻ trượt sang phải; ↺ = thẻ trượt sang trái + thẻ về cuối hàng đợi để gặp lại trong cùng phiên.
- **Guard lật trước khi chấm:** bấm ✔/↺ khi thẻ chưa lật thì chỉ lật thẻ và hiện "Nhìn đáp án đã, rồi tự hỏi: lúc nãy em có nhớ được không?" — không lưu tiến độ ở lần bấm đó. Bấm lần hai sau khi đã lật mới tính.
- Thanh tiến độ bar + dòng "Đã thuộc a/b"; thuộc hết bộ → khung 🎉 + nút `↺ Học lại từ đầu` (nút này xóa tiến độ của bộ đó — phải giữ đúng hành vi này, không tự đổi nghĩa nút).
- Khóa localStorage — **cấm đổi, cấm gộp** (lý do: bé đang học dở sẽ mất tiến độ):
  - Tiến độ thống nhất: `<slug>_fcquiz_v1` (Toán: `toan6_fcquiz_v1`), qua `assets/fc-state.js` (kèm di trú từ khóa cũ `<slug>_flash_v1` / `onluyen_<slug>`, xóa khóa cũ sau khi di trú).
  - Tab Ôn luyện: `onluyen_<slug>` (chỉ dùng khi gọi `onluyenBoot`).
  - Chế độ xem trang học: `<slug>_view_mode`.
  - Tốc độ nghe bài (nếu có): `<slug>_read_rate` — chỉ nhận 0.78 / 0.92 / 1.08.
- Môn mới phải dùng đúng slug của mình trong mọi khóa. Không dùng chung khóa với môn khác.

## 8. Giao diện — chuẩn chung (không chế lại)

Khối "CHUẨN GIAO DIỆN CHUNG" chèn vào mọi trang (trang chủ + trang học + quiz), và `assets/common.css` cho trang học:

- Font: **Be Vietnam Pro** `wght@400;500;600;700` (Tiếng Anh và trang chủ từng lệch Arial — đã sửa, không để lệch lại).
- Body: **18px / line-height 1.7**, khung **840px**, nền **#f5f7fa**, chữ #212121.
- `h1` **30px**, `h2` 24px, `h3` 20px. Trên điện thoại ≤480px: body padding 12px, `h1` 26px.
- Nút: **min-height 44px, bo 10px, chữ 17px**, font kế thừa. Ô nhập/select/textarea: chữ 17px, min-height 44px, bo 8px.
- Link "← Trang chủ" dạng **nút ghost**: nền trắng, viền 1.5px #b0bec5, bo 10px, chữ #37474f 16px.
- Màu nhấn riêng từng môn giữ nguyên qua biến `--c` của từng bài; không lấy màu môn này gắn cho môn khác.
- Tương phản: chữ thường phải đạt **≥4,5:1** (lỗi đã bắt: nền cam #ea8600 + chữ trắng chỉ 2,66:1 — cấm dùng). Nút nghe, nút bấm nhỏ cũng phải đủ 44px (lỗi đã bắt: nút `.spk` chỉ ~29px).
- Đối tượng là bé 11–12 tuổi, học yếu, khó đọc hiểu, dùng điện thoại 375px: mọi nút bấm được bằng ngón tay, không có điểm chết (xem §5 về lỗi tải), không có chữ meta dành cho người vận hành trong giao diện bé nhìn thấy.

## 9. Ngôn ngữ cho bé

- Chuẩn "mức dễ nhất": câu văn thật ngắn, một ý một dòng; từ khó giải thích ngay tại chỗ bằng lời thường.
- Xưng hô: gọi bé là **"em"** trong mọi thông báo, kết quả, hướng dẫn. Không dùng "bạn" trong giao diện bé.
- Động viên, không trừ điểm, không dọa: thẻ chưa thuộc "sẽ quay lại cho em học tiếp, không bị trừ điểm đâu".
- Không dùng icon đồng hồ cho chế độ không bấm giờ; không dùng từ "thi" cho chế độ không chấm như thi thật.

## 10. Hình minh họa

- **Toàn bộ ảnh minh họa chuyển sang gen AI** (chốt 2026-10-21, sau khi user nói ảnh kiếm ngoài nhiều cái không phù hợp). Phong cách: Lịch sử + Địa lí vẽ **như ảnh thật** (chú thích "(Tranh minh họa theo phong cách ảnh thật)", không ghi là ảnh chụp); các môn còn lại tranh màu nước sách truyện; **không có chữ trong hình**.
- Ngoại lệ giữ gốc (đã chốt, không mở rộng): GHS + tái chế + nhiệt kế hai thang (KHTN), bản đồ Köppen + texture Trái Đất 3D (Địa lí), dải tiến hóa + so sánh hộp sọ (Lịch sử), SVG tự vẽ.
- Chuẩn file: ngang tối đa **400px, ≤~60KB/tấm**, `.webp` ở `hinh-anh/<slug>/`, tên file không dấu, có gạch ngang. Chú thích nguồn ngoài (nếu còn) → "(Tranh minh họa do AI vẽ)".
- Ảnh phải khớp đúng khái niệm của thẻ/bài (lỗi đã bắt: ảnh gặt lúa cho truyện cổ, ảnh Phù Nam dùng hiện vật sai, thẻ "báo cháy" không có cảm biến khói). Ảnh nào chưa đúng khái niệm thì gen lại, không giữ cho có.
- **Nếu môn mới chưa có ảnh: thẻ để dạng chữ, không render `<img>` vỡ.** Không được lấy ảnh môn khác gắn tạm.

## 11. Nội dung phải kiểm chứng — và README của môn

Mỗi môn phải có `README.md` ghi đủ 4 mục, thiếu mục nào là chưa xong:

1. **Phạm vi + nguồn:** bộ sách (KNTT / Chân trời sáng tạo / Global Success), danh sách bài HK1, nguồn tra cứu (tên trang + mốc đối chiếu). Lưu ý: hai bộ KNTT và Chân trời sáng tạo ở một số môn gần giống nhau nhưng thứ tự/số tiết có thể lệch.
2. **Số liệu thật:** số bài, số câu trắc nghiệm (khớp `questions.json`), số flashcard, số thẻ nhớ nhanh, khóa localStorage của môn.
3. **Điểm chưa chắc:** những gì chưa đối chiếu SGK giấy của trường bé (ví dụ: trường bé có đúng dùng KNTT không, PPCT giữa kì có lệch không, tên bài có khác không). Trang web chỉ gắn nhãn gợi ý, không khẳng định.
4. **Ngoại lệ của môn (nếu có):** ví dụ Toán không có flashcard; Tiếng Anh adapter đọc theo `data-unit`/UNITSTART thay vì `data-cards`.

Quy tắc riêng đã chốt, áp cho mọi môn:

- **Ngữ văn:** văn bản đọc phải bám sát SGK, tuyệt đối không tự bịa/sáng tác lại theo trí nhớ. Lấy nguyên văn từ nguồn công khai đăng SGK (có URL kiểm chứng); đoạn nào không tìm được nguồn đáng tin thì **để trống và ghi rõ "đọc tiếp trong SGK giấy"**.
- **Tiếng Anh:** theo Global Success, Unit 1–6 (HK1).
- **Các môn khác:** nội dung viết từ facts đã tra cứu, không viết theo trí nhớ; tên nhóm/khái niệm gây tranh cãi (ví dụ nhóm dinh dưỡng Bài 4 Công nghệ) phải đối chiếu nguyên văn SGK trước khi chốt.

## 12. Riêng Hoạt động trải nghiệm, hướng nghiệp (hdtn)

HĐTN-HN không phải môn thi kiến thức, nên khung §4–§6 áp dụng với các điều chỉnh sau — và chỉ HĐTN mới được áp dụng các điều chỉnh này:

- Đơn vị nội dung gọi là **Chủ đề**, không gọi là "Bài" trong giao diện bé (trong dữ liệu vẫn dùng trường `bai` = số chủ đề để khớp code quiz chung, nhưng nhãn hiển thị là "Chủ đề N").
- Phạm vi: **cả năm học, đủ 9 chủ đề SGK Kết nối tri thức** (chốt 2026-10-25, kết hợp các nguồn: mục lục SGK KNTT trên loigiaihay, giaokhoaonline và sách giáo viên KNTT trên nguvanthcs):
  1. Khám phá lứa tuổi và môi trường học tập mới
  2. Chăm sóc cuộc sống cá nhân
  3. Xây dựng tình bạn, tình thầy trò
  4. Nuôi dưỡng quan hệ gia đình
  5. Kiểm soát chi tiêu
  6. Xây dựng cộng đồng văn minh, thân thiện
  7. Tìm hiểu nghề truyền thống ở Việt Nam
  8. Phòng tránh thiên tai và giảm thiểu biến đổi khí hậu
  9. Tôn trọng người lao động
  (+ phần "Tạm biệt lớp 6" ở cuối SGK — không làm thành chủ đề trắc nghiệm riêng.)
- Mỗi chủ đề gồm: tình huống mở đầu → cách làm từng bước (ngắn, làm được ngay) → ⚡ Nhớ nhanh → câu hỏi tình huống → ⭐ Điểm cần nhớ (đúng 4 ý) → flashcard. Chuẩn số lượng: 9 câu / 5 thẻ / 2 thẻ nhớ nhanh trên một chủ đề → cả năm: **81 câu, 45 thẻ, 18 thẻ nhớ nhanh**.
- Trắc nghiệm là **câu hỏi tình huống**: chọn cách làm phù hợp và an toàn nhất, giải thích vì sao cách đó phù hợp và các cách kia chưa phù hợp. Không chấm thái độ, không có câu hỏi bắt bé tiết lộ thông tin cá nhân/gia đình thật.
- Mọi hoạt động thực hành gợi ý trong bài phải an toàn cho trẻ 11–12 tuổi, làm được ở lớp/ở nhà, và ghi rõ "nhờ thầy cô / người lớn hướng dẫn" khi việc đó cần người lớn.
- Lưu ý chương trình: **Chương trình GDPT 2018 vẫn là chương trình hiện hành trong năm 2026** (không có chương trình mới thay thế nó); từ năm học 2026–2027 cả nước dùng bộ sách thống nhất nhưng bộ sách đó vẫn phải đáp ứng yêu cầu của Chương trình 2018. Vì vậy: tên chủ đề trên lấy theo SGK KNTT mà user cung cấp; nếu trường của bé năm 2026–2027 dùng bộ sách thống nhất khác KNTT thì phải đối chiếu lại tên chủ đề của bộ đó trước khi chốt.
- Phân chia học kì 1 / học kì 2 theo kế hoạch của từng trường có thể lệch — module này trình bày theo thứ tự chủ đề trong SGK, cả năm học, không khẳng định cứng chủ đề nào thuộc học kì nào khi chưa có PPCT của trường bé.
- Hình ảnh HĐTN: lấy ý tưởng từ hoạt động trong SGK / sách giáo viên rồi vẽ lại bằng AI (tranh màu nước sách truyện, không chữ trong hình, ≤400px), không bịa hoạt động ngoài SGK, không lấy nguyên ảnh trong SGK đăng lại.

## 13. Quy trình thêm một môn mới (checklist, làm theo thứ tự)

1. [ ] Chốt slug, tên môn, bộ sách, danh sách bài/chủ đề HK1, nguồn tra cứu → ghi vào `<slug>/README.md` trước khi viết nội dung.
2. [ ] Copy `gdcd/` thành `<slug>/`, xóa nội dung GDCD nhưng **giữ nguyên code khung** (engine, chế độ xem, quiz).
3. [ ] Đổi đúng các điểm ở §5 (title, h1, qcount, `onluyenBoot`, `FC_MON`, `FC_BAI`, `buildFlashItems`, `LESSON_NAMES`).
4. [ ] Viết bài học theo §4, viết `questions.json` + `flashcards.json` + `minicards.json` + `cards-data.js` theo §6, giữ tỉ lệ 9 câu / 5 thẻ / 2 thẻ nhớ nhanh trên một bài.
5. [ ] Thêm thẻ môn vào trang chủ (§3), số câu lấy từ file thật.
6. [ ] Chạy kiểm thử §14. Sửa đến khi đạt, không push khi còn FAIL.
7. [ ] Giao file theo checklist §15 (ghi đè toàn bộ, restart Apache, Ctrl+F5) rồi mới báo "xong".

## 14. Kiểm thử bắt buộc trước khi push (jsdom)

Chạy từ thư mục chứa bộ test, với máy chủ tĩnh ở gốc site. Môn mới phải đạt tất cả:

- [ ] Trang học tải không lỗi JS; chọn từng bài hiện đúng bài đó; chế độ Xem tất cả hiện đủ bài.
- [ ] Quiz: lọc theo từng bài cho cả 3 chế độ Học tập / Luyện tập / Kiểm tra thử; Kiểm tra thử lấy tối đa 20 câu trong bài đã chọn; màn kết quả có đủ nút Làm lại / Về trang chọn / Đọc lại bài / Chỉ xem câu sai / Làm lại câu sai.
- [ ] Flashcard: số thẻ từng bài khớp `CARDS`; tab Flashcard ở quiz khớp số thẻ; bấm ✔/↺ lưu đúng khóa `<slug>_fcquiz_v1`; guard lật-trước-khi-chấm hoạt động (bấm chấm khi chưa lật chỉ lật thẻ, không lưu).
- [ ] Game (nếu có): ghép đúng → 2 thẻ done + đếm lượt; ghép sai → úp lại sau 950ms; ghép hết → khung thắng.
- [ ] Tải lỗi: ngắt `questions.json` → hiện thông báo lỗi + nút Tải lại, bấm Luyện tập không crash, không vào màn trắng.
- [ ] Số liệu: số câu trang chủ = `questions.json`; phân bố đáp án A/B/C/D cân; không có đáp án đúng là phương án dài nhất một cách hệ thống; mọi câu quiz đều có nội dung tương ứng trong bài học.
- [ ] Không vỡ ảnh: mọi `src` ảnh trong `CARDS`/`IMG` đều trỏ tới file có thật; thẻ không có ảnh không render `<img>`.

## 15. Checklist giao code (lỗi lặp lại nhiều nhất của dự án)

Mỗi lần giao file cho user, nhắc đủ 3 việc (vì lỗi file cũ / OPcache / cache trình duyệt lặp lại suốt tháng 10/2026):

1. Ghi đè **toàn bộ** file trong gói, giữ nguyên cấu trúc thư mục.
2. Restart Apache (để hết OPcache cũ).
3. Ctrl+F5 (hard-refresh) trên trình duyệt.

## 16. Cấm

- Mỗi môn một engine flashcard, một kiểu nút, một kiểu màn kết quả.
- Đổi/gộp khóa localStorage của môn đang có người học.
- Ghi số câu, số thẻ bằng tay thay vì đếm từ file.
- Đáp án mở đầu giải thích bằng "Đúng rồi!/Chính xác!"; đáp án đúng dài nhất một cách hệ thống.
- Bịa văn bản SGK, bịa tên bài, bịa số liệu; viết nội dung theo trí nhớ rồi ghi như đã đối chiếu.
- Sửa ngoài phạm vi được giao; đề xuất lại thứ user đã từ chối (Giáo dục thể chất, 5 module QLBV đã từ chối — không thuộc dự án này nhưng cùng nguyên tắc).
- Push khi còn test FAIL mà không ghi rõ FAIL đó là có sẵn từ trước (kèm bằng chứng chạy trên cây chưa sửa).
