(()=>{
'use strict';
const T=window.JAPAN_TRIP,TX=window.JAPAN_TRANSFERS||{},DP=window.JAPAN_DAY_TRANSPORT||{};if(!T)return;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const TIPKEY='japan-tool-friend-tips-v1';
function activeDayIndex(){const chips=$$('.daychip');const i=chips.findIndex(x=>x.classList.contains('active'));return i>=0?i:0}
function day(){return T.days[activeDayIndex()]}
function flat(d=day()){let gi=0;return d.zones.flatMap((z,zi)=>z.stops.map((s,si)=>({raw:s,time:s[0],name:s[1],type:s[2],priority:s[3],query:s[4],lat:s[5],lng:s[6],desc:s[8],gi:gi++,zi,si,zone:z.name})))}
function meta(d,name){return TX[d.date+'|'+name]||null}
function travelModeForMaps(m){const x=(m?.mode||'').toLowerCase();if(/drive|taxi/.test(x))return'driving';if(/train|subway|tram|bus|rail|yurikamome|randen|enoden|limited express|shinkansen/.test(x))return'transit';return'walking'}
function decorateToday(){const v=$('#todayView');if(!v||!v.classList.contains('active'))return;const d=day(),prof=DP[d.date],wrap=$('.wrap',v),summary=$('.summary',v);if(prof&&wrap&&summary&&!$('.transportCard',v)){
 const c=document.createElement('section');c.className='transportCard';c.innerHTML=`<div><small>HOW WE MOVE TODAY</small><b>${prof.label}</b><p>${prof.detail}</p></div>`;summary.insertAdjacentElement('afterend',c);
 }
 const ss=flat(d);
 $$('.stoprow',v).forEach(row=>{if(row.querySelector('.travelHint'))return;const s=ss[Number(row.dataset.stop)];if(!s)return;const m=meta(d,s.name);if(!m)return;const hint=document.createElement('span');hint.className='travelHint';hint.textContent=`${m.mode} · ${m.duration}`;const box=row.querySelector('.stoptext');box?.appendChild(hint);});
}
function decorateSheet(){const body=$('#sheetBody');const sheet=$('#sheet');if(!body||!sheet||!sheet.classList.contains('open'))return;const title=$('.sheetBody h2',body)?.textContent?.trim();if(!title)return;const d=day(),m=meta(d,title);if(m&&!$('.gettingHere',body)){
 const intel=$('.intel',body);if(intel){const r=document.createElement('div');r.className='intelRow gettingHere';r.innerHTML=`<b>Getting here</b><p><strong>${m.mode} · ${m.duration}</strong><br>${m.text}</p>`;intel.prepend(r)}
 const nav=$('.sheetButtons a',body);if(nav){try{const u=new URL(nav.href);u.searchParams.set('travelmode',travelModeForMaps(m));nav.href=u.toString()}catch{}}
 }
}
function decorateMapHeader(){const v=$('#mapView');if(!v||!v.classList.contains('active'))return;const d=day(),p=DP[d.date],h=$('.mapHeader',v);if(p&&h&&!$('.mapTransport',h)){const x=document.createElement('div');x.className='mapTransport';x.innerHTML=`<b>${p.label}</b><span>${p.detail}</span>`;h.appendChild(x)}}
function tips(){try{return JSON.parse(localStorage.getItem(TIPKEY)||'[]')}catch{return[]}}
function saveTips(x){localStorage.setItem(TIPKEY,JSON.stringify(x))}
function renderTips(){const v=$('#moreView');if(!v||!v.classList.contains('active'))return;if($('.friendTips',v))return;const groups=$$('.moreGroup',v);const host=document.createElement('section');host.className='moreGroup friendTips';host.innerHTML=`<h2>Friend tips inbox</h2><div class="tipComposer"><input id="tipInput" placeholder="Paste a place or suggestion"><button id="tipAdd">Add</button></div><p class="tipNote">Saved only on this device. Send me the good ones and I can properly place them into the route.</p><div id="tipList"></div>`;(groups[0]||v).insertAdjacentElement(groups[0]?'beforebegin':'beforeend',host);
 const redraw=()=>{const list=$('#tipList',host),arr=tips();list.innerHTML=arr.length?arr.map((x,i)=>`<div class="tipItem"><span>${String(x).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</span><button data-del="${i}">×</button></div>`).join(''):'<div class="tipEmpty">No saved tips yet.</div>';$$('[data-del]',list).forEach(b=>b.onclick=()=>{const a=tips();a.splice(+b.dataset.del,1);saveTips(a);redraw()})};
 $('#tipAdd',host).onclick=()=>{const inp=$('#tipInput',host),v=inp.value.trim();if(!v)return;const a=tips();a.unshift(v);saveTips(a.slice(0,50));inp.value='';redraw()};$('#tipInput',host).addEventListener('keydown',e=>{if(e.key==='Enter')$('#tipAdd',host).click()});redraw();
}
function run(){decorateToday();decorateSheet();decorateMapHeader();renderTips()}
const mo=new MutationObserver(()=>requestAnimationFrame(run));mo.observe(document.body,{subtree:true,childList:true,classList:true,attributes:true,attributeFilter:['class']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();