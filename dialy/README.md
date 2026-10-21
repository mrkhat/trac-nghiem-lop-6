# Địa lí 6 — Học kì 1 (module `dialy/`)

Trang học Địa lí 6 cho web trắc nghiệm lớp 6, theo cấu trúc **từng bài khép kín**:
nội dung bài (hình ảnh + điểm cần nhớ + mẹo nhớ) → **sơ đồ tư duy của bài** → câu hỏi gợi nhớ riêng →
flashcard riêng của bài (100% có hình, lưu Đã thuộc/Chưa thuộc ở `localStorage` khoá `dialy_flash_v1`) →
chuyển bài sau. Học hết 24 bài mới tới **Tổng kết** (sơ đồ tư duy tổng HK1 + flashcard tổng ôn + link trắc nghiệm).

## Hai chế độ hiển thị
- **Từng bài** (mặc định): chỉ hiện 1 bài; có thanh chip chọn bài (Mở đầu, B1…B23, Tổng kết) và nút Trước/Sau ở đầu trang.
- **Xem tất cả**: hiện toàn bộ trang như một cuốn sách.
- Nút chuyển chế độ ở đầu trang và cuối trang; lựa chọn lưu ở `localStorage` khoá `dialy_view_mode`.

## Cấu trúc thư mục
- `index.html` — trang học (Phần 1).
- `quiz.html` — Phần 2: trắc nghiệm, dùng chung engine 3 chế độ (Học tập / Luyện tập / Thi thử 20 câu) với module Lịch sử.
- `questions.json` — 168 câu trắc nghiệm (7 câu/bài × 24 bài), phân bố đáp án đúng gần đều A/B/C/D.
- `README.md` — tài liệu này.

## Danh sách bài (theo phân phối chương trình Địa lí 6 — Kết nối tri thức)

| Bài | Tên bài | Chương | Phạm vi |
|---|---|---|---|
| Bài mở đầu | Tại sao cần học Địa lí? | Bài mở đầu | Ôn giữa kì 1 |
| Bài 1 | Hệ thống kinh, vĩ tuyến. Tọa độ địa lí | Chương 1 | Ôn giữa kì 1 |
| Bài 2 | Bản đồ. Một số lưới kinh, vĩ tuyến. Phương hướng trên bản đồ | Chương 1 | Ôn giữa kì 1 |
| Bài 3 | Tỉ lệ bản đồ. Tính khoảng cách thực tế dựa vào tỉ lệ bản đồ | Chương 1 | Ôn giữa kì 1 |
| Bài 4 | Kí hiệu và bảng chú giải bản đồ. Tìm đường đi trên bản đồ | Chương 1 | Ôn giữa kì 1 |
| Bài 5 | Lược đồ trí nhớ | Chương 1 | Ôn giữa kì 1 |
| Bài 6 | Trái Đất trong hệ Mặt Trời | Chương 2 | Ôn giữa kì 1 |
| Bài 7 | Chuyển động tự quay quanh trục của Trái Đất và hệ quả | Chương 2 | Ôn giữa kì 1 |
| Bài 8 | Chuyển động của Trái Đất quanh Mặt Trời và hệ quả | Chương 2 | Ôn giữa kì 1 |
| Bài 9 | Xác định phương hướng ngoài thực tế | Chương 2 | Ôn giữa kì 1 |
| Bài 10 | Cấu tạo của Trái Đất. Các mảng kiến tạo | Chương 3 | Ôn giữa kì 1 |
| Bài 11 | Quá trình nội sinh và quá trình ngoại sinh. Hiện tượng tạo núi | Chương 3 | Ôn giữa kì 1 |
| Bài 12 | Núi lửa và động đất | Chương 3 | Ôn giữa kì 1 |
| Bài 13 | Các dạng địa hình chính trên Trái Đất. Khoáng sản | Chương 3 | Ôn giữa kì 1 |
| Bài 14 | Thực hành: Đọc lược đồ địa hình tỉ lệ lớn và lát cắt địa hình đơn giản | Chương 3 | Sau giữa kì |
| Bài 15 | Lớp vỏ khí của Trái Đất. Khí áp và gió | Chương 4 | Sau giữa kì |
| Bài 16 | Nhiệt độ không khí. Mây và mưa | Chương 4 | Sau giữa kì |
| Bài 17 | Thời tiết và khí hậu. Biến đổi khí hậu | Chương 4 | Sau giữa kì |
| Bài 18 | Thực hành: Phân tích biểu đồ nhiệt độ, lượng mưa | Chương 4 | Sau giữa kì |
| Bài 19 | Thủy quyển và vòng tuần hoàn lớn của nước | Chương 5 | Sau giữa kì |
| Bài 20 | Sông và hồ. Nước ngầm và băng hà | Chương 5 | Sau giữa kì |
| Bài 21 | Biển và đại dương | Chương 5 | Sau giữa kì |
| Bài 22 | Lớp đất trên Trái Đất | Chương 6 | Sau giữa kì |
| Bài 23 | Sự sống trên Trái Đất | Chương 6 | Sau giữa kì |

Tổng: **24 bài** (Bài mở đầu + Bài 1–23), **96 câu hỏi gợi nhớ**, **120 flashcard**, **168 câu trắc nghiệm**.

## Nguồn đối chiếu giáo trình (Bước 0)
- Phân phối chương trình Địa lí 6 sách Kết nối tri thức — hoatieu.vn:
  https://hoatieu.vn/phan-phoi-chuong-trinh-mon-dia-li-6-sach-ket-noi-tri-thuc-voi-cuoc-song-208901
  (HK1: Bài mở đầu + Bài 1–23, 36 tiết ở mẫu 2 tiết/tuần; ôn tập giữa kì ở tiết 18 → phần Ôn giữa kì 1 = Mở đầu + Bài 1–13; Bài 14–23 học sau giữa kì.)
- Phụ lục kế hoạch giáo dục Địa lí 6 KNTT (bản tải từ download.vn/hoatieu) dùng để kiểm chứng thứ tự bài và mốc giữa kì.
- ⚠️ **Điểm chưa chắc**: phân phối chương trình thực tế khác nhau theo trường (có trường dạy 27 tiết/HK1, trường kiểm tra giữa kì sớm hơn). Cần đối chiếu lại với PPCT của trường bé đang học; các bài đã gắn nhãn "Ôn giữa kì 1" / "Sau giữa kì" để dễ ẩn/bớt khi cần.

## Tương tác & sơ đồ động (tự vẽ, bám SGK)
- **Bài 6**: mô hình **3D Three.js** (CDN cdnjs r128) — Trái Đất tự quay + chuyển động quanh Mặt Trời, trục nghiêng 23,5°, nút "Tạm dừng / Xem ngày-đêm / Tới vị trí Hạ chí / Xem toàn cảnh", kéo để xoay góc nhìn. Texture bề mặt: ảnh Blue Marble `Land ocean ice 2048.jpg` (NASA, CC BY-SA 3.0) qua Wikimedia — đã kiểm tra `upload.wikimedia.org` trả `Access-Control-Allow-Origin: *`. **Fallback bắt buộc**: nếu CDN/texture/WebGL lỗi → hiện sơ đồ 2D hệ Mặt Trời của NASA thay thế, không để trắng trang. Kèm tương tác **8 pha Mặt Trăng** (bấm từng pha).
- **Bài 7**: sơ đồ động Canvas — Trái Đất tự quay Tây → Đông, nửa sáng/nửa tối cố định theo hướng Mặt Trời, chấm Việt Nam chạy qua vùng sáng/tối kèm thông báo ngày/đêm theo thời gian thực.
- **Bài 8**: sơ đồ SVG quỹ đạo tương tác — 4 vị trí Xuân phân (21/3) / Hạ chí (22/6) / Thu phân (23/9) / Đông chí (22/12), trục luôn song song nghiêng 23,5°; bấm từng vị trí hiện mùa + ngày dài/đêm ngắn ở hai bán cầu.
- Sơ đồ SVG tự vẽ khác: Bài 5 (lược đồ trí nhớ đường đi học), Bài 14 (lát cắt địa hình A–B), Bài 15 (các tầng khí quyển, nhãn tiếng Việt), Tổng kết (sơ đồ tư duy tổng 6 chương).
- Mọi sơ đồ không đúng tỉ lệ thật đều ghi chú "hình minh họa, không theo tỉ lệ".

## Sơ đồ tư duy
**Tất cả 24/24 bài** đều có 1 sơ đồ tư duy riêng (đặt sau nội dung bài, trước câu hỏi gợi nhớ),
trung tâm là tên bài, các nhánh thể hiện quan hệ nhân–quả bằng dấu "→" (chuyển động → hệ quả, nội sinh → tạo núi…).
Phần Tổng kết có thêm **1 sơ đồ tư duy tổng toàn HK1** theo 6 chương.

## Câu hỏi gợi nhớ & hình ảnh
- Hình ở phía câu hỏi (trong nội dung bài/sơ đồ) và đáp án KHÔNG lặp hình: đáp án câu hỏi gợi nhớ chỉ có chữ, buộc người học tự nhớ lại hình đã xem.
- Mọi ảnh đều qua `https://commons.wikimedia.org/wiki/Special:FilePath/<file>?width=900`, đã **curl kiểm chứng 200 + content-type image**,
  và đã **đối chiếu trang mô tả file trên Commons** để chú thích khớp đúng nội dung ảnh (đã loại 1 ảnh hoa hướng chữ Macedonia không khớp, sửa các chú thích ảnh lệch).
- Một số tác phẩm của NASA/NOAA/USGS (public domain) được lấy qua Wikimedia để giữ một cơ chế link + ghi nguồn thống nhất.

## Kiểm tra độ bao phủ kiến thức (21/10/2026)

Đối chiếu từng câu trong 168 câu trắc nghiệm với kiến thức đã dạy trong đúng bài của nó
(nội dung chính + Điểm cần nhớ + sơ đồ tư duy + câu hỏi gợi nhớ + flashcard):

- **Trước đợt bổ sung: 162/168 câu (≈96%)** — 6 câu đòi kiến thức bài học chưa dạy kĩ.
- Đã bổ sung 5 hộp **“➕ Kiến thức bổ sung — biết thêm để làm được bài tập”**
  (viền đứt nét màu cam, đặt sau Mẹo nhớ của bài, tách bạch với cốt lõi SGK):

| Bài | Kiến thức đã bổ sung | Phục vụ câu |
|---|---|---|
| Bài 12 | Nguyên tắc an toàn khi động đất: bảo vệ đầu, ra nơi trống trải, tránh xa nhà cao, không dùng thang máy | Q91 |
| Bài 13 | Hai đồng bằng lớn của Việt Nam: sông Hồng và sông Cửu Long (nguồn gốc phù sa, vựa lúa) | Q98 |
| Bài 14 | Định nghĩa **khoảng cao đều** + ví dụ chênh 50 m | Q104 |
| Bài 15 | Dụng cụ đo khí áp: khí áp kế (phong vũ biểu), đơn vị hPa; hướng thổi cố định của Tín phong / Tây ôn đới / Đông cực | Q110, Q112 |
| Bài 16 | Cơ chế biển điều hòa nhiệt độ (nước biển nóng lên và nguội chậm hơn đất liền) | Q118 |

- **Sau bổ sung: 168/168 câu (100%)** — mọi câu đều có kiến thức tương ứng đã dạy trong bài.
  `questions.json` không hề sửa (md5 giữ nguyên `9414cdeae1da045fadc6febb3950a89b`, phân bố đáp án 42/42/42/42).

## Flashcard động ở mặt câu hỏi (21/10/2026)

Chọn lọc **17/120 thẻ** thuộc nhóm quá trình/chuyển động: mặt hỏi hiện **SVG động vẽ inline**
(SMIL, nhẹ, không cần file ngoài) làm hình gợi mở; khi lật sang mặt đáp án, thẻ trở lại
**ảnh tĩnh vốn có** — đúng chuẩn “hình câu hỏi ≠ hình đáp án”. Thẻ hiện vật/địa danh tĩnh giữ nguyên.

| Loại động | Thẻ (theo chỉ số trong `CARDS`) | Nội dung gợi mở |
|---|---|---|
| `spin` | 35–39 (Bài 7) | Trái Đất tự quay, chấm Việt Nam chạy qua vùng NGÀY/ĐÊM |
| `orbit` | 40–44 (Bài 8) | Trái Đất chạy trên quỹ đạo quanh Mặt Trời, trục nghiêng |
| `moon` | 33 (Bài 6) | Phần sáng Mặt Trăng phình/xẹp → các pha trăng |
| `wind` | 58 (Bài 11), 78–79 (Bài 15) | Mũi tên gió chảy từ Áp CAO → Áp THẤP |
| `cycle` | 97–98 (Bài 19) | Bốc hơi → mây → mưa → chảy về biển |
| `wave` | 108 (Bài 21) | Hai lớp sóng cuộn trên mặt biển |

Đợt này **không tạo sơ đồ SVG tĩnh mới** (các hộp bổ sung là chữ; phần động giữ inline theo chỉ đạo)
nên không phát sinh file trong `img/`.

## Nguồn ảnh

| File (Wikimedia Commons) | Tác giả | Giấy phép |
|---|---|---|
| The Earth seen from Apollo 17.jpg | NASA/Apollo 17 crew; taken by either Harrison | Public domain |
| Vietnam relief location map.svg | Milenioscuro | CC BY 4.0 |
| Latitude and Longitude of the Earth.svg | Djexplo | CC0 |
| Latitude lines color.svg | source: Pearson Scott Foresman, donated to th | Public domain |
| Compass Rose North.svg | Serg!o

added more translations by WikiForMen | CC BY-SA 3.0 |
| Vietnam relief location map.jpg | Uwe Dedering | CC BY-SA 3.0 |
| Topographic map example.png | USGS | Public domain |
| Topographic map example cropped.png | Topographic_map_example.png: United States Ge | Public domain |
| Topographic map of Kaweah River.JPG | United States Geological Survey | Public domain |
| Palawan, Tropical jungle rainforest.jpg | Vyacheslav Argenberg | CC BY 4.0 |
| Solar System graphic by NASA.png | NASA | Public domain |
| Moon phases en.jpg | Orion 8 | CC BY-SA 3.0 |
| Geometry of Solar eclipses and Lunar eclipses.svg | Scrawler | Public domain |
| Rotating earth for twilight.png | User:Dr. Greywolf | CC BY-SA 3.0 |
| Orbital relations of the Solstice, Equinox & Intervening Seasons.svg | Colivine | CC0 |
| ChangingSeasons NH 01.png | NOAA Office of Education | Public domain |
| Antique gold compass (Unsplash).jpg | Barby Dalbosco barbydalbosco | CC0 |
| Earth-cutaway-schematic-numbered.svg | Original: USGS Vector:  Anasofiapaixao | Public domain |
| Tectonic plates (2022).svg | M.Bitton | CC BY-SA 3.0 |
| Folded strata below Allt Wen - geograph.org.uk - 1750035.jpg | Rudi Winter | CC BY-SA 2.0 |
| USA 09847 Grand Canyon Luca Galuzzi 2007.jpg | Luca Galuzzi (Lucag) | CC BY-SA 2.5 |
| Wind-sculpted dunes, Namib Desert.jpg | Sudzie | CC BY-SA 4.0 |
| Volcano scheme.svg | MesserWoland | CC BY-SA 3.0 |
| Fukui Earthquake 1948 - damaged building.jpg | Bert Cohen | Public domain |
| Mount Everest as seen from Drukair2 PLW edit Cropped.jpg | Mount_Everest_as_seen_from_Drukair2.jpg: shri | CC BY-SA 2.0 |
| Tibetan Plateau landscape.jpg | Jan Kranendonk ( | CC BY-SA 4.0 |
| Meandering river aerial photography.jpg | Hillebrand Steve, U.S. Fish and Wildlife Serv | Public domain |
| Quartz, Tibet.jpg | JJ Harrison ( | CC BY-SA 2.5 |
| Earth Global Circulation - en.svg | Kaidor | CC BY-SA 3.0 |
| Cumulonimbus cloud over the Sundarbans, West Bengal, India 02.jpg | Kingshuk Mondal | CC BY 4.0 |
| Water cycle diagram-vi.svg | Tttrung | CC BY-SA 4.0 |
| Weather Station 2015.jpg | Tri-l | CC BY-SA 4.0 |
| Köppen-Geiger climate classification (1980-2016).png | Maulucioni, based on a previous work by Beck | CC BY-SA 4.0 |
| Acacia Kenya Savannah.jpg | Kev Moses | CC BY 2.0 |
| Ghosi Climate-Graph.png | Rmushaf | CC BY-SA 4.0 |
| Klimadiagramm Bsp 01.jpg | Luchs | CC BY-SA 3.0 |
| The Water Cycle (SVS30580).png | NASA's Scientific Visualization Studio - Mari | Public domain |
| Land ocean ice 2048.jpg | NASA Goddard Space Flight Center Image by Ret | CC BY-SA 3.0 |
| A Meandering River in Costa Rica - aerial photo.jpg | Luke Jones (Accretion Disc on Flickr) https:/ | CC BY 2.0 |
| Lake Baikal in winter.jpg | Sergey Pesterev | CC BY-SA 4.0 |
| Perito Moreno Glacier Patagonia Argentina Luca Galuzzi 2005.JPG | Luca Galuzzi (Lucag) | CC BY-SA 2.5 |
| Waves July 2009-1.jpg | Alvesgaspar (talk) | CC BY-SA 3.0 |
| Generalized Soil Profile.png | Pallasite1 | CC BY-SA 4.0 |
| Soil profile.jpg | Unknown authorUnknown author | Public domain |
| Inside the tropical rainforest (11464713995).jpg | shankar s. from Dubai, united arab emirates | CC BY 2.0 |
| Savannah near Kuruman.JPG | Brian Dell | Public domain |
| Sand Dunes sa.jpg | Meshari Alawfi | CC BY 4.0 |

Sơ đồ tự vẽ trong trang (không dùng ảnh ngoài): lược đồ trí nhớ (Bài 5), lát cắt địa hình (Bài 14),
các tầng khí quyển (Bài 15), sơ đồ quỹ đạo 4 vị trí (Bài 8), sơ đồ động ngày/đêm (Bài 7), pha Mặt Trăng (Bài 6), sơ đồ tư duy tổng (Tổng kết).

## Rà soát chữ nước ngoài trong hình (21/10/2026)

Quy tắc của user: hạn chế tối đa chữ tiếng Anh/ngôn ngữ khác trong hình bài học thường (trẻ lớp 6 không đọc được);
ngoại lệ chỉ cho ký hiệu/đơn vị quốc tế thuộc nội dung bài (°C, km, vĩ độ…), tên riêng địa danh trên bản đồ thật,
và chữ nhỏ ở vị trí phụ trong ảnh chụp thật. Đã tải và **xem trực tiếp toàn bộ 48 URL ảnh** của trang (gồm ảnh bài học, flashcard, ảnh dự phòng 3D).

**Kết quả: 27 ảnh sạch (không có chữ) — giữ nguyên; 21 ảnh có chữ nước ngoài — đã xử lý hết:**

*Vẽ lại thành SVG nhãn TIẾNG VIỆT (lưu ở `dialy/img/`, tham chiếu tương đối, ghi chú "sơ đồ tự vẽ minh họa (đơn giản hoá)") — 11 file, thay 13 ảnh cũ:*

| SVG mới | Thay cho ảnh cũ | Dùng ở |
|---|---|---|
| `img/hoa-huong.svg` | Compass Rose North.svg (chữ N/E/S/W + 16 hướng viết tắt Anh — dễ nhầm: N tiếng Anh = Bắc, N tiếng Việt = Nam) | Bài 2, 4, 5 + flashcard (14 chỗ) |
| `img/vi-tuyen.svg` | Latitude lines color.svg (NORTH POLE / EQUATOR / North / South) | Bài 1 + flashcard |
| `img/he-mat-troi.svg` | Solar System graphic by NASA.png (tên hành tinh tiếng Anh) | Bài 6 + ảnh dự phòng mô hình 3D + flashcard |
| `img/cac-pha-trang.svg` | Moon phases en.jpg (New Moon / Full Moon…) | Bài 6 + flashcard |
| `img/nhat-thuc-nguyet-thuc.svg` | Geometry of Solar eclipses and Lunar eclipses.svg (Sun / Moon / Earth…) | Bài 6 |
| `img/ngay-dem.svg` | Rotating earth for twilight.png ("Rays of sunlight", điểm P/N) | Bài 7 + flashcard |
| `img/cac-mua-quy-dao.svg` | ChangingSeasons NH 01.png (ASTRONOMICAL SPRING / Summer Solstice…) | Bài 8 + flashcard |
| `img/hoan-luu-khi-quyen.svg` | Earth Global Circulation - en.svg (Westerlies / HIGH / Trades…) | Bài 13 + flashcard |
| `img/cac-tang-dat.svg` | Generalized Soil Profile.png VÀ Soil profile.jpg ("Horizons", O/A/B/C, độ sâu bằng inch) | Bài 23 + flashcard |
| `img/bieu-do-khi-hau-gio-mua.svg` | Ghosi Climate-Graph.png (tiêu đề "Altitude / Climate: Csa", trục °F) | Bài 14 + flashcard |
| `img/bieu-do-khi-hau-on-doi.svg` | Klimadiagramm Bsp 01.jpg (tháng ghi J F M A… kiểu Đức) | Bài 14 + flashcard |

*Thay bằng bản tương đương không có chữ (cách 1):*
- **Vòng tuần hoàn của nước (Bài 17):** bỏ sơ đồ NASA toàn chữ Anh (The Water Cycle SVS30580) → dùng chính sơ đồ `Water cycle diagram-vi.svg` (chữ tiếng Việt: mưa, bốc hơi, nước ngầm…) đã có trong module.
- **Bản đồ khí hậu Köppen (Bài 15):** đổi sang bản **no borders** cùng bộ dữ liệu Beck et al. — bản này không có tiêu đề/chú giải chữ, chỉ còn màu; figcaption đã bổ sung hướng dẫn đọc nhanh theo màu bằng tiếng Việt (đỏ–cam = khô nóng, xanh dương đậm = xích đạo mưa nhiều, xanh lá/lam = ôn đới, tím–xám = cực lạnh).

*Giữ nguyên kèm chú thích tiếng Việt (cách 3):*
- **Bản đồ các mảng kiến tạo (Bài 10):** không có bản trắng/bản tiếng Việt tương đương trên Commons → giữ bản đồ 2022, figcaption bổ sung bảng đối chiếu tên 15 mảng Anh → Việt (Pacific = Thái Bình Dương, Eurasian = Á–Âu…).

*Giữ nguyên theo ngoại lệ (ghi rõ lý do):*
- **2 bản đồ địa hình USGS (Stowe, tỉ lệ 1:24 000) + bản đồ sông Kaweah (Bài 3, 4):** bản đồ thật — chữ trên bản đồ là *tên riêng địa danh* (Stowe, Cady Hill…), điểm học là đường đồng mức/kí hiệu, chú thích tiếng Việt đã giải thích sẵn.
- **Ảnh trạm quan trắc thời tiết (Bài 12):** chữ rất nhỏ trên mặt 3 đồng hồ đo thật (nhiệt kế/khí áp kế/ẩm kế), ở vị trí phụ; alt + bài học đã giải thích bằng tiếng Việt.
- **Ảnh la bàn cổ (Bài 2):** chữ cái chỉ hướng trên mặt la bàn là một phần của vật thật trong ảnh chụp, nhỏ và mờ, không phải điểm nhìn chính.
- **Ảnh động đất Fukui 1948 (Bài 10):** một chữ Hán nhỏ trên biển hiệu ở mép phải ảnh tư liệu đen trắng — vị trí phụ, ảnh lịch sử.
- **Sơ đồ cấu tạo Trái Đất (Earth-cutaway-schematic-numbered.svg):** chỉ có số liệu "2900 km / 5100 km" — đơn vị km là ký hiệu quốc tế thuộc nội dung bài.
- **Sơ đồ núi lửa (Volcano scheme.svg):** chỉ đánh số 1–15, không có chữ; **sơ đồ quỹ đạo (Orbital relations…svg):** file gốc không chứa phần tử chữ nào (đã kiểm tra mã nguồn SVG) — cả hai giữ nguyên.
- **Sơ đồ vòng tuần hoàn -vi (Bài 12)** vốn đã là tiếng Việt — giữ làm mẫu.

Sau đợt này: 35 URL ảnh ngoài còn lại đều đã kiểm chứng tải được (HTTP 200, đúng loại image); 11 SVG tự vẽ phục vụ 200 `image/svg+xml` qua máy chủ kiểm thử; `questions.json` và `quiz.html` không thay đổi; toàn bộ JS qua `node --check`.

## Ghi chú về đáp án
Đáp án trắc nghiệm và câu hỏi gợi nhớ do người soạn biên soạn theo SGK Địa lí 6 (Kết nối tri thức),
**chưa đối chiếu với đáp án chính thức** — trang trắc nghiệm có ghi rõ dòng này.
