(function(){
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
T.version='2.1-final';T.audited='2026-09-14';
T.lodgings.BEP.name='Beppu Airbnb · Sara';
const day=d=>T.days.find(x=>x.date===d);
const zone=(d,re)=>{const x=day(d);return x&&x.zones.find(z=>re.test(z.name))};
const pushAlert=(d,k,t,x)=>{const a=day(d);if(a){a.alerts=a.alerts||[];if(!a.alerts.some(v=>v.t===t))a.alerts.push({k,t,x})}};
const insertAfter=(arr,needle,item)=>{const i=arr.findIndex(x=>String(x[1]).includes(needle));if(i>=0&&!arr.some(x=>x[1]===item[1]))arr.splice(i+1,0,item)};
// Nagasaki: preserve the expanded-draft extras without pretending they are mandatory.
pushAlert('2026-09-22','info','Expanded Nagasaki extras remembered','Shofukuji exterior and Kameyama Shachu were considered in the max-route versions. They remain first-cut flex stops; the memorial core, Dejima, Glover, sunset and Inasa stay protected.');
// Kyushu road-trip audit: preserve every meaningful beauty stop from earlier variants.
pushAlert('2026-09-24','info','Road-trip beauty hierarchy','Protected scenic sequence: Yamanami Highway → Chojabaru/Tadewara → Makinoto → Kurokawa → Daikanbo → Milk Road → Komezuka → Aso Panorama Line → Kusasenri. Umi Jigoku and Kokonoe Bridge are optional branches, not anchors.');
pushAlert('2026-09-24','info','Oita city intentionally not separate','The route uses Beppu and the Kuju/Yamanami highlands in Oita Prefecture. A separate Oita City detour was intentionally dropped because it adds backtracking without beating the scenery already on-route.');
pushAlert('2026-09-25','info','Kunimigaoka remembered, weather-only','Kunimigaoka was in earlier variants for sea-of-clouds sunrise. Do it only if the forecast is exceptional and you can still make the fixed gorge/boat check-in comfortably; otherwise skip it.');
// Osaka: show that useful-but-bad-timing ideas were audited, not forgotten.
pushAlert('2026-09-27','info','Osaka cuts are deliberate','Kuromon Market and Doguyasuji are not in the pre-Kyoto morning because their useful opening windows are too late. Umeda/Osaka Castle are also intentionally cut: Himeji is the real castle day and Kyoto daylight is more valuable.');
// Kyoto west: restore optional temples discussed in older plans.
const west=zone('2026-09-27',/Kinkaku/);if(west){
 insertAfter(west.stops,'Ryoan-ji',['ALT','Ninna-ji · optional westward branch','TEMPLE','FLEX','Ninna-ji, Kyoto, Japan',35.0310,135.7138,'Ninna-ji','UNESCO imperial temple and five-story pagoda. Add only if transport is smooth; it continues west toward Arashiyama but is expendable.']);
 insertAfter(west.stops,'Okochi Sanso',['ALT','Jojakko-ji · choose instead of Okochi','TEMPLE','FLEX','Jojakko-ji, Kyoto, Japan',35.0197,135.6684,'Jōjakkō-ji','Quiet forest hillside temple north of the bamboo grove. Choose this OR Okochi when the clock allows, not both by default.']);
 insertAfter(west.stops,'Jojakko-ji',['ALT','Nison-in · northern Sagano flex','TEMPLE','FLEX','Nison-in, Kyoto, Japan',35.0218,135.6665,'Nison-in','Broad approach and quieter temple atmosphere. Pair with Jojakko only if you intentionally spend the flex budget in northern Sagano.']);
}
const gion=zone('2026-09-27',/Yasaka/);if(gion){
 insertAfter(gion.stops,'Hanamikoji',['ALT','Yasui Konpiragu Shrine · if energy is high','SHRINE','FLEX','Yasui Konpiragu Shrine, Kyoto, Japan',35.0002,135.7770,'Yasui Konpiragu Shrine','Compact shrine known for the sever-bad-ties / form-good-ties stone. Easy add south of Gion if the night is flowing.']);
}
// Kyoto east: restore Shoren-in from earlier east-Kyoto variants.
const east=zone('2026-09-28',/Nanzen/);if(east&&!east.stops.some(x=>String(x[1]).includes('Shoren-in'))){east.stops.unshift(['08:40','Shoren-in · optional','TEMPLE','FLEX','Shoren-in Temple, Kyoto, Japan',35.0067,135.7839,'Shōren-in','Elegant imperial temple/garden between Gion and Nanzen-ji. Use only if entry is immediate; Nanzen/Ginkaku remain protected.']);}
// Explicit master-route exclusions so old variants never creep back in.
T.sourceNotes=T.sourceNotes||[];
['Kunimigaoka is weather-only, not a default boat-day stop.','Ninna-ji / Jojakko-ji / Nison-in are Kyoto flex options, not additions to force all at once.','Kuromon / Doguyasuji are remembered but intentionally excluded from the early Sep 27 Osaka window because of opening times.','The final overnight chain is Nagasaki → Beppu → Takachiho → Osaka → Kyoto → Tokyo.'].forEach(n=>{if(!T.sourceNotes.includes(n))T.sourceNotes.push(n)});
})();