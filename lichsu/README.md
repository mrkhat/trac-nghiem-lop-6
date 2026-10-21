# Lịch sử 6 — Học kì 1 (sách Kết nối tri thức với cuộc sống)

Module học + ôn tập Lịch sử lớp 6, xây dựng lại ngày 21/10/2026 theo cấu trúc **từng bài khép kín** và mở rộng ra **cả học kì 1**. Chỉ build local; việc push GitHub do người phụ trách soát lại.

## Cấu trúc trang học tập (`index.html`)

**Phần 1 — Học tập:** 10 bài, mỗi bài là một khối khép kín theo đúng thứ tự:

1. Nội dung bài sinh động: câu mở đầu kiểu kể chuyện, 2–3 hình minh họa thật có chú thích gợi nhớ, mốc/tên quan trọng in đậm + highlight màu theo chương.
2. Hộp **Mẹo nhớ** + hộp **Bí mật thú vị** + **Mốc cần nhớ**.
3. **Sơ đồ tư duy của bài** (HTML/CSS thuần, màu theo chương).
4. **Câu hỏi gợi nhớ riêng của bài** (3–5 câu, bấm vào mới hiện đáp án, mỗi bài có ít nhất 1 câu hỏi dựa trên hình).
5. **Flashcard riêng của bài** (4–6 thẻ, 100% thẻ có hình gợi nhớ; đánh dấu đã thuộc/chưa thuộc lưu `localStorage` khóa `lichsu_flash_v2`, thẻ chưa thuộc được ưu tiên xếp trước).
6. Thanh chuyển tiếp sang bài tiếp theo.

**Phần Tổng kết** (cuối trang, sau Bài 10): sơ đồ tư duy tổng toàn học kì → dòng thời gian 10 sự kiện (mỗi sự kiện có hình) → trò chơi sắp xếp sự kiện → bộ flashcard **tổng ôn** gộp cả 48 thẻ → thẻ link sang phần trắc nghiệm.

**Phần 2 — Trắc nghiệm** (`quiz.html` + `questions.json`): 71 câu, 3 chế độ Học tập / Luyện tập / Thi thử (giữ nguyên engine cũ).

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
| Flashcard | 16 (chữ trơn, khóa `lichsu_flash_v1`) | 48 (100% có hình, khóa `lichsu_flash_v2`) — theo bài: 5, 4, 6, 5, 4, 5, 5, 5, 5, 4 |
| Câu trắc nghiệm | 36 | 71 (id 1–36 giữ nguyên nội dung; thêm 35 câu cho 5 bài mới, mỗi bài 7 câu) |
| Phân bố đáp án toàn ngân hàng | 9A/9B/9C/9D | 18A/18B/18C/17D |
| Ảnh minh họa (Wikimedia) | 8 | 33 (+ 2 sơ đồ SVG tự vẽ ở Bài 2, có ghi chú "không theo tỉ lệ") |
| Sơ đồ tư duy | 0 | 11 (mỗi bài 1 + 1 sơ đồ tổng) |
| Sự kiện dòng thời gian | 6 | 10 (mỗi sự kiện có hình) |

## Bảng nguồn ảnh

Tất cả ảnh lấy từ Wikimedia Commons qua URL `https://commons.wikimedia.org/wiki/Special:FilePath/<file>?width=900`, đã kiểm chứng từng URL bằng curl (HTTP 200 + content-type image) ngày 21/10/2026. Khái niệm trừu tượng không có ảnh phù hợp (đơn vị thời gian, trục TCN/CN ở Bài 2) được vẽ bằng SVG ngay trong trang, bám sát nội dung SGK. Thư mục `img/` giữ bản tải về của các ảnh bản v1 để dự phòng.

| # | File trên Commons | Giấy phép | Dùng ở |
|---|---|---|---|
| 1 | Dong Son Drum, Bronze, Vietnam or China, 2nd–1st c BC, temp Prague Kinsky, NG Vu 517, 142199.jpg | CC BY-SA 3.0 | Bài 1, thẻ 0/2 |
| 2 | BiaTienSi1442.jpg | CC BY-SA 3.0 | Bài 1, thẻ 1/3 |
| 3 | Sand Clock.jpg | CC BY-SA 3.0 | Bài 2, thẻ 5/7 |
| 4 | Sundial Lannion Brittany France.JPG | CC BY-SA 3.0 | Bài 2, thẻ 6/8 |
| 5 | Australopithecus afarensis reconstruction.JPG | CC BY-SA 3.0 | Bài 3 (dải tiến hóa), timeline, thẻ 10 |
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
| 17 | Agilkia Esmet-Achom 02.jpg | CC BY 3.0 | Bài 6, thẻ 26 |
| 18 | Ancient Egypt and Mesopotamia c. 1450 BC af.png | CC BY-SA 3.0 | Bài 6, thẻ 27 |
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

## Chuẩn nội dung đã áp dụng

- Đối tượng: trẻ lớp 6, trình độ không đều — câu ngắn, một ý một dòng, thuật ngữ khó giải thích ngay bằng lời thường.
- Mỗi ý quan trọng được lặp qua nhiều kênh: hình → sơ đồ tư duy → mẹo nhớ → flashcard có hình → câu hỏi gợi nhớ.
- Sơ đồ tự vẽ có ghi chú "hình minh họa, không theo tỉ lệ" khi không đúng tỉ lệ thật.
- Đáp án trắc nghiệm do người biên soạn tự làm, **chưa đối chiếu đáp án chính thức**.
