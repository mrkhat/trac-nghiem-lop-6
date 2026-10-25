# Công nghệ 6 — Cả năm học (module congnghe/)

## Cập nhật 25/10/2026 — đã đủ cả năm học

- Thêm 5 bài HK2 (Chương IV – Đồ dùng điện trong gia đình): Bài 10 Khái quát về đồ dùng điện · Bài 11 Đèn điện · Bài 12 Nồi cơm điện · Bài 13 Bếp hồng ngoại · Bài 14 Dự án: An toàn và tiết kiệm trong gia đình. Phân kỳ HK1/HK2 theo thứ tự SGK, chưa xác nhận PPCT.
- Số liệu cả năm: **14 bài · 126 câu trắc nghiệm** (Bài 1: 8, Bài 2: 10, Bài 3–14: 9/bài; đáp án A/B/C/D = 33/32/31/30) **· 71 flashcard · 28 thẻ nhớ nhanh** (2/bài).
- Sửa lỗi thẻ nhớ nhanh: 18/18 mục `mn` trong `flashcards.json` từng bị mất mặt trước ("(Bấm vào thẻ để lật)") nay đã khôi phục verbatim từ `minicards.json`; hiện 0 mục mn nào còn placeholder.
- Ảnh bìa: 9 ảnh HK1 (`congnghe-cover-bai1..9.webp`) + 5 ảnh HK2 (`congnghe-cover-bai10..14.webp`) đã gắn vào đầu bài tương ứng. Thẻ HK2 hiện dạng chữ (chưa có ảnh riêng), render có guard nên không ảnh vỡ.
- Kỳ thi: Giữa HK1 = 27, Cuối HK1 = 81, Giữa HK2 = 108, Cuối HK2 = 126 câu (quy tắc bài ≤ max).

Trang học + trắc nghiệm môn **Công nghệ 6**, sách **Kết nối tri thức với cuộc sống**, xây theo khuôn thống nhất của site (mẫu chuẩn: lichsu) và **chuẩn "mức dễ nhất"** cho học sinh học yếu, khó đọc hiểu.

## Phạm vi

| Phần | Bài | Nhãn trên trang |
|---|---|---|
| Chương I – Nhà ở | Bài 1 Khái quát về nhà ở · Bài 2 Xây dựng nhà ở · Bài 3 Ngôi nhà thông minh | ⭐ Ôn giữa kì 1 |
| Chương II – Bảo quản và chế biến thực phẩm | Bài 4 Thực phẩm và dinh dưỡng · Bài 5 Phương pháp bảo quản và chế biến thực phẩm · Bài 6 Dự án: Bữa ăn kết nối yêu thương | 📚 Sau giữa kì 1 |
| Chương III – Trang phục và thời trang | Bài 7 Trang phục trong đời sống · Bài 8 Sử dụng và bảo quản trang phục · Bài 9 Thời trang | 🌿 Mở rộng học kì 1 |
| Chương IV – Đồ dùng điện trong gia đình | Bài 10 Khái quát về đồ dùng điện · Bài 11 Đèn điện · Bài 12 Nồi cơm điện · Bài 13 Bếp hồng ngoại · Bài 14 Dự án: An toàn và tiết kiệm trong gia đình | Bài 10–14 (HK2, theo thứ tự SGK, chưa xác nhận PPCT) |

Căn cứ phạm vi: khung kế hoạch dạy học mẫu (Phụ lục III, CV 5512) đặt học kì 1 = Chương I (5 tiết) + Chương II (12 tiết) + bắt đầu Chương III (1 tiết); đề cương giữa kì 1 của nhiều trường (THCS Lê Quang Cường, THCS Dương Văn Mạnh, 2025–2026) chỉ gồm Chương I; bản đặc tả đề kiểm tra cuối học kì 1 gồm Bài 1, 2, 3, 5.

## Nguồn mục lục đã tra (trước khi viết)

- tech12h.com — "Soạn giáo án Công nghệ 6 Kết nối tri thức" và mục "Giải Công nghệ 6 KNTT": đủ 4 chương, Bài 1–14 (kèm Ôn tập từng chương).
- kenhgiaovien.com — "Trọn bộ giáo án và PPT Công nghệ 6 KNTT" + "Giáo án gộp Công nghệ 6 kì I": xác nhận Bài 6 là Dự án "Bữa ăn kết nối yêu thương", Bài 14 là Dự án "An toàn và tiết kiệm điện năng trong gia đình", Bài 10 "Khái quát về đồ dùng điện trong gia đình".
- hoatieu.vn — Kế hoạch dạy học Công nghệ 6 KNTT (khung phân bố tiết học kì 1/2 như trên) và Hỏi–đáp về SGK Công nghệ 6 (NXB): sách có 4 chương đúng như mục lục.
- khoahoc.vietjack.com — Đề cương ôn tập Giữa kì 1 Công nghệ 6 (2 trường, năm học 2025–2026).
- bloghoctap.edu.vn — PPCT chi tiết + bảng đặc tả đề kiểm tra cuối học kì 1 Công nghệ 6 KNTT.

## Cấu trúc trang

- `index.html`: Phần 1 học tập — 14 bài khép kín theo đúng thứ tự khuôn: tiêu đề + nhãn → nút **🔊 Nghe bài** → mở đầu → nội dung (đoạn nhỏ, câu ngắn, kiểm tra nhanh ✋/🎯 chen giữa) → **⚡ thẻ lật mini "Nhớ nhanh"** (2 thẻ/bài, không chấm điểm, không lưu trạng thái — widget `.minicard` riêng của module, khai báo trong `<style>` nội bộ) → ⭐ Điểm cần nhớ (≤3–4 ý ngắn) → 💡 Mẹo nhớ → 🔍 Bí mật thú vị → 🧠 Sơ đồ tư duy (SVG nhãn Việt) → ❓ Câu hỏi gợi nhớ (4 câu/bài) → 🃏 Flashcard của bài (engine fcDeck, khóa `congnghe_flash_v1`) → nút sang bài sau. Cuối trang: Tổng kết (sơ đồ tổng, ôn nhanh mỗi bài 1 câu, trò chơi sắp xếp các bước xây nhà, flashcard tổng ôn 71 thẻ, nút sang trắc nghiệm).
- 2 chế độ xem (Từng bài mặc định / Xem tất cả), khóa `localStorage: congnghe_view_mode`. CSS khung dùng chung qua `<link href="../assets/common.css">`; `<style>` nội bộ chỉ giữ phần đặc thù của môn (nghe đọc `.rb-*`, thẻ mini `.mini-*`, sơ đồ `.mmsvg`, kiểm tra nhanh `.qa.mini`).
- **Nghe đọc**: mỗi bài có nút 🔊 — speechSynthesis giọng vi-VN, đọc theo từng câu ngắn, tô vàng dòng đang đọc (class `.rdsrc`/`.rb-on`), có nút ⏹ Dừng, tự dừng khi chuyển bài; máy không có giọng Việt thì hiện cảnh báo + cách khắc phục (mẫu như module nguvan).
- **Chuẩn "mức dễ nhất" đã áp**: câu văn ngắn, một ý một dòng; thuật ngữ giải thích ngay bằng lời thường + ví dụ trong nhà; sau mỗi 1–2 đoạn có 1 câu kiểm tra siêu ngắn bấm hiện đáp án (tổng 19 câu chen giữa, trong đó mỗi bài đúng 1 câu **🎯 Bắt ý chính** dạng chọn ý chính/tóm đoạn/chi tiết quan trọng nhất trong hình–sơ đồ, có giải thích vì sao là ý chính); hộp ⭐ Điểm cần nhớ ≤4 ý; hình tươi vui + 7 sơ đồ tự vẽ dẫn dắt theo bước/số thứ tự (3 phần của nhà, 5 bước xây nhà, nguyên tắc nhà thông minh, 5 nhóm thực phẩm, 5 bước bảo quản tủ lạnh, 5 bước dự án bữa ăn, kí hiệu giặt–là).
- `quiz.html` + `questions.json`: clone engine của khtn/quiz.html (3 chế độ Học tập – Luyện tập – Thi thử). **126 câu trắc nghiệm**; phân bố đáp án A/B/C/D = 33/32/31/30; giải thích ngắn, giọng động viên. Mọi kiến thức trong câu hỏi đều đã dạy trong bài học (2 ý nằm ngoài phần cốt lõi SGK — 4 hình thức báo động của nhà thông minh; không ăn thực phẩm hết hạn — đã bổ sung bằng hộp "➕ Kiến thức bổ sung" trong Bài 3 và Bài 5).

## Hình ảnh (hinh-anh/congnghe/)

- 43 tranh AI phong cách màu nước sách truyện, WebP bề ngang 400px, tất cả ≤65KB (đa số 15–45KB), không chữ trong hình. Mỗi flashcard 1 hình gợi đúng khái niệm của thẻ (46/46 thẻ HK1 có hình; thẻ về trình tự dùng chính sơ đồ bước của bài).
- HK2 (Bài 10–14): thẻ hiện dạng chữ, chưa có ảnh riêng; đã có 5 ảnh bìa bài (`congnghe-cover-bai10..14.webp`) + 9 ảnh bìa HK1.
- 7 sơ đồ SVG tự vẽ nhãn tiếng Việt (liệt kê ở trên).
- Đã kiểm: toàn bộ 50 tham chiếu hình trong index.html trả HTTP 200; xem tận mắt các ảnh then chốt (nhà sàn, nhà thông minh, tủ lạnh, đồng phục) — đúng chủ thể, không chữ.

## Số liệu (cả năm học, 25/10/2026)

14 bài học · 28 thẻ lật mini (2/bài) · 71 flashcard · 126 câu trắc nghiệm · 9 ảnh bìa HK1 + 5 ảnh bìa HK2. (Số liệu chi tiết thời HK1 — 19 kiểm tra nhanh chen giữa, 36 câu gợi nhớ, 10 sơ đồ tư duy SVG, 7 sơ đồ SVG file, 43 tranh WebP — vẫn đúng cho phần HK1, xem lịch sử file.)

## Điểm chưa chắc / lưu ý

- **Trường của bé có đúng dùng bộ Kết nối tri thức không** — chưa xác nhận (nếu là Cánh diều/Chân trời sáng tạo thì chương mục khác).
- Phạm vi giữa kì/cuối kì từng trường cắt khác nhau: nhãn GK ở đây theo mẫu phổ biến (giữa kì = Chương I). Chương III theo PPCT mẫu bắt đầu cuối HK1 và học tiếp đầu HK2 — trang gắn nhãn "Mở rộng học kì 1" cho Bài 7–9 để dùng được ở cả hai trường hợp.
- Đáp án trắc nghiệm và nội dung tóm lược do người biên soạn tự làm theo SGK, **chưa đối chiếu đáp án chính thức**; một vài chi tiết diễn đạt cho trẻ dễ hiểu (ví dụ gọi bước xây nhà là "Vẽ – Thô – Đẹp – Ở") là cách nhớ phụ, không phải thuật ngữ SGK.
- `assets/common.css` do đợt thống nhất CSS tạo song song — đã kiểm tra tại thời điểm bàn giao: file tồn tại và chứa đủ mọi class module này dùng.
