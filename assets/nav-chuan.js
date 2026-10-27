/* ============================================================================
   NAV-CHUAN.JS — MENU DÙNG CHUNG CHO CÁC TRANG HỌC LỚP 6
   Chuẩn: hành vi menu của tienganh/index.html (đã đọc code thật), cộng 2 bổ
   sung user chốt: (a) option trong select CÓ TÊN bài, (b) tên chương làm nhóm
   optgroup trong select. Spec Công nghệ cũ (viewbar/vrow/...) đã BỎ.

   --------------------------------------------------------------------------
   1) TRANG DÙNG MODULE NHƯ THẾ NÀO (trang chỉ còn DỮ LIỆU + 1 thẻ script)
   --------------------------------------------------------------------------
   - XÓA khỏi trang (đợt di chuyển làm, không phải module này): markup menu cũ
     (#viewbar trên + .viewbar-b dưới, #picker, .pickrow, .navrow), toàn bộ
     <script> logic menu cũ (PAGES/PLABELS/showPage/applyMode/CHAPTERS/GROUPS
     và script "CHỌN BÀI GỌN 2 DÒNG" v2), CSS menu riêng trong trang, và thẻ
     nạp assets/ux-p0.js (module này thay cả 2 việc của nó: gom nhóm select
     theo chương + nút "Học tiếp"). Giữ nguyên nội dung bài, flashcard, quiz.
   - Đặt ở CUỐI <body>, sau toàn bộ markup bài học, đúng 2 thẻ theo thứ tự:
       <script>
         window.NAV_DATA = { ...xem mục 2... };
       </script>
       <script src="../assets/nav-chuan.js"></script>
     (Đường dẫn tương đối theo độ sâu của trang: trang trong thư mục môn dùng
     "../assets/nav-chuan.js". Module vẫn chạy nếu đặt sớm hơn, vì nó đợi
     DOMContentLoaded, nhưng đặt cuối body là chắc chắn nhất: lúc chạy, mọi
     khối bài đã có trong DOM để module tìm theo id.)
   - Trang KHÔNG cần có sẵn markup menu nào, KHÔNG cần định nghĩa hàm menu
     nào, KHÔNG cần CSS menu riêng. Module tự xây toàn bộ khung dưới đây và
     tự chèn vào trang (xem mục 4).

   --------------------------------------------------------------------------
   2) window.NAV_DATA — CÁC TRƯỜNG (bắt buộc ghi *, còn lại có mặc định)
   --------------------------------------------------------------------------
   * pages:      mảng id các mục theo ĐÚNG trình tự trang đó, không sắp xếp
                 lại: bài HK1 -> Tổng kết HK1 -> bài HK2 -> Tổng kết HK2 ->
                 Tổng kết cả năm. Vd lichsu:
                 ['bai1',...,'bai11','tongket-hk1','bai12',...,'bai20',
                  'tongket-hk2','sum'].
                 Mỗi id phải trùng id của khối bài trong trang, TRỪ mục tổng
                 kết cả năm có thể dùng elementIds (mục 5) để trỏ tới wrapper
                 thật (vd 'sum' -> 'sumwrap').
   * labels:     mảng tên hiển thị, song song với pages, cùng độ dài.
                 Bài ghi "Bài N: Tên bài" (tienganh: "Unit N: Tên unit");
                 Tổng kết ghi tên mục, có thể kèm emoji đầu như tienganh
                 ("🎓 Tổng kết Học kì 1", "🏁 Tổng kết").
   * viewKey:    key localStorage lưu chế độ xem, ĐÚNG key cũ của trang
                 (vd 'tienganh_view_mode'). Không có key này thì chế độ xem
                 không được lưu (module vẫn chạy, mặc định Từng bài).
   * lessonKey:  key localStorage lưu bài học dở, ĐÚNG key cũ của trang
                 (vd 'tienganh_lesson'). Không có key này thì không có nút
                 "Học tiếp" và không lưu vị trí.
     groups:     mảng nhóm cho menu, dạng tienganh (id, KHÔNG dùng chỉ số):
                 [{label:'Chương 1: Nhà ở', pages:['bai1','bai2','bai3']},
                  ...]. Nhóm CHỈ để nhóm trong menu: không phải bài riêng,
                 không có nội dung riêng, không bấm được. Một chương bị mục
                 Tổng kết tách đôi thì khai báo 2 đoạn cùng label (vd lichsu
                 Chương 4: đoạn ['bai11'] rồi đoạn ['bai12','bai13']); module
                 bám trình tự pages nên tự tạo 2 optgroup cùng tên, KHÔNG
                 tự gom lại. Môn không chia chương thì nhóm tương đương:
                 nguvan theo Tập 1/Tập 2, tinhoc/hdtn theo Chủ đề, nghethuat
                 theo Âm nhạc/Mĩ thuật, tienganh/gdcd theo Học kì 1/Học kì 2.
                 Các mục Tổng kết KHÔNG đưa vào groups (module luôn để chúng
                 làm option/nút thường, đúng vị trí trình tự).
                 Chấp nhận tên thay thế: chapters (cùng định dạng).
     unit:       từ đơn vị, mặc định 'Bài'. tienganh: 'Unit'.
                 Chấp nhận tên thay thế: unitWord.
     shortLabels: mảng tên gọn cho nút ở chế độ Xem tất cả, song song với
                 pages. Mặc định: bài -> "<unit> <số thứ tự bài>" (vd "Bài 5",
                 "Unit 3"); Tổng kết -> labels gốc. Dùng khi tên gọn khác
                 quy tắc chung, vd dialy ("Bài mở đầu") hay nghethuat (lẫn
                 "Chủ đề" và "Bài").
     summaries:  mảng id các mục Tổng kết. Mặc định: mọi page mà labels của
                 nó chứa chữ "Tổng kết". Khai báo tường minh khi nhãn tổng
                 kết không chứa chữ đó.
     viewSingleValue: giá trị localStorage ứng với chế độ Từng bài, mặc định
                 'single'. tienganh khai 'unit' để giữ đúng giá trị cũ nó
                 vẫn ghi ('tienganh_view_mode' = 'unit'/'all'). Module đọc
                 cả 'single' lẫn 'unit' đều hiểu là Từng bài.
     elementIds: bản đồ id trang -> id thật của khối trong DOM, khi khác
                 nhau, vd {sum:'sumwrap'}. Giá trị có thể là chuỗi hoặc mảng.
     pageElements: bản đồ id trang -> mảng id các khối cùng hiện/ẩn với mục
                 đó, vd KHTN: {tongket_hk1:['tongket_hk1','tongket_hk1Card']}.
                 Nếu không khai, module tự tìm khối theo pages + elementIds
                 + quy tắc dự phòng ở mục 5.
     hashAliases: bản đồ hash cũ -> id trang, vd {tongket:'sumsec'}.
                 Mặc định: 'tongket' (nếu không phải id trang) trỏ tới mục
                 Tổng kết cuối cùng trong pages.
     modeLabels: {single:'📄 Theo từng Bài', all:'📚 Xem tất cả'}.
                 Mặc định single = '📄 Theo từng ' + unit.
     prevLabel:  mặc định '⬅ Bài trước' (đúng chữ tienganh và các môn đang
                 dùng). nextLabel: mặc định 'Bài sau ➡'.
     nextToSummaryLabel: mặc định '🏁 Sang Tổng kết ➡' (xem mục 6).
     mount:    (nâng cao, hiếm dùng) selector hoặc element để module chèn
                 viewctl vào TRƯỚC nó. Mặc định theo quy tắc mục 4.
     posFormat:  (tùy chọn, mặc định không đặt = nhãn chuẩn mục 6)
                 'semester': nhãn vị trí dạng "<unit> X/Y · Học kì N"
                 (Toán: "Bài X / 43 · Học kì N"); cần kèm semesterSplit =
                 số bài của Học kì 1 (Toán: 22). Các trang khác không khai
                 thì hành vi mặc định KHÔNG đổi.
     semesterSplit: xem posFormat ở trên.

   VÍ DỤ — trang Tiếng Anh (giữ đúng key cũ, chỉ thêm tên unit đã có sẵn
   trong labels và nhóm HK; select của tienganh cũ chỉ ghi "Unit 1" vì nó
   dùng SHORTLABELS, module này dùng labels nên option có tên):
     window.NAV_DATA = {
       pages: ['unit1','unit2','unit3','unit4','unit5','unit6','sumhk1',
               'unit7','unit8','unit9','unit10','unit11','unit12','sumhk2',
               'sumsec'],
       labels: ['Unit 1: My New School', … '🎓 Tổng kết Học kì 1',
                … '🎓 Tổng kết Học kì 2', '🏁 Tổng kết'],
       groups: [{label:'Học kì 1',
                 pages:['unit1','unit2','unit3','unit4','unit5','unit6']},
                {label:'Học kì 2',
                 pages:['unit7','unit8','unit9','unit10','unit11','unit12']}],
       unit: 'Unit',
       viewKey: 'tienganh_view_mode', viewSingleValue: 'unit',
       lessonKey: 'tienganh_lesson',
       summaries: ['sumhk1','sumhk2','sumsec']
     };
   VÍ DỤ — trang Lịch sử (chương 4 tách đôi, 2 đoạn cùng label):
     window.NAV_DATA = {
       pages: ['bai1', … 'bai11','tongket-hk1','bai12','bai13',
               … 'bai20','tongket-hk2','sum'],
       labels: ['Bài 1: Lịch sử và cuộc sống', …
                '🎓 Tổng kết Học kì 1', … '🏁 Tổng kết'],
       groups: [{label:'Chương 1: Vì sao phải học lịch sử',
                 pages:['bai1','bai2','bai3']},
                …
                {label:'Chương 4: Đông Nam Á từ những thế kỉ tiếp giáp đầu công nguyên đến thế kỉ X',
                 pages:['bai11']},
                {label:'Chương 4: Đông Nam Á từ những thế kỉ tiếp giáp đầu công nguyên đến thế kỉ X',
                 pages:['bai12','bai13']},
                …],
       viewKey: 'lichsu_view_mode', lessonKey: 'lichsu_lesson',
       elementIds: {sum:'sumwrap'}
     };

   --------------------------------------------------------------------------
   3) MODULE TỰ XÂY NHỮNG GÌ (khung viewctl, 2 hàng — theo mô tả chuẩn)
   --------------------------------------------------------------------------
   <div class="viewctl navctl" role="navigation" aria-label="Chọn cách xem">
     <div class="vmrow">           <!-- hàng 1: chế độ xem -->
       <span class="vlabel">👀 Chế độ xem:</span>
       <button class="vmbtn" data-navmode="single">📄 Theo từng Bài</button>
       <button class="vmbtn" data-navmode="all">📚 Xem tất cả</button>
     </div>
     <div class="vmrow vmrow-nav">  <!-- hàng 2: điều hướng -->
       [nút resume xanh, chỉ khi có bài học dở — xem mục 7]
       <select class="bai-sel" aria-label="Chọn bài">…optgroup chương…</select>
       <button class="navbtn nav-prev">⬅ Bài trước</button>
       <span class="vpos"></span>
       <button class="navbtn nav-next">Bài sau ➡</button>
     </div>
     <div class="pickrow nav-pickrow"> <!-- chỉ hiện ở chế độ Xem tất cả -->
       <div class="pick-group">Tên chương/nhóm</div><button class="pick">…</button>…
     </div>
   </div>
   Class dùng đúng class đã có trong assets/common.css (.viewctl, .vmrow,
   .vmbtn, .bai-sel, .navbtn, .vpos, .pickrow, .pick, .pick-group) cộng 2
   class mới cũng nằm trong common.css: .navctl (đánh dấu khung do module
   xây, để không xây 2 lần) và .nav-resume (nút Học tiếp). Module KHÔNG tự
   đặt cỡ nút mới; cỡ nút lấy từ common.css.

   --------------------------------------------------------------------------
   4) ĐIỂM CHÈN (bám vị trí viewbar của tienganh)
   --------------------------------------------------------------------------
   Trong tienganh/index.html, thanh menu nằm sau các dòng .sub (và sau
   .topmenu), TRƯỚC khối .part đầu tiên ("Phần 1 — Học tập"). Module chèn
   viewctl theo đúng quy tắc đó, theo thứ tự ưu tiên:
     1) TRƯỚC khối .part đầu tiên trong body (nếu có);
     2) nếu không có .part: TRƯỚC khối bài đầu tiên (phần tử có id = pages[0]);
     3) nếu không có cả hai: sau thẻ <h1> đầu tiên;
     4) nếu không có <h1>: đầu <body>.
   NAV_DATA.mount (selector/element) thắng mọi quy tắc trên khi được khai.
   Lưu ý: ở các môn khác, menu cũ nằm SAU .part đầu tiên; sau di chuyển,
   menu chuẩn sẽ nằm TRƯỚC .part đầu tiên như tienganh (thống nhất 1 kiểu).

   --------------------------------------------------------------------------
   5) KHỐI BÀI HIỆN/ẨN — TÌM KHỐI THEO ID NHƯ THẾ NÀO
   --------------------------------------------------------------------------
   Với mỗi id trong pages, module tìm các khối để hiện/ẩn theo thứ tự:
   pageElements[id] (nếu khai) -> elementIds[id] (nếu khai) -> chính id đó
   -> dự phòng: 'sum' thử thêm 'sumwrap'; 'tongket' thử thêm 'tongket-wrap'
   rồi 'sumwrap'. Khối không tìm thấy thì mục đó vẫn chọn được trên menu
   (select/nhãn cập nhật) nhưng không có gì để hiện — và module ghi
   console.warn 1 lần để đợt di chuyển sửa NAV_DATA. Module đặt cả class
   'cur' (như code cũ) VÀ style.display trực tiếp (mục hiện: '', mục khác:
   'none'), nên logic chạy độc lập với CSS: thiếu common.css thì menu vẫn
   hoạt động, chỉ xấu đi.

   --------------------------------------------------------------------------
   6) HÀNH VI SAO TỪ CODE TIENGANH (giữ nguyên logic, chỉ thay từ đơn vị)
   --------------------------------------------------------------------------
   - Chế độ Từng bài là mặc định khi chưa có lựa chọn lưu trước; chế độ xem
     lưu vào viewKey và khôi phục khi quay lại. Giá trị đơn ('unit' của
     tienganh) được đọc như Từng bài, và khi ghi lại module ghi đúng
     viewSingleValue đã khai (tienganh ghi 'unit', các môn khác ghi
     'single') để code cũ (nếu còn sót) vẫn hiểu.
   - Nhãn vị trí: bài -> "<unit> X/Y – tên bài" (X = SỐ BÀI GỐC như trong
    select, lấy từ nhãn "Bài N: …"/"Chủ đề N: …" — KHÔNG đếm thứ tự, để
    dialy Bài mở đầu hiện "Bài 0/31" chứ không phải "Bài 1/31" và Mĩ thuật
    Bài 1 hiện "Bài 1/24" chứ không phải "Bài 9/24"; không tách được số
    thì dùng số thứ tự; với tienganh/khtn/lichsu/toan số gốc = số thứ tự
    nên công thức không đổi so với code tienganh; Y = tổng số bài, KHÔNG
    tính Tổng kết; tên bài = phần sau ": " đầu tiên trong labels);
    Tổng kết -> labels gốc bỏ token emoji đầu nếu có
    (vd "🎓 Tổng kết Học kì 1" -> "Tổng kết Học kì 1"). Trừ khi trang khai
    posFormat:'semester' (xem mục 2) thì nhãn là "<unit> X/Y · Học kì N"
    theo semesterSplit (X cũng là số gốc). LƯU Ý: mô tả brief
    "Unit 1 (1/7)" KHÔNG khớp code tienganh thật — code thật trả
    "Unit 1/12 – My New School"; module theo code thật.
   - Nút Trước/Sau đi ĐÚNG trình tự pages, ĐI QUA CẢ các mục Tổng kết,
     disable ở 2 đầu. Nhãn (đúng code tienganh): Trước mặc định
     "⬅ Bài trước", nhưng ở trang cuối ghi "⬅ " + labels của mục trước
     (kèm emoji nếu có); Sau mặc định "Bài sau ➡", nhưng ở trang áp cuối
     ghi "🏁 Sang Tổng kết ➡" (code tienganh gắn nhãn này khi mục tiếp theo
     là mục cuối cùng, bất kể mục cuối có phải Tổng kết hay không — module
     giữ nguyên điều kiện đó).
   - Link "✔ Xong Bài" (a.next): module chặn click, không để trình duyệt
     nhảy neo mặc định; đi tới đúng mục trong pages (kể cả qua Tổng kết).
     Khác code tienganh 1 điểm nhỏ: tienganh bỏ qua (return) khi đang ở chế
     độ Xem tất cả; module vẫn chuyển về Từng bài rồi tới mục đó, vì link
     Xong Bài nằm trong khối bài vốn đã ẩn ở chế độ Xem tất cả nên trường
     hợp này thực tế không bấm được.
   - Hash: lúc tải trang, #<id> mở đúng mục đó (hash thắng vị trí mặc định
     nhưng KHÔNG thắng nút Học tiếp: nút Học tiếp vẫn hiện nếu bài học dở
     khác mục đang mở, đúng cơ chế resume của ux-p0 — resume chỉ nhảy khi
     bấm, không tự nhảy).
   - Chế độ Xem tất cả: tienganh ĐÃ là danh sách chỉ mục (không xổ nội dung
     bài): các nút .pick (bài ghi tên gọn, Tổng kết ghi tên) kèm tiêu đề
     nhóm .pick-group phía trên từng nhóm; bấm nút nào thì về chế độ Từng
     bài tại đúng mục đó và cuộn lên đầu. Module giữ nguyên dạng này, KHÔNG
     xổ nội dung. Ở chế độ này toàn bộ khối bài bị ẩn (display:none) và
     hàng điều hướng (hàng 2) bị ẩn, chỉ hiện danh sách.

   --------------------------------------------------------------------------
   7) NÚT "HỌC TIẾP" (resume xanh) — CƠ CHẾ CỦA assets/ux-p0.js
   --------------------------------------------------------------------------
   Nút này KHÔNG nằm trong code menu của tienganh/index.html mà do
   assets/ux-p0.js tạo (nút .ux-resume xanh, chèn trước ô select, đọc key
   "<slug>_lesson" với slug = tên thư mục môn). Module hợp nhất cơ chế đó
   vào hàng 2 (class .nav-resume, style trong common.css):
   - Đọc lessonKey; giá trị cũ được chấp nhận ở mọi dạng từng tồn tại:
     id trang ('bai5'), chỉ số ('5' — dạng toan6_lesson), nhãn gọn có/không
     tiền tố 't' của select cũ ('tBài 5', 'Bài 5'), nhãn đầy đủ ('Bài 5: …')
     và dạng nút #pickrow cũ của HĐTN (text nút). Nhờ vậy KHÔNG mất vị trí
     học dở khi đổi định dạng lưu.
   - Chỉ hiện nút khi bài học dở KHÁC mục đang mở; chữ nút là
     "▶ Học tiếp: " + tên gọn của bài đó (vd "▶ Học tiếp: Unit 3" — tên gọn
     này lấy từ shortLabels hoặc quy tắc mặc định, KHÔNG phải nhãn đầy đủ).
   - Bấm nút: về Từng bài tại bài đó, cuộn lên đầu, rồi nút tự biến mất
     (đúng ux-p0). Từ đó trở đi, mỗi lần chuyển bài module GHI ĐÈ lessonKey
     bằng id trang (dạng mới, sạch); module vẫn đọc được dạng cũ nên học
     sinh cũ không bị mất vị trí, nhưng đợt di chuyển PHẢI gỡ thẻ nạp
     ux-p0.js khỏi trang (nếu còn, ux-p0 sẽ không hiểu id mới và chỉ im
     lặng không hiện nút — không crash, không nhảy sai — nhưng sẽ thừa).
   - Chỉ lưu khi người dùng CHUYỂN bài (select/Trước/Sau/nút chỉ mục/Xong
     Bài/Học tiếp); lần tải trang đầu tiên KHÔNG ghi đè, để không tạo
     resume giả trỏ về bài 1 cho học sinh chưa từng chuyển bài.

   --------------------------------------------------------------------------
   8) CHƯƠNG TÁCH ĐÔI VÀ TRÌNH TỰ HỌC KÌ KHÔNG LIÊN TỤC
   --------------------------------------------------------------------------
   - Module KHÔNG BAO GIỜ tự sắp xếp lại pages: mọi vòng lặp đi đúng thứ tự
     pages trang khai báo. Vì vậy KHTN (HK1 gồm bai1–11, bai18, bai40 rồi
     mới Tổng kết HK1 theo NỘI DUNG deck, còn trình tự menu là pages khai
     báo) hay lichsu đều an toàn: thứ tự hiển thị = thứ tự pages.
   - Nhóm chương được tính theo TRÌNH TỰ: đi dọc pages, gặp bài thuộc nhóm
     thì mở optgroup (select) / chèn tiêu đề .pick-group (danh sách); gặp
     mục không thuộc nhóm nào (Tổng kết) thì đóng nhóm đang mở. Nhờ vậy
     cùng 1 label chương xuất hiện thành 2 optgroup/2 tiêu đề khi bị Tổng
     kết tách đôi, và 2 nhóm khác nhau không bao giờ bị gộp chung.
   - Một bài chỉ thuộc nhóm ĐẦU TIÊN khai chứa nó (nếu khai trùng); bài
     không thuộc nhóm nào vẫn là option/nút thường đúng vị trí.

   --------------------------------------------------------------------------
   9) KHÔNG PHÁ CHỨC NĂNG SẴN CÓ
   --------------------------------------------------------------------------
   - Toàn bộ code bọc trong 1 IIFE, không tạo biến/hàm toàn cục nào ngoài
     việc ĐỌC window.NAV_DATA; không ghi đè, không dùng tên showPage,
     PAGES, PLABELS, vmode, curPage hay bất kỳ tên nào code cũ của trang
     từng dùng. Tên nội bộ đều có tiền tố navChuan.
   - Module chỉ gắn sự kiện vào khung viewctl do chính nó xây và vào các
     link a.next; không chạm vào script flashcard/quiz/nghe đọc của trang.
   - Nếu NAV_DATA thiếu hoặc sai (không có pages/labels, độ dài lệch nhau,
     không tìm thấy khối bài nào), module chỉ console.warn và dừng, trang
     vẫn hiện đủ nội dung (không có menu) thay vì vỡ trang.
   - Logic độc lập với CSS: thiếu common.css (trường hợp Toán — xem mục 10)
     thì menu vẫn chạy đủ chức năng, chỉ hiển thị thô.

   --------------------------------------------------------------------------
   10) HÀM TRANG KHÁC ĐƯỢC GỌI (không bắt buộc, chỉ để gỡ lỗi/di chuyển)
   --------------------------------------------------------------------------
   window.NAV_CHUAN = { goTo(index, scroll), current(), mode(), data() }.
   goTo(i): chuyển tới mục thứ i trong pages (0-based, tự kẹp biên, tự về
   chế độ Từng bài). current(): chỉ số mục đang mở. mode(): 'single'|'all'.
   data(): trả về bản sao NAV_DATA đã chuẩn hóa (chỉ đọc, không sửa).
   Các trang bình thường KHÔNG cần gọi gì cả.

   --------------------------------------------------------------------------
   11) TOÁN — NGOẠI LỆ DUY NHẤT VỀ STYLE (đợt di chuyển xử lý)
   --------------------------------------------------------------------------
   Trang Toán không nạp common.css, nên không thể lấy style viewctl từ
   common.css mà không phá style của app Toán. Đợt di chuyển sẽ giữ style
   viewctl TỐI THIỂU scoped trong trang Toán nếu buộc phải có, và liệt kê
   rõ đó là ngoại lệ duy nhất kèm lý do này. Module không bắt buộc trang
   phải nạp common.css mới chạy (xem mục 9).
   ========================================================================== */
(function () {
  'use strict';

  var D = window.NAV_DATA;
  if (!D || !D.pages || !D.labels ||
      D.pages.length !== D.labels.length || D.pages.length === 0) {
    if (window.console && console.warn) {
      console.warn('[nav-chuan] NAV_DATA thieu hoac sai (pages/labels). ' +
        'Menu khong duoc xay; trang van hien noi dung.');
    }
    return;
  }
  if (document.querySelector('.navctl')) return; /* tranh xay 2 lan */

  /* ---------- Chuẩn hóa dữ liệu ---------- */
  var navPages = D.pages.slice();
  var navLabels = D.labels.slice();
  var navUnit = D.unit || D.unitWord || 'Bài';
  var navGroups = D.groups || D.chapters || [];
  var navViewKey = D.viewKey || null;
  var navViewSingle = D.viewSingleValue || 'single';
  var navLessonKey = D.lessonKey || null;
  var navSummaries = D.summaries || null;
  var navShortLabels = D.shortLabels || null;
  var navElementIds = D.elementIds || {};
  var navPageElementsMap = D.pageElements || {};
  var navHashAliases = D.hashAliases || {};
  var navModeLabels = D.modeLabels || {};
  var navPrevLabel = D.prevLabel || '⬅ Bài trước';
  var navNextLabel = D.nextLabel || 'Bài sau ➡';
  var navNextToSummary = D.nextToSummaryLabel || '🏁 Sang Tổng kết ➡';
  var navPosFormat = D.posFormat || null;
  var navSemesterSplit = D.semesterSplit || 0;
  var navSingleLabel = navModeLabels.single || ('📄 Theo từng ' + navUnit);
  var navAllLabel = navModeLabels.all || '📚 Xem tất cả';

  var pageIndexOf = {};
  navPages.forEach(function (id, i) { if (!(id in pageIndexOf)) pageIndexOf[id] = i; });

  function navIsSummary(i) {
    if (navSummaries) return navSummaries.indexOf(navPages[i]) >= 0;
    return navLabels[i].indexOf('Tổng kết') >= 0;
  }
  var navLessonTotal = 0;
  navPages.forEach(function (_, i) { if (!navIsSummary(i)) navLessonTotal++; });

  function navLessonOrdinal(i) {
    var n = 0, k;
    for (k = 0; k <= i; k++) { if (!navIsSummary(k)) n++; }
    return n;
  }
  /* Bỏ token emoji đầu của nhãn Tổng kết (tienganh: "🎓 Tổng kết…" -> "Tổng kết…").
     Nhãn không có emoji thì giữ nguyên (tránh lỗi slice(1) của code cũ ăn mất
     chữ đầu, vd "Tổng kết Học kì 1" mà slice thì thành "kết Học kì 1"). */
  function navCleanSummaryLabel(lb) {
    var parts = lb.split(' ');
    if (parts.length > 1 && /^[^A-Za-z0-9À-ỹ]/.test(parts[0])) {
      return parts.slice(1).join(' ');
    }
    return lb;
  }
  /* Số bài/unit GỐC như trong select (không đếm thứ tự): nhãn "Bài 0: …"
     -> Bài 0 (dialy Bài mở đầu, không phải Bài 1/31); "Bài 1: …" ở Mĩ thuật
     -> Bài 1 (không phải Bài 9/24); "Chủ đề 1: …" -> Chủ đề 1. Với các môn
     đánh số liên tục (tienganh, khtn, lichsu, toan) số gốc = số thứ tự nên
     kết quả không đổi. Không tách được số thì trả null để dùng số thứ tự. */
  function navLabelNum(i) {
    var m = navLabels[i].match(/^([^\d:]+?)\s*(\d+)\s*[:.]/);
    if (m) return { unit: m[1].replace(/\s+$/, ''), num: parseInt(m[2], 10) };
    return null;
  }
  function navShortLabel(i) {
    if (navShortLabels && navShortLabels[i]) return navShortLabels[i];
    if (navIsSummary(i)) return navLabels[i];
    var ln = navLabelNum(i);
    if (ln) return ln.unit + ' ' + ln.num;
    return navUnit + ' ' + navLessonOrdinal(i);
  }
  /* Tên bài sau ": " đầu tiên (tienganh posText); không có ": " thì bỏ tiền
     tố "<unit> N" nếu có, còn lại giữ nguyên; rỗng thì posText bỏ hậu tố. */
  function navLessonName(i) {
    var lb = navLabels[i], cut = lb.indexOf(': ');
    if (cut >= 0) return lb.slice(cut + 2);
    var stripped = lb.replace(/^(Bài|Unit|Chủ đề)\s*\d+\s*[:.]\s*/, '');
    return stripped === lb ? lb : stripped;
  }
  function navPosText(i) {
    if (navIsSummary(i)) return navCleanSummaryLabel(navLabels[i]);
    var ln = navLabelNum(i);
    var dispUnit = ln ? ln.unit : navUnit;
    var dispNum = ln ? ln.num : navLessonOrdinal(i);
    if (navPosFormat === 'semester' && navSemesterSplit > 0) {
      return dispUnit + ' ' + dispNum + ' / ' + navLessonTotal +
        ' · Học kì ' + (navLessonOrdinal(i) <= navSemesterSplit ? 1 : 2);
    }
    var nm = navLessonName(i);
    var base = dispUnit + ' ' + dispNum + '/' + navLessonTotal;
    return nm ? (base + ' – ' + nm) : base;
  }

  /* Nhóm của 1 mục: id trang -> label nhóm (bài thuộc nhóm đầu tiên khai
     chứa nó; Tổng kết không bao giờ thuộc nhóm nào). */
  var navGroupOf = {};
  navGroups.forEach(function (g) {
    if (!g || !g.pages) return;
    g.pages.forEach(function (id) {
      var ix = pageIndexOf[id];
      if (typeof ix === 'number' && !navIsSummary(ix) && !(ix in navGroupOf)) {
        navGroupOf[ix] = g.label;
      }
    });
  });

  /* ---------- localStorage (đọc đúng key cũ, không đổi tên) ---------- */
  function navLsGet(k) {
    if (!k) return null;
    try { return window.localStorage.getItem(k); } catch (e) { return null; }
  }
  function navLsSet(k, v) {
    if (!k) return;
    try { window.localStorage.setItem(k, v); } catch (e) {}
  }

  var navMode = 'single';
  (function () {
    var sv = navLsGet(navViewKey);
    if (sv === 'all') navMode = 'all';
    else navMode = 'single'; /* 'single', 'unit', null, giá trị lạ -> Từng bài */
  })();

  /* ---------- Tìm khối bài trong DOM ---------- */
  function navPageElements(i) {
    var id = navPages[i], ids = [], out = [], k, el;
    if (navPageElementsMap[id]) {
      ids = navPageElementsMap[id].slice();
    } else if (navElementIds[id]) {
      ids = (typeof navElementIds[id] === 'string') ?
        [navElementIds[id]] : navElementIds[id].slice();
    } else {
      ids = [id];
      if (id === 'sum') ids.push('sumwrap');
      if (id === 'tongket') { ids.push('tongket-wrap'); ids.push('sumwrap'); }
    }
    for (k = 0; k < ids.length; k++) {
      el = document.getElementById(ids[k]);
      if (el && out.indexOf(el) < 0) out.push(el);
    }
    return out;
  }

  /* ---------- Giải mã hash / giá trị lesson cũ thành chỉ số trang ---------- */
  function navResolveHash(raw) {
    if (!raw) return -1;
    var id = raw;
    try { id = decodeURIComponent(id); } catch (e) {}
    if (id in pageIndexOf) return pageIndexOf[id];
    if (id in navHashAliases && navHashAliases[id] in pageIndexOf) {
      return pageIndexOf[navHashAliases[id]];
    }
    if (id === 'tongket') {
      /* Mặc định: hash #tongket cũ trỏ tới mục Tổng kết cuối cùng. */
      var last = -1, i;
      for (i = navPages.length - 1; i >= 0; i--) {
        if (navIsSummary(i)) { last = i; break; }
      }
      if (last >= 0) return last;
    }
    return -1;
  }
  function navResolveStoredLesson(val) {
    if (val === null || val === undefined || val === '') return -1;
    if (val in pageIndexOf) return pageIndexOf[val];
    /* Dạng chỉ số (toan6_lesson) — chỉ khi toàn là số và trong biên. */
    if (/^\d+$/.test(val)) {
      var n = parseInt(val, 10);
      if (n >= 0 && n < navPages.length) return n;
    }
    /* Dạng cũ của select / nút #pickrow: nhãn gọn, nhãn đầy đủ, có hoặc
       không có tiền tố 't' (keyOf của script v2 cũ). */
    var i, cands;
    for (i = 0; i < navPages.length; i++) {
      cands = [navShortLabel(i), navLabels[i], navCleanSummaryLabel(navLabels[i])];
      if (cands.indexOf(val) >= 0 || cands.indexOf(val.replace(/^t/, '')) >= 0 ||
          ('t' + navShortLabel(i)) === val || ('t' + navLabels[i]) === val) {
        return i;
      }
    }
    return -1;
  }

  /* ---------- Trạng thái ban đầu: hash thắng, còn lại bài đầu; resume không tự nhảy ---------- */
  var navCur = 0;
  (function () {
    var h = (window.location.hash || '').replace(/^#/, '');
    var ix = navResolveHash(h);
    if (ix >= 0) navCur = ix;
  })();
  var navResumeIndex = navResolveStoredLesson(navLsGet(navLessonKey));

  /* ---------- Xây DOM viewctl ---------- */
  function navEl(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }

  var navCtl = navEl('div', 'viewctl navctl');
  navCtl.setAttribute('role', 'navigation');
  navCtl.setAttribute('aria-label', 'Chọn cách xem');

  var navRowModes = navEl('div', 'vmrow');
  navRowModes.appendChild(navEl('span', 'vlabel', '👀 Chế độ xem:'));
  var navBtnSingle = navEl('button', 'vmbtn', navSingleLabel);
  navBtnSingle.type = 'button';
  navBtnSingle.setAttribute('data-navmode', navViewSingle);
  var navBtnAll = navEl('button', 'vmbtn', navAllLabel);
  navBtnAll.type = 'button';
  navBtnAll.setAttribute('data-navmode', 'all');
  navRowModes.appendChild(navBtnSingle);
  navRowModes.appendChild(navBtnAll);
  navCtl.appendChild(navRowModes);

  var navRowNav = navEl('div', 'vmrow vmrow-nav');
  var navResumeBtn = null;
  if (navResumeIndex >= 0 && navResumeIndex !== navCur) {
    navResumeBtn = navEl('button', 'nav-resume',
      '▶ Học tiếp: ' + navShortLabel(navResumeIndex));
    navResumeBtn.type = 'button';
    navRowNav.appendChild(navResumeBtn);
  }
  var navSel = navEl('select', 'bai-sel');
  navSel.setAttribute('aria-label', 'Chọn bài');
  /* Cờ chặn ux-p0.js gom lại select (cách đội viewbar cũ đã dùng): các trang
     đã chuyển đều đã gỡ thẻ ux-p0 nên cờ này chỉ phòng thủ khi thẻ còn sót. */
  navSel.dataset.uxGrouped = '1';
  (function () {
    var curGroup = null, curGroupLabel = null, curGroupOpen = false, i, o, g;
    for (i = 0; i < navPages.length; i++) {
      o = document.createElement('option');
      o.value = navPages[i];
      o.textContent = navLabels[i];
      g = navGroupOf[i];
      if (g) {
        /* Mở optgroup mới khi khác nhóm đang mở — kể cả cùng label với
           nhóm trước đó nhưng đã bị Tổng kết tách đôi: bám trình tự.
           (So sánh theo LABEL chuong, khong so element optgroup voi chuoi.) */
        if (!curGroupOpen || curGroupLabel !== g) {
          curGroup = document.createElement('optgroup');
          curGroup.label = g;
          curGroupLabel = g;
          navSel.appendChild(curGroup);
          curGroupOpen = true;
        }
        curGroup.appendChild(o);
      } else {
        curGroup = null;
        curGroupLabel = null;
        curGroupOpen = false;
        navSel.appendChild(o);
      }
    }
  })();
  navRowNav.appendChild(navSel);

  var navPrevBtn = navEl('button', 'navbtn nav-prev', navPrevLabel);
  navPrevBtn.type = 'button';
  var navPos = navEl('span', 'vpos');
  var navNextBtn = navEl('button', 'navbtn nav-next', navNextLabel);
  navNextBtn.type = 'button';
  navRowNav.appendChild(navPrevBtn);
  navRowNav.appendChild(navPos);
  navRowNav.appendChild(navNextBtn);
  navCtl.appendChild(navRowNav);

  var navPickrow = navEl('div', 'pickrow nav-pickrow');
  var navPickBtns = [];
  (function () {
    var curGroup = null, curGroupOpen = false, i, g, h, b;
    for (i = 0; i < navPages.length; i++) {
      g = navGroupOf[i];
      if (g) {
        if (!curGroupOpen || curGroup !== g) {
          h = navEl('div', 'pick-group', g);
          h.setAttribute('aria-hidden', 'true');
          navPickrow.appendChild(h);
          curGroup = g;
          curGroupOpen = true;
        }
      } else {
        curGroup = null;
        curGroupOpen = false;
      }
      b = navEl('button', 'pick', navShortLabel(i));
      b.type = 'button';
      (function (ix, btn) {
        btn.addEventListener('click', function () { navGoTo(ix, true, true); });
      })(i, b);
      navPickBtns.push(b);
      navPickrow.appendChild(b);
    }
  })();
  navCtl.appendChild(navPickrow);

  /* ---------- Điểm chèn: trước .part đầu tiên (vị trí của tienganh) ---------- */
  function navMount() {
    var anchor = null, afterH1 = false;
    if (D.mount) {
      anchor = (typeof D.mount === 'string') ?
        document.querySelector(D.mount) : D.mount;
    }
    if (!anchor) anchor = document.querySelector('.part');
    if (!anchor) {
      var firstEls = navPageElements(0);
      if (firstEls.length) anchor = firstEls[0];
    }
    if (!anchor) { anchor = document.querySelector('h1'); afterH1 = !!anchor; }
    if (anchor && anchor.parentNode) {
      /* h1 là fallback: menu nằm SAU h1; các anchor khác: menu nằm TRƯỚC. */
      anchor.parentNode.insertBefore(navCtl,
        afterH1 ? anchor.nextSibling : anchor);
    } else if (document.body) {
      document.body.insertBefore(navCtl, document.body.firstChild);
    }
  }

  /* ---------- Hiện/ẩn + đồng bộ menu ---------- */
  function navApplyMode() {
    document.body.classList.toggle('mode-single', navMode === 'single');
    document.body.classList.toggle('mode-all', navMode === 'all');
    navBtnSingle.classList.toggle('on', navMode === 'single');
    navBtnAll.classList.toggle('on', navMode === 'all');
    navRowNav.style.display = (navMode === 'all') ? 'none' : '';
    navPickrow.style.display = (navMode === 'all') ? '' : 'none';
    if (navMode === 'all') {
      navPages.forEach(function (_, j) {
        navPageElements(j).forEach(function (el) { el.style.display = 'none'; });
      });
    }
    navPickBtns.forEach(function (b, j) {
      b.classList.toggle('on', j === navCur);
    });
  }
  function navRender(scroll) {
    var i, els;
    for (i = 0; i < navPages.length; i++) {
      els = navPageElements(i);
      els.forEach(function (el) {
        el.classList.toggle('cur', i === navCur);
        if (navMode === 'single') el.style.display = (i === navCur) ? '' : 'none';
      });
    }
    navPickBtns.forEach(function (b, j) {
      b.classList.toggle('on', j === navCur);
    });
    if (navSel.value !== navPages[navCur]) navSel.value = navPages[navCur];
    navPrevBtn.disabled = (navCur === 0);
    navNextBtn.disabled = (navCur === navPages.length - 1);
    navPrevBtn.textContent = (navCur === navPages.length - 1 && navCur > 0) ?
      ('⬅ ' + navLabels[navCur - 1]) : navPrevLabel;
    navNextBtn.textContent = (navCur === navPages.length - 2) ?
      navNextToSummary : navNextLabel;
    navPos.textContent = navPosText(navCur);
    if (scroll) {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); }
      catch (e) { window.scrollTo(0, 0); }
    }
  }
  function navSetMode(m, scroll) {
    navMode = m;
    navLsSet(navViewKey, m === 'all' ? 'all' : navViewSingle);
    navApplyMode();
    if (m === 'single') navRender(scroll);
  }
  /* goTo: chuyển bài do người dùng bấm. Luôn về Từng bài trước (như nút
     .pick của tienganh), lưu bài vào lessonKey, cuộn lên đầu nếu scroll. */
  function navGoTo(i, scroll, save) {
    var ix = Math.max(0, Math.min(navPages.length - 1, i));
    if (navMode === 'all') navSetMode('single', false);
    navCur = ix;
    if (save) navLsSet(navLessonKey, navPages[navCur]);
    navRender(scroll);
  }

  /* ---------- Sự kiện (chỉ trên khung do module xây + link a.next) ---------- */
  navBtnSingle.addEventListener('click', function () {
    navSetMode('single', true);
  });
  navBtnAll.addEventListener('click', function () {
    navSetMode('all', false);
  });
  navPrevBtn.addEventListener('click', function () { navGoTo(navCur - 1, true, true); });
  navNextBtn.addEventListener('click', function () { navGoTo(navCur + 1, true, true); });
  navSel.addEventListener('change', function () {
    var ix = pageIndexOf[navSel.value];
    if (typeof ix === 'number') navGoTo(ix, true, true);
  });
  if (navResumeBtn) {
    navResumeBtn.addEventListener('click', function () {
      var ix = navResumeIndex;
      navGoTo(ix, true, true);
      if (navResumeBtn.parentNode) navResumeBtn.parentNode.removeChild(navResumeBtn);
      navResumeBtn = null;
    });
  }
  document.querySelectorAll('a.next').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href') || '';
      var id = href.replace(/^#/, '');
      var ix = navResolveHash(id);
      if (ix >= 0) {
        e.preventDefault();
        navGoTo(ix, true, true);
      }
      /* href lạ: để trình duyệt xử lý mặc định như cũ. */
    });
  });

  /* ---------- Khởi động ---------- */
  function navInit() {
    navMount();
    navApplyMode();
    if (navMode === 'single') {
      /* Lần tải đầu KHÔNG lưu lessonKey (xem mục 7 tài liệu đầu file). */
      navRender(false);
    }
    var missing = [];
    navPages.forEach(function (_, i) {
      if (!navPageElements(i).length) missing.push(navPages[i]);
    });
    if (missing.length && window.console && console.warn) {
      console.warn('[nav-chuan] Khong tim thay khoi bai cho: ' + missing.join(', '));
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', navInit);
  } else {
    navInit();
  }

  /* API tùy chọn cho trang khác / gỡ lỗi (không bắt buộc dùng). */
  window.NAV_CHUAN = {
    goTo: function (i, scroll) { navGoTo(i, !!scroll, true); },
    current: function () { return navCur; },
    mode: function () { return navMode; },
    data: function () {
      return {
        pages: navPages.slice(), labels: navLabels.slice(),
        unit: navUnit, lessonTotal: navLessonTotal
      };
    }
  };
})();
