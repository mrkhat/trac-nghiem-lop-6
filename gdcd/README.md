# GDCD 6 — Học kì 1 (module gdcd/)

Trang học + trắc nghiệm môn **Giáo dục công dân 6**, sách **Kết nối tri thức với cuộc sống**, theo đúng khuôn thống nhất của site (mẫu chuẩn: trang Lịch sử), dùng chung `../assets/common.css`.

## Phạm vi (đã tra cứu, không viết theo trí nhớ)

**Mục lục SGK GDCD 6 KNTT (12 bài)** — nguồn: tech12h.com (trang soạn giáo án GDCD 6 KNTT) và kenhgiaovien.com (giáo án điện tử GDCD 6 KNTT), hai nguồn khớp nhau:
Bài 1: Tự hào về truyền thống gia đình, dòng họ • Bài 2: Yêu thương con người • Bài 3: Siêng năng, kiên trì • Bài 4: Tôn trọng sự thật • Bài 5: Tự lập • Bài 6: Tự nhận thức bản thân • Bài 7: Ứng phó với tình huống nguy hiểm • Bài 8: Tiết kiệm • Bài 9: Công dân nước Cộng hòa xã hội chủ nghĩa Việt Nam • Bài 10: Quyền và nghĩa vụ cơ bản của công dân • Bài 11: Quyền cơ bản của trẻ em • Bài 12: Thực hiện quyền trẻ em.

**Phân phối chương trình (PPCT) KNTT** — nguồn: bloghoctap.edu.vn và lop6.edu.vn (bảng PPCT GDCD 6 KNTT giống nhau ở hai nguồn):
- Học kì 1 = **Bài 1–6** (tiết 1–18). Kiểm tra giữa kì 1 ở tiết 9, sau Bài 3 → **Ôn GK = Bài 1–3**, **Sau GK = Bài 4–6**.
- Học kì 2 = Bài 7–12 → **chưa làm trong module này** (module chỉ phủ HK1, giống phạm vi các môn khác).

Trang gắn nhãn: Bài 1–3 badge "⭐ Ôn giữa kì 1", Bài 4–6 badge "📚 Sau giữa kì 1".

## Chuẩn "mức dễ nhất" (theo chỉ đạo riêng cho đối tượng bé học yếu, mất căn bản, khó đọc hiểu)

1. Câu văn **thật ngắn, một ý một dòng**; từ khó giải thích ngay tại chỗ bằng lời thường (hiếu học, gia phả, quyên góp, vô cảm, phao, trực nhật, ỷ lại, ngẫm nghĩ, góp ý, tự kiêu, tự ti…).
2. Nội dung chia **đoạn nhỏ**; sau mỗi 1–2 đoạn có **câu kiểm tra siêu ngắn "✔ Vừa rồi…"** bấm hiện đáp án (12 câu, 2 câu/bài).
3. Mỗi bài có **1 câu 🎯 "Bắt ý chính"** rèn quan sát + nắm ý mấu chốt, luân phiên 3 mẫu: (a) đoạn/tình huống → chọn câu nói đúng ý chính nhất trong 3 lựa chọn (Bài 1, 2, 5); (b) chọn cụm từ quan trọng nhất trong câu (Bài 3, 6); (c) đoạn truyện → chọn câu tóm đúng nhất (Bài 4). Đáp án luôn giải thích vì sao đó là ý chính và hai lựa chọn kia chỉ là chi tiết phụ.
4. Mỗi bài có nút **🔊 Nghe bài** (speechSynthesis vi-VN, dùng lại mẫu của trang Ngữ văn): đọc theo từng ý/câu ngắn nối tiếp, **tô sáng phần đang đọc** (class `.rb-on`), có nút ⏹ Dừng, tự dừng khi chuyển bài, **cảnh báo khi máy thiếu giọng tiếng Việt** kèm cách khắc phục. Phạm vi đọc: phần hook + các ý nội dung (class `.rd`) + hộp Điểm cần nhớ.
5. **Thẻ lật mini "⚡ Nhớ nhanh"** trong nội dung: 12 thẻ (2 thẻ/bài, đặt sau các đoạn chính, trước hộp Điểm cần nhớ) — widget lật 3D nhẹ riêng (class `.mfc`, khai báo trong `<style>` riêng của GDCD), bấm để lật xem đáp án ngắn, **không chấm điểm, không lưu trạng thái**. Đây là lớp bổ sung; bộ flashcard đầy đủ cuối bài (fcDeck) giữ nguyên.
6. Trắc nghiệm **sắp từ dễ đến khó** (trong từng bài: nhận biết → hiểu → tình huống vận dụng), lời giải thích ngắn, thân thiện, động viên; tránh từ học thuật nặng.
7. Hình **tươi vui, có tính dẫn dắt**: nhân vật đang làm việc đúng; Bài 5 có hình **trước–sau** (mẹ làm thay → tự làm).
8. Hộp **⭐ Điểm cần nhớ: đúng 4 ý/bài**, mỗi ý một dòng ngắn.

## Số liệu

| Hạng mục | Số lượng |
|---|---|
| Bài học HK1 | 6 (Bài 1–6 SGK) |
| Hình minh họa | 30 (gen AI, màu nước sách truyện, 400px WebP q72, 21–37 KB) — mỗi bài 5 hình: 2 hình gallery + hình cho flashcard/thẻ mini |
| Flashcard | 30 thẻ (5/bài), 100% có hình, mặt hỏi khớp đúng khái niệm của thẻ; khóa localStorage `gdcd_flash_v1` |
| Thẻ lật mini ⚡ Nhớ nhanh | 12 (2/bài; 6 thẻ có hình, 6 thẻ chữ) |
| Câu kiểm tra nhanh trong bài | 12 "✔ Vừa rồi…" + 6 "🎯 Bắt ý chính" (mỗi bài 1 câu 🎯) |
| Câu hỏi gợi nhớ cuối bài | 30 (5/bài, mỗi bài có 1 câu 🖼 theo hình + 1 câu 🤔 tình huống vận dụng) |
| Sơ đồ tư duy SVG tự vẽ nhãn Việt | 7 (6 bài + 1 tổng) |
| Câu trắc nghiệm | 54 (9/bài), phân bố đáp án A/B/C/D = 13/14/14/13, mỗi câu có giải thích |
| Chế độ xem | Từng bài (mặc định) / Xem tất cả, khóa `gdcd_view_mode` |

Nguyên tắc bao phủ: mọi kiến thức trong 54 câu trắc nghiệm đều đã dạy trong bài học tương ứng (kể cả các chi tiết: ca dao "Thương người như thể thương thân", tục ngữ "Có công mài sắt, có ngày nên kim", truyện Thỏ và Rùa, truyện Chú bé chăn cừu, khái niệm gia phả/phao/trực nhật/tự kiêu/tự ti).

## Điểm chưa chắc — cần đối chiếu trường của bé

1. **Phạm vi giữa kì 1**: PPCT phổ biến là Bài 1–3 (hai nguồn khớp nhau), nhưng từng trường có thể xê dịch (một số kế hoạch giáo viên mới gộp tiết khác, vẫn giữ mốc GK sau Bài 3). Nhãn trên trang chỉ là gợi ý.
2. **Tên Bài 7**: các nguồn ghi hơi khác nhau ("Ứng phó với tình huống nguy hiểm" / "Ứng phó với các tình huống nguy hiểm") — bài này thuộc HK2, chưa làm, chỉ ghi nhận khi đối chiếu SGK giấy.
3. Trường của bé có đúng dùng bộ **Kết nối tri thức** cho GDCD không (đa số trường dùng KNTT hoặc Chân trời sáng tạo — mục lục hai bộ gần giống nhau ở GDCD 6 nhưng thứ tự/số tiết có thể lệch).
4. `assets/common.css` do đợt thống nhất CSS tạo song song: tại thời điểm kiểm, file đã có và chứa đủ class khung của trang này, trừ `.mmap`/`.mm-title` — hai class này được khai báo bổ sung trong `<style>` riêng của trang GDCD với đúng giá trị của trang Lịch sử, nên hiển thị khớp kể cả khi common.css thay đổi.
