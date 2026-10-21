// Bo sinh de ngau nhien Toan 6 HK1 — moi lan goi tra ve 1 de moi (so lieu ngau nhien)
// Moi ham gen(lvl) tra ve object cung cau truc voi problems.json. lvl: 1=De, 2=Vua, 3=Kho
(function(){
function R(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function gcd(a,b){return b?gcd(b,a%b):a;}
function lcm(a,b){return a*b/gcd(a,b);}
function fmt(n){return (''+n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
function sup(n){return (''+n).replace('2','²').replace('3','³');}
function seq(a,b){const r=[];for(let i=a;i<=b;i++)r.push(i);return r.join('; ');}
function posDiv(n){const r=[];for(let d=1;d<=n;d++)if(n%d===0)r.push(d);return r.join('; ');}
function sgn(n){return n<0?'('+n+')':''+n;}
function angG(V,P1,P2,name,info,r){
  r=r||26;
  function pt(P){var dx=P[0]-V[0],dy=P[1]-V[1],L=Math.hypot(dx,dy);return [V[0]+dx/L*r,V[1]+dy/L*r];}
  var u1=pt(P1),u2=pt(P2);
  var cross=(u1[0]-V[0])*(u2[1]-V[1])-(u1[1]-V[1])*(u2[0]-V[0]);
  var sw=cross>0?1:0;
  function f(n){return Math.round(n*10)/10;}
  return '<g class="ang" data-v="'+name[1]+'" data-info="'+info+'"><path class="ang-w" d="M '+V[0]+','+V[1]+' L '+f(u1[0])+','+f(u1[1])+' A '+r+','+r+' 0 0 '+sw+' '+f(u2[0])+','+f(u2[1])+' Z"/><line class="ang-s" x1="'+V[0]+'" y1="'+V[1]+'" x2="'+P1[0]+'" y2="'+P1[1]+'"/><line class="ang-s" x1="'+V[0]+'" y1="'+V[1]+'" x2="'+P2[0]+'" y2="'+P2[1]+'"/><circle class="ang-w" cx="'+V[0]+'" cy="'+V[1]+'" r="16"/></g>';
}
function vtxL(V,C,letter){
  var dx=V[0]-C[0],dy=V[1]-C[1],L=Math.hypot(dx,dy)||1;
  var x=V[0]+dx/L*17,y=V[1]+dy/L*17;
  return '<text class="avtx" data-v="'+letter+'" x="'+Math.round(x)+'" y="'+(Math.round(y)+5)+'" text-anchor="middle">'+letter+'</text>';
}
function quadAng(A,B,Cc,D,infos){
  var C=[(A[0]+B[0]+Cc[0]+D[0])/4,(A[1]+B[1]+Cc[1]+D[1])/4];
  return vtxL(A,C,'A')+vtxL(B,C,'B')+vtxL(Cc,C,'C')+vtxL(D,C,'D')
    +angG(A,D,B,'DAB',infos[0])+angG(B,A,Cc,'ABC',infos[1])+angG(Cc,B,D,'BCD',infos[2])+angG(D,Cc,A,'CDA',infos[3]);
}


const TRAPI=['Góc DAB — đỉnh A, hai cạnh AB và AD. Góc này bằng góc ABC (hai góc kề cùng đáy lớn) và bù với góc CDA (tổng 180°)','Góc ABC — đỉnh B, hai cạnh BA và BC. Góc này bằng góc DAB và bù với góc BCD (tổng 180°)','Góc BCD — đỉnh C, hai cạnh CB và CD. Góc này bằng góc CDA (hai góc kề cùng đáy nhỏ)','Góc CDA — đỉnh D, hai cạnh DC và DA. Góc này bằng góc BCD và bù với góc DAB (tổng 180°)'];
const RHOI=['Góc DAB — đỉnh A, hai cạnh AB và AD. Góc đối của nó là góc BCD, hai góc đối bằng nhau. Đường chéo AC là tia phân giác của góc này','Góc ABC — đỉnh B, hai cạnh BA và BC. Góc đối của nó là góc CDA. Đường chéo BD là tia phân giác của góc này','Góc BCD — đỉnh C, hai cạnh CB và CD. Góc đối của nó là góc DAB. Đường chéo AC là tia phân giác của góc này','Góc CDA — đỉnh D, hai cạnh DC và DA. Góc đối của nó là góc ABC. Đường chéo BD là tia phân giác của góc này'];
const PARAI=['Góc DAB — đỉnh A, hai cạnh AB và AD. Hai góc đối trong hình bình hành bằng nhau: góc này bằng góc BCD; góc kề với nó (ABC, CDA) bù nhau, tổng 180°','Góc ABC — đỉnh B, hai cạnh BA và BC. Góc này bằng góc CDA (hai góc đối), bù với góc DAB','Góc BCD — đỉnh C, hai cạnh CB và CD. Góc này bằng góc DAB (hai góc đối)','Góc CDA — đỉnh D, hai cạnh DC và DA. Góc này bằng góc ABC (hai góc đối), bù với góc DAB'];
const RECTI=['Góc DAB = 90° — góc vuông ở đỉnh A, hai cạnh là AB và AD','Góc ABC = 90° — góc vuông ở đỉnh B, hai cạnh là BA và BC','Góc BCD = 90° — góc vuông ở đỉnh C, hai cạnh là CB và CD','Góc CDA = 90° — góc vuông ở đỉnh D, hai cạnh là DC và DA'];
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
   analysis:{given:[`Có ${t1}`,`${ctx.per} ${m} ${ctx.item}`,`Mỗi ${ctx.item} giá ${fmt(ctx.price)} đồng`],ask:'Tổng số tiền phải trả',plan:'Bước 1) Tính tổng số lượng = số phần × số lượng trong 1 phần. Bước 2) Lấy tổng số lượng × giá 1 cái.'},
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
intBracket:{chapter:3,topic:'Quy tắc dấu ngoặc (Bài 15)',gen(l){
  const a=R(l===1?25:35,l===1?50:70),b=R(8,40),c=b+R(3,25),d=R(4,30),s=pick(['−','+']);
  const inner=b-c, mid=a-inner, ans=s==='−'?mid-d:mid+d;
  const ex=`${a} − (${b} − ${c}) ${s} ${d}`;
  return{title:'Tính biểu thức có dấu ngoặc',text:`Tính giá trị của biểu thức:\n${ex}`,
   analysis:{given:[`Biểu thức có dấu ngoặc, phía trước ngoặc là dấu trừ`,`Trong ngoặc: ${b} − ${c} cho kết quả là số âm`],ask:'Tính giá trị của biểu thức',plan:`Bước 1) Tính trong ngoặc trước. Bước 2) Bỏ dấu ngoặc theo quy tắc dấu ngoặc: ${a} − (${inner}) = ${a} + ${-inner}. Bước 3) Tính tiếp từ trái sang phải.`},
   hint:`Trong ngoặc: ${b} − ${c} = ${inner}. Nhớ: trừ một số âm bằng cộng số dương.`,
   theory:'Quy tắc dấu ngoặc (Bài 15): khi bỏ dấu ngoặc có dấu + đằng trước, giữ nguyên dấu của các số hạng trong ngoặc; khi bỏ dấu ngoặc có dấu \u2212 đằng trước, phải đổi dấu mọi số hạng trong ngoặc. Trừ một số âm bằng cộng với số đối của nó.',
   kw:[{t:'Tính giá trị của biểu thức',type:'ask',why:'Điều cần tìm: kết quả cuối cùng của biểu thức.'},{t:ex,type:'data',why:'Số liệu đề cho: biểu thức có dấu ngoặc \u2014 tính trong ngoặc trước, bỏ ngoặc theo quy tắc dấu ngoặc.'}],
   parts:[{label:'Kết quả',answer:''+ans,unit:''}],
   solution:[`Bước 1) Tính trong ngoặc trước: ${b} − ${c} = ${inner}. Biểu thức trở thành: ${a} − (${inner}) ${s} ${d}.`,`Bước 2) Bỏ dấu ngoặc: phía trước ngoặc là dấu trừ nên đổi dấu số hạng trong ngoặc: ${a} − (${inner}) = ${a} + ${-inner} = ${mid}.`,`Bước 3) Tính tiếp từ trái sang phải: ${mid} ${s} ${d} = ${ans}.`]};
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
  const svg=`<svg viewBox="0 0 ${wpx+95} ${hpx+75}" style="max-width:360px;width:100%"><rect x="40" y="38" width="${wpx}" height="${hpx}" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="${40+wpx/2}" y="24" text-anchor="middle" font-size="16" fill="#333">${L} m</text><text x="${48+wpx}" y="${38+hpx/2+5}" font-size="16" fill="#333">${W} m</text>${quadAng([40,38+hpx],[40+wpx,38+hpx],[40+wpx,38],[40,38],RECTI)}</svg>`;
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
  const svg=`<svg viewBox="0 0 ${px+55} ${px+45}" style="max-width:280px;width:100%"><rect x="25" y="32" width="${px}" height="${px}" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="${25+px/2}" y="20" text-anchor="middle" font-size="16" fill="#333">${s} m</text>${quadAng([25,32+px],[25+px,32+px],[25+px,32],[25,32],RECTI)}</svg>`;
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
  const svg=`<svg viewBox="0 0 200 195" style="max-width:230px;width:100%"><polygon points="100,20 180,160 20,160" fill="#fff8e1" stroke="#e65100" stroke-width="2"/><text x="100" y="185" text-anchor="middle" font-size="16" fill="#333">${s} cm</text>${vtxL([100,20],[100,113],'A')+vtxL([20,160],[100,113],'B')+vtxL([180,160],[100,113],'C')+angG([100,20],[20,160],[180,160],'BAC','Góc BAC = 60° — đỉnh A, hai cạnh AB và AC. Tam giác đều có 3 góc bằng nhau, mỗi góc 60°',30)+angG([20,160],[100,20],[180,160],'ABC','Góc ABC = 60° — đỉnh B, hai cạnh BA và BC',30)+angG([180,160],[20,160],[100,20],'BCA','Góc BCA = 60° — đỉnh C, hai cạnh CB và CA',30)}</svg>`;
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
  const svg=`<svg viewBox="0 0 260 175" style="max-width:300px;width:100%"><polygon points="30,130 230,130 180,40 80,40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="130" y="158" text-anchor="middle" font-size="16" fill="#333">${DL} cm</text><text x="130" y="30" text-anchor="middle" font-size="16" fill="#333">${DN} cm</text><text x="14" y="88" font-size="16" fill="#333">${leg} cm</text>${quadAng([30,130],[230,130],[180,40],[80,40],TRAPI)}</svg>`;
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
  const svg=`<svg viewBox="0 0 240 205" style="max-width:260px;width:100%"><polygon points="120,20 190,100 120,180 50,100" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2"/><line x1="120" y1="20" x2="120" y2="180" stroke="#6a1b9a" stroke-dasharray="5 4"/><line x1="50" y1="100" x2="190" y2="100" stroke="#6a1b9a" stroke-dasharray="5 4"/><text x="130" y="60" font-size="16" fill="#333">${d1} cm</text><text x="132" y="92" font-size="16" fill="#333">${d2} cm</text>${quadAng([120,20],[190,100],[120,180],[50,100],RHOI)}</svg>`;
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
  const svg=`<svg viewBox="0 0 260 185" style="max-width:300px;width:100%"><polygon points="40,140 200,140 235,45 75,45" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><line x1="75" y1="45" x2="75" y2="140" stroke="#1565c0" stroke-dasharray="5 4"/><text x="120" y="166" text-anchor="middle" font-size="16" fill="#333">${base} m</text><text x="84" y="98" font-size="16" fill="#333">${h} m</text>${quadAng([40,140],[200,140],[235,45],[75,45],PARAI)}</svg>`;
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
  if(!nums.some(x=>x%d===0)){const mults=[];for(let m=d;m<=160;m+=d)if(m>=21)mults.push(m);let mm=pick(mults);while(nums.includes(mm))mm=pick(mults);nums[0]=mm;}
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
   hint:'Xem lại các thẻ ở mục Thẻ lý thuyết tương tác: hình nào càng đều thì càng nhiều trục đối xứng.',
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
   hint:'Hãy nhớ lại thẻ lý thuyết của hình này ở mục Thẻ lý thuyết tương tác.',
   theory:'Trục đối xứng là đường thẳng mà khi gấp hình theo đường đó, hai nửa của hình trùng khít lên nhau.',
   kw:[{t:'bao nhiêu trục đối xứng',type:'ask',why:'Điều cần tìm: số trục đối xứng của hình.'},{t:s.n,type:'data',why:'Hình cần xét.'}],
   parts:[{label:'Số trục đối xứng',answer:''+s.a,unit:'trục'}],
   solution:[s.e]};
}},
setBasics:{chapter:1,topic:'Tập hợp (Bài 1)',gen(l){
  const mode=R(0,2);
  let elems=[],desc='';
  if(mode===0){const n=R(6,9);for(let x=1;x<n;x++)elems.push(x);desc=`các số tự nhiên nhỏ hơn ${n}`;}
  else if(mode===1){const n=R(9,15);for(let x=0;x<n;x+=2)elems.push(x);desc=`các số tự nhiên chẵn nhỏ hơn ${n}`;}
  else{const n=R(10,16);for(let x=1;x<n;x+=2)elems.push(x);desc=`các số tự nhiên lẻ nhỏ hơn ${n}`;}
  const cand=[],pool=new Set();
  while(cand.length<3){const v=R(0,16);if(!pool.has(v)){pool.add(v);cand.push(v);}}
  const inside=cand.filter(v=>elems.includes(v)).length;
  const sum=elems.reduce((s,v)=>s+v,0);
  return{title:'Tập hợp và phần tử',text:`Cho tập hợp A là tập hợp ${desc}.\nViết theo cách liệt kê: A = {${elems.join('; ')}}.\na) Tập hợp A có bao nhiêu phần tử?\nb) Tính tổng tất cả các phần tử của A.\nc) Trong ba số ${cand.join('; ')}, có bao nhiêu số thuộc tập hợp A?`,
   analysis:{given:[`Tập hợp A gồm ${desc}`,`Viết theo cách liệt kê: A = {${elems.join('; ')}}`],ask:'Số phần tử của A; tổng tất cả các phần tử của A; số số thuộc A trong ba số đã cho',plan:'Đếm các số đã liệt kê trong dấu { }. Cộng lần lượt các phần tử. Số nào có mặt trong A thì số đó thuộc A.'},
   hint:'Mỗi số viết trong dấu { } là một phần tử. Đếm chậm từng số, mỗi dấu chấm phẩy ngăn cách hai phần tử.',
   theory:'Tập hợp (Bài 1): mỗi đối tượng trong tập hợp gọi là một phần tử. Ký hiệu ∈ đọc là "thuộc", ký hiệu ∉ đọc là "không thuộc". Viết tập hợp bằng cách liệt kê các phần tử trong dấu { }, ngăn cách bằng dấu chấm phẩy.',
   kw:[{t:'tập hợp A',type:'data',why:'Tập hợp cần xét trong bài.'},{t:'bao nhiêu phần tử',type:'ask',why:'Điều cần tìm (ý a): đếm số phần tử của A.'},{t:'thuộc tập hợp A',type:'ask',why:'Điều cần tìm (ý c): số có mặt trong A thì thuộc A.'}],
   parts:[{label:'a) Số phần tử của A',answer:''+elems.length,unit:'phần tử'},{label:'b) Tổng tất cả các phần tử của A',answer:''+sum,unit:''},{label:'c) Số số thuộc A trong ba số đã cho',answer:''+inside,unit:'số'}],
   solution:[`Bước 1) Đọc tập hợp A theo cách liệt kê: A = {${elems.join('; ')}}.`,`Bước 2) Ý a) Đếm số phần tử: A có ${elems.length} phần tử.`,`Bước 3) Ý b) Cộng các phần tử: ${elems.join(' + ')} = ${sum}.`,`Bước 4) Ý c) Kiểm tra từng số: ${cand.map(v=>v+(elems.includes(v)?' thuộc A':' không thuộc A')).join('; ')}. Vậy có ${inside} số thuộc A.`]};
}},
numOrder:{chapter:1,topic:'Thứ tự trong tập hợp các số tự nhiên (Bài 3)',gen(l){
  const mx=l===1?15:(l===2?40:80);
  const x=R(2,mx),y=R(x+3,x+9),u=R(1,mx),v=u+R(3,7);
  return{title:'Thứ tự trên tia số',text:`Dựa vào tia số (số ở bên phải lớn hơn số ở bên trái), trả lời:\na) Số liền sau của ${x} là số nào?\nb) Số liền trước của ${y} là số nào?\nc) Có bao nhiêu số tự nhiên nằm giữa ${u} và ${v}?`,
   analysis:{given:['Tia số: các số tự nhiên tăng dần từ trái sang phải'],ask:'Số liền sau của một số; số liền trước của một số; số số tự nhiên nằm giữa hai số',plan:'Số liền sau hơn số đã cho 1 đơn vị. Số liền trước kém số đã cho 1 đơn vị. Liệt kê các số nằm giữa hai số rồi đếm.'},
   hint:`Số liền sau của ${x} đứng ngay bên phải ${x}. Các số nằm giữa ${u} và ${v} bắt đầu từ ${u+1}.`,
   theory:'Tia số (Bài 3): số ở bên phải lớn hơn số ở bên trái. Số liền sau của a là a + 1; số liền trước của a (với a lớn hơn 0) là a − 1.',
   kw:[{t:'liền sau',type:'op',why:'Số đứng ngay sau, hơn số đã cho 1 đơn vị.'},{t:'liền trước',type:'op',why:'Số đứng ngay trước, kém số đã cho 1 đơn vị.'},{t:'nằm giữa',type:'ask',why:'Các số lớn hơn số nhỏ và nhỏ hơn số lớn, không kể hai số ở hai đầu.'}],
   parts:[{label:`a) Số liền sau của ${x}`,answer:''+(x+1),unit:''},{label:`b) Số liền trước của ${y}`,answer:''+(y-1),unit:''},{label:`c) Số số tự nhiên nằm giữa ${u} và ${v}`,answer:''+(v-u-1),unit:'số'}],
   solution:[`Bước 1) Ý a) Số liền sau hơn số đã cho 1 đơn vị: ${x} + 1 = ${x+1}.`,`Bước 2) Ý b) Số liền trước kém số đã cho 1 đơn vị: ${y} − 1 = ${y-1}.`,`Bước 3) Ý c) Các số nằm giữa ${u} và ${v} là ${seq(u+1,v-1)}. Đếm được ${v-u-1} số.`]};
}},
divProp:{chapter:2,topic:'Quan hệ chia hết và tính chất (Bài 8)',gen(l){
  const N=pick([24,30,36,40,42,48,60]);
  const candSet=new Set();while(candSet.size<4)candSet.add(R(3,12));
  const cand=[...candSet];
  const divs=[];for(let dd=3;dd<=12;dd++)if(N%dd===0)divs.push(dd);
  if(!cand.some(v=>N%v===0))cand[0]=pick(divs);
  const uc=cand.filter(v=>N%v===0);
  const d=pick([3,4,5,6]),m1=R(2,9),m2=R(2,9),A=d*m1,B=d*m2;
  const k=pick([3,4,5,6]);
  const cand2Set=new Set();while(cand2Set.size<4)cand2Set.add(R(8,40));
  const cand2=[...cand2Set];
  if(!cand2.some(v=>v%k===0))cand2[0]=k*R(2,6);
  const boi=cand2.filter(v=>v%k===0);
  return{title:'Chia hết, ước và bội',text:`a) Trong các số ${cand.join('; ')}, có bao nhiêu số là ước của ${N}?\nb) Tính (${A} + ${B}) : ${d} bằng cách dùng tính chất chia hết của một tổng.\nc) Trong các số ${cand2.join('; ')}, có bao nhiêu số là bội của ${k}?`,
   analysis:{given:[`Ước của ${N}: các số tự nhiên mà ${N} chia hết cho chúng`,`${A} và ${B} đều chia hết cho ${d}`,`Bội của ${k}: các số chia hết cho ${k}`],ask:`Số ước của ${N} trong các số đã cho; giá trị của (${A} + ${B}) : ${d}; số bội của ${k} trong các số đã cho`,plan:`Ý a) và ý c): thử chia từng số. Ý b): cả hai số hạng đều chia hết cho ${d} nên tổng cũng chia hết cho ${d}; lấy từng số hạng chia cho ${d} rồi cộng.`},
   hint:`Ý b): ${A} : ${d} = ${m1} và ${B} : ${d} = ${m2}. Ý a): thử chia ${N} cho lần lượt từng số.`,
   theory:'Quan hệ chia hết (Bài 8): số tự nhiên a chia hết cho số tự nhiên b (b khác 0) khi có số tự nhiên q sao cho a = b × q. Khi đó a là bội của b, còn b là ước của a. Tính chất: nếu mỗi số hạng của một tổng đều chia hết cho cùng một số thì tổng cũng chia hết cho số đó.',
   kw:[{t:`ước của ${N}`,type:'data',why:`Số mà ${N} chia hết cho nó thì là ước của ${N}.`},{t:'tính chất chia hết của một tổng',type:'op',why:`Cách làm ý b): mỗi số hạng đều chia hết cho ${d} thì tổng cũng chia hết cho ${d}.`},{t:`bội của ${k}`,type:'data',why:`Số chia hết cho ${k} thì là bội của ${k}.`}],
   parts:[{label:`a) Số ước của ${N} trong các số đã cho`,answer:''+uc.length,unit:'số'},{label:`b) (${A} + ${B}) : ${d}`,answer:''+(m1+m2),unit:''},{label:`c) Số bội của ${k} trong các số đã cho`,answer:''+boi.length,unit:'số'}],
   solution:[`Bước 1) Ý a) Thử chia ${N} cho từng số: ${cand.map(v=>N%v===0?`${N} : ${v} = ${N/v} (chia hết)`:`${N} : ${v} không chia hết`).join('; ')}. Có ${uc.length} số là ước của ${N}: ${uc.join('; ')}.`,`Bước 2) Ý b) Vì ${A} chia hết cho ${d} và ${B} chia hết cho ${d} nên tổng cũng chia hết cho ${d}. Tính: (${A} + ${B}) : ${d} = ${A} : ${d} + ${B} : ${d} = ${m1} + ${m2} = ${m1+m2}.`,`Bước 3) Ý c) Các số chia hết cho ${k} trong các số đã cho: ${boi.length?boi.join('; '):'không có số nào'}. Vậy có ${boi.length} số là bội của ${k}.`]};
}},
intSet:{chapter:3,topic:'Tập hợp các số nguyên (Bài 13)',gen(l){
  const x=R(2,12),neg=-x;
  const u=-R(2,8),v=u+R(4,9);
  const list=[],used=new Set();
  while(list.length<5){const val=R(-9,9);if(!used.has(val)){used.add(val);list.push(val);}}
  const negs=list.filter(n=>n<0);
  return{title:'Số nguyên và số đối',text:`Dựa vào trục số (số ở bên phải lớn hơn số ở bên trái), trả lời:\na) Số đối của ${neg} là số nào?\nb) Có bao nhiêu số nguyên nằm giữa ${u} và ${v}?\nc) Trong các số ${list.join('; ')}, có bao nhiêu số nguyên âm?`,
   analysis:{given:['Trục số: điểm 0 ở giữa, bên phải số 0 là các số nguyên dương, bên trái số 0 là các số nguyên âm',`Các số cần xét ở ý c): ${list.join('; ')}`],ask:'Số đối của một số nguyên âm; số số nguyên nằm giữa hai số; số số nguyên âm trong các số đã cho',plan:'Số đối nằm ở phía bên kia của điểm 0 và cách đều 0. Liệt kê các số nguyên nằm giữa hai số rồi đếm. Số nguyên âm là số nhỏ hơn 0.'},
   hint:`Số đối của ${neg} nằm bên phải điểm 0, cách 0 đúng ${x} đơn vị.`,
   theory:'Tập hợp các số nguyên (Bài 13): gồm các số nguyên âm, số 0 và các số nguyên dương. Hai số đối nhau nằm ở hai phía của điểm 0 và cách đều 0. Số đối của 0 là 0.',
   kw:[{t:'Số đối',type:'op',why:'Số đối nằm ở phía bên kia của điểm 0 và cách đều 0.'},{t:'nằm giữa',type:'ask',why:'Các số lớn hơn số nhỏ và nhỏ hơn số lớn, không kể hai số ở hai đầu.'},{t:'số nguyên âm',type:'ask',why:'Các số nhỏ hơn 0, có dấu trừ ở phía trước.'}],
   parts:[{label:`a) Số đối của ${neg}`,answer:''+x,unit:''},{label:`b) Số số nguyên nằm giữa ${u} và ${v}`,answer:''+(v-u-1),unit:'số'},{label:'c) Số số nguyên âm trong các số đã cho',answer:''+negs.length,unit:'số'}],
   solution:[`Bước 1) Ý a) Số đối của ${neg} nằm ở phía đối diện qua điểm 0 và cách 0 đúng ${x} đơn vị: đó là số ${x}.`,`Bước 2) Ý b) Các số nguyên nằm giữa ${u} và ${v} là ${seq(u+1,v-1)}. Đếm được ${v-u-1} số.`,`Bước 3) Ý c) Các số nguyên âm trong các số đã cho: ${negs.length?negs.join('; '):'không có số nào'}. Vậy có ${negs.length} số nguyên âm.`]};
}},
intDiv:{chapter:3,topic:'Phép chia hết của một số nguyên (Bài 17)',gen(l){
  function mkq(){const dd=R(2,9)*(Math.random()<0.5?-1:1);const qq=R(2,9)*(Math.random()<0.5?-1:1);return{a:dd*qq,d:dd,q:qq};}
  const p1=mkq();let p2=mkq();let guard=0;while(p2.d===p1.d&&guard<20){p2=mkq();guard++;}
  const N=pick([6,8,12,18,20]);
  let cnt=0;for(let dd=-N;dd<=N;dd++){if(dd!==0&&N%dd===0)cnt++;}
  return{title:'Chia hết trong số nguyên',text:`Tính:\na) ${sgn(p1.a)} : ${sgn(p1.d)}\nb) ${sgn(p2.a)} : ${sgn(p2.d)}\nc) Số ${N} có bao nhiêu ước là số nguyên?`,
   analysis:{given:['Phép chia hai số nguyên khác dấu cho kết quả là số nguyên âm','Phép chia hai số nguyên cùng dấu cho kết quả là số nguyên dương','Ước của một số nguyên gồm cả số nguyên âm và số nguyên dương'],ask:`Kết quả của hai phép chia và số ước là số nguyên của ${N}`,plan:'Chia hai số như với số tự nhiên, rồi đặt dấu: khác dấu thì kết quả âm, cùng dấu thì kết quả dương. Liệt kê các ước dương của '+N+' rồi thêm các ước âm tương ứng.'},
   hint:`Ý a): ${Math.abs(p1.a)} : ${Math.abs(p1.d)} = ${Math.abs(p1.q)}; hai số ${p1.a<0!==p1.d<0?'khác dấu nên kết quả là số âm':'cùng dấu nên kết quả là số dương'}.`,
   theory:'Phép chia hết của một số nguyên (Bài 17): thương của hai số nguyên cùng dấu là số dương, khác dấu là số âm. Ước của một số nguyên gồm cả ước âm và ước dương.',
   kw:[{t:'ước là số nguyên',type:'ask',why:'Điều cần tìm (ý c): đếm cả ước âm và ước dương.'}],
   parts:[{label:`a) ${sgn(p1.a)} : ${sgn(p1.d)}`,answer:''+p1.q,unit:''},{label:`b) ${sgn(p2.a)} : ${sgn(p2.d)}`,answer:''+p2.q,unit:''},{label:`c) Số ước là số nguyên của ${N}`,answer:''+cnt,unit:'ước'}],
   solution:[`Bước 1) Ý a) Chia phần số: ${Math.abs(p1.a)} : ${Math.abs(p1.d)} = ${Math.abs(p1.q)}. Hai số ${p1.a} và ${p1.d} ${(p1.a<0)!==(p1.d<0)?'khác dấu':'cùng dấu'} nên (${p1.a}) : ${p1.d} = ${p1.q}.`,`Bước 2) Ý b) Chia phần số: ${Math.abs(p2.a)} : ${Math.abs(p2.d)} = ${Math.abs(p2.q)}. Hai số ${p2.a} và ${p2.d} ${(p2.a<0)!==(p2.d<0)?'khác dấu':'cùng dấu'} nên (${p2.a}) : ${p2.d} = ${p2.q}.`,`Bước 3) Ý c) Các ước dương của ${N} là ${posDiv(N)}. Thêm các ước âm tương ứng, số ước là số nguyên gấp đôi số ước dương: tất cả ${cnt} ước.`]};
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
   const SHAPE={rectGeo:'hinh-chu-nhat',squareGeo:'hinh-vuong',triGeo:'tam-giac-deu',trapGeo:'hinh-thang-can',rhombusGeo:'hinh-thoi',paraGeo:'hinh-binh-hanh',setBasics:'tap-hop',numOrder:'tia-so',intSet:'truc-so-nguyen'};
   if(SHAPE[k])p.shape=SHAPE[k];
   return p;
 }};
})();
