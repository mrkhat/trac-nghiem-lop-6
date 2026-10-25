# Hoạt động trải nghiệm, hướng nghiệp 6 — Cả năm học (module hdtn/)

Trang học + trắc nghiệm tình huống cho hoạt động giáo dục bắt buộc **Hoạt động trải nghiệm, hướng nghiệp 6**, làm theo đúng `../DAC-TA-KHUNG-CHUNG.md` (copy khung từ `gdcd/`, chỉ đổi các điểm liệt kê ở §5 của đặc tả).

## Phạm vi — đủ 9 chủ đề SGK Kết nối tri thức, cả năm học

Nguồn kết hợp (user cung cấp 2026-10-25): mục lục SGK KNTT trên loigiaihay, danh mục sách KNTT lớp 6 trên giaokhoaonline, bộ sách giáo viên KNTT trên nguvanthcs, và trang tập huấn NXBGD (taphuan.nxbgd.vn, lớp 6). Tên chủ đề lấy đúng theo mục lục SGK KNTT:

- Chủ đề 1: Khám phá lứa tuổi và môi trường học tập mới
- Chủ đề 2: Chăm sóc cuộc sống cá nhân
- Chủ đề 3: Xây dựng tình bạn, tình thầy trò
- Chủ đề 4: Nuôi dưỡng quan hệ gia đình
- Chủ đề 5: Kiểm soát chi tiêu
- Chủ đề 6: Xây dựng cộng đồng văn minh, thân thiện
- Chủ đề 7: Tìm hiểu nghề truyền thống ở Việt Nam
- Chủ đề 8: Phòng tránh thiên tai và giảm thiểu biến đổi khí hậu
- Chủ đề 9: Tôn trọng người lao động

Mỗi chủ đề: tình huống mở đầu → cách làm từng bước → 2 thẻ ⚡ Nhớ nhanh → 1 câu hỏi nhanh trong bài → ⭐ Điểm cần nhớ (đúng 4 ý) → flashcard của chủ đề (5 thẻ).

## Số liệu (đếm từ file thật)

| Hạng mục | Số lượng |
|---|---|
| Chủ đề cả năm | 9 |
| Câu trắc nghiệm tình huống | 81 (9/chủ đề), phân bố đáp án A/B/C/D = 18/21/22/20 |
| Flashcard | 45 (5/chủ đề), khóa `hdtn_fcquiz_v1` (qua `fc-state.js`) |
| Thẻ ⚡ Nhớ nhanh | 18 (2/chủ đề) |
| Câu hỏi nhanh trong bài | 9 (1/chủ đề) |
| Chế độ xem | Từng chủ đề (mặc định) / Xem tất cả, khóa `hdtn_view_mode` |
| Ảnh minh họa | Đủ 45/45 thẻ (local, `hinh-anh/hdtn/`, ≤400px, ≤36KB/tấm) — chờ user up ảnh lên repo rồi mới push phần chữ gắn ảnh, để khỏi vỡ ảnh live |

Kiểm tra độ dài đáp án (2026-10-25): đáp án đúng là phương án dài nhất ở 54/81 câu. Các phương án sai đều viết thành câu đầy đủ, nhưng tỉ lệ này vẫn cao hơn mức lý tưởng — cần một đợt biên tập rút gọn đáp án đúng trước khi dùng làm bài kiểm tra chống đoán mò. Nội dung học thì không bị ảnh hưởng.

## Điểm chưa chắc — cần đối chiếu trước khi chốt

1. **Phân chia học kì 1 / học kì 2:** module trình bày theo thứ tự chủ đề trong SGK, cả năm học. PPCT của từng trường có thể lệch (chủ đề nào thuộc học kì nào) — cần PPCT của trường bé mới ghi nhãn HK1/HK2 chính xác được.
2. **Bộ sách năm 2026–2027:** Chương trình GDPT 2018 vẫn là chương trình hiện hành trong năm 2026; từ 2026–2027 cả nước dùng bộ sách thống nhất nhưng vẫn phải đáp ứng yêu cầu của Chương trình 2018. Tên chủ đề trên lấy theo SGK KNTT mà user cung cấp; nếu trường bé dùng bộ sách thống nhất khác KNTT thì phải đối chiếu lại tên chủ đề của bộ đó.
3. **Ảnh minh họa:** đang tạo lại theo đợt, lấy ý tưởng từ hoạt động trong SGK / sách giáo viên rồi vẽ lại bằng AI (không lấy nguyên ảnh SGK đăng lại, không bịa hoạt động ngoài SGK).

## Khác biệt có chủ ý so với môn kiến thức (theo §12 đặc tả)

- Trắc nghiệm là câu hỏi tình huống (chọn cách làm phù hợp và an toàn nhất), không chấm thái độ, không hỏi thông tin cá nhân/gia đình thật của bé.
- Hoạt động thực hành gợi ý đều an toàn cho trẻ 11–12 tuổi, làm được ở lớp/ở nhà; việc cần người lớn (làm bánh, trông em, dùng đồ nóng/sắc) đều ghi "làm cùng người lớn" trong đáp án/bài học.
- Không có nút 🔊 Nghe bài trong đợt này (tùy chọn, không bắt buộc theo khung).

## Lịch sử sửa

- 2026-10-25 (bản đầu, đã push commit ffe132): 6 chủ đề tự tổng hợp theo 4 mạch CT 2018, 54 câu — **đã bị thay thế** vì tên chủ đề không khớp SGK KNTT.
- 2026-10-25 (bản hiện tại): 9 chủ đề SGK KNTT thật, cả năm học, 81 câu — đang chờ push lại phần chữ.
