(()=>{
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;

// Prevent null/blank coordinates from becoming 0,0 in JavaScript number coercion.
T.days.forEach(day=>day.zones.forEach(zone=>zone.stops.forEach(stop=>{
  const lat=stop[5],lng=stop[6];
  const valid=lat!==null&&lat!==undefined&&lat!==''&&lng!==null&&lng!==undefined&&lng!==''&&Number.isFinite(Number(lat))&&Number.isFinite(Number(lng));
  if(!valid){stop[5]=undefined;stop[6]=undefined;}
})));

let miniMap=null;
function findStopByName(name){
  for(const day of T.days){
    for(const zone of day.zones){
      for(const stop of zone.stops){
        if(stop[1]===name){
          const lat=stop[5],lng=stop[6];
          if(lat!==undefined&&lng!==undefined&&Number.isFinite(Number(lat))&&Number.isFinite(Number(lng)))return{stop,lat:Number(lat),lng:Number(lng)};
        }
      }
    }
  }
  return null;
}
function cleanRogueMaps(body){
  body.querySelectorAll('.leaflet-container').forEach(el=>{
    if(!el.classList.contains('detailMiniMap')){
      el.classList.add('rogueSheetMap');
      el.style.display='none';
    }
  });
}
function enhanceSheet(){
  const body=document.querySelector('#sheetBody');
  const sheet=document.querySelector('#sheet');
  if(!body||!sheet)return;
  cleanRogueMaps(body);
  const title=body.querySelector('.sheetBody h2')?.textContent?.trim();
  if(!title||body.querySelector('.detailMapTools'))return;
  const match=findStopByName(title);
  if(!match)return;
  const anchor=body.querySelector('.sheetButtons')||body.querySelector('.sheetBody p');
  if(!anchor)return;
  const wrap=document.createElement('div');
  wrap.className='detailMapTools';
  wrap.innerHTML=`<button type="button" class="detailMapToggle" aria-expanded="false">Show map</button><a class="detailMapExternal" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.lat+','+match.lng)}">Open in Maps ↗</a><div class="detailMiniMap" hidden></div>`;
  anchor.insertAdjacentElement('afterend',wrap);
  const btn=wrap.querySelector('.detailMapToggle');
  const box=wrap.querySelector('.detailMiniMap');
  btn.addEventListener('click',()=>{
    const opening=box.hidden;
    box.hidden=!opening;
    btn.textContent=opening?'Hide map':'Show map';
    btn.setAttribute('aria-expanded',String(opening));
    if(opening){
      if(miniMap){try{miniMap.remove()}catch{} miniMap=null;}
      if(window.L){
        miniMap=L.map(box,{zoomControl:true,attributionControl:true,scrollWheelZoom:false}).setView([match.lat,match.lng],15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(miniMap);
        L.marker([match.lat,match.lng]).addTo(miniMap);
        requestAnimationFrame(()=>miniMap?.invalidateSize());
      }else{
        box.innerHTML='<div class="detailMapFallback">Map preview unavailable. Use Open in Maps.</div>';
      }
    }else if(miniMap){try{miniMap.remove()}catch{} miniMap=null;}
  });
}
function watch(){
  const body=document.querySelector('#sheetBody');
  if(!body)return;
  new MutationObserver(()=>requestAnimationFrame(enhanceSheet)).observe(body,{childList:true,subtree:true});
  enhanceSheet();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch,{once:true});else watch();
})();
