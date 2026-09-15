(function(){
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
T.version='2.2-final-audited';T.audited='2026-09-14';
T.lodgings.NAG={name:'Nagasaki Airbnb',address:'7-18 Gotōmachi 菱工ビル 4F 5F, Nagasaki, Nagasaki 850-0036, Japan'};
T.lodgings.BEP={name:'Beppu Airbnb · Sara',address:'3-2-15 Kitahama, Beppu, Oita 874-0920, Japan'};
T.lodgings.TAK={name:'Takachiho Airbnb',address:'5899-2 Mitai, Takachiho, Nishiusuki District, Miyazaki 882-1101, Japan'};
T.lodgings.OSA={name:'Osaka Airbnb',address:'2 Chome-4-15 Shimanouchi, Chūō-ku, Ōsaka-shi, Ōsaka-fu 542-0082, Japan'};
T.lodgings.KYO={name:'Kyoto Airbnb',address:'340 Shimoatarashichō, Higashiyama-ku, Kyōto-shi, Kyōto-fu 605-0914, Japan'};
T.lodgings.TYO={name:'Tokyo Airbnb',address:'4-chōme-11-17 Kitashinjuku 北新宿四丁目旅館, Shinjuku City, Tokyo Prefecture 169-0074, Japan'};
const day=d=>T.days.find(x=>x.date===d);
const zone=(d,re)=>{const x=day(d);return x&&x.zones.find(z=>re.test(z.name))};
const pushAlert=(d,k,t,x)=>{const a=day(d);if(a){a.alerts=a.alerts||[];if(!a.alerts.some(v=>v.t===t))a.alerts.push({k,t,x})}};
const insertAfter=(arr,needle,item)=>{const i=arr.findIndex(x=>String(x[1]).includes(needle));if(i>=0&&!arr.some(x=>x[1]===item[1]))arr.splice(i+1,0,item)};
const addSource=n=>{T.sourceNotes=T.sourceNotes||[];if(!T.sourceNotes.includes(n))T.sourceNotes.push(n)};

// FINAL OVERNIGHT CHAIN. Older Takamori/Minamiaso variants are history only.
addSource('Final booked overnight chain: Nagasaki Sep 22 → Beppu Sep 23 → Takachiho Sep 24 → Osaka Sep 25-26 → Kyoto Sep 27-28 → Tokyo Sep 29-Oct 4.');
addSource('Sep 23 final route excludes Itoshima and any Fukuoka overnight. Friend pickup is around 2 PM, then the car goes east to Yufuin and Beppu.');
addSource('Sep 25 Himeji is not forced. Himeji interior is protected on Sep 26.');
addSource('Hiroshima/Miyajima, Onomichi/Kurashiki, Ine/Amanohashidate, Hakone/Fuji, Oita City and Kumamoto City are intentionally excluded from the locked final route.');

// NAGASAKI — preserve expanded-version flex items without degrading the day.
pushAlert('2026-09-22','info','Nagasaki flex stops remembered','Shofukuji exterior and Kameyama Shachu appeared in max-route drafts. They remain first-cut flex stops; the memorial core, Dejima, Glover, sunset and Inasa stay protected.');
const ryoma=zone('2026-09-22',/Ryoma/i);if(ryoma){
 insertAfter(ryoma.stops,'Wakamiya Inari',['ALT','Kameyama Shachu Memorial Museum · if open/ahead','HISTORY','FLEX','Kameyama Shachu Memorial Museum, Nagasaki, Japan',32.7499,129.8865,'Kameyama Shachu Memorial Museum','Tiny Ryoma-history museum on the downhill line. Add only if it is immediately open and you are ahead.']);
}

// KYUSHU — the road itself is a protected attraction.
pushAlert('2026-09-24','warning','Aso crater CURRENTLY restricted','Official Aso status on Sep 14: Alert Level 2; roughly 1 km around Nakadake crater is off-limits. Mountain-square access is possible, but crater viewing is not. Recheck 48–72 hours before driving.');
pushAlert('2026-09-24','info','Road-trip beauty hierarchy','Protected sequence: Yamanami Highway → Chojabaru/Tadewara → Makinoto → Kurokawa → Daikanbo → Milk Road → Komezuka → Aso Panorama Line → Kusasenri. Umi Jigoku and Kokonoe Bridge are optional branches, not anchors.');
pushAlert('2026-09-24','info','Kokonoe timing corrected','Official Sep–Oct opening starts at 08:30. Do not schedule it before opening. It is the first major detour to cut if the day slips.');
pushAlert('2026-09-24','info','Oita City deliberately excluded','Beppu + the Kuju/Yamanami highlands outperform a separate Oita City detour and avoid backtracking.');
pushAlert('2026-09-25','book','Takachiho boat rule','Official booking is online from 2 weeks before until 2 days before at 9 AM. Sep 25 is listed at ¥5,100/boat. Operation status is updated around 8 AM and can be suspended for river/weather/earthquake safety.');
pushAlert('2026-09-25','info','Kunimigaoka remembered, weather-only','Earlier variants used Kunimigaoka for sea-of-clouds sunrise. Do it only if the forecast is exceptional AND you can still make the gorge/boat check-in comfortably.');

// OSAKA — deliberate cuts and the useful Minami layer.
pushAlert('2026-09-27','info','Osaka cuts are deliberate','Kuromon Market and Doguyasuji are not forced into the pre-Kyoto dawn because their useful opening windows are too late. Umeda/Osaka Castle are also intentionally cut: Himeji is the real castle day and Kyoto daylight is more valuable.');

// KYOTO WEST — preserve optional temple branches from previous master variants.
const west=zone('2026-09-27',/Kinkaku|Arashiyama/i);if(west){
 insertAfter(west.stops,'Ryoan-ji',['ALT','Ninna-ji · optional westward branch','TEMPLE','FLEX','Ninna-ji, Kyoto, Japan',35.0310,135.7138,'Ninna-ji','UNESCO imperial temple and pagoda. Add only if transport is clean; it continues west toward Arashiyama but is expendable.']);
 insertAfter(west.stops,'Okochi Sanso',['ALT','Jojakko-ji · choose instead of Okochi','TEMPLE','FLEX','Jojakko-ji, Kyoto, Japan',35.0197,135.6684,'Jōjakkō-ji','Quiet forest hillside temple north of the bamboo grove. Choose this OR Okochi by default, not both.']);
 insertAfter(west.stops,'Jojakko-ji',['ALT','Nison-in · northern Sagano flex','TEMPLE','FLEX','Nison-in, Kyoto, Japan',35.0218,135.6665,'Nison-in','Broad approach and quieter temple atmosphere. Pair with Jojakko only if you intentionally spend the flex budget in northern Sagano.']);
}
const gion=zone('2026-09-27',/Yasaka|Gion/i);if(gion){
 insertAfter(gion.stops,'Hanamikoji',['ALT','Yasui Konpiragu Shrine · if energy is high','SHRINE','FLEX','Yasui Konpiragu Shrine, Kyoto, Japan',35.0002,135.7770,'Yasui Konpiragu Shrine','Compact shrine south of Gion, known for the sever-bad-ties / form-good-ties stone.']);
}

// KYOTO EAST — map warning and optional Shoren-in/Eikan-do branch.
pushAlert('2026-09-28','warning','Kiyomizu Google Maps warning','Kiyomizu-dera itself warns that some map apps can route visitors to paths that do not enter the temple. Use the Nio-mon / Kiyomizu-zaka approach or the Chawan-zaka emergency-road entrance.');
const east=zone('2026-09-28',/Nanzen|Philosopher/i);if(east){
 if(!east.stops.some(x=>String(x[1]).includes('Shoren-in')))east.stops.unshift(['08:40','Shoren-in · optional','TEMPLE','FLEX','Shoren-in Temple, Kyoto, Japan',35.0067,135.7839,'Shōren-in','Elegant imperial temple/garden between Gion and Nanzen-ji. Add only if entry is immediate; Nanzen/Ginkaku stay protected.']);
 insertAfter(east.stops,'Nanzen-ji',['ALT','Eikan-do · optional','TEMPLE','FLEX','Eikan-do Temple, Kyoto, Japan',35.0144,135.7956,'Eikan-dō Zenrin-ji','Excellent temple/garden directly north of Nanzen. Late September is not peak foliage, so add only if clearly ahead.']);
}

// HIMEJI — current official hours.
pushAlert('2026-09-26','info','Himeji official hours','Current official 2026 hours are 09:00–17:00 with entry until 16:00. Main Keep + Koko-en remain the protected core.');

// Prevent old route variants from creeping back in.
['Kunimigaoka is weather-only, not a default boat-day stop.','Ninna-ji / Jojakko-ji / Nison-in are Kyoto flex options, not additions to force all at once.','Kuromon / Doguyasuji are remembered but intentionally excluded from the early Sep 27 Osaka window because of opening times.','The final overnight chain is Nagasaki → Beppu → Takachiho → Osaka → Kyoto → Tokyo.'].forEach(addSource);
})();