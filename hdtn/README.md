# Hoạt động trải nghiệm, hướng nghiệp 6 — Học kì 1 (module hdtn/)

Trang học + trắc nghiệm tình huống cho hoạt động giáo dục bắt buộc **Hoạt động trải nghiệm, hướng nghiệp 6**, làm theo đúng `../DAC-TA-KHUNG-CHUNG.md` (copy khung từ `gdcd/`, chỉ đổi các điểm liệt kê ở §5 của đặc tả).

## Phạm vi

**6 chủ đề HK1** (đơn vị nội dung gọi là "Chủ đề", trong dữ liệu vẫn dùng trường `bai` = số chủ đề để khớp code quiz chung):

- Chủ đề 1: Làm quen lớp mới, tự tin hòa nhập (mạch hướng vào bản thân)
- Chủ đề 2: Hiểu cảm xúc của mình và ứng xử với bạn (mạch hướng vào bản thân / hướng đến xã hội)
- Chủ đề 3: Sống có trách nhiệm trong gia đình (mạch hướng đến xã hội)
- Chủ đề 4: An toàn cho bản thân — ở nhà, ở trường, trên mạng (mạch hướng vào bản thân)
- Chủ đề 5: Yêu thiên nhiên, giữ gìn môi trường quanh em (mạch hướng đến tự nhiên)
- Chủ đề 6: Khám phá nghề nghiệp quanh em (mạch hướng nghiệp)

Mỗi chủ đề: tình huống mở đầu → cách làm từng bước → 2 thẻ ⚡ Nhớ nhanh → 1 câu hỏi nhanh trong bài → ⭐ Điểm cần nhớ (đúng 4 ý) → flashcard của chủ đề (5 thẻ).

## Số liệu (đếm từ file thật)

| Hạng mục | Số lượng |
|---|---|
| Chủ đề HK1 | 6 |
| Câu trắc nghiệm tình huống | 54 (9/chủ đề), phân bố đáp án A/B/C/D = 14/14/12/14 |
| Flashcard | 30 (5/chủ đề), khóa `hdtn_fcquiz_v1` (qua `fc-state.js`) |
| Thẻ ⚡ Nhớ nhanh | 12 (2/chủ đề) |
| Câu hỏi nhanh trong bài | 6 (1/chủ đề) |
| Chế độ xem | Từng chủ đề (mặc định) / Xem tất cả, khóa `hdtn_view_mode` |
| Ảnh minh họa | Chưa có — thẻ để dạng chữ, không render `<img>` vỡ (theo §10 đặc tả) |

Kiểm tra độ dài đáp án (2026-10-25): đáp án đúng là phương án dài nhất ở 32/54 câu. Con số này đã tốt hơn GDCD (85%) nhờ các phương án sai đều viết thành câu đầy đủ, nhưng vẫn cao hơn mức lý tưởng — cần một đợt biên tập rút gọn đáp án đúng trước khi dùng làm bài kiểm tra chống đoán mò. Nội dung học thì không bị ảnh hưởng.

## Điểm chưa chắc — cần đối chiếu trước khi chốt

1. **Tên chủ đề chưa phải tên bài nguyên văn SGK KNTT.** Tên trên là khung tổng hợp theo 4 mạch của Chương trình GDPT 2018. Cần đối chiếu SGK giấy Hoạt động trải nghiệm, hướng nghiệp 6 của trường bé (bộ KNTT hay Chân trời sáng tạo, thứ tự chủ đề có thể lệch) rồi mới chốt tên.
2. **Chưa có ảnh minh họa.** Theo chính sách ảnh gen AI của dự án, cần gen ảnh đúng khái niệm cho 30 thẻ + bài học trong đợt sau, hoặc giữ dạng chữ nếu user quyết định không cần ảnh cho môn này.
3. **Chưa push GitHub.** Module mới chỉ ở cây local `quiz-site/hdtn/`; trang chủ local đã thêm thẻ thứ 9. Cần chạy kiểm thử §14 của đặc tả rồi mới push.

## Khác biệt có chủ ý so với môn kiến thức (theo §12 đặc tả)

- Trắc nghiệm là câu hỏi tình huống (chọn cách làm phù hợp và an toàn nhất), không chấm thái độ, không hỏi thông tin cá nhân/gia đình thật của bé.
- Hoạt động thực hành gợi ý đều an toàn cho trẻ 11–12 tuổi, làm được ở lớp/ở nhà; việc cần người lớn (làm bánh, trông em, dùng đồ nóng/sắc) đều ghi "làm cùng người lớn" trong đáp án/bài học.
- Không có nút 🔊 Nghe bài trong đợt này (tùy chọn, không bắt buộc theo khung).
