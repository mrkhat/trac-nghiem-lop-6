// Bo sinh de ngau nhien Toan 6 HK1 — moi lan goi tra ve 1 de moi (so lieu ngau nhien)
// Moi ham gen(lvl) tra ve object cung cau truc voi problems.json. lvl: 1=De, 2=Vua, 3=Kho
(function(){
function R(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function gcd(a,b){return b?gcd(b,a%b):a;}
function lcm(a,b){return a*b/gcd(a,b);}
function fmt(n){return (''+n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
function sup(n){return (''+n).replace('2','²').replace('3','³');}

const T={
mixedCalc:{chapter:1,topic:'Thứ tự thực hiện phép tính',gen(l){
  const mx=l===1?9:(l===2?15:25);
  const a=R(3,mx),b=R(3,9),d=R(2,9),q=R(2,9),c=d*q,ab=a*b,e=R(4,Math.min(30,ab+q-2)),ans=ab+q-e;
  const ex=`${a} × ${b} + ${c} : ${d} − ${e}`;
  return{title:'Tính giá trị biểu thức',text:`Tính giá trị của biểu thức:\n${ex}`,
   analysis:{given:['Biểu thức có nhân, chia, cộng, trừ và không có dấu ngoặc'],ask:'Tính giá trị của biểu thức',plan:'Làm phép nhân và chia trước (từ trái sang phải), sau đó cộng và trừ.'},
   hint:`Tính trước: ${a} × ${b} = ${ab} và ${c} : ${d} = ${q}.`,
   theory:'Thứ tự thực hiện phép tính (không có dấu ngoặc): lũy thừa → nhân và chia (từ trái sang phải) → cộng và trừ.',
   kw:[{t:'Tính giá trị của biểu thức',type:'ask',why:'Điều cần tìm: kết quả cuối cùng của biểu thức.'},{t:ex,type:'data',why:'Số liệu đề cho: biểu thức có cả nhân, chia, cộng, trừ — phải làm nhân/chia trước.'}],
   parts:[{label:'Kết quả',answer:''+ans,unit:''}],
   solution:[`${a} × ${b} + ${c} : ${d} − ${e} = ${ab} + ${q} − ${e}`,`= ${ab+q} − ${e} = ${ans}`]};
}},
powerCalc:{chapter:1,topic:'Lũy thừa',gen(l){
  const base=R(2,l===1?4:6),ex=R(2,3),k=R(2,9),b2=R(2,5);
  const pw=Math.pow(base,ex),sq=b2*b2,ans=pw*k+sq;
  const exs=`${base}${sup(ex)} × ${k} + ${b2}²`;
  return{title:'Tính biểu thức có lũy thừa',text:`Tính giá trị của biểu thức:\n${exs}`,
   analysis:{given:[`${base}${sup(ex)} là lũy thừa: ${ex} thừa số ${base} nhân với nhau; ${b2}² = ${b2} × ${b2}`],ask:'Tính giá trị của biểu thức',plan:'Tính các lũy thừa trước, rồi làm phép nhân, cuối cùng là phép cộng.'},
   hint:`${base}${sup(ex)} = ${pw} và ${b2}² = ${sq}.`,
   theory:'Lũy thừa aⁿ là tích của n thừa số bằng nhau, mỗi thừa số bằng a. Khi tính biểu thức: tính lũy thừa trước, rồi nhân/chia, rồi cộng/trừ.',
   kw:[{t:'Tính giá trị của biểu thức',type:'ask',why:'Điều cần tìm: kết quả cuối cùng của biểu thức.'},{t:exs,type:'data',why:'Số liệu đề cho: có lũy thừa — tính lũy thừa trước tiên.'}],
   parts:[{label:'Kết quả',answer:''+ans,unit:''}],
   solution:[`${base}${sup(ex)} = ${pw};  ${b2}² = ${sq}`,`${exs} = ${pw} × ${k} + ${sq} = ${pw*k} + ${sq} = ${ans}`]};
}},
findX:{chapter:1,topic:'Tìm số chưa biết',gen(l){
  const a=R(2,9),x=R(3,l===1?12:(l===2?20:30)),b=R(3,40),c=a*x+b;
  const ex=`${a} × x + ${b} = ${c}`;
  return{title:'Tìm x',text:`Tìm số tự nhiên x, biết:\n${ex}`,
   analysis:{given:[ex],ask:'Tìm giá trị của x',plan:`Coi ${a} × x là số hạng chưa biết: ${a} × x = ${c} − ${b}. Sau đó x = kết quả : ${a}.`},
   hint:`${a} × x = ${c} − ${b} = ${c-b}.`,
   theory:'Cách tìm thành phần chưa biết: muốn tìm số hạng, lấy tổng trừ số hạng đã biết; muốn tìm thừa số, lấy tích chia cho thừa số đã biết.',
   kw:[{t:'Tìm số tự nhiên x',type:'ask',why:'Điều cần tìm: giá trị của x.'},{t:ex,type:'data',why:`Đề cho: đẳng thức chứa x. Coi ${a} × x là một số hạng chưa biết.`}],
   parts:[{label:'x =',answer:''+x,unit:''}],
   solution:[`${a} × x = ${c} − ${b} = ${c-b}`,`x = ${c-b} : ${a} = ${x}`]};
}},
buyWord:{chapter:1,topic:'Bài toán thực tế',gen(l){
  const ctx=pick([
    {who:'Cô giáo',n1:'hộp bút',per:'Mỗi hộp có',item:'cây bút',price:R(6,16)*500},
    {who:'Mẹ',n1:'gói kẹo',per:'Mỗi gói có',item:'cái kẹo',price:R(4,10)*500},
    {who:'Cửa hàng',n1:'hộp bánh',per:'Mỗi hộp có',item:'cái bánh',price:R(8,20)*500}]);
  const n=R(6,l===1?15:30),m=R(8,15),total=n*m,money=total*ctx.price;
  const t1=`${n} ${ctx.n1}`,t2=`${ctx.per} ${m} ${ctx.item}`,t3=`mỗi ${ctx.item} giá ${fmt(ctx.price)} đồng`;
  return{title:'Bài toán mua hàng',text:`${ctx.who} mua ${t1}. ${t2}, ${t3}. Hỏi ${ctx.who==='Cửa hàng'?'cửa hàng':ctx.who.toLowerCase()} phải trả bao nhiêu tiền?`,
   analysis:{given:[`Có ${t1}`,`${ctx.per} ${m} ${ctx.item}`,`Mỗi ${ctx.item} giá ${fmt(ctx.price)} đồng`],ask:'Tổng số tiền phải trả',plan:'Bước 1: tính tổng số lượng = số phần × số lượng trong 1 phần. Bước 2: lấy tổng số lượng × giá 1 cái.'},
   hint:`Tổng số ${ctx.item}: ${n} × ${m} = ${total}.`,
   theory:'Muốn tính tổng số tiền: trước hết tính tổng số lượng = số phần × số lượng trong mỗi phần; rồi lấy tổng số lượng × giá của 1 đơn vị.',
   kw:[{t:t1,type:'data',why:`Đề cho: có ${t1}.`},{t:t2,type:'op',why:`Từ khóa "mỗi": 1 phần chứa ${m} cái. Muốn tìm tổng số thì nhân ${n} × ${m}.`},{t:t3,type:'data',why:`Đề cho: giá của 1 ${ctx.item}.`},{t:'bao nhiêu tiền',type:'ask',why:'Điều cần tìm: tổng số tiền phải trả.'}],
   parts:[{label:'Số tiền phải trả',answer:''+money,unit:'đồng'}],
   solution:[`Tổng số ${ctx.item}: ${n} × ${m} = ${total}`,`Số tiền phải trả: ${total} × ${fmt(ctx.price)} = ${fmt(money)} (đồng)`]};
}},
gcdWord:{chapter:2,topic:'Ước chung lớn nhất',gen(l){
  const g=pick([6,8,9,10,12,14,15,16,18,20,24]),pr=pick([[2,3],[3,4],[2,5],[3,5],[4,5],[5,6],[3,7],[4,7]]);
  const A=g*pr[0],B=g*pr[1];
  const ctx=pick([
    {t:`Thầy giáo có ${A} cây bút và ${B} quyển vở. Thầy muốn chia thành các phần thưởng giống hệt nhau (mỗi phần có cả bút và vở) sao cho chia hết, không thừa món nào.`,q1:'Số phần nhiều nhất',u1:'phần',b:`${A} cây bút`,c:`${B} quyển vở`,pb:'cây bút',pc:'quyển vở',ask:'Số phần nhiều nhất; số bút và số vở mỗi phần'},
    {t:`Cô có ${A} quả cam và ${B} quả quýt. Cô muốn chia đều vào các túi quà giống hệt nhau (mỗi túi có cả cam và quýt) sao cho chia hết, không thừa quả nào.`,q1:'Số túi nhiều nhất',u1:'túi',b:`${A} quả cam`,c:`${B} quả quýt`,pb:'quả cam',pc:'quả quýt',ask:'Số túi nhiều nhất; số cam và số quýt mỗi túi'}]);
  return{title:'Chia đều thành nhiều phần nhất',text:ctx.t+'\na) Chia được nhiều nhất bao nhiêu phần?\nb) Mỗi phần có bao nhiêu món mỗi loại?',
   analysis:{given:[`Có ${ctx.b}`,`Có ${ctx.c}`,'Các phần phải giống hệt nhau và chia hết, không thừa'],ask:ctx.ask,plan:`Số phần phải là ước chung của ${A} và ${B}. Muốn nhiều phần nhất thì chọn ƯCLN(${A}; ${B}). Sau đó lấy ${A} và ${B} chia cho số phần.`},
   hint:`ƯCLN(${A}; ${B}) = ${g}.`,
   theory:'ƯCLN của hai số là số lớn nhất trong các ước chung của chúng. Bài toán chia đều thành các phần giống hệt nhau và muốn số phần nhiều nhất → tìm ƯCLN.',
   kw:[{t:ctx.b,type:'data',why:`Đề cho: tổng số là ${ctx.b}.`},{t:ctx.c,type:'data',why:`Đề cho: tổng số là ${ctx.c}.`},{t:'giống hệt nhau',type:'op',why:'Từ khóa: các phần phải bằng nhau, nên số phần là ước chung của hai số đã cho.'},{t:'không thừa',type:'op',why:'Phải chia hết hoàn toàn — số phần phải là ước của cả hai số.'},{t:'nhiều nhất',type:'ask',why:'Từ khóa "nhiều nhất": số phần lớn nhất có thể → tìm ƯCLN.'}],
   parts:[{label:'a) '+ctx.q1,answer:''+g,unit:ctx.u1},{label:`b) Số ${ctx.pb} mỗi phần`,answer:''+(A/g),unit:''},{label:`b) Số ${ctx.pc} mỗi phần`,answer:''+(B/g),unit:''}],
   solution:[`Số phần chia được phải là ước chung của ${A} và ${B}`,`ƯCLN(${A}; ${B}) = ${g} nên chia được nhiều nhất ${g} phần`,`Mỗi phần có: ${A} : ${g} = ${A/g} (${ctx.pb}) và ${B} : ${g} = ${B/g} (${ctx.pc})`]};
}},
lcmWord:{chapter:2,topic:'Bội chung nhỏ nhất',gen(l){
  let a=R(4,12),b=R(4,12),tries=0;
  while((a===b||lcm(a,b)>100)&&tries<50){a=R(4,12);b=R(4,12);tries++;}
  const L=lcm(a,b);
  const ctx=pick([
    {t:`An cứ ${a} ngày trực nhật một lần, Bình cứ ${b} ngày trực nhật một lần. Hôm nay hai bạn cùng trực nhật.`,kw1:`${a} ngày trực nhật một lần`,kw2:`${b} ngày trực nhật một lần`,q:'ngày',ask:'Số ngày ít nhất để hai bạn lại cùng trực'},
    {t:`Ở bến xe, tuyến số 1 cứ ${a} phút có một chuyến, tuyến số 2 cứ ${b} phút có một chuyến. Lúc 7 giờ, hai tuyến cùng xuất phát.`,kw1:`${a} phút có một chuyến`,kw2:`${b} phút có một chuyến`,q:'phút',ask:'Số phút ít nhất để hai tuyến lại cùng xuất phát'}]);
  return{title:'Khi nào gặp lại nhau',text:ctx.t+`\nHỏi sau ít nhất bao nhiêu ${ctx.q} nữa thì hai ${ctx.q==='ngày'?'bạn lại cùng trực nhật':'tuyến lại cùng xuất phát'}?`,
   analysis:{given:[`Chu kỳ thứ nhất: ${a} ${ctx.q}`,`Chu kỳ thứ hai: ${b} ${ctx.q}`,'Hôm nay/lúc đầu hai bên cùng xảy ra'],ask:ctx.ask,plan:`Số cần tìm phải chia hết cho cả ${a} và ${b}, và là số nhỏ nhất khác 0 — tức là BCNN(${a}; ${b}).`},
   hint:`BCNN(${a}; ${b}) = ${L}.`,
   theory:'BCNN của hai số là số nhỏ nhất khác 0 trong các bội chung của chúng. Bài toán "khi nào hai việc lặp lại cùng lúc" → tìm BCNN.',
   kw:[{t:ctx.kw1,type:'data',why:`Đề cho: chu kỳ thứ nhất là ${a} ${ctx.q}.`},{t:ctx.kw2,type:'data',why:`Đề cho: chu kỳ thứ hai là ${b} ${ctx.q}.`},{t:'cùng',type:'op',why:'Từ khóa "cùng": hai chu kỳ gặp nhau — số cần tìm là bội chung của hai chu kỳ.'},{t:'ít nhất bao nhiêu',type:'ask',why:'Điều cần tìm + từ khóa "ít nhất": giá trị nhỏ nhất → tìm BCNN.'}],
   parts:[{label:'Sau ít nhất',answer:''+L,unit:ctx.q}],
   solution:[`Số cần tìm là bội chung của ${a} và ${b}`,`BCNN(${a}; ${b}) = ${L}`,`Vậy sau ít nhất ${L} ${ctx.q} nữa`]};
}},
rangeWord:{chapter:2,topic:'Bài toán bội chung',gen(l){
  const s=pick([{d1:10,d2:12,lo:100,hi:130,ans:120,L:60},{d1:12,d2:16,lo:80,hi:110,ans:96,L:48},{d1:9,d2:12,lo:90,hi:120,ans:108,L:36}]);
  return{title:'Xếp hàng',text:`Số học sinh khối 6 của một trường trong khoảng từ ${s.lo} đến ${s.hi} em. Khi xếp hàng ${s.d1} hoặc hàng ${s.d2} thì đều vừa đủ, không thừa em nào. Hỏi khối 6 có bao nhiêu học sinh?`,
   analysis:{given:[`Số học sinh nằm trong khoảng ${s.lo} đến ${s.hi}`,`Xếp hàng ${s.d1} hay hàng ${s.d2} đều vừa đủ`],ask:'Số học sinh khối 6',plan:`Số học sinh là bội chung của ${s.d1} và ${s.d2}. Tìm BCNN rồi liệt kê các bội của nó, chọn số nằm trong khoảng ${s.lo}–${s.hi}.`},
   hint:`BCNN(${s.d1}; ${s.d2}) = ${s.L}. Các bội của ${s.L}: ${s.L}; ${s.L*2}; ${s.L*3}; ...`,
   theory:'Số chia hết cho hai số cho trước là bội chung của chúng. Liệt kê bội của BCNN rồi chọn số thuộc khoảng đề cho.',
   kw:[{t:`từ ${s.lo} đến ${s.hi} em`,type:'data',why:`Đề cho: số học sinh nằm trong khoảng ${s.lo}–${s.hi}.`},{t:`xếp hàng ${s.d1} hoặc hàng ${s.d2}`,type:'op',why:`Số học sinh chia hết cho cả ${s.d1} và ${s.d2} → là bội chung của hai số này.`},{t:'đều vừa đủ, không thừa em nào',type:'op',why:'Chia hết hoàn toàn, không dư.'},{t:'bao nhiêu học sinh',type:'ask',why:'Điều cần tìm: số học sinh khối 6.'}],
   parts:[{label:'Số học sinh khối 6',answer:''+s.ans,unit:'em'}],
   solution:[`Số học sinh là bội chung của ${s.d1} và ${s.d2}`,`BCNN(${s.d1}; ${s.d2}) = ${s.L} nên số học sinh thuộc {${s.L}; ${s.L*2}; ${s.L*3}; ...}`,`Chỉ có ${s.ans} nằm trong khoảng ${s.lo}–${s.hi}. Vậy khối 6 có ${s.ans} học sinh`]};
}},
tempWord:{chapter:3,topic:'Cộng, trừ số nguyên',gen(l){
  const place=pick(['Sa Pa','Đà Lạt','Mẫu Sơn','Hà Giang']);
  const s=R(-6,4),u=R(5,12),d=R(3,9),noon=s+u,eve=noon-d;
  return{title:'Nhiệt độ',text:`Buổi sáng, nhiệt độ ở ${place} là ${s}°C. Đến trưa, nhiệt độ tăng thêm ${u}°C. Đến tối, nhiệt độ giảm ${d}°C so với buổi trưa.\na) Nhiệt độ buổi trưa là bao nhiêu?\nb) Nhiệt độ buổi tối là bao nhiêu?`,
   analysis:{given:[`Sáng: ${s}°C`,`Trưa: tăng ${u}°C so với sáng`,`Tối: giảm ${d}°C so với trưa`],ask:'Nhiệt độ buổi trưa và buổi tối',plan:'Tăng thì cộng, giảm thì trừ. Tính lần lượt từng buổi.'},
   hint:`Nhiệt độ buổi trưa: ${s} + ${u} = ${noon} (°C).`,
   theory:'Nhiệt độ tăng thêm → phép cộng; nhiệt độ giảm đi → phép trừ. Số âm chỉ nhiệt độ dưới 0°C.',
   kw:[{t:`${s}°C`,type:'data',why:'Đề cho: nhiệt độ buổi sáng.'},{t:`tăng thêm ${u}°C`,type:'op',why:'Từ khóa "tăng thêm" → phép cộng.'},{t:`giảm ${d}°C`,type:'op',why:'Từ khóa "giảm" → phép trừ.'},{t:'Nhiệt độ buổi trưa là bao nhiêu',type:'ask',why:'Điều cần tìm (ý a): nhiệt độ buổi trưa.'},{t:'Nhiệt độ buổi tối là bao nhiêu',type:'ask',why:'Điều cần tìm (ý b): nhiệt độ buổi tối.'}],
   parts:[{label:'a) Nhiệt độ buổi trưa',answer:''+noon,unit:'°C'},{label:'b) Nhiệt độ buổi tối',answer:''+eve,unit:'°C'}],
   solution:[`Nhiệt độ buổi trưa: ${s} + ${u} = ${noon} (°C)`,`Nhiệt độ buổi tối: ${noon} − ${d} = ${eve} (°C)`]};
}},
intExpr:{chapter:3,topic:'Tính biểu thức số nguyên',gen(l){
  const a=R(11,l===1?30:60),b=R(20,60),c=R(5,35),ans=-a+b-c;
  const ex=`(−${a}) + ${b} − ${c}`;
  return{title:'Tính giá trị biểu thức',text:`Tính giá trị của biểu thức:\n${ex}`,
   analysis:{given:['Biểu thức gồm các số nguyên âm và dương, chỉ có cộng và trừ'],ask:'Tính giá trị của biểu thức',plan:`Tính từ trái sang phải: (−${a}) + ${b} trước, lấy kết quả trừ đi ${c}.`},
   hint:`(−${a}) + ${b} = ${-a+b}.`,
   theory:'Cộng hai số nguyên khác dấu: lấy số có giá trị lớn hơn trừ số nhỏ hơn, kết quả mang dấu của số lớn hơn. Sau đó tính tiếp từ trái sang phải.',
   kw:[{t:'Tính giá trị của biểu thức',type:'ask',why:'Điều cần tìm: kết quả cuối cùng của biểu thức.'},{t:ex,type:'data',why:'Số liệu đề cho: biểu thức số nguyên, tính từ trái sang phải.'}],
   parts:[{label:'Kết quả',answer:''+ans,unit:''}],
   solution:[`${ex} = ${-a+b} − ${c} = ${ans}`]};
}},
moneyWord:{chapter:3,topic:'Bài toán thực tế với số nguyên',gen(l){
  const S=R(5,9)*10000,x=R(2,4)*5000,y=R(1,3)*10000;
  let z=R(1,3)*5000,ans=S-x+y-z;
  if(ans<=0){z=5000;ans=S-x+y-z;}
  return{title:'Tiền tiêu vặt',text:`Nam có ${fmt(S)} đồng. Nam mua vở hết ${fmt(x)} đồng, sau đó được mẹ cho thêm ${fmt(y)} đồng, rồi mua bút hết ${fmt(z)} đồng. Hỏi Nam còn lại bao nhiêu tiền?`,
   analysis:{given:[`Ban đầu: ${fmt(S)} đồng`,`Mua vở: −${fmt(x)} đồng`,`Được cho thêm: +${fmt(y)} đồng`,`Mua bút: −${fmt(z)} đồng`],ask:'Số tiền còn lại của Nam',plan:'Cộng các khoản được thêm, trừ các khoản đã chi, theo thứ tự xảy ra.'},
   hint:`${fmt(S)} − ${fmt(x)} = ${fmt(S-x)}.`,
   theory:'Chi tiền (mua đồ) → phép trừ; nhận thêm tiền → phép cộng. Ghi các khoản theo thứ tự xảy ra rồi tính lần lượt.',
   kw:[{t:`có ${fmt(S)} đồng`,type:'data',why:'Đề cho: số tiền ban đầu.'},{t:`mua vở hết ${fmt(x)} đồng`,type:'op',why:'Từ khóa "mua... hết": chi tiền → phép trừ.'},{t:`cho thêm ${fmt(y)} đồng`,type:'op',why:'Từ khóa "thêm": nhận thêm tiền → phép cộng.'},{t:`mua bút hết ${fmt(z)} đồng`,type:'op',why:'Từ khóa "mua... hết": chi tiền → phép trừ.'},{t:'còn lại bao nhiêu tiền',type:'ask',why:'Điều cần tìm: số tiền còn lại.'}],
   parts:[{label:'Nam còn lại',answer:''+ans,unit:'đồng'}],
   solution:[`Số tiền còn lại: ${fmt(S)} − ${fmt(x)} + ${fmt(y)} − ${fmt(z)}`,`= ${fmt(S-x)} + ${fmt(y)} − ${fmt(z)} = ${fmt(ans)} (đồng)`]};
}},
rectGeo:{chapter:4,topic:'Hình chữ nhật',gen(l){
  const L=R(8,l===1?15:24),W=R(4,L-2),P=(L+W)*2,A=L*W;
  const wpx=L*10,hpx=W*10;
  const svg=`<svg viewBox="0 0 ${wpx+95} ${hpx+75}" style="max-width:360px;width:100%"><rect x="40" y="38" width="${wpx}" height="${hpx}" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="${40+wpx/2}" y="24" text-anchor="middle" font-size="16" fill="#333">${L} m</text><text x="${48+wpx}" y="${38+hpx/2+5}" font-size="16" fill="#333">${W} m</text></svg>`;
  return{title:'Mảnh vườn hình chữ nhật',text:`Một mảnh vườn hình chữ nhật có chiều dài ${L} m và chiều rộng ${W} m.\na) Tính chu vi của mảnh vườn.\nb) Tính diện tích của mảnh vườn.`,svg,
   analysis:{given:[`Hình chữ nhật: chiều dài ${L} m, chiều rộng ${W} m`],ask:'Chu vi và diện tích mảnh vườn',plan:'Chu vi hình chữ nhật: (dài + rộng) × 2. Diện tích hình chữ nhật: dài × rộng.'},
   hint:`${L} + ${W} = ${L+W}.`,
   theory:'Hình chữ nhật ABCD: Chu vi C = (a + b) × 2; Diện tích S = a × b. Trong đó a là chiều dài, b là chiều rộng.',
   kw:[{t:`chiều dài ${L} m`,type:'data',why:'Đề cho: chiều dài mảnh vườn.'},{t:`chiều rộng ${W} m`,type:'data',why:'Đề cho: chiều rộng mảnh vườn.'},{t:'Tính chu vi',type:'ask',why:'Điều cần tìm (ý a): chu vi mảnh vườn.'},{t:'Tính diện tích',type:'ask',why:'Điều cần tìm (ý b): diện tích mảnh vườn.'}],
   parts:[{label:'a) Chu vi',answer:''+P,unit:'m'},{label:'b) Diện tích',answer:''+A,unit:'m²'}],
   solution:[`Chu vi: (${L} + ${W}) × 2 = ${L+W} × 2 = ${P} (m)`,`Diện tích: ${L} × ${W} = ${A} (m²)`]};
}},
squareGeo:{chapter:4,topic:'Hình vuông',gen(l){
  const s=R(5,l===1?12:20),P=s*4,A=s*s,px=s*11;
  const svg=`<svg viewBox="0 0 ${px+55} ${px+45}" style="max-width:280px;width:100%"><rect x="25" y="32" width="${px}" height="${px}" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="${25+px/2}" y="20" text-anchor="middle" font-size="16" fill="#333">${s} m</text></svg>`;
  return{title:'Sân chơi hình vuông',text:`Một sân chơi hình vuông có cạnh ${s} m.\na) Tính chu vi của sân.\nb) Tính diện tích của sân.`,svg,
   analysis:{given:[`Hình vuông có cạnh ${s} m (4 cạnh bằng nhau)`],ask:'Chu vi và diện tích của sân',plan:'Chu vi hình vuông: cạnh × 4. Diện tích hình vuông: cạnh × cạnh.'},
   hint:`${s} × 4 = ${P} và ${s} × ${s} = ${A}.`,
   theory:'Hình vuông: Chu vi C = a × 4; Diện tích S = a × a. Trong đó a là độ dài cạnh.',
   kw:[{t:`cạnh ${s} m`,type:'data',why:'Đề cho: cạnh hình vuông (cả 4 cạnh đều bằng nhau).'},{t:'Tính chu vi',type:'ask',why:'Điều cần tìm (ý a): chu vi của sân.'},{t:'Tính diện tích',type:'ask',why:'Điều cần tìm (ý b): diện tích của sân.'}],
   parts:[{label:'a) Chu vi',answer:''+P,unit:'m'},{label:'b) Diện tích',answer:''+A,unit:'m²'}],
   solution:[`Chu vi: ${s} × 4 = ${P} (m)`,`Diện tích: ${s} × ${s} = ${A} (m²)`]};
}},
triGeo:{chapter:4,topic:'Tam giác đều',gen(l){
  const s=R(12,45),P=s*3;
  const svg=`<svg viewBox="0 0 200 195" style="max-width:230px;width:100%"><polygon points="100,20 180,160 20,160" fill="#fff8e1" stroke="#e65100" stroke-width="2"/><text x="100" y="185" text-anchor="middle" font-size="16" fill="#333">${s} cm</text></svg>`;
  return{title:'Biển báo tam giác đều',text:`Một biển báo giao thông có dạng tam giác đều với cạnh dài ${s} cm. Tính chu vi của biển báo đó.`,svg,
   analysis:{given:['Tam giác đều: 3 cạnh bằng nhau, mỗi cạnh '+s+' cm'],ask:'Chu vi của biển báo',plan:'Chu vi là tổng độ dài 3 cạnh. Vì 3 cạnh bằng nhau nên lấy cạnh × 3.'},
   hint:`Tam giác đều có 3 cạnh bằng nhau: ${s} × 3.`,
   theory:'Tam giác đều: Chu vi P = a × 3. Trong đó a là độ dài cạnh (3 cạnh bằng nhau, 3 góc đều bằng 60°).',
   kw:[{t:'tam giác đều',type:'op',why:'Từ khóa: tam giác đều có 3 cạnh bằng nhau → chu vi = cạnh × 3.'},{t:`cạnh dài ${s} cm`,type:'data',why:'Đề cho: mỗi cạnh dài bấy nhiêu.'},{t:'Tính chu vi',type:'ask',why:'Điều cần tìm: chu vi của biển báo.'}],
   parts:[{label:'Chu vi',answer:''+P,unit:'cm'}],
   solution:[`Chu vi: ${s} × 3 = ${P} (cm)`]};
}},
trapGeo:{chapter:4,topic:'Hình thang cân',gen(l){
  const DL=R(11,18),DN=R(6,DL-3),leg=R(4,9),P=DL+DN+2*leg;
  const svg=`<svg viewBox="0 0 260 175" style="max-width:300px;width:100%"><polygon points="30,130 230,130 180,40 80,40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="130" y="158" text-anchor="middle" font-size="16" fill="#333">${DL} cm</text><text x="130" y="30" text-anchor="middle" font-size="16" fill="#333">${DN} cm</text><text x="14" y="88" font-size="16" fill="#333">${leg} cm</text></svg>`;
  return{title:'Mặt bàn hình thang cân',text:`Mặt bàn có dạng hình thang cân với đáy lớn ${DL} cm, đáy nhỏ ${DN} cm và cạnh bên ${leg} cm. Tính chu vi của mặt bàn.`,svg,
   analysis:{given:[`Hình thang cân: đáy lớn ${DL} cm, đáy nhỏ ${DN} cm`,`Hình thang cân có 2 cạnh bên bằng nhau, mỗi cạnh ${leg} cm`],ask:'Chu vi của mặt bàn',plan:`Chu vi = đáy lớn + đáy nhỏ + cạnh bên + cạnh bên = ${DL} + ${DN} + ${leg} + ${leg}.`},
   hint:`Hình thang cân có hai cạnh bên bằng nhau: ${DL} + ${DN} + ${leg} × 2.`,
   theory:'Chu vi của một hình bằng tổng độ dài tất cả các cạnh. Hình thang: Diện tích S = (a + b) × h : 2 (a là đáy lớn, b là đáy nhỏ, h là chiều cao). Hình thang cân có 2 cạnh bên bằng nhau.',
   kw:[{t:'hình thang cân',type:'op',why:'Từ khóa: hình thang cân có 2 cạnh bên bằng nhau.'},{t:`đáy lớn ${DL} cm`,type:'data',why:'Đề cho: đáy lớn.'},{t:`đáy nhỏ ${DN} cm`,type:'data',why:'Đề cho: đáy nhỏ.'},{t:`cạnh bên ${leg} cm`,type:'data',why:'Đề cho: mỗi cạnh bên, mà hình có 2 cạnh bên.'},{t:'Tính chu vi',type:'ask',why:'Điều cần tìm: chu vi mặt bàn = tổng 4 cạnh.'}],
   parts:[{label:'Chu vi',answer:''+P,unit:'cm'}],
   solution:[`Chu vi: ${DL} + ${DN} + ${leg} + ${leg} = ${P} (cm)`]};
}},
rhombusGeo:{chapter:4,topic:'Hình thoi',gen(l){
  let d1=pick([6,8,10,12,14,16]),d2=pick([4,6,8,10,12,14]);
  if(d1===d2)d2=d1+2;
  const A=d1*d2/2;
  const svg=`<svg viewBox="0 0 240 205" style="max-width:260px;width:100%"><polygon points="120,20 190,100 120,180 50,100" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2"/><line x1="120" y1="20" x2="120" y2="180" stroke="#6a1b9a" stroke-dasharray="5 4"/><line x1="50" y1="100" x2="190" y2="100" stroke="#6a1b9a" stroke-dasharray="5 4"/><text x="130" y="60" font-size="16" fill="#333">${d1} cm</text><text x="132" y="92" font-size="16" fill="#333">${d2} cm</text></svg>`;
  return{title:'Diện tích hình thoi',text:`Một viên gạch trang trí hình thoi có hai đường chéo dài ${d2} cm và ${d1} cm. Tính diện tích của viên gạch.`,svg,
   analysis:{given:[`Hình thoi có hai đường chéo ${d2} cm và ${d1} cm`],ask:'Diện tích viên gạch',plan:`Diện tích hình thoi bằng một nửa tích hai đường chéo: (${d2} × ${d1}) : 2.`},
   hint:`${d2} × ${d1} = ${d2*d1}, rồi chia cho 2.`,
   theory:'Hình thoi: Diện tích S = (m × n) : 2. Trong đó m và n là độ dài hai đường chéo (hai đường chéo vuông góc với nhau).',
   kw:[{t:`hai đường chéo dài ${d2} cm và ${d1} cm`,type:'data',why:'Đề cho: độ dài hai đường chéo của hình thoi.'},{t:'Tính diện tích',type:'ask',why:'Điều cần tìm: diện tích viên gạch (hình thoi).'}],
   parts:[{label:'Diện tích',answer:''+A,unit:'cm²'}],
   solution:[`Diện tích: (${d2} × ${d1}) : 2 = ${d2*d1} : 2 = ${A} (cm²)`]};
}},
paraGeo:{chapter:4,topic:'Hình bình hành',gen(l){
  const base=R(6,16),h=R(3,base-1),A=base*h;
  const svg=`<svg viewBox="0 0 260 185" style="max-width:300px;width:100%"><polygon points="40,140 200,140 235,45 75,45" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><line x1="75" y1="45" x2="75" y2="140" stroke="#1565c0" stroke-dasharray="5 4"/><text x="120" y="166" text-anchor="middle" font-size="16" fill="#333">${base} m</text><text x="84" y="98" font-size="16" fill="#333">${h} m</text></svg>`;
  return{title:'Diện tích hình bình hành',text:`Một mảnh đất hình bình hành có cạnh đáy ${base} m và chiều cao tương ứng ${h} m. Tính diện tích của mảnh đất.`,svg,
   analysis:{given:[`Hình bình hành: cạnh đáy ${base} m, chiều cao ứng với cạnh đáy đó là ${h} m`],ask:'Diện tích mảnh đất',plan:'Diện tích hình bình hành = cạnh đáy × chiều cao tương ứng.'},
   hint:`Lấy cạnh đáy nhân với chiều cao: ${base} × ${h}.`,
   theory:'Hình bình hành: Diện tích S = a × h. Trong đó a là độ dài cạnh đáy, h là chiều cao ứng với cạnh đáy đó.',
   kw:[{t:`cạnh đáy ${base} m`,type:'data',why:'Đề cho: cạnh đáy hình bình hành.'},{t:`chiều cao tương ứng ${h} m`,type:'data',why:'Đề cho: chiều cao ứng với cạnh đáy đó — phải ghép đúng cặp đáy × chiều cao.'},{t:'Tính diện tích',type:'ask',why:'Điều cần tìm: diện tích mảnh đất.'}],
   parts:[{label:'Diện tích',answer:''+A,unit:'m²'}],
   solution:[`Diện tích: ${base} × ${h} = ${A} (m²)`]};
}},
romanWord:{chapter:1,topic:'Số La Mã (Bài 2)',gen(l){
  const table=[[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  const toRoman=n=>{let r='';for(const [v,sm] of table){while(n>=v){r+=sm;n-=v;}}return r;};
  const maxN=l===1?19:(l===2?39:89);
  const n=R(4,maxN), r=toRoman(n);
  return{title:'Đọc số La Mã',text:`Số La Mã ${r} viết trong hệ thập phân là số nào?`,
   analysis:{given:[`Số La Mã ${r}`, 'Các ký hiệu: I = 1, V = 5, X = 10, L = 50; ký hiệu nhỏ đứng trước ký hiệu lớn thì trừ (IV = 4, IX = 9, XL = 40)'],ask:'Giá trị của số La Mã trong hệ thập phân',plan:'Cộng giá trị các ký hiệu từ trái sang phải; gặp cặp trừ (IV, IX, XL) thì tính cặp đó trước.'},
   hint:'Nhớ: I = 1, V = 5, X = 10, L = 50. Ví dụ XIV = 10 + 4 = 14.',
   theory:'Cách ghi số La Mã (Bài 2): I = 1, V = 5, X = 10, L = 50. Ký hiệu nhỏ đứng trước ký hiệu lớn hơn để chỉ phép trừ: IV = 4, IX = 9, XL = 40.',
   kw:[{t:r,type:'data',why:'Số La Mã cần đổi sang hệ thập phân.'},{t:'hệ thập phân',type:'method',why:'Đích cần đổi sang: cách ghi số thường dùng hằng ngày.'}],
   parts:[{label:'Số thập phân tương ứng',answer:''+n,unit:''}],
   solution:[`Đổi từng phần của ${r} rồi cộng lại được ${n}`]};
}},
divRule:{chapter:2,topic:'Dấu hiệu chia hết (Bài 9)',gen(l){
  const d=pick(l===1?[2,5]:(l===2?[3,9]:[2,3,5,9]));
  const base=R(20,90);
  let nums=new Set();
  while(nums.size<4)nums.add(base+R(0,60));
  nums=[...nums];
  const ok=nums.filter(x=>x%d===0);
  const ans=Math.max(...ok);
  const rule={2:'số có chữ số tận cùng là 0, 2, 4, 6, 8',5:'số có chữ số tận cùng là 0 hoặc 5',3:'số có tổng các chữ số chia hết cho 3',9:'số có tổng các chữ số chia hết cho 9'}[d];
  return{title:'Dấu hiệu chia hết',text:`Trong các số ${nums.join(', ')}, số lớn nhất chia hết cho ${d} là số nào?`,
   analysis:{given:[`Các số: ${nums.join(', ')}`,`Dấu hiệu chia hết cho ${d}: ${rule}`],ask:`Số lớn nhất trong các số đã cho chia hết cho ${d}`,plan:`Kiểm tra từng số bằng dấu hiệu chia hết cho ${d}, rồi chọn số lớn nhất trong các số thỏa mãn.`},
   hint:`Dùng dấu hiệu: một số chia hết cho ${d} khi ${rule}.`,
   theory:'Dấu hiệu chia hết (Bài 9): chia hết cho 2 — tận cùng 0, 2, 4, 6, 8; cho 5 — tận cùng 0, 5; cho 3 — tổng các chữ số chia hết cho 3; cho 9 — tổng các chữ số chia hết cho 9.',
   kw:[{t:'chia hết cho '+d,type:'method',why:'Điều kiện để lọc các số: dùng dấu hiệu chia hết tương ứng.'},{t:'số lớn nhất',type:'ask',why:'Điều cần tìm: trong các số thỏa mãn, chọn số lớn nhất.'},...nums.map(x=>({t:''+x,type:'data',why:'Số cần kiểm tra.'}))],
   parts:[{label:'Số lớn nhất chia hết cho '+d,answer:''+ans,unit:''}],
   solution:[`Các số chia hết cho ${d} là: ${ok.join(', ')}`,`Số lớn nhất trong chúng là ${ans}`]};
}},
primeFactor:{chapter:2,topic:'Số nguyên tố (Bài 10)',gen(l){
  const primes=[2,3,5,7];
  const p1=pick(primes), p2=pick(primes.filter(x=>x!==p1));
  const a=l===1?R(2,3):R(2,4), b=R(1,2);
  const n=Math.pow(p1,a)*Math.pow(p2,b);
  return{title:'Phân tích ra thừa số nguyên tố',text:`Phân tích số ${n} ra thừa số nguyên tố được ${n} = ${p1}^x × ${p2}^${b}. Hỏi x bằng bao nhiêu? (dấu ^ nghĩa là lũy thừa)`,
   analysis:{given:[`Số ${n}`,`Dạng phân tích: ${p1}^x × ${p2}^${b}`],ask:'Số mũ x của thừa số '+p1,plan:`Chia ${n} cho ${p2}^${b} để được lũy thừa của ${p1}, rồi đếm số lần chia cho ${p1}.`},
   hint:`Lấy ${n} chia cho ${p2}^${b} = ${Math.pow(p2,b)} trước, phần còn lại là lũy thừa của ${p1}.`,
   theory:'Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có hai ước là 1 và chính nó. Mọi số tự nhiên lớn hơn 1 đều phân tích được ra thừa số nguyên tố (Bài 10).',
   kw:[{t:''+n,type:'data',why:'Số cần phân tích.'},{t:'thừa số nguyên tố',type:'method',why:'Cách làm: chia liên tiếp cho các số nguyên tố 2, 3, 5, 7...'}],
   parts:[{label:'x',answer:''+a,unit:''}],
   solution:[`${n} : ${Math.pow(p2,b)} = ${Math.pow(p1,a)} = ${p1}^${a}`,`Vậy x = ${a}`]};
}},
intMul:{chapter:3,topic:'Phép nhân số nguyên (Bài 16)',gen(l){
  const a=(l===1?R(2,9):R(3,15))*(pick([-1,1])||1);
  let A=a===0?-3:a;
  const B=(l===1?R(2,9):R(3,12))*pick([-1,-1,1]);
  const c=l===3?R(2,9)*pick([-1,1]):null;
  const prod=A*B, total=c===null?prod:prod+c;
  const expr=c===null?`(${A}) × (${B})`:`(${A}) × (${B}) + (${c})`;
  return{title:'Nhân số nguyên',text:`Tính: ${expr}`,
   analysis:{given:['Quy tắc dấu: cùng dấu cho kết quả dương, khác dấu cho kết quả âm'],ask:'Giá trị của biểu thức',plan:'Nhân hai số nguyên trước (xác định dấu, rồi nhân hai giá trị tuyệt đối), sau đó mới cộng/trừ tiếp nếu có.'},
   hint:'Cùng dấu → dấu +; khác dấu → dấu −. Nhân phần số như số tự nhiên rồi đặt dấu.',
   theory:'Phép nhân số nguyên (Bài 16): tích của hai số nguyên cùng dấu là số dương; tích của hai số nguyên khác dấu là số âm. Quy tắc dấu ngoặc (Bài 15): bỏ ngoặc có dấu − đằng trước thì đổi dấu các số hạng trong ngoặc.',
   kw:[{t:'('+A+') × ('+B+')',type:'method',why:'Phép nhân hai số nguyên: chú ý dấu của hai thừa số.'}],
   parts:[{label:'Kết quả',answer:''+total,unit:''}],
   solution:[`(${A}) × (${B}) = ${prod} (${A<0!==B<0?'khác dấu nên kết quả âm':'cùng dấu nên kết quả dương'})`,...(c===null?[]:[`${prod} + (${c}) = ${total}`])]};
}},
centerWord:{chapter:5,topic:'Tâm đối xứng (Bài 22)',gen(l){
  const all=[
    {n:'Hình vuông',c:1},{n:'Hình chữ nhật',c:1},{n:'Hình thoi',c:1},{n:'Hình bình hành',c:1},{n:'Lục giác đều',c:1},
    {n:'Tam giác đều',c:0},{n:'Hình thang cân',c:0}];
  const chosen=[...all].sort(()=>Math.random()-0.5).slice(0,3);
  const ans=chosen.reduce((s2,x)=>s2+x.c,0);
  const labels=['a) ','b) ','c) '];
  return{title:'Đếm hình có tâm đối xứng',text:'Trong các hình sau, có bao nhiêu hình có tâm đối xứng?\n'+chosen.map((x,i)=>labels[i]+x.n).join('\n'),
   analysis:{given:['Tâm đối xứng là điểm mà khi quay hình 180° quanh điểm đó, hình trùng với chính nó'],ask:'Số hình có tâm đối xứng trong 3 hình đã cho',plan:'Nhớ: hình vuông, hình chữ nhật, hình thoi, hình bình hành, lục giác đều có tâm đối xứng (chính là giao điểm hai đường chéo / tâm hình). Tam giác đều và hình thang cân không có tâm đối xứng.'},
   hint:'Hình nào có hai đường chéo cắt nhau tại trung điểm của mỗi đường thường có tâm đối xứng tại giao điểm đó.',
   theory:'Hình có tâm đối xứng (Bài 22): tâm đối xứng là điểm O sao cho khi quay hình nửa vòng (180°) quanh O, hình trùng khít với chính nó. Hình vuông, hình chữ nhật, hình thoi, hình bình hành, lục giác đều có tâm đối xứng; tam giác đều và hình thang cân không có.',
   kw:[{t:'bao nhiêu hình có tâm đối xứng',type:'ask',why:'Điều cần tìm: đếm số hình có tâm đối xứng.'},...chosen.map(x=>({t:x.n,type:'data',why:'Hình cần xét.'}))],
   parts:[{label:'Số hình có tâm đối xứng',answer:''+ans,unit:'hình'}],
   solution:chosen.map(x=>`${x.n}: ${x.c?'có':'không có'} tâm đối xứng`)};
}},

axisTriple:{chapter:5,topic:'Trục đối xứng',gen(l){
  const all=[
    {n:'Hình vuông',a:4},{n:'Hình chữ nhật',a:2},{n:'Tam giác đều',a:3},
    {n:'Hình thoi',a:2},{n:'Hình thang cân',a:1},{n:'Lục giác đều',a:6},{n:'Hình bình hành',a:0}];
  const shuffled=[...all].sort(()=>Math.random()-0.5).slice(0,3);
  const labels=['a) ','b) ','c) '];
  return{title:'Đếm trục đối xứng',text:'Mỗi hình sau có bao nhiêu trục đối xứng?\n'+shuffled.map((s,i)=>labels[i]+s.n).join('\n'),
   analysis:{given:['Trục đối xứng là đường thẳng chia hình thành hai phần giống hệt nhau khi gấp lại'],ask:'Số trục đối xứng của từng hình',plan:'Tưởng tượng gấp hình theo các đường khác nhau: hình vuông gấp được theo 2 đường chéo và 2 đường giữa; hình chữ nhật chỉ gấp theo 2 đường giữa; tam giác đều gấp theo 3 đường từ đỉnh xuống cạnh đối diện; hình bình hành thường không gấp trùng theo đường nào.'},
   hint:'Xem lại các thẻ ở mục Lý thuyết hình học: hình nào càng đều thì càng nhiều trục đối xứng.',
   theory:'Trục đối xứng là đường thẳng mà khi gấp hình theo đường đó, hai nửa của hình trùng khít lên nhau.',
   kw:[{t:'bao nhiêu trục đối xứng',type:'ask',why:'Điều cần tìm: số trục đối xứng của từng hình.'},...shuffled.map(s=>({t:s.n,type:'data',why:'Hình cần xét.'}))],
   parts:shuffled.map((s,i)=>({label:labels[i]+s.n,answer:''+s.a,unit:'trục'})),
   solution:shuffled.map(s=>`${s.n}: ${s.a} trục đối xứng`)};
}},
axisWord:{chapter:5,topic:'Trục đối xứng',gen(l){
  const pool=[
    {n:'Hình vuông',a:4,e:'Hình vuông có 4 trục đối xứng: 2 đường chéo và 2 đường nối trung điểm các cạnh đối.'},
    {n:'Hình chữ nhật',a:2,e:'Hình chữ nhật có 2 trục đối xứng: 2 đường nối trung điểm các cạnh đối (đường chéo không phải trục đối xứng).'},
    {n:'Tam giác đều',a:3,e:'Tam giác đều có 3 trục đối xứng: 3 đường đi qua đỉnh và trung điểm cạnh đối diện.'},
    {n:'Hình thoi',a:2,e:'Hình thoi có 2 trục đối xứng: chính là 2 đường chéo của nó.'},
    {n:'Hình thang cân',a:1,e:'Hình thang cân có 1 trục đối xứng: đường thẳng đi qua trung điểm hai đáy.'},
    {n:'Lục giác đều',a:6,e:'Lục giác đều có 6 trục đối xứng: 3 đường qua hai đỉnh đối diện và 3 đường qua trung điểm hai cạnh đối.'},
    {n:'Hình bình hành',a:0,e:'Hình bình hành (thường) không có trục đối xứng nào, vì gấp theo bất kỳ đường nào hai nửa cũng không trùng khít. Nó chỉ có tâm đối xứng.'}];
  const s=pick(pool);
  return{title:'Đếm trục đối xứng',text:`${s.n} có bao nhiêu trục đối xứng?`,
   analysis:{given:['Trục đối xứng là đường thẳng chia hình thành hai phần giống hệt nhau khi gấp lại'],ask:`Số trục đối xứng của ${s.n.toLowerCase()}`,plan:'Tưởng tượng gấp hình theo các đường khác nhau và kiểm tra hai nửa có trùng khít không.'},
   hint:'Hãy nhớ lại thẻ lý thuyết của hình này ở mục Lý thuyết hình học.',
   theory:'Trục đối xứng là đường thẳng mà khi gấp hình theo đường đó, hai nửa của hình trùng khít lên nhau.',
   kw:[{t:'bao nhiêu trục đối xứng',type:'ask',why:'Điều cần tìm: số trục đối xứng của hình.'},{t:s.n,type:'data',why:'Hình cần xét.'}],
   parts:[{label:'Số trục đối xứng',answer:''+s.a,unit:'trục'}],
   solution:[s.e]};
}}
};
window.GEN={templates:T,
 chapters:{1:'Chương 1 · Tập hợp các số tự nhiên',2:'Chương 2 · Tính chia hết trong tập hợp các số tự nhiên',3:'Chương 3 · Số nguyên',4:'Chương 4 · Một số hình phẳng trong thực tiễn',5:'Chương 5 · Tính đối xứng của hình phẳng trong tự nhiên'},
 make(chapter,lvl){
   const keys=Object.keys(T).filter(k=>T[k].chapter===chapter);
   const k=pick(keys);
   return this.makeFrom(k,lvl);
 },
 makeFrom(k,lvl){
   const p=T[k].gen(lvl||2);
   p.gen=true;p.template=k;p.chapter=T[k].chapter;p.topic=T[k].topic;
   const SHAPE={rectGeo:'hinh-chu-nhat',squareGeo:'hinh-vuong',triGeo:'tam-giac-deu',trapGeo:'hinh-thang-can',rhombusGeo:'hinh-thoi',paraGeo:'hinh-binh-hanh'};
   if(SHAPE[k])p.shape=SHAPE[k];
   return p;
 }};
})();
