(function(){
'use strict';
const TD=window.TRIP_DATA&&window.TRIP_DATA.DAYS, Z=window.EXPLORE_DATA&&window.EXPLORE_DATA.ZONES;
if(!TD||!Z)return;
const day=d=>TD.find(x=>x.date===d);
const stop=(date,needle,patch)=>{const d=day(date);if(!d)return;const x=d.stops.find(s=>s.name.includes(needle));if(x)Object.assign(x,patch)};
const findZone=(date,re)=>{const a=Z[date]||[];return a.find(z=>re.test(z.name))};
const pt=(name,lat,lng,note,type='bonus',minutes='5–15 min',extra={})=>({name,lat,lng,note,type,minutes,...extra});

// ---------- CANONICAL ITINERARY CORRECTIONS ----------
// Sep 23: final plan is NOT Itoshima and NOT a Fukuoka overnight.
const d23=day('2026-09-23');
if(d23){
 d23.city='NAGASAKI → FUKUOKA AIRPORT → YUFUIN → BEPPU';
 d23.title='Friend pickup, Yufuin daylight, Beppu steam.';
 d23.sleep='Beppu · Kannawa / Myoban';
 d23.mission='Leave Nagasaki around 7–8 AM, keep the Hakata window compact, meet the friend at Fukuoka Airport around 2 PM, collect the rental car and drive straight east. Yufuin daylight is protected; there is no Itoshima branch and no Fukuoka overnight.';
}

// Sep 24: bridge cannot start before 08:30. Crater is presently restricted at Level 2.
stop('2026-09-24','Kokonoe Yume Suspension Bridge',{time:'08:30',end:'09:00',desc:'OPTIONAL. Official Sep–Oct opening is 08:30–18:00. Cross only if you arrive at opening and the day is clean; it is the first major detour to cut.'});
stop('2026-09-24','Chojabaru · Tadewara',{time:'09:20',end:'09:45'});
stop('2026-09-24','Kusasenri · akaushi lunch',{desc:'Walk into the meadow and look back toward the volcanic peaks. Eat akaushi efficiently. As of Sep 14, 2026, Aso is at Alert Level 2 and the roughly 1 km crater-viewing zone is restricted, so the day is built around Kusasenri/Daikanbo, not crater access.'});
const d24=day('2026-09-24');
if(d24){d24.alerts=[
 {level:'warning',title:'Aso crater: CURRENTLY CLOSED',text:'Verified Sep 14: Alert Level 2. Mountain-square access has reopened, but the ~1 km crater zone remains restricted. Recheck 48–72 hours before driving; do not budget time for the crater.'},
 {level:'info',title:'Beppu morning decision',text:'Umi Jigoku opens at 08:00. Kokonoe Bridge opens at 08:30. Treat them as an either/or branch unless the road clock is exceptionally clean; protect Yamanami, Daikanbo and Kusasenri.'},
 {level:'info',title:'Scenic-road rule',text:'Keep Yamanami Highway → Milk Road → Aso Panorama Line in navigation. Do not let fastest-route logic shortcut the highland drive.'}
]}

// Sep 25 boat is the hard gate; Himeji belongs on Sep 26.
const d25=day('2026-09-25');
if(d25){d25.alerts=[
 {level:'book',title:'Takachiho boat · Sep 25',text:'Official Sep 25 calendar: ¥5,100/boat. Reservation window runs from 2 weeks before until 2 days before. Check operation the night before and again that morning; river/weather can suspend service.'},
 {level:'info',title:'Himeji is NOT today',text:'Protect Takachiho + Kamishikimi + safe rental return. Full Himeji interior is Saturday Sep 26.'}
]}

// Sep 27: make the Osaka dawn add realistic and preserve Kyoto.
const d27=day('2026-09-27');
if(d27){
 const rest=d27.stops.filter(s=>!['Namba Yasaka Shrine','Shinsekai · Tsutenkaku exterior'].includes(s.name));
 const move=rest.find(s=>s.name.includes('Osaka → Kyoto'));
 if(move){move.time='08:15';move.end='09:20';move.desc='Leave Minami by about 08:15. Transfer to Kyoto, drop bags quickly and keep the 10:15 Kinkaku target.'}
 d27.stops=[
  {time:'06:45',end:'07:10',name:'Namba Yasaka Shrine',lat:34.6623,lng:135.4968,priority:'HIGH',type:'SHRINE',desc:'Early-hours Osaka add that actually works: the giant lion-head stage opens early and is minutes from the Namba base.'},
  {time:'07:20',end:'07:45',name:'Shinsekai · Tsutenkaku exterior',lat:34.6525,lng:135.5063,priority:'FLEX',type:'NEIGHBORHOOD',desc:'Fast retro-street sweep while the district is quiet. Exterior streets only; shops/arcades wake later.'},
  ...rest
 ];
 d27.mission='Optional early Namba Yasaka + Shinsekai sweep, then leave Osaka on time. Kyoto remains the priority: northwest temples → Arashiyama → one cross-city move → Gion/Pontocho.';
}

// Sep 30: restore KITTE from the detailed master plan.
const z30=findZone('2026-09-30',/Ginza|Marunouchi|Yurakucho/i);
if(z30){
 z30.strategy='Walk Ginza → Marunouchi → Tokyo Station/KITTE → Yurakucho once. Architecture first, rail-arch food last.';
 z30.sequence=[
  pt('Ginza Chuo-dori',35.6716,139.7652,'Use flagship façades and street architecture; bounded shopping only.','high','20–30 min'),
  pt('Kabukiza exterior',35.6694,139.7679,'Classic theatre façade against modern Ginza; fast exterior stop.','photo','10 min'),
  pt('GINZA SIX',35.6696,139.7643,'Architecture / basement / rooftop only if it adds value; first Ginza cut.','bonus','15–30 min'),
  pt('Marunouchi Naka-dori',35.6800,139.7639,'Elegant pedestrian corridor toward Tokyo Station.','high','15–20 min'),
  pt('Tokyo Station Marunouchi façade',35.68124,139.76713,'Protect the red-brick façade and plaza view.','must','15–20 min'),
  pt('KITTE Marunouchi rooftop',35.6798,139.7658,'Elevated station/rail fan view from beside Tokyo Station; part of the original master route.','high','15–20 min'),
  pt('Tokyo International Forum',35.6769,139.7634,'Glass architecture on the natural walk south.','bonus','10 min'),
  pt('Yurakucho rail arches',35.6750,139.7630,'Finish under the tracks with izakaya/yakitori.','must','dinner')
 ];
}

// Ticket language: booked vs target must not be confused.
stop('2026-10-03','Shibuya Sky',{priority:'TARGET',desc:'Target ~16:15–16:30 for daylight → sunset → blue hour. Confirm/buy the timed ticket if not already booked; rooftop access is weather-dependent.'});
stop('2026-10-04','Tokyo Skytree',{priority:'TARGET',desc:'Target ~16:15 for daylight → twilight → city lights. Confirm/buy timed admission if not already booked; visibility decides whether Galleria is worth it.'});

// Departure airport is not known in site data; never fake a pin.
stop('2026-10-05','Airport transfer',{nav:false,desc:'Airport and flight time must be plugged in from the final ticket. Build backward from airline bag-drop/check-in; do not use a fake Tokyo Station destination.'});

// ---------- KYUSHU ROAD-TRIP AUDIT ----------
const zYama=findZone('2026-09-24',/Yamanami|Kuju/i);
if(zYama){
 zYama.summary='The route itself is the attraction. Drive the Yamanami highlands deliberately and use short stops: optional geothermal/bridge branch → Chojabaru/Tadewara → Makinoto → Senomoto → Kurokawa.';
 zYama.strategy='DEFAULT: leave Beppu early and head for the highlands. At 08:00 choose ONE beauty branch if desired: Umi Jigoku OR Kokonoe Bridge at 08:30. Then protect Chojabaru/Tadewara and Makinoto. Do not let a detour eat Aso daylight.';
 zYama.sequence=[
  pt('Kannawa / Myoban steam streets',33.3196,131.4757,'Quick cool-morning steam atmosphere before the road.','high','20–30 min',{mapsQuery:'Kannawa Onsen, Beppu, Oita, Japan'}),
  pt('Yamanami Highway',33.1710,131.2870,'Stay on the scenic Trans-Kyushu/Yamanami corridor; broad grassland and Kuju views are the point.','must','drive',{mapsQuery:'Yamanami Highway, Oita, Japan'}),
  pt('Kokonoe Yume Otsurihashi',33.1625,131.2865,'OPTIONAL BRANCH. Opens 08:30 in Sep. Huge gorge + waterfall view; first big detour to remove if the day is not perfectly clean.','detour','25–35 min',{mapsQuery:'Kokonoe Yume Otsurihashi, Oita, Japan'}),
  pt('Chojabaru · Tadewara Wetlands',33.1266,131.2409,'Short boardwalk under Kuju peaks. Full 2.5 km loop is ~45 min; your plan uses only the high-payoff opening section.','must','20–25 min',{mapsQuery:'Tadewara Wetlands, Kokonoe, Oita, Japan'}),
  pt('Makinoto Pass · First Observation Deck',33.0942,131.2211,'Highest Yamanami pass area. Climb only to the first lookout; huge payoff without starting a hike.','must','15 min',{mapsQuery:'Makinoto Pass No. 1 Observation Deck, Oita, Japan'}),
  pt('Senomoto Plateau / Rest House',33.0503,131.1747,'Fast plateau pullout, restroom and coffee/soft serve only if immediate.','bonus','10–15 min',{mapsQuery:'Senomoto Rest House, Kumamoto, Japan'})
 ];
 zYama.alternates=[
  {name:'Umi Jigoku · Beppu 08:00 swap',note:'If you want one signature Beppu Hell, Umi Jigoku is the best single stop. It opens at 08:00. Do this INSTEAD OF Kokonoe Bridge unless you are comfortably ahead.',mapsQuery:'Umi Jigoku, Beppu, Oita, Japan',status:'SWAP'},
  {name:'Kokonoe Bridge',note:'Opens 08:30 in Sep–Oct. Weather can restrict entry. Its waterfalls/gorge are beautiful, but it loses to Yamanami/Aso if the clock slips.',mapsQuery:'Kokonoe Yume Otsurihashi, Oita, Japan',status:'OPTIONAL'}
 ];
 zYama.cut='Cut Kokonoe first → Senomoto stop length → extra Tadewara walking. Never cut the Yamanami drive, Makinoto highland view, Daikanbo or Kusasenri.';
}
const zAso=findZone('2026-09-24',/Aso caldera/i);
if(zAso){
 zAso.summary='Aso is a moving landscape sequence: Daikanbo rim panorama → Milk Road → Komezuka → Aso Panorama Line → Kusasenri. The crater is currently restricted, so it is not a dependency.';
 zAso.strategy='Do not ask Maps for the fastest Daikanbo → Kusasenri line and blindly follow it. Protect the scenic rim and Panorama Line. Daikanbo + Kusasenri are the anchors; Komezuka is the fast visual punctuation.';
 zAso.sequence=[
  pt('Daikanbo Lookout',33.0402,131.1092,'Walk beyond the parking lot to the tip for the full caldera bowl.','must','30 min',{mapsQuery:'Daikanbo Lookout, Aso, Kumamoto, Japan'}),
  pt('Aso Milk Road',32.9960,131.0860,'Drive the open northern caldera rim; safe pullouts only.','must','drive',{mapsQuery:'Aso Milk Road, Kumamoto, Japan'}),
  pt('Komezuka viewpoint',32.9239,131.0795,'Quick cinder-cone/pasture photo; do not hunt for an illegal shoulder stop.','high','10–15 min',{mapsQuery:'Komezuka, Aso, Kumamoto, Japan'}),
  pt('Aso Panorama Line',32.9080,131.0620,'Keep the scenic volcanic approach into Kusasenri rather than shortcutting the landscape.','must','drive',{mapsQuery:'Aso Panorama Line, Kumamoto, Japan'}),
  pt('Kusasenri',32.8926,131.0424,'Walk into the grassland, frame horses/pond/volcanic peaks, then eat akaushi efficiently.','must','45–60 min',{mapsQuery:'Kusasenri, Aso, Kumamoto, Japan'})
 ];
 zAso.alternates=[
  {name:'Nakadake crater',note:'CURRENTLY CLOSED to crater viewing: Alert Level 2 and ~1 km restriction as of Sep 14. Recheck official Aso status 48–72h before. If reopened, it remains conditional and must not steal the Takachiho arrival buffer.',mapsQuery:'Aso Nakadake Crater, Kumamoto, Japan',status:'CURRENTLY CLOSED'},
  {name:'Aso Volcano Museum',note:'Best weather/rain fallback beside Kusasenri; skip in clear weather unless the group wants volcano context.',mapsQuery:'Aso Volcano Museum, Kumamoto, Japan',status:'RAIN BACKUP'}
 ];
 zAso.cut='Crater detour/museum first. Never cut Daikanbo → scenic rim → Kusasenri.';
}
const zTakaNight=findZone('2026-09-24',/Takachiho night/i);
if(zTakaNight){zTakaNight.alternates=[{name:'Kunimigaoka',note:'Beautiful basin / sea-of-clouds viewpoint from older Kyushu variants. NOT default tonight. Only use at dawn Sep25 if the sea-of-cloud forecast is exceptional AND you accept shortening the gorge rim walk; the reserved boat remains non-negotiable.',mapsQuery:'Kunimigaoka, Takachiho, Miyazaki, Japan',status:'WEATHER-ONLY'}]}
const zTaka=findZone('2026-09-25',/Takachiho Gorge/i);
if(zTaka){
 zTaka.rules='Boat is reserved/timed and can still be suspended for river, weather or earthquake safety. If canceled: keep the gorge promenade + Manai Falls + Three Bridges, then use the saved time for Amano-Iwato/Amanoyasukawara or an earlier Fukuoka exit.';
 zTaka.sequence=(zTaka.sequence||[]).map(x=>{
  if(/rowboat/i.test(x.name))Object.assign(x,{mapsQuery:'Takachiho Gorge Boat Rental Reception, Miyazaki, Japan'});
  if(/Manai/i.test(x.name))Object.assign(x,{mapsQuery:'Manai Falls, Takachiho, Miyazaki, Japan'});
  if(/Three Bridges/i.test(x.name))Object.assign(x,{mapsQuery:'Takachiho Three Bridges Viewpoint, Miyazaki, Japan'});
  if(/Amano/i.test(x.name))Object.assign(x,{mapsQuery:'Ama-no-Iwato Shrine West Main Shrine, Takachiho, Miyazaki, Japan'});
  return x;
 });
 zTaka.alternates=[
  {name:'Amanoyasukawara',note:'If Amano-Iwato is kept, walk the river path to the cave/cairn site. Atmospheric, but still the first branch to cut when the Fukuoka clock tightens.',mapsQuery:'Amanoyasukawara, Takachiho, Miyazaki, Japan',status:'IF AHEAD'},
  {name:'Kunimigaoka dawn',note:'Only if weather strongly favors a sea of clouds and you deliberately shorten the gorge rim walk. Never risk the boat check-in.',mapsQuery:'Kunimigaoka, Takachiho, Miyazaki, Japan',status:'WEATHER-ONLY'}
 ];
}
const zExit=findZone('2026-09-25',/Kamishikimi/i);
if(zExit){
 zExit.sequence=(zExit.sequence||[]).map(x=>/Kamishikimi/i.test(x.name)?Object.assign(x,{mapsQuery:'Kamishikimi Kumanoimasu Shrine, Takamori, Kumamoto, Japan'}):x);
 zExit.alternates=[{name:'Ugeto-Iwa',note:'Continue above Kamishikimi only if the stone path is dry and you are ahead. This upper climb is cut before the shrine itself or the rental-return buffer.',mapsQuery:'Ugeto-Iwa Kamishikimi, Takamori, Kumamoto, Japan',status:'IF AHEAD'}];
}

// ---------- OSAKA / KYOTO LOGIC FIXES ----------
const zOsaka25=findZone('2026-09-25',/Osaka Minami/i);
if(zOsaka25){
 zOsaka25.strategy='Check in fast in Dotonbori/Namba, then use the remaining retail window first: Shinsaibashi → Amerikamura. After shops fade, loop south into Dotonbori river neon → Hozenji → late lanes. This is a small compact loop, not a cross-city detour.';
 const old=zOsaka25.sequence||[]; const get=re=>old.find(x=>re.test(x.name));
 zOsaka25.sequence=[get(/Namba Station/),get(/Shinsaibashi/),get(/Amerikamura/),get(/Dotonbori/),get(/Tombori/),get(/Hozenji Temple/),get(/Hozenji Yokocho/),get(/Soemoncho/),get(/Orange Street/)].filter(Boolean);
 zOsaka25.cut='Cut Horie/Orange Street first. After ~20:00 Shinsaibashi is about the covered-street atmosphere, not a full shopping session. Protect Dotonbori + Hozenji after dark.';
}
const zOsaka27=findZone('2026-09-27',/Osaka dawn/i);
if(zOsaka27){
 zOsaka27.time='06:45–08:15';
 zOsaka27.summary='Two early sights that actually work before Kyoto: Namba Yasaka’s lion-head shrine and a quick quiet Shinsekai street pass. Then leave Osaka.';
 zOsaka27.strategy='Namba Yasaka 06:45 → taxi to Shinsekai → Tsutenkaku exterior streets → back for bags / depart Minami around 08:15. Kuromon and Doguyasuji are intentionally NOT forced because their useful opening windows are too late for the Kyoto plan.';
 zOsaka27.sequence=[
  pt('Namba Yasaka Shrine',34.6623,135.4968,'Open early; the giant lion-head stage is a genuinely unique quick Osaka sight.','must','20 min',{mapsQuery:'Namba Yasaka Shrine, Osaka, Japan'}),
  pt('Shinsekai · Tsutenkaku exterior',34.6525,135.5063,'Retro tower streets before crowds. Do not wait for the tower interior or restaurant opening.','high','20–25 min',{mapsQuery:'Tsutenkaku, Osaka, Japan'})
 ];
 zOsaka27.alternates=[
  {name:'Kuromon Market',note:'Remembered, not forgotten. Normal useful market hours start around 09:00; forcing it this morning would push Kyoto too late. It loses to Kinkaku/Arashiyama.',mapsQuery:'Kuromon Market, Osaka, Japan',status:'INTENTIONALLY CUT'},
  {name:'Sennichimae Doguyasuji',note:'Remembered, not forgotten. Shops generally open around 10:00, so it does not fit the pre-Kyoto window. Walk it only if the entire group decides to trade Kyoto time for cookware.',mapsQuery:'Sennichimae Doguyasuji, Osaka, Japan',status:'INTENTIONALLY CUT'},
  {name:'Umeda / Umeda Sky Building',note:'Good Osaka sight, but geographically wrong for the protected Minami nightlife + Himeji/Kobe + Kyoto transfer. You already have stronger skyline decks later in the trip.',mapsQuery:'Umeda Sky Building, Osaka, Japan',status:'INTENTIONALLY CUT'},
  {name:'Osaka Castle interior',note:'Intentionally cut because Himeji gives you the superior real feudal-castle interior the day before.',mapsQuery:'Osaka Castle, Osaka, Japan',status:'INTENTIONALLY CUT'}
 ];
 zOsaka27.cut='If Saturday night was huge, cut Shinsekai first, then Namba Yasaka. Never let this optional Osaka morning make Kinkaku late.';
}
const zArash=findZone('2026-09-27',/Arashiyama/i);
if(zArash){
 const old=zArash.sequence||[], get=re=>old.find(x=>re.test(x.name));
 zArash.strategy='CORE: Tenryu-ji → Nonomiya → Bamboo → river/Togetsukyo → Nakanoshima → Kimono Forest. After Bamboo choose ONE optional branch, not all of them: Okochi Sanso is the default best single add; Jojakko-ji/Nison-in is the quieter northern-temple alternative.';
 zArash.sequence=[get(/Tenryu/),get(/Nonomiya/),get(/Bamboo/),get(/Togetsukyo/),get(/Nakanoshima/),get(/Kimono Forest/)].filter(Boolean);
 zArash.alternates=[
  {name:'Okochi Sanso Garden',note:'DEFAULT OPTIONAL BRANCH if you are ahead. 09:00–16:30; allow ~40–45 min for hillside garden, viewpoints and matcha. Best single add after Bamboo.',mapsQuery:'Okochi Sanso Garden, Kyoto, Japan',status:'CHOOSE ONE'},
  {name:'Jojakko-ji + Nison-in',note:'ALTERNATE northern Sagano branch. Both close around 16:30. Use this instead of Okochi, not in addition to it, unless the day is exceptionally ahead.',mapsQuery:'Jojakko-ji Temple, Kyoto, Japan',status:'CHOOSE ONE'}
 ];
 zArash.cut='Optional branch first → Ryoan-ji earlier if transport slipped. Never cut Tenryu garden + Nonomiya/Bamboo + river core + Gion night.';
}
const zKiyo=findZone('2026-09-28',/Kiyomizu/i);
if(zKiyo){zKiyo.rules='Kiyomizu official warning: some map apps can send visitors to paths that do not enter the temple. Navigate to the Nio-mon / Kiyomizu-zaka approach (or Chawan-zaka emergency-road entrance), not a random centroid.'}

// ---------- LIVE / OPERATIONAL DAY ALERTS ----------
const d22=day('2026-09-22'); if(d22){d22.alerts=[{level:'info',title:'Mt Inasa access Sep 22',text:'Slope Car is under maintenance. Your route uses the Ropeway from Fuchi, which is the correct plan. A temporary free shuttle Sep 19–23 only runs between the midway parking area and summit.'},{level:'info',title:'Glover Garden hours',text:'Verified 2026 Sep 22 falls in extended opening: 08:00–21:30, last entry 21:10. Your sunset plan does not depend on a 18:00 closure.'}]}
const d28=day('2026-09-28'); if(d28){d28.alerts=[{level:'info',title:'Kiyomizu entrance',text:'Opens 06:00. Use the Nio-mon / Kiyomizu-zaka approach; official guidance warns some map routes do not lead into the grounds.'},{level:'info',title:'Nijo is the major cut',text:'Nijo grounds are compatible with the afternoon window, but never compress Kiyomizu/Higashiyama or Ginkaku to save it.'}]}

// ---------- VERIFIED NAVIGATION TARGETS ----------
// Prefer an exact named destination/address over stale/ambiguous coordinates for these items.
const NAV={
 'nagasaki airport station':{q:'Nagasaki Station, Nagasaki, Japan'},
 'nagasaki station luggage lockers':{q:'Nagasaki Station, Nagasaki, Japan'},
 'taxi fuchi shrine ropeway':{q:'Nagasaki Ropeway Fuchi Shrine Station, Nagasaki, Japan'},
 'airbnb 7 18 gotomachi':{q:'7-18 Gotomachi, Nagasaki, Nagasaki 850-0036, Japan'},
 'nagasaki hakata':{q:'Hakata Station, Fukuoka, Japan'},
 'hakata fukuoka airport':{q:'Fukuoka Airport, Fukuoka, Japan'},
 'fukuoka airport friend pickup rental':{q:'Fukuoka Airport, Fukuoka, Japan'},
 'drive fukuoka airport yufuin':{q:'Kinrinkoiriguchizen Parking Lot, Yufuin, Oita, Japan'},
 'kinrin lake':{q:'Kinrin Lake, Yufuin, Oita, Japan'},
 'yufuin beppu':{q:'Kannawa Onsen, Beppu, Oita, Japan'},
 'kokonoe yume suspension bridge':{q:'Kokonoe Yume Otsurihashi, Oita, Japan'},
 'chojabaru tadewara':{q:'Tadewara Wetlands, Kokonoe, Oita, Japan'},
 'makinoto pass':{q:'Makinoto Pass No. 1 Observation Deck, Oita, Japan'},
 'senomoto plateau':{q:'Senomoto Rest House, Kumamoto, Japan'},
 'kurokawa onsen':{q:'Kurokawa Onsen, Minamioguni, Kumamoto, Japan'},
 'daikanbo':{q:'Daikanbo Lookout, Aso, Kumamoto, Japan'},
 'milk road komezuka pullouts':{q:'Komezuka, Aso, Kumamoto, Japan'},
 'kusasenri akaushi lunch':{q:'Kusasenri, Aso, Kumamoto, Japan'},
 'drive to takachiho':{q:'Takachiho Gorge, Miyazaki, Japan'},
 'takachiho gorge rim walk':{q:'Takachiho Gorge P2 Araragi Parking Lot, Miyazaki, Japan'},
 'boat reception':{q:'Takachiho Gorge Boat Rental Reception, Miyazaki, Japan'},
 'takachiho rowboat manai falls':{q:'Takachiho Gorge Boat Rental Reception, Miyazaki, Japan'},
 'amano iwato amanoyasukawara':{q:'Ama-no-Iwato Shrine West Main Shrine, Takachiho, Miyazaki, Japan'},
 'kamishikimi kumanoimasu shrine':{q:'Kamishikimi Kumanoimasu Shrine, Takamori, Kumamoto, Japan'},
 'drive fukuoka airport':{q:'Fukuoka Airport, Fukuoka, Japan'},
 'fuel rental return':{q:'Fukuoka Airport, Fukuoka, Japan',note:'Use the rental company’s booked return location for the final turn-by-turn.'},
 'airport hakata':{q:'Hakata Station, Fukuoka, Japan'},
 'hakata shin osaka':{q:'Shin-Osaka Station, Osaka, Japan'},
 'osaka himeji':{q:'Himeji Station, Hyogo, Japan'},
 'himeji shin kobe':{q:'Shin-Kobe Station, Kobe, Japan'},
 'nunobiki ropeway herb gardens':{q:'Kobe Nunobiki Herb Gardens Ropeway, Kobe, Japan'},
 'osaka kyoto bag drop':{q:'Kyoto Station, Kyoto, Japan',note:'Replace with your lodging pin on the day if bags are being dropped directly there.'},
 'taxi kiyomizu':{q:'Nio-mon Gate Kiyomizu-dera, Kyoto, Japan'},
 'kiyomizu dera':{q:'Nio-mon Gate Kiyomizu-dera, Kyoto, Japan'},
 'collect bags kyoto station':{q:'Kyoto Station, Kyoto, Japan'},
 'kyoto tokyo':{q:'Tokyo Station, Tokyo, Japan'},
 'tokyo hotel bag drop':{nav:false,note:'Use your saved Tokyo lodging pin; the site will not invent a hotel address.'},
 'tokyo tobu nikko':{q:'Tobu-Nikko Station, Nikko, Tochigi, Japan'},
 'bus uphill kegon':{q:'Kegon Falls, Nikko, Tochigi, Japan'},
 'irohazaka bus downhill':{q:'Nishisando Bus Stop, Nikko, Tochigi, Japan'},
 'nikko tokyo':{q:'Asakusa Station, Tokyo, Japan'},
 'tokyo kamakura hase':{q:'Hase Station, Kamakura, Kanagawa, Japan'},
 'kamakura tokyo reset':{nav:false,note:'Return to your saved Tokyo lodging/reset point, then navigate to Borderless.'},
 'sumida river oshiage':{q:'Tokyo Skytree, Tokyo, Japan'},
 'airport transfer':{nav:false,note:'Airport/flight not yet encoded.'}
};

// Exact photo identities. Site v12 uses these titles or a place-specific Commons search; it no longer falls back to a generic city image.
const PHOTOS={
 'nagasaki airport station':'Nagasaki Station', 'nagasaki station luggage lockers':'Nagasaki Station', 'twenty six martyrs monument':'Twenty-Six Martyrs Museum and Monument', 'urakami cathedral':'Urakami Cathedral', 'peace park':'Nagasaki Peace Park', 'atomic bomb hypocenter park':'Atomic bombings of Hiroshima and Nagasaki', 'nagasaki atomic bomb museum':'Nagasaki Atomic Bomb Museum', 'sanno shrine':'Sannō Shrine', 'nakashima river megane bridge':'Meganebashi', 'sofukuji temple':'Sōfuku-ji (Nagasaki)', 'shinchi chinatown speed lunch':'Nagasaki Chinatown', 'dejima':'Dejima', 'glover garden':'Glover Garden', 'mt inasa observatory':'Mount Inasa',
 'kinrin lake':'Yufuin', 'tenso shrine':'Yufuin', 'yunotsubo kaido':'Yufuin', 'kannawa steam lanes dinner onsen':'Beppu, Ōita', 'kokonoe yume suspension bridge':'Kokonoe Yume Otsurihashi', 'chojabaru tadewara':'Aso Kujū National Park', 'makinoto pass':'Kujū Mountains', 'kurokawa onsen':'Kurokawa Onsen', 'daikanbo':'Mount Aso', 'milk road komezuka pullouts':'Komezuka', 'kusasenri akaushi lunch':'Mount Aso', 'takachiho gorge rim walk':'Takachiho Gorge', 'takachiho rowboat manai falls':'Takachiho Gorge', 'amano iwato amanoyasukawara':'Amano-Iwato',
 'dotonbori hozenji namba friday':'Dōtonbori', 'namba yasaka shrine':'Namba Yasaka Shrine', 'shinsekai tsutenkaku exterior':'Shinsekai', 'himeji castle':'Himeji Castle', 'koko en garden':'Koko-en', 'nunobiki ropeway herb gardens':'Kobe Nunobiki Herb Gardens', 'kitano ijinkan':'Kitano-chō', 'nankinmachi':'Nankin-machi', 'meriken park harborland':'Meriken Park',
 'kinkaku ji':'Kinkaku-ji', 'ryoan ji':'Ryōan-ji', 'ninna ji':'Ninna-ji', 'tenryu ji sogenchi garden':'Tenryū-ji', 'arashiyama bamboo grove':'Bamboo Forest (Kyoto)', 'nonomiya shrine':'Nonomiya Shrine', 'okochi sanso garden':'Ōkōchi Sansō', 'jojakko ji':'Jōjakkō-ji', 'nison in':'Nison-in', 'togetsukyo riverside':'Togetsukyō Bridge', 'yasaka shrine maruyama':'Yasaka Shrine', 'gion shirakawa hanamikoji':'Gion', 'pontocho kamo river dinner':'Pontochō', 'kiyomizu dera':'Kiyomizu-dera', 'sannenzaka ninenzaka yasaka pagoda':'Hōkan-ji', 'nanzen ji aqueduct':'Nanzen-ji', 'philosophers path':'Philosopher’s Walk', 'ginkaku ji':'Ginkaku-ji', 'nishiki market':'Nishiki Market', 'nijo castle':'Nijō Castle', 'fushimi inari':'Fushimi Inari-taisha',
 'omoide yokocho':'Omoide Yokocho', 'kabukicho godzilla':'Kabukichō', 'hanazono shrine':'Hanazono Shrine', 'golden gai shinjuku night':'Shinjuku Golden Gai', 'tsukiji outer market':'Tsukiji fish market', 'unicorn gundam divercity':'Unicorn Gundam', 'odaiba waterfront':'Odaiba', 'ginza ginza six':'Ginza', 'tokyo station marunouchi kitte':'Tokyo Station', 'yurakucho under the tracks':'Yūrakuchō',
 'kegon falls':'Kegon Falls', 'lake chuzenji':'Lake Chūzenji', 'nikko toshogu':'Nikkō Tōshō-gū', 'futarasan shrine':'Futarasan Shrine', 'rinnoji':'Rinnō-ji', 'shinkyo bridge':'Shinkyō', 'hase dera':'Hase-dera (Kamakura)', 'kotoku in great buddha':'Kōtoku-in', 'hokokuji bamboo garden':'Hōkoku-ji', 'tsurugaoka hachimangu':'Tsurugaoka Hachimangū', 'zojoji tokyo tower exterior':'Zōjō-ji',
 'meiji jingu':'Meiji Shrine', 'takeshita street':'Takeshita Street', 'omotesando cat street':'Omotesandō', 'nezu museum garden':'Nezu Museum', 'daikanyama t site':'Daikanyama', 'nakameguro river':'Naka-meguro', 'shibuya street layer':'Shibuya Crossing', 'shibuya sky':'Shibuya', 'senso ji at dawn':'Sensō-ji', 'yanaka ginza old lanes':'Yanaka, Tokyo', 'nezu shrine':'Nezu Shrine', 'ueno park':'Ueno Park', 'ameyoko':'Ameya-Yokochō', 'kappabashi':'Kappabashi-dori', 'tokyo skytree':'Tokyo Skytree', 'akihabara at night':'Akihabara'
};

function norm(s){return String(s||'').toLowerCase().normalize('NFKD').replace(/[’'·/→–—&()+.]/g,' ').replace(/[^a-z0-9\s]/g,' ').replace(/\b(the|to|and|at|of|exterior|optional|speed|lunch|dinner|night|morning|friday|saturday|target)\b/g,' ').replace(/\s+/g,' ').trim()}
window.JP_AUDIT={version:'12',verified:'2026-09-14',norm,NAV,PHOTOS,
 sources:{aso:'https://www.aso-volcano.jp/',takachiho:'https://www.takachiho-kanko.info/boat/detail.php',kokonoe:'https://www.yumeooturihashi.com/eng/info.html',glover:'https://glover-garden.jp/guide/',kiyomizu:'https://www.kiyomizudera.or.jp/en/location/'},
 globalNotes:[
  'Itoshima is excluded from Sep 23 final plan because friend pickup is around 2 PM and the car goes east to Yufuin/Beppu.',
  'Ine/Amanohashidate, Hiroshima/Miyajima, Onomichi/Kurashiki and Hakone/Fuji are not part of the locked final route.',
  'Move/logistics steps without a known lodging or airport target deliberately hide navigation instead of sending you to a fake pin.'
 ]
};
})();