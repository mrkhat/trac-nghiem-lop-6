# Tin học 6 — Cả năm học (Kết nối tri thức)

## 1. Phạm vi + nguồn

- **Bộ sách:** Kết nối tri thức với cuộc sống (KNTT), chương trình GDPT 2018.
- **Phạm vi:** cả năm học, 17 bài, 6 chủ đề, xếp theo **thứ tự SGK** (không tự chia học kì 1 / học kì 2).
- **Danh sách bài:**
  - Chủ đề 1: Máy tính và cộng đồng — Bài 1. Thông tin và dữ liệu; Bài 2. Xử lý thông tin; Bài 3. Thông tin trong máy tính.
  - Chủ đề 2: Mạng máy tính và internet — Bài 4. Mạng máy tính; Bài 5. Internet.
  - Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin — Bài 6. Mạng thông tin toàn cầu; Bài 7. Tìm kiếm thông tin trên Internet; Bài 8. Thư điện tử.
  - Chủ đề 4: Đạo đức, pháp luật và văn hóa trong môi trường số — Bài 9. An toàn thông tin trên Internet.
  - Chủ đề 5: Ứng dụng tin học — Bài 10. Sơ đồ tư duy; Bài 11. Định dạng văn bản; Bài 12. Trình bày thông tin ở dạng bảng; Bài 13. Thực hành: Tìm kiếm và thay thế; Bài 14. Thực hành tổng hợp: Hoàn thiện Sổ lưu niệm.
  - Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính — Bài 15. Thuật toán; Bài 16. Cấu trúc điều khiển; Bài 17. Chương trình máy tính.
- **Nguồn tra cứu tên bài:** `~/workspace/quiz-team/topics-tinhoc-nghethuat.md` — mục lục SGK KNTT trên loigiaihay.com, đối chiếu ngày 2026-10-25, 17/17 bài đã xác minh.
- **Khung giao diện:** copy mẫu `gdcd/` theo `DAC-TA-KHUNG-CHUNG.md` §13, chỉ đổi các điểm §5 cho phép.

## 2. Số liệu thật (đếm từ file, 2026-10-25)

- Số bài: **17**
- Số câu trắc nghiệm (`questions.json`): **153** (9 câu/bài, id 1–153 liên tục)
- Số flashcard (`flashcards.json` = `cards-data.js`): **85** (5 thẻ/bài)
- Số thẻ nhớ nhanh (`minicards.json`): **34** (2 thẻ/bài)
- Phân bố đáp án đúng: A 39 / B 38 / C 38 / D 38.
- Đáp án đúng là phương án dài nhất tuyệt đối: 33/153 câu (21,6%, gần mức ngẫu nhiên, không còn là dấu hiệu hệ thống). Phương án nhiễu được kéo dài bằng cụm bổ sung trung tính, không đổi nghĩa đúng/sai.
- Khóa localStorage: tiến độ flashcard `tinhoc_fcquiz_v1` (qua `assets/fc-state.js`, di trú từ `tinhoc_flash_v1`), ôn luyện `onluyen_tinhoc`, chế độ xem `tinhoc_view_mode`, tốc độ nghe bài `tinhoc_read_rate` (0.78 / 0.92 / 1.08).

## 3. Điểm chưa chắc (ghi rõ, không khẳng định)

- **Nội dung chi tiết từng bài** (kiến thức để ra câu hỏi, ví dụ, tình huống) **chưa đối chiếu SGK giấy** — chính file topics cũng ghi rõ nội dung chi tiết nằm ngoài phạm vi kiểm định mục lục. Câu hỏi được viết từ kiến thức tin học phổ thông lớp 6 theo tên bài, chưa được coi là đã đối chiếu từng trang SGK.
- **Phân kỳ học kì 1 / học kì 2 chưa xác nhận** (không tìm được PPCT công khai cho Tin học 6 KNTT). Vì vậy trang này ghi "Cả năm học, thứ tự SGK", không ghi bài nào thuộc học kì nào. Khi có PPCT của trường bé cần đối chiếu lại.
- **Trường của bé có đúng dùng bộ KNTT không chưa xác nhận.** Từ năm học 2026–2027 cả nước dùng bộ sách thống nhất nhưng vẫn phải đáp ứng Chương trình 2018; nếu trường bé dùng bộ khác thì phải đối chiếu lại tên bài.
- **Đáp án trắc nghiệm do người biên soạn tự làm, chưa đối chiếu đáp án chính thức.**

## 4. Ngoại lệ của môn

- **Chưa có hình minh họa:** các thẻ hiện dạng chữ, không render `<img>` vỡ. Code fcbox ở `index.html` và `buildFlashItems` ở `quiz.html` dùng mẫu guard của `hdtn` (chỉ render `<img>` khi có ảnh thật trong `IMG`), khác một dòng so với mẫu `gdcd` gốc — ghi rõ ở đây để đội tích hợp khỏi "sửa lại cho giống gdcd".
- **Không có trò chơi riêng:** tab trò chơi trong `quiz.html` là bản copy nguyên từ mẫu `gdcd` (ghép cặp từ flashcard của bài), không chế thêm luật mới.
- **Chưa gắn vào trang chủ:** theo phân công, đội tích hợp gắn thẻ môn vào `index.html` gốc sau (số câu thật là 153).
- **Không push GitHub** trong phiên biên soạn này; file chỉ nằm ở local `~/workspace/quiz-site/tinhoc/`.

## 5. Kiểm thử đã chạy (2026-10-25)

- JSON hợp lệ; id liên tục; đủ 9 câu / 5 thẻ / 2 thẻ nhớ trên một bài; không câu trùng; giải thích không mở đầu bằng "Đúng rồi!"/"Chính xác!".
- `node --check` cho `cards-data.js` và toàn bộ khối JS nội tuyến của `index.html`/`quiz.html`: đạt.
- jsdom + server tĩnh local: trang học không lỗi JS, 17 bài, chế độ Từng bài mặc định chỉ hiện 1 bài, chọn bài hiện đúng bài, Xem tất cả hiện đủ bài, guard lật-trước-khi-chấm hoạt động (bấm ✔ khi chưa lật chỉ lật thẻ, không lưu tiến độ); quiz không lỗi JS, đếm đủ 153 câu, ô chọn bài 18 mục với tên bài đầy đủ, Học tập bài 3 hiện đủ 9 câu, Kiểm tra thử không quá 20 câu; ngắt `questions.json` thì hiện thông báo lỗi + nút Tải lại, bấm Học tập không crash, không vào màn trắng.
- Lưu ý test: jsdom không có sẵn `fetch` và `scrollTo` nên test phải polyfill fetch và bỏ qua lỗi `scrollTo` (trình duyệt thật có cả hai, không phải lỗi của trang).
