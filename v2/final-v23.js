(function(){
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
T.version='2.3-final-walk-audited';T.audited='2026-09-14';
const day=date=>T.days.find(d=>d.date===date);
const addNote=n=>{T.sourceNotes=T.sourceNotes||[];if(!T.sourceNotes.includes(n))T.sourceNotes.push(n)};
T.sourceNotes=(T.sourceNotes||[]).filter(n=>!/boat|rowboat/i.test(n));
addNote('Sep 25 Takachiho is now a foot-first morning. No boat time is scheduled. The freed time is used for the gorge promenade, Manai Falls overlook, Three Bridges, mythic rock/basalt features, Takachiho Shrine, Kushifuru Shrine and Takamagahara Yohaisho.');
addNote('Takachiho Gorge has a partial promenade closure with an official detour. Follow the posted detour on the day; the itinerary does not depend on a closed segment.');
addNote('The official 2026 Takachiho Gorge shuttle runs Sep 19-23 in September, not Sep 25. Plan to self-park and walk.');
const sep25=day('2026-09-25');
if(sep25){
  sep25.city='Takachiho on foot → Kamishikimi → Fukuoka → Osaka';
  sep25.mission='Use the no-boat morning to actually explore Takachiho: walk the gorge deeply while it is quiet, then add the compact mythic shrine cluster before Kamishikimi, rental return and Osaka Friday night.';
  sep25.alerts=(sep25.alerts||[]).filter(a=>!/boat|rowboat|kunimigaoka/i.test((a.t||'')+' '+(a.x||'')));
  sep25.alerts.unshift(
    {k:'warning',t:'Walk the posted gorge detour',x:'The official tourism association still lists a partial promenade closure with a signed detour. Do not try to force the closed section; the core gorge viewpoints remain the priority.'},
    {k:'info',t:'No Sep 25 shuttle',x:'The 2026 gorge shuttle runs Sep 19-23 in September, not Sep 25. Self-park early; P2 Araragi is the practical walking start for this plan.'},
    {k:'info',t:'No boat — by design',x:'There is no boat reservation. The morning is intentionally rebuilt around the ~1 km gorge promenade plus Takachiho’s mythic shrine cluster on foot.'}
  );
  sep25.officialChecks=[
    ['Takachiho Gorge · official','https://www.takachiho-kanko.info/sightseeing/18/'],
    ['Promenade detour · official','https://takachiho-kanko.info/news/167/'],
    ['Takachiho map / brochure','https://www.takachiho-kanko.info/guide/']
  ];
  sep25.zones[0]={
    name:'Takachiho on foot · gorge + mythic town',time:'06:15–09:20',
    summary:'Park once early and use the quiet morning properly. Walk the official gorge promenade/detour for the basalt walls, Three Bridges, Onihachi rock and Manai Falls, then move to the compact Takachiho Shrine → Kushifuru → Takamagahara cluster before leaving town.',
    cut:'If behind: cut Takamagahara first, then shorten shrine dwell. Never cut the gorge core, Manai Falls, safe departure buffer or Kamishikimi.',image:'Takachiho Gorge',
    food:[['Breakfast to-go','Takachiho convenience store Miyazaki Japan','Buy breakfast/water the night before. Do not wait for a sit-down breakfast on this morning.']],
    stops:[
      ['06:15','Takachiho Airbnb → P2 Araragi','DRIVE','MUST','Takachiho Gorge P2 Araragi Parking Lot, Miyazaki, Japan',32.7054456,131.2974317,null,'Leave with only camera, water and a light layer. P2 is the practical early start for the walking line.'],
      ['06:25','P2 Araragi · start the official promenade/detour','LOGISTICS','MUST','Takachiho Gorge P2 Araragi Parking Lot, Miyazaki, Japan',32.7054456,131.2974317,null,'Read the posted closure/detour board before committing to the path. Follow the official route even if a map app suggests otherwise.'],
      ['06:35','Takachiho Three Bridges viewpoint','PHOTO','MUST','Takachiho Three Bridges Viewpoint, Miyazaki, Japan',32.7022,131.3034,null,'Get the layered arch-bridge composition while the gorge is still quiet.'],
      ['06:48','Onihachi’s Rock · gorge legends','NATURE','HIGH','鬼八の力石 高千穂峡, Miyazaki, Japan',null,null,null,'Quick myth/landscape stop on the promenade; do not turn it into a long pause.'],
      ['06:58','Columnar basalt · Senin no Byobuiwa','NATURE','MUST','仙人の屏風岩 高千穂峡, Miyazaki, Japan',null,null,null,'Look up at the vertical columnar joints and the deep V-shaped gorge — this is the geology that makes Takachiho special.'],
      ['07:12','Manai Falls overlook','PHOTO','MUST','Manai Falls, Takachiho, Miyazaki, Japan',32.702106,131.301025,'Takachiho Gorge','Spend real time here from above. Without the boat, work multiple rail/upper angles instead of one rushed photo.'],
      ['07:35','Lower gorge / water-level edges that are OPEN','WALK','HIGH','Takachiho Gorge, Miyazaki, Japan',32.7006,131.3016,'Takachiho Gorge','Use only open signed paths. Look for water color, basalt texture and bridge/fall framing; do not enter any closed section.'],
      ['07:55','Restroom + quick breakfast / reposition','BUFFER','HIGH','Takachiho Gorge, Miyazaki, Japan',32.7006,131.3016,'Takachiho Gorge','Ten to fifteen minutes to reset, then leave the gorge before tour-bus pressure builds.'],
      ['08:12','Takachiho Shrine','SHRINE','MUST','Takachiho Shrine, Miyazaki, Japan',32.7064116,131.3019862,'Takachiho Shrine','Old cedar atmosphere and the main town shrine. Keep this contemplative but efficient.'],
      ['08:38','Kushifuru Shrine','SHRINE','HIGH','Kushifuru Shrine, Takachiho, Miyazaki, Japan',32.7099346,131.3145174,null,'Walk the wooded approach to the shrine on the legendary Tenson-korin peak. This is a better use of the freed boat time than another generic photo stop.'],
      ['08:55','Takamagahara Yohaisho','SHRINE','HIGH','Takamagahara Yohaisho, Takachiho, Miyazaki, Japan',32.7099907,131.3148768,null,'Short continuation beside Kushifuru. Mythic viewpoint/prayer site; use the same parking area and keep the pair compact.'],
      ['09:12','Back to car · depart Takachiho','MOVE','MUST','Kushifuru Shrine, Takachiho, Miyazaki, Japan',32.7099346,131.3145174,null,'Hard departure. Amano-Iwato is intentionally not forced today because the shrine+cave branch can consume the return buffer.']
    ]
  };
  const transit=sep25.zones.find(z=>/Kamishikimi/i.test(z.name));
  if(transit){
    transit.time='10:05–18:30';transit.summary='Kamishikimi is the protected forest shrine. The no-boat morning gives you a healthier car-return buffer; do not spend that buffer on another long detour.';transit.cut='Ugeto-Iwa first, then any food stop. Never sacrifice fuel/rental-return or the Osaka Friday-night arrival.';
    const byName={};transit.stops.forEach(s=>byName[s[1]]=s);
    if(byName['Kamishikimi Kumanoimasu Shrine'])byName['Kamishikimi Kumanoimasu Shrine'][0]='10:05';
    if(byName['Ugeto-Iwa · dry/ahead only'])byName['Ugeto-Iwa · dry/ahead only'][0]='10:45';
    if(byName['Drive to Fukuoka Airport'])byName['Drive to Fukuoka Airport'][0]='11:05';
    if(byName['Fuel + rental return'])byName['Fuel + rental return'][0]='13:45';
    if(byName['Airport → Hakata Station'])byName['Airport → Hakata Station'][0]='14:30';
    if(byName['Hakata → Shin-Osaka'])byName['Hakata → Shin-Osaka'][0]='15:30';
    if(byName['Osaka Airbnb · Shimanouchi'])byName['Osaka Airbnb · Shimanouchi'][0]='18:30';
  }
}
const official=(date,items)=>{const d=day(date);if(d)d.officialChecks=items};
official('2026-09-22',[['Glover Garden hours','https://glover-garden.jp/event-and-news/26532/'],['Atomic Bomb Museum','https://nabmuseum.jp/'],['Nagasaki Ropeway','https://www.at-nagasaki.jp/spot/168']]);
official('2026-09-24',[['JMA volcano status','https://www.jma.go.jp/bosai/map.html#contents=volcano'],['Aso access','https://www.aso-volcano.jp/eng/'],['NEXCO West roads','https://www.w-nexco.co.jp/']]);
official('2026-09-26',[['Himeji Castle','https://www.himejicastle.jp/en/']]);
official('2026-09-29',[['teamLab Biovortex Kyoto','https://www.teamlab.art/e/kyoto/']]);
official('2026-09-30',[['teamLab Planets','https://teamlabplanets.dmm.com/en']]);
official('2026-10-01',[['Tobu Nikko','https://www.tobu.co.jp/en/'],['Tobu limited express','https://www.tobu.co.jp/en/express_info/purchase/']]);
official('2026-10-02',[['teamLab Borderless','https://www.teamlab.art/e/tokyo/']]);
official('2026-10-03',[['Shibuya Sky tickets','https://www.shibuya-scramble-square.com/sky/ticket/']]);
official('2026-10-04',[['Tokyo Skytree Oct 4 hours','https://www.tokyo-skytree.jp/open-hours/20261004/']]);
T.curatedPhotos={
  'takachiho':{file:'Manai Falls at Takachiho Gorge.jpg',credit:'The Modern Polymath',license:'CC BY-SA 4.0',source:'https://commons.wikimedia.org/wiki/File:Manai_Falls_at_Takachiho_Gorge.jpg'},
  'himeji':{file:'Himeji castle in may 2015.jpg',credit:'Niko Kitsakis',license:'CC BY-SA 4.0',source:'https://commons.wikimedia.org/wiki/File:Himeji_castle_in_may_2015.jpg'},
  'arashiyama':{file:'Bamboo Grove, Arashiyama, Kyoto, Japan.jpg',credit:'Basile Morin',license:'CC BY-SA 4.0',source:'https://commons.wikimedia.org/wiki/File:Bamboo_Grove,_Arashiyama,_Kyoto,_Japan.jpg'},
  'shibuya':{file:'Shibuya Crossing.jpg',credit:'Landry Miguel',license:'CC BY-SA 4.0',source:'https://commons.wikimedia.org/wiki/File:Shibuya_Crossing.jpg'},
  'kusasenri':{file:'Kusasenri01.jpg',credit:'STA3816',license:'CC BY-SA 3.0',source:'https://commons.wikimedia.org/wiki/File:Kusasenri01.jpg'},
  'kamakura':{file:'JP-kamakura-daibutsu-2.jpg',credit:'Bgabel',license:'CC BY-SA 3.0',source:'https://commons.wikimedia.org/wiki/File:JP-kamakura-daibutsu-2.jpg'},
  'nikko':{file:'Nikko Toshogu Yomeimon Gate 2024.jpg',credit:'Jpatokal',license:'CC BY-SA 4.0',source:'https://commons.wikimedia.org/wiki/File:Nikko_Toshogu_Yomeimon_Gate_2024.jpg'},
  'dotonbori':{file:'Dotonbori, Osaka, at night, November 2016.jpg',credit:'Martin Falbisoner',license:'CC BY-SA',source:'https://commons.wikimedia.org/wiki/File:Dotonbori,_Osaka,_at_night,_November_2016.jpg'},
  'inasa':{file:'Nagasaki City view from Mt Inasa04s.jpg',credit:'663highland',license:'CC BY 2.5',source:'https://commons.wikimedia.org/wiki/File:Nagasaki_City_view_from_Mt_Inasa04s.jpg'},
  'kiyomizu':{file:'Kiyomizu-dera, Kyoto, November 2016 -01.jpg',credit:'Martin Falbisoner',license:'CC BY-SA',source:'https://commons.wikimedia.org/wiki/File:Kiyomizu-dera,_Kyoto,_November_2016_-01.jpg'}
};
})();