(()=>{
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
const D=date=>T.days.find(d=>d.date===date);
T.version='final-tool-80';T.audited='2026-09-14';
T.sourceNotes=[
  'Sep 23 is locked WITH Itoshima before returning to Fukuoka Airport for the friend pickup, then Yufuin and Beppu.',
  'Sep 24 sleeps at the booked Takachiho Airbnb after Yamanami, Kuju, Kurokawa and Aso.',
  'Sep 25 has NO Takachiho rowboat reservation. Use the morning for gorge viewpoints and the shrine cluster.',
  'Himeji is Sep 26. Hiroshima, Miyajima, Onomichi, Ine/Amanohashidate, Yokohama and Hakone/Fuji stay out unless deliberately re-added.'
];

const d23=D('2026-09-23');
if(d23){
  d23.city='Nagasaki → Itoshima → Fukuoka Airport → Yufuin → Beppu';
  d23.mission='Take the earliest useful rail to Hakata, collect the rental car, run a disciplined Itoshima coast-and-waterfall loop, return to Fukuoka Airport before the friend pickup, then chase daylight to Yufuin and finish in Beppu.';
  d23.alerts=[{k:'info',t:'Locked Sep 23 flow',x:'Itoshima is IN before the airport pickup. Protect the airport return target and Yufuin daylight; cut Itoshima depth before either of those.'}];
  d23.zones=[
    {name:'Nagasaki → rental car → Itoshima',time:'05:40–12:05',summary:'Use the earliest rail window to create a real Itoshima loop before returning to the airport. Keep the loop fast and scenic, not café-heavy.',cut:'If behind: Shiraito first, then shorten Keya. Protect Futamigaura, the airport return and friend pickup.',image:'Sakurai Futamigaura',stops:[
      ['05:40','Wake / check out Nagasaki','LOGISTICS','MUST','7-18 Gotomachi Nagasaki Japan',null,null,null,'Be fully packed the night before. Breakfast to-go.'],
      ['06:17','KAMOME · Nagasaki → Takeo-Onsen','TRAIN','MUST','Nagasaki Station, Nagasaki, Japan',32.7523,129.8704,'Nishi Kyushu Shinkansen','Use the early connection. Reserved seats are smart during the holiday period.'],
      ['06:52','Relay KAMOME · Takeo-Onsen → Hakata','TRAIN','MUST','Hakata Station, Fukuoka, Japan',33.5903,130.4206,'Hakata Station','Follow the timed transfer signs at Takeo-Onsen and keep moving.'],
      ['08:05','Fukuoka Airport · rental pickup','LOGISTICS','MUST','Fukuoka Airport, Fukuoka, Japan',33.5859,130.4508,'Fukuoka Airport','Subway to the airport, rental shuttle/paperwork, ETC card and driver docs. Target wheels rolling around 08:30–08:45.'],
      ['09:25','Sakurai Futamigaura','COAST','MUST','Sakurai Futamigaura, Itoshima, Fukuoka, Japan',33.64016,130.19669,'Sakurai Futamigaura','White torii, Meoto Iwa and the Genkai Sea. Park, walk the beach edge, shoot, leave.'],
      ['10:25','Keya no Oto · land lookout / forest approach','NATURE','HIGH','Keya no Oto, Itoshima, Fukuoka, Japan',33.59645,130.10760,'Keya no Oto','Basalt coast and forest approach. No boat excursion today; you need control of the clock.'],
      ['11:25','Shiraito Falls','NATURE','HIGH','Shiraito Falls Itoshima, Fukuoka, Japan',33.48008,130.17549,'Shiraito Falls (Fukuoka)','Fast 24 m waterfall contrast after the coast. Hard leave around noon.'],
      ['12:05','Drive back to Fukuoka Airport','DRIVE','MUST','Fukuoka Airport, Fukuoka, Japan',33.5859,130.4508,'Fukuoka Airport','Traffic buffer is intentional. Do not add cafés or a fourth Itoshima attraction.']
    ]},
    {name:'Airport pickup → Yufuin',time:'13:00–18:25',summary:'Return early, meet the friend around 2 PM, reorganize luggage, then go directly east. Yufuin is a daylight mission.',cut:'Long airport meal → Yufuin shopping → Floral Village → station-axis photos → Sagiridai. Never cut Kinrin/Tenso or the pickup buffer.',image:'Yufuin',food:[['Milch Yufuin','Milch Yufuin, Oita, Japan','Quick cheesecake/pudding if there is no line.'],['B-speak','B-speak Yufuin, Oita, Japan','Roll cake only if it is immediate and still available.']],stops:[
      ['13:00','Airport buffer / friend pickup','LOGISTICS','MUST','Fukuoka Airport, Fukuoka, Japan',33.5859,130.4508,'Fukuoka Airport','Restroom, quick food, reorganize luggage and meet the friend without stress.'],
      ['15:00','Drive Fukuoka Airport → Yufuin','DRIVE','MUST','Kinrin Lake, Yufuin, Oita, Japan',33.2647,131.3690,'Yufuin','Expressway east. No unnecessary stops until the Yufuin basin.'],
      ['16:30','Kinrin Lake','NATURE','MUST','Kinrin Lake, Yufuin, Oita, Japan',33.2647,131.3690,'Yufuin','Lake first while light is strongest. Walk the useful edge and look back toward Mt. Yufu.'],
      ['16:55','Tenso Shrine','SHRINE','MUST','Tenso Shrine Yufuin, Oita, Japan',33.2642,131.3709,null,'Tiny lakeside shrine with the water-edge torii. Nearly free value beside Kinrin.'],
      ['17:10','Yufuin Floral Village','PHOTO','FLEX','Yufuin Floral Village, Oita, Japan',33.2662,131.3671,null,'Fast whimsical photo loop. Not an official Studio Ghibli attraction.'],
      ['17:25','Yunotsubo Kaido + Mt. Yufu street views','NEIGHBORHOOD','HIGH','Yunotsubo Kaido Yufuin, Oita, Japan',33.2669,131.3651,null,'Walk atmosphere and snacks while using gaps between roofs for the Mt. Yufu backdrop. Serious shopping is expendable.'],
      ['17:50','Yufuin Station axis · Mt. Yufu view','PHOTO','FLEX','Yufuin Station, Oita, Japan',33.2620,131.3559,'Yufuin Station','Use the long straight station-front axis for a town-scale view back toward Mt. Yufu if the light still works.'],
      ['18:05','Sagiridai Overlook · last light only','VIEW','FLEX','Sagiridai Observatory Yufuin, Oita, Japan',33.2535,131.3515,'Yufuin','Drive-up basin panorama on the Beppu side. Do it only if you are already moving and visibility is good.'],
      ['18:25','Drive Yufuin → Beppu','DRIVE','MUST','3-2-15 Kitahama, Beppu, Oita 874-0920, Japan',33.2819,131.5053,'Beppu','Twilight transfer. Do not rush the mountain road after dark.']
    ]},
    {name:'Beppu night · Kitahama + Kannawa',time:'19:10–late',summary:'Check in first, then use darkness for Beppu atmosphere: steam lanes, geothermal food and an onsen. Save daylight for tomorrow’s mountain road.',cut:'Extra night viewpoint and any long restaurant line before sleep.',image:'Beppu Onsen',food:[['Jigokumushi Kobo Kannawa','Jigokumushi Kobo Kannawa, Beppu, Oita, Japan','Geothermal steam cooking if the wait is reasonable.'],['Toyotsune','Toyotsune Beppu, Oita, Japan','Toriten option closer to Kitahama.']],stops:[
      ['19:10','Beppu Airbnb · Kitahama','HOME','MUST','3-2-15 Kitahama, Beppu, Oita 874-0920, Japan',33.2819,131.5053,null,'Check in, drop luggage and reset.'],
      ['19:45','Kannawa steam lanes','NEIGHBORHOOD','HIGH','Kannawa Onsen, Beppu, Oita, Japan',33.3196,131.4757,'Beppu Onsen','Steam rising through residential lanes is the signature after-dark Beppu atmosphere.'],
      ['20:20','Jigoku-mushi / onsen','FOOD','MUST','Jigokumushi Kobo Kannawa, Beppu, Oita, Japan',33.3199,131.4750,null,'Eat and soak without turning the night into another long sightseeing circuit.']
    ]}
  ];
}

const d24=D('2026-09-24');
if(d24){
  d24.alerts=[
    {k:'warning',t:'Aso Alert Level 2',x:'JMA lowered Aso to Level 2 on Sep 1. The roughly 1 km crater zone remains restricted; the mountain-top plaza is accessible after safety checks, but do not plan crater viewing.'},
    {k:'info',t:'Signature road day',x:'Protect Yamanami Highway → Chojabaru/Tadewara → Makinoto → Kurokawa → Daikanbo → Milk Road → Aso Panorama Line → Kusasenri → Takachiho.'}
  ];
}

const d25=D('2026-09-25');
if(d25){
  d25.city='Takachiho → Kamishikimi → Fukuoka → Osaka';
  d25.mission='Use the no-boat morning to over-achieve on Takachiho Gorge and the shrine cluster, then protect Kamishikimi, the rental-car return and Osaka Friday night.';
  d25.alerts=[
    {k:'warning',t:'Takachiho promenade closure',x:'The official Sep 3 notice says the gorge promenade is closed after heavy rain, while access to the Manai Falls viewing platform remains possible. Recheck immediately before Sep 25 and obey posted detours.'},
    {k:'info',t:'No rowboat',x:'There is no boat reservation. No boat time is allocated anywhere in the day.'}
  ];
  d25.zones[0]={name:'Takachiho gorge + shrine morning',time:'06:15–09:05',summary:'Start before crowds, read the live closure board, use only open viewpoints, then use the freed boat time for the town shrine cluster.',cut:'Takamagahara first, then shorten extra gorge angles. Never cut Manai Falls, Takachiho Shrine or the westbound departure.',image:'Takachiho Gorge',stops:[
    ['06:15','Takachiho Airbnb → gorge parking','DRIVE','MUST','Takachiho Gorge P2 Araragi Parking Lot, Miyazaki, Japan',32.7006,131.3016,'Takachiho Gorge','Leave with camera, water and good shoes. Use the first practical open lot.'],
    ['06:25','Official closure / detour board','LOGISTICS','MUST','Takachiho Gorge, Miyazaki, Japan',32.7032,131.3014,null,'Current posted access beats every saved route.'],
    ['06:35','Three Bridges viewpoint','PHOTO','HIGH','Takachiho Three Bridges Viewpoint, Miyazaki, Japan',32.7022,131.3034,'Takachiho Gorge','Layer the three bridges while the gorge is quiet.'],
    ['06:50','Columnar basalt / gorge geology','NATURE','HIGH','Takachiho Gorge, Miyazaki, Japan',32.7014,131.3023,'Takachiho Gorge','Use open rim viewpoints for the vertical basalt walls and river.'],
    ['07:10','Manai Falls viewing platform','PHOTO','MUST','Manai Falls, Takachiho, Miyazaki, Japan',32.702106,131.301025,'Takachiho Gorge','This is the visual anchor without the boat. Spend real time here from above.'],
    ['07:35','Open gorge edges / signed detour','WALK','HIGH','Takachiho Gorge, Miyazaki, Japan',32.7006,131.3016,'Takachiho Gorge','Use only signed open paths or official roadway detours.'],
    ['08:00','Takachiho Shrine','SHRINE','MUST','Takachiho Shrine, Miyazaki, Japan',32.7104,131.3079,'Takachiho Shrine','Old cedar setting and the main town shrine.'],
    ['08:30','Kushifuru Shrine','SHRINE','HIGH','Kushifuru Shrine, Takachiho, Miyazaki, Japan',32.70993,131.31452,null,'Wooded mythology stop on the Tenson-korin peak.'],
    ['08:50','Takamagahara Yohaisho','SHRINE','FLEX','Takamagahara Yohaisho, Takachiho, Miyazaki, Japan',32.70999,131.31488,null,'Very short companion stop; first shrine item to cut.'],
    ['09:05','Depart Takachiho','DRIVE','MUST','Kamishikimi Kumanoimasu Shrine, Takamori, Kumamoto, Japan',32.8047,131.1755,'Kamishikimi Kumanoimasu Shrine','Hard westbound departure for Kamishikimi and Fukuoka.']
  ]};
  d25.zones.slice(1).forEach(z=>{z.stops=z.stops.filter(s=>!/rowboat|boat reception|takachiho boat/i.test((s[1]||'')+' '+(s[8]||'')));});
  const z=d25.zones.find(z=>/Kamishikimi/i.test(z.name));
  if(z){const times={'Kamishikimi Kumanoimasu Shrine':'10:00','Ugeto-Iwa · dry/ahead only':'10:40','Drive to Fukuoka Airport':'11:00','Fuel + rental return':'13:45','Airport → Hakata Station':'14:30','Hakata → Shin-Osaka':'15:30','Osaka Airbnb · Shimanouchi':'18:30'};z.time='10:00–18:30';z.stops.forEach(s=>{if(times[s[1]])s[0]=times[s[1]]});}
}

const d26=D('2026-09-26');if(d26){d26.alerts=[{k:'info',t:'Himeji verified hours',x:'Current official 2026 hours are 09:00–17:00 with last entry at 16:00. Enter at opening; the keep has steep stairs and no elevators.'}];}
const d02=D('2026-10-02');if(d02){d02.alerts=[...(d02.alerts||[]),{k:'info',t:'Borderless Oct 2',x:'Official current hours for Oct 2 are 08:30–22:00, with last entry one hour before closing. Keep the ~16:30 target for the Friday flow.'}];}

T.days.forEach(d=>{const l=d.sleep&&T.lodgings[d.sleep];if(!l)return;d.zones.forEach(z=>z.stops.forEach(s=>{if(s[2]==='HOME')s[4]=l.address;}));});
})();