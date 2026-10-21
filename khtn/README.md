# Khoa học tự nhiên 6 — Giữa kì 1 (sách Kết nối tri thức)

Mục môn Khoa học tự nhiên 6 trong web trắc nghiệm Lớp 6, gồm **2 phần theo thứ tự học** (nâng cấp 2026-10-21 theo nguyên tắc chung: học tập theo lộ trình có hình ảnh làm trước, trắc nghiệm làm sau — cùng khuôn với mục Lịch sử 6):

## Phần 1 — Học tập (`index.html`)
Lộ trình 13 bài bám đúng phạm vi mà bộ 67 câu trắc nghiệm đang kiểm tra (suy ra từ chính nội dung `questions.json`):

| Bài | Nội dung | Nhóm câu hỏi liên quan |
|---|---|---|
| 1 | Giới thiệu về Khoa học tự nhiên (nghiên cứu khoa học, vật sống/vật không sống, các lĩnh vực) | 1, 16, 31, 32 |
| 2 | An toàn trong phòng thực hành | 2, 33, 34 |
| 3 | Sử dụng kính lúp | 3, 35, 36, 37 |
| 4 | Kính hiển vi quang học | 4, 38 |
| 5 | Đo chiều dài | 5, 39 |
| 6 | Đo khối lượng | 6, 41, 42, 43, 47, 48 |
| 7 | Đo thời gian | 40, 44 |
| 8 | Đo nhiệt độ (thang °C và °F) | 7, 45, 46 |
| 9 | Các thể của chất và sự chuyển thể | 63, 64, 65, 66, 67 |
| 10 | Sự đa dạng của chất — tính chất của chất và vật liệu (3R, gang/thép) | 8, 10, 49, 50, 51, 52, 57, 58, 59, 60, 61, 62 |
| 11 | Oxygen và không khí | 9, 53, 54, 55, 56 |
| 12 | Tế bào và các cấp độ tổ chức cơ thể | 11, 12, 13, 14, 15, 17, 18, 19, 20 |
| 13 | Lực là gì? Lực kế | 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 |

Mỗi bài gồm: mục tiêu "học xong bài này em biết", ý chính gạch đầu dòng, hộp "Điểm cần nhớ", 1 hình minh họa và 2 câu tự kiểm tra nhanh (bấm để hiện đáp án). Nội dung bài học được soạn khớp với đáp án/giải thích trong chính bộ câu hỏi (ví dụ: kính hiển vi quang học 40–3000 lần; lực kế GHĐ 10 N, ĐCNN 0,2 N; sinh vật đơn bào gồm tảo lục và vi khuẩn lam).

## Phần 2 — Trắc nghiệm (`quiz.html` + `questions.json`)
- 67 câu trắc nghiệm giữa kì 1 — **giữ nguyên văn** bản đang chạy trên GitHub (tải về 2026-10-21), không sửa nội dung câu nào.
- `quiz.html` là bản sao của trang trắc nghiệm hiện hành (trước đây là `khtn/index.html`), engine giữ nguyên 3 chế độ: Học tập (bấm chọn từng câu, hiện đúng/sai + giải thích), Luyện tập, Thi thử (20 câu ngẫu nhiên, chấm cuối bài). Chỉ thêm: dòng đếm số câu tự động, ghi chú đáp án chưa đối chiếu, và link về trang Học tập / trang chủ — giống cách `lichsu/quiz.html` đang làm.
- ⚠️ **Đáp án và giải thích do người soạn tự biên soạn, chưa đối chiếu đáp án chính thức** — cần soát lại trước khi coi là đáp án chuẩn.

## Hình ảnh (gắn bằng link Wikimedia Commons)
Theo ràng buộc kỹ thuật (connector push chỉ nhận file UTF-8, không đẩy được ảnh nhị phân lên repo), ảnh được gắn bằng **link ổn định từ Wikimedia Commons** dạng `https://commons.wikimedia.org/wiki/Special:FilePath/<tên file>?width=900`. Toàn bộ URL đã được kiểm chứng bằng curl (HTTP 200, content-type là image) vào ngày 2026-10-21. Không dùng ảnh sách giáo khoa, không dùng ảnh có watermark.

| Bài | File trên Wikimedia Commons | Giấy phép | Kết quả kiểm (curl) |
|---|---|---|---|
| 1 | A group of scientists working in a laboratory Esculab.jpg | CC0 | 200, image/jpeg |
| 2 | GHS-pictogram-silhouette.svg | Public domain | 200, image/png |
| 3 | Magnifying glass2.jpg | Public domain | 200, image/jpeg |
| 4 | Dark Cool Optical Microscope.png | CC BY-SA 4.0 | 200, image/png |
| 5 | Steel ruler closeup.jpg | CC BY-SA 4.0 | 200, image/jpeg |
| 6 | Cent-o-gram-311.jpg | Public domain | 200, image/jpeg |
| 7 | Stoppuhr hanhart.jpg | Public domain | 200, image/jpeg |
| 8 | CelsiusKelvinThermometer.jpg | CC BY-SA 3.0 | 200, image/jpeg |
| 9 | Melting - Flickr - Trinity.jpg | CC BY-SA 2.0 | 200, image/jpeg |
| 10 | Recycling symbol.svg | Public domain | 200, image/png |
| 11 | BOC Medical oxygen tanks Royal Women's Hospital.jpg | CC BY-SA 4.0 | 200, image/jpeg |
| 12 | Onion Epidermis Cells W.M. 40x - 132.jpg | CC BY 2.0 | 200, image/jpeg |
| 13 | Photo dynamometres charges.jpg | CC BY-SA 3.0 | 200, image/jpeg |
