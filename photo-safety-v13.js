(function(){
'use strict';
const utility=/\b(airport|station|train|shinkansen|drive|transit|fuel|rental|bag|bags|luggage|check in|check-in|reset|leave apartment|return car|bus uphill|bus downhill|taxi to|transfer|move|sleep|boat reception)\b/i;
let seen={stop:new Map(),area:new Map()};
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function group(el){if(el.classList.contains('stopimg'))return'stop';if(el.classList.contains('areaimg')||el.closest('.areamini'))return'area';return null}
function neutral(el,badge){if(!el)return;el.style.backgroundImage='';el.classList.remove('loading');el.classList.add('no-photo');el.dataset.badge=badge||'PHOTO UNAVAILABLE'}
function process(el){if(!(el instanceof HTMLElement)||!el.classList.contains('imgbox'))return;const label=el.dataset.label||'';if(utility.test(label)){neutral(el,'TRIP STEP');return}if(el.classList.contains('no-photo')){if(!el.dataset.badge)el.dataset.badge='PHOTO UNAVAILABLE';return}const bg=el.style.backgroundImage||'';if(!bg||bg==='none')return;const m=bg.match(/url\(["']?(.*?)["']?\)/);if(!m)return;const url=m[1],g=group(el);if(!g)return;const n=norm(label);const first=seen[g].get(url);if(first&&first!==n){neutral(el,'PHOTO UNAVAILABLE');return}seen[g].set(url,n)}
function scan(){document.querySelectorAll('.imgbox').forEach(process)}
const obs=new MutationObserver(ms=>{for(const m of ms){if(m.type==='attributes')process(m.target);m.addedNodes&&m.addedNodes.forEach(n=>{if(n.nodeType===1){process(n);n.querySelectorAll&&n.querySelectorAll('.imgbox').forEach(process)}})}});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.daybtn'))seen={stop:new Map(),area:new Map()}});
document.addEventListener('DOMContentLoaded',()=>{scan();obs.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class','data-label']});setTimeout(scan,500);setTimeout(scan,1600)});
})();