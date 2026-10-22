/* ============================================================
   CARDS-DATA.JS — DU LIEU THE (flashcard) CUA MON TIENG ANH 6
   Nguon du lieu DUY NHAT: trang hoc (index.html) va trang bai tap
   (quiz.html) cung tai file nay, tranh chep lech du lieu.
   ============================================================ */
var CM="../hinh-anh/tienganh/";
function W(w,ipa,vi,img,em,ex,exvi){return{w:w,ipa:ipa,vi:vi,img:img,em:em,ex:ex,exvi:exvi};}
var WORDS={
u1:[
W("school","/skuːl/","trường học",CM+"school.jpg","","My school is big and new.","Trường của mình to và mới."),
W("classmate","/ˈklɑːsmeɪt/","bạn cùng lớp","","🧑‍🤝‍🧑","Lan is my classmate.","Lan là bạn cùng lớp của mình."),
W("teacher","/ˈtiːtʃə/","giáo viên","","👩‍🏫","My teacher is kind.","Cô giáo của mình rất tốt bụng."),
W("subject","/ˈsʌbdʒɪkt/","môn học","","📚","Maths is my favourite subject.","Toán là môn học mình thích nhất."),
W("maths","/mæθs/","môn Toán","","🔢","I study maths on Monday.","Mình học Toán vào thứ Hai."),
W("English","/ˈɪŋɡlɪʃ/","môn Tiếng Anh","","🔤","We speak English in class.","Chúng mình nói tiếng Anh trong lớp."),
W("calculator","/ˈkælkjuleɪtə/","máy tính cầm tay",CM+"calculator.jpg","","I use a calculator in maths lessons.","Mình dùng máy tính cầm tay trong giờ Toán."),
W("compass","/ˈkʌmpəs/","com-pa (để vẽ hình tròn)",CM+"compass.jpg","","I draw a circle with a compass.","Mình vẽ hình tròn bằng com-pa."),
W("pencil case","/ˈpensl keɪs/","hộp bút",CM+"sua-pencil-case.webp","","My pencil case is blue.","Hộp bút của mình màu xanh dương."),
W("ruler","/ˈruːlə/","thước kẻ","","📏","I draw a line with a ruler.","Mình kẻ đường thẳng bằng thước kẻ."),
W("library","/ˈlaɪbrəri/","thư viện",CM+"library.jpg","","I read books in the library.","Mình đọc sách trong thư viện."),
W("uniform","/ˈjuːnɪfɔːm/","đồng phục",CM+"sua-uniform.webp","","We wear uniforms at school.","Chúng mình mặc đồng phục ở trường."),
W("playground","/ˈpleɪɡraʊnd/","sân chơi (của trường)","","🛝","We play in the playground.","Chúng mình chơi ở sân chơi.")
],
u2:[
W("house","/haʊs/","ngôi nhà","","🏠","This is my house.","Đây là nhà của mình."),
W("living room","/ˈlɪvɪŋ ruːm/","phòng khách",CM+"living-room.jpg","","We watch TV in the living room.","Nhà mình xem tivi ở phòng khách."),
W("kitchen","/ˈkɪtʃɪn/","phòng bếp","../hinh-anh/tienganh/kitchen.jpg","","My mother cooks in the kitchen.","Mẹ mình nấu ăn trong bếp."),
W("bedroom","/ˈbedrʊm/","phòng ngủ",CM+"bedroom.jpg","","My bedroom is small.","Phòng ngủ của mình nhỏ."),
W("bathroom","/ˈbɑːθruːm/","phòng tắm","../hinh-anh/tienganh/bathroom.jpg","","There is a shower in the bathroom.","Có vòi sen trong phòng tắm."),
W("garden","/ˈɡɑːdn/","khu vườn",CM+"garden.jpg","","There are flowers in the garden.","Có nhiều hoa trong vườn."),
W("sofa","/ˈsəʊfə/","ghế sô-pha",CM+"sofa.jpg","","The cat is on the sofa.","Con mèo nằm trên ghế sô-pha."),
W("lamp","/læmp/","cái đèn",CM+"sua-lamp.webp","","The lamp is on the table.","Cái đèn ở trên bàn."),
W("fridge","/frɪdʒ/","tủ lạnh",CM+"fridge.jpg","","The milk is in the fridge.","Sữa ở trong tủ lạnh."),
W("wardrobe","/ˈwɔːdrəʊb/","tủ quần áo",CM+"sua-wardrobe.webp","","My clothes are in the wardrobe.","Quần áo của mình ở trong tủ."),
W("next to","/ˈnekst tuː/","ở bên cạnh",CM+"sua-next-to.webp","","The sofa is next to the TV.","Ghế sô-pha ở bên cạnh tivi."),
W("between","/bɪˈtwiːn/","ở giữa (hai vật)",CM+"sua-between.webp","","The lamp is between the sofa and the table.","Cái đèn ở giữa ghế sô-pha và cái bàn.")
],
u3:[
W("friendly","/ˈfrendli/","thân thiện","","😊","Anna is friendly. She talks to everyone.","Anna rất thân thiện. Bạn ấy nói chuyện với mọi người."),
W("funny","/ˈfʌni/","hài hước, vui tính","","😂","Tom is funny. He makes me laugh.","Tom rất vui tính. Bạn ấy làm mình cười."),
W("kind","/kaɪnd/","tốt bụng","","💗","My best friend is kind.","Bạn thân của mình rất tốt bụng."),
W("clever","/ˈklevə/","thông minh, lanh lợi","","🧠","He is clever. He is good at maths.","Bạn ấy thông minh. Bạn ấy giỏi Toán."),
W("shy","/ʃaɪ/","nhút nhát","","🙈","She is shy. She doesn't talk much.","Bạn ấy nhút nhát. Bạn ấy ít nói."),
W("hard-working","/ˌhɑːd ˈwɜːkɪŋ/","chăm chỉ","","🐝","My father is hard-working.","Bố mình rất chăm chỉ."),
W("active","/ˈæktɪv/","năng động","","🏃","They are active. They play sports every day.","Họ rất năng động. Họ chơi thể thao mỗi ngày."),
W("careful","/ˈkeəfl/","cẩn thận","","🔍","She is careful with her homework.","Bạn ấy cẩn thận với bài tập của mình."),
W("caring","/ˈkeərɪŋ/","biết quan tâm, chu đáo","","🤗","My grandmother is caring.","Bà mình rất chu đáo."),
W("confident","/ˈkɒnfɪdənt/","tự tin","","😎","He is confident. He speaks in front of the class.","Bạn ấy tự tin. Bạn ấy nói trước lớp."),
W("glasses","/ˈɡlɑːsɪz/","kính mắt","","👓","She wears glasses.","Bạn ấy đeo kính."),
W("slim","/slɪm/","mảnh khảnh","","🧍","My sister is slim and tall.","Chị mình mảnh khảnh và cao.")
],
u4:[
W("park","/pɑːk/","công viên",CM+"park.jpg","","There is a park near my house.","Có một công viên gần nhà mình."),
W("cinema","/ˈsɪnəmə/","rạp chiếu phim","","🎬","We watch films at the cinema.","Chúng mình xem phim ở rạp chiếu phim."),
W("hospital","/ˈhɒspɪtl/","bệnh viện","","🏥","My aunt works in a hospital.","Dì mình làm việc ở bệnh viện."),
W("bakery","/ˈbeɪkəri/","tiệm bánh",CM+"sua-bakery.webp","","I buy bread at the bakery.","Mình mua bánh mì ở tiệm bánh."),
W("post office","/ˈpəʊst ˌɒfɪs/","bưu điện","","📮","The post office is next to the bank.","Bưu điện ở cạnh ngân hàng."),
W("railway station","/ˈreɪlweɪ ˌsteɪʃn/","ga tàu hỏa",CM+"sua-railway-station.webp","","The train is at the railway station.","Con tàu đang ở ga tàu hỏa."),
W("square","/skweə/","quảng trường",CM+"square.jpg","","There is a big square in the city.","Có một quảng trường lớn trong thành phố."),
W("busy","/ˈbɪzi/","nhộn nhịp, bận rộn","","🏙️","The city is busier than the countryside.","Thành phố nhộn nhịp hơn vùng quê."),
W("quiet","/ˈkwaɪət/","yên tĩnh","","🤫","My street is quieter than yours.","Đường nhà mình yên tĩnh hơn đường nhà bạn."),
W("noisy","/ˈnɔɪzi/","ồn ào","","🔊","The market is noisier than the library.","Cái chợ ồn ào hơn thư viện."),
W("narrow","/ˈnærəʊ/","hẹp",CM+"sua-narrow.webp","","This street is narrower than that street.","Đường này hẹp hơn đường kia."),
W("famous","/ˈfeɪməs/","nổi tiếng","","⭐","Ha Long Bay is famous.","Vịnh Hạ Long rất nổi tiếng.")
],
u5:[
W("mountain","/ˈmaʊntən/","ngọn núi",CM+"mountain.jpg","","Fansipan is the highest mountain in Viet Nam.","Phan Xi Păng là ngọn núi cao nhất Việt Nam."),
W("island","/ˈaɪlənd/","hòn đảo",CM+"island.jpg","","There are many islands in Ha Long Bay.","Có nhiều hòn đảo ở vịnh Hạ Long."),
W("waterfall","/ˈwɔːtəfɔːl/","thác nước",CM+"sua-waterfall.webp","","Ban Gioc is a beautiful waterfall.","Bản Giốc là một thác nước đẹp."),
W("beach","/biːtʃ/","bãi biển",CM+"sua-beach.webp","","The beach is sandy and clean.","Bãi biển đầy cát và sạch."),
W("cave","/keɪv/","hang động",CM+"cave.jpg","","Phong Nha is a famous cave.","Phong Nha là một hang động nổi tiếng."),
W("forest","/ˈfɒrɪst/","khu rừng",CM+"forest.jpg","","There are many trees in the forest.","Có nhiều cây trong rừng."),
W("desert","/ˈdezət/","sa mạc",CM+"desert.jpg","","The desert is hot and dry.","Sa mạc nóng và khô."),
W("boat","/bəʊt/","con thuyền",CM+"sua-boat.webp","","We go by boat to the island.","Chúng mình đi thuyền ra đảo."),
W("backpack","/ˈbækpæk/","ba lô","../hinh-anh/tienganh/backpack.jpg","","I put my books in my backpack.","Mình để sách vào ba lô."),
W("suncream","/ˈsʌnkriːm/","kem chống nắng","","🧴","Put on suncream at the beach!","Hãy bôi kem chống nắng ở bãi biển!"),
W("amazing","/əˈmeɪzɪŋ/","tuyệt vời","","🤩","Ha Long Bay is amazing!","Vịnh Hạ Long thật tuyệt vời!"),
W("natural wonder","/ˈnætʃrəl ˈwʌndə/","kì quan thiên nhiên","","🏞️","Ha Long Bay is a natural wonder.","Vịnh Hạ Long là một kì quan thiên nhiên.")
],
u6:[
W("Tet holiday","/tet ˈhɒlədeɪ/","kì nghỉ Tết","","🎊","Tet is the biggest holiday in Viet Nam.","Tết là kì lễ lớn nhất ở Việt Nam."),
W("lucky money","/ˈlʌki ˈmʌni/","tiền lì xì","","🧧","Children get lucky money at Tet.","Trẻ em nhận tiền lì xì vào dịp Tết."),
W("fireworks","/ˈfaɪəwɜːks/","pháo hoa",CM+"fireworks.jpg","","We watch fireworks on New Year's Eve.","Chúng mình xem pháo hoa vào đêm giao thừa."),
W("decorate","/ˈdekəreɪt/","trang trí, trang hoàng",CM+"sua-decorate.webp","","We decorate our house before Tet.","Nhà mình trang trí nhà trước Tết."),
W("peach blossom","/piːtʃ ˈblɒsəm/","hoa đào",CM+"sua-peach-blossom.webp","","Peach blossoms are pink.","Hoa đào có màu hồng."),
W("kumquat tree","/ˈkʌmkwɒt triː/","cây quất",CM+"sua-kumquat-tree.webp","","There is a kumquat tree in my living room.","Có một cây quất trong phòng khách nhà mình."),
W("chung cake","","bánh chưng",CM+"chung-cake.jpg","","My family makes chung cakes.","Gia đình mình gói bánh chưng."),
W("family gathering","/ˈfæməli ˈɡæðərɪŋ/","sum họp gia đình","","👨‍👩‍👧‍👦","Tet is a time for family gatherings.","Tết là dịp sum họp gia đình."),
W("temple","/ˈtempl/","ngôi đền",CM+"temple.jpg","","We go to the temple at Tet.","Chúng mình đi lễ đền vào dịp Tết."),
W("wish","/wɪʃ/","chúc, điều ước","","🌠","I wish you a Happy New Year!","Mình chúc bạn năm mới vui vẻ!"),
W("celebrate","/ˈselɪbreɪt/","tổ chức, kỉ niệm","","🎉","We celebrate Tet with our family.","Chúng mình đón Tết cùng gia đình."),
W("relative","/ˈrelətɪv/","họ hàng",CM+"sua-relative.webp","","We visit our relatives at Tet.","Chúng mình thăm họ hàng vào dịp Tết.")
]
};
