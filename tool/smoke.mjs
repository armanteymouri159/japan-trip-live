import fs from 'node:fs';
import {JSDOM, VirtualConsole} from 'jsdom';

const html=`<!doctype html><html><body>
<header><button id="backBtn"></button><button id="brandBtn"></button><button id="searchBtn"></button><div id="dayRail"></div></header>
<main><section id="todayView" class="view"></section><section id="mapView" class="view"></section><section id="tripView" class="view"></section><section id="moreView" class="view"></section><section id="liveView" class="view"></section></main>
<nav id="tabbar"><button class="tab" data-view="today"></button><button class="tab" data-view="map"></button><button class="tab" data-view="trip"></button><button class="tab" data-view="more"></button></nav>
<div id="scrim"></div><aside id="sheet"><button id="sheetBack"></button><button id="sheetClose"></button><div id="sheetBody"></div></aside>
<div id="searchLayer"><input id="searchInput"><button id="searchClose"></button><div id="searchResults"></div></div><div id="toast"></div>
</body></html>`;
const errors=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e));vc.on('error',e=>errors.push(e));
const dom=new JSDOM(html,{url:'https://example.com/tool/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
const w=dom.window;
w.fetch=async()=>({ok:false,json:async()=>({})});
w.open=()=>null;
w.requestAnimationFrame=cb=>{cb();return 1};
w.cancelAnimationFrame=()=>{};
w.HTMLElement.prototype.scrollIntoView=function(){};
w.scrollTo=()=>{};
w.Image=class{set src(v){queueMicrotask(()=>this.onerror?.())}};

for(const file of ['v2/data.js','canonical.js','final/enrich.js','tool/details.js','tool/app2.js']){
  w.eval(fs.readFileSync(file,'utf8'));
}
const $=s=>w.document.querySelector(s), $$=s=>[...w.document.querySelectorAll(s)];
const assert=(cond,msg)=>{if(!cond)throw new Error(msg)};
const tick=()=>new Promise(r=>setTimeout(r,0));

assert($('#dayRail').children.length===14,'day rail should contain 14 days');
assert($('#todayView').textContent.includes('Nagasaki'),'initial day should render Nagasaki');

const sep23=$$('.daychip').find(x=>x.dataset.i==='1');assert(sep23,'Sep 23 chip missing');sep23.click();await tick();
assert($('#todayView').textContent.includes('Itoshima'),'Sep 23 must include Itoshima');
assert($('#todayView').textContent.includes('Sakurai Futamigaura'),'Futamigaura stop missing');
assert($('#todayView').textContent.includes('Shiraito Falls'),'Shiraito stop missing');
assert(!$('#todayView').textContent.toLowerCase().includes('rowboat'),'Sep 23 should not contain Takachiho rowboat content');

const futa=$$('[data-stop]').find(x=>x.textContent.includes('Sakurai Futamigaura'));assert(futa,'Futamigaura route row missing');futa.click();await tick();
assert($('#sheet').classList.contains('open'),'stop sheet did not open');
for(const label of ['Do / see','Photo','Practical','Flow'])assert($('#sheetBody').textContent.includes(label),`detail section missing: ${label}`);
assert($('#sheetBody').textContent.includes('Meoto Iwa'),'deep Itoshima detail missing');

$('#sheetClose').click();await tick();
$('#startDay').click();await tick();assert($('#liveView').textContent.includes('Wake / check out Nagasaki'),'live mode did not start at first stop');
$('#nextStop').click();await tick();assert($('#liveView').textContent.includes('KAMOME'),'live Next did not advance');
$('#liveBack').click();await tick();assert($('#todayView').classList.contains('active'),'live Back did not return to Today');

const mapTab=$$('.tab').find(x=>x.dataset.view==='map');mapTab.click();await tick();assert($('#mapView').classList.contains('active'),'Map tab failed');assert($('#leafletMap'),'Map container missing');
const tripTab=$$('.tab').find(x=>x.dataset.view==='trip');tripTab.click();await tick();assert($$('.daycard').length===14,'Trip view should have 14 day cards');

$('#searchBtn').click();$('#searchInput').value='Kinkaku';$('#searchInput').dispatchEvent(new w.Event('input',{bubbles:true}));await tick();assert($('#searchResults').textContent.includes('Kinkaku-ji'),'Search failed to find Kinkaku');

// Audit corrected Takachiho day in data, independent of current selected view.
const d25=w.JAPAN_TRIP.days.find(x=>x.date==='2026-09-25');assert(d25,'Sep 25 missing');const d25text=JSON.stringify(d25).toLowerCase();assert(!d25text.includes('rowboat'),'Sep 25 still contains rowboat');assert(d25text.includes('manai falls'),'Sep 25 Manai Falls missing');assert(d25text.includes('kushifuru'),'Sep 25 Kushifuru missing');

if(errors.length)throw errors[0];
console.log('PASS: Japan trip tool smoke audit');