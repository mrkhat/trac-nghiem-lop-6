/* Kiem tra theo chuyen de — Toan 6 HK1 (DOT 1).
   Classic script, namespace window.KiemTraChuyenDe, tien to ktcd-.
   - Khong fetch quiz.json lan nua: nhan du lieu qua init({A,B,Hist,bank,theory,GEN}).
   - Khong phu thuoc parseNum/esc toan cuc trong index.html: tu dinh nghia noi bo.
   - Xao dap an bang Fisher-Yates (khong dung sort(()=>Math.random()-0.5)).
   - Cong ngan hang 30 cau/chuyen de (§IV.1): duoi 30 thi khoa, hien "Chua du cau".
   - Do kho la HEURISTIC TAM suy tu src (quiz.json khong co truong do kho):
     'Nho nhanh' -> de; 'Dung/Sai' -> trung binh; 'ly thuyet'/'Ly thuyet' -> kho;
     khac -> trung binh. Cau hoi moi sau nay nen co truong do kho rieng.
   - Cham 'nho' NHI PHAN theo cau (trung TAT CA keywords moi 1d), khac thang diem le cua N3.
   - printTopicVariant chi phoi qua API, DOT 1 KHONG gan nut UI nao (nut "In dang bai nay"
     la dot 2 theo §IV.8).
   - Khoa lich su: toan6_ktcd_v1 (toi da 30). Khoa chong lap: toan6_ktcd_recent_v1,
     luu dang {[ch]: [[qid...] lan gan nhat, [qid...] lan truoc do]} (dang list-of-2-draws
     de phan biet "lan gan nhat" voi "2 lan gan nhat"; ban §IV.5 ghi [qid,...] dang phang).
   - Phieu in hien hanh: toan6_ktcd_phieu_v1 (chi printTopicVariant dung).
*/
(function(){
'use strict';

var HIST_KEY='toan6_ktcd_v1';
var RECENT_KEY='toan6_ktcd_recent_v1';
var PHIEU_KEY='toan6_ktcd_phieu_v1';
var FORMULA_IDS=[50,51,52,57,58,60,61,62];
var EXCLUDE_ID=67; /* id 67 SAI NHAN (type 'a' nhung src "The Dung/Sai — Bai 21"): loai khoi moi lan rut, khong sua quiz.json */
var OPEN_MIN=30;

var TOPICS={
  1:{ch:1,name:'Chuyên đề 1: Số tự nhiên',short:'Số tự nhiên',lessons:'Bài 1–7'},
  2:{ch:2,name:'Chuyên đề 2: Chia hết — Ước và bội',short:'Chia hết — Ước và bội',lessons:'Bài 8–12'},
  3:{ch:3,name:'Chuyên đề 3: Số nguyên',short:'Số nguyên',lessons:'Bài 13–17'},
  4:{ch:4,name:'Chuyên đề 4: Hình phẳng trong thực tiễn',short:'Hình phẳng trong thực tiễn',lessons:'Bài 18–20'},
  5:{ch:5,name:'Chuyên đề 5: Tính đối xứng',short:'Tính đối xứng',lessons:'Bài 21–22'}
};
var TOPIC_ORDER=[1,2,3,4,5];

/* Template GEN duoc dung dot 1 (§IV.4), theo chuong. CĐ5 = 0 template dot 1. */
var D1_TEMPLATES={
  1:['mixedCalc','powerCalc','findX','buyWord','numOrder','setBasics','rangeWord','romanWord'],
  2:['gcdWord','lcmWord','divRule','primeFactor'],
  3:['tempWord','intExpr','intBracket','moneyWord','intMul','intDiv','intSet'],
  4:['rectGeo','squareGeo','triGeo','trapGeo','rhombusGeo','paraGeo'],
  5:[]
};
/* The theory theo chuyen de HK1. Hai the bo tro tam-giac-thuong / tam-giac-vuong KHONG dung cho HK1. */
var THEORY_BY_TOPIC={
  1:['tap-hop','tia-so'],
  2:[],
  3:['truc-so-nguyen'],
  4:['tam-giac-deu','hinh-vuong','luc-giac-deu','hinh-chu-nhat','hinh-thoi','hinh-binh-hanh','hinh-thang-can'],
  5:[]
};
var STOP=['là','của','các','và','có','được','trong','với','một','những','thì','mà','để','khi','nếu','số','hình'];

var _state={
  bank:[],theory:[],GEN:null,A:null,B:null,Hist:null,inited:false,
  curTN:null,curMixed:null,lastPaper:null,redoUsed:true,lastHistId:null,
  selectedHistId:null,deleteAllArm:false,histFilter:'all',crumb:'',cssDone:false
};

/* ---------- tien ich noi bo ---------- */
function _esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function _strip(s){return String(s==null?'':s).replace(/<[^>]*>/g,'').trim();}
function _norm(s){
  return String(s==null?'':s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/đ/g,'d').replace(/[–—−]/g,'-')
    .replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
}
/* Cung thuat toan nhu parseNum toan cuc trong index.html: bo dau cach, dau . hang nghin,
   phan so a/b, thap phan dau phay; sai so 0.001 khi so sanh. */
function _parseNum(s){
  if(s==null)return NaN;
  s=(''+s).trim().replace(/\s+/g,'');
  if(!s)return NaN;
  if(/^-?\d{1,3}(\.\d{3})+$/.test(s))s=s.replace(/\./g,'');
  if(s.indexOf('/')>=0){
    var parts=s.split('/');
    var x=_parseNum(parts[0]),y=_parseNum(parts[1]);
    return (isNaN(x)||isNaN(y)||y===0)?NaN:x/y;
  }
  return parseFloat(s.replace(',','.'));
}
function _shuffle(arr){
  var a=arr.slice();
  for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}
  return a;
}
function _diff(q){
  var src=q&&q.src?q.src:'';
  if(src.indexOf('Nhớ nhanh')>=0)return 'de';
  if(src.indexOf('Đúng/Sai')>=0)return 'tb';
  if(src.indexOf('lý thuyết')>=0||src.indexOf('Lý thuyết')>=0)return 'kho';
  return 'tb';
}
function _isFormula(q){return FORMULA_IDS.indexOf(q.id)>=0;}
/* Keywords cua dap an mau.
   - Cong thuc: giu ca token 1 ky tu (bien a/b/h, chu so) — LECH NHO so voi mo ta §IV
     ("bo tu <2 ky tu"): neu bo het thi hau het cong thuc hinh hoc (vd "S = a × a")
     con 0 keyword, khong cham duoc. Ghi ro trong bao cao.
   - Dap an quiz: chi giu tu noi dung dai >=2, bo stopword. */
function _keywordsOf(text,isFormula){
  var toks=_norm(text).split(' ').filter(function(w){return !!w;});
  var out=[];
  toks.forEach(function(w){
    if(out.indexOf(w)>=0)return;
    if(isFormula){out.push(w);}
    else if(w.length>=2&&STOP.indexOf(w)<0){out.push(w);}
  });
  if(!out.length)out=[_norm(text).replace(/\s+/g,'')];
  return out;
}
function _gradeNho(typed,keywords){
  var norm=_norm(typed||'');
  if(!norm)return false;
  var toks=norm.split(' ');
  var compact=norm.replace(/\s+/g,'');
  return keywords.every(function(k){
    if(!k)return true;
    if(toks.indexOf(k)>=0)return true;
    if(k.length>=2&&compact.indexOf(k)>=0)return true;
    return false;
  });
}
function _gradeTinh(typed,answer){
  var v=_parseNum(typed),w=_parseNum(answer);
  return !isNaN(v)&&!isNaN(w)&&Math.abs(v-w)<0.001;
}
function _gradeTN(items,sel){
  var s=0;
  items.forEach(function(it,i){if(sel[i]===it.answer)s++;});
  return s;
}
function _targets(n){
  var de=Math.round(n*0.5),tb=Math.round(n*0.35);
  return {de:de,tb:tb,kho:n-de-tb};
}
function _weakGroups(items,sel){
  var map={};
  items.forEach(function(it,i){
    if(sel[i]===it.answer)return;
    var m=(it.src||'').match(/Bài\s*\d+\s*:\s*[^—(]+/);
    var label=m?_strip(m[0]):((it.src||'').indexOf('lý thuyết')>=0||(it.src||'').indexOf('Lý thuyết')>=0?'Công thức lý thuyết':'Bài khác');
    map[label]=(map[label]||0)+1;
  });
  return Object.keys(map).map(function(k){return {label:k,n:map[k]};})
    .sort(function(a,b){return b.n-a.n;}).slice(0,3);
}
function _fmtDate(ts){
  try{return new Date(ts).toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});}
  catch(e){return ''+ts;}
}
function _code(ch){return 'KT-CD'+ch+'-'+String(Date.now()).slice(-6);}

/* ---------- localStorage ---------- */
function _lsGet(k){
  try{var v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch(e){return null;}
}
function _lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function _loadRecent(){
  var r=_lsGet(RECENT_KEY);
  if(!r||typeof r!=='object')return {};
  TOPIC_ORDER.forEach(function(ch){
    if(!Array.isArray(r[ch]))r[ch]=[];
    r[ch]=r[ch].filter(function(d){return Array.isArray(d);}).slice(0,2);
  });
  return r;
}
function _saveRecent(r){_lsSet(RECENT_KEY,r);}
function _loadHistRaw(){var h=_lsGet(HIST_KEY);return Array.isArray(h)?h:[];}
function _saveHistRaw(h){_lsSet(HIST_KEY,h);}

function validateRecord(rec){
  if(!rec||typeof rec!=='object')return false;
  if(rec.id==null||typeof rec.ts!=='number')return false;
  if(rec.kind!=='tracnghiem'&&rec.kind!=='honhop')return false;
  if(TOPIC_ORDER.indexOf(rec.chuyenDe)<0)return false;
  if(rec.period!=='c1')return false;
  if(typeof rec.scoreTN!=='number'||typeof rec.maxTN!=='number')return false;
  if(typeof rec.scoreViet!=='number'||typeof rec.maxViet!=='number')return false;
  if(typeof rec.total!=='number'||typeof rec.maxTotal!=='number')return false;
  if(typeof rec.secs!=='number')return false;
  if(rec.status!=='da-cham'&&rec.status!=='cho-cham')return false;
  if(!Array.isArray(rec.items)||!Array.isArray(rec.viet))return false;
  return true;
}
function loadHistory(){
  return _loadHistRaw().filter(validateRecord);
}
function saveHistory(rec){
  if(!validateRecord(rec))return null;
  var h=loadHistory();
  h.unshift(rec);
  h=h.slice(0,30);
  _saveHistRaw(h);
  _state.lastHistId=rec.id;
  return rec;
}
function _deleteRecord(id){
  _saveHistRaw(loadHistory().filter(function(r){return r.id!==id;}));
  if(_state.selectedHistId===id)_state.selectedHistId=null;
  renderHistory();
}
function _deleteAllHistory(){
  _saveHistRaw([]);
  _state.selectedHistId=null;_state.deleteAllArm=false;
  renderHistory();
}

/* ---------- ngan hang / mo chuyen de ---------- */
function bankCount(ch){
  return _state.bank.filter(function(q){return q.ch===ch&&q.id!==EXCLUDE_ID;}).length;
}
function isOpen(ch){return bankCount(ch)>=OPEN_MIN;}
function getTopics(){
  return TOPIC_ORDER.map(function(ch){
    var t=TOPICS[ch];
    return {ch:ch,name:t.name,short:t.short,lessons:t.lessons,count:bankCount(ch),open:isOpen(ch),written:_writtenAvailability(ch)};
  });
}
function _theoryCards(ch){
  var ids=THEORY_BY_TOPIC[ch]||[];
  return _state.theory.filter(function(s){return ids.indexOf(s.id)>=0;});
}
function _quizOf(ch){return _state.bank.filter(function(q){return q.ch===ch&&q.id!==EXCLUDE_ID;});}
/* Dem kha nang viet (khong rut that, chi dem): nho / tinh / giaithich. */
function _writtenAvailability(ch){
  var cards=_theoryCards(ch);
  var formulas=0,checks=0;
  cards.forEach(function(s){
    formulas+=(s.formulas||[]).length;
    if(s.check&&s.check.q)checks++;
  });
  var quiz=_quizOf(ch);
  var nhoFb=quiz.filter(function(q){
    if(q.type!=='a')return false;
    var a=_strip(q.options[q.answer]);
    if(a.length>60)return false;
    return isNaN(_parseNum(a));
  }).length;
  var numQuiz=quiz.filter(function(q){
    if(q.type!=='a')return false;
    return !isNaN(_parseNum(_strip(q.options[q.answer])));
  }).length;
  var tinhAvail=(D1_TEMPLATES[ch]||[]).length+checks+numQuiz;
  return {nho:Math.min(4,formulas+nhoFb),nhoNeed:4,
    tinh:Math.min(2,tinhAvail),tinhNeed:2,
    giaithich:Math.min(2,quiz.length),giaithichNeed:2,
    ok:(formulas+nhoFb)>=4&&tinhAvail>=2&&quiz.length>=2};
}

/* ---------- rut de ---------- */
function _capsOk(picked,q,maxB,maxF){
  var nb=0,nf=0;
  picked.forEach(function(p){if(p.type==='b')nb++;if(_isFormula(p))nf++;});
  if(q.type==='b'&&nb>=maxB)return false;
  if(_isFormula(q)&&nf>=maxF)return false;
  return true;
}
function _pickFrom(cands,picked,want,maxB,maxF,maxTier,tierFn){
  var n=0;
  for(var i=0;i<cands.length&&n<want;i++){
    var q=cands[i];
    if(picked.indexOf(q)>=0)continue;
    if(typeof maxTier==='number'&&tierFn&&tierFn(q)>maxTier)continue;
    if(!_capsOk(picked,q,maxB,maxF))continue;
    picked.push(q);n++;
  }
  return n;
}
function drawTopic(ch,n){
  n=n||20;
  var pool=_quizOf(ch);
  if(!pool.length)return [];
  var want=Math.min(n,pool.length);
  var tg=_targets(want);
  var maxB=want>=20?5:3,maxF=want>=20?4:2;
  var recent=_loadRecent();
  var draws=recent[ch]||[];
  var last1=draws[0]||[],last2=draws[1]||[];
  var setLast1={},setLast2={}; /* setLast2 = hop cua ca 2 lan gan nhat (de tier 0 = chua gap trong 2 lan) */
  last1.forEach(function(id){setLast1[id]=1;setLast2[id]=1;});
  last2.forEach(function(id){setLast2[id]=1;});
  var tier=function(q){
    if(pool.length>=40){
      if(!setLast2[q.id])return 0;
      if(!setLast1[q.id])return 1;
      return 2;
    }
    if(pool.length>=30){
      /* Band 30-39: chi phan biet "chua gap lan gan nhat" (0) voi "da gap" (1) —
         de lan rut dau da uu tien cau chua gap; vong thay dan ben duoi chi la luoi an toan. */
      return setLast1[q.id]?1:0;
    }
    return 0;
  };
  var byDiff={de:[],tb:[],kho:[]};
  pool.forEach(function(q){byDiff[_diff(q)].push(q);});
  ['de','tb','kho'].forEach(function(d){
    byDiff[d]=_shuffle(byDiff[d]).sort(function(a,b){return tier(a)-tier(b);});
  });
  var picked=[];
  /* Thu tu uu tien (quyet dinh vong sua 2026-11-08): (1) CAP CUNG — type 'b' toi da
     5/de 20 (3/de 12 TN hon hop), id cong thuc toi da 4/de 20 (2/de hon hop);
     khong pass nao duoc noi cap; (2) TI LE KHO CHINH XAC — de 20 cau luon
     10 de / 7 tb / 3 kho, de 12 TN hon hop luon 6/4/2 (mien la ngan hang du cau
     moi do kho); (3) CHONG LAP BEST-EFFORT — uu tien 0 trung voi 2 lan gan nhat,
     roi 0 trung lan gan nhat, roi chi vay TOI THIEU so cau can thiet tu lan gan
     nhat de du ti le kho. Vd bank 40 cau (20 de / 10 tb / 10 kho): de 2 chi con
     3 cau tb ngoai de 1 ma can 7 → vay dung 4 cau tb tu de 1 (trung 4/20). */
  function _diffCount(d){var c=0;picked.forEach(function(p){if(_diff(p)===d)c++;});return c;}
  /* (2)+(3): dien tung do kho du ti le qua tier 0 → 1 → 2 → moi tier, cap van bat. */
  ['de','tb','kho'].forEach(function(d){_pickFrom(byDiff[d],picked,tg[d],maxB,maxF,0,tier);});
  ['de','tb','kho'].forEach(function(d){var rem=tg[d]-_diffCount(d);if(rem>0)_pickFrom(byDiff[d],picked,rem,maxB,maxF,1,tier);});
  ['de','tb','kho'].forEach(function(d){var rem=tg[d]-_diffCount(d);if(rem>0)_pickFrom(byDiff[d],picked,rem,maxB,maxF,2,tier);});
  ['de','tb','kho'].forEach(function(d){var rem=tg[d]-_diffCount(d);if(rem>0)_pickFrom(byDiff[d],picked,rem,maxB,maxF);});
  /* Ngan hang thieu han 1 do kho (vd bank 30 cau khong co cau kho): dien not bang
     moi do kho, moi tier — cap van bat, khong noi. */
  if(picked.length<want){['de','tb','kho'].forEach(function(d){if(picked.length<want)_pickFrom(byDiff[d],picked,want-picked.length,maxB,maxF);});}
  /* Ngan hang 30-39: trung voi lan gan nhat > n/2 thi thay dan (toi da 20 lan thu). */
  if(pool.length>=30&&pool.length<40&&last1.length){
    var tries=0;
    var overlap=function(){return picked.filter(function(q){return setLast1[q.id];});};
    while(overlap().length>Math.floor(want/2)&&tries<20){
      tries++;
      var ov=overlap();
      var victim=ov[Math.floor(Math.random()*ov.length)];
      var vi=picked.indexOf(victim);
      var rest=pool.filter(function(q){return picked.indexOf(q)<0&&!setLast1[q.id]&&_diff(q)===_diff(victim);});
      if(!rest.length)rest=pool.filter(function(q){return picked.indexOf(q)<0&&!setLast1[q.id];});
      if(!rest.length)break;
      /* Thu LAN LUOT cac ung vien da xao tron, lay ung vien DAU TIEN qua cap;
         chi dung khi khong con ung vien nao qua duoc (truoc day lay ung vien dau
         tien, khong qua cap thi break ngay — thuong gap khi nan nhan khong phai
         type 'b' nhung ung vien la type 'b' luc cap type 'b' da day). */
      var repl=null;
      var shuffledRest=_shuffle(rest);
      for(var ri=0;ri<shuffledRest.length;ri++){
        var cand=shuffledRest[ri];
        var tmp=picked.slice();tmp.splice(vi,1);
        if(_capsOk(tmp,cand,maxB,maxF)){repl=cand;break;}
      }
      if(!repl)break;
      picked[vi]=repl;
    }
  }
  var items=_shuffle(picked).map(function(q){
    var idx=_shuffle([0,1,2,3]);
    return {qid:q.id,id:q.id,q:q.q,opts:idx.map(function(i){return q.options[i];}),
      answer:idx.indexOf(q.answer),explain:q.explain||'',src:q.src||'',ch:q.ch,type:q.type,diff:_diff(q)};
  });
  /* Luu lan rut moi vao recent (toi da 2 lan/chuyen de). */
  if(items.length){
    var r=_loadRecent();
    var cur=r[ch]||[];
    cur.unshift(items.map(function(it){return it.qid;}));
    r[ch]=cur.slice(0,2);
    _saveRecent(r);
  }
  return items;
}

/* ---------- de hon hop ---------- */
function _firstLineOnly(text){
  var lines=String(text||'').split('\n');
  var out=[];
  for(var i=0;i<lines.length;i++){
    if(/^\s*b\)/.test(lines[i]))break;
    out.push(lines[i]);
  }
  return out.join('\n').trim();
}
function _buildNho(ch,used){
  var out=[];
  var cards=_shuffle(_theoryCards(ch));
  cards.forEach(function(s){
    (s.formulas||[]).forEach(function(f){
      if(out.length>=4)return;
      out.push({kind:'nho',by:'may',template:'theory:'+s.id,title:'Nhớ công thức — '+s.name,
        text:'Viết công thức '+f.label+' của '+s.name+'.',sample:f.f,
        keywords:_keywordsOf(f.f,true),parts:[{label:'Công thức',answer:f.f}],tick:[],typed:''});
    });
  });
  if(out.length<4){
    var fb=_shuffle(_quizOf(ch).filter(function(q){
      if(q.type!=='a')return false;
      if(used[q.id])return false;
      var a=_strip(q.options[q.answer]);
      return a.length<=60&&isNaN(_parseNum(a));
    }));
    fb.forEach(function(q){
      if(out.length>=4)return;
      used[q.id]=1;
      var a=_strip(q.options[q.answer]);
      out.push({kind:'nho',by:'may',template:'quiz:'+q.id,title:'Nhớ kiến thức — '+TOPICS[ch].short,
        text:q.q,sample:a,keywords:_keywordsOf(a,false),
        parts:[{label:'Đáp án',answer:a}],tick:[],typed:''});
    });
  }
  return out;
}
function _buildTinh(ch,used){
  var out=[];
  var keys=_shuffle((D1_TEMPLATES[ch]||[]).slice());
  keys.forEach(function(k){
    if(out.length>=2)return;
    if(!_state.GEN||typeof _state.GEN.makeFrom!=='function')return;
    var p;
    try{p=_state.GEN.makeFrom(k,2);}catch(e){return;}
    if(!p||!p.parts||!p.parts[0])return;
    out.push({kind:'tinh',by:'may',template:k,title:p.title||'Tính',
      text:_firstLineOnly(p.text),sample:String(p.parts[0].answer),
      keywords:[],svg:p.svg||'',parts:[{label:p.parts[0].label||'Kết quả',answer:String(p.parts[0].answer),unit:p.parts[0].unit||''}],tick:[],typed:''});
  });
  if(out.length<2){
    _shuffle(_theoryCards(ch)).forEach(function(s){
      if(out.length>=2)return;
      if(!s.check||!s.check.q)return;
      out.push({kind:'tinh',by:'may',template:'theory-check:'+s.id,title:'Tính — '+s.name,
        text:s.check.q,sample:String(s.check.answer),keywords:[],
        parts:[{label:'Đáp số',answer:String(s.check.answer),unit:s.check.unit||''}],tick:[],typed:''});
    });
  }
  if(out.length<2){
    _shuffle(_quizOf(ch).filter(function(q){
      if(q.type!=='a')return false;
      if(used[q.id])return false;
      return !isNaN(_parseNum(_strip(q.options[q.answer])));
    })).forEach(function(q){
      if(out.length>=2)return;
      used[q.id]=1;
      var a=_strip(q.options[q.answer]);
      out.push({kind:'tinh',by:'may',template:'quiz:'+q.id,title:'Tính — '+TOPICS[ch].short,
        text:q.q,sample:a,keywords:[],
        parts:[{label:'Đáp số',answer:a}],tick:[],typed:''});
    });
  }
  return out;
}
function _buildGiaithich(ch,used){
  var pool=_quizOf(ch).filter(function(q){return !used[q.id];});
  pool=_shuffle(pool).sort(function(a,b){return (a.type==='a'?0:1)-(b.type==='a'?0:1);});
  return pool.slice(0,2).map(function(q){
    used[q.id]=1;
    return {kind:'giaithich',by:'bame',template:'quiz:'+q.id,title:'Giải thích',
      text:q.q+' Giải thích ngắn gọn vì sao.',sample:q.explain||'',
      keywords:[],parts:[],tick:[],typed:''};
  });
}
function buildMixed(ch){
  if(!isOpen(ch))return {error:'locked',reason:'Chưa đủ câu — đang soạn thêm (đã có '+bankCount(ch)+'/30 câu trắc nghiệm).',missing:null};
  var tn=drawTopic(ch,12);
  if(tn.length<12)return {error:'locked',reason:'Chưa đủ câu trắc nghiệm để làm đề hỗn hợp (rút được '+tn.length+'/12).',missing:null};
  var used={};
  tn.forEach(function(it){used[it.qid]=1;});
  var nho=_buildNho(ch,used);
  var tinh=_buildTinh(ch,used);
  var gt=_buildGiaithich(ch,used);
  if(nho.length<4||tinh.length<2||gt.length<2){
    var miss={};
    if(nho.length<4)miss.nho={need:4,have:nho.length};
    if(tinh.length<2)miss.tinh={need:2,have:tinh.length};
    if(gt.length<2)miss.giaithich={need:2,have:gt.length};
    var parts=[];
    if(miss.nho)parts.push('câu nhớ công thức/định nghĩa: chỉ có '+nho.length+'/4');
    if(miss.tinh)parts.push('câu tính: chỉ có '+tinh.length+'/2');
    if(miss.giaithich)parts.push('câu giải thích: chỉ có '+gt.length+'/2');
    return {error:'locked',reason:'Chưa đủ câu — đang soạn thêm (thiếu '+parts.join('; ')+').',missing:miss};
  }
  return {kind:'honhop',ch:ch,code:_code(ch),tn:tn,viet:nho.concat(tinh,gt),createdTs:Date.now()};
}

/* ---------- CSS (chen 1 lan khi init; gom ca rule SVG width:100% + height:auto) ---------- */
function _injectCss(){
  if(_state.cssDone||!document||!document.head)return;
  _state.cssDone=true;
  var css=[
    '.ktcd-topic{border:1.5px solid #cfd8dc;border-radius:10px;padding:12px 14px;margin:12px 0;background:#fafafa}',
    '.ktcd-item{border:1.5px solid #cfd8dc;border-radius:10px;padding:12px 14px;margin:12px 0;background:#fafafa}',
    '.ktcd-item svg{width:100%;height:auto}',
    '.ktcd-fig svg{width:100%;height:auto;max-width:360px}',
    '.ktcd-opts{display:flex;flex-direction:column;gap:8px}',
    '.ktcd-opt{display:block;width:100%;text-align:left;padding:11px 13px;font-size:16px;line-height:1.5;border:1.5px solid #90a4ae;border-radius:8px;background:#fff;cursor:pointer;min-height:44px;color:#222;font-family:inherit}',
    '.ktcd-opt:hover{border-color:#1a73e8}',
    '.ktcd-opt.sel{border-color:#1a73e8;background:#e3f2fd;font-weight:600}',
    '.ktcd-item.done .ktcd-opt{cursor:default}',
    '.ktcd-opt.right{border-color:#2e7d32;background:#e8f5e9;font-weight:700}',
    '.ktcd-opt.mark{border-color:#ef6c00;background:#fff3e0}',
    '.ktcd-line{border-bottom:2px dotted #90a4ae;height:28px;margin:2px 0}',
    '.ktcd-note{color:#444;font-size:16px;line-height:1.6}',
    '.ktcd-print-sheet{display:none}',
    '@media print{@page{size:A4;margin:12mm}body.ktcd-printing>*:not(.ktcd-print-sheet){display:none!important}body.ktcd-printing .ktcd-print-sheet{display:block;font-size:16px;line-height:1.6;color:#000}body.ktcd-printing .ktcd-print-sheet svg{width:100%;height:auto}}'
  ].join('\n');
  var st=document.createElement('style');
  st.setAttribute('data-ktcd','1');
  st.textContent=css;
  document.head.appendChild(st);
}

/* ---------- breadcrumb ---------- */
function setCrumb(detail){
  _state.crumb=detail||'';
  var tn=document.getElementById('tabNow');
  if(tn)tn.textContent='Bạn đang ở: Toán › 🧠 Kiểm tra › '+detail;
}

/* ---------- render: danh sach chuyen de ---------- */
function _topicCard(t,mode){
  var locked=!t.open;
  var html='<div class="ktcd-topic"><h3 style="margin:0 0 4px">'+_esc(t.name)+' <span style="font-weight:400;font-size:15px;color:#444">('+_esc(t.lessons)+')</span></h3>';
  html+='<p class="ktcd-note" style="margin:4px 0">Đã có '+t.count+'/30 câu trắc nghiệm.</p>';
  if(mode==='A'){
    if(locked){
      html+='<p class="ktcd-note"><b>Chưa đủ câu — đang soạn thêm.</b> Khi nào đủ 30 câu, chuyên đề này sẽ mở để làm đề.</p>';
    }else{
      if(t.count<40)html+='<p class="ktcd-note">Ngân hàng đang soạn thêm (mục tiêu 50 câu) — đề lần sau vẫn có thể gặp lại vài câu cũ.</p>';
      html+='<button type="button" class="btn btn-k" data-ktcd-a="'+t.ch+'">▶ Làm đề 20 câu</button>';
    }
  }else{
    if(locked){
      html+='<p class="ktcd-note"><b>Chưa đủ câu — đang soạn thêm.</b> Khi nào đủ 30 câu, chuyên đề này sẽ mở để làm đề.</p>';
    }else if(!t.written.ok){
      var miss=[];
      if(t.written.nho<4)miss.push('câu nhớ: chỉ có '+t.written.nho+'/4');
      if(t.written.tinh<2)miss.push('câu tính: chỉ có '+t.written.tinh+'/2');
      if(t.written.giaithich<2)miss.push('câu giải thích: chỉ có '+t.written.giaithich+'/2');
      html+='<p class="ktcd-note"><b>Chưa đủ câu — đang soạn thêm</b> (thiếu '+_esc(miss.join('; '))+'). Phần trắc nghiệm đã đủ, phần viết tay chưa đủ.</p>';
    }else{
      html+='<button type="button" class="btn btn-k" data-ktcd-b="'+t.ch+'">🔀 Làm đề hỗn hợp (12 trắc nghiệm + 8 viết)</button>';
    }
  }
  return html+'</div>';
}
function _renderTopicLists(){
  if(_state.A){
    if(!_state.bank.length){
      _state.A.innerHTML='<p class="ktcd-note">Đang tải ngân hàng câu hỏi…</p>';
    }else{
      _state.A.innerHTML='<p class="ktcd-note">Mỗi chuyên đề là 1 chương sách giáo khoa. Làm đề 20 câu trắc nghiệm, nộp xong biết điểm ngay. '+
        'Chuyên đề chỉ mở khi đã có đủ 30 câu — chưa đủ thì hiện “Chưa đủ câu — đang soạn thêm”.</p>'+
        getTopics().map(function(t){return _topicCard(t,'A');}).join('')+
        '<div id="ktcdAreaA"></div>';
      _bindTopicButtons(_state.A);
    }
  }
  if(_state.B){
    if(!_state.bank.length){
      _state.B.innerHTML='<p class="ktcd-note">Đang tải ngân hàng câu hỏi…</p>';
    }else{
      _state.B.innerHTML='<p class="ktcd-note">Một đề chung 12 câu trắc nghiệm + 8 câu viết tay (câu 13–16 nhớ công thức/định nghĩa, '+
        'câu 17–18 tính rồi ghi kết quả, câu 19–20 giải thích ngắn). Gợi ý làm trong khoảng 35 phút — không bấm giờ gắt.</p>'+
        getTopics().map(function(t){return _topicCard(t,'B');}).join('')+
        '<div id="ktcdAreaB"></div>';
      _bindTopicButtons(_state.B);
    }
  }
}
function _bindTopicButtons(root){
  var btns=root.querySelectorAll('[data-ktcd-a]');
  btns.forEach(function(b){
    b.addEventListener('click',function(){_startTN(parseInt(b.getAttribute('data-ktcd-a'),10));});
  });
  root.querySelectorAll('[data-ktcd-b]').forEach(function(b){
    b.addEventListener('click',function(){_startMixed(parseInt(b.getAttribute('data-ktcd-b'),10));});
  });
}

/* ---------- che do A ---------- */
function _startTN(ch){
  if(!isOpen(ch))return;
  var items=drawTopic(ch,20);
  if(items.length<20){
    var area=document.getElementById('ktcdAreaA');
    if(area)area.innerHTML='<p class="ktcd-note">Chưa đủ câu để làm đề 20 câu (rút được '+items.length+' câu).</p>';
    return;
  }
  _state.curTN={ch:ch,items:items,sel:items.map(function(){return -1;}),submitted:false,startTs:Date.now(),code:_code(ch)};
  _state.curMixed=null;
  _state.lastPaper={ch:ch,items:items};
  _state.redoUsed=false;
  setCrumb('Bộ đề theo chuyên đề · '+TOPICS[ch].name);
  _renderTN();
}
function _renderTN(){
  var cur=_state.curTN;
  var area=document.getElementById('ktcdAreaA');
  if(!cur||!area)return;
  var html='<h3>'+_esc(TOPICS[cur.ch].name)+' — Đề trắc nghiệm 20 câu <span style="font-weight:400;font-size:15px">· Mã đề '+_esc(cur.code)+'</span></h3>';
  html+='<p class="ktcd-note">Chọn đáp án rồi bấm “Nộp bài” ở cuối đề. Chưa nộp thì vẫn đổi được đáp án.</p>';
  cur.items.forEach(function(it,i){
    html+='<div class="ktcd-item" id="ktcdi'+i+'"><div style="font-weight:700">Câu '+(i+1)+'. '+_esc(it.q)+'</div><div class="ktcd-opts">';
    it.opts.forEach(function(o,j){
      html+='<button type="button" class="ktcd-opt'+(cur.sel[i]===j?' sel':'')+'" data-i="'+i+'" data-j="'+j+'">'+'ABCD'.charAt(j)+') '+_esc(o)+'</button>';
    });
    html+='</div><div class="ktcd-note" id="ktcde'+i+'" style="display:none"></div></div>';
  });
  html+='<div><button type="button" class="btn btn-a" id="ktcdSubmitA">✔ Nộp bài</button></div><div id="ktcdResultA"></div>';
  area.innerHTML=html;
  area.querySelectorAll('.ktcd-opt').forEach(function(btn){
    btn.addEventListener('click',function(){
      if(cur.submitted)return;
      var i=parseInt(btn.getAttribute('data-i'),10);
      cur.sel[i]=parseInt(btn.getAttribute('data-j'),10);
      btn.parentNode.querySelectorAll('.ktcd-opt').forEach(function(x){x.classList.remove('sel');});
      btn.classList.add('sel');
    });
  });
  var sb=document.getElementById('ktcdSubmitA');
  if(sb)sb.addEventListener('click',function(){submitTN();});
  if(area.scrollIntoView)area.scrollIntoView({block:'start'});
}
function _renderTNResult(cur,score){
  var pct=Math.round(score/cur.items.length*100);
  var weak=_weakGroups(cur.items,cur.sel);
  var html='<div class="ktcd-item" style="background:#e8f5e9"><h3 style="margin:0 0 6px">Con đã nhớ được '+score+'/'+cur.items.length+' câu ('+pct+'%).</h3>';
  html+='<p class="ktcd-note" style="margin:0">Làm xong một đề là một bước tiến rồi — cứ ôn từng chút một nhé.</p></div>';
  var wrongs=[];
  cur.items.forEach(function(it,i){if(cur.sel[i]!==it.answer)wrongs.push({it:it,i:i});});
  if(wrongs.length){
    html+='<h3>Những câu cần ôn lại ('+wrongs.length+' câu):</h3>';
    wrongs.forEach(function(w){
      html+='<div class="ktcd-item"><div style="font-weight:700">Câu '+(w.i+1)+'. '+_esc(w.it.q)+'</div>'+
        '<p class="ktcd-note" style="margin:4px 0">Em đã chọn: '+_esc(cur.sel[w.i]>=0?w.it.opts[cur.sel[w.i]]:'(chưa chọn)')+'<br>'+
        'Đáp án đúng: <b>'+_esc(w.it.opts[w.it.answer])+'</b><br>'+
        '💡 '+_esc(w.it.explain)+'</p></div>';
    });
  }else{
    html+='<p class="ktcd-note">Cả 20 câu đều đúng — giữ phong độ này nhé!</p>';
  }
  if(weak.length){
    html+='<h3>Phần cần ôn thêm:</h3><p class="ktcd-note">'+weak.map(function(g){return _esc(g.label)+' ('+g.n+' câu)';}).join(' · ')+'</p>';
  }
  html+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">'+
    '<button type="button" class="btn btn-k" id="ktcdNewA">🔁 Làm đề mới</button>'+
    '<button type="button" class="btn btn-c" id="ktcdRedoA"'+(_state.redoUsed?' disabled':'')+'>🔁 Làm lại đúng đề vừa rồi (ba mẹ mở)</button>'+
    '<button type="button" class="btn btn-g" id="ktcdHistA">📋 Xem lịch sử — Ba mẹ xem</button></div>';
  html+='<p class="ktcd-note">Nút “Làm lại đúng đề vừa rồi” chỉ mở được 1 lần sau mỗi đề mới — để sửa lỗi, không phải để nhớ đáp án.</p>';
  var res=document.getElementById('ktcdResultA');
  if(res)res.innerHTML=html;
  var nb=document.getElementById('ktcdNewA');
  if(nb)nb.addEventListener('click',function(){_startTN(cur.ch);});
  var rb=document.getElementById('ktcdRedoA');
  if(rb)rb.addEventListener('click',function(){
    if(_state.redoUsed||!_state.lastPaper)return;
    _state.redoUsed=true;
    _state.curTN={ch:_state.lastPaper.ch,items:_state.lastPaper.items,sel:_state.lastPaper.items.map(function(){return -1;}),submitted:false,startTs:Date.now(),code:_state.curTN.code};
    _state.curMixed=null;
    setCrumb('Bộ đề theo chuyên đề · '+TOPICS[_state.curTN.ch].name+' · Làm lại đề vừa rồi');
    _renderTN();
  });
  var hb=document.getElementById('ktcdHistA');
  if(hb)hb.addEventListener('click',function(){
    var h=document.getElementById('ktcd-sec-hist');
    if(h&&h.scrollIntoView)h.scrollIntoView({block:'start'});
    renderHistory();
  });
}
function submitTN(){
  /* Nop de dang lam: uu tien de hon hop neu dang mo, neu khong thi de trac nghiem A. */
  if(_state.curMixed&&!_state.curMixed.submitted)return _submitMixed();
  var cur=_state.curTN;
  if(!cur||cur.submitted||!cur.items.length)return null;
  cur.submitted=true;
  var score=_gradeTN(cur.items,cur.sel);
  var secs=Math.max(0,Math.round((Date.now()-cur.startTs)/1000));
  var rec={id:'ktcd-'+Date.now()+'-'+Math.floor(Math.random()*1000),ts:Date.now(),kind:'tracnghiem',
    chuyenDe:cur.ch,period:'c1',scoreTN:score,maxTN:cur.items.length,scoreViet:0,maxViet:0,
    total:score,maxTotal:cur.items.length,secs:secs,status:'da-cham',
    items:cur.items.map(function(it,i){return {qid:it.qid,q:it.q,opts:it.opts.slice(),answer:it.answer,picked:cur.sel[i],ok:cur.sel[i]===it.answer,explain:it.explain,src:it.src};}),
    viet:[]};
  saveHistory(rec);
  cur.items.forEach(function(it,i){
    var box=document.getElementById('ktcdi'+i);
    if(box){
      box.classList.add('done');
      box.querySelectorAll('.ktcd-opt').forEach(function(btn,j){
        btn.disabled=true;
        if(j===it.answer)btn.classList.add('right');
        else if(j===cur.sel[i])btn.classList.add('mark');
      });
    }
    var ex=document.getElementById('ktcde'+i);
    if(ex&&cur.sel[i]!==it.answer){ex.style.display='';ex.innerHTML='💡 '+_esc(it.explain)+' — Đáp án đúng: <b>'+_esc(it.opts[it.answer])+'</b>';}
  });
  var sb=document.getElementById('ktcdSubmitA');
  if(sb)sb.disabled=true;
  _renderTNResult(cur,score);
  return rec;
}

/* ---------- che do B ---------- */
function _startMixed(ch){
  var paper=buildMixed(ch);
  var area=document.getElementById('ktcdAreaB');
  if(!area)return;
  if(!paper||paper.error){
    area.innerHTML='<p class="ktcd-note"><b>'+_esc((paper&&paper.reason)||'Chưa đủ câu — đang soạn thêm.')+'</b></p>';
    setCrumb('Đề kiểm tra hỗn hợp · '+TOPICS[ch].name+' · Chưa đủ câu');
    return;
  }
  _state.curMixed={ch:ch,tn:paper.tn,viet:paper.viet,sel:paper.tn.map(function(){return -1;}),
    submitted:false,startTs:Date.now(),code:paper.code,paper:paper};
  _state.curTN=null;
  setCrumb('Đề kiểm tra hỗn hợp · '+TOPICS[ch].name);
  _renderMixed();
}
function _renderMixed(){
  var cur=_state.curMixed;
  var area=document.getElementById('ktcdAreaB');
  if(!cur||!area)return;
  var html='<h3>'+_esc(TOPICS[cur.ch].name)+' — Đề hỗn hợp <span style="font-weight:400;font-size:15px">· Mã đề '+_esc(cur.code)+'</span></h3>';
  html+='<p class="ktcd-note">Câu 1–12 trắc nghiệm, câu 13–20 viết tay. Gợi ý làm trong khoảng 35 phút — không bấm giờ gắt. '+
    '<button type="button" class="btn btn-g" id="ktcdPrintBtn">🖨️ In đề này</button> '+
    '<button type="button" class="btn btn-g" id="ktcdPrintAnsBtn">🖨️ In đáp án (cho ba mẹ)</button></p>';
  cur.tn.forEach(function(it,i){
    html+='<div class="ktcd-item" id="ktcdmi'+i+'"><div style="font-weight:700">Câu '+(i+1)+'. '+_esc(it.q)+'</div><div class="ktcd-opts">';
    it.opts.forEach(function(o,j){
      html+='<button type="button" class="ktcd-opt'+(cur.sel[i]===j?' sel':'')+'" data-i="'+i+'" data-j="'+j+'">'+'ABCD'.charAt(j)+') '+_esc(o)+'</button>';
    });
    html+='</div></div>';
  });
  cur.viet.forEach(function(v,vi){
    var n=13+vi;
    html+='<div class="ktcd-item"><div style="font-weight:700">Câu '+n+'. '+_esc(v.text)+'</div>';
    if(v.svg)html+='<div class="ktcd-fig">'+v.svg+'</div>';
    if(v.kind==='giaithich'){
      html+='<textarea id="ktcdw'+vi+'" rows="3" style="width:100%;font-size:17px" placeholder="Viết câu giải thích ngắn gọn…"></textarea>'+
        '<p class="ktcd-note">Câu này ba mẹ chấm sau (0 hoặc 1 điểm) trong màn hình lịch sử.</p>';
    }else{
      html+='<div><input id="ktcdw'+vi+'" type="text" style="width:100%;font-size:17px" placeholder="Viết đáp án vào đây…">'+(v.parts[0]&&v.parts[0].unit?' <span>'+_esc(v.parts[0].unit)+'</span>':'')+'</div>';
    }
    html+='</div>';
  });
  html+='<div><button type="button" class="btn btn-a" id="ktcdSubmitB">✔ Nộp bài</button></div><div id="ktcdResultB"></div>';
  area.innerHTML=html;
  area.querySelectorAll('.ktcd-opt').forEach(function(btn){
    btn.addEventListener('click',function(){
      if(cur.submitted)return;
      var i=parseInt(btn.getAttribute('data-i'),10);
      cur.sel[i]=parseInt(btn.getAttribute('data-j'),10);
      btn.parentNode.querySelectorAll('.ktcd-opt').forEach(function(x){x.classList.remove('sel');});
      btn.classList.add('sel');
    });
  });
  var pb=document.getElementById('ktcdPrintBtn');
  if(pb)pb.addEventListener('click',function(){printSheet(buildPrintSheet('honhop',cur.paper));});
  var pa=document.getElementById('ktcdPrintAnsBtn');
  if(pa)pa.addEventListener('click',function(){printSheet(buildAnswerSheet(cur.paper));});
  var sb=document.getElementById('ktcdSubmitB');
  if(sb)sb.addEventListener('click',function(){_submitMixed();});
  if(area.scrollIntoView)area.scrollIntoView({block:'start'});
}
function _submitMixed(){
  var cur=_state.curMixed;
  if(!cur||cur.submitted)return null;
  cur.submitted=true;
  cur.viet.forEach(function(v,vi){
    var el=document.getElementById('ktcdw'+vi);
    v.typed=el?el.value:'';
  });
  var scoreTN=_gradeTN(cur.tn,cur.sel);
  var scoreViet=0;
  cur.viet.forEach(function(v){
    if(v.kind==='giaithich'){v.tick=[];return;} /* cau giai thich: ba me tick sau, khong gan tick may */
    var ok=false;
    if(v.kind==='nho')ok=_gradeNho(v.typed,v.keywords||[]);
    else if(v.kind==='tinh')ok=_gradeTinh(v.typed,v.parts[0]?v.parts[0].answer:'');
    v.tick=[ok];
    if(ok)scoreViet++;
  });
  var secs=Math.max(0,Math.round((Date.now()-cur.startTs)/1000));
  var machine=scoreTN+scoreViet; /* /18: 12 TN + 6 viet may cham */
  var rec={id:'ktcd-'+Date.now()+'-'+Math.floor(Math.random()*1000),ts:Date.now(),kind:'honhop',
    chuyenDe:cur.ch,period:'c1',scoreTN:scoreTN,maxTN:12,scoreViet:scoreViet,maxViet:8,
    total:machine,maxTotal:20,secs:secs,status:'cho-cham',
    items:cur.tn.map(function(it,i){return {qid:it.qid,q:it.q,opts:it.opts.slice(),answer:it.answer,picked:cur.sel[i],ok:cur.sel[i]===it.answer,explain:it.explain,src:it.src};}),
    viet:cur.viet.map(function(v){return {kind:v.kind,by:v.by,template:v.template,title:v.title,text:v.text,
      sample:v.sample,keywords:v.keywords||[],svg:v.svg||'',parts:(v.parts||[]).map(function(p){return {label:p.label,answer:p.answer,unit:p.unit||''};}),
      tick:v.tick.slice(),typed:v.typed||''};})};
  saveHistory(rec);
  cur.tn.forEach(function(it,i){
    var box=document.getElementById('ktcdmi'+i);
    if(box){
      box.classList.add('done');
      box.querySelectorAll('.ktcd-opt').forEach(function(btn,j){
        btn.disabled=true;
        if(j===it.answer)btn.classList.add('right');
        else if(j===cur.sel[i])btn.classList.add('mark');
      });
    }
  });
  cur.viet.forEach(function(v,vi){
    var el=document.getElementById('ktcdw'+vi);
    if(el)el.disabled=true;
  });
  var sb=document.getElementById('ktcdSubmitB');
  if(sb)sb.disabled=true;
  var res=document.getElementById('ktcdResultB');
  if(res){
    res.innerHTML='<div class="ktcd-item" style="background:#e8f5e9"><h3 style="margin:0 0 6px">Máy chấm được '+machine+'/18.</h3>'+
      '<p class="ktcd-note" style="margin:0">Ba mẹ chấm thêm 2 câu giải thích trong màn hình lịch sử để có tổng /20. '+
      'Đã lưu vào lịch sử — ba mẹ có thể chấm muộn, không cần chấm ngay.</p></div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">'+
      '<button type="button" class="btn btn-k" id="ktcdNewB">🔁 Làm đề hỗn hợp mới</button>'+
      '<button type="button" class="btn btn-g" id="ktcdHistB">📋 Xem lịch sử — Ba mẹ xem</button></div>';
    var nb=document.getElementById('ktcdNewB');
    if(nb)nb.addEventListener('click',function(){_startMixed(cur.ch);});
    var hb=document.getElementById('ktcdHistB');
    if(hb)hb.addEventListener('click',function(){
      var h=document.getElementById('ktcd-sec-hist');
      if(h&&h.scrollIntoView)h.scrollIntoView({block:'start'});
      renderHistory();
    });
  }
  renderHistory();
  return rec;
}
/* Ba me tick 1 cau giai thich (i = chi so trong viet[] cua ban ghi vua luu gan nhat). */
function tickViet(i,ok){
  var recs=loadHistory();
  var rec=null;
  for(var k=0;k<recs.length;k++){if(recs[k].id===_state.lastHistId){rec=recs[k];break;}}
  if(!rec)rec=recs[0];
  if(!rec)return null;
  return _tickVietRecord(rec.id,i,ok);
}
function _tickVietRecord(id,i,ok){
  var h=loadHistory();
  var rec=null;
  for(var k=0;k<h.length;k++){if(h[k].id===id){rec=h[k];break;}}
  if(!rec||!rec.viet[i]||rec.viet[i].kind!=='giaithich')return null;
  rec.viet[i].tick=[!!ok];
  var gt=rec.viet.filter(function(v){return v.kind==='giaithich';});
  var allTicked=gt.length===2&&gt.every(function(v){return v.tick&&v.tick.length>0;});
  if(allTicked){
    rec.status='da-cham';
    var add=0;
    gt.forEach(function(v){if(v.tick[0])add++;});
    rec.total=rec.scoreTN+rec.scoreViet+add;
  }
  _saveHistRaw(h);
  renderHistory();
  return rec;
}

/* ---------- lich su ---------- */
function _topicSummary(ch){
  var recs=loadHistory().filter(function(r){return r.chuyenDe===ch;});
  if(!recs.length)return null;
  var sorted=recs.slice().sort(function(a,b){return a.ts-b.ts;});
  var last=sorted[sorted.length-1],prev=sorted.length>1?sorted[sorted.length-2]:null;
  var best=0;
  sorted.forEach(function(r){if(r.total>best)best=r.total;});
  var line='Đã làm '+recs.length+' lần · cao nhất '+best+'/'+(last.maxTotal||20);
  if(prev){
    var d=last.total-prev.total;
    line+=' · Lần trước: '+prev.total+'/'+(prev.maxTotal||20)+' → Lần này: '+last.total+'/'+(last.maxTotal||20)+' ('+(d>=0?'+':'')+d+')';
  }else{
    line+=' · Lần này: '+last.total+'/'+(last.maxTotal||20);
  }
  return line;
}
function renderHistory(){
  var root=_state.Hist;
  if(!root)return;
  var recs=loadHistory();
  var html='<p class="ktcd-note">Lịch sử để ba mẹ biết con yếu khái niệm nào, không dùng để nhắc/mắng. '+
    'Chỉ so con với chính con lần trước — không so với bạn khác, không xếp hạng.</p>';
  html+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">'+
    '<label>Chuyên đề: <select id="ktcdHistFilter" style="font-size:16px;min-height:44px"><option value="all">Tất cả</option>'+
    TOPIC_ORDER.map(function(ch){return '<option value="'+ch+'"'+(_state.histFilter===''+ch?' selected':'')+'>'+_esc(TOPICS[ch].name)+'</option>';}).join('')+
    '</select></label>'+
    '<button type="button" class="btn btn-g" id="ktcdPrintReport">🖨️ In báo cáo cho ba mẹ</button>'+
    '<button type="button" class="btn btn-g" id="ktcdDelAll">'+(_state.deleteAllArm?'Bấm lại để xác nhận xoá hết':'🗑 Xoá hết lịch sử')+'</button></div>';
  TOPIC_ORDER.forEach(function(ch){
    var s=_topicSummary(ch);
    if(s)html+='<p class="ktcd-note"><b>'+_esc(TOPICS[ch].name)+':</b> '+_esc(s)+'</p>';
  });
  var list=recs;
  if(_state.histFilter!=='all')list=recs.filter(function(r){return r.chuyenDe===parseInt(_state.histFilter,10);});
  if(!list.length){
    html+='<p class="ktcd-note">Chưa có lần làm nào'+(_state.histFilter!=='all'?' ở chuyên đề này':'')+'.</p>';
  }
  list.forEach(function(r){
    var open=_state.selectedHistId===r.id;
    html+='<div class="ktcd-item"><div style="display:flex;gap:8px;align-items:flex-start;justify-content:space-between">'+
      '<button type="button" class="btn btn-g" data-ktcd-open="'+r.id+'" style="text-align:left;flex:1">'+
      _esc(_fmtDate(r.ts))+' · '+_esc(TOPICS[r.chuyenDe].name)+' · '+(r.kind==='honhop'?'Đề hỗn hợp':'Trắc nghiệm 20 câu')+
      ' · <b>'+r.total+'/'+r.maxTotal+'</b> '+(r.status==='cho-cham'?'(Chờ ba mẹ chấm 2 câu giải thích)':'(Đã chấm)')+'</button>'+
      '<button type="button" class="btn btn-g" data-ktcd-del="'+r.id+'" title="Xoá lần làm này">✕</button></div>';
    if(open){
      html+='<div style="margin-top:8px"><p class="ktcd-note">Trắc nghiệm: '+r.scoreTN+'/'+r.maxTN+
        (r.kind==='honhop'?' · Viết tay (máy chấm): '+r.scoreViet+'/'+(r.maxViet-2)+' · Tổng: '+r.total+'/'+r.maxTotal:'')+
        ' · Thời gian làm: '+r.secs+' giây.</p>';
      var wrongs=r.items.filter(function(it){return !it.ok;});
      if(wrongs.length){
        html+='<h4>Những câu cần ôn lại:</h4>';
        wrongs.forEach(function(it){
          html+='<p class="ktcd-note">• '+_esc(it.q)+'<br>Em đã chọn: '+_esc(it.picked>=0?it.opts[it.picked]:'(chưa chọn)')+
            ' · Đáp án đúng: <b>'+_esc(it.opts[it.answer])+'</b><br>💡 '+_esc(it.explain)+'</p>';
        });
      }else{
        html+='<p class="ktcd-note">Phần trắc nghiệm đúng hết.</p>';
      }
      if(r.viet&&r.viet.length){
        html+='<h4>Phần viết tay:</h4>';
        r.viet.forEach(function(v,vi){
          html+='<p class="ktcd-note">• '+_esc(v.text)+'<br>Em đã viết: '+_esc(v.typed||'(chưa viết)')+'<br>Đáp án mẫu: <b>'+_esc(v.sample||((v.parts[0]||{}).answer||''))+'</b>';
          if(v.kind==='giaithich'){
            var ticked=v.tick&&v.tick.length>0;
            html+='<br>Ba mẹ chấm: '+(ticked?(v.tick[0]?'Đúng (1 điểm)':'Chưa đúng (0 điểm)'):'chưa chấm')+' '+
              '<button type="button" class="btn btn-c" data-ktcd-tick="'+r.id+':'+vi+':1">✔ Đúng</button> '+
              '<button type="button" class="btn btn-g" data-ktcd-tick="'+r.id+':'+vi+':0">Chưa đúng</button>';
          }else{
            html+='<br>Máy chấm: '+((v.tick&&v.tick[0])?'đúng':'cần ôn lại');
          }
          html+='</p>';
        });
      }
      html+='</div>';
    }
    html+='</div>';
  });
  root.innerHTML=html;
  var fs=document.getElementById('ktcdHistFilter');
  if(fs)fs.addEventListener('change',function(){_state.histFilter=fs.value;_state.deleteAllArm=false;renderHistory();});
  var pr=document.getElementById('ktcdPrintReport');
  if(pr)pr.addEventListener('click',function(){_printReport();});
  var da=document.getElementById('ktcdDelAll');
  if(da)da.addEventListener('click',function(){
    if(!_state.deleteAllArm){_state.deleteAllArm=true;renderHistory();}
    else{_deleteAllHistory();}
  });
  root.querySelectorAll('[data-ktcd-open]').forEach(function(b){
    b.addEventListener('click',function(){
      var id=b.getAttribute('data-ktcd-open');
      _state.selectedHistId=(_state.selectedHistId===id)?null:id;
      renderHistory();
    });
  });
  root.querySelectorAll('[data-ktcd-del]').forEach(function(b){
    b.addEventListener('click',function(){_deleteRecord(b.getAttribute('data-ktcd-del'));});
  });
  root.querySelectorAll('[data-ktcd-tick]').forEach(function(b){
    b.addEventListener('click',function(){
      var p=b.getAttribute('data-ktcd-tick').split(':');
      _tickVietRecord(p[0],parseInt(p[1],10),p[2]==='1');
    });
  });
}
function _printReport(){
  var recs=loadHistory();
  var chosen=null;
  if(_state.selectedHistId){
    recs.forEach(function(r){if(r.id===_state.selectedHistId)chosen=r;});
  }
  var data;
  if(chosen){
    data={records:[chosen],title:'Báo cáo 1 lần làm'};
  }else{
    var list=recs;
    if(_state.histFilter!=='all')list=recs.filter(function(r){return r.chuyenDe===parseInt(_state.histFilter,10);});
    data={records:list.slice(0,5),title:'Báo cáo 5 lần gần nhất'+(_state.histFilter!=='all'?' — '+TOPICS[parseInt(_state.histFilter,10)].name:'')};
  }
  printSheet(buildPrintSheet('baocao',data));
}

/* ---------- in ---------- */
function _printHead(title){
  return '<h2 style="text-align:center">'+_esc(title)+'</h2>'+
    '<p>Họ tên: ............................ &nbsp;&nbsp; Ngày: ..../..../.... &nbsp;&nbsp; Điểm: ..../20</p>';
}
function _dottedLines(n){
  var s='';
  for(var i=0;i<n;i++)s+='<div class="ktcd-line">&nbsp;</div>';
  return s;
}
function buildPrintSheet(kind,data){
  if(kind==='baocao'){
    var recs=(data&&data.records)||[];
    var html=_printHead(data&&data.title?data.title:'Báo cáo kiểm tra cho ba mẹ');
    if(!recs.length)html+='<p>Chưa có lần làm nào.</p>';
    recs.forEach(function(r){
      html+='<h3>'+_esc(_fmtDate(r.ts))+' · '+_esc(TOPICS[r.chuyenDe]?TOPICS[r.chuyenDe].name:'')+' · '+(r.kind==='honhop'?'Đề hỗn hợp':'Trắc nghiệm')+' · '+r.total+'/'+r.maxTotal+'</h3>';
      html+='<p>Trắc nghiệm: '+r.scoreTN+'/'+r.maxTN+(r.kind==='honhop'?' · Viết tay: '+r.scoreViet+'/'+r.maxViet:'')+'</p>';
      var wrongs=r.items.filter(function(it){return !it.ok;});
      wrongs.forEach(function(it){
        html+='<p>• '+_esc(it.q)+'<br>Đáp án đúng: <b>'+_esc(it.opts[it.answer])+'</b> — '+_esc(it.explain)+'</p>';
      });
      (r.viet||[]).forEach(function(v){
        html+='<p>• '+_esc(v.text)+'<br>Đáp án mẫu: <b>'+_esc(v.sample||((v.parts[0]||{}).answer||''))+'</b></p>';
      });
    });
    return html;
  }
  if(kind==='phieu'){
    var obj=data&&data.obj?data.obj:null;
    var title=(obj&&obj.title)||(data&&data.title)||'Phiếu luyện dạng bài';
    var h=_printHead(title);
    if(obj){
      h+='<p style="font-weight:700">'+_esc(obj.text||'')+'</p>';
      if(obj.svg)h+='<div>'+obj.svg+'</div>';
      (obj.parts||[]).forEach(function(p){
        h+='<p>'+_esc(p.label||'')+(p.unit?' ('+_esc(p.unit)+')':'')+'</p>';
      });
      h+=_dottedLines(5);
    }
    return h;
  }
  /* honhop / tracnghiem: TO DE — khong chua dap an trong DOM. */
  var ch=data?data.ch:1;
  var title2=(data&&data.kind==='honhop'?'Đề kiểm tra hỗn hợp — ':'Đề trắc nghiệm — ')+TOPICS[ch].name;
  var h2=_printHead(title2)+(data&&data.code?'<p>Mã đề: '+_esc(data.code)+'</p>':'');
  var tn=(data&&data.tn)||[];
  tn.forEach(function(it,i){
    h2+='<p><b>Câu '+(i+1)+'.</b> '+_esc(it.q)+'<br>'+it.opts.map(function(o,j){return '☐ '+_esc('ABCD'.charAt(j)+') '+o);}).join('<br>')+'</p>';
  });
  var viet=(data&&data.viet)||[];
  viet.forEach(function(v,vi){
    var n=tn.length+1+vi;
    h2+='<p><b>Câu '+n+'.</b> '+_esc(v.text)+'</p>';
    if(v.svg)h2+='<div>'+v.svg+'</div>';
    h2+=_dottedLines(v.kind==='nho'?1:(v.kind==='tinh'?3:3));
  });
  return h2;
}
function buildAnswerSheet(data){
  if(!data)return '<h2>Đáp án (cho ba mẹ)</h2><p>Không có đề.</p>';
  if(data.obj){
    var obj=data.obj;
    var h='<h2>Đáp án (cho ba mẹ) — '+_esc(obj.title||'Phiếu luyện dạng bài')+'</h2>';
    (obj.parts||[]).forEach(function(p){
      h+='<p>'+_esc(p.label||'')+': <b>'+_esc(String(p.answer))+'</b>'+(p.unit?' '+_esc(p.unit):'')+'</p>';
    });
    (obj.solution||[]).forEach(function(s){h+='<p>'+_esc(s)+'</p>';});
    return h;
  }
  var ch=data.ch||1;
  var h2='<h2>Đáp án (cho ba mẹ) — '+_esc(TOPICS[ch].name)+(data.code?' · Mã đề '+_esc(data.code):'')+'</h2>';
  (data.tn||[]).forEach(function(it,i){
    h2+='<p>Câu '+(i+1)+': <b>'+'ABCD'.charAt(it.answer)+'</b> — '+_esc(it.opts[it.answer])+(it.explain?'<br>💡 '+_esc(it.explain):'')+'</p>';
  });
  (data.viet||[]).forEach(function(v,vi){
    var n=(data.tn||[]).length+1+vi;
    h2+='<p>Câu '+n+': <b>'+_esc(v.sample||((v.parts[0]||{}).answer||''))+'</b></p>';
  });
  return h2;
}
function printSheet(html){
  if(!html)html=_state._pendingPrint||'';
  var old=document.querySelector('.ktcd-print-sheet');
  if(old&&old.parentNode)old.parentNode.removeChild(old);
  var div=document.createElement('div');
  div.className='ktcd-print-sheet';
  div.innerHTML=html;
  document.body.appendChild(div);
  document.body.classList.add('ktcd-printing');
  var done=false;
  function cleanup(){
    if(done)return;done=true;
    document.body.classList.remove('ktcd-printing');
    if(div.parentNode)div.parentNode.removeChild(div);
    if(window.removeEventListener)window.removeEventListener('afterprint',cleanup);
  }
  if(window.addEventListener)window.addEventListener('afterprint',cleanup);
  setTimeout(cleanup,5000);
  if(typeof window.print==='function'){try{window.print();}catch(e){}}
  return div;
}
/* Phieu in theo dang bai (§VI): GEN.makeFrom 1 lan, luu vao toan6_ktcd_phieu_v1, dung to in.
   DOT 1 KHONG gan nut UI nao cho ham nay (nut "In dang bai nay" la dot 2). */
function printTopicVariant(templateKey,lvl){
  if(!_state.GEN||typeof _state.GEN.makeFrom!=='function')return null;
  var obj;
  try{obj=_state.GEN.makeFrom(templateKey,lvl||2);}catch(e){return null;}
  if(!obj)return null;
  var rec={template:templateKey,lvl:lvl||2,obj:obj,ts:Date.now()};
  _lsSet(PHIEU_KEY,rec);
  return {sheet:buildPrintSheet('phieu',rec),answerSheet:buildAnswerSheet(rec),obj:obj,template:templateKey};
}

/* ---------- init ---------- */
function init(opts){
  opts=opts||{};
  _state.bank=Array.isArray(opts.bank)?opts.bank:[];
  _state.theory=Array.isArray(opts.theory)?opts.theory:[];
  _state.GEN=opts.GEN||window.GEN||null;
  if(opts.A)_state.A=(typeof opts.A==='string')?document.getElementById(opts.A):opts.A;
  if(opts.B)_state.B=(typeof opts.B==='string')?document.getElementById(opts.B):opts.B;
  if(opts.Hist)_state.Hist=(typeof opts.Hist==='string')?document.getElementById(opts.Hist):opts.Hist;
  _injectCss();
  _state.inited=true;
  _renderTopicLists();
  renderHistory();
  return true;
}

window.KiemTraChuyenDe={
  init:init,getTopics:getTopics,bankCount:bankCount,isOpen:isOpen,
  drawTopic:drawTopic,buildMixed:buildMixed,submitTN:submitTN,tickViet:tickViet,
  saveHistory:saveHistory,loadHistory:loadHistory,validateRecord:validateRecord,
  buildPrintSheet:buildPrintSheet,buildAnswerSheet:buildAnswerSheet,printSheet:printSheet,
  printTopicVariant:printTopicVariant,setCrumb:setCrumb,renderHistory:renderHistory,
  _state:_state,
  _grade:{tn:_gradeTN,nho:_gradeNho,tinh:_gradeTinh},
  _norm:_norm,_parseNum:_parseNum,_keywordsOf:_keywordsOf,
  _writtenAvailability:_writtenAvailability
};
})();
