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
function fmtN(n){return (''+n).replace(/-/g,'−');}
const FIG_NOTE='<div style="font-size:14px;color:#666;margin-top:4px">(Hình minh họa, không theo tỉ lệ)</div>';
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
// ===== HK2 helpers (bo sung 2026-10-25) =====
function frR(n,d){const g=gcd(Math.abs(n),d);return [n/g,d/g];}
function frS(n,d){const r=frR(n,d);return r[1]===1?''+r[0]:r[0]+'/'+r[1];}
function decS(v,dp){const neg=v<0,a=Math.abs(v),base=Math.pow(10,dp),ip=Math.floor(a/base);let fp=String(a%base).padStart(dp,'0');while(fp.length>1&&fp.endsWith('0'))fp=fp.slice(0,-1);if(fp==='0')return (neg?'-':'')+ip;return (neg?'-':'')+ip+','+fp;}
function angSvg(deg){
  const rad=deg*Math.PI/180, x=Math.round(80+150*Math.cos(rad)), y=Math.round(150-150*Math.sin(rad));
  return '<svg viewBox="0 0 320 200" style="max-width:300px;width:100%"><line x1="80" y1="150" x2="300" y2="150" stroke="#333" stroke-width="2"/><line x1="80" y1="150" x2="'+x+'" y2="'+y+'" stroke="#333" stroke-width="2"/><text x="292" y="140" font-size="16" fill="#333">x</text><text x="'+(x+6)+'" y="'+(y+6)+'" font-size="16" fill="#333">y</text><text x="70" y="172" font-size="16" fill="#333">O</text><text x="108" y="132" font-size="16" fill="#333">'+deg+'°</text></svg>';
}
function barSvg(items,colors){
  const W=60*items.length+40;let s='<svg viewBox="0 0 '+W+' 175" style="max-width:360px;width:100%">';
  items.forEach((it,i)=>{const h=Math.round(it.v*7),x=30+i*60,y=140-h;
    s+='<rect x="'+x+'" y="'+y+'" width="34" height="'+h+'" fill="'+colors[i%colors.length]+'"/>';
    s+='<text x="'+(x+17)+'" y="'+(y-4)+'" text-anchor="middle" font-size="13" fill="#333">'+it.v+'</text>';
    s+='<text x="'+(x+17)+'" y="158" text-anchor="middle" font-size="12" fill="#333">'+it.n+'</text>';});
  return s+'</svg>';
}
function dblSvg(a1,a2,b1,b2){
  const sc=8;let s='<svg viewBox="0 0 300 185" style="max-width:320px;width:100%">';
  const bars=[[60,a1,'#42a5f5'],[92,a2,'#ef6c00'],[180,b1,'#42a5f5'],[212,b2,'#ef6c00']];
  bars.forEach(b=>{const h=b[1]*sc,y=140-h;s+='<rect x="'+b[0]+'" y="'+y+'" width="26" height="'+h+'" fill="'+b[2]+'"/><text x="'+(b[0]+13)+'" y="'+(y-4)+'" text-anchor="middle" font-size="13" fill="#333">'+b[1]+'</text>';});
  s+='<text x="76" y="158" text-anchor="middle" font-size="13" fill="#333">6A</text><text x="196" y="158" text-anchor="middle" font-size="13" fill="#333">6B</text>';
  s+='<rect x="30" y="170" width="14" height="10" fill="#42a5f5"/><text x="48" y="179" font-size="12" fill="#333">Học kì 1</text><rect x="130" y="170" width="14" height="10" fill="#ef6c00"/><text x="148" y="179" font-size="12" fill="#333">Học kì 2</text>';
  return s+'</svg>';
}
function picSvg(rows){
  let s='<svg viewBox="0 0 340 '+(42*rows.length+14)+'" style="max-width:360px;width:100%">';
  rows.forEach((r,i)=>{s+='<text x="10" y="'+(30+i*42)+'" font-size="16" fill="#333">'+r.n+': '+('⭐'.repeat(r.s))+'</text>';});
  return s+'</svg>';
}
function lineSvg(pts,lines){
  let s='<svg viewBox="0 0 300 200" style="max-width:320px;width:100%">';
  lines.forEach(L=>{s+='<line x1="'+L[0][0]+'" y1="'+L[0][1]+'" x2="'+L[1][0]+'" y2="'+L[1][1]+'" stroke="#333" stroke-width="2"/>';});
  pts.forEach(P=>{s+='<circle cx="'+P[0]+'" cy="'+P[1]+'" r="4" fill="#1565c0"/><text x="'+(P[0]+8)+'" y="'+(P[1]-8)+'" font-size="16" fill="#333">'+P[2]+'</text>';});
  return s+'</svg>';
}
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
   solution:[`Bước 1) Làm phép nhân và phép chia trước: ${a} × ${b} = ${ab} và ${c} : ${d} = ${q}, biểu thức thành ${ab} + ${q} − ${e}.`,`Bước 2) Tính từ trái sang phải: ${ab} + ${q} − ${e} = ${ab+q} − ${e} = ${ans}.`]};
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
   solution:[`Bước 1) Tính các lũy thừa trước: ${base}${sup(ex)} = ${pw} và ${b2}² = ${sq}.`,`Bước 2) Làm phép nhân rồi phép cộng: ${exs} = ${pw} × ${k} + ${sq} = ${pw*k} + ${sq} = ${ans}.`]};
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
   solution:[`Bước 1) Tìm ${a} × x trước: ${a} × x = ${c} − ${b} = ${c-b}.`,`Bước 2) Tìm x: x = ${c-b} : ${a} = ${x}.`]};
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
   solution:[`Bước 1) Tổng số ${ctx.item} mua được là: ${n} × ${m} = ${total}.`,`Bước 2) Số tiền phải trả là: ${total} × ${fmt(ctx.price)} = ${fmt(money)} (đồng).`,`Đáp số: ${fmt(money)} đồng.`]};
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
   solution:[`Bước 1) Vì các phần phải giống hệt nhau và chia hết, không thừa món nào nên số phần phải là ước chung của ${A} và ${B}. Muốn chia được nhiều phần nhất, ta lấy số phần là ước chung lớn nhất của ${A} và ${B}: ƯCLN(${A}; ${B}) = ${g}.`,`Bước 2) Số ${ctx.pb} trong mỗi phần là: ${A} : ${g} = ${A/g} (${ctx.pb.split(' ')[0]}).`,`Bước 3) Số ${ctx.pc} trong mỗi phần là: ${B} : ${g} = ${B/g} (${ctx.pc.split(' ')[0]}).`,`Đáp số: ${g} ${ctx.u1}; mỗi phần có ${A/g} ${ctx.pb} và ${B/g} ${ctx.pc}.`]};
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
   solution:[`Bước 1) Số ${ctx.q} cần tìm phải chia hết cho cả ${a} và ${b}, tức là bội chung của ${a} và ${b}. Vì cần số ${ctx.q} ít nhất nên số đó là bội chung nhỏ nhất của ${a} và ${b}: BCNN(${a}; ${b}) = ${L}.`,`Đáp số: ${L} ${ctx.q}.`]};
}},
rangeWord:{chapter:2,topic:'Bài toán bội chung',gen(l){
  const s=pick([{d1:10,d2:12,lo:100,hi:130,ans:120,L:60},{d1:12,d2:16,lo:80,hi:110,ans:96,L:48},{d1:9,d2:12,lo:90,hi:120,ans:108,L:36}]);
  return{title:'Xếp hàng',text:`Số học sinh khối 6 của một trường trong khoảng từ ${s.lo} đến ${s.hi} em. Khi xếp hàng ${s.d1} hoặc hàng ${s.d2} thì đều vừa đủ, không thừa em nào. Hỏi khối 6 có bao nhiêu học sinh?`,
   analysis:{given:[`Số học sinh nằm trong khoảng ${s.lo} đến ${s.hi}`,`Xếp hàng ${s.d1} hay hàng ${s.d2} đều vừa đủ`],ask:'Số học sinh khối 6',plan:`Số học sinh là bội chung của ${s.d1} và ${s.d2}. Tìm BCNN rồi liệt kê các bội của nó, chọn số nằm trong khoảng ${s.lo}–${s.hi}.`},
   hint:`BCNN(${s.d1}; ${s.d2}) = ${s.L}. Các bội của ${s.L}: ${s.L}; ${s.L*2}; ${s.L*3}; ...`,
   theory:'Số chia hết cho hai số cho trước là bội chung của chúng. Liệt kê bội của BCNN rồi chọn số thuộc khoảng đề cho.',
   kw:[{t:`từ ${s.lo} đến ${s.hi} em`,type:'data',why:`Đề cho: số học sinh nằm trong khoảng ${s.lo}–${s.hi}.`},{t:`xếp hàng ${s.d1} hoặc hàng ${s.d2}`,type:'op',why:`Số học sinh chia hết cho cả ${s.d1} và ${s.d2} → là bội chung của hai số này.`},{t:'đều vừa đủ, không thừa em nào',type:'op',why:'Chia hết hoàn toàn, không dư.'},{t:'bao nhiêu học sinh',type:'ask',why:'Điều cần tìm: số học sinh khối 6.'}],
   parts:[{label:'Số học sinh khối 6',answer:''+s.ans,unit:'em'}],
   solution:[`Bước 1) Vì xếp hàng ${s.d1} hoặc hàng ${s.d2} đều vừa đủ nên số học sinh khối 6 là bội chung của ${s.d1} và ${s.d2}. Bội chung nhỏ nhất của ${s.d1} và ${s.d2} là: BCNN(${s.d1}; ${s.d2}) = ${s.L}.`,`Bước 2) Các bội chung của ${s.d1} và ${s.d2} là các bội của ${s.L}: ${s.L}; ${s.L*2}; ${s.L*3}; ... Trong các số đó, chỉ có ${s.ans} nằm trong khoảng từ ${s.lo} đến ${s.hi}.`,`Đáp số: ${s.ans} học sinh.`]};
}},
tempWord:{chapter:3,topic:'Cộng, trừ số nguyên',gen(l){
  const place=pick(['Sa Pa','Đà Lạt','Mẫu Sơn','Hà Giang']);
  const s=R(-6,4),u=R(5,12),d=R(3,9),noon=s+u,eve=noon-d;
  return{title:'Nhiệt độ',text:`Buổi sáng, nhiệt độ ở ${place} là ${fmtN(s)}°C. Đến trưa, nhiệt độ tăng thêm ${u}°C. Đến tối, nhiệt độ giảm ${d}°C so với buổi trưa.\na) Nhiệt độ buổi trưa là bao nhiêu?\nb) Nhiệt độ buổi tối là bao nhiêu?`,
   analysis:{given:[`Sáng: ${fmtN(s)}°C`,`Trưa: tăng ${u}°C so với sáng`,`Tối: giảm ${d}°C so với trưa`],ask:'Nhiệt độ buổi trưa và buổi tối',plan:'Tăng thì cộng, giảm thì trừ. Tính lần lượt từng buổi.'},
   hint:`Nhiệt độ buổi trưa: ${fmtN(s)} + ${u} = ${fmtN(noon)} (°C).`,
   theory:'Nhiệt độ tăng thêm → phép cộng; nhiệt độ giảm đi → phép trừ. Số âm chỉ nhiệt độ dưới 0°C.',
   kw:[{t:`${fmtN(s)}°C`,type:'data',why:'Đề cho: nhiệt độ buổi sáng.'},{t:`tăng thêm ${u}°C`,type:'op',why:'Từ khóa "tăng thêm" → phép cộng.'},{t:`giảm ${d}°C`,type:'op',why:'Từ khóa "giảm" → phép trừ.'},{t:'Nhiệt độ buổi trưa là bao nhiêu',type:'ask',why:'Điều cần tìm (ý a): nhiệt độ buổi trưa.'},{t:'Nhiệt độ buổi tối là bao nhiêu',type:'ask',why:'Điều cần tìm (ý b): nhiệt độ buổi tối.'}],
   parts:[{label:'a) Nhiệt độ buổi trưa',answer:''+noon,unit:'°C'},{label:'b) Nhiệt độ buổi tối',answer:''+eve,unit:'°C'}],
   solution:[`Bước 1) Nhiệt độ buổi trưa là: ${fmtN(s)} + ${u} = ${fmtN(noon)} (°C).`,`Bước 2) Nhiệt độ buổi tối là: ${fmtN(noon)} − ${d} = ${fmtN(eve)} (°C).`,`Đáp số: Buổi trưa ${fmtN(noon)}°C; buổi tối ${fmtN(eve)}°C.`]};
}},
intExpr:{chapter:3,topic:'Tính biểu thức số nguyên',gen(l){
  const a=R(11,l===1?30:60),b=R(20,60),c=R(5,35),ans=-a+b-c;
  const ex=`(−${a}) + ${b} − ${c}`;
  return{title:'Tính giá trị biểu thức',text:`Tính giá trị của biểu thức:\n${ex}`,
   analysis:{given:['Biểu thức gồm các số nguyên âm và dương, chỉ có cộng và trừ'],ask:'Tính giá trị của biểu thức',plan:`Tính từ trái sang phải: (−${a}) + ${b} trước, lấy kết quả trừ đi ${c}.`},
   hint:`(−${a}) + ${b} = ${fmtN(-a+b)}.`,
   theory:'Cộng hai số nguyên khác dấu: lấy số có giá trị lớn hơn trừ số nhỏ hơn, kết quả mang dấu của số lớn hơn. Sau đó tính tiếp từ trái sang phải.',
   kw:[{t:'Tính giá trị của biểu thức',type:'ask',why:'Điều cần tìm: kết quả cuối cùng của biểu thức.'},{t:ex,type:'data',why:'Số liệu đề cho: biểu thức số nguyên, tính từ trái sang phải.'}],
   parts:[{label:'Kết quả',answer:''+ans,unit:''}],
   solution:[`Bước 1) Tính từ trái sang phải, làm (−${a}) + ${b} trước: (−${a}) + ${b} = ${fmtN(-a+b)}.`,`Bước 2) Lấy kết quả trừ đi ${c}: ${fmtN(-a+b)} − ${c} = ${fmtN(ans)}.`]};
}},
intBracket:{chapter:3,topic:'Quy tắc dấu ngoặc (Bài 15)',gen(l){
  const a=R(l===1?25:35,l===1?50:70),b=R(8,40),c=b+R(3,25),d=R(4,30),s=pick(['−','+']);
  const inner=b-c, mid=a-inner, ans=s==='−'?mid-d:mid+d;
  const ex=`${a} − (${b} − ${c}) ${s} ${d}`;
  return{title:'Tính biểu thức có dấu ngoặc',text:`Tính giá trị của biểu thức:\n${ex}`,
   analysis:{given:[`Biểu thức có dấu ngoặc, phía trước ngoặc là dấu trừ`,`Trong ngoặc: ${b} − ${c} cho kết quả là số âm`],ask:'Tính giá trị của biểu thức',plan:`Bước 1) Tính trong ngoặc trước. Bước 2) Bỏ dấu ngoặc theo quy tắc dấu ngoặc: ${a} − (${fmtN(inner)}) = ${a} + ${fmtN(-inner)}. Bước 3) Tính tiếp từ trái sang phải.`},
   hint:`Trong ngoặc: ${b} − ${c} = ${fmtN(inner)}. Nhớ: trừ một số âm bằng cộng số dương.`,
   theory:'Quy tắc dấu ngoặc (Bài 15): khi bỏ dấu ngoặc có dấu + đằng trước, giữ nguyên dấu của các số hạng trong ngoặc; khi bỏ dấu ngoặc có dấu \u2212 đằng trước, phải đổi dấu mọi số hạng trong ngoặc. Trừ một số âm bằng cộng với số đối của nó.',
   kw:[{t:'Tính giá trị của biểu thức',type:'ask',why:'Điều cần tìm: kết quả cuối cùng của biểu thức.'},{t:ex,type:'data',why:'Số liệu đề cho: biểu thức có dấu ngoặc \u2014 tính trong ngoặc trước, bỏ ngoặc theo quy tắc dấu ngoặc.'}],
   parts:[{label:'Kết quả',answer:''+ans,unit:''}],
   solution:[`Bước 1) Tính trong ngoặc trước: ${b} − ${c} = ${fmtN(inner)}. Biểu thức trở thành: ${a} − (${fmtN(inner)}) ${s} ${d}.`,`Bước 2) Bỏ dấu ngoặc: phía trước ngoặc là dấu trừ nên đổi dấu số hạng trong ngoặc: ${a} − (${fmtN(inner)}) = ${a} + ${fmtN(-inner)} = ${fmtN(mid)}.`,`Bước 3) Tính tiếp từ trái sang phải: ${fmtN(mid)} ${s} ${d} = ${fmtN(ans)}.`]};
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
   solution:[`Bước 1) Số tiền còn lại của Nam là: ${fmt(S)} − ${fmt(x)} + ${fmt(y)} − ${fmt(z)} = ${fmt(S-x)} + ${fmt(y)} − ${fmt(z)} = ${fmt(ans)} (đồng).`,`Đáp số: ${fmt(ans)} đồng.`]};
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
   solution:[`Bước 1) Chu vi của mảnh vườn là: (${L} + ${W}) × 2 = ${L+W} × 2 = ${P} (m).`,`Bước 2) Diện tích của mảnh vườn là: ${L} × ${W} = ${A} (m²).`,`Đáp số: Chu vi ${P} m; diện tích ${A} m².`]};
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
   solution:[`Bước 1) Chu vi của sân chơi là: ${s} × 4 = ${P} (m).`,`Bước 2) Diện tích của sân chơi là: ${s} × ${s} = ${A} (m²).`,`Đáp số: Chu vi ${P} m; diện tích ${A} m².`]};
}},
triGeo:{chapter:4,topic:'Tam giác đều',gen(l){
  const s=R(12,45),P=s*3;
  const svg=`<svg viewBox="0 0 200 195" style="max-width:230px;width:100%"><polygon points="100,20 180,160 20,160" fill="#fff8e1" stroke="#e65100" stroke-width="2"/><text x="100" y="185" text-anchor="middle" font-size="16" fill="#333">${s} cm</text>${vtxL([100,20],[100,113],'A')+vtxL([20,160],[100,113],'B')+vtxL([180,160],[100,113],'C')+angG([100,20],[20,160],[180,160],'BAC','Góc BAC = 60° — đỉnh A, hai cạnh AB và AC. Tam giác đều có 3 góc bằng nhau, mỗi góc 60°',30)+angG([20,160],[100,20],[180,160],'ABC','Góc ABC = 60° — đỉnh B, hai cạnh BA và BC',30)+angG([180,160],[20,160],[100,20],'BCA','Góc BCA = 60° — đỉnh C, hai cạnh CB và CA',30)}</svg>`;
  return{title:'Biển báo tam giác đều',text:`Một biển báo giao thông có dạng tam giác đều với cạnh dài ${s} cm. Tính chu vi của biển báo đó.`,svg:svg+FIG_NOTE,
   analysis:{given:['Tam giác đều: 3 cạnh bằng nhau, mỗi cạnh '+s+' cm'],ask:'Chu vi của biển báo',plan:'Chu vi là tổng độ dài 3 cạnh. Vì 3 cạnh bằng nhau nên lấy cạnh × 3.'},
   hint:`Tam giác đều có 3 cạnh bằng nhau: ${s} × 3.`,
   theory:'Tam giác đều: Chu vi P = a × 3. Trong đó a là độ dài cạnh (3 cạnh bằng nhau, 3 góc đều bằng 60°).',
   kw:[{t:'tam giác đều',type:'op',why:'Từ khóa: tam giác đều có 3 cạnh bằng nhau → chu vi = cạnh × 3.'},{t:`cạnh dài ${s} cm`,type:'data',why:'Đề cho: mỗi cạnh dài bấy nhiêu.'},{t:'Tính chu vi',type:'ask',why:'Điều cần tìm: chu vi của biển báo.'}],
   parts:[{label:'Chu vi',answer:''+P,unit:'cm'}],
   solution:[`Bước 1) Biển báo có dạng tam giác đều nên ba cạnh của nó bằng nhau. Chu vi của biển báo là: ${s} × 3 = ${P} (cm).`,`Đáp số: ${P} cm.`]};
}},
trapGeo:{chapter:4,topic:'Hình thang cân',gen(l){
  const DL=R(11,18),DN=R(6,DL-3),leg=R(4,9),P=DL+DN+2*leg;
  const svg=`<svg viewBox="0 0 260 175" style="max-width:300px;width:100%"><polygon points="30,130 230,130 180,40 80,40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/><text x="130" y="158" text-anchor="middle" font-size="16" fill="#333">${DL} cm</text><text x="130" y="30" text-anchor="middle" font-size="16" fill="#333">${DN} cm</text><text x="14" y="88" font-size="16" fill="#333">${leg} cm</text>${quadAng([30,130],[230,130],[180,40],[80,40],TRAPI)}</svg>`;
  return{title:'Mặt bàn hình thang cân',text:`Mặt bàn có dạng hình thang cân với đáy lớn ${DL} cm, đáy nhỏ ${DN} cm và cạnh bên ${leg} cm. Tính chu vi của mặt bàn.`,svg:svg+FIG_NOTE,
   analysis:{given:[`Hình thang cân: đáy lớn ${DL} cm, đáy nhỏ ${DN} cm`,`Hình thang cân có 2 cạnh bên bằng nhau, mỗi cạnh ${leg} cm`],ask:'Chu vi của mặt bàn',plan:`Chu vi = đáy lớn + đáy nhỏ + cạnh bên + cạnh bên = ${DL} + ${DN} + ${leg} + ${leg}.`},
   hint:`Hình thang cân có hai cạnh bên bằng nhau: ${DL} + ${DN} + ${leg} × 2.`,
   theory:'Chu vi của một hình bằng tổng độ dài tất cả các cạnh. Hình thang: Diện tích S = (a + b) × h : 2 (a là đáy lớn, b là đáy nhỏ, h là chiều cao). Hình thang cân có 2 cạnh bên bằng nhau.',
   kw:[{t:'hình thang cân',type:'op',why:'Từ khóa: hình thang cân có 2 cạnh bên bằng nhau.'},{t:`đáy lớn ${DL} cm`,type:'data',why:'Đề cho: đáy lớn.'},{t:`đáy nhỏ ${DN} cm`,type:'data',why:'Đề cho: đáy nhỏ.'},{t:`cạnh bên ${leg} cm`,type:'data',why:'Đề cho: mỗi cạnh bên, mà hình có 2 cạnh bên.'},{t:'Tính chu vi',type:'ask',why:'Điều cần tìm: chu vi mặt bàn = tổng 4 cạnh.'}],
   parts:[{label:'Chu vi',answer:''+P,unit:'cm'}],
   solution:[`Bước 1) Hình thang cân có hai cạnh bên bằng nhau nên chu vi của mặt bàn là tổng độ dài bốn cạnh: ${DL} + ${DN} + ${leg} + ${leg} = ${P} (cm).`,`Đáp số: ${P} cm.`]};
}},
rhombusGeo:{chapter:4,topic:'Hình thoi',gen(l){
  let d1=pick([6,8,10,12,14,16]),d2=pick([4,6,8,10,12,14]);
  if(d1===d2)d2=d1+2;
  const A=d1*d2/2;
  const mxD=Math.max(d1,d2),hv=Math.round(80*d1/mxD),hh=Math.round(70*d2/mxD);
  const pT=[120,100-hv],pR=[120+hh,100],pB=[120,100+hv],pL=[120-hh,100];
  const svg=`<svg viewBox="0 0 240 205" style="max-width:260px;width:100%"><polygon points="${pT[0]},${pT[1]} ${pR[0]},${pR[1]} ${pB[0]},${pB[1]} ${pL[0]},${pL[1]}" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2"/><line x1="120" y1="${pT[1]}" x2="120" y2="${pB[1]}" stroke="#6a1b9a" stroke-dasharray="5 4"/><line x1="${pL[0]}" y1="100" x2="${pR[0]}" y2="100" stroke="#6a1b9a" stroke-dasharray="5 4"/><text x="130" y="${100-Math.round(hv/2)}" font-size="16" fill="#333">${d1} cm</text><text x="${120+Math.round(hh/2)-14}" y="92" font-size="16" fill="#333">${d2} cm</text>${quadAng(pT,pR,pB,pL,RHOI)}</svg>`;
  return{title:'Diện tích hình thoi',text:`Một viên gạch trang trí hình thoi có hai đường chéo dài ${d2} cm và ${d1} cm. Tính diện tích của viên gạch.`,svg:svg+FIG_NOTE,
   analysis:{given:[`Hình thoi có hai đường chéo ${d2} cm và ${d1} cm`],ask:'Diện tích viên gạch',plan:`Diện tích hình thoi bằng một nửa tích hai đường chéo: (${d2} × ${d1}) : 2.`},
   hint:`${d2} × ${d1} = ${d2*d1}, rồi chia cho 2.`,
   theory:'Hình thoi: Diện tích S = (m × n) : 2. Trong đó m và n là độ dài hai đường chéo (hai đường chéo vuông góc với nhau).',
   kw:[{t:`hai đường chéo dài ${d2} cm và ${d1} cm`,type:'data',why:'Đề cho: độ dài hai đường chéo của hình thoi.'},{t:'Tính diện tích',type:'ask',why:'Điều cần tìm: diện tích viên gạch (hình thoi).'}],
   parts:[{label:'Diện tích',answer:''+A,unit:'cm²'}],
   solution:[`Bước 1) Diện tích của viên gạch hình thoi là: (${d2} × ${d1}) : 2 = ${d2*d1} : 2 = ${A} (cm²).`,`Đáp số: ${A} cm².`]};
}},
paraGeo:{chapter:4,topic:'Hình bình hành',gen(l){
  const base=R(6,16),h=R(3,base-1),A=base*h;
  const svg=`<svg viewBox="0 0 260 185" style="max-width:300px;width:100%"><polygon points="40,140 200,140 235,45 75,45" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/><line x1="75" y1="45" x2="75" y2="140" stroke="#1565c0" stroke-dasharray="5 4"/><text x="120" y="166" text-anchor="middle" font-size="16" fill="#333">${base} m</text><text x="84" y="98" font-size="16" fill="#333">${h} m</text>${quadAng([40,140],[200,140],[235,45],[75,45],PARAI)}</svg>`;
  return{title:'Diện tích hình bình hành',text:`Một mảnh đất hình bình hành có cạnh đáy ${base} m và chiều cao từ đỉnh D đến cạnh đáy đó dài ${h} m. Tính diện tích của mảnh đất.`,svg:svg+FIG_NOTE,
   analysis:{given:[`Hình bình hành: cạnh đáy ${base} m, chiều cao từ đỉnh D đến cạnh đáy đó là ${h} m`],ask:'Diện tích mảnh đất',plan:'Diện tích hình bình hành = cạnh đáy × chiều cao tương ứng.'},
   hint:`Lấy cạnh đáy nhân với chiều cao: ${base} × ${h}.`,
   theory:'Hình bình hành: Diện tích S = a × h. Trong đó a là độ dài cạnh đáy, h là chiều cao ứng với cạnh đáy đó.',
   kw:[{t:`cạnh đáy ${base} m`,type:'data',why:'Đề cho: cạnh đáy hình bình hành.'},{t:`chiều cao từ đỉnh D đến cạnh đáy đó dài ${h} m`,type:'data',why:'Đề cho: chiều cao từ đỉnh D đến cạnh đáy đó — phải ghép đúng cặp đáy × chiều cao.'},{t:'Tính diện tích',type:'ask',why:'Điều cần tìm: diện tích mảnh đất.'}],
   parts:[{label:'Diện tích',answer:''+A,unit:'m²'}],
   solution:[`Bước 1) Diện tích của mảnh đất hình bình hành là: ${base} × ${h} = ${A} (m²).`,`Đáp số: ${A} m².`]};
}},
romanWord:{chapter:1,topic:'Số La Mã (Bài 2)',gen(l){
  const table=[[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  const toRoman=n=>{let r='';for(const [v,sm] of table){while(n>=v){r+=sm;n-=v;}}return r;};
  const maxN=l===1?19:(l===2?39:89);
  const n=R(4,maxN), r=toRoman(n);
  const symVal={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  const rParts=[];let ri=0;
  while(ri<r.length){
    const curV=symVal[r[ri]],nxtV=ri+1<r.length?symVal[r[ri+1]]:0;
    if(nxtV>curV){rParts.push({t:r.slice(ri,ri+2),v:nxtV-curV,sub:`${r[ri]} đứng trước ${r[ri+1]} nên lấy ${nxtV} − ${curV} = ${nxtV-curV}`});ri+=2;}
    else{rParts.push({t:r[ri],v:curV});ri+=1;}
  }
  const rPartStr=rParts.map(p=>p.t+' = '+p.v+(p.sub?' ('+p.sub+')':'')).join(', ');
  return{title:'Đọc số La Mã',text:`Số La Mã ${r} viết trong hệ thập phân là số nào?`,
   analysis:{given:[`Số La Mã ${r}`, 'Các ký hiệu: I = 1, V = 5, X = 10, L = 50; ký hiệu nhỏ đứng trước ký hiệu lớn thì trừ (IV = 4, IX = 9, XL = 40)'],ask:'Giá trị của số La Mã trong hệ thập phân',plan:'Cộng giá trị các ký hiệu từ trái sang phải; gặp cặp trừ (IV, IX, XL) thì tính cặp đó trước.'},
   hint:'Nhớ: I = 1, V = 5, X = 10, L = 50. Ví dụ XIV = 10 + 4 = 14.',
   theory:'Cách ghi số La Mã (Bài 2): I = 1, V = 5, X = 10, L = 50. Ký hiệu nhỏ đứng trước ký hiệu lớn hơn để chỉ phép trừ: IV = 4, IX = 9, XL = 40.',
   kw:[{t:r,type:'data',why:'Số La Mã cần đổi sang hệ thập phân.'},{t:'hệ thập phân',type:'method',why:'Đích cần đổi sang: cách ghi số thường dùng hằng ngày.'}],
   parts:[{label:'Số thập phân tương ứng',answer:''+n,unit:''}],
   solution:[`Bước 1) Tách số La Mã thành từng phần: ${rPartStr}.`,`Bước 2) Cộng lại: ${rParts.map(p=>p.v).join(' + ')} = ${n}.`]};
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
   solution:[`Bước 1) Kiểm tra từng số bằng dấu hiệu chia hết cho ${d} (${rule}): các số chia hết cho ${d} là ${ok.join(', ')}.`,`Bước 2) Chọn số lớn nhất trong các số đó: ${ans}.`]};
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
   solution:[`Bước 1) Chia ${n} cho ${p2}^${b} = ${Math.pow(p2,b)} trước: ${n} : ${Math.pow(p2,b)} = ${Math.pow(p1,a)}.`,`Bước 2) Phần còn lại là lũy thừa của ${p1}: ${Math.pow(p1,a)} = ${p1}^${a}, vậy x = ${a}.`]};
}},
intMul:{chapter:3,topic:'Phép nhân số nguyên (Bài 16)',gen(l){
  const a=(l===1?R(2,9):R(3,15))*(pick([-1,1])||1);
  let A=a===0?-3:a;
  const B=(l===1?R(2,9):R(3,12))*pick([-1,-1,1]);
  const c=l===3?R(2,9)*pick([-1,1]):null;
  const prod=A*B, total=c===null?prod:prod+c;
  const expr=c===null?`${sgn(A)} × ${sgn(B)}`:`${sgn(A)} × ${sgn(B)} + ${sgn(c)}`;
  return{title:'Nhân số nguyên',text:`Tính: ${expr}`,
   analysis:{given:['Quy tắc dấu: cùng dấu cho kết quả dương, khác dấu cho kết quả âm'],ask:'Giá trị của biểu thức',plan:'Nhân hai số nguyên trước (xác định dấu, rồi nhân hai giá trị tuyệt đối), sau đó mới cộng/trừ tiếp nếu có.'},
   hint:'Cùng dấu → dấu +; khác dấu → dấu −. Nhân phần số như số tự nhiên rồi đặt dấu.',
   theory:'Phép nhân số nguyên (Bài 16): tích của hai số nguyên cùng dấu là số dương; tích của hai số nguyên khác dấu là số âm. Quy tắc dấu ngoặc (Bài 15): bỏ ngoặc có dấu − đằng trước thì đổi dấu các số hạng trong ngoặc.',
   kw:[{t:sgn(A)+' × '+sgn(B),type:'method',why:'Phép nhân hai số nguyên: chú ý dấu của hai thừa số.'}],
   parts:[{label:'Kết quả',answer:''+total,unit:''}],
   solution:[`Bước 1) Nhân hai số nguyên trước: ${sgn(A)} × ${sgn(B)} = ${fmtN(prod)} (${A<0!==B<0?'khác dấu nên kết quả âm':'cùng dấu nên kết quả dương'}).`,...(c===null?[]:[`Bước 2) Cộng tiếp số còn lại: ${fmtN(prod)} + ${sgn(c)} = ${fmtN(total)}.`])]};
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
   solution:[...chosen.map((x,i)=>`Bước ${i+1}) ${x.n}: ${x.c?'có':'không có'} tâm đối xứng.`),`Vậy: có ${ans} hình có tâm đối xứng.`]};
}},

axisTriple:{chapter:5,topic:'Trục đối xứng',gen(l){
  const all=[
    {n:'Hình vuông',a:4},{n:'Hình chữ nhật',a:2},{n:'Tam giác đều',a:3},
    {n:'Hình thoi',a:2},{n:'Hình thang cân',a:1},{n:'Lục giác đều',a:6},{n:'Hình bình hành',a:0}];
  const shuffled=[...all].sort(()=>Math.random()-0.5).slice(0,3);
  const labels=['a) ','b) ','c) '];
  return{title:'Đếm trục đối xứng',text:'Mỗi hình sau có bao nhiêu trục đối xứng?\n'+shuffled.map((s,i)=>labels[i]+s.n).join('\n'),
   analysis:{given:['Trục đối xứng là đường thẳng chia hình thành hai phần giống hệt nhau khi gấp lại'],ask:'Số trục đối xứng của từng hình',plan:'Gấp thử từng hình trong đầu: '+shuffled.map(s=>s.n+' có '+s.a+' trục').join('; ')+'.'},
   hint:'Xem lại các thẻ ở mục Thẻ lý thuyết tương tác: hình nào càng đều thì càng nhiều trục đối xứng.',
   theory:'Trục đối xứng là đường thẳng mà khi gấp hình theo đường đó, hai nửa của hình trùng khít lên nhau.',
   kw:[{t:'bao nhiêu trục đối xứng',type:'ask',why:'Điều cần tìm: số trục đối xứng của từng hình.'},...shuffled.map(s=>({t:s.n,type:'data',why:'Hình cần xét.'}))],
   parts:shuffled.map((s,i)=>({label:labels[i]+s.n,answer:''+s.a,unit:'trục'})),
   solution:shuffled.map((s,i)=>`Bước ${i+1}) ${s.n}: ${s.a} trục đối xứng.`)};
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
   solution:[`Bước 1) Gấp thử hình trong đầu và kiểm tra hai nửa có trùng khít không: ${s.e}`,`Vậy: ${s.n} có ${s.a} trục đối xứng.`]};
}},
setBasics:{chapter:1,topic:'Tập hợp (Bài 1)',gen(l){
  const mode=R(0,2);
  let elems=[],desc='';
  if(mode===0){const n=R(6,9);for(let x=0;x<n;x++)elems.push(x);desc=`các số tự nhiên nhỏ hơn ${n}`;}
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
  return{title:'Số nguyên và số đối',text:`Dựa vào trục số (số ở bên phải lớn hơn số ở bên trái), trả lời:\na) Số đối của ${fmtN(neg)} là số nào?\nb) Có bao nhiêu số nguyên nằm giữa ${fmtN(u)} và ${fmtN(v)}?\nc) Trong các số ${fmtN(list.join('; '))}, có bao nhiêu số nguyên âm?`,
   analysis:{given:['Trục số: điểm 0 ở giữa, bên phải số 0 là các số nguyên dương, bên trái số 0 là các số nguyên âm',`Các số cần xét ở ý c): ${fmtN(list.join('; '))}`],ask:'Số đối của một số nguyên âm; số số nguyên nằm giữa hai số; số số nguyên âm trong các số đã cho',plan:'Số đối nằm ở phía bên kia của điểm 0 và cách đều 0. Liệt kê các số nguyên nằm giữa hai số rồi đếm. Số nguyên âm là số nhỏ hơn 0.'},
   hint:`Số đối của ${fmtN(neg)} nằm bên phải điểm 0, cách 0 đúng ${x} đơn vị.`,
   theory:'Tập hợp các số nguyên (Bài 13): gồm các số nguyên âm, số 0 và các số nguyên dương. Hai số đối nhau nằm ở hai phía của điểm 0 và cách đều 0. Số đối của 0 là 0.',
   kw:[{t:'Số đối',type:'op',why:'Số đối nằm ở phía bên kia của điểm 0 và cách đều 0.'},{t:'nằm giữa',type:'ask',why:'Các số lớn hơn số nhỏ và nhỏ hơn số lớn, không kể hai số ở hai đầu.'},{t:'số nguyên âm',type:'ask',why:'Các số nhỏ hơn 0, có dấu trừ ở phía trước.'}],
   parts:[{label:`a) Số đối của ${fmtN(neg)}`,answer:''+x,unit:''},{label:`b) Số số nguyên nằm giữa ${fmtN(u)} và ${fmtN(v)}`,answer:''+(v-u-1),unit:'số'},{label:'c) Số số nguyên âm trong các số đã cho',answer:''+negs.length,unit:'số'}],
   solution:[`Bước 1) Ý a) Số đối của ${fmtN(neg)} nằm ở phía đối diện qua điểm 0 và cách 0 đúng ${x} đơn vị: đó là số ${x}.`,`Bước 2) Ý b) Các số nguyên nằm giữa ${fmtN(u)} và ${fmtN(v)} là ${fmtN(seq(u+1,v-1))}. Đếm được ${v-u-1} số.`,`Bước 3) Ý c) Các số nguyên âm trong các số đã cho: ${negs.length?fmtN(negs.join('; ')):'không có số nào'}. Vậy có ${negs.length} số nguyên âm.`]};
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
   solution:[`Bước 1) Ý a) Chia phần số: ${Math.abs(p1.a)} : ${Math.abs(p1.d)} = ${Math.abs(p1.q)}. Hai số ${fmtN(p1.a)} và ${fmtN(p1.d)} ${(p1.a<0)!==(p1.d<0)?'khác dấu':'cùng dấu'} nên (${fmtN(p1.a)}) : ${fmtN(p1.d)} = ${fmtN(p1.q)}.`,`Bước 2) Ý b) Chia phần số: ${Math.abs(p2.a)} : ${Math.abs(p2.d)} = ${Math.abs(p2.q)}. Hai số ${fmtN(p2.a)} và ${fmtN(p2.d)} ${(p2.a<0)!==(p2.d<0)?'khác dấu':'cùng dấu'} nên (${fmtN(p2.a)}) : ${fmtN(p2.d)} = ${fmtN(p2.q)}.`,`Bước 3) Ý c) Các ước dương của ${N} là ${posDiv(N)}. Thêm các ước âm tương ứng, số ước là số nguyên gấp đôi số ước dương: tất cả ${cnt} ước.`]};
}}
,
fracEqual:{chapter:6,topic:'Phân số bằng nhau',gen(l){
  const b=R(3,9);let a=R(2,b-1);while(gcd(a,b)!==1)a=R(2,b-1);
  const k=R(2,5),nb=b*k,na=a*k;
  const d=R(3,9);let c=R(2,d-1);while(gcd(c,d)!==1)c=R(2,d-1);
  const m=R(2,5),nc=c*m,nd=d*m;
  let e=R(2,9),f=R(3,12),g=gcd(e,f);while(g===1||e===f){e=R(2,9);f=R(3,12);g=gcd(e,f);}
  const re=e/g,rf=f/g;
  return{title:'Viết lại và rút gọn phân số',text:`a) Viết phân số ${a}/${b} thành phân số có mẫu số là ${nb}. Tử số mới là bao nhiêu?\nb) Viết phân số ${c}/${d} thành phân số có tử số là ${nc}. Mẫu số mới là bao nhiêu?\nc) Rút gọn phân số ${e}/${f}. Phân số tối giản có tử số là bao nhiêu?`,
   analysis:{given:[`Phân số ${a}/${b}`,`Phân số ${c}/${d}`,`Phân số ${e}/${f}`],ask:'Tử số mới; mẫu số mới; tử số sau khi rút gọn',plan:`Ý a) Tìm số nhân: ${nb} : ${b} = ${k}, rồi nhân cả tử và mẫu với ${k}. Ý b) Tìm số nhân: ${nc} : ${c} = ${m}, rồi nhân cả tử và mẫu với ${m}. Ý c) Chia cả tử và mẫu cho ƯCLN(${e}; ${f}) = ${g}.`},
   hint:`${nb} : ${b} = ${k}; ${nc} : ${c} = ${m}; ƯCLN(${e}; ${f}) = ${g}.`,
   theory:'Muốn được phân số bằng phân số đã cho, ta nhân (hoặc chia) cả tử số và mẫu số cho cùng một số khác 0. Rút gọn phân số là chia cả tử số và mẫu số cho ƯCLN của chúng.',
   kw:[{t:`${a}/${b}`,type:'data',why:'Đề cho: phân số cần viết lại.'},{t:`mẫu số là ${nb}`,type:'op',why:`Muốn mẫu thành ${nb}: tìm ${nb} : ${b} = ${k} rồi nhân cả tử và mẫu với ${k}.`},{t:`tử số là ${nc}`,type:'op',why:`Muốn tử thành ${nc}: tìm ${nc} : ${c} = ${m} rồi nhân cả tử và mẫu với ${m}.`},{t:'Rút gọn',type:'ask',why:'Chia cả tử và mẫu cho ƯCLN của chúng.'}],
   parts:[{label:`a) Tử số mới của ${a}/${b}`,answer:''+na,unit:''},{label:`b) Mẫu số mới của ${c}/${d}`,answer:''+nd,unit:''},{label:`c) Tử số sau khi rút gọn ${e}/${f}`,answer:''+re,unit:''}],
   solution:[`Bước 1) Ý a) Vì ${nb} : ${b} = ${k} nên muốn mẫu số thành ${nb}, ta nhân cả tử số và mẫu số của ${a}/${b} với ${k}: ${a} × ${k} = ${na}, ${b} × ${k} = ${nb}. Vậy phân số mới là ${na}/${nb}, tử số mới là ${na}.`,`Bước 2) Ý b) Vì ${nc} : ${c} = ${m} nên ta nhân cả tử số và mẫu số của ${c}/${d} với ${m}: ${c} × ${m} = ${nc}, ${d} × ${m} = ${nd}. Vậy phân số mới là ${nc}/${nd}, mẫu số mới là ${nd}.`,`Bước 3) Ý c) Vì ƯCLN(${e}; ${f}) = ${g} nên ta chia cả tử số và mẫu số của ${e}/${f} cho ${g}: ${e} : ${g} = ${re}, ${f} : ${g} = ${rf}. Vậy phân số tối giản là ${re}/${rf}, tử số là ${re}.`,`Đáp số: a) ${na}; b) ${nd}; c) ${re}.`]};
}},
fracCompare:{chapter:6,topic:'So sánh phân số. Hỗn số dương',gen(l){
  let b=R(3,9),d=R(3,9);while(d===b){d=R(3,9);}
  const a=R(1,b-1),c=R(1,d-1),L=lcm(b,d),nb=a*L/b,nd=c*L/d;
  if(nb===nd)return this.gen(l);
  const big=nb>nd?{n:nb,f:`${a}/${b}`}:{n:nd,f:`${c}/${d}`};
  const A=R(1,4),cc=R(2,9);let bb=R(1,cc-1);const num=A*cc+bb;
  return{title:'So sánh phân số và đổi hỗn số',text:`a) Quy đồng mẫu số hai phân số ${a}/${b} và ${c}/${d}. Mẫu số chung là bao nhiêu?\nb) Sau khi quy đồng, phân số lớn hơn có tử số là bao nhiêu?\nc) Đổi hỗn số ${A} ${bb}/${cc} thành phân số. Tử số của phân số đó là bao nhiêu?`,
   analysis:{given:[`Hai phân số ${a}/${b} và ${c}/${d}`,`Hỗn số ${A} ${bb}/${cc}`],ask:'Mẫu số chung; tử số của phân số lớn hơn; tử số sau khi đổi hỗn số',plan:`Quy đồng hai phân số về mẫu số chung ${L} rồi so sánh tử số. Đổi hỗn số: lấy phần nguyên nhân mẫu rồi cộng tử.`},
   hint:`Mẫu chung của ${b} và ${d} là ${L}. ${A} ${bb}/${cc} = (${A} × ${cc} + ${bb})/${cc}.`,
   theory:'Muốn so sánh hai phân số khác mẫu số, ta quy đồng mẫu số rồi so sánh tử số. Muốn đổi hỗn số a b/c thành phân số, ta viết (a × c + b)/c.',
   kw:[{t:`${a}/${b} và ${c}/${d}`,type:'data',why:'Hai phân số cần so sánh.'},{t:'Quy đồng mẫu số',type:'op',why:`Đưa hai phân số về cùng mẫu số ${L} rồi so sánh tử số.`},{t:`hỗn số ${A} ${bb}/${cc}`,type:'data',why:'Hỗn số cần đổi thành phân số.'}],
   parts:[{label:'a) Mẫu số chung',answer:''+L,unit:''},{label:'b) Tử số của phân số lớn hơn',answer:''+big.n,unit:''},{label:'c) Tử số sau khi đổi hỗn số',answer:''+num,unit:''}],
   solution:[`Bước 1) Ý a) Mẫu số chung nhỏ nhất của ${b} và ${d} là BCNN(${b}; ${d}) = ${L}.`,`Bước 2) Ý b) Quy đồng: ${a}/${b} = (${a} × ${L/b})/(${b} × ${L/b}) = ${nb}/${L}; ${c}/${d} = (${c} × ${L/d})/(${d} × ${L/d}) = ${nd}/${L}. Vì ${nb} ${nb>nd?'>':'<'} ${nd} nên phân số lớn hơn là ${big.f}, có tử số là ${big.n}.`,`Bước 3) Ý c) Đổi hỗn số: lấy phần nguyên ${A} nhân mẫu ${cc} rồi cộng tử ${bb}: (${A} × ${cc} + ${bb})/${cc} = ${num}/${cc}. Vậy tử số là ${num}.`,`Đáp số: a) ${L}; b) ${big.n}; c) ${num}.`]};
}},
fracAddSub:{chapter:6,topic:'Phép cộng và phép trừ phân số',gen(l){
  const pairs=[[4,8],[5,10],[3,6],[4,6],[3,9],[6,8],[2,6],[5,15]];
  const pr=pick(pairs),d1=pr[0],d2=pr[1],L=lcm(d1,d2);
  let a=R(1,d1-1),b=R(1,d2-1);
  const s1=a*L/d1+b*L/d2;
  const pr2=pick(pairs),v=pr2[0],z=pr2[1],L2=lcm(v,z);
  let u=R(1,v-1),w=R(1,z-1),bu=u*L2/v,bw=w*L2/z;
  while(bu===bw){u=R(1,v-1);w=R(1,z-1);bu=u*L2/v;bw=w*L2/z;}
  if(bu<bw){const tu=u,tw=w,tb=bu;u=w;w=tu;bu=bw;bw=tb;}
  let rq,rr,sq,sr,rqL,rNum,sNum;
  do{ rq=R(2,5); rr=R(1,rq-1); sq=rq*R(1,3); sr=R(1,sq-1); rqL=lcm(rq,sq); rNum=rqL/rq*rr; sNum=rqL/sq*sr; }while(rNum<=sNum);
  const rem=frS(rNum-sNum,rqL);
  return{title:'Cộng, trừ phân số',text:`Tính:\na) ${a}/${d1} + ${b}/${d2} = ? (viết đáp số dưới dạng phân số tối giản)\nb) ${u}/${v} − ${w}/${z} = ? (viết đáp số dưới dạng phân số tối giản)\nc) Một sợi dây dài ${rr}/${rq} m, người ta cắt đi ${sr}/${sq} m. Sợi dây còn lại dài bao nhiêu mét? (viết đáp số dưới dạng phân số tối giản)`,
   analysis:{given:[`Phép cộng ${a}/${d1} + ${b}/${d2}`,`Phép trừ hai phân số cùng mẫu ${L}`,`Sợi dây dài ${rr}/${rq} m, cắt đi ${sr}/${sq} m`],ask:'Kết quả phép cộng; kết quả phép trừ; độ dài còn lại',plan:`Quy đồng mẫu số rồi cộng (trừ) tử số, giữ nguyên mẫu số, cuối cùng rút gọn nếu chưa tối giản.`},
   hint:`${a}/${d1} = ${a*L/d1}/${L}; ${b}/${d2} = ${b*L/d2}/${L}; ${u}/${v} = ${bu}/${L2}; ${w}/${z} = ${bw}/${L2}; cắt đi nghĩa là trừ.`,
   theory:'Muốn cộng (trừ) hai phân số khác mẫu số, ta quy đồng mẫu số rồi cộng (trừ) tử số, giữ nguyên mẫu số.',
   kw:[{t:`${a}/${d1} + ${b}/${d2}`,type:'data',why:'Phép cộng hai phân số khác mẫu số.'},{t:'quy đồng mẫu số',type:'op',why:`Đưa về cùng mẫu số ${L} rồi mới cộng hoặc trừ tử số.`},{t:'cắt đi',type:'op',why:'Từ khóa "cắt đi": phép trừ.'}],
   parts:[{label:'a) Kết quả phép cộng',answer:frS(s1,L),unit:''},{label:'b) Kết quả phép trừ',answer:frS(bu-bw,L2),unit:''},{label:'c) Độ dài còn lại',answer:rem,unit:'m'}],
   solution:[`Bước 1) Ý a) Vì ${d1} và ${d2} có mẫu chung ${L} nên ta quy đồng ${a}/${d1} = ${a*L/d1}/${L} và ${b}/${d2} = ${b*L/d2}/${L}, rồi cộng tử số, giữ nguyên mẫu số: ${a*L/d1}/${L} + ${b*L/d2}/${L} = ${s1}/${L} = ${frS(s1,L)}.`,`Bước 2) Ý b) Quy đồng về mẫu ${L2}: ${u}/${v} = ${bu}/${L2} và ${w}/${z} = ${bw}/${L2}, rồi trừ tử số, giữ nguyên mẫu số: ${bu}/${L2} − ${bw}/${L2} = ${bu-bw}/${L2} = ${frS(bu-bw,L2)}.`,`Bước 3) Ý c) Vì cắt đi nghĩa là trừ nên độ dài còn lại là ${rr}/${rq} − ${sr}/${sq}. Quy đồng về mẫu ${rqL}: ${rNum}/${rqL} − ${sNum}/${rqL} = ${rNum-sNum}/${rqL} = ${rem} (m).`,`Đáp số: a) ${frS(s1,L)}; b) ${frS(bu-bw,L2)}; c) ${rem} m.`]};
}},
fracMulDiv:{chapter:6,topic:'Phép nhân và phép chia phân số',gen(l){
  let a=R(1,5),b=R(2,9);while(gcd(a,b)!==1){a=R(1,5);b=R(2,9);}
  const n=R(2,9);
  let c=R(1,5),d=R(2,9);while(gcd(c,d)!==1){c=R(1,5);d=R(2,9);}
  const m=R(2,6);
  let e=R(1,5),f=R(2,9),g2=R(1,5),h=R(2,9);
  return{title:'Nhân, chia phân số',text:`Tính:\na) ${a}/${b} × ${n} = ?\nb) ${c}/${d} : ${m} = ? (viết đáp số dưới dạng phân số tối giản)\nc) ${e}/${f} × ${g2}/${h} = ? (viết đáp số dưới dạng phân số tối giản)`,
   analysis:{given:[`Phép nhân ${a}/${b} × ${n}`,`Phép chia ${c}/${d} : ${m}`,`Phép nhân ${e}/${f} × ${g2}/${h}`],ask:'Kết quả ba phép tính',plan:'Nhân phân số với số tự nhiên: nhân tử số với số đó, giữ nguyên mẫu số. Chia phân số cho số tự nhiên: nhân mẫu số với số đó. Nhân hai phân số: nhân tử với tử, mẫu với mẫu, rồi rút gọn.'},
   hint:`${a}/${b} × ${n} = (${a} × ${n})/${b}; ${c}/${d} : ${m} = ${c}/(${d} × ${m}); ${e}/${f} × ${g2}/${h} = (${e} × ${g2})/(${f} × ${h}).`,
   theory:'Muốn nhân hai phân số, ta nhân tử số với tử số, mẫu số với mẫu số. Muốn chia một phân số cho một số tự nhiên, ta nhân mẫu số với số đó.',
   kw:[{t:`${a}/${b} × ${n}`,type:'data',why:'Nhân phân số với số tự nhiên: nhân tử số, giữ nguyên mẫu số.'},{t:`${c}/${d} : ${m}`,type:'op',why:'Chia phân số cho số tự nhiên: nhân mẫu số với số đó.'},{t:`${e}/${f} × ${g2}/${h}`,type:'op',why:'Nhân tử với tử, mẫu với mẫu, rồi rút gọn.'}],
   parts:[{label:`a) Kết quả ${a}/${b} × ${n}`,answer:frS(a*n,b),unit:''},{label:`b) Kết quả ${c}/${d} : ${m}`,answer:frS(c,d*m),unit:''},{label:`c) Kết quả ${e}/${f} × ${g2}/${h}`,answer:frS(e*g2,f*h),unit:''}],
   solution:[`Bước 1) Ý a) Nhân phân số với số tự nhiên: nhân tử số với ${n}, giữ nguyên mẫu số: (${a} × ${n})/${b} = ${a*n}/${b} = ${frS(a*n,b)}.`,`Bước 2) Ý b) Chia phân số cho số tự nhiên: nhân mẫu số với ${m}: ${c}/(${d} × ${m}) = ${c}/${d*m} = ${frS(c,d*m)}.`,`Bước 3) Ý c) Nhân tử với tử, mẫu với mẫu: (${e} × ${g2})/(${f} × ${h}) = ${e*g2}/${f*h} = ${frS(e*g2,f*h)}.`,`Đáp số: a) ${frS(a*n,b)}; b) ${frS(c,d*m)}; c) ${frS(e*g2,f*h)}.`]};
}},
fracWord:{chapter:6,topic:'Hai bài toán về phân số',gen(l){
  const T=pick([30,40,45,60]);
  const divs=[];for(let dd=2;dd<=6;dd++)if(T%dd===0)divs.push(dd);
  const d1=pick(divs);let d2=pick(divs);while(d2===d1)d2=pick(divs);
  const a=R(1,d1-1),b=R(1,d2-1);
  const like=T/d1*a, done=T/d2*b, notDone=T-done;
  const dd=R(2,5);let aa=R(1,dd-1);const mm=R(2,12),val=aa*mm,total=dd*mm;
  return{title:'Hai bài toán về phân số',text:`Lớp 6A có ${T} học sinh.\na) ${a}/${d1} số học sinh của lớp thích bóng đá. Có bao nhiêu học sinh thích bóng đá?\nb) ${b}/${d2} số học sinh của lớp đã nộp bài tập. Có bao nhiêu học sinh chưa nộp bài tập?\nc) ${aa}/${dd} số bi của Hùng là ${val} viên. Hỏi Hùng có bao nhiêu viên bi?`,
   analysis:{given:[`Lớp có ${T} học sinh`,`${a}/${d1} số học sinh thích bóng đá`,`${b}/${d2} số học sinh đã nộp bài`,`${aa}/${dd} số bi là ${val} viên`],ask:'Số học sinh thích bóng đá; số học sinh chưa nộp bài; tổng số bi của Hùng',plan:`Muốn tìm giá trị phân số của một số, lấy số đó nhân với phân số. Muốn tìm một số khi biết giá trị phân số của nó, lấy giá trị đó chia cho phân số.`},
   hint:`${a}/${d1} của ${T} = ${T} × ${a}/${d1}; số chưa nộp = ${T} − số đã nộp; ${val} : ${aa}/${dd} = ${val} × ${dd}/${aa}.`,
   theory:'Muốn tìm giá trị phân số của một số cho trước, ta lấy số đó nhân với phân số. Muốn tìm một số khi biết giá trị phân số của nó, ta lấy giá trị đó chia cho phân số.',
   kw:[{t:`${a}/${d1} số học sinh`,type:'data',why:'Phân số của tổng số học sinh: lấy tổng nhân với phân số.'},{t:'chưa nộp',type:'ask',why:'Lấy tổng trừ đi số đã nộp.'},{t:`${aa}/${dd} số bi là ${val} viên`,type:'op',why:'Biết giá trị phân số: lấy giá trị chia cho phân số.'}],
   parts:[{label:'a) Số học sinh thích bóng đá',answer:''+like,unit:'học sinh'},{label:'b) Số học sinh chưa nộp bài',answer:''+notDone,unit:'học sinh'},{label:'c) Tổng số bi của Hùng',answer:''+total,unit:'viên'}],
   solution:[`Bước 1) Ý a) Muốn tìm ${a}/${d1} của ${T}, ta lấy ${T} nhân với ${a}/${d1}: ${T} × ${a}/${d1} = ${T*a}/${d1} = ${like} (học sinh).`,`Bước 2) Ý b) Số học sinh đã nộp là ${T} × ${b}/${d2} = ${T*b}/${d2} = ${done} (học sinh). Số học sinh chưa nộp là ${T} − ${done} = ${notDone} (học sinh).`,`Bước 3) Ý c) Muốn tìm tổng số bi khi biết ${aa}/${dd} của nó là ${val}, ta lấy ${val} chia cho ${aa}/${dd}, tức nhân với phân số nghịch đảo ${dd}/${aa}: ${val} × ${dd}/${aa} = ${val*dd}/${aa} = ${total} (viên).`,`Đáp số: a) ${like} học sinh; b) ${notDone} học sinh; c) ${total} viên.`]};
}},
decBasic:{chapter:7,topic:'Số thập phân',gen(l){
  const I=R(2,9),fr=R(10,99),dec=decS(I*100+fr,2);
  const n=R(1,9),dn=pick([10,100]),num=dn===10?n:n*10,dec2=decS(num*(dn===10?10:1),dn===10?2:2);
  const a=R(1,9),big=decS(a,1),small=decS(a*10-1,2);
  return{title:'Đọc, viết và so sánh số thập phân',text:`a) Số thập phân ${dec} có phần nguyên là bao nhiêu?\nb) Viết phân số ${num}/${dn} dưới dạng số thập phân rồi cho biết chữ số ở hàng phần mười là bao nhiêu?\nc) Trong hai số ${small} và ${big}, số lớn hơn gấp 10 lần thì được bao nhiêu?`,
   analysis:{given:[`Số thập phân ${dec}`,`Phân số ${num}/${dn}`,`Hai số ${small} và ${big}`],ask:'Phần nguyên; chữ số hàng phần mười; 10 lần số lớn hơn',plan:'Phần nguyên là phần đứng trước dấu phẩy. Phân số thập phân viết thành số thập phân theo mẫu số. So sánh hai số thập phân rồi gấp 10 lần số lớn hơn.'},
   hint:`${num}/${dn} = ${dec2}. Viết ${big} = 0,${a}0 rồi so sánh với ${small}.`,
   theory:'Số thập phân gồm phần nguyên và phần thập phân, ngăn cách bằng dấu phẩy. Phân số thập phân (mẫu 10, 100, ...) viết được thành số thập phân.',
   kw:[{t:`${dec}`,type:'data',why:'Số thập phân cần tìm phần nguyên.'},{t:`${num}/${dn}`,type:'op',why:'Phân số thập phân: mẫu 10 thì 1 chữ số sau dấu phẩy, mẫu 100 thì 2 chữ số.'},{t:'số lớn hơn',type:'ask',why:'So sánh hai số rồi gấp 10 lần số lớn hơn.'}],
   parts:[{label:`a) Phần nguyên của ${dec}`,answer:''+I,unit:''},{label:`b) Chữ số hàng phần mười của ${dec2}`,answer:''+n,unit:''},{label:'c) 10 lần số lớn hơn',answer:''+a,unit:''}],
   solution:[`Bước 1) Ý a) Phần nguyên là phần đứng trước dấu phẩy. Số ${dec} có phần nguyên là ${I}.`,`Bước 2) Ý b) Vì ${num}/${dn} có mẫu ${dn} nên viết thành số thập phân là ${dec2}. Chữ số ở hàng phần mười là ${n}.`,`Bước 3) Ý c) Viết ${big} = 0,${a}0 rồi so sánh với ${small}: ${a*10} > ${a*10-1} nên ${big} lớn hơn. Gấp 10 lần số đó: ${big} × 10 = ${a}.`,`Đáp số: a) ${I}; b) ${n}; c) ${a}.`]};
}},
decCalc:{chapter:7,topic:'Tính toán với số thập phân',gen(l){
  let A=R(100,999),B=R(100,999);while(A%100===0)A=R(100,999);while(B%100===0||B===A)B=R(100,999);
  let X=A,Y=B;if(Y>X){const t=X;X=Y;Y=t;}
  let T1=R(11,99);while(T1%10===0)T1=R(11,99);const N=R(2,9);
  return{title:'Cộng, trừ, nhân số thập phân',text:`Tính:\na) ${decS(A,2)} + ${decS(B,2)} = ?\nb) ${decS(X,2)} − ${decS(Y,2)} = ?\nc) ${decS(T1,1)} × ${N} = ?`,
   analysis:{given:[`Phép cộng ${decS(A,2)} + ${decS(B,2)}`,`Phép trừ ${decS(X,2)} − ${decS(Y,2)}`,`Phép nhân ${decS(T1,1)} × ${N}`],ask:'Kết quả ba phép tính',plan:'Cộng (trừ) số thập phân: đặt dấu phẩy thẳng cột rồi tính như số tự nhiên. Nhân số thập phân với số tự nhiên: nhân như số tự nhiên rồi đếm chữ số thập phân để đặt dấu phẩy.'},
   hint:`${decS(A,2)} = ${decS(A,2)} (giữ nguyên 2 chữ số sau dấu phẩy). ${decS(T1,1)} có 1 chữ số ở phần thập phân.`,
   theory:'Muốn cộng (trừ) hai số thập phân, ta đặt dấu phẩy thẳng cột rồi tính như số tự nhiên. Muốn nhân số thập phân với số tự nhiên, ta nhân như số tự nhiên rồi đếm chữ số thập phân để đặt dấu phẩy.',
   kw:[{t:`${decS(A,2)} + ${decS(B,2)}`,type:'data',why:'Cộng số thập phân: dấu phẩy thẳng cột.'},{t:`${decS(X,2)} − ${decS(Y,2)}`,type:'op',why:'Trừ số thập phân: dấu phẩy thẳng cột.'},{t:`${decS(T1,1)} × ${N}`,type:'op',why:'Nhân như số tự nhiên rồi đặt dấu phẩy theo số chữ số thập phân.'}],
   parts:[{label:`a) Kết quả ${decS(A,2)} + ${decS(B,2)}`,answer:decS(A+B,2),unit:''},{label:`b) Kết quả ${decS(X,2)} − ${decS(Y,2)}`,answer:decS(X-Y,2),unit:''},{label:`c) Kết quả ${decS(T1,1)} × ${N}`,answer:decS(T1*N,1),unit:''}],
   solution:[`Bước 1) Ý a) Đặt dấu phẩy thẳng cột rồi cộng như số tự nhiên: ${decS(A,2)} + ${decS(B,2)} = ${decS(A+B,2)}.`,`Bước 2) Ý b) Đặt dấu phẩy thẳng cột rồi trừ: ${decS(X,2)} − ${decS(Y,2)} = ${decS(X-Y,2)}.`,`Bước 3) Ý c) Nhân như số tự nhiên: ${T1} × ${N} = ${T1*N}. Vì ${decS(T1,1)} có 1 chữ số ở phần thập phân nên kết quả cũng có 1 chữ số sau dấu phẩy: ${decS(T1*N,1)}.`,`Đáp số: a) ${decS(A+B,2)}; b) ${decS(X-Y,2)}; c) ${decS(T1*N,1)}.`]};
}},
decRound:{chapter:7,topic:'Làm tròn và ước lượng',gen(l){
  let n1=R(100,999);while(n1%100===0)n1=R(100,999);const t1=Math.floor(n1/10+0.5)/10;
  let n2=R(1000,9999);while(n2%100===0)n2=R(1000,9999);const u2=Math.floor(n2/100+0.5);
  let v1=R(1000,9999),v2=R(1000,9999);while(v1%100===0)v1=R(1000,9999);while(v2%100===0)v2=R(1000,9999);const r1=Math.floor(v1/100+0.5),r2=Math.floor(v2/100+0.5);
  return{title:'Làm tròn và ước lượng',text:`a) Làm tròn số ${decS(n1,2)} đến hàng phần mười được bao nhiêu?\nb) Làm tròn số ${decS(n2,2)} đến hàng đơn vị được bao nhiêu?\nc) Ước lượng kết quả của ${decS(v1,2)} + ${decS(v2,2)} bằng cách làm tròn mỗi số đến hàng đơn vị rồi cộng lại. Kết quả ước lượng là bao nhiêu?`,
   analysis:{given:[`Số ${decS(n1,2)}`,`Số ${decS(n2,2)}`,`Tổng ${decS(v1,2)} + ${decS(v2,2)}`],ask:'Số làm tròn đến hàng phần mười; số làm tròn đến hàng đơn vị; kết quả ước lượng',plan:'Nhìn chữ số ngay sau hàng làm tròn: từ 5 trở lên thì tăng hàng làm tròn thêm 1, nhỏ hơn 5 thì giữ nguyên. Ước lượng: làm tròn từng số rồi mới cộng.'},
   hint:`Sau hàng phần mười của ${decS(n1,2)} là ${n1%10}. Sau hàng đơn vị của ${decS(n2,2)} là ${Math.floor(n2/10)%10}. ${decS(v1,2)} ≈ ${r1}; ${decS(v2,2)} ≈ ${r2}.`,
   theory:'Muốn làm tròn một số đến một hàng, ta nhìn chữ số ngay sau hàng đó: từ 5 trở lên thì tăng hàng làm tròn thêm 1, nhỏ hơn 5 thì giữ nguyên hàng làm tròn.',
   kw:[{t:`${decS(n1,2)}`,type:'data',why:'Số cần làm tròn đến hàng phần mười.'},{t:`${decS(n2,2)}`,type:'data',why:'Số cần làm tròn đến hàng đơn vị.'},{t:'Ước lượng',type:'op',why:'Làm tròn từng số đến hàng đơn vị rồi cộng lại.'}],
   parts:[{label:`a) ${decS(n1,2)} làm tròn đến hàng phần mười`,answer:decS(Math.round(t1*10),1),unit:''},{label:`b) ${decS(n2,2)} làm tròn đến hàng đơn vị`,answer:''+u2,unit:''},{label:'c) Kết quả ước lượng',answer:''+(r1+r2),unit:''}],
   solution:[`Bước 1) Ý a) Chữ số ngay sau hàng phần mười của ${decS(n1,2)} là ${n1%10}. Vì ${n1%10} ${n1%10>=5?'≥ 5 nên ta tăng hàng phần mười thêm 1':'< 5 nên ta giữ nguyên hàng phần mười'}. Vậy ${decS(n1,2)} ≈ ${decS(Math.round(t1*10),1)}.`,`Bước 2) Ý b) Chữ số ngay sau hàng đơn vị của ${decS(n2,2)} là ${Math.floor(n2/10)%10}. Vì ${Math.floor(n2/10)%10} ${Math.floor(n2/10)%10>=5?'≥ 5 nên ta tăng hàng đơn vị thêm 1':'< 5 nên ta giữ nguyên hàng đơn vị'}. Vậy ${decS(n2,2)} ≈ ${u2}.`,`Bước 3) Ý c) Làm tròn đến hàng đơn vị: ${decS(v1,2)} ≈ ${r1} và ${decS(v2,2)} ≈ ${r2}. Cộng lại: ${r1} + ${r2} = ${r1+r2}.`,`Đáp số: a) ${decS(Math.round(t1*10),1)}; b) ${u2}; c) ${r1+r2}.`]};
}},
ratioPercent:{chapter:7,topic:'Một số bài toán về tỉ số và tỉ số phần trăm',gen(l){
  const T=pick([20,25,40,50,60,80]);
  const pcts=[];for(let pp=5;pp<=95;pp+=5)if(T*pp%100===0)pcts.push(pp);
  const p=pick(pcts),G=T*p/100;
  const P=pick([50000,80000,120000,150000,200000,250000]),m=pick([10,15,20,25,30]);
  const T2=pick([20,40,60,80]),m2=pick([10,25,50,75]);
  return{title:'Tỉ số và tỉ số phần trăm',text:`a) Lớp 6A có ${T} học sinh, trong đó có ${G} học sinh giỏi. Tỉ số phần trăm của số học sinh giỏi so với cả lớp là bao nhiêu phần trăm?\nb) Một chiếc áo giá ${fmt(P)} đồng được giảm giá ${m}%. Số tiền được giảm là bao nhiêu đồng?\nc) Lớp 6B có ${T2} học sinh, ${m2}% số học sinh thích bóng đá. Có bao nhiêu học sinh thích bóng đá?`,
   analysis:{given:[`Lớp 6A: ${T} học sinh, ${G} học sinh giỏi`,`Áo giá ${fmt(P)} đồng, giảm ${m}%`,`Lớp 6B: ${T2} học sinh, ${m2}% thích bóng đá`],ask:'Tỉ số phần trăm học sinh giỏi; số tiền được giảm; số học sinh thích bóng đá',plan:'Tỉ số phần trăm: lấy số học sinh giỏi chia cho cả lớp rồi nhân 100%. Tìm m% của một số: lấy số đó nhân m rồi chia 100.'},
   hint:`${G} : ${T} = ${decS(G*100/T,2)}. ${m}% của ${fmt(P)} = ${fmt(P)} × ${m} : 100. ${m2}% của ${T2} = ${T2} × ${m2} : 100.`,
   theory:'Muốn tìm tỉ số phần trăm của hai số a và b, ta lấy a : b rồi nhân với 100%. Muốn tìm m% của một số, ta lấy số đó nhân với m rồi chia cho 100.',
   kw:[{t:`${G} học sinh giỏi`,type:'data',why:'Số học sinh giỏi cần tính tỉ số phần trăm.'},{t:`giảm ${m}%`,type:'op',why:`Tìm ${m}% của giá áo: nhân với ${m} rồi chia 100.`},{t:`${m2}% số học sinh`,type:'op',why:`Tìm ${m2}% của ${T2}: nhân với ${m2} rồi chia 100.`}],
   parts:[{label:'a) Tỉ số phần trăm học sinh giỏi',answer:''+p,unit:'%'},{label:'b) Số tiền được giảm',answer:''+(P*m/100),unit:'đồng'},{label:'c) Số học sinh thích bóng đá',answer:''+(T2*m2/100),unit:'học sinh'}],
   solution:[`Bước 1) Ý a) Muốn tìm tỉ số phần trăm, ta lấy ${G} : ${T} = ${decS(G*100/T,2)} rồi nhân với 100%: ${decS(G*100/T,2)} × 100% = ${p}%.`,`Bước 2) Ý b) Muốn tìm ${m}% của ${fmt(P)}, ta lấy ${fmt(P)} × ${m} : 100 = ${fmt(P*m)} : 100 = ${fmt(P*m/100)} (đồng).`,`Bước 3) Ý c) Muốn tìm ${m2}% của ${T2}, ta lấy ${T2} × ${m2} : 100 = ${T2*m2} : 100 = ${T2*m2/100} (học sinh).`,`Đáp số: a) ${p}%; b) ${fmt(P*m/100)} đồng; c) ${T2*m2/100} học sinh.`]};
}},
pointLine:{chapter:8,topic:'Điểm và đường thẳng',gen(l){
  const P3=pick(['C','E']),P4=pick(['D','F']);
  const svg=lineSvg([[40,100,'A'],[260,100,'B'],[150,100,P3],[210,40,P4]],[[[20,100],[280,100]],[[90,160],[210,40]]]);
  return{title:'Điểm thuộc đường thẳng',text:`Trên hình có đường thẳng AB, điểm ${P3} thuộc đường thẳng AB, điểm ${P4} không thuộc đường thẳng AB, đường thẳng ${P3}${P4} cắt đường thẳng AB tại ${P3}.\na) Có bao nhiêu điểm trong các điểm A, B, ${P3} thuộc đường thẳng AB?\nb) Qua hai điểm A và B vẽ được bao nhiêu đường thẳng?\nc) Trên hình có bao nhiêu đường thẳng?`,svg:svg,figNote:`👆 Nhìn vào hình: điểm nào nằm trên đường thẳng AB, điểm nào nằm ngoài; đối chiếu từng bước giải với hình.`,
   analysis:{given:[`Đường thẳng AB`,`Điểm ${P3} thuộc đường thẳng AB`,`Điểm ${P4} không thuộc đường thẳng AB`],ask:'Số điểm thuộc đường thẳng AB; số đường thẳng qua A và B; tổng số đường thẳng',plan:'Điểm thuộc đường thẳng là điểm nằm trên đường thẳng đó. Qua hai điểm phân biệt chỉ có một đường thẳng.'},
   hint:`A, B, ${P3} đều nằm trên đường thẳng AB. Qua A và B chỉ có đường thẳng AB.`,
   theory:'Điểm thuộc đường thẳng là điểm nằm trên đường thẳng đó. Qua hai điểm phân biệt chỉ vẽ được đúng một đường thẳng.',
   kw:[{t:`điểm ${P3} thuộc đường thẳng AB`,type:'data',why:'Điểm nằm trên đường thẳng thì thuộc đường thẳng đó.'},{t:`điểm ${P4} không thuộc`,type:'op',why:'Điểm nằm ngoài đường thẳng thì không thuộc đường thẳng đó.'},{t:'Qua hai điểm A và B',type:'ask',why:'Qua hai điểm phân biệt chỉ vẽ được đúng một đường thẳng.'}],
   parts:[{label:'a) Số điểm thuộc đường thẳng AB',answer:'3',unit:'điểm'},{label:'b) Số đường thẳng qua A và B',answer:'1',unit:'đường thẳng'},{label:'c) Tổng số đường thẳng trên hình',answer:'2',unit:'đường thẳng'}],
   solution:[`Bước 1) Ý a) Điểm thuộc đường thẳng là điểm nằm trên đường thẳng đó. A, B và ${P3} đều nằm trên đường thẳng AB nên có 3 điểm thuộc đường thẳng AB.`,`Bước 2) Ý b) Qua hai điểm phân biệt chỉ vẽ được đúng một đường thẳng, nên qua A và B chỉ vẽ được 1 đường thẳng (chính là đường thẳng AB).`,`Bước 3) Ý c) Trên hình có đường thẳng AB và đường thẳng ${P3}${P4}, tức có 2 đường thẳng.`,`Đáp số: a) 3 điểm; b) 1 đường thẳng; c) 2 đường thẳng.`]};
}},
pointBetweenRay:{chapter:8,topic:'Điểm nằm giữa hai điểm. Tia',gen(l){
  const L=R(10,20),OA=R(3,L-3),OB=L-OA;
  const svg=lineSvg([[40,100,'A'],[150,100,'O'],[260,100,'B']],[[[20,100],[280,100]]]);
  return{title:'Điểm nằm giữa và tia',text:`Trên đường thẳng xy có ba điểm A, O, B theo thứ tự đó (O nằm giữa A và B).\na) Điểm O chia đường thẳng xy thành bao nhiêu tia gốc O?\nb) Trên hình có bao nhiêu đoạn thẳng?\nc) Đoạn thẳng AB dài ${L} cm, OA dài ${OA} cm. Đoạn thẳng OB dài bao nhiêu xăng-ti-mét?`,svg:svg,figNote:'👆 Nhìn vào hình: O nằm giữa A và B; đối chiếu từng bước giải với các điểm trên hình.',
   analysis:{given:['Đường thẳng xy có ba điểm A, O, B theo thứ tự đó',`AB dài ${L} cm, OA dài ${OA} cm`],ask:'Số tia gốc O; số đoạn thẳng; độ dài OB',plan:'Một điểm trên đường thẳng chia đường thẳng thành 2 tia đối nhau. Với 3 điểm, các đoạn thẳng là AO, OB và AB. Vì O nằm giữa nên OB = AB − OA.'},
   hint:`Các đoạn thẳng là AO, OB và AB. OB = AB − OA.`,
   theory:'Mỗi điểm trên đường thẳng chia đường thẳng thành hai tia đối nhau. Điểm M nằm giữa A và B thì AB = AM + MB.',
   kw:[{t:'O nằm giữa A và B',type:'data',why:'O thuộc đoạn AB nên AB = OA + OB.'},{t:'tia gốc O',type:'ask',why:'Một điểm trên đường thẳng chia đường thẳng thành 2 tia gốc tại điểm đó.'},{t:'đoạn thẳng',type:'ask',why:'Với 3 điểm A, O, B: các đoạn là AO, OB, AB.'}],
   parts:[{label:'a) Số tia gốc O',answer:'2',unit:'tia'},{label:'b) Số đoạn thẳng',answer:'3',unit:'đoạn thẳng'},{label:'c) Độ dài OB',answer:''+OB,unit:'cm'}],
   solution:[`Bước 1) Ý a) Một điểm trên đường thẳng chia đường thẳng thành 2 tia đối nhau. Điểm O chia đường thẳng xy thành 2 tia gốc O là tia OA và tia OB.`,`Bước 2) Ý b) Với 3 điểm A, O, B, các đoạn thẳng tạo thành là AO, OB và AB. Vậy có 3 đoạn thẳng.`,`Bước 3) Ý c) Vì O nằm giữa A và B nên AB = OA + OB, suy ra OB = AB − OA = ${L} − ${OA} = ${OB} (cm).`,`Đáp số: a) 2 tia; b) 3 đoạn thẳng; c) ${OB} cm.`]};
}},
segmentLength:{chapter:8,topic:'Đoạn thẳng. Độ dài đoạn thẳng',gen(l){
  const AB=R(3,12),BC=R(3,12),AC=AB+BC,AD=R(2,AC-2),DC=AC-AD,L=pick([8,10,12,14,16,20]);
  const svg=lineSvg([[40,100,'A'],[150,100,'B'],[260,100,'C']],[[[20,100],[280,100]]]);
  return{title:'Độ dài đoạn thẳng',text:`Điểm B nằm giữa hai điểm A và C. Biết AB = ${AB} cm, BC = ${BC} cm.\na) Đoạn thẳng AC dài bao nhiêu xăng-ti-mét?\nb) Điểm D nằm giữa A và C sao cho AD = ${AD} cm. Đoạn thẳng DC dài bao nhiêu xăng-ti-mét?\nc) Một sợi dây dài ${L} cm được cắt thành hai đoạn bằng nhau. Mỗi đoạn dài bao nhiêu xăng-ti-mét?`,svg:svg,figNote:'👆 Nhìn vào hình: B nằm giữa A và C; đối chiếu từng bước giải với các đoạn trên hình.',
   analysis:{given:[`B nằm giữa A và C`,`AB = ${AB} cm, BC = ${BC} cm`,`D nằm giữa A và C, AD = ${AD} cm`],ask:'Độ dài AC; độ dài DC; độ dài mỗi đoạn dây',plan:'Khi B nằm giữa A và C thì AC = AB + BC. Tương tự DC = AC − AD. Cắt thành hai đoạn bằng nhau nghĩa là chia đôi.'},
   hint:`AC = AB + BC = ${AB} + ${BC}. DC = AC − AD.`,
   theory:'Khi điểm B nằm giữa hai điểm A và C thì AC = AB + BC.',
   kw:[{t:'B nằm giữa A và C',type:'data',why:'B thuộc đoạn AC nên AC = AB + BC.'},{t:'D nằm giữa A và C',type:'op',why:'D thuộc đoạn AC nên AC = AD + DC.'},{t:'hai đoạn bằng nhau',type:'op',why:'Cắt thành hai đoạn bằng nhau nghĩa là chia đôi độ dài.'}],
   parts:[{label:'a) Độ dài AC',answer:''+AC,unit:'cm'},{label:'b) Độ dài DC',answer:''+DC,unit:'cm'},{label:'c) Độ dài mỗi đoạn dây',answer:''+(L/2),unit:'cm'}],
   solution:[`Bước 1) Ý a) Vì B nằm giữa A và C nên AC = AB + BC = ${AB} + ${BC} = ${AC} (cm).`,`Bước 2) Ý b) Vì D nằm giữa A và C nên AC = AD + DC, suy ra DC = AC − AD = ${AC} − ${AD} = ${DC} (cm).`,`Bước 3) Ý c) Cắt thành hai đoạn bằng nhau nghĩa là chia đôi: mỗi đoạn dài ${L} : 2 = ${L/2} (cm).`,`Đáp số: a) ${AC} cm; b) ${DC} cm; c) ${L/2} cm.`]};
}},
midpoint:{chapter:8,topic:'Trung điểm của đoạn thẳng',gen(l){
  const AB=pick([8,10,12,14,16,18,20,24]),CN=R(3,12),PQ=pick([9,11,13,15]);
  const svg=lineSvg([[40,100,'A'],[150,100,'M'],[260,100,'B']],[[[20,100],[280,100]]]);
  return{title:'Trung điểm của đoạn thẳng',text:`a) Đoạn thẳng AB dài ${AB} cm, M là trung điểm của AB. Đoạn thẳng MA dài bao nhiêu xăng-ti-mét?\nb) Điểm N là trung điểm của đoạn thẳng CD, CN dài ${CN} cm. Đoạn thẳng CD dài bao nhiêu xăng-ti-mét?\nc) Đoạn thẳng PQ dài ${PQ} cm, I là trung điểm của PQ. Đoạn thẳng PI dài bao nhiêu xăng-ti-mét?`,svg:svg,figNote:'👆 Nhìn vào hình: M là trung điểm, MA = MB; đối chiếu từng bước giải với hình.',
   analysis:{given:[`AB dài ${AB} cm, M là trung điểm của AB`,`N là trung điểm của CD, CN dài ${CN} cm`,`PQ dài ${PQ} cm, I là trung điểm của PQ`],ask:'Độ dài MA; độ dài CD; độ dài PI',plan:'Trung điểm chia đoạn thẳng thành hai đoạn bằng nhau: đoạn con bằng một nửa đoạn lớn; đoạn lớn gấp đôi đoạn con.'},
   hint:`MA = AB : 2. CD = CN × 2. PI = PQ : 2.`,
   theory:'Điểm M là trung điểm của đoạn thẳng AB khi M nằm giữa A và B và MA = MB. Khi đó MA = MB = AB : 2.',
   kw:[{t:'trung điểm',type:'op',why:'Trung điểm nằm giữa và cách đều hai đầu đoạn thẳng.'},{t:`MA`,type:'ask',why:'M là trung điểm của AB nên MA bằng một nửa AB.'},{t:`CD`,type:'ask',why:'N là trung điểm của CD nên CD dài gấp đôi CN.'}],
   parts:[{label:'a) Độ dài MA',answer:''+(AB/2),unit:'cm'},{label:'b) Độ dài CD',answer:''+(CN*2),unit:'cm'},{label:'c) Độ dài PI',answer:decS(PQ*5,1),unit:'cm'}],
   solution:[`Bước 1) Ý a) Vì M là trung điểm của AB nên MA bằng một nửa AB: MA = ${AB} : 2 = ${AB/2} (cm).`,`Bước 2) Ý b) Vì N là trung điểm của CD nên CD dài gấp đôi CN: CD = ${CN} × 2 = ${CN*2} (cm).`,`Bước 3) Ý c) Vì I là trung điểm của PQ nên PI bằng một nửa PQ: PI = ${PQ} : 2 = ${decS(PQ*5,1)} (cm).`,`Đáp số: a) ${AB/2} cm; b) ${CN*2} cm; c) ${decS(PQ*5,1)} cm.`]};
}},
angleBasic:{chapter:8,topic:'Góc',gen(l){
  const m=pick([30,45,60,75]),n=pick([120,135,150,165]);
  const svg=angSvg(m);
  return{title:'Nhận biết các loại góc',text:`Trên hình là góc xOy có số đo ${m}°.\na) Góc vuông có số đo bao nhiêu độ?\nb) Góc trong hình (${m}°) nhỏ hơn góc vuông bao nhiêu độ?\nc) Một góc có số đo ${n}°. Góc đó lớn hơn góc vuông bao nhiêu độ?`,svg:svg+FIG_NOTE,figNote:`👆 Nhìn vào hình: góc xOy có số đo ${m}°; đối chiếu từng bước giải với số đo trên hình.`,
   analysis:{given:[`Góc xOy có số đo ${m}°`,`Góc cần xét có số đo ${n}°`],ask:'Số đo góc vuông; góc nhọn nhỏ hơn góc vuông bao nhiêu; góc tù lớn hơn góc vuông bao nhiêu',plan:'Góc vuông bằng 90°. Góc nhọn nhỏ hơn 90°, góc tù lớn hơn 90° và nhỏ hơn 180°. Lấy hiệu với 90°.'},
   hint:`Góc vuông = 90°. 90 − ${m} = ${90-m}. ${n} − 90 = ${n-90}.`,
   theory:'Góc vuông có số đo bằng 90°. Góc nhọn nhỏ hơn 90°, góc tù lớn hơn 90° và nhỏ hơn 180°, góc bẹt bằng 180°.',
   kw:[{t:`góc xOy có số đo ${m}°`,type:'data',why:'Số đo của góc trong hình.'},{t:'Góc vuông',type:'op',why:'Góc vuông có số đo bằng 90°, dùng làm mốc so sánh.'},{t:`góc ${n}°`,type:'data',why:'Góc cần so sánh với góc vuông.'}],
   parts:[{label:'a) Số đo góc vuông',answer:'90',unit:'độ'},{label:`b) ${m}° nhỏ hơn góc vuông`,answer:''+(90-m),unit:'độ'},{label:`c) ${n}° lớn hơn góc vuông`,answer:''+(n-90),unit:'độ'}],
   solution:[`Bước 1) Ý a) Góc vuông là góc có số đo bằng 90°.`,`Bước 2) Ý b) Muốn biết góc ${m}° nhỏ hơn góc vuông bao nhiêu độ, ta lấy 90° − ${m}° = ${90-m}°. Vì ${m}° < 90° nên góc xOy là góc nhọn.`,`Bước 3) Ý c) Muốn biết góc ${n}° lớn hơn góc vuông bao nhiêu độ, ta lấy ${n}° − 90° = ${n-90}°. Vì 90° < ${n}° < 180° nên góc ${n}° là góc tù.`,`Đáp số: a) 90°; b) ${90-m}°; c) ${n-90}°.`]};
}},
angleMeasure:{chapter:8,topic:'Số đo góc',gen(l){
  const m=pick([40,50,60,70,80]),a=pick([30,40,50,60]),b=pick([40,50,60,70]);
  const svg=angSvg(m);
  return{title:'Đo và tính số đo góc',text:`a) Dùng thước đo góc đo góc xOy được ${m}°. Số đo góc xOy là bao nhiêu độ?\nb) Tia Oy nằm giữa hai tia Ox và Oz, góc xOy = ${a}°, góc yOz = ${b}°. Góc xOz bằng bao nhiêu độ?\nc) Góc bẹt bằng 180°, góc vuông bằng 90°. Góc bẹt gấp góc vuông bao nhiêu lần?`,svg:svg+FIG_NOTE,figNote:'👆 Nhìn vào thước đo góc trên hình: tâm thước trùng đỉnh O, vạch 0 trùng cạnh Ox; đối chiếu từng bước giải với hình.',
   analysis:{given:[`Góc xOy đo được ${m}°`,`Tia Oy nằm giữa Ox và Oz, góc xOy = ${a}°, góc yOz = ${b}°`,`Góc bẹt 180°, góc vuông 90°`],ask:'Số đo góc xOy; số đo góc xOz; góc bẹt gấp góc vuông bao nhiêu lần',plan:'Đọc trực tiếp số đo trên thước. Khi tia Oy nằm giữa thì góc xOz = góc xOy + góc yOz. Gấp bao nhiêu lần thì chia.'},
   hint:`xOz = ${a}° + ${b}°. 180 : 90 = 2.`,
   theory:'Khi tia Oy nằm giữa hai tia Ox và Oz thì góc xOz = góc xOy + góc yOz. Góc bẹt bằng 180°, gấp đôi góc vuông (90°).',
   kw:[{t:`góc xOy = ${m}°`,type:'data',why:'Số đo đọc được trên thước đo góc.'},{t:'Tia Oy nằm giữa',type:'op',why:'Khi tia nằm giữa thì góc lớn bằng tổng hai góc nhỏ.'},{t:'gấp bao nhiêu lần',type:'ask',why:'Muốn biết gấp bao nhiêu lần thì chia hai số đo.'}],
   parts:[{label:'a) Số đo góc xOy',answer:''+m,unit:'độ'},{label:'b) Số đo góc xOz',answer:''+(a+b),unit:'độ'},{label:'c) Góc bẹt gấp góc vuông',answer:'2',unit:'lần'}],
   solution:[`Bước 1) Ý a) Thước đo góc chỉ ${m}° nên số đo góc xOy là ${m}°.`,`Bước 2) Ý b) Vì tia Oy nằm giữa hai tia Ox và Oz nên góc xOz = góc xOy + góc yOz = ${a}° + ${b}° = ${a+b}°.`,`Bước 3) Ý c) Muốn biết góc bẹt gấp góc vuông bao nhiêu lần, ta lấy 180° : 90° = 2 (lần).`,`Đáp số: a) ${m}°; b) ${a+b}°; c) 2 lần.`]};
}},
dataCollect:{chapter:9,topic:'Dữ liệu và thu thập dữ liệu',gen(l){
  const T=pick([30,35,40,45]),F=R(10,T-5);
  const S=pick([30,40,50]),Rr=R(S-8,S-1);
  const pool=[3,4,5,6,7,8,9,10,12];
  const tv=pick(pool);
  let others=[];while(others.length<3){const v=pick(pool);if(v!==tv&&others.indexOf(v)<0)others.push(v);}
  const k=pick([2,3]);
  const arr=[];let placed=0;
  const pos=[];
  for(let i=0;i<5;i++){const remain=5-i,need=k-placed;let put=false;if(need>0&&(need===remain||Math.random()<0.5)){arr.push(tv);placed++;pos.push(i+1);put=true;}if(!put)arr.push(others[(arr.length)%others.length]);}
  while(placed<k){for(let i=0;i<5&&placed<k;i++){if(arr[i]!==tv){arr[i]=tv;placed++;pos.push(i+1);}}}
  pos.sort((x,y)=>x-y);
  return{title:'Thu thập và đếm dữ liệu',text:`a) Lớp 6A có ${T} học sinh. Số học sinh thích bóng đá là ${F} bạn. Số học sinh còn lại (không thích bóng đá) là bao nhiêu bạn?\nb) Để thu thập dữ liệu, cô giáo phát ${S} phiếu hỏi và thu về ${Rr} phiếu. Số phiếu chưa thu về là bao nhiêu phiếu?\nc) Dãy dữ liệu về số bàn thắng là: ${arr.join('; ')}. Số ${tv} xuất hiện bao nhiêu lần trong dãy?`,
   analysis:{given:[`Lớp 6A có ${T} học sinh, ${F} bạn thích bóng đá`,`Phát ${S} phiếu, thu về ${Rr} phiếu`,`Dãy dữ liệu: ${arr.join('; ')}`],ask:'Số học sinh còn lại; số phiếu chưa thu về; số lần xuất hiện của số '+tv,plan:'Số còn lại = tổng trừ đi số đã biết. Đếm số lần xuất hiện bằng cách rà từng số trong dãy.'},
   hint:`${T} − ${F} = ${T-F}. ${S} − ${Rr} = ${S-Rr}. Rà dãy từ trái sang phải và đếm số ${tv}.`,
   theory:'Dữ liệu là các số liệu, thông tin thu thập được. Người ta thu thập dữ liệu bằng cách quan sát, làm thí nghiệm, lập phiếu hỏi hoặc tra cứu từ nguồn có sẵn.',
   kw:[{t:`${T} học sinh`,type:'data',why:'Tổng số học sinh của lớp.'},{t:'còn lại',type:'ask',why:'Lấy tổng trừ đi số đã biết.'},{t:`dãy ${arr.join('; ')}`,type:'data',why:'Dãy cần đếm số lần xuất hiện.'}],
   parts:[{label:'a) Số học sinh còn lại',answer:''+(T-F),unit:'bạn'},{label:'b) Số phiếu chưa thu về',answer:''+(S-Rr),unit:'phiếu'},{label:`c) Số lần xuất hiện của số ${tv}`,answer:''+k,unit:'lần'}],
   solution:[`Bước 1) Ý a) Số học sinh còn lại = tổng số học sinh trừ số học sinh thích bóng đá: ${T} − ${F} = ${T-F} (bạn).`,`Bước 2) Ý b) Số phiếu chưa thu về = số phiếu đã phát trừ số phiếu đã thu: ${S} − ${Rr} = ${S-Rr} (phiếu).`,`Bước 3) Ý c) Đếm trong dãy ${arr.join('; ')}: số ${tv} xuất hiện ở vị trí thứ ${pos.join(', ')}, tức xuất hiện ${k} lần.`,`Đáp số: a) ${T-F} bạn; b) ${S-Rr} phiếu; c) ${k} lần.`]};
}},
pictographTable:{chapter:9,topic:'Bảng thống kê và biểu đồ tranh',gen(l){
  const sports=['Bóng đá','Cầu lông','Bơi','Chạy','Bóng rổ'];
  const s1=pick(sports);let s2=pick(sports);while(s2===s1)s2=pick(sports);let s3=pick(sports);while(s3===s1||s3===s2)s3=pick(sports);
  const a=R(1,4),b=R(1,4),c=R(1,4),k=pick([2,4,5]);
  const svg=picSvg([{n:s1,s:a},{n:s2,s:b},{n:s3,s:c}]);
  return{title:'Đọc biểu đồ tranh',text:`Biểu đồ tranh bên ghi số học sinh thích các môn thể thao. Mỗi ⭐ ứng với ${k} học sinh.\na) Có bao nhiêu học sinh thích ${s1.toLowerCase()}?\nb) Có bao nhiêu học sinh thích cả ba môn?\nc) Môn ${s3.toLowerCase()} có ${c*k} học sinh. Cần vẽ bao nhiêu ngôi sao cho môn ${s3.toLowerCase()}?`,svg:svg,figNote:`👆 Nhìn vào biểu đồ tranh: mỗi ⭐ ứng với ${k} học sinh; đối chiếu từng bước giải với số sao của mỗi môn.`,
   analysis:{given:[`Mỗi ⭐ ứng với ${k} học sinh`,`${s1}: ${a} sao; ${s2}: ${b} sao; ${s3}: ${c} sao`],ask:`Số học sinh thích ${s1.toLowerCase()}; tổng số học sinh cả ba môn; số sao cần vẽ cho môn ${s3.toLowerCase()}`,plan:'Số học sinh = số sao × số học sinh mỗi sao. Tổng = tổng số sao × số học sinh mỗi sao. Số sao = số học sinh chia cho số học sinh mỗi sao.'},
   hint:`${s1}: ${a} × ${k}. Tổng số sao là ${a} + ${b} + ${c} = ${a+b+c} sao.`,
   theory:'Trong biểu đồ tranh, mỗi biểu tượng ứng với một số đối tượng nhất định. Muốn tìm số đối tượng, ta lấy số biểu tượng nhân với số đối tượng mà mỗi biểu tượng ứng với.',
   kw:[{t:`mỗi ⭐ ứng với ${k} học sinh`,type:'data',why:'Chìa khóa đọc biểu đồ tranh: nhân số sao với số này.'},{t:`${s1}: ${a} sao`,type:'data',why:'Số sao của môn thứ nhất.'},{t:'cả ba môn',type:'ask',why:'Cộng số sao của ba môn rồi nhân với số học sinh mỗi sao.'}],
   parts:[{label:`a) Số học sinh thích ${s1.toLowerCase()}`,answer:''+(a*k),unit:'học sinh'},{label:'b) Tổng số học sinh cả ba môn',answer:''+((a+b+c)*k),unit:'học sinh'},{label:`c) Số sao cần vẽ cho môn ${s3.toLowerCase()}`,answer:''+c,unit:'ngôi sao'}],
   solution:[`Bước 1) Ý a) ${s1} có ${a} sao, mỗi sao ứng với ${k} học sinh nên số học sinh thích ${s1.toLowerCase()} là ${a} × ${k} = ${a*k} (học sinh).`,`Bước 2) Ý b) Tổng số sao của ba môn là ${a} + ${b} + ${c} = ${a+b+c} (sao). Tổng số học sinh là ${a+b+c} × ${k} = ${(a+b+c)*k} (học sinh).`,`Bước 3) Ý c) Muốn tìm số sao, ta lấy số học sinh chia cho ${k}: ${c*k} : ${k} = ${c} (ngôi sao).`,`Đáp số: a) ${a*k} học sinh; b) ${(a+b+c)*k} học sinh; c) ${c} ngôi sao.`]};
}},
barChart:{chapter:9,topic:'Biểu đồ cột',gen(l){
  const names=['Bóng đá','Cầu lông','Bơi','Chạy'];
  const vals=[];const pool=[4,6,8,10,12,14,16];
  while(vals.length<4){const v=pick(pool);if(vals.indexOf(v)<0)vals.push(v);}
  const items=names.map((n,i)=>({n,v:vals[i]}));
  const mx=Math.max(...vals),mn=Math.min(...vals),tot=vals.reduce((s,v)=>s+v,0);
  const svg=barSvg(items,['#42a5f5','#ef6c00','#43a047','#7b1fa2']);
  return{title:'Đọc biểu đồ cột',text:`Biểu đồ cột bên ghi số học sinh thích các môn thể thao: bóng đá ${vals[0]}, cầu lông ${vals[1]}, bơi ${vals[2]}, chạy ${vals[3]}.\na) Số học sinh thích bóng đá là bao nhiêu bạn?\nb) Môn được thích nhiều nhất hơn môn được thích ít nhất bao nhiêu bạn?\nc) Tổng số học sinh thích cả bốn môn là bao nhiêu bạn?`,svg:svg,figNote:'👆 Nhìn vào biểu đồ cột: gióng đầu mỗi cột sang trục dọc để đọc số; đối chiếu từng bước giải với các cột.',
   analysis:{given:[`Bóng đá ${vals[0]}, cầu lông ${vals[1]}, bơi ${vals[2]}, chạy ${vals[3]}`],ask:'Số học sinh thích bóng đá; môn nhiều nhất hơn môn ít nhất bao nhiêu; tổng số học sinh',plan:'Đọc số liệu bằng cách gióng đầu cột sang trục dọc. Nhiều nhất trừ ít nhất. Tổng = cộng cả bốn số.'},
   hint:`Cột bóng đá cao tới ${vals[0]}. Nhiều nhất ${mx}, ít nhất ${mn}. Tổng: ${vals.join(' + ')}.`,
   theory:'Trong biểu đồ cột, trục ngang ghi tên đối tượng, trục dọc ghi số lượng. Cột nào cao hơn thì số liệu lớn hơn.',
   kw:[{t:'biểu đồ cột',type:'data',why:'Cột cao hơn thì số liệu lớn hơn.'},{t:'nhiều nhất',type:'ask',why:'Cột cao nhất trong bốn cột.'},{t:'ít nhất',type:'ask',why:'Cột thấp nhất trong bốn cột.'}],
   parts:[{label:'a) Số học sinh thích bóng đá',answer:''+vals[0],unit:'bạn'},{label:'b) Nhiều nhất hơn ít nhất',answer:''+(mx-mn),unit:'bạn'},{label:'c) Tổng số học sinh cả bốn môn',answer:''+tot,unit:'bạn'}],
   solution:[`Bước 1) Ý a) Gióng đầu cột bóng đá sang trục dọc, ta đọc được ${vals[0]}. Vậy có ${vals[0]} bạn thích bóng đá.`,`Bước 2) Ý b) Môn được thích nhiều nhất có ${mx} bạn, môn được thích ít nhất có ${mn} bạn. Nhiều hơn: ${mx} − ${mn} = ${mx-mn} (bạn).`,`Bước 3) Ý c) Tổng số học sinh là ${vals.join(' + ')} = ${tot} (bạn).`,`Đáp số: a) ${vals[0]} bạn; b) ${mx-mn} bạn; c) ${tot} bạn.`]};
}},
doubleBarChart:{chapter:9,topic:'Biểu đồ cột kép',gen(l){
  const a1=R(5,10),a2=a1+R(1,4),b1=R(5,10),b2=b1+R(1,4);
  const svg=dblSvg(a1,a2,b1,b2);
  return{title:'Đọc biểu đồ cột kép',text:`Biểu đồ cột kép bên ghi số học sinh giỏi của lớp 6A và 6B trong học kì 1 (cột xanh) và học kì 2 (cột cam): 6A: ${a1} và ${a2}; 6B: ${b1} và ${b2}.\na) Lớp 6A học kì 2 có bao nhiêu học sinh giỏi?\nb) Lớp 6B tăng bao nhiêu học sinh giỏi từ học kì 1 sang học kì 2?\nc) Tổng số học sinh giỏi học kì 2 của hai lớp là bao nhiêu bạn?`,svg:svg,figNote:'👆 Nhìn vào biểu đồ cột kép: xanh là học kì 1, cam là học kì 2; đối chiếu từng bước giải với các cột.',
   analysis:{given:[`6A: học kì 1 là ${a1}, học kì 2 là ${a2}`,`6B: học kì 1 là ${b1}, học kì 2 là ${b2}`],ask:'Học sinh giỏi HK2 của 6A; 6B tăng bao nhiêu; tổng HK2 của hai lớp',plan:'Xem chú thích để biết màu nào ứng với học kì nào, rồi đọc số. Tăng = số sau trừ số trước. Tổng = cộng hai số học kì 2.'},
   hint:`Cột cam của 6A cao tới ${a2}. 6B: ${b2} − ${b1} = ${b2-b1}. Tổng HK2: ${a2} + ${b2}.`,
   theory:'Trong biểu đồ cột kép, mỗi đối tượng có hai cột đặt cạnh nhau để so sánh hai nhóm số liệu. Trước khi đọc số, phải xem chú thích để biết màu nào ứng với nhóm nào.',
   kw:[{t:'cột xanh',type:'data',why:'Chú thích: cột xanh là học kì 1.'},{t:'cột cam',type:'data',why:'Chú thích: cột cam là học kì 2.'},{t:'tăng bao nhiêu',type:'ask',why:'Lấy số học kì 2 trừ số học kì 1.'}],
   parts:[{label:'a) Học sinh giỏi HK2 của 6A',answer:''+a2,unit:'bạn'},{label:'b) 6B tăng từ HK1 sang HK2',answer:''+(b2-b1),unit:'bạn'},{label:'c) Tổng học sinh giỏi HK2 của hai lớp',answer:''+(a2+b2),unit:'bạn'}],
   solution:[`Bước 1) Ý a) Xem chú thích: cột cam là học kì 2. Cột cam của lớp 6A cao tới ${a2} nên lớp 6A học kì 2 có ${a2} học sinh giỏi.`,`Bước 2) Ý b) Lớp 6B từ ${b1} (học kì 1) lên ${b2} (học kì 2), tức tăng ${b2} − ${b1} = ${b2-b1} (học sinh giỏi).`,`Bước 3) Ý c) Tổng học kì 2 của hai lớp là ${a2} + ${b2} = ${a2+b2} (bạn).`,`Đáp số: a) ${a2} bạn; b) ${b2-b1} bạn; c) ${a2+b2} bạn.`]};
}},
possibleEvents:{chapter:9,topic:'Kết quả có thể và sự kiện trong trò chơi, thí nghiệm',gen(l){
  const C=pick([2,3]),colors=C===2?['đỏ','xanh']:['đỏ','xanh','vàng'];
  const counts=colors.map(()=>R(1,5));
  const n=pick([4,6,8]);
  const desc=colors.map((c,i)=>`${counts[i]} bóng ${c}`).join(', ');
  return{title:'Kết quả có thể xảy ra',text:`a) Trong hộp có ${desc}. Lấy ngẫu nhiên 1 quả bóng. Có bao nhiêu kết quả có thể xảy ra về màu bóng?\nb) Quay một vòng quay chia thành ${n} ô bằng nhau, đánh số từ 1 đến ${n}. Có bao nhiêu kết quả có thể xảy ra về số ô dừng lại?\nc) Tung một đồng xu 1 lần. Có bao nhiêu kết quả có thể xảy ra?`,
   analysis:{given:[`Hộp có ${desc}`,`Vòng quay có ${n} ô bằng nhau`,`Đồng xu có 2 mặt`],ask:'Số kết quả có thể về màu bóng; số kết quả có thể của vòng quay; số kết quả có thể khi tung đồng xu',plan:'Chỉ quan tâm đến màu (hoặc số ô, mặt đồng xu): mỗi màu (mỗi ô, mỗi mặt) là một kết quả có thể.'},
   hint:`Bóng chỉ có ${C} màu. Vòng quay có ${n} ô. Đồng xu có 2 mặt.`,
   theory:'Khi thực hiện một trò chơi hay thí nghiệm, các trường hợp có thể xảy ra gọi là các kết quả có thể. Sự kiện chắc chắn là sự kiện nhất định xảy ra; sự kiện không thể là sự kiện nhất định không xảy ra.',
   kw:[{t:`${desc}`,type:'data',why:'Các màu bóng có trong hộp.'},{t:`${n} ô`,type:'data',why:'Số ô trên vòng quay.'},{t:'kết quả có thể',type:'ask',why:'Mỗi trường hợp có thể xảy ra là một kết quả có thể.'}],
   parts:[{label:'a) Số kết quả có thể về màu bóng',answer:''+C,unit:'kết quả'},{label:'b) Số kết quả có thể của vòng quay',answer:''+n,unit:'kết quả'},{label:'c) Số kết quả có thể khi tung đồng xu',answer:'2',unit:'kết quả'}],
   solution:[`Bước 1) Ý a) Vì chỉ quan tâm đến màu bóng nên các kết quả có thể là: ${colors.map(c=>'lấy được bóng '+c).join(', ')}. Vậy có ${C} kết quả có thể.`,`Bước 2) Ý b) Vòng quay có ${n} ô nên khi quay có ${n} ô có thể dừng lại, tức có ${n} kết quả có thể.`,`Bước 3) Ý c) Đồng xu có 2 mặt (sấp và ngửa) nên khi tung 1 lần có 2 kết quả có thể.`,`Đáp số: a) ${C}; b) ${n}; c) 2.`]};
}},
expProbability:{chapter:9,topic:'Xác suất thực nghiệm',gen(l){
  const N1=pick([20,30,40,50,60]);
  const qs=[];for(let qq=2;qq<=10;qq++)if(N1%qq===0)qs.push(qq);
  const q1=pick(qs);let p1=R(1,q1-1);while(gcd(p1,q1)!==1)p1=R(1,q1-1);
  const k1=p1*(N1/q1);
  const N2=pick([20,40,50]);
  const qs2=[];for(let qq=2;qq<=10;qq++)if(N2%qq===0)qs2.push(qq);
  const q2=pick(qs2);let p2=R(1,q2-1);while(gcd(p2,q2)!==1)p2=R(1,q2-1);
  const k2=p2*(N2/q2);
  const g=pick([2,3,4,5]),q3=pick([2,3,4,5,6]);let p3=R(1,q3-1);while(gcd(p3,q3)!==1)p3=R(1,q3-1);
  const face=pick([2,3,4,5,6]);
  return{title:'Xác suất thực nghiệm',text:`a) Gieo một con xúc xắc ${N1} lần, mặt ${face} chấm xuất hiện ${k1} lần. Xác suất thực nghiệm xuất hiện mặt ${face} chấm là bao nhiêu? (viết đáp số dưới dạng phân số tối giản)\nb) Tung một đồng xu ${N2} lần, mặt sấp xuất hiện ${k2} lần. Xác suất thực nghiệm xuất hiện mặt sấp là bao nhiêu? (viết đáp số dưới dạng phân số tối giản)\nc) Gieo xúc xắc 30 lần, mặt 3 chấm xuất hiện 5 lần. Xác suất thực nghiệm xuất hiện mặt 3 chấm là 5/30. Rút gọn phân số này, tử số là bao nhiêu?`,
   analysis:{given:[`Gieo xúc xắc ${N1} lần, mặt ${face} chấm xuất hiện ${k1} lần`,`Tung đồng xu ${N2} lần, mặt sấp xuất hiện ${k2} lần`,`Xác suất thực nghiệm mặt 3 chấm là 5/30`],ask:'Xác suất thực nghiệm mặt '+face+' chấm; xác suất thực nghiệm mặt sấp; tử số sau khi rút gọn 5/30',plan:'Xác suất thực nghiệm = số lần xuất hiện chia cho tổng số lần thử, rồi rút gọn phân số.'},
   hint:`Xác suất thực nghiệm = số lần xuất hiện : tổng số lần thử. ${k1}/${N1} = ${p1}/${q1}; ${k2}/${N2} = ${p2}/${q2}.`,
   theory:'Xác suất thực nghiệm của một sự kiện = số lần sự kiện đó xuất hiện : tổng số lần thực hiện thí nghiệm.',
   kw:[{t:`${k1} lần`,type:'data',why:'Số lần mặt '+face+' chấm xuất hiện.'},{t:`${N1} lần`,type:'data',why:'Tổng số lần gieo xúc xắc.'},{t:'xác suất thực nghiệm',type:'op',why:'Bằng số lần xuất hiện chia cho tổng số lần thử, rồi rút gọn.'}],
   parts:[{label:`a) Xác suất thực nghiệm mặt ${face} chấm`,answer:`${p1}/${q1}`,unit:''},{label:'b) Xác suất thực nghiệm mặt sấp',answer:`${p2}/${q2}`,unit:''},{label:'c) Tử số sau khi rút gọn 5/30',answer:'1',unit:''}],
   solution:[`Bước 1) Ý a) Xác suất thực nghiệm = số lần xuất hiện chia cho tổng số lần gieo: ${k1}/${N1}. Rút gọn cho ${N1/q1}: ${k1}/${N1} = ${p1}/${q1}.`,`Bước 2) Ý b) Xác suất thực nghiệm mặt sấp là ${k2}/${N2}. Rút gọn cho ${N2/q2}: ${k2}/${N2} = ${p2}/${q2}.`,`Bước 3) Ý c) Xác suất thực nghiệm là 5/30. Rút gọn cho 5: 5/30 = 1/6. Vậy tử số sau khi rút gọn là 1.`,`Đáp số: a) ${p1}/${q1}; b) ${p2}/${q2}; c) 1.`]};
}}

};
window.GEN={templates:T,
 chapters:{1:'Chương 1 · Tập hợp các số tự nhiên',2:'Chương 2 · Tính chia hết trong tập hợp các số tự nhiên',3:'Chương 3 · Số nguyên',4:'Chương 4 · Một số hình phẳng trong thực tiễn',5:'Chương 5 · Tính đối xứng của hình phẳng trong tự nhiên',6:'Chương 6 · Phân số',7:'Chương 7 · Số thập phân',8:'Chương 8 · Hình học cơ bản',9:'Chương 9 · Dữ liệu và xác suất thực nghiệm'},
 make(chapter,lvl){
   const keys=Object.keys(T).filter(k=>T[k].chapter===chapter);
   const k=pick(keys);
   return this.makeFrom(k,lvl);
 },
 makeFrom(k,lvl){
   const p=T[k].gen(lvl||2);
   p.gen=true;p.template=k;p.chapter=T[k].chapter;p.topic=T[k].topic;
   const SHAPE={rectGeo:'hinh-chu-nhat',squareGeo:'hinh-vuong',triGeo:'tam-giac-deu',trapGeo:'hinh-thang-can',rhombusGeo:'hinh-thoi',paraGeo:'hinh-binh-hanh',setBasics:'tap-hop',numOrder:'tia-so',intSet:'truc-so-nguyen',fracEqual:'phan-so',fracCompare:'hon-so',pointLine:'diem-duong-thang',pointBetweenRay:'tia',segmentLength:'doan-thang-trung-diem',midpoint:'doan-thang-trung-diem',angleBasic:'goc',angleMeasure:'so-do-goc',barChart:'bieu-do-cot',doubleBarChart:'bieu-do-cot-kep'};
   if(SHAPE[k])p.shape=SHAPE[k];
   return p;
 }};
})();
