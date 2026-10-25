# Nghệ thuật 6 — Kết nối tri thức (cả năm học)

## 1. Phạm vi + nguồn

- Bộ sách: **Kết nối tri thức với cuộc sống (KNTT)**, Chương trình GDPT 2018.
- Môn gồm 2 phần trong cùng một thư mục `nghethuat/`:
  - **Âm nhạc (8 chủ đề, `bai` 1–8):** 1. Tuổi học trò; 2. Cuộc sống tươi đẹp; 3. Nhớ ơn thầy cô; 4. Ước mơ hòa bình; 5. Giai điệu quê hương; 6. Mẹ trong trái tim em; 7. Âm nhạc nước ngoài; 8. Bác Hồ với thiếu nhi. SGK Âm nhạc không đánh số bài nên đơn vị quiz lấy theo **Chủ đề** (kèm 2 mục Ôn tập trong SGK — không làm thành chủ đề trắc nghiệm riêng).
  - **Mĩ thuật (16 bài, `bai` 9–24):** Bài 1. Một số thể loại mĩ thuật; Bài 2. Xây dựng ý tưởng trong sáng tác theo chủ đề; Bài 3. Tạo hình ngôi nhà; Bài 4. Thiết kế quà lưu niệm; Bài 5. Tạo hình hoạt động trong nhà trường; Bài 6. Thiết kế đồ chơi; Bài 7. Mĩ thuật thế giới thời kì tiền sử; Bài 8. Mĩ thuật Việt Nam thời kì tiền sử; Bài 9. Sáng tạo mĩ thuật với trò chơi dân gian; Bài 10. Thiết kế thiệp chúc mừng; Bài 11. Hoà sắc trong tranh chủ đề lễ hội; Bài 12. Màu sắc lễ hội trong thiết kế lịch treo tường; Bài 13. Sáng tạo mĩ thuật với hình ảnh trong cuộc sống; Bài 14. Thiết kế thời gian biểu; Bài 15. Mĩ thuật thế giới thời kì cổ đại; Bài 16. Mĩ thuật Việt Nam thời kì cổ đại.
- Nguồn tra cứu: mục lục SGK KNTT trên loigiaihay.com (truy cập 2026-10-25): SGK Âm nhạc 6, SGK Mĩ thuật 6. Danh sách bài/chủ đề đã đối chiếu đủ 8 + 16 (xem `~/workspace/quiz-team/topics-tinhoc-nghethuat.md`).
- Phạm vi trình bày: **Cả năm học, theo thứ tự SGK, chưa xác nhận phân kỳ HK1/HK2** (không có PPCT).
- Không yêu cầu bé hát/vẽ nộp bài, không chấm điểm năng khiếu. Câu hỏi chỉ kiểm tra kiến thức, cảm thụ và hiểu biết về âm nhạc/mĩ thuật.

## 2. Số liệu thật

- Số đơn vị: 24 (8 chủ đề Âm nhạc + 16 bài Mĩ thuật).
- Số câu trắc nghiệm: **216** (9 câu/đơn vị, `questions.json`, id 1–216 liên tục).
- Số flashcard: **120** (5 thẻ/đơn vị, `flashcards.json` = `CARDS` trong `cards-data.js`).
- Số thẻ nhớ nhanh: **48** (2 thẻ/đơn vị, `minicards.json`).
- Phân bố đáp án trắc nghiệm: A/B/C/D = 54/54/54/54.
- Khóa localStorage: `nghethuat_fcquiz_v1` (tiến độ flashcard), `nghethuat_view_mode` (chế độ xem), `onluyen_nghethuat` (tab Ôn luyện), `nghethuat_read_rate` (tốc độ nghe bài).
- Ảnh minh họa: **chưa có** — thẻ để dạng chữ, không render `<img>` vỡ (theo DAC-TA-KHUNG-CHUNG.md §10).

## 3. Điểm chưa chắc (chưa đối chiếu SGK giấy của trường bé)

- **Chính tả theo trang nguồn:** trang loigiaihay hiển thị "Ludwing van Beethoven" (môn dùng **Ludwig van Beethoven**), Mĩ thuật Bài 4 "Thiết kế quả lưu niệm" (môn dùng **quà lưu niệm**), Bài 9 "Sáng tạo mì thuật…" (môn dùng **mĩ thuật**), Bài 15 "thời kì có đại" (môn dùng **cổ đại**). 4 chỗ này rất có thể là lỗi đánh máy của trang nguồn, cần SGK giấy chốt trước khi coi là tuyệt đối.
- **Nội dung chi tiết từng bài:** tên bài/chủ đề và hoạt động trong chủ đề đã đối chiếu với mục lục nguồn; kiến thức trong câu hỏi viết từ kiến thức âm nhạc/mĩ thuật phổ thông gắn với chủ đề bài, **chưa đối chiếu từng trang SGK giấy** (đặc biệt: lời bài hát, bản nhạc cụ thể trong SGK không được trích nguyên văn — chỉ nhắc tên bài/tác phẩm).
- **Phân kỳ HK1/HK2:** chưa xác nhận bằng PPCT — không gắn nhãn học kì cho từng chủ đề/bài.
- **Trường bé có dùng đúng KNTT không:** chưa xác nhận; từ năm học 2026–2027 cả nước dùng bộ sách thống nhất nhưng vẫn đáp ứng Chương trình 2018 — nếu trường bé dùng bộ khác KNTT thì đối chiếu lại tên chủ đề/bài.
- **Đáp án đúng là phương án dài nhất:** 183/216 câu có đáp án đúng dài nhất (do đáp án đúng thường là câu giải thích đầy đủ, phương án sai là cụm ngắn). Đã cân phân bố vị trí đáp án (54/54/54/54) nhưng **chưa qua đợt biên tập mở rộng phương án sai thành câu đầy đủ tương đương** — đợt biên tập này cần làm sau để tránh lộ đáp án bằng độ dài. Ưu tiên đọc hiểu cho bé học yếu nên đợt này giữ đáp án đúng đủ ý, không cắt ngắn làm mất nghĩa.

## 4. Ngoại lệ của môn

- Âm nhạc dùng tên **Chủ đề** thay vì "Bài" trong giao diện (SGK không đánh số bài); trong dữ liệu vẫn dùng trường `bai` = số thứ tự đơn vị để khớp code quiz chung.
- Môn mới tạo từ mẫu `gdcd/` (copy khung, đổi slug/tên/FC_BAI/LESSON_NAMES), không viết lại engine. Trang học bỏ gallery ảnh và sơ đồ tư duy SVG từng bài (chưa có ảnh); giữ đủ khung bắt buộc: hook, nội dung, 2 thẻ ⚡ Nhớ nhanh, câu kiểm tra nhanh, ⭐ Điểm cần nhớ đúng 4 ý, flashcard của bài.
- Nút topmenu ghi "Bài tập & Kiểm tra thử" (không dùng từ "Thi thử" kèm đồng hồ, theo khung §5).
