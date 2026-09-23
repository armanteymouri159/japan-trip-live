(()=>{
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
const d=T.days.find(x=>x.date==='2026-09-24');if(!d)return;
const S=(time,name,type,priority,query,lat,lng,wiki,desc)=>[time,name,type,priority,query,lat,lng,wiki,desc];
const Z=(name,time,summary,cut,image,stops,food=[])=>({name,time,summary,cut,image,stops,food});

d.city='Beppu → Yufuin → Kuju → Kurokawa → Aso → Minamiaso → Takachiho';
d.mission='THE director day: one continuous southbound scenic line. Start before crowds, fully cover Yufuin, then protect Yamanami Highway, Kuju grasslands, Kurokawa, the Aso rim, Kusasenri and the South Aso descent. Every stop below is already ordered to minimize backtracking.';
d.alerts=[
 {k:'warning',t:'Aso Level 2 · crater closed',x:'Current official status is Alert Level 2. The roughly 1 km Nakadake crater zone remains restricted. Mountain-top plaza access may be allowed only as posted; do not budget crater viewing.'},
 {k:'warning',t:'Takachiho road work Sep 24',x:'National Route 325 has construction with alternating one-way traffic in parts of Takachiho. Also, the Mukoyama No. 2 farm-road Mizugasaki Bridge is fully closed 09:00–17:00 Sep 24–25. Stay on the main signed Route 325 approach and follow live detours.'},
 {k:'info',t:'Navigation rule',x:'Map each named stop in this order. Do not tap a generic “Takachiho” route early or Google may flatten the scenic Yamanami / Milk Road / Aso Panorama route.'},
 {k:'info',t:'Cut rule',x:'If 30+ minutes behind: cut Kokonoe bridge first, then extra Kurokawa lanes, then Shirakawa Spring / Tsukimawari. Never cut Kinrin, Tadewara, Daikanbo, Milk Road/Komezuka or Kusasenri.'}
];

d.zones=[
 Z('BEPPU → YUFUIN · basin at dawn','06:25–10:00',
   'Leave Kitahama early and climb Route 11. Sagiridai comes BEFORE town from the Beppu side, so hit the overlook first, then park once near Kinrin and walk the compact Yufuin core.',
   'Cut station-axis browsing before lake/Tenso. Floral Village is only worth a fast opening pass.',
   'Yufuin',[
   S('06:25','Beppu Airbnb · wheels rolling','DRIVE','MUST','3-2-15 Kitahama, Beppu, Oita 874-0920, Japan',33.2819,131.5053,null,'Fuel tonight if possible. Breakfast/water in hand. The goal is to be above the Yufuin basin before the town crowds arrive.'),
   S('07:05','Sagiridai Observatory','VIEW','MUST','Sagiridai Observatory, Yufu, Oita, Japan',33.26022,131.38244,'Yufuin','Drive-up panorama over the entire Yufuin basin and Mt. Yufu. This is perfectly placed on the Beppu→Yufuin approach, so do it before entering town.'),
   S('07:25','Kinrin Lake · east / south shore','NATURE','MUST','Kinrin Lake, Yufuin, Oita, Japan',33.2660,131.3718,'Yufuin','Walk the lake edge while it is quiet. Do the water reflections, wooded shoreline and the small bridges; do not just shoot from one corner.'),
   S('07:50','Tenso Shrine · lakeside torii','SHRINE','MUST','Tenso Shrine Yufuin, Oita, Japan',33.2642,131.3709,null,'Tiny shrine tucked into the trees at the south edge of Kinrin. Get the water-edge torii and cedar atmosphere.'),
   S('08:05','Kinrin west shore / Yunotsubo approach','WALK','HIGH','Kinrin Lake west shore Yufuin, Oita, Japan',33.2666,131.3694,'Yufuin','Finish the lake loop and flow directly into the pedestrian town core.'),
   S('08:20','Yunotsubo Kaido','NEIGHBORHOOD','MUST','Yunotsubo Kaido Yufuin, Oita, Japan',33.2669,131.3651,null,'Walk the full useful stretch: little shops, mountain backdrop, side lanes and snacks as places begin opening. Keep moving; this is atmosphere, not a shopping marathon.'),
   S('08:55','Yufuin Station axis · Mt. Yufu view','PHOTO','HIGH','Yufuin Station, Oita, Japan',33.2628,131.3545,'Yufuin','Use the long straight station-front axis for the clean town-to-Mt.-Yufu composition, then turn back toward the central lanes.'),
   S('09:15','Yufuin side lanes / fast breakfast','FOOD','HIGH','Yunotsubo Kaido Yufuin Oita',33.2660,131.3617,null,'Croquette, pudding, bakery or coffee to-go. Use the 15-minute gap before Floral Village opens; no sit-down brunch.'),
   S('09:30','Yufuin Floral Village · opening pass','PHOTO','HIGH','Yufuin Floral Village, Oita, Japan',33.2662,131.3668,null,'Doors open 09:30. Do one fast loop of the whimsical English-village lanes and leave. It is small; 15–20 minutes is enough.'),
   S('09:55','Depart Yufuin south on Yamanami','SCENIC DRIVE','MUST','Yamanami Highway, Oita, Japan',33.2310,131.3300,'Aso Kujū National Park','From here the road itself becomes the attraction. Set the next pin, not Takachiho.')
 ]),
 Z('YAMANAMI HIGHWAY → KOKONOE → KUJU','09:55–13:05',
   'This is the highland spine: huge grassland, gorge, marsh and mountain-pass scenery. Stop frequently only at named legal pullouts; do not improvise on shoulders.',
   'Kokonoe bridge is the first big cut. Kuju Flower Park is not scheduled because it would steal too much Aso daylight.',
   'Aso Kujū National Park',[
   S('10:40','Kokonoe Yume Otsurihashi','VIEW','FLEX','Kokonoe Yume Otsurihashi, Oita, Japan',33.1625,131.2865,'Kokonoe Yume Otsurihashi','390 m pedestrian suspension bridge high above Naruko Gorge with waterfall and Kuju-range views. Walk across and back only if the clock is healthy.'),
   S('11:25','Chojabaru · Tadewara Wetlands','NATURE','MUST','Tadewara Wetlands, Kokonoe, Oita, Japan',33.1266,131.2409,'Aso Kujū National Park','Park at Chojabaru and take the short boardwalk out into the Ramsar wetland. Get the boardwalk leading into the Kuju peaks; do not start the full 45-minute loop.'),
   S('11:55','Chojabaru Visitor Center / restroom reset','LOGISTICS','HIGH','Chojabaru Visitor Center, Oita, Japan',33.1268,131.2405,null,'Five-minute map/toilet/water reset. The visitor center is useful; the exhibits are not the point today.'),
   S('12:10','Makinoto Pass · first lookout','VIEW','MUST','Makinoto Pass No. 1 Observation Deck, Oita, Japan',33.0942,131.2211,'Kujū Mountains','Climb only to the first lookout for the close Kuju ridge panorama. Hard 10–15 minute cap.'),
   S('12:35','Kuju highland road pullouts','SCENIC DRIVE','HIGH','Yamanami Highway Kuju Oita Japan',33.0730,131.1965,'Aso Kujū National Park','The section south of Makinoto opens into rolling grassland. Use one or two DESIGNATED pullouts when the view is exceptional.'),
   S('12:50','Senomoto Plateau / Rest House','VIEW','HIGH','Senomoto Rest House, Kumamoto, Japan',33.0503,131.1747,null,'Huge open plateau where Oita gives way to Kumamoto. Ten-minute panorama, restroom and soft-serve if immediate.')
 ]),
 Z('KUROKAWA ONSEN · village hit','13:10–14:00',
   'This is your small-village stop. Park once outside the narrow core and walk downhill through cedar ryokan, stone bridges, river lanes and steam. No bath today.',
   'Cut snacks and upper lanes before the river/bridge core.',
   'Kurokawa Onsen',[
   S('13:10','Kurokawa Onsen · main public parking','PARK','MUST','Kurokawa Onsen Parking, Minamioguni, Kumamoto, Japan',33.0877,131.1537,null,'Use a public lot and leave the car. Do not drive the tiny central ryokan lanes looking for closer parking.'),
   S('13:15','Kaze no Ya / village entrance','NEIGHBORHOOD','HIGH','Kaze no Ya Kurokawa Onsen, Kumamoto, Japan',33.0876,131.1529,null,'Start at the information-center side and walk downhill into the village.'),
   S('13:22','Kurokawa river lanes','ONSEN TOWN','MUST','Kurokawa Onsen, Minamioguni, Kumamoto, Japan',33.0868,131.1524,'Kurokawa Onsen','Cedar ryokan facades, stone walls, narrow lanes and steam. The village itself is the attraction.'),
   S('13:38','Marurin Bridge','PHOTO','MUST','Marurin Bridge Kurokawa Onsen, Kumamoto, Japan',33.0867,131.1506,null,'Classic river-level view through the ryokan valley. Walk a short section on both sides of the river.'),
   S('13:48','Jizoyu / lower-lane texture','WALK','HIGH','Jizoyu Kurokawa Onsen Kumamoto',33.0870,131.1512,null,'Quick old-bathhouse / lantern / river-lane finish. Grab a cream puff only if there is no line.'),
   S('14:00','Leave Kurokawa for Daikanbo','DRIVE','MUST','Daikanbo Lookout, Aso, Kumamoto, Japan',33.0402,131.1092,'Mount Aso','Do not add a soak. The best daylight of the day is still ahead.')
 ]),
 Z('ASO NORTH RIM · DAIKANBO + MILK ROAD','14:00–15:40',
   'This is the scale reveal. Daikanbo shows the whole caldera; then stay on the rim via Milk Road and use Kabutoiwa as the second angle.',
   'Extra roadside lookouts before Daikanbo/Kabutoiwa.',
   'Mount Aso',[
   S('14:40','Daikanbo Lookout','VIEW','MUST','Daikanbo Lookout, Aso, Kumamoto, Japan',33.0402,131.1092,'Mount Aso','Walk past the first parking-lot rail to the actual outer point. You want the full caldera floor and the Aso Five Peaks “sleeping Buddha” profile.'),
   S('15:10','Aso Milk Road · rim drive','SCENIC DRIVE','MUST','Aso Milk Road, Kumamoto, Japan',32.9960,131.0860,null,'Stay on Prefectural Route 339 / Milk Road for open grassland and rim-edge views. Do not let navigation dump you into the caldera too early.'),
   S('15:25','Kabutoiwa Observatory','VIEW','HIGH','Kabutoiwa Observatory, Aso, Kumamoto, Japan',32.9830,131.015139,null,'Fast second caldera panorama directly on Milk Road. Walk the short paved path; toilets are available.'),
   S('15:40','Descend toward Aso volcanic core','SCENIC DRIVE','MUST','Komezuka Aso Kumamoto',32.9440,131.0630,'Mount Aso','Drop from the outer rim toward the grass-covered volcanic cones. Keep the next pin on Komezuka/Kusasenri.')
 ]),
 Z('ASO VOLCANIC CORE · KOMEZUKA → KUSASENRI','15:40–17:25',
   'Protect the volcanic landscape, not the closed crater. Use Komezuka for the perfect cone, then spend real time walking into Kusasenri instead of shooting it from the parking lot.',
   'Museum interior and mountain-top-plaza extension first. Kusasenri stays.',
   'Kusasenri',[
   S('16:00','Komezuka roadside viewpoint','PHOTO','MUST','Komezuka, Aso, Kumamoto, Japan',32.9239,131.0795,'Komezuka','Near-perfect grass cinder cone. Use a legal pullout/view area only; do not stop on the road shoulder.'),
   S('16:15','Aso Panorama Line · volcanic approach','SCENIC DRIVE','MUST','Aso Panorama Line, Kumamoto, Japan',32.9080,131.0620,null,'Drive deliberately through pasture and volcanic slopes toward Kusasenri. This road segment is a sight, not dead transit.'),
   S('16:30','Kusasenri · meadow walk','NATURE','MUST','Kusasenri, Aso, Kumamoto, Japan',32.8926,131.0424,'Mount Aso','Walk well into the grassland. See the ponds, horses if present, broad meadow and smoking volcanic backdrop. Give this the longest Aso stop.'),
   S('17:05','Kusasenri overlook / volcano-museum side','VIEW','HIGH','Aso Volcano Museum, Kumamoto, Japan',32.8899,131.0521,'Mount Aso','Before leaving, get the elevated roadside/museum-side angle back across the meadow. No museum visit.'),
   S('17:20','Nakadake crater road · DO NOT ENTER RESTRICTED ZONE','CONDITIONAL','CLOSED','Aso Nakadake Crater, Kumamoto, Japan',32.8846,131.0859,'Mount Aso','Current Level 2 keeps the roughly 1 km crater zone closed. Follow on-site barriers/signs; do not chase the crater.')
 ]),
 Z('SOUTH ASO → TAKAMORI → TAKACHIHO','17:25–19:45',
   'Descend the south side through Minamiaso/Takamori. The two final beauty stops are conditional on daylight; the main goal is a safe Route 325 run into Takachiho.',
   'Shirakawa Spring first, then Tsukimawari, if Aso ran late. Never cut safe arrival.',
   'Minamiaso',[
   S('17:25','Aso Panorama Line south descent','SCENIC DRIVE','MUST','Aso Panorama Line South Route Minamiaso Kumamoto',32.8630,131.0700,'Mount Aso','Take the southbound descent for changing views across Minamiaso. Do not backtrack north to Aso town.'),
   S('17:55','Shirakawa Suigen · daylight only','NATURE','FLEX','Shirakawa Spring, Minamiaso, Kumamoto, Japan',32.82576,131.09584,null,'Clear spring water gushes from the ground beneath trees and a small shrine. 15–20 minute loop only; fill a bottle if allowed.'),
   S('18:20','Tsukimawari Park · Mt. Neko view','VIEW','FLEX','Tsukimawari Park, Takamori, Kumamoto, Japan',32.839833,131.135917,null,'Wide grass field under the jagged Nekodake/Aso wall. Only stop if there is still useful light.'),
   S('18:35','Takamori → Route 325','VILLAGE','HIGH','Takamori Station, Kumamoto, Japan',32.8196,131.1228,null,'Use Takamori as the last fuel/convenience-store decision point. No shrine detour tonight; Kamishikimi is protected tomorrow morning.'),
   S('18:45','Route 325 → Takachiho','DRIVE','MUST','Takachiho, Miyazaki, Japan',32.7110,131.3070,null,'Main signed route into Miyazaki. Expect possible short construction holds near Takachiho and ignore shortcuts onto the closed Mukoyama farm-road bridge.'),
   S('19:40','Takachiho Airbnb · Mitai','HOME','MUST','5899-2 Mitai, Takachiho, Nishiusuki District, Miyazaki 882-1101, Japan',32.7110,131.3070,null,'Check in, eat, charge camera/batteries and stage shoes/water for the dawn gorge plan.')
 ])
];

const X=window.JAPAN_TRANSFERS||(window.JAPAN_TRANSFERS={});
const add=(name,mode,duration,text)=>X['2026-09-24|'+name]={mode,duration,text};
[
 ['Beppu Airbnb · wheels rolling','Drive','0 min','Start from Kitahama with a full tank / enough fuel for the mountains.'],
 ['Sagiridai Observatory','Drive','40–50 min','Climb Route 11 from Beppu; the overlook is on the Beppu side before Yufuin.'],
 ['Kinrin Lake · east / south shore','Drive + park','10–15 min','Descend into Yufuin and park once near the Kinrin/Yunotsubo core.'],
 ['Tenso Shrine · lakeside torii','Walk','3–5 min','On the south edge of Kinrin Lake.'],
 ['Kinrin west shore / Yunotsubo approach','Walk','5–8 min','Complete the lake loop toward the town lanes.'],
 ['Yunotsubo Kaido','Walk','2–5 min','The shopping street begins directly from the Kinrin-side core.'],
 ['Yufuin Station axis · Mt. Yufu view','Walk','15–20 min','Continue west through town; keep the walk purposeful.'],
 ['Yufuin side lanes / fast breakfast','Walk','5–10 min','Loop back toward Yunotsubo.'],
 ['Yufuin Floral Village · opening pass','Walk','5–8 min','Near the Kinrin end of Yunotsubo.'],
 ['Depart Yufuin south on Yamanami','Drive','5–10 min','Return to the car and aim for Route 11/Yamanami Highway.'],
 ['Kokonoe Yume Otsurihashi','Drive','35–45 min','Southwest through the Yufuin/Kokonoe highlands. This is the one meaningful detour.'],
 ['Chojabaru · Tadewara Wetlands','Drive','20–25 min','Rejoin the Yamanami corridor south toward Chojabaru.'],
 ['Chojabaru Visitor Center / restroom reset','Walk','1–3 min','Same parking area as Tadewara.'],
 ['Makinoto Pass · first lookout','Drive','12–15 min','Continue south on Yamanami Highway.'],
 ['Kuju highland road pullouts','Drive','10–15 min','Continue through the highest grassland section.'],
 ['Senomoto Plateau / Rest House','Drive','15–20 min','Yamanami south into the broad Senomoto plateau.'],
 ['Kurokawa Onsen · main public parking','Drive','12–18 min','Short branch west/north from Senomoto; use public parking.'],
 ['Kaze no Ya / village entrance','Walk','2–4 min','Start the Kurokawa walking loop.'],
 ['Kurokawa river lanes','Walk','3–5 min','Downhill into the ryokan/river core.'],
 ['Marurin Bridge','Walk','5–8 min','Stay on foot in the compact village.'],
 ['Jizoyu / lower-lane texture','Walk','4–6 min','Short lower-lane branch.'],
 ['Leave Kurokawa for Daikanbo','Drive','0 min','Back to the car; next pin is Daikanbo.'],
 ['Daikanbo Lookout','Drive','35–45 min','Southwest through Minamioguni/Aso toward the northern caldera rim.'],
 ['Aso Milk Road · rim drive','Drive','5–10 min','Leave Daikanbo on the rim route rather than dropping straight into Aso.'],
 ['Kabutoiwa Observatory','Drive','12–18 min','Continue west/southwest on Milk Road / Route 339.'],
 ['Descend toward Aso volcanic core','Drive','20–30 min','Use the signed route down from the rim toward the volcanic center.'],
 ['Komezuka roadside viewpoint','Drive','15–20 min','Approach the mountain area; use legal pullouts only.'],
 ['Aso Panorama Line · volcanic approach','Drive','5–10 min','Continue toward Kusasenri.'],
 ['Kusasenri · meadow walk','Drive + park','8–12 min','Paid Kusasenri/museum parking area.'],
 ['Kusasenri overlook / volcano-museum side','Walk','2–5 min','Across/alongside the same parking complex.'],
 ['Nakadake crater road · DO NOT ENTER RESTRICTED ZONE','Drive / signs','5–10 min','Only as current barriers allow; Level 2 restrictions override the saved route.'],
 ['Aso Panorama Line south descent','Drive','10–15 min','Leave Kusasenri south toward Minamiaso.'],
 ['Shirakawa Suigen · daylight only','Drive','25–35 min','South through Minamiaso. Cut if the sun/clock is gone.'],
 ['Tsukimawari Park · Mt. Neko view','Drive','15–20 min','Continue east toward Takamori.'],
 ['Takamori → Route 325','Drive','8–12 min','Short reposition through Takamori.'],
 ['Route 325 → Takachiho','Drive','50–65 min','Mountain highway into Miyazaki; construction holds can add time.'],
 ['Takachiho Airbnb · Mitai','Drive','5–10 min','Final town streets to the Airbnb.']
].forEach(r=>add(...r));

const E=window.JAPAN_ENRICH||(window.JAPAN_ENRICH={placeInfo:{},typeTips:{}});E.placeInfo=E.placeInfo||{};
Object.assign(E.placeInfo,{
 'Beppu Airbnb · wheels rolling':{duration:'Departure',see:'Leave with fuel, water, breakfast and everyone ready. There is no Beppu sightseeing block tomorrow morning.',photo:'None. Protect the start.',practical:'If you are not moving by ~06:40, Kokonoe bridge becomes the automatic first cut.'},
 'Sagiridai Observatory':{duration:'10–15 min',see:'Full Yufuin basin below you with Mt. Yufu dominating the skyline.',photo:'Shoot the basin wide, then use the road/guardrail or a person for scale.',practical:'Drive-up stop; on the natural Beppu→Yufuin approach. Do it before entering town.'},
 'Kinrin Lake · east / south shore':{duration:'25 min',see:'Walk enough shoreline to see reflections, wooded edges and the small lake structures from more than one angle.',photo:'Low shoreline foreground + Mt. Yufu/trees; early quiet is the value.',practical:'Park once for the Yufuin core and keep the group moving.'},
 'Tenso Shrine · lakeside torii':{duration:'10 min',see:'Tiny wooded shrine and torii at the water edge.',photo:'Torii framed by lake/trees; vertical frame works well.',practical:'Part of the Kinrin loop, not a separate drive.'},
 'Kinrin west shore / Yunotsubo approach':{duration:'10 min',see:'Finish the lake loop and transition naturally into town.',photo:'Use narrow lanes and water/greenery details.',practical:'No café stop yet.'},
 'Yunotsubo Kaido':{duration:'30–35 min',see:'Main Yufuin lane, side streets, snacks, small shops and repeated Mt. Yufu views.',photo:'Look for the mountain appearing above low rooftops rather than only storefront photos.',practical:'Shopping is secondary; keep walking west.'},
 'Yufuin Station axis · Mt. Yufu view':{duration:'10–15 min',see:'The long straight town axis and station architecture with Mt. Yufu behind.',photo:'Centered street/mountain composition when traffic allows.',practical:'Turn back on time so Floral Village opening does not become a 30-minute delay.'},
 'Yufuin side lanes / fast breakfast':{duration:'15 min',see:'Use quieter side streets and grab one local breakfast/snack.',photo:'Small-town texture only.',practical:'To-go food; no sit-down wait.'},
 'Yufuin Floral Village · opening pass':{duration:'15–20 min',see:'One compact loop of whimsical English-style lanes and themed storefronts.',photo:'Tight compositions work better than trying to show the whole place.',practical:'Official opening 09:30. Leave by ~09:50.'},
 'Depart Yufuin south on Yamanami':{duration:'Drive',see:'The scenic road begins immediately; mountain shoulders and pasture are part of the day.',photo:'Passenger shots only unless at a legal pullout.',practical:'Next map pin should be the bridge or Chojabaru, not Takachiho.'},
 'Kokonoe Yume Otsurihashi':{duration:'30–40 min',see:'Cross enough of the 390 m bridge to see the gorge, Shindo waterfall and Kuju ridges.',photo:'Bridge deck leading into mountain layers; gorge straight down if comfortable with heights.',practical:'September hours 08:30–18:00. First cut if late or visibility is poor.'},
 'Chojabaru · Tadewara Wetlands':{duration:'25–30 min',see:'Short boardwalk into one of Japan’s major mid-altitude marshes beneath the Kuju range.',photo:'Boardwalk as a leading line toward the mountain wall.',practical:'Do only the short boardwalk section today, not the full 45-minute loop.'},
 'Chojabaru Visitor Center / restroom reset':{duration:'5 min',see:'Route map / quick look at local terrain.',photo:'None.',practical:'Bathrooms, water, then leave.'},
 'Makinoto Pass · first lookout':{duration:'10–15 min',see:'Climb to the first viewpoint for a close high-elevation Kuju panorama.',photo:'Layer the ridges and road below.',practical:'Do not accidentally start the hiking trail.'},
 'Kuju highland road pullouts':{duration:'Drive + 1–2 micro-stops',see:'Rolling grassland, open sky and changing Kuju mountain angles.',photo:'Use signed pullouts only.',practical:'Each unscheduled stop gets a five-minute ceiling.'},
 'Senomoto Plateau / Rest House':{duration:'10 min',see:'Massive plateau views at the Oita/Kumamoto transition.',photo:'Wide grassland and mountain layers.',practical:'Restroom / drink / soft-serve if immediate.'},
 'Kurokawa Onsen · main public parking':{duration:'Parking',see:'Leave the car outside the tight ryokan core.',photo:'None.',practical:'Official guidance recommends the large public lot when the center is busy.'},
 'Kaze no Ya / village entrance':{duration:'5 min',see:'Start of the steep, wooded ryokan village.',photo:'Signage/cedar/stone texture.',practical:'Do not spend time shopping here.'},
 'Kurokawa river lanes':{duration:'20 min',see:'The best part of Kurokawa: cedar ryokan, stone walls, steam, narrow lanes and river crossings.',photo:'Shoot down the valley through bridge/ryokan layers.',practical:'No bath today.'},
 'Marurin Bridge':{duration:'8–10 min',see:'Compact river-level viewpoint through the heart of the ryokan valley.',photo:'Vertical bridge/river framing.',practical:'Walk it as part of the same loop.'},
 'Jizoyu / lower-lane texture':{duration:'8–10 min',see:'Older public-bath / lantern / river lane atmosphere.',photo:'Details over wide shots.',practical:'Turn around on time; Daikanbo is the next hard priority.'},
 'Leave Kurokawa for Daikanbo':{duration:'Departure',see:'Nothing else in Kurokawa earns Aso daylight.',photo:'None.',practical:'Be back at the car by ~14:00.'},
 'Daikanbo Lookout':{duration:'30 min',see:'Walk all the way beyond the first rail to the outer point for the full caldera bowl and Aso Five Peaks.',photo:'One wide caldera shot and one compressed “sleeping Buddha” peaks shot.',practical:'MUST even if cloud is moving through; conditions can open quickly.'},
 'Aso Milk Road · rim drive':{duration:'Scenic drive',see:'Open northern-rim grasslands with the caldera falling away beside you.',photo:'Passenger shots / legal pullouts only.',practical:'Stay on Route 339 until Kabutoiwa.'},
 'Kabutoiwa Observatory':{duration:'10–15 min',see:'Second, more intimate caldera angle directly off Milk Road.',photo:'Frame the caldera floor with grass in foreground.',practical:'Short paved access + 24h toilets.'},
 'Descend toward Aso volcanic core':{duration:'Scenic drive',see:'Watch the landscape change from rim grassland to central cones/pasture.',photo:'Experience this from the road.',practical:'Do not follow fastest-route shortcuts that skip Komezuka.'},
 'Komezuka roadside viewpoint':{duration:'8–10 min',see:'The near-perfect green cinder cone in pasture.',photo:'Simple cone + pasture composition.',practical:'Only stop where parking/pullout is legal.'},
 'Aso Panorama Line · volcanic approach':{duration:'Scenic drive',see:'Volcanic slopes, pasture and the approach to Kusasenri.',photo:'Passenger shots unless parked.',practical:'This is a protected route segment.'},
 'Kusasenri · meadow walk':{duration:'35–45 min',see:'Actually walk into the meadow: ponds, horses if present, huge grassland and volcanic backdrop.',photo:'Person/horse for scale, then one wide frame with the crater-side peaks.',practical:'Paid parking across from the museum. This is the longest Aso stop.'},
 'Kusasenri overlook / volcano-museum side':{duration:'8–10 min',see:'Elevated angle back across the entire meadow before leaving.',photo:'Best overview composition of the Kusasenri bowl.',practical:'No museum interior today.'},
 'Nakadake crater road · DO NOT ENTER RESTRICTED ZONE':{duration:'0–10 min',see:'Only whatever view the currently open mountain-top area legally allows.',photo:'Only from open signed areas.',practical:'Level 2 means the roughly 1 km crater zone is closed. Barriers and officials override this itinerary.'},
 'Aso Panorama Line south descent':{duration:'Scenic drive',see:'South-side views opening toward Minamiaso.',photo:'Passenger shots and designated pullouts.',practical:'This is the correct direction toward Takamori/Takachiho.'},
 'Shirakawa Suigen · daylight only':{duration:'15–20 min',see:'Clear spring water erupting from the ground beneath forest and shrine trees.',photo:'Reflections and water clarity; polarizer if you happen to have one.',practical:'FLEX. Cut immediately if daylight/clock is gone.'},
 'Tsukimawari Park · Mt. Neko view':{duration:'10 min',see:'Open lawn with one of the cleanest views of jagged Nekodake.',photo:'Low grass foreground + mountain wall.',practical:'Only worth stopping with usable light.'},
 'Takamori → Route 325':{duration:'10 min max',see:'Last small-town fuel/convenience reset.',photo:'No photo mission.',practical:'Do not go to Kamishikimi tonight; it is scheduled tomorrow morning.'},
 'Route 325 → Takachiho':{duration:'50–65 min',see:'Mountain-road transition into Miyazaki.',photo:'No roadside stops after dark.',practical:'Expect short construction holds. Stay on signed National 325 and avoid local-road shortcuts.'},
 'Takachiho Airbnb · Mitai':{duration:'Arrival',see:'Check in and reset.',photo:'None.',practical:'Charge X100VI batteries, clear card space and prep for the early gorge/shrine morning.'}
});
})();