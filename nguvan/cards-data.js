/* ============================================================
   CARDS-DATA.JS — DU LIEU THE (flashcard) CUA MON NGU VAN 6
   Nguon du lieu DUY NHAT: trang hoc (index.html) va trang bai tap
   (quiz.html) cung tai file nay, tranh chep lech du lieu.
   ============================================================ */
const IMG={
de:"../hinh-anh/nguvan/de-men.webp",
cao:"../hinh-anh/nguvan/fc-cao.webp",
song:"../hinh-anh/nguvan/may-va-song.webp",
buom:"../hinh-anh/nguvan/fc-buom.webp",
diem:"../hinh-anh/nguvan/co-be-ban-diem.webp",
tre:"../hinh-anh/nguvan/cay-tre-viet-nam.webp",
lua:"../hinh-anh/nguvan/fc-lua.webp",
dao:"../hinh-anh/nguvan/fc-dao.webp",
hang:"../hinh-anh/nguvan/hang-en.webp",
mekong:"../hinh-anh/nguvan/cuu-long-giang.webp",
kieucang:"../hinh-anh/nguvan/de-men-kieu-cang.webp",
anhan:"../hinh-anh/nguvan/an-han-mo-de-choat.webp",
cotich:"../hinh-anh/nguvan/chuyen-co-tich-loai-nguoi.webp",
emgai:"../hinh-anh/nguvan/buc-tranh-em-gai.webp",
giolanh:"../hinh-anh/nguvan/gio-lanh-dau-mua.webp",
chaomao:"../hinh-anh/nguvan/con-chao-mao.webp",
mebe:"../hinh-anh/nguvan/fc-sua-me-be.webp"
};
const CARDS=[
["Dế Mèn là nhân vật trong tác phẩm nào? Của tác giả nào?","Trong truyện \"Dế Mèn phiêu lưu ký\" của nhà văn Tô Hoài — bài học trong sách là phần trích \"Bài học đường đời đầu tiên\".","de"],
["Tính cách ban đầu của Dế Mèn là gì?","Cường tráng, khỏe mạnh, đẹp mã — nhưng kiêu căng, xốc nổi và coi thường mọi người xung quanh.","kieucang"],
["Dế Mèn đã vô tình gây ra hậu quả đau lòng nào?","Trêu chị Cốc rồi trốn đi, khiến chị Cốc mổ nhầm Dế Choắt; Dế Choắt qua đời, Dế Mèn ân hận vô cùng.","anhan"],
["Bài học đường đời đầu tiên của Dế Mèn là gì?","\"Ở đời mà có thói hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn rồi cũng mang vạ vào mình đấy.\"","de"],
["Theo cáo trong \"Hoàng tử bé\", \"cảm hóa\" nghĩa là gì?","Là tạo nên những mối dây liên kết — nhờ thế, hai người trở nên cần thiết và duy nhất đối với nhau.","cao"],
["Bí mật cáo tặng Hoàng tử bé khi chia tay là gì?","Những điều cốt yếu (như tình bạn) thì mắt thường không nhìn thấy — chỉ có trái tim mới nhìn rõ. Và ta phải chịu trách nhiệm với người mình đã cảm hóa.","cao"],
["\"Chuyện cổ tích về loài người\" là thơ của ai? Ý tưởng chính của bài thơ là gì?","Của Xuân Quỳnh. Ý tưởng: mọi vật, mọi người trên đời đều sinh ra vì trẻ em — để yêu thương, chăm sóc và dạy dỗ trẻ em.","cotich"],
["Trong bài thơ, mẹ sinh ra để làm gì cho trẻ?","Để bế bồng, chăm sóc và cho trẻ tình yêu cùng những lời ru — điều quý giá đầu tiên trong đời mỗi em bé.","mebe"],
["\"Mây và sóng\" là của nhà thơ nào, người nước nào?","Của Ta-go (Rabindranath Tagore), nhà thơ Ấn Độ.","song"],
["Vì sao em bé trong \"Mây và sóng\" từ chối đi cùng mây và sóng?","Vì mẹ đang đợi ở nhà. Em bé tự nghĩ ra trò chơi bên mẹ: con là mây, là sóng; mẹ là mặt trăng, là bờ biển.","song"],
["Người anh trong \"Bức tranh của em gái tôi\" đã thay đổi như thế nào?","Từ ghen tị, cau có với em gái → khi thấy bức tranh em vẽ chân dung mình đầy yêu thương, anh sững sờ, xấu hổ và biết trân trọng em hơn.","emgai"],
["\"Mây và sóng\" thuộc thể loại gì?","Thơ văn xuôi (thơ tự do) — kết hợp yếu tố tự sự (kể chuyện) và biểu cảm (bộc lộ tình cảm).","song"],
["Cô bé bán diêm phải đi bán diêm vào đêm nào, trong hoàn cảnh ra sao?","Vào đêm giao thừa, trời rét buốt, tuyết rơi; em đầu trần chân đất, cả ngày không bán được que diêm nào nên không dám về nhà.","diem"],
["Mỗi lần quẹt diêm, cô bé bán diêm nhìn thấy những gì?","Lò sưởi ấm áp → bàn ăn với ngỗng quay → cây thông Nô-en rực rỡ → bà ngoại yêu quý.","diem"],
["Truyện \"Cô bé bán diêm\" gửi gắm thông điệp gì?","Hãy yêu thương và sẻ chia với trẻ em bất hạnh; đừng thờ ơ trước nỗi khổ của người khác.","diem"],
["\"Gió lạnh đầu mùa\" là truyện của ai? Nhớ câu mở đầu nổi tiếng của truyện.","Của Thạch Lam. Câu mở đầu: \"Buổi sáng hôm nay, mùa đông đột nhiên đến, không báo trước.\"","giolanh"],
["Chị em Sơn trong \"Gió lạnh đầu mùa\" đã làm gì cho bé Hiên?","Lấy chiếc áo bông cũ (kỉ vật của em gái đã mất) cho Hiên mặc chống rét — sẻ chia một cách tự nhiên, chân thành.","giolanh"],
["Bài thơ \"Con chào mào\" (Mai Văn Phấn) dạy ta điều gì về thiên nhiên?","Yêu thiên nhiên là tôn trọng tự do của muôn loài — đừng chiếm giữ thiên nhiên làm của riêng.","chaomao"],
["\"Chuyện cổ nước mình\" viết theo thể thơ nào? Tác giả là ai?","Thơ lục bát, của nhà thơ Lâm Thị Mỹ Dạ.","lua"],
["Đọc thuộc hai câu mở đầu \"Chuyện cổ nước mình\".","\"Tôi yêu truyện cổ nước tôi / Vừa nhân hậu lại tuyệt vời sâu xa.\"","lua"],
["Theo bài thơ, truyện cổ dạy ta những bài học gì?","Ở hiền gặp lành, biết thương người, sống ngay thẳng — và thêm tự hào về văn hóa của dân tộc mình.","lua"],
["\"Cây tre Việt Nam\" là tác phẩm của ai?","Của nhà văn Thép Mới (thể loại tùy bút).","tre"],
["Ca dao là gì?","Là thơ ca dân gian truyền miệng qua nhiều đời, thường dùng thể lục bát, diễn tả đời sống và tình cảm của nhân dân lao động.","lua"],
["Vì sao tre được coi là biểu tượng của con người Việt Nam?","Vì tre thẳng, dẻo dai, sống thành lũy đoàn kết và xanh tốt quanh năm — giống phẩm chất kiên cường, đoàn kết, thủy chung của dân tộc.","tre"],
["\"Cô Tô\" là tác phẩm của ai, thuộc thể loại gì?","Của Nguyễn Tuân, thuộc thể kí — ghi lại cảnh và người trên đảo Cô Tô sau trận bão.","dao"],
["Cảnh Cô Tô sau cơn bão được tả bằng câu văn nổi tiếng nào?","\"Ngày thứ năm trên đảo Cô Tô là một ngày trong trẻo, sáng sủa.\"","dao"],
["Hang Én nằm ở đâu? Điều gì kì thú nhất của hang?","Ở Vườn quốc gia Phong Nha – Kẻ Bàng (Quảng Bình). Hang khổng lồ: bên trong có sông ngầm, bãi cát rộng — và là nhà của hàng vạn con chim én.","hang"],
["\"Hang Én\" là văn bản của tác giả nào?","Của Hà My — một bài du kí ghi lại hành trình khám phá hang động.","hang"],
["\"Cửu Long Giang ta ơi\" viết về dòng sông nào? Tác giả là ai?","Về sông Cửu Long ở đồng bằng Nam Bộ; tác giả là nhà thơ Nguyên Hồng.","mekong"],
["Dạng viết chính của Bài 5 là gì?","Viết bài văn tả cảnh sinh hoạt: quan sát kĩ, tả bao quát rồi tả hoạt động tiêu biểu, kèm cảm nghĩ của người viết.","mekong"]
];
