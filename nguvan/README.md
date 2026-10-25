# Ngữ văn 6 — Cả năm học (Kết nối tri thức)

## Học kì 2 (bổ sung 25/10/2026)

- Thêm 5 bài tập 2: Bài 6 Chuyện kể về những người anh hùng, Bài 7 Thế giới cổ tích, Bài 8 Khác biệt và gần gũi, Bài 9 Trái Đất – ngôi nhà chung, Bài 10 Cuốn sách tôi yêu. Mỗi bài đủ khung rút gọn (không chép nguyên văn SGK): hook, tóm tắt ngắn gọn đủ ý, sơ đồ tư duy 3 nhánh, 2 thẻ ⚡ Nhớ nhanh, 4 câu hỏi gợi nhớ, 2 bài Góc tự luận (dàn ý 3 dòng + 2 câu gợi ý + bài tập 3–5 câu), ⭐ Điểm cần nhớ 4 ý, hộp 📚 Vốn từ hay (từ `vontu.json`, 36 từ cho 5 bài), flashcard của bài (5 thẻ/bài).
- Số liệu mới: **75 câu trắc nghiệm** (9 câu/bài HK2, 6 câu/bài HK1), **55 flashcard** (5 thẻ/bài HK2, 6 thẻ/bài HK1), **20 thẻ nhớ nhanh** (2/bài), **41 câu hỏi gợi nhớ** (21 HK1 + 20 HK2). `quiz.html`: `FC_BAI` nối dài lên 55 mục (Bài 6–10 mỗi bài 5 thẻ); khối `PERIODS` giữ nguyên (Giữa HK2 = Bài 1–8, Cuối HK2 = tất cả); phân kỳ theo thứ tự SGK, **chưa xác nhận PPCT** của trường.
- Ảnh tập làm văn HK1 đã gắn thật: 10 ảnh gợi ý `tlv-baiN-*.webp` thay các dòng “Tranh cần vẽ” trong khối Tập làm văn (mỗi bài 1 tả + 1 kể, đúng thứ tự), cộng 5 ảnh bìa khối `nguvan-taplamvan-baiN.webp` đặt sau đoạn mở đầu khối. Tất cả 400px, ≤50KB, chú thích ghi “(Tranh minh họa do AI vẽ)”.
- **Chưa đối chiếu SGK giấy, chỉ tóm tắt ở mức chủ đề/kĩ năng và ghi “đọc tiếp trong SGK giấy”:** bài thơ “Ai ơi mồng 9 tháng 4” (Bài 6, chỉ xác minh tên + tác giả Anh Thư); “Vua chích chòe” và phần sau truyện Thạch Sanh (Bài 7); “Hai loài khác biệt”, “Bài tập làm văn”, “Tiếng cười không muốn nghe” (Bài 8); toàn bộ văn bản Bài 9 và Bài 10. Ngược lại, cốt truyện Thánh Gióng, Sơn Tinh – Thủy Tinh, Thạch Sanh (phần đầu), Cây khế, Sọ Dừa đã đối chiếu kĩ và dùng được cho tóm tắt.
- Lưu ý khác với khung HK1: bài HK2 **không có khối “Thẻ từ khó” riêng** (từ khó đã nằm trong hộp “Vốn từ hay”, tránh trùng lặp — ở Bài 1 HK1 hai hộp này trùng nhau 5/7 từ); Góc tự luận HK2 dùng dạng dàn ý gọn, không có hộp chọn từ khóa tương tác như HK1.

Module học Ngữ văn 6 cho web quiz lớp 6: `nguvan/index.html` (1 file HTML tĩnh duy nhất, không cần server riêng — mở qua http.server/GitHub Pages đều chạy).

## Mục tiêu thiết kế

Ngữ văn là môn **tự luận là chính** — module này KHÔNG phải kho văn mẫu để chép. Mục tiêu: trẻ **thấm bài, theo kịp bài trên lớp** và **tự viết bằng lời của mình**. Vì vậy phần trọng tâm là *Góc tự luận*: mỗi câu hỏi chỉ cho **dàn ý gợi mở** (bấm xem sau khi tự nghĩ) + **1 đoạn mẫu ngắn 3–5 câu** để học cách diễn đạt, kèm cảnh báo "hãy tự viết bằng lời của mình". Không có bài văn hoàn chỉnh viết thay trẻ, và không làm quiz trắc nghiệm riêng cho Văn.

## Cấu trúc trang — mạch từng bài khép kín

Mỗi bài (chủ điểm) là 1 khối nối tiếp gồm:

1. **Giới thiệu bài** — chủ đề/cảm xúc chính, 2 hình minh họa khớp nội dung (đã đối chiếu mô tả file Commons)
2. **Văn bản chính** — **khối "📖 Bài đọc — đọc trước khi học"** đặt ngay dưới tiêu đề từng văn bản (xem mục riêng bên dưới), rồi mới đến tóm tắt theo bố cục bằng lời dễ hiểu + 1 trích đoạn ngắn tiêu biểu (ghi nguồn tác giả)
3. **Sơ đồ tư duy của bài** (HTML/CSS thuần) — trung tâm = tên bài, nhánh = văn bản/ý nghĩa
4. **Học từ khó** — 5 thẻ/bài: từ + nghĩa dễ hiểu + ví dụ đặt câu đời thường
5. **Câu hỏi gợi nhớ** — 4–5 câu/bài, bấm hiện đáp án ngắn (có câu hỏi theo hình, có câu đọc-hiểu nhanh)
6. **Góc tự luận** — 3 câu/bài theo mức Dễ → Vừa → Khó hơn, mỗi câu có dàn ý gợi ý + đoạn mẫu ngắn
7. **Flashcard riêng của bài** — 6 thẻ/bài, mặt trước có hình gợi nhớ, mặt sau chỉ có đáp án (không lặp lại hình của mặt trước); Đã thuộc/Chưa thuộc lưu `localStorage` khoá `nguvan_flash_v1`

Cuối trang: **Phần Tổng kết** — sơ đồ tư duy tổng cả năm học (10 bài) + mục *Luyện viết theo chủ đề* (9 dạng viết: 4 của HK1 + 5 của HK2, mỗi dạng 1 dàn ý khung + bí quyết) + flashcard tổng ôn gộp 55 thẻ.

## Phần bài đọc + Nghe đọc (bổ sung 21/10/2026)

Mỗi văn bản trong 14 văn bản của 5 bài có một khối **"📖 Bài đọc — đọc trước khi học"** đặt **ngay dưới tiêu đề văn bản, trước** phần tóm tắt/sơ đồ/câu hỏi, để bé **đọc trực tiếp nguyên văn trên trang** trước khi học. Nguyên tắc cứng: văn bản lấy **nguyên văn từ nguồn công khai đăng tải văn bản SGK** (mỗi khối đều có dòng "Nguồn văn bản" ghi rõ), **không viết lại theo trí nhớ**; chỗ nào nguồn đăng thiếu thì đánh dấu **(…)** ngay trong bài đọc và ghi chú đọc tiếp trong SGK giấy — không tự chế nối văn.

- **Gấp/mở:** nút "Mở bài đọc ▾ / Thu gọn ▴"; mặc định **MỞ** ở văn bản đầu tiên của mỗi bài (Dế Mèn, Chuyện cổ tích về loài người, Cô bé bán diêm, Chùm ca dao, Cô Tô), các văn bản còn lại gấp gọn.
- **Nghe đọc:** mỗi khối có nút **"🔊 Nghe đọc bài này"** + **"⏹ Dừng"**, dùng `speechSynthesis` của trình duyệt, `lang='vi-VN'`, tốc độ 0.95. Bài đọc được **chia thành từng câu/đoạn ngắn và đọc nối tiếp** (tránh lỗi trình duyệt cắt ngang với văn bản dài); thơ đọc theo từng dòng. Đang đọc thì nút đổi nhãn "🔊 Đang đọc…" và hiện nút Dừng; bấm nghe ở văn bản khác, thu gọn khối đang đọc, chuyển bài hoặc đổi chế độ xem thì **tự dừng**. Nếu thiết bị không có giọng tiếng Việt: vẫn đọc bằng giọng mặc định và hiện dòng lưu ý *"Thiết bị chưa có giọng đọc tiếng Việt — nghe tạm bằng giọng mặc định."* — **Giới hạn:** chất lượng giọng phụ thuộc hoàn toàn vào thiết bị/trình duyệt (Chrome/Android thường có giọng Việt; một số máy không có sẽ đọc giọng Anh nghe khá khó hiểu); không có file audio riêng.
- **Trình bày:** chữ 18px/1.8 như chuẩn trang; thơ giữ nguyên ngắt dòng (`white-space:pre-line`); nút bấm ≥44px.

### Nguồn văn bản từng bài (đối chiếu 21/10/2026)

| Văn bản | Nguồn nguyên văn | Trạng thái |
|---|---|---|
| Bài học đường đời đầu tiên | thohay.vn (toàn văn *Dế Mèn phiêu lưu ký*) + đề đọc hiểu trích SGK | Trọn phần trích chương I trong SGK |
| Nếu cậu muốn có một người bạn… | olm.vn (trích nguyên văn SGK, ghi nguồn dịch Nguyễn Tấn Đại) | Có **3 chỗ (…)** đúng vị trí nguồn lược — đọc tiếp SGK giấy |
| Chuyện cổ tích về loài người | thohay.vn (đối chiếu chéo 3 nguồn) | Trọn bài (19 khổ) |
| Mây và sóng | hoctot.nam.name.vn + baigiang.violet.vn + giaoanketnoitrithuc.com | Trọn bài |
| Bức tranh của em gái tôi | lazi.vn (mục "Đọc tác phẩm", ghi nguồn *Bản nhạc con đà điểu*, Kim Đồng 2016, tr.45–50) | Trọn truyện |
| Cô bé bán diêm | giaibaitap123.com (bản in SGK, dịch Nguyễn Văn Hải – Vũ Minh Toàn) | Trích (SGK ghi "trích gần hết truyện"); mở đầu in dạng tóm tắt ngoặc đơn ngay trong SGK |
| Gió lạnh đầu mùa | thohay.vn | Trọn truyện |
| Con chào mào | thohay.vn (+ hoc247.net đối chiếu) | Trọn bài |
| Chùm ca dao về quê hương đất nước | vietjack.com (soạn KNTT) | Trọn 3 bài ca dao trong SGK |
| Chuyện cổ nước mình | thohay.vn (bản lớp 6/KNTT) | Trọn bài theo bản lớp 6 (có khổ cuối, khác bản lớp 4) |
| Cây tre Việt Nam | giaibaitap123.com (bản in SGK) | Trọn văn, giữ cả dấu (…) in sẵn trong sách |
| Cô Tô | thohay.vn (phần sau bão) + trích dẫn nguyên văn SGK trên hoc24.vn/xaydungso.vn (hai đoạn tả bão) | Trích phần cuối bài kí; **1 chỗ (…)** ở đoạn chuyển cảnh trong phần bão |
| Hang Én | tuyensinh247.com (kèm chú thích + dòng nguồn SGK) | Gần trọn; **1 chỗ (…)** đúng chỗ nguồn lược |
| Cửu Long Giang ta ơi | thohay.vn (theo *Trời xanh*, NXB Văn học 1960, tr.5–9) | Trọn bài |

Các bản điện tử đều có ít nhiều lỗi OCR/gõ; khi đưa vào trang chỉ dọn các lỗi rõ ràng (sai chính tả kiểu "Sauk hi", "ánh sang", chữ rác của trang sách) sau khi đối chiếu chéo — không đổi lời văn.

### Sửa lệch SGK phát hiện khi đối chiếu (đã sửa trong đợt này)

- **"Cô Tô":** câu trích nổi tiếng sửa *"trong trẻo **và** sáng sủa"* → *"trong trẻo, sáng sủa"* (đúng nguyên văn SGK) ở cả 4 chỗ: khối trích dẫn, câu hỏi gợi nhớ, đoạn mẫu và flashcard.
- **"Hoàng tử bé":** toàn trang trước đây dùng thuật ngữ **"thuần dưỡng"** (của một bản dịch khác) — SGK KNTT dùng bản dịch Nguyễn Tấn Đại với thuật ngữ **"cảm hóa"**. Đã thay toàn bộ 12 chỗ (tóm tắt, chú thích ảnh, thẻ từ khó, câu hỏi, đoạn mẫu, sơ đồ, flashcard) cho khớp SGK; câu kết của cáo trong khối bài đọc cũng là nguyên văn bản dịch này: *"Người ta chỉ thấy rõ với trái tim. Điều cốt lõi vô hình trong mắt trần."*
- Danh sách 14 văn bản + thứ tự + tác giả đã đối chiếu mục lục SGK KNTT: **khớp**, không phải sửa. (Lưu ý: *Cửu Long Giang ta ơi* là văn bản **Thực hành đọc** của Bài 5, trang trình bày chung như văn bản 3 của bài.)

## Hai chế độ hiển thị

- **"Từng bài" (mặc định):** chỉ hiện 1 bài; thanh chip chọn Bài 1–5 + 🏁 Tổng kết, nút Trước/Sau ở cả thanh trên và thanh dưới; Tổng kết là mục riêng; nút "Sang Bài…" cuối mỗi bài chuyển mục trong chế độ này.
- **"Xem tất cả":** hiện toàn bộ trang (show all).
- Nút chuyển chế độ ở **đầu và cuối trang**; lựa chọn lưu `localStorage` khoá `nguvan_view_mode`; mở trang kèm `#bai3`/`#tongket` sẽ hiện đúng mục đó.

## Responsive (chuẩn bắt buộc)

- Mobile-first: kiểm tra bố cục ở 375px (điện thoại), 768px (iPad) và desktop (trang giới hạn max-width 820px).
- Vùng chạm ≥ 44px: nút bấm, chip chọn bài, nút Trước/Sau, nút mở đáp án/dàn ý, link "Sang Bài…".
- Chữ thân bài ≥ 16px, giãn dòng ≥ 1.6 (môn Văn nhiều chữ); chú thích ảnh/nhãn phụ nhỏ hơn có chủ đích.
- Sơ đồ tư duy co giãn: trên màn hình ≤480px các nhánh xếp dọc; ảnh `max-width:100%`, không tràn ngang; thẻ flashcard tăng chiều cao trên điện thoại và mặt thẻ cuộn được khi đáp án dài.

## Danh sách bài (SGK Ngữ văn 6 KNTT, tập 1) và văn bản đọc chính

| Bài | Tên bài | Văn bản chính | Phạm vi |
|---|---|---|---|
| 1 | Tôi và các bạn | Bài học đường đời đầu tiên (Tô Hoài) • Nếu cậu muốn có một người bạn… (Saint-Exupéry) • Bắt nạt (Nguyễn Thế Hoàng Linh) | Ôn giữa kì 1 |
| 2 | Gõ cửa trái tim | Chuyện cổ tích về loài người (Xuân Quỳnh) • Mây và sóng (Tagore) • Bức tranh của em gái tôi (Tạ Duy Anh) | Ôn giữa kì 1 |
| 3 | Yêu thương và chia sẻ | Cô bé bán diêm (Andersen) • Gió lạnh đầu mùa (Thạch Lam) • Con chào mào (Mai Văn Phấn) | Sau giữa kì |
| 4 | Quê hương yêu dấu | Chùm ca dao về quê hương đất nước • Chuyện cổ nước mình (Lâm Thị Mỹ Dạ) • Cây tre Việt Nam (Thép Mới) | Sau giữa kì |
| 5 | Những nẻo đường xứ sở | Cô Tô (Nguyễn Tuân) • Hang Én (Hà My) • Cửu Long Giang ta ơi (Nguyên Hồng) | Sau giữa kì |

Nguồn đối chiếu mục lục: mục "Soạn văn 6 Tập 1" của VietJack (http://vietjack.com/soan-van-6/soan-van-6-tap-1.jsp) và bài giới thiệu SGK Ngữ văn 6 KNTT trên o-study.net; cấu trúc soạn bài tham khảo cách tổ chức phổ biến của VietJack/Loigiaihay (tìm hiểu chung → bố cục/nội dung theo phần → nghệ thuật/ý nghĩa → câu hỏi) nhưng nội dung tóm tắt, dàn ý, đoạn mẫu đều tự soạn theo khuôn của site, không sao chép lời văn của các trang đó.

## Hình ảnh (Wikimedia Commons — Special:FilePath?width=900, đã curl kiểm chứng 200 + image/jpeg, đối chiếu mô tả file)

| Khoá | File | Dùng cho | Ghi chú khớp nội dung |
|---|---|---|---|
| de | Gryllus campestris MHNT.jpg | Bài 1 — Dế Mèn | Ảnh con dế đồng (mô tả Commons: field cricket) |
| cao | Portrait of a red fox in Rautas fjällurskog.jpg | Bài 1 — cáo trong Hoàng tử bé | Chân dung cáo đỏ |
| song | Ocean waves crashing up on rocks.jpg | Bài 2 — Mây và sóng | Sóng biển vỗ đá |
| buom | Sailing boat at sunset, Ionian Sea, Albania.jpg | Bài 2 — Những cánh buồm | Thuyền buồm lúc hoàng hôn |
| diem | Matchstick in the Dark (Unsplash).jpg | Bài 3 — Cô bé bán diêm | Que diêm cháy trong bóng tối |
| tre | Bamboo and rattan village Phu Vinh,Chuong My,Ha Noi,Viet Nam.jpg | Bài 4 — Cây tre Việt Nam | Làng nghề mây tre đan Phú Vinh, Hà Nội (CC BY-SA 4.0) — đã thay cho ảnh rừng tre Kyoto vì lệch địa danh/nội dung |
| lua | Man Harvesting Rice - Khang Ninh Commune - Ba Be - Vietnam - 01 (48107680932).jpg | Bài 4 — ca dao quê hương | Gặt lúa ở Ba Bể, Bắc Kạn |
| dao | Ha Long Bay, Vietnam, Islands.jpg | Bài 5 — Cô Tô | Biển đảo VN (chú thích ghi rõ là hình minh họa biển đảo, không mạo nhận là đảo Cô Tô) |
| hang | Son Doong Cave DB (1).jpg | Bài 5 — Hang Én | Hang Sơn Đoòng, cùng vùng Phong Nha – Kẻ Bàng với Hang Én (chú thích ghi rõ) |
| mekong | Mekong Floating Market.jpg | Bài 5 — Cửu Long Giang | Chợ nổi trên sông Mê Kông |

Nguồn ảnh bổ sung đã được duyệt (Smithsonian Open Access, Met Open Access — CC0; Pexels/Unsplash) nhưng bản này chưa cần dùng: các vị trí yếu nhất đã xử lý trong Commons (ảnh tre Phú Vinh). Khi tra Pexels qua công cụ tìm kiếm chỉ thu được link qua các trang tổng hợp (aggregator) — không dùng theo quy định tránh hotlink blog/trang tổng hợp; nếu sau này lấy được URL ảnh trực tiếp từ pexels.com/unsplash.com và curl kiểm chứng đạt, có thể bổ sung.

## Số liệu tự kiểm (chạy thật trên file)

- 10 khối bài + 1 mục Tổng kết; 41 câu hỏi gợi nhớ (21 HK1 + 20 HK2); 25 khối Góc tự luận (15 HK1 + 10 HK2, mỗi khối 1 dàn ý + câu gợi ý); 25 thẻ từ khó HK1 + 36 từ “Vốn từ hay” HK2; 11 sơ đồ tư duy (10 bài + 1 tổng); 55 flashcard (6/bài HK1, 5/bài HK2) + 1 bộ tổng ôn; 2 thanh chuyển chế độ xem.
- **14 khối bài đọc + 14 nút "Nghe đọc" + 14 nút "Dừng" + 14 nút gấp/mở** (đếm trên file); thơ kiểm chứng ngắt dòng theo nguồn (Xuân Quỳnh 19 khổ × 4 dòng; ca dao 3 bài; Cửu Long Giang đủ từ "Ngày xưa ta đi học" đến "…ca dao bát ngát…").
- JS: `node --check` đạt cho cả 3 khối script (gồm script nghe đọc mới); http.server: `/nguvan/` trả 200.

## Rà soát khớp hình–nội dung flashcard (2026-10-21)

Đã xem trực tiếp từng tranh và đối chiếu với từng câu hỏi của 30 thẻ. Kết quả: 21 thẻ KHỚP giữ nguyên, 9 thẻ được gán lại hình (chữ thẻ không đổi):

- **SAI rõ (khác văn bản):** thẻ "Theo bài thơ, truyện cổ dạy ta những bài học gì?" (thuộc *Chuyện cổ nước mình*) vốn gán tranh cây tre (của *Cây tre Việt Nam*) → đổi sang tranh gặt lúa quê hương (`lua`).
- **Yếu — dùng emoji dù đã có tranh riêng của văn bản:** thẻ *Chuyện cổ tích về loài người* (🌍 → tranh gia đình sơ khai `cotich`), thẻ *Bức tranh của em gái tôi* (🎨 → tranh em gái vẽ `emgai`), 2 thẻ *Gió lạnh đầu mùa* (🧣 → tranh khoác áo giữa gió lạnh `giolanh`), thẻ *Con chào mào* (🐦 → tranh chào mào trên cành `chaomao`).
- **Yếu — đúng nhân vật nhưng chưa gợi đúng ý hỏi:** thẻ "Tính cách ban đầu của Dế Mèn" → tranh Dế Mèn kiêu căng coi thường Dế Choắt (`kieucang`); thẻ "hậu quả đau lòng" → tranh Dế Mèn bên mộ Dế Choắt (`anhan`).
- **Thiếu tranh:** thẻ "Mẹ sinh ra để làm gì cho trẻ?" → gen mới `fc-sua-me-be.webp` (mẹ bế bồng ru bé, màu nước, 400px, 20KB).

Sau rà soát: cả 30 thẻ đều dùng tranh (không còn thẻ emoji), mọi tranh đều thuộc đúng văn bản của câu hỏi.

## Điểm chưa chắc — cần đối chiếu

1. **Phạm vi giữa kì 1:** phổ biến là hết Bài 2 (đề thi giữa kì trên VietJack cũng đặt sau Bài 2), một số trường lấy sang đầu Bài 3. Trang đã gắn nhãn từng bài để dễ đối chiếu.
2. **Sách trường bé dùng:** module bám KNTT; nếu trường dùng Cánh diều/Chân trời sáng tạo thì danh sách văn bản sẽ khác.
3. **Nguyên văn bài đọc:** 14 khối bài đọc đã lấy từ các nguồn đăng văn bản SGK liệt kê ở mục "Phần bài đọc + Nghe đọc" và đối chiếu chéo; vẫn còn vài điểm nên soát 1 lượt với SGK giấy thật khi tiện: (a) hai đoạn tả bão ở đầu "Cô Tô" ghép từ các trích dẫn SGK rời (có 1 chỗ đánh dấu (…)); (b) một vài từ ở bản điện tử "Dế Mèn" bị lỗi gõ (đã chuẩn hoá theo các bản in phổ biến: "chỉ tổ đem thân", "trên vòm cỏ", "nằm im thin thít"); (c) phần mở đầu "Cô bé bán diêm" — bản in SGK dùng đoạn tóm tắt trong ngoặc đơn, trang giữ đúng dạng đó.
