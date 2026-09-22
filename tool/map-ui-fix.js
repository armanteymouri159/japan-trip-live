(()=>{
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;

// Sanitize coordinates once so blank/null values never become 0,0 and blow the map out to the whole world.
T.days.forEach(day=>day.zones.forEach(zone=>zone.stops.forEach(stop=>{
  const lat=stop[5],lng=stop[6];
  const valid=lat!==null&&lat!==undefined&&lat!==''&&lng!==null&&lng!==undefined&&lng!==''&&Number.isFinite(Number(lat))&&Number.isFinite(Number(lng));
  if(!valid){stop[5]=undefined;stop[6]=undefined;}
})));

// Stop detail sheets should never contain an embedded Leaflet map.
// The main Map screen owns the map; details stay readable and lightweight.
function stripSheetMaps(){
  const sheet=document.querySelector('#sheet');
  if(!sheet)return;
  sheet.querySelectorAll('.leaflet-container,.detailMiniMap,.detailMapTools').forEach(el=>el.remove());
}
function watch(){
  const body=document.querySelector('#sheetBody');
  if(!body)return;
  new MutationObserver(()=>requestAnimationFrame(stripSheetMaps)).observe(body,{childList:true,subtree:true});
  stripSheetMaps();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch,{once:true});else watch();
})();