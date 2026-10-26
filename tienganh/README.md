# Tiếng Anh 6 — Cả năm học (sách Global Success)

Module học + ôn tập Tiếng Anh lớp 6, xây dựng ngày 21/10/2026 theo cấu trúc **từng Unit khép kín**, thiên về kỹ năng và tự diễn đạt (môn tự luận là chính): mục tiêu là trẻ **thấm bài và theo kịp bài trên lớp**, không phải chép đáp án. Chỉ build local; việc push GitHub do người phụ trách soát lại.

> **Dòng chữ đề xuất cho thẻ môn học ở trang chủ** (agent chính thêm sau): `🔤 Tiếng Anh 6 — Cả năm học • 12 Unit Global Success: từ vựng có hình + nghe phát âm, flashcard, luyện tập & 96 câu trắc nghiệm`


## Cập nhật 25/10/2026 — mở rộng cả năm học (HK2)

- Thêm **Unit 7–12** vào trang học theo đúng khung HK1 (hook, lưới từ vựng, 2 thẻ ⚡ Nhớ nhanh, sơ đồ ngữ pháp 4 nhánh, giao tiếp, bài tập A/B, bài viết nhỏ, flashcard của Unit) + cập nhật Tổng kết (12 Unit, bảng ngữ pháp 12 Unit).
- Trắc nghiệm **48 → 96 câu** (8/Unit, id liên tục); `quiz.html` mở rộng `LESSON_NAMES` lên 12 Unit, giữ nguyên khối `PERIODS` và hàm `speak()` en-US, thang khen 4 mức.
- **Gắn ảnh: HK1 35 ảnh + HK2 57 ảnh + 6 ảnh bìa Unit 1–6** vào `cards-data.js` (trường `img`, đồng thời bỏ emoji khi đã có ảnh — đúng quy ước sẵn có), `flashcards.json` (trường `fi`) và `minicards.json` (23/24 thẻ có `fi`; 1 thẻ từ trừu tượng `environment` giữ dạng chữ). 15 từ trừu tượng giữ emoji, không gắn ảnh sai nghĩa. Quiz chỉ gắn `fi` khi `img` tồn tại nên không vỡ ảnh.
- Ảnh bìa Unit 7–12 chưa có — Unit HK2 hiện chưa có ảnh bìa, chỉ có ảnh thẻ từ.
- **Đã đối chiếu 26/10:** trọng âm `motorhome` (nhấn âm tiết 1, theo Collins) và cách viết `hi-tech` (theo SGK Global Success Unit 10) là đúng, giữ nguyên. **Vẫn chưa chắc, cần đối chiếu SGK giấy:** chính tả `recognise` (s) / `recognize` (z) — trang hiện dùng thống nhất `recognise`; các mục ngữ pháp HK2 là tóm tắt do trang tự viết theo chủ đề Unit (không trích nguyên văn SGK); phân kỳ HK1/HK2 theo thứ tự SGK, **chưa xác nhận PPCT** của trường bé.

## Cấu trúc trang học tập (`index.html`)

Mỗi Unit là một khối khép kín theo đúng thứ tự:

1. **Mục tiêu của Unit** ("Học xong Unit này, em nói được…") + ngữ pháp chính.
2. **Từ vựng theo chủ đề** — lưới thẻ từ: mỗi từ có **hình minh họa** (tranh minh họa do AI vẽ hoặc emoji lớn cho từ trừu tượng), **phiên âm IPA**, **nghĩa tiếng Việt**, **1 câu ví dụ đơn giản (A1) có dịch**, và **2 nút nghe 🔊** (nghe từ / nghe câu) đọc bằng `speechSynthesis` của trình duyệt (lang en-US, không cần mạng).
3. **Sơ đồ ngữ pháp** của Unit (sơ đồ tư duy HTML/CSS thuần + khung công thức + hộp "Lỗi hay gặp").
4. **Flashcard từ vựng riêng của Unit** — dùng lại đúng hình của thẻ từ; mặt trước: hình + từ + phiên âm + nút nghe; **mặt sau: nghĩa + ví dụ (không lặp lại hình của mặt trước** — theo chuẩn "hình phía câu hỏi ≠ hình phía đáp án"); Đã thuộc/Chưa thuộc lưu `localStorage` khóa `tienganh_flash_v1`, thẻ chưa thuộc xếp trước.
5. **Luyện tập tự làm** (tự luận là chính): Bài A điền từ (4 câu, tự chấm, sai thì hiện đáp án + gợi ý), Bài B sắp xếp từ thành câu (2 câu, tự chấm), Bài viết nhỏ theo **khung mẫu có chỗ trống** thay thông tin của mình — bài mẫu chỉ mở khi bấm xem, sau khi trẻ đã tự viết.
6. **Hỏi — đáp giao tiếp**: 3–4 cặp hỏi–đáp mẫu của Unit, bấm hiện đáp án, có nút nghe đọc cả câu hỏi và câu trả lời.

**Phần Tổng kết** (cuối trang, là 1 mục riêng): flashcard tổng ôn gộp 73 thẻ → bảng tổng hợp ngữ pháp HK1 dạng 6 thẻ sơ đồ → danh sách chủ đề nói/viết đã học → link sang trắc nghiệm.

**Phần 2 — Trắc nghiệm** (`quiz.html` + `questions.json`): 48 câu, engine 3 chế độ Học tập / Luyện tập / Thi thử clone từ module Lịch sử, đáp án đúng phân bố đều **12A/12B/12C/12D**, mọi câu có explanation tiếng Việt dễ hiểu.

## Hai chế độ hiển thị

- **Theo từng Unit** (MẶC ĐỊNH): chỉ hiện 1 Unit; thanh chip chọn Unit 1–6 + "🏆 Tổng kết" (Tổng kết là mục riêng); nút ⬅ Unit trước / Unit sau ➡; thanh điều khiển có ở **đầu và cuối trang**; lựa chọn lưu `localStorage` khóa `tienganh_view_mode`.
- **Xem tất cả**: hiện liền một mạch cả 6 Unit + Tổng kết; chip bấm để nhảy nhanh tới Unit.

## Responsive (chuẩn bắt buộc)

Mobile-first: dùng tốt ở 375px (điện thoại), 768px (iPad) và desktop. Vùng chạm **≥ 44px** cho mọi nút (nút nghe 🔊, nút lật thẻ, chip chọn Unit, nút kiểm tra, đáp án trắc nghiệm); chữ thân bài **≥ 16px** (ô nhập liệu cũng 16px để iOS không tự phóng to); lưới thẻ từ co giãn (2 cột trên điện thoại → nhiều cột trên màn hình lớn); không tràn ngang.

## Danh sách Unit & đối chiếu chương trình

Đối chiếu mục lục SGK **Tiếng Anh 6 — Global Success** (NXB Giáo dục Việt Nam) qua kế hoạch dạy học HK1 mẫu (hoatieu.vn, theo Công văn 5512) và các trang tổng hợp nội dung SGK (hocfun.com, langgo.edu.vn, globalsuccessfiles.com): HK1 = **Unit 1–6**, mỗi Unit 7 tiết (Getting started → A closer look 1, 2 → Communication → Skills 1, 2 → Looking back & Project). Unit 1–3 thường là phạm vi ôn **giữa kì 1** (đã gắn nhãn trên trang).

| Unit | Chủ đề | Từ vựng trọng tâm trong module | Ngữ pháp chính |
|---|---|---|---|
| 1 | My New School | trường học, môn học, đồ dùng học tập (13 từ) | Hiện tại đơn + trạng từ tần suất |
| 2 | My House | phòng, đồ đạc trong nhà, giới từ nơi chốn (12 từ) | There is/are, giới từ nơi chốn, sở hữu cách 's |
| 3 | My Friends | tính cách, ngoại hình (12 từ) | Hiện tại tiếp diễn (be + V-ing) |
| 4 | My Neighbourhood | địa điểm trong khu phố, chỉ đường (12 từ) | So sánh hơn của tính từ |
| 5 | Natural Wonders of Viet Nam | kì quan thiên nhiên, đồ đi tham quan (12 từ) | So sánh nhất + must/mustn't |
| 6 | Our Tet Holiday | phong tục, hoạt động ngày Tết (12 từ) | should/shouldn't + some/any |
| 7 | Television | chương trình truyền hình (12 từ) | Từ để hỏi + and/but/so |
| 8 | Sports and games | môn thể thao, thi đấu (12 từ) | Quá khứ đơn |
| 9 | Cities of the world | thành phố, địa danh (12 từ) | Hiện tại hoàn thành |
| 10 | Our houses in the future | nhà tương lai (12 từ) | will / might |
| 11 | Our greener world | môi trường, bảo vệ Trái Đất (12 từ) | Câu điều kiện loại 1 |
| 12 | Robots | rô-bốt, khả năng (12 từ) | can / will be able to |

Từ vựng và phiên âm đối chiếu theo danh mục từ vựng SGK tổng hợp tại langgo.edu.vn; nội dung bài học (từ, ví dụ, bài tập) do người biên soạn tự viết theo đúng trọng tâm SGK, **không sao chép bài tập của Duolingo/Quizlet hay của SGK** — chỉ học cơ chế tổ chức (từ kèm hình + nghe + lặp lại ngắt quãng kiểu Duolingo; thẻ hai mặt kiểu Quizlet; chia nhỏ kỹ năng theo chủ đề).

## Số liệu

| Hạng mục | Số lượng |
|---|---|
| Unit | 12 |
| Thẻ từ vựng (= flashcard) | 145 (Unit 1: 13, Unit 2–12: 12/Unit) — 130 thẻ có hình (tranh minh họa do AI vẽ) + 15 thẻ dùng emoji (từ trừu tượng: channel, educational, boring, beautiful, exciting, future, wireless, automatic, hi-tech, environment, reduce, understand, recognise, intelligent, helpful) |
| Cặp hỏi–đáp giao tiếp | 44 (HK1: 20; HK2: 24, mỗi Unit 4) |
| Bài tập điền từ + sắp xếp câu | 72 câu tự chấm (mỗi Unit 4 + 2) + 12 bài viết theo mẫu |
| Câu trắc nghiệm | 96 (8/Unit); phân kỳ thi thử/luyện tập: Giữa HK1 ≤ Unit 3, Cuối HK1 ≤ Unit 6, Giữa HK2 ≤ Unit 9, Cuối HK2 = tất cả (theo thứ tự SGK, chưa xác nhận PPCT) |

## Nguồn ảnh — đã kiểm chứng khớp từ và còn sống

Mọi URL ảnh đều được **curl kiểm chứng HTTP 200 + content-type image** ngày 21/10/2026, và **đối chiếu mô tả file trên Commons** (một số ảnh xem trực tiếp) để chắc chắn ảnh khớp đúng từ vựng. Các ảnh lệch đã bị loại trong quá trình soát: `Central_Park.jpg` (thực ra là tòa nhà chọc trời ở Perth → thay bằng Hyde Park), `Bathroom.jpg` trên Commons (poster quảng cáo đồ vệ sinh Pháp → thay bằng ảnh Pexels), `Kitchen.jpg` trên Commons (bếp tu viện cổ → thay bằng bếp gia đình Pexels), `Backpack.jpg` trên Commons (ảnh đường mòn trong rừng, không có ba lô → thay bằng ảnh Pexels hai em học sinh đeo ba lô đi học — đúng yêu cầu "ba lô học sinh, không phải túi du lịch"), `Red_Square.jpg` (quảng trường thị trấn nhỏ → thay bằng Quảng trường Đỏ Moscow), `Garden.jpg` (không mô tả → thay bằng vườn hoa Keukenhof).

**Wikimedia Commons** (qua `Special:FilePath?width=900`): School building (CC BY-SA 4.0) • Casio fx-991ES Calculator (CC BY-SA 3.0) • Zirkel — com-pa (CC BY-SA 3.0) • Reading room, National Library of Israel (CC BY 3.0) • Living room (CC BY-SA 3.0) • Bedroom (CC BY-SA 3.0) • Keukenhof (CC BY-SA 3.0) • Sofa (CC BY-SA 3.0) • Table lamp (CC BY-SA 4.0) • Fridge (CC BY-SA 3.0) • Hyde Park, London (CC BY-SA 3.0) • Ballarat Railway Station (Public domain) • Red Square, Moscow (Public domain) • Fansipan (CC BY-SA 4.0) • Ha Long Bay (CC BY 2.5) • Waterfall, Scotland (CC BY 2.5) • Beach, Kingsgate (CC BY-SA 3.0) • Postojna Cave (CC BY 2.0) • Forest, Sweden (Public domain) • Sahara, Algeria (CC BY-SA 3.0) • Boat, San Francisco Bay (CC BY-SA 3.0) • Fireworks, Torino (CC BY-SA 3.0) • Peach blossom (CC BY-SA 3.0) • Kumquat (CC BY-SA 3.0) • Banh chung (CC BY 2.0) • Temple of Literature, Hanoi (CC BY-SA 2.0).

**Pexels** (giấy phép Pexels — dùng miễn phí, link CDN images.pexels.com): Kitchen — Jean van der Meulen (photo 1599791) • Bathroom — Max Vakhtbovych (photo 6284228) • Backpack — Thang Nguyen (photo 37098586, hai em học sinh đeo ba lô qua đường — đã xem ảnh trực tiếp để xác nhận).

## Chuẩn font (cho trẻ lớp 6)

Áp dụng cho cả `index.html` và `quiz.html`: font **'Be Vietnam Pro'** (Google Fonts, có preconnect) → fallback Arial.

| Thành phần | Cỡ chữ |
|---|---|
| Thân bài (body) | 18px, line-height 1.7 |
| H2 (tiêu đề Phần) | 25px (mobile 22px) |
| H3 (tiêu đề Unit) | 22px |
| Từ vựng tiếng Anh trên thẻ từ | 20px in đậm (mobile 19px) |
| Phiên âm IPA | 15px |
| Nghĩa tiếng Việt trên thẻ từ | 17px |
| Ví dụ, giải thích, chữ phụ tiếng Việt | 16px |
| Sơ đồ ngữ pháp / công thức | 16–18px |
| Flashcard | ≥ 17px (từ ở mặt trước 24px) |
| Nút bấm, chip chọn Unit | 16px |
| Chú thích nhỏ nhất | 14px, màu #444 trở lên (không cỡ nào dưới 13px; footer 13px) |

## Kiểm tra độ bao phủ & flashcard động (21/10/2026)

**Độ bao phủ:** đối chiếu từng câu trong 48 câu trắc nghiệm với thẻ từ + sơ đồ ngữ pháp + bài tập
điền từ/sắp xếp câu + cặp hỏi–đáp của đúng Unit đó. Kết quả: **48/48 câu kiểm tra đúng kiến thức đã dạy**
(gần như mọi câu đều có "bản sao" trong bài tập tự luyện, ví dụ “She studies English every day”,
“He ___ TV → watches”, “I ___ my homework now → am doing”…). Một điểm chưa trọn vẹn đã xử lý:
câu 3 dùng từ gây nhiễu **“ruler”** (thước kẻ) chưa có thẻ từ — đã **thêm thẻ từ “ruler” 📏 vào Unit 1**
(từ này cũng thuộc nhóm đồ dùng học tập của SGK Unit 1) nên Unit 1 có 13 thẻ, tổng 73 thẻ.
**Không có câu nào lạc chương trình — không đề xuất bỏ câu nào.** `questions.json` không sửa
(md5 giữ nguyên `40de2c024bd03ccb367e45025d116719`, phân bố đáp án 12/12/12/12).

**Flashcard động (áp dụng hạn chế):** bộ từ của 6 Unit gần như không có động từ hành động đứng riêng
(không có thẻ swim/run/fly/cook), nên chỉ **3 thẻ** có emoji động bằng CSS ở mặt trước flashcard —
`active` 🏃 (chạy nhấp nhô), `celebrate` 🎉 (nảy), `wish` 🌠 (sao băng nhấp nháy) — qua bảng `ANIMW`
trong `frontMedia()`. Lưới thẻ từ vựng và mọi thẻ danh từ/tính từ tĩnh giữ nguyên để khỏi rối mắt.
Mặt sau flashcard vốn không có hình (chỉ nghĩa + ví dụ) nên vẫn đúng chuẩn “hình câu hỏi ≠ hình đáp án”.
Đợt này không tạo sơ đồ SVG tĩnh mới nên không phát sinh file trong `img/`.

## Điểm chưa chắc

- **Bộ sách ở trường của bé**: module bám theo **Global Success**. Nếu trường dùng bộ khác (i-Learn Smart World, Friends Global, Explore English…) thì thứ tự Unit và từ vựng sẽ khác — cần báo lại để chỉnh.
- **Tên Unit 5**: hầu hết nguồn tiếng Việt ghi "Natural Wonders of Viet Nam"; một nguồn (hocfun) ghi "Natural wonders of the world". Module dùng "of Viet Nam" theo đa số nguồn và theo nội dung bài (toàn địa danh Việt Nam).
- Đáp án trắc nghiệm và bài mẫu do người biên soạn tự làm, **chưa đối chiếu đáp án chính thức**.
- Nút nghe 🔊 phụ thuộc giọng đọc tiếng Anh có sẵn trên thiết bị của bé (hầu hết điện thoại/máy tính đều có; nếu máy không có giọng en-US, trình duyệt sẽ dùng giọng mặc định gần nhất).

## Địa phương hoá ảnh (21/10/2026)

Toàn bộ 29 ảnh thẻ từ vựng + flashcard trước đây dựng bằng tiền tố URL Wikimedia Commons (biến `CM`) và 3 URL Pexels nay đã **tải về thành file thật** trong thư mục chuyên hình ảnh **`hinh-anh/tienganh/`** ở gốc repo; biến `CM` giờ trỏ vào `../hinh-anh/tienganh/`, tên file = chính từ vựng (vd `backpack.jpg`), 3 ảnh Pexels (kitchen, bathroom, backpack) trỏ thẳng vào file nội bộ. Ghi nguồn đầy đủ vẫn ở mục "Nguồn ảnh" cuối trang. Danh mục file → từ vựng → nguồn gốc: xem `hinh-anh/README.md`. Đã kiểm chứng HTTP 200 cho mọi đường dẫn nội bộ; `questions.json` giữ nguyên md5 `40de2c02…`.

## Rà soát khớp hình–nội dung flashcard/thẻ từ (21/10/2026)

Đã xem trực tiếp toàn bộ 29 ảnh + 44 emoji của 73 thẻ (flashcard dùng chung dữ liệu `WORDS` nên áp cho cả thẻ từ và flashcard). Kết quả: **17 mục sửa**, còn lại khớp.

**Ảnh thật sai/yếu → thay bằng tranh gen AI (400px WebP, 9–31 KB, `hinh-anh/tienganh/sua-*.webp`):**

| Từ | Ảnh trước | Vấn đề | Ảnh sau |
|---|---|---|---|
| beach | beach.jpg | Chỉ là cận cảnh bọt sóng trên cát — trừu tượng, trẻ không nhận ra bãi biển | sua-beach.webp (cát + biển + ô che nắng) |
| boat | boat.jpg | Phà chở khách cỡ lớn — dễ đọc thành "tàu lớn/ship" | sua-boat.webp (thuyền gỗ nhỏ trên mặt nước) |
| kumquat tree | kumquat-tree.jpg | Chỉ chụp QUẢ quất (2 quả + 1 quả bổ đôi), không có cây | sua-kumquat-tree.webp (cây quất trong chậu, đầy quả) |
| lamp | lamp.jpg | Đèn bị khuất gần hết, chủ thể là quyển sách trong bóng tối | sua-lamp.webp (đèn bàn trên bàn học) |
| railway station | railway-station.jpg | Chỉ có mặt tiền tháp đồng hồ, không tàu/sân ga | sua-railway-station.webp (tàu đỏ ở sân ga) |
| waterfall | waterfall.jpg | Dòng suối chảy tràn trên đá thấp — giống suối hơn thác | sua-waterfall.webp (thác đổ từ vách đá cao) |
| peach blossom | peach-blossom.jpg | Cành đào ít hoa, lẫn đồ trang trí đỏ — khó nhận ra hoa đào | sua-peach-blossom.webp (cành hoa đào hồng nở rộ) |

**Emoji sai/yếu → thay bằng tranh gen AI:**

| Từ | Trước | Vấn đề | Sau |
|---|---|---|---|
| pencil case | ✏️ | Chỉ là cây bút chì, không phải HỘP bút | sua-pencil-case.webp |
| uniform | 👕 | Áo thun trơn — không ra đồng phục | sua-uniform.webp (áo trắng + khăn quàng đỏ + quần xanh) |
| wardrobe | 🗄️ | Là tủ hồ sơ văn phòng, không phải tủ quần áo | sua-wardrobe.webp |
| next to | ↔️ | Hai mũi tên rời nhau — không diễn tả "kề bên" | sua-next-to.webp (đèn đứng sát cạnh sô-pha) |
| between | 🎯 | Bia ngắm — sai khái niệm "ở giữa hai vật" | sua-between.webp (bóng đỏ giữa hai thùng) |
| bakery | 🍞 | Chỉ là ổ bánh — không phải TIỆM bánh | sua-bakery.webp (mặt tiền tiệm bánh) |
| narrow | 🛤️ | Đường ray xe lửa — không phải đường hẹp | sua-narrow.webp (ngõ hẹp giữa hai dãy nhà) |
| decorate | 🎀 | Chỉ là chiếc nơ — không thấy hành động trang trí | sua-decorate.webp (gia đình treo đèn lồng trang trí Tết) |
| relative | 👵 | Chỉ một bà cụ — "họ hàng" là nhiều người | sua-relative.webp (đại gia đình nhiều thế hệ) |

**Đổi emoji:** confident 🌟 → 😎 (🌟 trùng ý "ngôi sao" với famous ⭐, gây nhầm).

**Đã thay bằng tranh AI (2026-10-21, lưu đè đúng tên file):** 22 file trước là ảnh chụp (school, calculator, compass — tranh mới vẫn đúng com-pa vẽ hình, library, living room, kitchen, bedroom, bathroom, garden, sofa, fridge, mountain, island, cave, forest, desert, park, square, fireworks, chung cake, temple, backpack) — toàn bộ hình thẻ từ nay là tranh minh họa; giữ nguyên 35 emoji đúng ý (teacher 👩‍🏫, maths 🔢, English 🔤, ruler 📏, playground 🛝, house 🏠, các tính từ Unit 3 trừ confident, cinema 🎬, hospital 🏥, post office 📮, quiet 🤫, noisy 🔊, famous ⭐, suncream 🧴, lucky money 🧧…). Ba mục ở mức "một phần" nhưng chấp nhận được và giữ nguyên: subject 📚, careful 🔍, busy 🏙️, slim 🧍 (emoji chỉ gợi ý tương đối, nghĩa chính do từ + câu ví dụ mang).

16 tranh mới gen theo lưới 2×2 rồi cắt lẻ, phong cách màu nước sách truyện thống nhất, không chữ trong hình. Tự kiểm sau sửa: node --check đạt, đủ 73 thẻ từ, 38/38 đường dẫn hình trả 200. Các file ảnh cũ bị thay (beach.jpg, boat.jpg, kumquat-tree.jpg, lamp.jpg, railway-station.jpg, waterfall.jpg, peach-blossom.jpg) vẫn còn trong `hinh-anh/tienganh/` nhưng không còn trang nào tham chiếu.
