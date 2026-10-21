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

## Kiểm tra độ bao phủ kiến thức (2026-10-21)
Đã đối chiếu **từng câu trong 67 câu** với toàn bộ nội dung dạy trên trang (nội dung chính + Điểm cần nhớ + sơ đồ tư duy + câu hỏi gợi nhớ + flashcard):
- **Trước đợt này: 62/67 câu** có mọi kiến thức cần thiết được dạy trực tiếp trên trang.
- **5 câu thiếu một mảnh kiến thức** (kiến thức nằm ngoài phần cốt lõi đã trình bày) — đã bổ sung bằng **5 hộp "➕ Kiến thức bổ sung"** (khung xanh lá, viền đứt nét, đặt cuối phần nội dung chính của đúng bài liên quan, trước hình minh họa):

| Bài | Câu liên quan | Kiến thức đã bổ sung |
|---|---|---|
| 6 | 48 | Quy trình cân gồm đúng **6 bước**; khi đọc kết quả, nhìn **vạch chia mà đầu kim chỉ tới** |
| 9 | 67 | Sự bay hơi **không nhìn thấy được** bằng mắt thường (chỉ thấy mực chất lỏng vơi dần) |
| 10 | 61 | Khai thác quặng: chế biến thành sản phẩm có giá trị, phải **tiết kiệm, có kế hoạch, tránh ô nhiễm môi trường** |
| 12 | 11 | Tế bào **có nhiều hình dạng khác nhau** (cầu, đĩa, sợi, đa giác…) — nhận định "mọi tế bào đều hình đa giác" là sai |
| 13 | 23 | **Mọi vật có khối lượng đều hút nhau** bằng lực hấp dẫn (không chỉ Trái Đất) |

- **Sau bổ sung: 67/67 câu** đều có đủ kiến thức được dạy trên trang (số liệu trong hộp bổ sung khớp đáp án bộ câu hỏi — bộ câu hỏi không đổi).
- ⚠️ **2 câu cần lưu ý** (đã báo agent chính, không tự sửa câu hỏi): **Câu 48** — phát biểu (6) "đọc kết quả đo ở vạch bên phải của đầu kim" diễn đạt không chuẩn và không có trong SGK (cách đọc đúng đã đưa vào hộp bổ sung Bài 6); đáp án "2 phát biểu sai" chỉ đứng vững nếu coi phát biểu (6) là đúng. **Câu 19** — phương án B ("Mô là cấp độ nhỏ hơn để xây dựng lên hệ cơ quan") diễn đạt dễ gây tranh cãi, dù đáp án D vẫn rõ ràng đúng theo nội dung đã dạy.

## Phần 1 — Học tập (`index.html`) — cấu trúc TỪNG BÀI KHÉP KÍN (cập nhật 2026-10-21)
Học nối tiếp từng bài, xong bài này mới sang bài tiếp theo. Mỗi bài là một khối khép kín theo đúng thứ tự:
1. **Nội dung bài** — mục tiêu "học xong bài này em biết", ý chính gạch đầu dòng, 1 hình minh họa Wikimedia (xem bảng nguồn ở cuối).
2. **Điểm cần nhớ** — hộp tóm tắt các mốc/số liệu trọng tâm.
3. **Sơ đồ tư duy của bài** — 1 sơ đồ/bài làm bằng HTML/CSS thuần (không thư viện ngoài): trung tâm là tên bài, các nhánh là ý chính/khái niệm lớn, từ khóa ngắn.
4. **Câu hỏi gợi nhớ riêng của bài** — 3–5 câu/bài (bấm hiện đáp án), trong đó mỗi bài có ít nhất 1 câu hỏi dựa trên hình minh họa của bài.
5. **Flashcard riêng của bài** — 4–6 thẻ/bài, **100% thẻ có hình gợi nhớ** (bộ hình riêng cho flashcard: tranh AI gen theo đúng cụm nội dung của từng thẻ/nhóm thẻ, ảnh thật giữ cho các thẻ cần chính xác, và sơ đồ SVG tự vẽ trong trang cho khái niệm trừu tượng/quá trình), bấm lật thẻ, nút Đã thuộc/Chưa thuộc, nút lọc "Chỉ xem thẻ chưa thuộc", tiến độ lưu `localStorage` khoá `khtn_flash_v1`.
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

**Hình gợi nhớ cho flashcard (làm phong phú 2026-10-21):** trước đây cả bài chỉ dùng chung 1 ảnh của bài học cho mọi thẻ — rất đơn điệu. Nay đã gen riêng **25 tranh AI** (phong cách tranh màu nước sách giáo khoa thiếu nhi, cảnh sinh động có hoạt động, không chữ trong hình; resize 400px, WebP, 13–36 KB/tấm) lưu tại `hinh-anh/khtn/fc-bai<N>-*.webp`, gán cho **35 thẻ** theo đúng cụm nội dung (vd Bài 1: nghiên cứu khoa học / vật sống / các lĩnh vực; Bài 3: cấu tạo kính lúp / soi lá / xem tem; Bài 13: kéo co–đẩy thùng / táo rơi trọng lực / kéo giãn dây chun). Sau khi gán lại: 64 thẻ dùng **39 hình khác nhau**, mỗi ảnh raster tối đa 2 thẻ dùng chung. Các thẻ còn lại giữ hình đang hợp: ảnh thật cho thẻ cần chính xác (biểu tượng GHS — Bài 2; biểu tượng tái chế — Bài 10; ảnh kính hiển vi và ảnh lực kế thật) và **sơ đồ SVG tự vẽ ngay trong trang** cho khái niệm trừu tượng/quá trình, bám đúng nội dung SGK của bài: sơ đồ hạt của 3 thể rắn/lỏng/khí (Bài 9), sơ đồ tế bào có nhãn màng tế bào – chất tế bào – nhân (Bài 12), nhiệt kế hai mốc 0°/100° (Bài 8), đồng hồ (Bài 7), thước có vạch chia (Bài 5), cân đòn hai đĩa (Bài 6), biểu đồ tỉ lệ N₂/O₂ (Bài 11), lò xo lực kế (Bài 13), mũi tên chuyển thể rắn → lỏng (Bài 9). Hình trong thân bài học (figure) không thay đổi đợt này.

**Rà soát khớp hình–câu hỏi flashcard (2026-10-21, sau khi user bắt lỗi thẻ than củi bị gắn hình khu vườn toàn vật sống):** chấm lại toàn bộ 64 thẻ theo tiêu chí "hình mặt hỏi phải đúng đúng khái niệm thẻ hỏi — cùng bài nhưng khác khái niệm cũng tính là sai". Kết quả: **45 thẻ giữ nguyên hình** (44 thẻ KHỚP hẳn — gồm các ngoại lệ chính xác: biểu tượng GHS, biểu tượng tái chế, nhiệt kế SVG, ảnh kính hiển vi, ảnh lực kế, các sơ đồ SVG khái niệm đúng nội dung — và 1 thẻ KHỚP MỘT PHẦN chấp nhận được là b4c3: ảnh tế bào phóng đại qua thị kính gợi đúng ý độ phóng đại, công thức không vẽ được bằng tranh không chữ); **8 thẻ SAI** và **11 thẻ KHỚP MỘT PHẦN yếu** đã sửa. Cách sửa: gen mới **17 tranh** `hinh-anh/khtn/fc-sua-*.webp` (400px, WebP q72, 8–29 KB) cho các thẻ sai lệch nhất — vật không sống (than củi, đá, bàn ghế gỗ) cho b1c3, nước sôi cho b1c5, nhiệt kế vỡ + thủy ngân cho b2c2, hóa chất đổ + giấy thấm cho b2c3, kiến phóng đại cho b3c3, lau kính lúp + cất hộp cho b3c5, mắt nhìn vuông góc thước cho b5c5, chỉnh cân về 0 cho b6c4, mây hình thành do ngưng tụ cho b9c3, sôi vs bay hơi cho b9c4, sắt gỉ cho b10c1, gang vỡ giòn vs thép cong cho b10c5, dập cháy xăng bằng cát cho b11c3, lửa lan trên mặt nước cho b11c4, hệ chồi–hệ rễ cho b12c5, tế bào nhân sơ có vùng nhân cho b12c6, kéo co cân bằng cho b13c3 — và gán lại 1 thẻ từ hình có sẵn (b6c1 → ảnh hộp sữa trên cân ở quầy). Riêng thẻ **b2c5** (hai việc cấm trong phòng thực hành): tranh gen riêng cho cảnh này không tạo được, đã gán lại sang `fc-bai2-an-toan.webp` (học sinh mang đồ bảo hộ trong phòng thực hành — đúng bối cảnh quy tắc an toàn, thay cho biểu tượng GHS không liên quan) và chấm KHỚP MỘT PHẦN — nếu cần hình riêng đúng cảnh hơn thì bổ sung sau. Sau đợt sửa: mọi ảnh raster tối đa 2 thẻ dùng chung (chỉ còn ảnh kính hiển vi dùng cho 2 thẻ cùng hỏi về kính hiển vi), nội dung chữ 64 thẻ không đổi một ký tự (đã kiểm chứng bằng diff dữ liệu FLASH trước/sau).

**Mặt trước flashcard ĐỘNG (bổ sung 2026-10-21):** các thẻ về quá trình/chuyển động dùng **sơ đồ SVG tự vẽ được animate bằng CSS thuần** ngay trên mặt câu hỏi (mặt đáp án vẫn tĩnh, chỉ có chữ như trước; thẻ về vật thể tĩnh — thước, cân đòn, tế bào, biểu đồ tỉ lệ — giữ sơ đồ tĩnh):
- `states` (Bài 9 — thẻ b9c1, b9c5; riêng b9c4 đã đổi sang tranh sôi/bay hơi ở đợt rà soát khớp hình bên dưới): hạt **rắn rung tại chỗ**, hạt **lỏng trượt qua lại**, hạt **khí bay loạn** — mỗi hạt có độ trễ riêng cho tự nhiên.
- `change` (Bài 9 — thẻ b9c2, nóng chảy): giọt nước **nhỏ giọt rơi** từ khối rắn, mũi tên chuyển thể **đẩy nhịp**, giọt lỏng **nhấp nhô**.
- `spring` (Bài 13 — thẻ b13c4, b13c6): lò xo **giãn ra – co lại** theo chu kì, quả nặng treo phía dưới chuyển động đồng bộ. (Thẻ b13c5 về GHĐ/ĐCNN của lực kế nay dùng ảnh lực kế thật thay cho sơ đồ.)
- `thermo` (Bài 8 — thẻ b8c1–b8c4): cột thủy ngân đỏ **dâng lên – hạ xuống** trong ống nhiệt kế.
- `clock` (Bài 7 — thẻ b7c1, b7c2, b7c4): kim đồng hồ **quay liên tục** quanh tâm.
- Có `@media (prefers-reduced-motion: reduce)` tắt toàn bộ chuyển động cho thiết bị/người dùng đã chọn giảm chuyển động.

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
| 3 | **Magnifying glass.jpg** (thay 21/10/2026 — đợt rà chữ nước ngoài: ảnh cũ soi con tem Đức, chữ "DEUTSCHE POST" ngay điểm nhìn chính) | CC BY 2.5 | 200, image/jpeg |
| 4 | Dark Cool Optical Microscope.png | CC BY-SA 4.0 | 200, image/png |
| 5 | Steel ruler closeup.jpg | CC BY-SA 4.0 | 200, image/jpeg |
| 6 | Cent-o-gram-311.jpg | Public domain | 200, image/jpeg |
| 7 | Stoppuhr hanhart.jpg | Public domain | 200, image/jpeg |
| 8 | Analog wall thermometer showing temperature in Celsius and Fahrenheit.jpg (tác giả JOBAER) | Giấy phép tự do trên Wikimedia Commons | 200, image/jpeg |
| 9 | Melting - Flickr - Trinity.jpg | CC BY-SA 2.0 | 200, image/jpeg |
| 10 | Recycling symbol.svg | Public domain | 200, image/png |
| 11 | **Oxygen cylinders at the hospital in Tomaszów Mazowiecki, Poland.jpg** (thay 21/10/2026 — đợt rà chữ nước ngoài: ảnh cũ có logo "BOC" lớn trên bồn) | Public domain | 200, image/jpeg |
| 12 | Onion Epidermis Cells W.M. 40x - 132.jpg | CC BY 2.0 | 200, image/jpeg |
| 13 | Photo dynamometres charges.jpg | CC BY-SA 3.0 | 200, image/jpeg |

**Ghi chú đợt soát ảnh 2026-10-21 (khớp ảnh – nội dung + hình câu hỏi/đáp án):** đã tải và xem trực tiếp cả 13 ảnh để đối chiếu với chú thích của từng bài (trang mô tả file trên Commons không mở được từ môi trường làm việc — bị 403 — nên đối chiếu bằng chính ảnh tải về). Kết quả: **12/13 ảnh khớp**; riêng ảnh cũ của Bài 8 (`CelsiusKelvinThermometer.jpg`) là nhiệt kế hai thang **°C và K (Kelvin)** — không hề có thang °F như chú thích và câu hỏi gợi nhớ theo hình vẫn nói tới — nên **đã thay** bằng ảnh nhiệt kế treo tường hai thang **°C (trái) / °F (phải)** ở trên, đồng thời sửa alt, chú thích, câu hỏi gợi nhớ theo hình và dòng nguồn ở chân trang cho khớp. Giấy phép chính xác (biến thể CC) của ảnh mới chưa đối chiếu lại được trên trang file gốc vì lỗi 403 nói trên; tác giả "JOBAER" lấy từ EXIF của file, và Wikimedia Commons chỉ lưu trữ ảnh giấy phép tự do. Ngoài ra đã rà toàn bộ **56 câu hỏi gợi nhớ**: không câu hỏi nào và không đáp án nào chứa ảnh nhúng — 13 câu dạng 🖼️ (1 câu/bài) chỉ nhắc tới hình minh họa của chính bài học trong lời câu hỏi, đáp án luôn là chữ → **không có cặp hình câu hỏi – hình đáp án trùng nhau** cần xử lí; sơ đồ SVG của flashcard giữ nguyên như cũ.

## Rà soát chữ nước ngoài trong hình (21/10/2026)

Quy tắc của user: hạn chế tối đa chữ tiếng Anh/ngôn ngữ khác trong hình bài học thường. Đã tải và xem trực tiếp toàn bộ 13 ảnh. Kết quả: **thay 2 ảnh**, còn lại sạch chữ hoặc thuộc ngoại lệ giữ nguyên.

| Ảnh | Vấn đề | Xử lý |
|---|---|---|
| Kính lúp — Magnifying glass2.jpg (Bài 3, 6 vị trí gồm flashcard) | Kính soi con tem Đức, chữ "DEUTSCHE POST / 1 RM" to rõ ngay điểm nhìn chính | **Thay** → `Magnifying glass.jpg` (CC BY 2.5): kính lúp cầm tay trên nền trơn, không chữ |
| Bình oxygen — BOC Medical oxygen tanks… (Bài 11, 4 vị trí gồm flashcard) | Logo "BOC" đỏ cỡ lớn trên thân bồn + dòng chữ nhỏ "Liquid Medical Oxygen / NO SMOKING" | **Thay** → `Oxygen cylinders at the hospital in Tomaszów Mazowiecki, Poland.jpg` (Public domain): dãy bình khí nén tại bệnh viện, không logo/chữ đọc được |

**Giữ nguyên (ngoại lệ, có lý do):** nhiệt kế hai thang °C/°F (Bài 8) — thang °F chính là nội dung bài học (ngoại lệ user đã duyệt); thước thép (Bài 5), cân Cent-o-gram (Bài 6), lực kế (Bài 13), đồng hồ bấm giây Hanhart (Bài 7) — các vạch số/đơn vị (cm, g, N, giây) là nội dung đo lường của bài, tên hãng sản xuất rất nhỏ trên mặt dụng cụ, không phải điểm nhìn chính.

**Đã kiểm tra sạch chữ:** phòng thí nghiệm (Bài 1), biển báo GHS (Bài 2, biểu tượng thuần), kính hiển vi (Bài 4), đá tan (Bài 9), biểu tượng tái chế (Bài 10), tế bào hành (Bài 12).

## Địa phương hoá ảnh (21/10/2026)

Toàn bộ 13 ảnh thật của module (ảnh bài học + ảnh flashcard trong `FLASH`) trước đây hotlink từ Wikimedia Commons nay đã **tải về thành file thật** trong thư mục chuyên hình ảnh **`hinh-anh/khtn/`** ở gốc repo; mọi tham chiếu trong `index.html` đã đổi sang `../hinh-anh/khtn/<file>` (51 chỗ). Hai biểu tượng nguồn SVG (GHS, tái chế) được tải ở bản PNG 900px; ảnh kính hiển vi (PNG gốc 686 KB) nén lại sang WebP 20 KB. Các sơ đồ flashcard tự vẽ SVG inline (`FC_SVG`) không thay đổi. Danh mục file → vị trí dùng → nguồn gốc: xem `hinh-anh/README.md`. Đã kiểm chứng HTTP 200 cho mọi đường dẫn nội bộ; `questions.json` giữ nguyên md5 `1d0b3bdf…`.
