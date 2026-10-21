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

## Ghi chú về đáp án
Đáp án trắc nghiệm và câu hỏi gợi nhớ do người soạn biên soạn theo SGK Địa lí 6 (Kết nối tri thức),
**chưa đối chiếu với đáp án chính thức** — trang trắc nghiệm có ghi rõ dòng này.
