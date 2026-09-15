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

for(const file of ['v2/data.js','canonical.js','tool/expansion.js','final/enrich.js','tool/details.js','tool/app2.js','tool/transport-ui.js']){
  w.eval(fs.readFileSync(file,'utf8'));
}
const $=s=>w.document.querySelector(s), $$=s=>[...w.document.querySelectorAll(s)];
const assert=(cond,msg)=>{if(!cond)throw new Error(msg)};
const tick=()=>new Promise(r=>setTimeout(r,0));
await tick();

assert($('#dayRail').children.length===14,'day rail should contain 14 days');
assert($('#todayView').textContent.includes('Nagasaki'),'initial day should render Nagasaki');
assert($('#todayView').textContent.includes('NO CAR'),'Nagasaki should clearly say NO CAR');
assert($('#todayView').textContent.includes('Airport bus'),'Nagasaki transport profile missing airport bus');

const sep23=$$('.daychip').find(x=>x.dataset.i==='1');assert(sep23,'Sep 23 chip missing');sep23.click();await tick();
assert($('#todayView').textContent.includes('Itoshima'),'Sep 23 must include Itoshima');
assert($('#todayView').textContent.includes('Sakurai Futamigaura'),'Futamigaura stop missing');
assert($('#todayView').textContent.includes('Shiraito Falls'),'Shiraito stop missing');
assert($('#todayView').textContent.includes('Drive'),'Sep 23 transfer hints should show car segments');

const futa=$$('[data-stop]').find(x=>x.textContent.includes('Sakurai Futamigaura'));assert(futa,'Futamigaura route row missing');futa.click();await tick();
assert($('#sheet').classList.contains('open'),'stop sheet did not open');
for(const label of ['Do / see','Photo','Practical','Flow','Getting here'])assert($('#sheetBody').textContent.includes(label),`detail section missing: ${label}`);
assert($('#sheetBody').textContent.includes('Meoto Iwa'),'deep Itoshima detail missing');

$('#sheetClose').click();await tick();
$('#startDay').click();await tick();assert($('#liveView').textContent.includes('Wake / check out Nagasaki'),'live mode did not start at first stop');
$('#nextStop').click();await tick();assert($('#liveView').textContent.includes('KAMOME'),'live Next did not advance');
$('#liveBack').click();await tick();assert($('#todayView').classList.contains('active'),'live Back did not return to Today');

// Deep city inventory assertions.
const names=date=>w.JAPAN_TRIP.days.find(x=>x.date===date).zones.flatMap(z=>z.stops.map(s=>s[1])).join(' | ');
const osaka=names('2026-09-26');for(const x of ['Himeji Castle Main Keep','Kobe beef · early meal','Osaka Castle Park + exterior','Namba Yasaka Shrine','Dotonbori canal loop','Amerikamura · Triangle Park'])assert(osaka.includes(x),`Sep26 missing ${x}`);
const kyoto=names('2026-09-28');for(const x of ['Kiyomizu-dera','Kodai-ji grounds / approach','Heian Shrine','Nanzen-ji','Honen-in','Ginkaku-ji','Nijo Castle'])assert(kyoto.includes(x),`Kyoto missing ${x}`);
const nikko=names('2026-10-01');for(const x of ['Kegon Falls','Lake Chuzenji shore','Toshogu · Yomeimon / Sleeping Cat / core','Taiyuin','Kanmangafuchi Abyss / Bake Jizo'])assert(nikko.includes(x),`Nikko missing ${x}`);
const kama=names('2026-10-02');for(const x of ['Tsurugaoka Hachimangu','Hasedera','Kotoku-in · Great Buddha','Yuigahama Beach','Inamuragasaki'])assert(kama.includes(x),`Kamakura missing ${x}`);
const tokyo=names('2026-10-04');for(const x of ['Senso-ji','Asakusa Shrine','Kappabashi Dougu Street','Ueno Toshogu','Yanaka Ginza','Nezu Shrine','Tokyo Skytree observation','Akihabara Electric Town'])assert(tokyo.includes(x),`Tokyo old-city day missing ${x}`);

const mapTab=$$('.tab').find(x=>x.dataset.view==='map');mapTab.click();await tick();assert($('#mapView').classList.contains('active'),'Map tab failed');assert($('#leafletMap'),'Map container missing');
const tripTab=$$('.tab').find(x=>x.dataset.view==='trip');tripTab.click();await tick();assert($$('.daycard').length===14,'Trip view should have 14 day cards');

$('#searchBtn').click();$('#searchInput').value='Nezu Shrine';$('#searchInput').dispatchEvent(new w.Event('input',{bubbles:true}));await tick();assert($('#searchResults').textContent.includes('Nezu Shrine'),'Search failed to find newly expanded Tokyo stop');

const d25=w.JAPAN_TRIP.days.find(x=>x.date==='2026-09-25');assert(d25,'Sep 25 missing');
const d25Stops=d25.zones.flatMap(z=>z.stops).map(s=>`${s[1]} ${s[8]||''}`).join(' ').toLowerCase();
assert(!/rowboat|boat reception/.test(d25Stops),'Sep 25 still schedules a rowboat/boat reception');
assert(d25Stops.includes('manai falls'),'Sep 25 Manai Falls missing');
assert(d25Stops.includes('kushifuru'),'Sep 25 Kushifuru missing');
assert(d25Stops.includes('dotonbori'),'Sep 25 Friday Dotonbori arrival nightlife missing');

if(errors.length)throw errors[0];
console.log('PASS: Japan trip tool expanded transport/city smoke audit');