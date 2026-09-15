(function(){
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const norm=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[’'·/→–—&()+.]/g,' ').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
const stopLookup=new Map(),zoneLookup=new Map();
T.days.forEach((d,di)=>d.zones.forEach((z,zi)=>{zoneLookup.set(d.date+'|'+norm(z.name),{d,z,di,zi});z.stops.forEach((a,si)=>{const o={time:a[0],name:a[1],type:a[2],priority:a[3],query:a[4],lat:a[5],lng:a[6],wiki:a[7],desc:a[8],d,z,di,zi,si};stopLookup.set(d.date+'|'+norm(o.name),o)})}));
function activeDay(){const active=$$('.day-chip').findIndex(x=>x.classList.contains('active'));return T.days[Math.max(0,active)]||T.days[0]}
function findStop(name,d){if(!name)return null;const day=d||activeDay(),exact=stopLookup.get(day.date+'|'+norm(name));if(exact)return exact;let best=null,score=0;day.zones.forEach((z,zi)=>z.stops.forEach((a,si)=>{const n=norm(a[1]),q=norm(name);let s=n===q?100:(n.includes(q)||q.includes(n)?Math.min(n.length,q.length):0);if(s>score){score=s;best={time:a[0],name:a[1],type:a[2],priority:a[3],query:a[4],lat:a[5],lng:a[6],wiki:a[7],desc:a[8],d:day,z,zi,si}}}));return score>=5?best:null}
function mode(s){return /DRIVE|ARRIVAL|LOGISTICS/.test(s.type)?'driving':/TRAIN|MOVE/.test(s.type)?'transit':'walking'}
function dir(s){if(!s||!s.query)return'';return'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(s.query)+'&travelmode='+mode(s)}
function pin(s){if(!s||!s.query)return'';return'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.query)}
function route(z){const ss=z.stops.map(a=>({name:a[1],type:a[2],query:a[4]})).filter(s=>s.query);if(ss.length<2)return'';const m=ss.some(s=>/DRIVE|ARRIVAL|LOGISTICS/.test(s.type))?'driving':ss.some(s=>/TRAIN|MOVE/.test(s.type))?'transit':'walking';const wp=ss.slice(1,-1).slice(0,8).map(s=>s.query).join('|');return'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(ss[0].query)+'&destination='+encodeURIComponent(ss[ss.length-1].query)+(wp?'&waypoints='+encodeURIComponent(wp):'')+'&travelmode='+m}
function fixMaps(){const d=activeDay();
 $$('.flow-stop').forEach(el=>{const s=findStop(el.querySelector('h3')?.textContent,d);if(!s)return;el.querySelectorAll('a[href*="google.com/maps"]').forEach(a=>{a.href=/pin/i.test(a.textContent)?pin(s):dir(s)})});
 const contexts=[['.now-card','h2'],['.next-card','h3'],['.map-sheet-card','b'],['.sheet-body','h2']];
 contexts.forEach(([sel,titleSel])=>{$$(sel).forEach(el=>{const s=findStop(el.querySelector(titleSel)?.textContent,d);if(!s)return;el.querySelectorAll('a[href*="google.com/maps"]').forEach(a=>{a.href=/open pin/i.test(a.textContent)?pin(s):dir(s)})})});
 $$('.flow-zone').forEach(el=>{const name=el.querySelector('.flow-zone-head h2')?.textContent,z=zoneLookup.get(d.date+'|'+norm(name))?.z,u=z&&route(z);const a=el.querySelector('.flow-zone-route[href]');if(a&&u)a.href=u});
}
const photoPromises=new Map();
function wikiImage(title){if(!title)return Promise.resolve(null);if(photoPromises.has(title))return photoPromises.get(title);const p=fetch('https://en.wikipedia.org/w/api.php?action=query&redirects=1&titles='+encodeURIComponent(title)+'&prop=pageimages&piprop=thumbnail&pithumbsize=1000&format=json&origin=*').then(r=>r.json()).then(j=>{const pages=j.query&&j.query.pages?Object.values(j.query.pages):[],pg=pages[0];return pg&&pg.thumbnail?pg.thumbnail.source:null}).catch(()=>null);photoPromises.set(title,p);return p}
function blank(el,label){if(!el)return;el.style.backgroundImage='';el.classList.add('audit-photo-fallback');el.dataset.auditLabel=label||'Place photo unavailable'}
function setExact(el,s,used){if(!el||!s)return;blank(el,s.name);if(!s.wiki||/HOME|MOVE|TRAIN|DRIVE|LOGISTICS|BUFFER|SLEEP|ARRIVAL/.test(s.type))return;wikiImage(s.wiki).then(url=>{if(!url||used.has(url))return;used.add(url);el.classList.remove('audit-photo-fallback');el.style.backgroundImage='url("'+url.replace(/"/g,'%22')+'")'})}
function fixPhotos(){const d=activeDay(),used=new Set();
 $$('.flow-stop').forEach(el=>{const s=findStop(el.querySelector('h3')?.textContent,d);setExact(el.querySelector('.flow-thumb'),s,used)});
 $$('.now-card').forEach(el=>{const s=findStop(el.querySelector('h2')?.textContent,d);setExact(el.querySelector('.now-photo'),s,used)});
 $$('.next-card').forEach(el=>{const s=findStop(el.querySelector('h3')?.textContent,d);setExact(el.querySelector('.next-thumb'),s,used)});
 $$('.sheet-body').forEach(el=>{const s=findStop(el.querySelector('h2')?.textContent,d);setExact(document.querySelector('.sheet-hero'),s,new Set())});
}
let scheduled=false;function audit(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;fixMaps();fixPhotos()})}
const obs=new MutationObserver(audit);
document.addEventListener('DOMContentLoaded',()=>{audit();obs.observe(document.body,{subtree:true,childList:true});document.addEventListener('click',e=>{if(e.target.closest('.day-chip,.dockbtn,.zone-pill,.flow-stop,.stepbtn,.action'))setTimeout(audit,40)},true)});
})();