# Khoa học tự nhiên 6 — Giữa kì 1 (sách Kết nối tri thức)

Mục môn Khoa học tự nhiên 6 trong web trắc nghiệm Lớp 6, gồm **2 phần theo thứ tự học** (nâng cấp 2026-10-21 theo nguyên tắc chung: học tập theo lộ trình có hình ảnh làm trước, trắc nghiệm làm sau — cùng khuôn với mục Lịch sử 6):

## Phạm vi 13 bài ↔ nhóm câu hỏi trong bộ 67 câu
Lộ trình bám đúng phạm vi mà bộ 67 câu trắc nghiệm đang kiểm tra (suy ra từ chính nội dung `questions.json`):

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

## Phần 1 — Học tập (`index.html`) — cấu trúc TỪNG BÀI KHÉP KÍN (cập nhật 2026-10-21)
Học nối tiếp từng bài, xong bài này mới sang bài tiếp theo. Mỗi bài là một khối khép kín theo đúng thứ tự:
1. **Nội dung bài** — mục tiêu "học xong bài này em biết", ý chính gạch đầu dòng, 1 hình minh họa Wikimedia (xem bảng nguồn ở cuối).
2. **Điểm cần nhớ** — hộp tóm tắt các mốc/số liệu trọng tâm.
3. **Sơ đồ tư duy của bài** — 1 sơ đồ/bài làm bằng HTML/CSS thuần (không thư viện ngoài): trung tâm là tên bài, các nhánh là ý chính/khái niệm lớn, từ khóa ngắn.
4. **Câu hỏi gợi nhớ riêng của bài** — 3–5 câu/bài (bấm hiện đáp án), trong đó mỗi bài có ít nhất 1 câu hỏi dựa trên hình minh họa của bài.
5. **Flashcard riêng của bài** — 4–6 thẻ/bài, **100% thẻ có hình gợi nhớ** (ảnh của chính bài học, hoặc sơ đồ SVG tự vẽ trong trang cho khái niệm trừu tượng), bấm lật thẻ, nút Đã thuộc/Chưa thuộc, nút lọc "Chỉ xem thẻ chưa thuộc", tiến độ lưu `localStorage` khoá `khtn_flash_v1`.
6. **Khối chuyển tiếp** sang bài tiếp theo.

**Phần Tổng kết** (sau Bài 13, trước Phần 2): sơ đồ tư duy TỔNG "KHTN 6 — Học kì 1" với 5 nhánh nhóm bài (Mở đầu & đo lường / Chất / Oxygen–không khí / Tế bào / Lực) + bộ flashcard TỔNG ÔN gộp toàn bộ 64 thẻ (dùng chung trạng thái Đã thuộc với các bộ theo bài).

**Hai chế độ hiển thị (bổ sung 2026-10-21):** thanh chọn ở đầu trang Phần 1 (lặp lại ở cuối trang, trước Phần 2):
- **📄 Từng bài** — chế độ **mặc định**: chỉ hiện đúng 1 bài tại một thời điểm; chọn bài bằng thanh chip Bài 1–13 (Phần Tổng kết là chip riêng ở cuối thanh) hoặc nút ⬅ Bài trước / Bài sau ➡ (kèm dòng vị trí "Bài n/13 — tên bài"); chuyển bài thì cuộn lên đầu thanh chọn. Các link trong trang (lộ trình, khối "Xong Bài n") cũng chuyển bài theo chế độ này.
- **📚 Xem tất cả** — show all toàn bộ 13 bài + Tổng kết như bản trước.
- Lựa chọn được lưu `localStorage` khoá `khtn_view_mode` (`single`/`all`), mở lại trang vẫn giữ chế độ cũ; mở link có `#baiN`/`#tongket` thì chế độ Từng bài tự chọn đúng bài đó. Trạng thái flashcard `khtn_flash_v1` không bị ảnh hưởng.

**Responsive (bổ sung 2026-10-21):** mobile-first — dùng tốt ở 375px (điện thoại), 768px (iPad) và desktop (cột nội dung tối đa 800px căn giữa); mọi nút/chip/link điều hướng có vùng chạm ≥ 44px (nút chế độ và Trước/Sau cao 48px); chữ thân bài ≥ 16px (nội dung bài, câu hỏi gợi nhớ); lưới sơ đồ tư duy và lưới flashcard dùng `minmax(min(160px,100%),1fr)` nên tự co cột, cộng `max-width:100%` cho ảnh/SVG và chặn tràn ngang toàn trang — không có cuộn ngang.

**Chuẩn font (bổ sung 2026-10-21):** font **'Be Vietnam Pro'** (Google Fonts, hỗ trợ tiếng Việt, weight 400–700) với fallback Arial/sans-serif, nút bấm kế thừa font chung. Thân bài **18px, line-height 1.7**, màu chữ chính `#1f2937`; chữ phụ/giải thích ≥ 16px; chú thích ảnh và chân trang 14px màu `#444`; **không còn cỡ chữ < 13px trong CSS** (trước đây chân trang và dòng gợi ý trên flashcard chỉ 11px). H2 = 25px, tiêu đề bài 19px, sơ đồ tư duy 16–17px, nội dung flashcard 17px (chiều cao thẻ tăng 180 → 204px cho vừa cỡ chữ mới), mọi nút/chip ≥ 16px.

| Bài | Câu hỏi gợi nhớ | Flashcard |
|---|---|---|
| 1. Giới thiệu KHTN | 4 | 5 |
| 2. An toàn phòng thực hành | 4 | 5 |
| 3. Kính lúp | 4 | 5 |
| 4. Kính hiển vi quang học | 4 | 4 |
| 5. Đo chiều dài | 4 | 5 |
| 6. Đo khối lượng | 4 | 5 |
| 7. Đo thời gian | 4 | 4 |
| 8. Đo nhiệt độ | 4 | 4 |
| 9. Các thể & sự chuyển thể | 5 | 5 |
| 10. Chất và vật liệu | 5 | 5 |
| 11. Oxygen và không khí | 4 | 5 |
| 12. Tế bào | 5 | 6 |
| 13. Lực và lực kế | 5 | 6 |
| **Tổng** | **56** | **64** |

**Hình gợi nhớ cho flashcard:** 38 thẻ dùng ảnh của chính bài học (Wikimedia, bảng nguồn bên dưới); 26 thẻ dùng **sơ đồ SVG tự vẽ ngay trong trang** cho các khái niệm trừu tượng, bám đúng nội dung SGK của bài: sơ đồ hạt của 3 thể rắn/lỏng/khí (Bài 9), sơ đồ tế bào có nhãn màng tế bào – chất tế bào – nhân (Bài 12), nhiệt kế hai mốc 0°/100° (Bài 8), đồng hồ (Bài 7), thước có vạch chia (Bài 5), cân đòn hai đĩa (Bài 6), biểu đồ tỉ lệ N₂/O₂ (Bài 11), lò xo lực kế (Bài 13), mũi tên chuyển thể rắn → lỏng (Bài 9). Đợt này không dùng 3D và không thêm nguồn ảnh ngoài Wikimedia/tự vẽ.

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
| 8 | Analog wall thermometer showing temperature in Celsius and Fahrenheit.jpg (tác giả JOBAER) | Giấy phép tự do trên Wikimedia Commons | 200, image/jpeg |
| 9 | Melting - Flickr - Trinity.jpg | CC BY-SA 2.0 | 200, image/jpeg |
| 10 | Recycling symbol.svg | Public domain | 200, image/png |
| 11 | BOC Medical oxygen tanks Royal Women's Hospital.jpg | CC BY-SA 4.0 | 200, image/jpeg |
| 12 | Onion Epidermis Cells W.M. 40x - 132.jpg | CC BY 2.0 | 200, image/jpeg |
| 13 | Photo dynamometres charges.jpg | CC BY-SA 3.0 | 200, image/jpeg |

**Ghi chú đợt soát ảnh 2026-10-21 (khớp ảnh – nội dung + hình câu hỏi/đáp án):** đã tải và xem trực tiếp cả 13 ảnh để đối chiếu với chú thích của từng bài (trang mô tả file trên Commons không mở được từ môi trường làm việc — bị 403 — nên đối chiếu bằng chính ảnh tải về). Kết quả: **12/13 ảnh khớp**; riêng ảnh cũ của Bài 8 (`CelsiusKelvinThermometer.jpg`) là nhiệt kế hai thang **°C và K (Kelvin)** — không hề có thang °F như chú thích và câu hỏi gợi nhớ theo hình vẫn nói tới — nên **đã thay** bằng ảnh nhiệt kế treo tường hai thang **°C (trái) / °F (phải)** ở trên, đồng thời sửa alt, chú thích, câu hỏi gợi nhớ theo hình và dòng nguồn ở chân trang cho khớp. Giấy phép chính xác (biến thể CC) của ảnh mới chưa đối chiếu lại được trên trang file gốc vì lỗi 403 nói trên; tác giả "JOBAER" lấy từ EXIF của file, và Wikimedia Commons chỉ lưu trữ ảnh giấy phép tự do. Ngoài ra đã rà toàn bộ **56 câu hỏi gợi nhớ**: không câu hỏi nào và không đáp án nào chứa ảnh nhúng — 13 câu dạng 🖼️ (1 câu/bài) chỉ nhắc tới hình minh họa của chính bài học trong lời câu hỏi, đáp án luôn là chữ → **không có cặp hình câu hỏi – hình đáp án trùng nhau** cần xử lí; sơ đồ SVG của flashcard giữ nguyên như cũ.
