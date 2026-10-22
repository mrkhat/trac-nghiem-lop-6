/* ============================================================
   FC-ONLUYEN.JS — engine + khoi dong tinh nang "On luyen" cho
   trang bai tap (quiz.html) cua cac mon va trang Toan.
   - fcDeck: engine flashcard thong nhat, trich nguyen van tu
     trang hoc (ban chuan trong khtn/index.html).
   - onluyenState: dung chung kho tien do thong nhat fc-state.js
     (cung khoa <mon>_fcquiz_v1 voi trang hoc va tab Flashcard,
     kem lich on lai cach quang 1-3-7 ngay).
   - onluyenMiniItems: gom the Nho nhanh tu trang hoc (index.html)
     cua cung thu muc — nguon duy nhat, khong sao chep du lieu.
   - onluyenBoot: gan nut/mo dong khu vuc On luyen o quiz.html.
   ============================================================ */
/* ===== ENGINE FLASHCARD THONG NHAT =====
   Cach dung: 1 the tai 1 thoi diem; the chua thuoc xep truoc.
   Bam vao the de lat (xoay 3D). Tick "Da thuoc": dau tick nay pop + the truot phai;
   tick "Chua thuoc": the truot trai + ve cuoi hang doi de gap lai trong phien.
   Thuoc het bo -> khung chuc mung + nut hoc lai tu dau. */
function fcDeck(box, cfg){
  var items=cfg.items;
  var queue=items.map(function(it){return it.id;});
  queue.sort(function(a,b){return (cfg.isKnown(a)?1:0)-(cfg.isKnown(b)?1:0);});
  var pos=0, flipped=false, busy=false;
  box.innerHTML='<div class="fc-card"><div class="fc-pop"></div><div class="fc-inner"><div class="fc-face fc-front"></div><div class="fc-face fc-back"></div></div></div>'
   +'<div class="fc-btns"><button class="fc-no" data-a="no">↺ Chưa thuộc</button><button class="fc-ok" data-a="ok">✔ Đã thuộc</button></div>'
   +'<div class="fc-btns"><button data-a="prev">⬅ Trước</button><button data-a="shuffle">🔀 Xáo trộn</button><button data-a="next">Tiếp ➡</button></div>'
   +'<div class="fc-guide" style="text-align:center;font-size:16px;color:#37474f;margin:8px 0 2px">Bấm vào thẻ để lật xem đáp án. Nhớ rồi thì bấm ✔ Đã thuộc. Chưa nhớ thì bấm ↺ Chưa thuộc — thẻ sẽ quay lại cho em học tiếp, không bị trừ điểm đâu.</div><div class="fc-guardmsg" style="text-align:center;font-size:16px;font-weight:600;color:#b34700;min-height:24px"></div>'
   +'<div class="fc-bar"><div class="fc-bar-in"></div></div><div class="fc-prog"></div><div class="fc-stat"></div><div class="fc-donebox"></div>';
  var card=box.querySelector('.fc-card'),front=box.querySelector('.fc-front'),back=box.querySelector('.fc-back'),pop=box.querySelector('.fc-pop'),
      prog=box.querySelector('.fc-prog'),stat=box.querySelector('.fc-stat'),bar=box.querySelector('.fc-bar-in'),doneBox=box.querySelector('.fc-donebox'),guardMsg=box.querySelector('.fc-guardmsg');
  function byId(id){for(var i=0;i<items.length;i++)if(items[i].id===id)return items[i];return null;}
  function knownCount(){var n=0;items.forEach(function(it){if(cfg.isKnown(it.id))n++;});return n;}
  function render(dir){
    if(guardMsg)guardMsg.textContent='';
    if(!queue.length){
      card.style.display='none';prog.textContent='';
      doneBox.innerHTML='<div class="fc-done">🎉 Chúc mừng! Em đã thuộc hết bộ thẻ này!<br><button class="fc-restart">↺ Học lại từ đầu</button></div>';
      doneBox.querySelector('.fc-restart').addEventListener('click',function(){
        items.forEach(function(it){cfg.setKnown(it.id,false);});
        queue=items.map(function(it){return it.id;});pos=0;flipped=false;doneBox.innerHTML='';card.style.display='';render();
      });
    } else {
      card.style.display='';doneBox.innerHTML='';
      var it=byId(queue[pos]);
      front.innerHTML=it.front;back.innerHTML=it.back;
      card.classList.toggle('flipped',flipped);
      card.classList.remove('fc-in-r','fc-in-l');void card.offsetWidth;
      if(dir)card.classList.add(dir==='r'?'fc-in-r':'fc-in-l');
      prog.textContent='Thẻ '+(pos+1)+' / '+queue.length;
    }
    var k=knownCount();
    var tt=(cfg.totalText?cfg.totalText():'');
    stat.textContent='Đã thuộc '+k+'/'+items.length+' thẻ của bộ này'+(tt?(' • '+tt):'');
    bar.style.width=(items.length?Math.round(k*100/items.length):0)+'%';
    if(cfg.onRender)cfg.onRender(box);
  }
  function go(d){if(!queue.length||busy)return;pos=(pos+d+queue.length)%queue.length;flipped=false;render(d>0?'r':'l');}
  function tick(ok){
    if(busy||!queue.length)return;
    if(!flipped){flipped=true;card.classList.add('flipped');if(guardMsg)guardMsg.textContent='Nhìn đáp án đã, rồi tự hỏi: lúc nãy em có nhớ được không?';return;}
    busy=true;
    var id=queue[pos];
    pop.textContent=ok?'✔':'↺';pop.className='fc-pop '+(ok?'ok':'no');pop.style.display='flex';
    card.classList.add(ok?'fc-out-r':'fc-out-l');
    setTimeout(function(){
      cfg.setKnown(id,ok);
      queue.splice(pos,1);
      if(!ok)queue.push(id);
      if(pos>=queue.length)pos=Math.max(0,queue.length-1);
      flipped=false;
      card.classList.remove('fc-out-r','fc-out-l');
      pop.style.display='none';
      busy=false;
      render(ok?'l':'r');
    },300);
  }
  card.addEventListener('click',function(){if(busy)return;flipped=!flipped;card.classList.toggle('flipped',flipped);});
  box.querySelectorAll('button[data-a]').forEach(function(b){b.addEventListener('click',function(){
    var a=b.getAttribute('data-a');
    if(a==='ok')tick(true);else if(a==='no')tick(false);
    else if(a==='prev')go(-1);else if(a==='next')go(1);
    else if(a==='shuffle'){for(var i=queue.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=queue[i];queue[i]=queue[j];queue[j]=t;}pos=0;flipped=false;render();}
  });});
  render();
}

/* ---------- Trang thai On luyen: dung CHUNG kho thong nhat fc-state.js ----------
   (bai hoc / On luyen / tab Flashcard cung mot tien do + lich on 1-3-7 ngay;
    khoa cu onluyen_<mon> duoc di tru dan boi fcMigrateOnluyen/fcMigrateFlash) */
function onluyenState(lsKey){
  var mon=String(lsKey||'').replace(/^onluyen_/,'');
  if(window.fcStore){
    var store=window.fcMigrateFlash?fcMigrateFlash(mon):fcStore(mon);
    return {
      isKnown:function(id){ return store.isKnown(id); },
      isDue:function(id){ return store.isDue(id); },
      setKnown:function(id,v){ store.setKnown(id, !!v); },
      __store:store, __mon:mon
    };
  }
  var st={};
  try{ st=JSON.parse(localStorage.getItem(lsKey)||'{}'); }catch(e){ st={}; }
  return {
    isKnown:function(id){ return st[id]===1; },
    setKnown:function(id,v){
      st[id]=v?1:0;
      try{ localStorage.setItem(lsKey, JSON.stringify(st)); }catch(e){}
    }
  };
}

/* ---------- Gom the Nho nhanh (minicard) tu trang hoc ---------- */
var __onlMiniCache={};
function onluyenMiniItems(source){
  if(__onlMiniCache[source]) return __onlMiniCache[source];
  function fromDoc(doc){
    var out=[];
    doc.querySelectorAll('.minicard').forEach(function(mc){
      var f=mc.querySelector('.mini-front'), b=mc.querySelector('.mini-back');
      if(!f||!b) return;
      out.push({id:'nn'+(out.length+1), front:f.innerHTML, back:b.innerHTML});
    });
    return out;
  }
  var p;
  if(source==='dom'){
    p=Promise.resolve(fromDoc(document));
  } else {
    p=fetch('index.html').then(function(r){ return r.text(); }).then(function(t){
      return fromDoc(new DOMParser().parseFromString(t,'text/html'));
    }).catch(function(){ return []; });
  }
  __onlMiniCache[source]=p;
  return p;
}

/* ---------- Khoi dong khu vuc On luyen trong quiz.html ----------
   cfg = { lsKey, subject, buildFlashItems }                    */
function onluyenBoot(cfg){
  var state=onluyenState(cfg.lsKey);
  var home=document.getElementById('home'),
      quizArea=document.getElementById('quizArea'),
      area=document.getElementById('onluyen'),
      title=document.getElementById('onlTitle'),
      sub=document.getElementById('onlSub'),
      boxFC=document.getElementById('onlDeckFC'),
      boxNN=document.getElementById('onlDeckNN');
  var built={};
  function openDeck(kind){
    if(home) home.classList.add('hidden');
    if(quizArea) quizArea.classList.add('hidden');
    area.classList.remove('hidden');
    boxFC.style.display=(kind==='fc')?'':'none';
    boxNN.style.display=(kind==='nn')?'':'none';
    if(kind==='fc'){
      title.textContent='🃏 Ôn luyện — Thẻ ghi nhớ của môn '+cfg.subject;
      sub.textContent='Tất cả thẻ ghi nhớ của môn, gộp từ mọi bài. Bấm vào thẻ để lật xem đáp án, nhớ rồi bấm ✔ Đã thuộc.';
    } else {
      title.textContent='⚡ Ôn luyện — Thẻ học nhanh của môn '+cfg.subject;
      sub.textContent='Tất cả thẻ ⚡ Nhớ nhanh của môn, gộp từ mọi bài. Bấm vào thẻ để lật xem đáp án, nhớ rồi bấm ✔ Đã thuộc.';
    }
    window.scrollTo(0,0);
    if(built[kind]) return;
    built[kind]=true;
    if(kind==='fc'){
      var fItems=cfg.buildFlashItems();
      if(window.fcCidF){ fItems.forEach(function(it){ it.id=(typeof it.id==='number')?fcCidC(it.id):fcCidF(it.id); }); }
      fcDeck(boxFC,{items:fItems, isKnown:state.isKnown, setKnown:state.setKnown, totalText:function(){ if(!state.__store) return ''; var d=state.__store.countDue(fItems.map(function(x){return x.id;})); return d>0?('Hôm nay ôn lại nhé: '+d+' thẻ sắp quên'):''; }});
    } else {
      boxNN.innerHTML='<p style="text-align:center">Đang tải thẻ…</p>';
      onluyenMiniItems('fetch').then(function(items){
        boxNN.innerHTML='';
        if(!items.length){ boxNN.innerHTML='<p style="text-align:center">Chưa tải được thẻ. Em thử tải lại trang nhé!</p>'; return; }
        if(window.fcMigrateOnluyen && state.__mon) fcMigrateOnluyen(state.__mon, items);
        if(window.fcCidM){ items.forEach(function(it){ it.id=fcCidM(it.front); }); }
        fcDeck(boxNN,{items:items, isKnown:state.isKnown, setKnown:state.setKnown, totalText:function(){ if(!state.__store) return ''; var d=state.__store.countDue(items.map(function(x){return x.id;})); return d>0?('Hôm nay ôn lại nhé: '+d+' thẻ sắp quên'):''; }});
      });
    }
  }
  var bF=document.getElementById('btnOnFC'), bN=document.getElementById('btnOnNN'), bB=document.getElementById('btnOnBack');
  if(bF) bF.addEventListener('click', function(){ openDeck('fc'); });
  if(bN) bN.addEventListener('click', function(){ openDeck('nn'); });
  if(bB) bB.addEventListener('click', function(){
    area.classList.add('hidden');
    if(home) home.classList.remove('hidden');
    window.scrollTo(0,0);
  });
  /* Dien so the vao nhan nut (neu co) */
  var cntF=document.getElementById('onFCnt'), cntN=document.getElementById('onNCnt');
  if(cntF){ try{ cntF.textContent=cfg.buildFlashItems().length; }catch(e){} }
  if(cntN){ onluyenMiniItems('fetch').then(function(items){ cntN.textContent=items.length; }).catch(function(){}); }
}
