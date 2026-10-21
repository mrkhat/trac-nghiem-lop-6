# Lịch sử 6 — Học kì 1 (sách Kết nối tri thức với cuộc sống)

Module học + ôn tập Lịch sử lớp 6, xây dựng lại ngày 21/10/2026 theo cấu trúc **từng bài khép kín** và mở rộng ra **cả học kì 1**. Đợt sửa cùng ngày (sau khi user xem bản live): soát lại toàn bộ ảnh, sửa trùng hình câu hỏi–đáp án ở flashcard, thêm **2 chế độ hiển thị**, áp **chuẩn font mới + responsive**, kiểm tra **độ bao phủ 71 câu trắc nghiệm** và thêm **hiệu ứng động cho flashcard quá trình**. Chỉ build local; việc push GitHub do người phụ trách soát lại.

## Cấu trúc trang học tập (`index.html`)

**Phần 1 — Học tập:** 10 bài, mỗi bài là một khối khép kín theo đúng thứ tự:

1. Nội dung bài sinh động: câu mở đầu kiểu kể chuyện, 2–3 hình minh họa thật có chú thích gợi nhớ, mốc/tên quan trọng in đậm + highlight màu theo chương.
2. Hộp **Mẹo nhớ** + hộp **Bí mật thú vị** + **Mốc cần nhớ**. Một số bài có thêm hộp **➕ Kiến thức bổ sung** (kiến thức ngoài cốt lõi SGK nhưng cần để làm được câu trắc nghiệm — xem mục Kiểm tra độ bao phủ).
3. **Sơ đồ tư duy của bài** (HTML/CSS thuần, màu theo chương).
4. **Câu hỏi gợi nhớ riêng của bài** (3–5 câu, bấm vào mới hiện đáp án, mỗi bài có ít nhất 1 câu hỏi dựa trên hình).
5. **Flashcard riêng của bài** (4–6 thẻ, 100% thẻ có hình gợi nhớ ở mặt câu hỏi; đánh dấu đã thuộc/chưa thuộc lưu `localStorage` khóa `lichsu_flash_v2`, thẻ chưa thuộc được ưu tiên xếp trước).
6. Thanh chuyển tiếp sang bài tiếp theo.

**Phần Tổng kết** (sau Bài 10, là một mục riêng trong thanh chọn bài): sơ đồ tư duy tổng toàn học kì → dòng thời gian 10 sự kiện (mỗi sự kiện có hình) → trò chơi sắp xếp sự kiện → bộ flashcard **tổng ôn** gộp cả 48 thẻ → thẻ link sang phần trắc nghiệm.

**Phần 2 — Trắc nghiệm** (`quiz.html` + `questions.json`): 71 câu, 3 chế độ Học tập / Luyện tập / Thi thử (giữ nguyên engine cũ; `questions.json` không sửa trong đợt này).

## 2 chế độ hiển thị (thêm 21/10/2026)

- **📄 Từng bài — MẶC ĐỊNH khi mở trang:** chỉ hiển thị đúng 1 khối tại một thời điểm. Thanh chọn bài (chip **Bài 1 … Bài 10** + chip riêng **🏁 Tổng kết**) và nút **⬅ Bài trước / Bài sau ➡** nằm trong thanh điều khiển dính ở đầu trang; chuyển bài là cuộn lên đầu trang. Nút "Sang bài tiếp theo ➡" ở cuối mỗi bài cũng chuyển đúng bài kế tiếp trong chế độ này.
- **📚 Xem tất cả:** hiển thị toàn bộ 10 bài + Tổng kết nối tiếp như trước.
- Hàng nút chuyển chế độ đặt ở **đầu trang và lặp lại ở cuối trang**. Lựa chọn được lưu `localStorage` khóa **`lichsu_view_mode`** (giá trị `single`/`all`); mở bằng liên kết có `#baiN`/`#tongket` thì chế độ Từng bài mở đúng mục đó. Trạng thái flashcard (`lichsu_flash_v2`) hoàn toàn không bị ảnh hưởng.

## Hình câu hỏi ≠ hình đáp án

- **Flashcard:** mặt đáp án **không còn lặp lại ảnh của mặt câu hỏi** nữa — mặt sau chỉ còn nhãn "✅ Đáp án" + chữ đáp án lớn (19px, đậm) để bé tập trung đọc. Mặt trước giữ ảnh gợi nhớ.
- **Câu hỏi gợi nhớ:** phần đáp án vốn không chứa ảnh (chỉ chữ) — giữ nguyên, không trùng ảnh.

## Flashcard có yếu tố động (thêm 21/10/2026)

Chọn lọc theo nội dung thẻ: thẻ về **quá trình/chuyển động** có animation CSS ở mặt câu hỏi; thẻ hiện vật tĩnh giữ ảnh thường. Mặt đáp án luôn tĩnh. Có tôn trọng `prefers-reduced-motion` (tắt animation nếu hệ thống yêu cầu).

| Thẻ | Hiệu ứng | Cách làm |
|---|---|---|
| "Xếp đúng thứ tự 4 chặng tiến hóa" (Bài 3) | 4 ảnh tiến hóa **sáng lên lần lượt từng chặng** theo vòng lặp | Dải 4 ảnh `evo1–evo4`, keyframes `stageSeq` lệch nhịp 1,2s/chặng |
| "Tư liệu truyền miệng…" (Bài 1, ảnh lửa trại) | Ngọn lửa **bập bùng** (sáng/tối nhấp nháy) | Keyframes `flick` đổi brightness/saturate trên ảnh lửa trại thật |
| "Lịch sử là gì?", "Trống đồng, rìu đá…" (Bài 1, trống đồng) | Zoom chậm kiểu Ken Burns (gợi quá trình đúc/chi tiết trống) | Keyframes `kb` scale 1 → 1,16 |
| "Người tối cổ xuất hiện ở đâu…" (evo1), "Người đứng thẳng… dùng lửa" (evo3) | Zoom chậm Ken Burns | Keyframes `kb` |
| "Làm chung – hưởng chung" + "Chế độ phụ hệ…" (ảnh ruộng bậc thang) | Pan/zoom chậm qua ruộng bậc thang (gợi cảnh làm ruộng) | Keyframes `kb` |

Tổng: **8/48 thẻ có chuyển động**, 40 thẻ tĩnh (hiện vật: rìu đá, bia tiến sĩ, đồng hồ cát…). Không dùng GIF ngoài — animation CSS trực tiếp trên ảnh thật cho nhẹ và không phụ thuộc nguồn ngoài.

## Chuẩn font + responsive (áp 21/10/2026)

- Font **Be Vietnam Pro** (Google Fonts, weight 400/500/600/700), fallback Arial. Chữ chính màu **#1f2937** trên nền trắng.
- Thân bài **18px / line-height 1,7**; chữ phụ, giải thích, đáp án **≥16px**; chú thích ảnh/ghi nguồn **≥14px, màu #444 trở lên**; không còn cỡ nào dưới 13px (13,5px chỉ dùng cho nhãn huy hiệu trang trí); tiêu đề bài **24–25px**; sơ đồ tư duy **≥14–17px**; mặt flashcard **18px** (đáp án 19px); nút/chip **16px**.
- Responsive mobile-first: vùng chạm nút/chip **≥44px** (nút Trước/Sau 48px, câu hỏi gợi nhớ 48px); ảnh và sơ đồ co giãn `max-width:100%`, không tràn ngang; dưới 640px: thư viện ảnh xếp 1 cột, dải tiến hóa 2 cột, chip chọn bài 3 cột, tiêu đề thu nhỏ.

## Danh sách bài và đối chiếu SGK

Đối chiếu mục lục phần Lịch sử, SGK "Lịch sử và Địa lí 6" — Kết nối tri thức, và phân phối chương trình (PPCT) mẫu phổ biến:

| Bài trong module | Nội dung | Bài tương ứng trong SGK | Nhãn phạm vi trên trang |
|---|---|---|---|
| Bài 1 | Lịch sử là gì? Vì sao cần học lịch sử? | Bài 1 + Bài 2 (Lịch sử và cuộc sống; Dựa vào đâu để biết và phục dựng lại quá khứ) | ⭐ Ôn giữa kì 1 |
| Bài 2 | Cách tính thời gian trong lịch sử | Bài 3 (Thời gian trong lịch sử) | ⭐ Ôn giữa kì 1 |
| Bài 3 | Nguồn gốc loài người (có dải tiến hóa 4 chặng bằng hình + ảnh so sánh hộp sọ) | Bài 4 | ⭐ Ôn giữa kì 1 |
| Bài 4 | Xã hội nguyên thủy | Bài 5 | ⭐ Ôn giữa kì 1 |
| Bài 5 | Sự chuyển biến và phân hóa của xã hội nguyên thủy | Bài 6 | ⭐ Ôn giữa kì 1 |
| Bài 6 | Ai Cập và Lưỡng Hà cổ đại | Bài 7 | ⭐ Ôn giữa kì 1 |
| Bài 7 | Ấn Độ cổ đại | Bài 8 | 📚 Sau giữa kì 1 |
| Bài 8 | Trung Quốc từ thời cổ đại đến thế kỉ VII | Bài 9 | 🚀 Sau giữa kì • Mở rộng HK1 |
| Bài 9 | Hy Lạp và La Mã cổ đại | Bài 10 | 🚀 Sau giữa kì • Mở rộng HK1 |
| Bài 10 | Đông Nam Á từ đầu Công nguyên đến thế kỉ X | Bài 11–13 (gộp) | 🚀 Sau giữa kì • Mở rộng HK1 |

**Nguồn đã tra cứu (Bước 0):** mục lục/đáp án SGK KNTT trên tech12h; danh mục giáo án KNTT trên kenhgiaovien; PPCT mẫu theo Công văn 5512 trên download.vn và bloghoctap.

**⚠️ Điểm chưa thống nhất giữa các nguồn (ghi rõ để đối chiếu trường của bé):** theo PPCT mẫu phổ biến, phần Lịch sử HK1 gồm SGK Bài 1–8 và bài kiểm tra giữa kì đặt **sau Bài 6**; SGK Bài 7 (Ai Cập – Lưỡng Hà) trong mẫu đó nằm **sau** giữa kì. Tuy nhiên module giữ Bài 6 (Ai Cập – Lưỡng Hà) ở nhóm "Ôn giữa kì 1" theo phạm vi bản v1 đã được chấp nhận trước đó. Tương tự, SGK Bài 9–13 trong PPCT mẫu thường rơi vào đầu HK2 — module vẫn đưa vào với nhãn "Mở rộng học kì 1" theo yêu cầu mở rộng cả học kì của người dùng. Các nhãn trên từng bài giúp ẩn/bớt nhanh nếu trường của bé cắt khác.

## Số liệu

| Hạng mục | Bản cũ (GHK1) | Bản mới (HK1) |
|---|---|---|
| Bài học | 5 | 10 |
| Câu hỏi gợi nhớ trong bài | 0 | 42 (Bài 1–10 lần lượt: 4, 4, 5, 4, 4, 4, 4, 5, 4, 4) |
| Flashcard | 16 (chữ trơn, khóa `lichsu_flash_v1`) | 48 (100% có hình ở mặt câu hỏi, khóa `lichsu_flash_v2`) — theo bài: 5, 4, 6, 5, 4, 5, 5, 5, 5, 4 |
| Câu trắc nghiệm | 36 | 71 (id 1–36 giữ nguyên nội dung; thêm 35 câu cho 5 bài mới, mỗi bài 7 câu) |
| Phân bố đáp án toàn ngân hàng | 9A/9B/9C/9D | 18A/18B/18C/17D |
| Ảnh minh họa | 8 | 33 (32 ảnh Wikimedia Commons + 1 ảnh The Met Open Access; + 2 sơ đồ SVG tự vẽ ở Bài 2, có ghi chú "không theo tỉ lệ") |
| Sơ đồ tư duy | 0 | 11 (mỗi bài 1 + 1 sơ đồ tổng) |
| Sự kiện dòng thời gian | 6 | 10 (mỗi sự kiện có hình) |

## Soát ảnh đợt 21/10/2026 (toàn bộ 33 ảnh)

Từng ảnh đã được tải về và **xem trực tiếp** để đối chiếu với chú thích/ngữ cảnh (trang mô tả file trên Commons bị chặn 403 với công cụ đọc trang nên dùng cách tải ảnh về xem + tra cứu mô tả qua tìm kiếm). Kết quả: **giữ nguyên 30 ảnh, thay 3 ảnh**:

| Ảnh | Quyết định | Lý do / ảnh mới |
|---|---|---|
| `evo1` — Australopithecus afarensis reconstruction.JPG | **THAY** → `NHM - Australopithecus afarensis Modell 1.jpg` | Ảnh cũ thực chất chỉ là **một hộp sọ phục dựng** (mào xương, gò má to), lệch hẳn 3 chặng còn lại trong dải tiến hóa và không thể hiện được "đi thẳng bằng 2 chân". Ảnh mới: **mô hình toàn thân đứng thẳng** của A. afarensis tại Bảo tàng Lịch sử Tự nhiên Vienna — cùng bộ ảnh với ảnh Homo sapiens đang dùng (CC BY-SA 4.0). |
| `map` — Ancient Egypt and Mesopotamia c. 1450 BC **af**.png | **THAY** → `Ancient Egypt and Mesopotamia c. 1450 BC.png` | Ảnh cũ là cùng bản đồ nhưng **chữ chú thích tiếng Afrikaans** ("Antieke Egipte…", "Hettiete Ryk") — trẻ Việt không đọc được. Ảnh mới: bản gốc **tiếng Anh** (EGYPT / BABYLONIA / ASSYRIA / HITTITE EMPIRE), tác giả Svift, **Public domain**. |
| `hieroglyphs` — Agilkia Esmet-Achom 02.jpg | **THAY** → The Met Open Access, object 550793 "Donation Stela of Osorkon I" (khoảng 930 TCN) | Ảnh cũ là **graffito của Esmet-Akhom (năm 394 sau CN)** — hình người vẽ thô, chữ khắc mờ nhỏ, trẻ không nhận ra "chữ tượng hình". Ảnh mới: **bia đá Ai Cập phủ kín nhiều hàng chữ tượng hình rõ nét**, ảnh trực tiếp `images.metmuseum.org/CRDImages/eg/web-large/DP-12500-003.jpg`, **CC0**. Chú thích dưới ảnh đã sửa theo ("bia đá khắc chữ tượng hình"). |
| `discobolus` — Discobolus The Discus Thrower.jpg | GIỮ (ghi chú) | Ảnh là tượng vận động viên **đang cầm đĩa đứng**, không phải tư thế ném đĩa nổi tiếng của Myron. Đã dò 6 tên file ứng viên tư thế Myron trên Commons — tất cả 404, không có ảnh thay đã kiểm chứng nên giữ; nội dung vẫn đúng chủ đề thể thao Hy Lạp. |
| `sandclock` — Sand Clock.jpg | GIỮ (ghi chú) | Đồng hồ cát nhựa hiện đại màu vàng — đúng nội dung chú thích, trẻ nhận ra ngay. Ứng viên cổ hơn ở The Met là ảnh đen trắng thế kỉ XVIII, khó đọc hơn cho trẻ nên không thay. |
| 28 ảnh còn lại (trống đồng, bia tiến sĩ, đồng hồ mặt trời, evo2–evo4, hộp sọ, Lascaux, rìu tay, Altamira, rìu mài, dao găm đồng, ruộng bậc thang, lửa trại, kim tự tháp, ziggurat, Hammurabi, Mohenjo-daro, sông Hằng, tượng Phật, giáp cốt, Vạn Lí Trường Thành, đội quân đất nung, Parthenon, Colosseum, hạt chuỗi Óc Eo, Mỹ Sơn, Angkor) | GIỮ | Đã xem từng ảnh: đều chụp/vẽ đúng đối tượng mà chú thích nói tới. |

## Bảng nguồn ảnh

32 ảnh qua URL `https://commons.wikimedia.org/wiki/Special:FilePath/<file>?width=900` và 1 ảnh qua URL ảnh trực tiếp của The Met; tất cả đã kiểm chứng bằng curl (HTTP 200 + content-type image). Khái niệm trừu tượng không có ảnh phù hợp (đơn vị thời gian, trục TCN/CN ở Bài 2) được vẽ bằng SVG ngay trong trang, bám sát nội dung SGK. Thư mục `img/` giữ bản tải về của các ảnh bản v1 để dự phòng.

| # | File / nguồn | Giấy phép | Dùng ở |
|---|---|---|---|
| 1 | Dong Son Drum, Bronze, Vietnam or China, 2nd–1st c BC, temp Prague Kinsky, NG Vu 517, 142199.jpg | CC BY-SA 3.0 | Bài 1, thẻ 0/2 |
| 2 | BiaTienSi1442.jpg | CC BY-SA 3.0 | Bài 1, thẻ 1/3 |
| 3 | Sand Clock.jpg | CC BY-SA 3.0 | Bài 2, thẻ 5/7 |
| 4 | Sundial Lannion Brittany France.JPG | CC BY-SA 3.0 | Bài 2, thẻ 6/8 |
| 5 | **NHM - Australopithecus afarensis Modell 1.jpg** (thay 21/10/2026) | CC BY-SA 4.0 | Bài 3 (dải tiến hóa), timeline, thẻ 10 |
| 6 | Homo habilis - forensic facial reconstruction.png | CC BY-SA 4.0 | Bài 3 (dải tiến hóa), thẻ 11 |
| 7 | Homo erectus reconstruction, Natural History Museum, London.jpg | CC BY-SA 2.0 | Bài 3 (dải tiến hóa), thẻ 12 |
| 8 | NHM - Homo sapiens Modell 1.jpg | CC BY-SA 4.0 | Bài 3 (dải tiến hóa), thẻ 13 |
| 9 | Skulls of our Ancestors.jpg | CC BY-SA 2.0 | Bài 3 (so sánh hộp sọ), thẻ 9 |
| 10 | Acheulean handaxe found in southern England - 55465763081.jpg | CC BY 4.0 | Bài 3, thẻ 14 |
| 11 | Altamira, bison.jpg | Public Domain | Bài 4, thẻ 15/17 |
| 12 | Lascaux painting.jpg | Public Domain | Bài 4, thẻ 19 |
| 13 | Neolithic, Polished Stone Axe (FindID 468960).jpg | CC BY-SA 2.0 | Bài 4, timeline, thẻ 18 |
| 14 | Rice terraces, Bali.jpg | CC BY 4.0 | Bài 4–5, thẻ 16/22 |
| 15 | Bronze Age dagger.jpg | Public Domain | Bài 5, thẻ 20/21/23 |
| 16 | Giza pyramids sandstorm.jpg | CC0 | Bài 6, timeline, thẻ 24/25 |
| 17 | **The Met Open Access — Donation Stela of Osorkon I, object 550793** (thay 21/10/2026) | CC0 | Bài 6, thẻ 26 |
| 18 | **Ancient Egypt and Mesopotamia c. 1450 BC.png** (thay 21/10/2026) | Public domain | Bài 6, thẻ 27 |
| 19 | Ancient ziggurat at Ali Air Base Iraq 2005.jpg | CC BY 3.0 | Bài 6 |
| 20 | Code of Hammurabi (Louvre Sb 8)-31434550325.jpg | CC BY 2.0 | Timeline, thẻ 28 |
| 21 | Varanasi, India, Ghats on Ganges River.jpg | CC BY 4.0 | Bài 7, thẻ 29 |
| 22 | Mohenjo-daro.jpg | CC BY-SA 3.0 | Bài 7, thẻ 30/32/33 |
| 23 | Standing Buddha Gandhara. Musée des arts asiatiques Guimet.jpg | Public Domain | Bài 7, timeline, thẻ 31 |
| 24 | Badaling China Great-Wall-of-China-01.jpg | CC BY-SA 3.0 | Bài 8, thẻ 34/36/38 |
| 25 | 51714-Terracota-Army.jpg | CC BY 2.0 | Bài 8, timeline, thẻ 35 |
| 26 | Oracle bone from the Couling-Chalfant collection.jpg | CC0 | Bài 8, thẻ 37 |
| 27 | Acropolis Parthenon Athens Greece.jpg | CC0 | Bài 9, thẻ 40/41/43 |
| 28 | Discobolus The Discus Thrower.jpg | CC BY 3.0 | Bài 9, timeline, thẻ 39 |
| 29 | Colosseum in Rome, Italy - April 2007.jpg | CC BY-SA 2.5 | Bài 9, thẻ 42 |
| 30 | Angkor Wat with its reflection (cropped).jpg | CC BY-SA 4.0 | Bài 10, thẻ 47 |
| 31 | My Son Sanctuary Vietnam 06.jpg | CC BY 4.0 | Bài 10, thẻ 46 |
| 32 | Oc Eo Culture Beads.jpg | CC0 | Bài 10, timeline, thẻ 44/45 |
| 33 | Campfire flames.jpg | Public Domain | Timeline (mốc biết dùng lửa), thẻ 4 |

## Kiểm tra độ bao phủ trắc nghiệm (21/10/2026)

Đối chiếu từng câu trong 71 câu `questions.json` với kiến thức đã dạy trong 10 bài học:

- **Trước đợt sửa: 68/71 câu** được bao phủ hoàn toàn bởi nội dung bài học. 3 câu đòi kiến thức bài chưa dạy: câu 6, câu 15 (kéo theo câu 11), câu 64.
- **Sau đợt sửa: 71/71 câu** — đã bổ sung 3 hộp **"➕ Kiến thức bổ sung — biết thêm để làm được bài tập"** (khung xanh đứt nét, tách bạch với cốt lõi SGK, số liệu khớp đáp án):

| Bài | Hộp bổ sung | Phục vụ câu |
|---|---|---|
| Bài 1 | Cách **tìm hiểu lịch sử**: đọc sách lịch sử, tham quan bảo tàng/di tích, nghe người già kể | Câu 6 |
| Bài 2 | **Năm 1 Công nguyên = năm Chúa Giê-su ra đời** (mốc chia TCN/CN); **thế kỉ I = năm 1–100** | Câu 15, câu 11 |
| Bài 9 | Di sản La Mã: **bảng chữ cái Latinh** còn dùng đến nay, chữ Quốc ngữ của Việt Nam cũng dựa trên chữ Latinh | Câu 64 |

Nguyên tắc áp dụng: cốt lõi SGK học trước, phần bổ sung để sau và tách bạch rõ; không sửa `questions.json`.

## Chuẩn nội dung đã áp dụng

- Đối tượng: trẻ lớp 6, trình độ không đều — câu ngắn, một ý một dòng, thuật ngữ khó giải thích ngay bằng lời thường.
- Mỗi ý quan trọng được lặp qua nhiều kênh: hình → sơ đồ tư duy → mẹo nhớ → flashcard có hình → câu hỏi gợi nhớ.
- Bài học bao phủ 100% kiến thức mà câu trắc nghiệm kiểm tra (xem mục Kiểm tra độ bao phủ).
- Sơ đồ tự vẽ có ghi chú "hình minh họa, không theo tỉ lệ" khi không đúng tỉ lệ thật.
- Đáp án trắc nghiệm do người biên soạn tự làm, **chưa đối chiếu đáp án chính thức**.
