(function(){'use strict';const T=window.JAPAN_TRIP,P=window.JAPAN_PHOTOS;if(!T||!P)return;const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));const OFFICIAL={
'2026-09-22':[['Atomic Bomb Museum','https://nabmuseum.jp/'],['Glover Garden','https://glover-garden.jp/'],['Nagasaki Ropeway','https://www.at-nagasaki.jp/spot/168']],
'2026-09-24':[['JMA volcano status','https://www.jma.go.jp/bosai/map.html#contents=volcano'],['Aso access','https://www.aso-volcano.jp/eng/']],
'2026-09-25':[['Takachiho Gorge','https://www.takachiho-kanko.info/sightseeing/18/'],['Takachiho notices','https://www.takachiho-kanko.info/news/']],
'2026-09-26':[['Himeji Castle','https://www.himejicastle.jp/en/']],
'2026-09-29':[['teamLab Kyoto','https://www.teamlab.art/e/kyoto/']],
'2026-09-30':[['teamLab Planets','https://teamlabplanets.dmm.com/en']],
'2026-10-01':[['Tobu Nikko','https://www.tobu.co.jp/en/']],
'2026-10-02':[['teamLab Borderless','https://www.teamlab.art/e/tokyo/']],
'2026-10-03':[['Shibuya Sky','https://www.shibuya-scramble-square.com/sky/ticket/']],
'2026-10-04':[['Tokyo Skytree','https://www.tokyo-skytree.jp/en/']]
};
function activeDay(){const b=$('.day-chip.active');if(!b)return T.days[0];return T.days.find(d=>(b.textContent||'').startsWith(d.label))||T.days[0]}
function wmKey(d){return P.keyFor(d.city,d.date)}
function fixHeroCredit(){const d=activeDay(),a=$('.hero-credit');if(!a)return;const k=wmKey(d),inf=P.info(k);a.href=P.source(k);a.textContent='Photo: '+inf.credit+' · '+inf.license}
function labelAreaPhotos(){const n=$('.now-photo');if(n&&!n.querySelector('.visual-tag'))n.insertAdjacentHTML('beforeend','<span class="visual-tag">AREA PHOTO</span>');const x=$('.next-thumb');if(x&&!x.querySelector('.visual-tag'))x.insertAdjacentHTML('beforeend','<span class="visual-tag">NEXT AREA</span>')}
function addOfficial(){const d=activeDay(),wrap=$('.live-wrap');if(!wrap)return;wrap.querySelector('.official-row')?.remove();const links=OFFICIAL[d.date]||[];if(!links.length)return;const row=document.createElement('div');row.className='official-row';row.innerHTML=links.map(([n,u])=>'<a class="official-link" target="_blank" rel="noopener" href="'+u+'">Official · '+n+' ↗</a>').join('');wrap.appendChild(row)}
function checkBackgrounds(){const els=$$('.hero-media,.now-photo,.next-thumb,.flow-thumb,.trip-day,.sheet-hero');els.forEach(el=>{if(el.dataset.bgcheck)return;el.dataset.bgcheck='1';const bg=getComputedStyle(el).backgroundImage,m=bg.match(/url\(["']?([^"')]+)/);if(!m)return;const im=new Image();im.onload=()=>{};im.onerror=()=>el.classList.add('photo-failed');im.src=m[1]})}
function bindSwipe(){const c=$('.now-card');if(!c||c.dataset.swipe)return;c.dataset.swipe='1';let x=0;c.addEventListener('touchstart',e=>{x=e.touches[0].clientX;c.classList.add('swiping')},{passive:true});c.addEventListener('touchend',e=>{c.classList.remove('swiping');const dx=e.changedTouches[0].clientX-x;if(Math.abs(dx)<65)return;(dx<0?$('.next'):$('.prev'))?.click()},{passive:true});if(!c.querySelector('.swipe-hint'))c.insertAdjacentHTML('beforeend','<div class="swipe-hint">SWIPE CARD FOR PREVIOUS / NEXT</div>')}
function enhance(){fixHeroCredit();labelAreaPhotos();addOfficial();checkBackgrounds();bindSwipe()}
const obs=new MutationObserver(()=>{clearTimeout(window.__polish);window.__polish=setTimeout(enhance,25)});document.addEventListener('DOMContentLoaded',()=>{enhance();obs.observe(document.body,{childList:true,subtree:true});document.addEventListener('keydown',e=>{if($('#liveView')?.classList.contains('active')){if(e.key==='ArrowRight')$('.next')?.click();if(e.key==='ArrowLeft')$('.prev')?.click()}})});})();