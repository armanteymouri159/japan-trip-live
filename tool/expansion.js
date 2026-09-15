(()=>{
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
const D=date=>T.days.find(d=>d.date===date);
const S=(time,name,type,priority,query,lat,lng,wiki,desc)=>[time,name,type,priority,query,lat,lng,wiki,desc];
const Z=(name,time,summary,cut,image,stops,food=[])=>({name,time,summary,cut,image,stops,food});

// Day-level transport profile: this is what the traveler should assume before opening any stop.
window.JAPAN_DAY_TRANSPORT={
'2026-09-22':{label:'NO CAR',detail:'Airport bus + Nagasaki tram + walking + strategic taxis. Do not plan any rental-car movement today.'},
'2026-09-23':{label:'TRAIN → RENTAL CAR',detail:'Rail Nagasaki→Hakata, subway to Fukuoka Airport, pick up the rental car, then Itoshima → airport → Yufuin → Beppu by car.'},
'2026-09-24':{label:'RENTAL CAR',detail:'All-day Kyushu road trip. Mountain-road estimates are conservative; stop only at legal pullouts.'},
'2026-09-25':{label:'CAR → SHINKANSEN',detail:'Rental car Takachiho→Kamishikimi→Fukuoka, return the car, then rail to Osaka. No car in Osaka.'},
'2026-09-26':{label:'TRAINS + WALKING',detail:'No car. Shinkansen/JR for Himeji and Kobe, then Osaka Metro/JR + walking. Kobe is intentionally compact so Osaka gets the afternoon/night.'},
'2026-09-27':{label:'TRAIN + WALK + TAXI',detail:'No car. Train Osaka→Kyoto; use rail/Randen/taxi for long cross-city moves and walk the dense sightseeing clusters.'},
'2026-09-28':{label:'WALK + TAXI + TRAIN',detail:'No car. Walk Higashiyama clusters; taxi the inefficient cross-city hops. Avoid losing time sitting on crowded buses.'},
'2026-09-29':{label:'TRAIN + SUBWAY + WALK',detail:'No car. Dawn Fushimi by train, teamLab, Shinkansen to Tokyo, then Tokyo rail/walking.'},
'2026-09-30':{label:'SUBWAY + WALK',detail:'No car. Tokyo Metro/Yurikamome + walking; keep transfers short and stay on the bay→Ginza→Marunouchi line.'},
'2026-10-01':{label:'TRAIN + NIKKO BUS + WALK',detail:'No car. Limited express/JR to Nikko, local bus to Lake Chuzenji, then bus back to the shrine district and walk.'},
'2026-10-02':{label:'JR + ENODEN + WALK',detail:'No car. JR to Kamakura, Enoden for Hase/beaches, JR back to Tokyo, then subway to Azabudai/Roppongi.'},
'2026-10-03':{label:'WALK + SUBWAY',detail:'No car. Harajuku→Omotesando is mostly walking; use a short train/taxi for Daikanyama/Nakameguro and Shibuya.'},
'2026-10-04':{label:'SUBWAY + WALK',detail:'No car. Asakusa/Ueno/Yanaka are linked by short rail/taxi hops and long walking clusters; finish Skytree/Akihabara.'},
'2026-10-05':{label:'TRAIN / TAXI TO AIRPORT',detail:'Departure day. Airport and flight time still control everything; only add final Tokyo stops if the departure buffer is safe.'}
};

// Fix Nagasaki semantic transport so directions never imply a car.
const d22=D('2026-09-22');
if(d22){
  d22.alerts=[...(d22.alerts||[]),{k:'info',t:'Nagasaki transport',x:'No car today. Use the airport bus, tram/walking inside the city, and taxis only for the steep/time-expensive hill transfers.'}];
  for(const z of d22.zones){for(const s of z.stops){
    if(s[1]==='Nagasaki Airport')s[2]='MOVE';
    if(/Station · lockers|Station · retrieve bags/.test(s[1]))s[2]='MOVE';
  }}
}

// Osaka arrival: bars are part of the locked Friday plan.
const d25=D('2026-09-25');
if(d25){
  const exists=d25.zones.some(z=>/Dotonbori|Osaka Friday/i.test(z.name));
  if(!exists)d25.zones.push(Z('Osaka Friday arrival → Dotonbori bars','18:30–late','Drop bags and immediately switch from logistics to Osaka night. This is not a sightseeing museum block; it is food, neon, alleys and bars.','If the train is late, cut Amerikamura first. Keep Dotonbori, Hozenji and at least one bar cluster.','Dotonbori',[
    S('18:30','Osaka Airbnb · Shimanouchi','HOME','MUST','2 Chome-4-15 Shimanouchi, Chuo Ward, Osaka, Japan',34.6711,135.5082,null,'Drop luggage, change, leave again. Do not lose Friday night unpacking.'),
    S('19:10','Dotonbori · Ebisu Bridge + Glico','NIGHTLIFE','MUST','Ebisu Bridge Dotonbori Osaka',34.6687,135.5013,'Dōtonbori','First neon hit: canal, Glico view and the pedestrian crush.'),
    S('19:40','Hozenji Yokocho + Hozenji','NEIGHBORHOOD','HIGH','Hozenji Yokocho Osaka',34.6686,135.5030,null,'Lantern stone alley and moss-covered Fudo statue; fast atmospheric contrast to Dotonbori.'),
    S('20:10','Ura Namba','FOOD','HIGH','Ura Namba Osaka',34.6659,135.5034,null,'Dense izakaya and standing-bar zone. Eat here rather than committing to one long formal dinner.'),
    S('21:30','Dotonbori / Soemoncho bar crawl','NIGHTLIFE','MUST','Soemoncho Osaka',34.6694,135.5044,null,'Bars first night. Keep the group together and use cover-charge judgment.'),
    S('23:30','Amerikamura · optional late branch','NIGHTLIFE','FLEX','Triangle Park Amerikamura Osaka',34.6718,135.4983,'Amerikamura','Youth/streetwear/bar energy if everyone still has legs.')
  ]));
  d25.alerts=[...(d25.alerts||[]),{k:'info',t:'Himeji decision',x:'Keep Himeji on Sep 26. With the Takachiho drive, Fukuoka car return and Hakata→Kansai rail timing, an on-the-way Sep 25 castle visit creates too much risk and would kill Osaka Friday night.'}];
}

// SEP 26: Himeji at opening, compact Kobe, then give the rest to Osaka + Saturday nightlife.
const d26=D('2026-09-26');
if(d26){
 d26.city='Himeji opening → compact Kobe → deep Osaka → Saturday nightlife';
 d26.mission='See the real castle early, keep Kobe deliberately short with an early Kobe-beef meal, then return to Osaka with enough daylight/evening to actually explore the city before a full Saturday night.';
 d26.zones=[
  Z('Osaka → Himeji at opening','06:55–11:15','No car. Subway/JR to Shin-Osaka, Shinkansen west, then walk the castle axis.','Cut extra Himeji interiors before the Main Keep or Koko-en.','Himeji Castle',[
   S('06:55','Osaka Airbnb → Shin-Osaka','MOVE','MUST','Shin-Osaka Station',null,null,'Shin-Ōsaka Station','Use subway/JR; leave with breakfast in hand.'),
   S('07:40','Shin-Osaka → Himeji','TRAIN','MUST','Himeji Station',34.8275,134.6908,'Himeji Station','Fast Shinkansen. Sit near an exit so you are moving immediately at Himeji.'),
   S('08:20','Otemae-dori castle approach','WALK','HIGH','Otemae-dori Himeji',34.8325,134.6905,'Himeji Castle','Walk straight toward the castle for the long-axis reveal.'),
   S('08:35','Sannomaru lawn','PHOTO','HIGH','Himeji Castle Sannomaru',34.8364,134.6937,'Himeji Castle','Clean exterior compositions before the gates get busier.'),
   S('09:00','Himeji Castle Main Keep','CASTLE','MUST','Himeji Castle',34.8393,134.6940,'Himeji Castle','Enter at opening. Do the defensive route and steep interior stairs; this is the castle interior worth protecting.'),
   S('10:35','Koko-en Garden','GARDEN','HIGH','Koko-en Garden Himeji',34.8396,134.6920,'Koko-en','Nine compact Edo-style gardens; calm finish beside the castle.'),
   S('11:15','Himeji → Kobe Sannomiya','TRAIN','MUST','Sannomiya Station Kobe',34.6948,135.1953,'Sannomiya Station','JR Special Rapid is usually the efficient move; do not detour to Shin-Kobe unless your train requires it.')
  ]),
  Z('Kobe · one tight taste + early beef','12:00–15:20','Kobe is intentionally compressed: one shrine/street layer, one waterfront glance if time, then early Kobe beef.','Cut waterfront first. Never let Kobe turn into a full-day detour from Osaka.','Kobe',[
   S('12:00','Ikuta Shrine','SHRINE','HIGH','Ikuta Shrine Kobe',34.6949,135.1902,'Ikuta Shrine','Historic shrine hidden directly behind central Sannomiya.'),
   S('12:30','Kitano lower streets · optional','NEIGHBORHOOD','FLEX','Kitano Ijinkan Kobe',34.7006,135.1899,'Kitano-chō','Quick uphill Western-residence street texture only if Himeji ran clean.'),
   S('13:20','Meriken Park / Harborland glance','WATERFRONT','FLEX','Meriken Park Kobe',34.6826,135.1891,'Meriken Park','Short harbor skyline stop; this is the first Kobe cut.'),
   S('14:00','Kobe beef · early meal','FOOD','MUST','Kobe beef restaurant Sannomiya Kobe',34.6939,135.1930,null,'Make this the Kobe reason to stay. Book a reputable teppan spot around Sannomiya and keep the meal controlled.'),
   S('15:20','Sannomiya → Osaka','TRAIN','MUST','Osaka Station',34.7025,135.4959,'Osaka Station','JR Special Rapid back. The rest of Saturday belongs to Osaka.')
  ]),
  Z('Osaka core · castle → Shinsekai → Namba','16:00–20:15','Use the late afternoon for the big Osaka contrasts: castle exterior/park, retro south Osaka, then Namba.','Skip paid tower queues and Osaka Castle interior. The exterior/park and street neighborhoods matter more today.','Osaka',[
   S('16:00','Osaka Castle Park + exterior','CASTLE','HIGH','Osaka Castle Park',34.6873,135.5262,'Osaka Castle','Exterior, moat, stone walls and park. Do not spend this day repeating a castle interior after Himeji.'),
   S('16:55','Shinsekai','NEIGHBORHOOD','MUST','Shinsekai Osaka',34.6521,135.5062,'Shinsekai','Retro signs, kushikatsu streets and Tsutenkaku views.'),
   S('17:20','Tsutenkaku exterior / Janjan Yokocho','PHOTO','HIGH','Tsutenkaku Osaka',34.6525,135.5063,'Tsūtenkaku','Street-level atmosphere beats a long tower queue.'),
   S('18:00','Namba Yasaka Shrine','SHRINE','MUST','Namba Yasaka Shrine Osaka',34.6616,135.4965,'Namba Yasaka Shrine','The giant lion-head stage is one of Osaka’s best quick shrine stops.'),
   S('18:30','Kuromon edge / Nipponbashi','FOOD','FLEX','Kuromon Ichiba Market Osaka',34.6654,135.5060,'Kuromon Ichiba Market','Many stalls will be winding down; use it as a connector/snack check, not a destination if shutters are down.'),
   S('19:00','Denden Town','NEIGHBORHOOD','FLEX','Den Den Town Osaka',34.6596,135.5056,'Nipponbashi','Gaming/anime/electronics street layer if your group cares; otherwise go straight to Namba.'),
   S('19:35','Hozenji / Ura Namba reset','FOOD','HIGH','Hozenji Yokocho Osaka',34.6686,135.5030,null,'Small plates and reset before nightlife.')
  ]),
  Z('Osaka Saturday night','20:15–late','Dotonbori is the launch point, not the whole night. Walk Shinsaibashi → Amerikamura and choose bars/clubs based on energy.','Orange Street first, then any shopping. Keep Dotonbori + Amerikamura + nightlife.','Dotonbori',[
   S('20:15','Dotonbori canal loop','NIGHTLIFE','MUST','Dotonbori Osaka',34.6687,135.5013,'Dōtonbori','Do both canal sides; look back from bridges instead of only standing at Glico.'),
   S('20:50','Shinsaibashi-suji','NEIGHBORHOOD','HIGH','Shinsaibashi-suji Osaka',34.6732,135.5014,'Shinsaibashi','Covered spine north from Dotonbori; move, do not shop for an hour.'),
   S('21:25','Amerikamura · Triangle Park','NEIGHBORHOOD','MUST','Triangle Park Amerikamura Osaka',34.6718,135.4983,'Amerikamura','Streetwear, youth culture and pre-bar energy.'),
   S('22:00','Orange Street / Horie','NEIGHBORHOOD','FLEX','Orange Street Horie Osaka',34.6703,135.4932,null,'Design/streetwear branch only if energy is high.'),
   S('22:30','Osaka bars / clubs','NIGHTLIFE','MUST','Dotonbori nightlife Osaka',34.6695,135.5008,null,'Protect Saturday night. Dotonbori, Soemoncho and Amemura are your main decision zones.')
  ])
 ];
}

// SEP 27: squeeze one more Osaka morning layer, then Kyoto northwest + Arashiyama + Gion night.
const d27=D('2026-09-27');
if(d27){
 d27.city='Osaka morning → Kinkaku / Ryoanji / Ninna-ji → Arashiyama → Gion';
 d27.mission='Use an early Osaka hour, then attack Kyoto’s northwest in one line: three temple anchors into Arashiyama, then Gion/Pontocho after ticketed sites close.';
 d27.zones=[
  Z('One last Osaka morning → Kyoto','07:15–09:35','Use only stops that fit naturally before the Kyoto transfer.','Cut Kuromon browsing before delaying Kyoto.','Osaka',[
   S('07:15','Namba / Dotonbori early-photo pass','PHOTO','FLEX','Dotonbori Osaka',34.6687,135.5013,'Dōtonbori','Nearly empty canal streets are completely different from Friday/Saturday night.'),
   S('07:45','Kuromon Ichiba morning pass','FOOD','HIGH','Kuromon Ichiba Market Osaka',34.6654,135.5060,'Kuromon Ichiba Market','Breakfast and market texture as stalls open; one pass only.'),
   S('08:20','Osaka → Kyoto','TRAIN','MUST','Kyoto Station',34.9859,135.7588,'Kyoto Station','Use JR/Hankyu based on your next northwest transfer; luggage goes to the Kyoto Airbnb or lockers once.'),
   S('09:15','Kyoto Airbnb / luggage drop','LOGISTICS','MUST','340 Shimoatarashicho Higashiyama Kyoto',34.9915,135.7730,null,'Drop bags once. Carry only day gear.')
  ]),
  Z('Kinkaku → Ryoanji → Ninna-ji','09:40–12:25','These three line up along Kyoto’s northwest edge. Use taxi/JR+bus for the first jump, then short bus/taxi/walk hops.','Ninna-ji first if behind. Never cut Kinkaku or Ryoanji.','Kinkaku-ji',[
   S('09:40','Kinkaku-ji','TEMPLE','MUST','Kinkaku-ji Kyoto',35.0394,135.7292,'Kinkaku-ji','Do the standard one-way loop efficiently: pond reflection, upper viewpoints, exit.'),
   S('10:40','Ryoan-ji','TEMPLE','MUST','Ryoan-ji Kyoto',35.0345,135.7183,'Ryōan-ji','Rock garden first, then pond/grounds if the clock is healthy.'),
   S('11:35','Ninna-ji','TEMPLE','HIGH','Ninna-ji Kyoto',35.0310,135.7138,'Ninna-ji','Five-story pagoda and Omuro atmosphere; palace interior is optional on this schedule.'),
   S('12:25','Ninna-ji → Arashiyama','MOVE','MUST','Tenryu-ji Kyoto',35.0158,135.6737,'Arashiyama','Use Randen for the atmospheric, efficient cross-west transfer.')
  ]),
  Z('Arashiyama deep sweep','13:00–17:10','Temple → bamboo → side shrine → garden/river. Walk one directional loop without backtracking.','Monkey Park and Okochi first. Keep Tenryu-ji, bamboo, Nonomiya and Togetsukyo.','Arashiyama',[
   S('13:00','Tenryu-ji','TEMPLE','MUST','Tenryu-ji Kyoto',35.0158,135.6737,'Tenryū-ji','Garden and mountain borrowed scenery; use the north exit toward bamboo.'),
   S('13:45','Nonomiya Shrine','SHRINE','HIGH','Nonomiya Shrine Kyoto',35.0170,135.6740,'Nonomiya Shrine','Tiny shrine with black torii and moss garden directly on the bamboo route.'),
   S('14:00','Arashiyama Bamboo Grove','NATURE','MUST','Arashiyama Bamboo Grove Kyoto',35.0168,135.6713,'Bamboo Forest (Kyoto)','Walk through once; do not wait forever for an empty frame.'),
   S('14:25','Okochi Sanso','GARDEN','FLEX','Okochi Sanso Kyoto',35.0177,135.6694,'Ōkōchi Sansō','Best optional garden/view add if the day is running ahead.'),
   S('15:10','Togetsukyo + Katsura River','WATERFRONT','MUST','Togetsukyo Bridge Kyoto',35.0135,135.6775,'Togetsukyō Bridge','Bridge, river and mountain wall. Walk the riverside for changing foregrounds.'),
   S('15:50','Iwatayama Monkey Park','NATURE','FLEX','Arashiyama Monkey Park Iwatayama Kyoto',35.0114,135.6760,'Iwatayama Monkey Park','Steep climb; only do it if everyone wants it and the clock is strong.'),
   S('16:50','Kimono Forest / Randen','PHOTO','HIGH','Kimono Forest Arashiyama Kyoto',35.0152,135.6783,null,'Colorful station exit layer before leaving west Kyoto.')
  ]),
  Z('Gion after dark','17:45–late','Historic streets improve after ticketed attractions close. Keep moving south-to-river and finish on Pontocho/Kiyamachi.','Maruyama/Chion-in exterior before Gion Shirakawa or Pontocho.','Gion',[
   S('17:45','Yasaka Shrine','SHRINE','MUST','Yasaka Shrine Kyoto',35.0037,135.7786,'Yasaka Shrine','Lantern-lit shrine gateway into Gion.'),
   S('18:05','Maruyama Park','PARK','FLEX','Maruyama Park Kyoto',35.0039,135.7808,'Maruyama Park','Short connector only.'),
   S('18:20','Chion-in Sanmon exterior','TEMPLE','HIGH','Chion-in Kyoto',35.0053,135.7820,'Chion-in','Massive gate and dusk atmosphere; no long interior visit now.'),
   S('18:40','Gion Shirakawa + Tatsumi Bridge','NEIGHBORHOOD','MUST','Tatsumi Bridge Gion Kyoto',35.0061,135.7757,'Gion','Canal, willows and machiya street layer.'),
   S('19:05','Hanamikoji','NEIGHBORHOOD','MUST','Hanamikoji Street Kyoto',35.0028,135.7751,'Gion','Public streets only; no intrusive photography.'),
   S('19:35','Kamo River / Shijo Bridge','WATERFRONT','HIGH','Shijo Bridge Kyoto',35.0038,135.7706,null,'Open-sky reset before dinner.'),
   S('19:50','Pontocho + Kiyamachi','NIGHTLIFE','MUST','Pontocho Kyoto',35.0054,135.7713,'Pontochō','Dinner and nightlife lane; wander parallel Kiyamachi too.')
  ])
 ];
}

// SEP 28: maximum Kyoto day, south Higashiyama → north Higashiyama → central.
const d28=D('2026-09-28');
if(d28){
 d28.city='Kiyomizu dawn → deep Higashiyama → Philosopher route → Nishiki / Nijo → Gion night';
 d28.mission='A true Kyoto maximum day: start Kiyomizu at opening, descend every high-value preserved lane, jump north for Heian/Nanzen/Philosopher/Ginkaku, then finish central Kyoto and Gion.';
 d28.zones=[
  Z('Kiyomizu + preserved Higashiyama','05:25–09:15','Taxi uphill from the Airbnb, then gravity does the work downhill.','Yasaka Koshindo and Ishibe-koji first. Never cut Kiyomizu, Sannenzaka/Ninenzaka or Yasaka Pagoda.','Kiyomizu-dera',[
   S('05:25','Kyoto Airbnb → Kiyomizu Nio-mon','MOVE','MUST','Nio-mon Gate Kiyomizu-dera Kyoto',34.9949,135.7839,'Kiyomizu-dera','Taxi to the correct entrance; do not burn the first hour on uphill transit.'),
   S('06:00','Kiyomizu-dera','TEMPLE','MUST','Kiyomizu-dera Kyoto',34.9948,135.7850,'Kiyomizu-dera','Main stage, valley, Otowa area and quiet dawn light.'),
   S('07:05','Sannenzaka','STREET','MUST','Sannenzaka Kyoto',34.9965,135.7818,null,'Preserved slope before the crowds fully arrive.'),
   S('07:25','Ninenzaka','STREET','MUST','Ninenzaka Kyoto',34.9980,135.7810,null,'Continue downhill without backtracking.'),
   S('07:42','Hokan-ji / Yasaka Pagoda exterior','PHOTO','MUST','Hokan-ji Yasaka Pagoda Kyoto',34.9986,135.7808,'Hōkan-ji','The iconic pagoda-above-rooftops frame.'),
   S('08:00','Yasaka Koshindo','TEMPLE','FLEX','Yasaka Koshindo Kyoto',34.9983,135.7799,null,'Tiny colorful temple beside the lanes.'),
   S('08:15','Kodai-ji grounds / approach','TEMPLE','HIGH','Kodai-ji Kyoto',35.0008,135.7815,'Kōdai-ji','High-value Zen temple/garden; shorten the interior if time slips.'),
   S('08:55','Ishibe-koji','STREET','FLEX','Ishibe-koji Kyoto',35.0006,135.7796,null,'Quiet stone lane; residential and short.')
  ]),
  Z('Heian → Nanzen → Philosopher → Ginkaku','09:25–13:30','Taxi to Okazaki, then one mostly northbound scenic chain.','Eikan-do first, then shorten Philosopher’s Path. Keep Nanzen/Suirokaku/Honen-in/Ginkaku.','Nanzen-ji',[
   S('09:25','Heian Shrine','SHRINE','HIGH','Heian Shrine Kyoto',35.0159,135.7824,'Heian Shrine','Huge torii and open shrine geometry; keep this focused.'),
   S('10:00','Nanzen-ji','TEMPLE','MUST','Nanzen-ji Kyoto',35.0114,135.7943,'Nanzen-ji','Sanmon and main grounds.'),
   S('10:20','Suirokaku Aqueduct','PHOTO','MUST','Suirokaku Aqueduct Kyoto',35.0118,135.7955,'Nanzen-ji','Red-brick repeating arches; one of the best architectural photo stops.'),
   S('10:40','Eikan-do','TEMPLE','FLEX','Eikan-do Kyoto',35.0144,135.7956,'Eikan-dō Zenrin-ji','Excellent but time-expensive; first serious temple cut.'),
   S('11:05','Philosopher’s Path','WALK','HIGH','Philosophers Path Kyoto',35.0199,135.7956,"Philosopher's Walk",'Use the canal as movement, not an out-and-back attraction.'),
   S('11:35','Honen-in','TEMPLE','MUST','Honen-in Kyoto',35.0218,135.7968,'Hōnen-in','Mossy gate and quiet grounds: huge value for ~10–15 minutes.'),
   S('12:05','Ginkaku-ji','TEMPLE','MUST','Ginkaku-ji Kyoto',35.0269,135.7984,'Ginkaku-ji','Garden and upper hillside path matter more than the “silver” building myth.'),
   S('13:15','Taxi / transit to Nishiki','MOVE','MUST','Nishiki Market Kyoto',35.0050,135.7647,'Nishiki Market','Use a direct reposition rather than sightseeing through traffic.')
  ]),
  Z('Nishiki → central Kyoto → evening','13:35–late','Eat through Nishiki, add central anchors while open, then use night for Gion/Kiyamachi streets.','Nijo first if behind, then arcades. Nishiki stays because it is lunch.','Nishiki Market',[
   S('13:35','Nishiki Market','FOOD','MUST','Nishiki Market Kyoto',35.0050,135.7647,'Nishiki Market','Progressive lunch: small bites, no 45-minute viral queue.'),
   S('14:30','Nishiki Tenmangu','SHRINE','HIGH','Nishiki Tenmangu Kyoto',35.0050,135.7671,'Nishiki Tenmangū','Tiny shrine at the market’s east end.'),
   S('14:45','Shinkyogoku + Teramachi','NEIGHBORHOOD','HIGH','Shinkyogoku Kyoto',35.0054,135.7677,null,'Short arcade slice for downtown texture, not a shopping marathon.'),
   S('15:25','Nijo Castle','CASTLE','HIGH','Nijo Castle Kyoto',35.0138,135.7486,'Nijō Castle','Ninomaru Palace + grounds if entry timing still works; otherwise exterior/grounds and cut cleanly.'),
   S('17:20','Kennin-ji / Gion south fill-in','TEMPLE','FLEX','Kennin-ji Kyoto',35.0002,135.7736,'Kennin-ji','Old Zen temple beside Gion if you still have daylight/open access; otherwise skip.'),
   S('18:00','Yasaka / Gion fill-in','NEIGHBORHOOD','HIGH','Gion Kyoto',35.0037,135.7760,'Gion','Use the second night to hit lanes you missed Sunday.'),
   S('19:00','Kiyamachi + Pontocho','NIGHTLIFE','MUST','Kiyamachi Kyoto',35.0059,135.7719,null,'Canal, dinner and bars. Kyoto night is part of the route, not dead time.')
  ])
 ];
}

const d29=D('2026-09-29');
if(d29){
 d29.city='Fushimi dawn → teamLab Kyoto → Tokyo → deep Shinjuku night';
 d29.mission='Dawn torii, fixed 9 AM teamLab, one clean bag pickup, Shinkansen to Tokyo, then a full Shinjuku orientation/night circuit.';
 d29.zones=[
  Z('Fushimi Inari dawn','05:10–07:45','Lower torii are the priority; Yotsutsuji is the efficient upper ceiling.','Cut upper climb first. Never cut main shrine or Senbon Torii.','Fushimi Inari',[
   S('05:10','Kyoto Airbnb → Fushimi Inari','TRAIN','MUST','Fushimi Inari Taisha Kyoto',34.9675,135.7794,'Fushimi Inari-taisha','Keihan/JR depending nearest practical station; leave with minimal gear.'),
   S('05:35','Fushimi Inari main shrine','SHRINE','MUST','Fushimi Inari Taisha Kyoto',34.9675,135.7794,'Fushimi Inari-taisha','Fast prayer/orientation.'),
   S('05:50','Senbon Torii','PHOTO','MUST','Senbon Torii Kyoto',34.9670,135.7809,'Fushimi Inari-taisha','Dawn gives the cleanest torii tunnel.'),
   S('06:15','Okusha Hohaisho','SHRINE','HIGH','Okusha Hohaisho Kyoto',34.9663,135.7829,null,'Natural first turnaround if pace slips.'),
   S('06:40','Yotsutsuji','VIEW','FLEX','Yotsutsuji Kyoto',34.9618,135.7911,'Fushimi Inari-taisha','Best efficiency ceiling; summit is unnecessary today.'),
   S('07:15','Return to Airbnb / reset','MOVE','MUST','340 Shimoatarashicho Higashiyama Kyoto',34.9915,135.7730,null,'Breakfast/shower; leave bags for one pickup after teamLab.')
  ]),
  Z('teamLab Kyoto → Tokyo','08:30–15:30','Booking and logistics only. No random temple inserted between them.','Do not cut buffers around the booking or Shinkansen.','Kyoto Station',[
   S('08:30','Airbnb → teamLab Biovortex Kyoto','WALK','MUST','teamLab Biovortex Kyoto',34.9838,135.7654,null,'Arrive early enough to avoid a rushed 09:00 entry.'),
   S('09:00','teamLab Biovortex Kyoto','BOOKING','BOOK','teamLab Biovortex Kyoto',34.9838,135.7654,'teamLab','Booked 09:00. Allow about 1h45.'),
   S('10:50','Collect bags at Kyoto Airbnb','LOGISTICS','MUST','340 Shimoatarashicho Higashiyama Kyoto',34.9915,135.7730,null,'One retrieval only.'),
   S('11:35','Kyoto Station / ekiben','TRAIN','MUST','Kyoto Station',34.9859,135.7588,'Kyoto Station','Platform buffer, food and drinks.'),
   S('12:15','Kyoto → Tokyo','TRAIN','MUST','Tokyo Station',35.6812,139.7671,'Tokyo Station','Nozomi when practical.'),
   S('14:45','Tokyo Airbnb · Kitashinjuku','HOME','MUST','4-chome-11-17 Kitashinjuku Shinjuku Tokyo',35.7042,139.6908,null,'Drop bags quickly; do not fully unpack.')
  ]),
  Z('Shinjuku first night','16:00–late','Get a skyline if clear, then west→east through the classic alleys, shrine and neon layers.','Metro Govt first. Keep Omoide/Kabukicho/Hanazono/Golden Gai.','Shinjuku',[
   S('16:00','Tokyo Metropolitan Government Observatory','VIEW','HIGH','Tokyo Metropolitan Government Building Observatory',35.6895,139.6917,'Tokyo Metropolitan Government Building','Free city orientation if open and clear.'),
   S('17:15','Omoide Yokocho','FOOD','MUST','Omoide Yokocho Tokyo',35.6928,139.6995,'Omoide Yokocho','Tiny rail-side yakitori alleys; snack, do not settle for 2 hours.'),
   S('17:55','Kabukicho / Godzilla Head','NEIGHBORHOOD','HIGH','Godzilla Head Shinjuku',35.6956,139.7024,'Kabukichō','Neon core and giant signage.'),
   S('18:30','Hanazono Shrine','SHRINE','MUST','Hanazono Shrine Tokyo',35.6936,139.7050,'Hanazono Shrine','Quiet shrine embedded directly in nightlife.'),
   S('19:00','Golden Gai','NIGHTLIFE','MUST','Shinjuku Golden Gai Tokyo',35.6940,139.7047,'Shinjuku Golden Gai','Tiny bars; check seating/cover charge before entering.'),
   S('21:00','Shinjuku 2-chome / Kabukicho bars','NIGHTLIFE','FLEX','Shinjuku nightlife Tokyo',35.6915,139.7060,null,'Choose based on group vibe and energy.')
  ])
 ];
}

const d30=D('2026-09-30');
if(d30){
 d30.city='Tsukiji → teamLab Planets → Odaiba → Ginza → Marunouchi / Yurakucho';
 d30.mission='Move continuously from market breakfast to the bay, then walk Tokyo’s polished central architecture layer into Tokyo Station and Yurakucho night.';
 d30.zones=[
  Z('Tsukiji breakfast','07:00–09:20','Eat progressively and keep the booking buffer.','Cut every viral line before Planets.','Tsukiji',[
   S('07:00','Tsukiji Outer Market','FOOD','MUST','Tsukiji Outer Market Tokyo',35.6655,139.7707,'Tsukiji fish market','Seafood, tamagoyaki, fruit; one queue maximum.'),
   S('08:00','Namiyoke Inari','SHRINE','HIGH','Namiyoke Inari Shrine Tokyo',35.6644,139.7705,null,'Market-edge shrine; almost no detour.'),
   S('08:20','Tsukiji Hongwanji','TEMPLE','HIGH','Tsukiji Hongwanji Tokyo',35.6665,139.7725,'Tsukiji Hongan-ji','Distinct Indo-Buddhist architecture; quick interior if open.'),
   S('08:55','Tsukiji → Toyosu / Planets','MOVE','MUST','teamLab Planets Tokyo',35.6491,139.7898,'teamLab Planets','Use subway/bus/taxi with a real entry buffer.')
  ]),
  Z('Planets → Odaiba waterfront','10:00–13:30','Fixed booking, then futuristic bay icons in one westbound sweep.','Odaiba malls first. Keep waterfront views and one signature icon.','Odaiba',[
   S('10:00','teamLab Planets','BOOKING','BOOK','teamLab Planets Tokyo',35.6491,139.7898,'teamLab Planets','Booked entry. Follow footwear/water-room instructions.'),
   S('11:35','Toyosu / Yurikamome to Odaiba','MOVE','MUST','Daiba Station Tokyo',35.6259,139.7710,'Yurikamome','Use the elevated train for bay views.'),
   S('12:00','Odaiba Statue of Liberty + Rainbow Bridge view','PHOTO','MUST','Odaiba Statue of Liberty Tokyo',35.6278,139.7714,'Odaiba','Classic Tokyo Bay skyline composition.'),
   S('12:25','DiverCity Unicorn Gundam','PHOTO','HIGH','Unicorn Gundam Odaiba Tokyo',35.6252,139.7756,'DiverCity Tokyo Plaza','Fast giant-Gundam stop; no mall wandering.'),
   S('13:00','Odaiba Seaside Park','WATERFRONT','HIGH','Odaiba Seaside Park Tokyo',35.6294,139.7730,'Odaiba','Beach/bay walk and Rainbow Bridge angle.')
  ]),
  Z('Ginza architecture → Tokyo Station','14:15–18:20','Return central and walk south-to-north through architecture rather than shopping.','Retail interiors first. Keep Kabukiza, Chuo-dori, International Forum and Tokyo Station.','Ginza',[
   S('14:15','Kabukiza exterior','PHOTO','HIGH','Kabukiza Theatre Tokyo',35.6695,139.7678,'Kabuki-za','Traditional facade against modern Ginza.'),
   S('14:35','Ginza Chuo-dori','NEIGHBORHOOD','MUST','Ginza Chuo-dori Tokyo',35.6717,139.7650,'Ginza','Walk the flagship architecture corridor.'),
   S('15:05','GINZA SIX rooftop','VIEW','HIGH','GINZA SIX Rooftop Garden Tokyo',35.6697,139.7641,'Ginza Six','Free elevated city layer if accessible.'),
   S('15:45','Tokyo International Forum','PHOTO','MUST','Tokyo International Forum',35.6769,139.7635,'Tokyo International Forum','Glass atrium and geometric interior.'),
   S('16:25','Marunouchi Naka-dori','STREET','HIGH','Marunouchi Naka-dori Tokyo',35.6803,139.7624,'Marunouchi','Polished office/cafe street with station architecture nearby.'),
   S('16:55','Tokyo Station Marunouchi facade','PHOTO','MUST','Tokyo Station Marunouchi',35.6812,139.7671,'Tokyo Station','Cross-plaza facade frame in late-day light.'),
   S('17:25','KITTE rooftop garden','VIEW','MUST','KITTE Marunouchi Tokyo',35.6796,139.7648,'JP Tower','Best close elevated view back toward Tokyo Station tracks/facade.')
  ]),
  Z('Yurakucho night','18:20–late','Finish under the tracks instead of another polished mall.','Nothing critical after dinner.','Yurakucho',[
   S('18:20','Yurakucho Gado-shita','FOOD','MUST','Yurakucho Gado-shita Tokyo',35.6751,139.7636,'Yūrakuchō Station','Izakaya/yakitori under the train tracks.'),
   S('20:00','Ginza / Yurakucho night walk','NIGHTLIFE','FLEX','Ginza Tokyo night',35.6732,139.7638,'Ginza','Neon and architecture after dark if energy is still good.')
  ])
 ];
}

const d01=D('2026-10-01');
if(d01){
 d01.city='Nikko maximum day · Lake Chuzenji → Kegon → shrine complex → Kanmangafuchi';
 d01.mission='Go far first while buses are fresh: Lake Chuzenji/Kegon, then descend once to the UNESCO shrine zone and finish with the atmospheric Jizo gorge if daylight allows.';
 d01.zones=[
  Z('Tokyo → Lake Chuzenji / Kegon','05:30–11:15','No car. Early rail to Nikko, then bus uphill before the shrine crowds.','Akechidaira and extra lake walking first. Keep Kegon and the lake shore.','Kegon Falls',[
   S('05:30','Tokyo Airbnb → Asakusa / rail departure','TRAIN','MUST','Asakusa Station Tobu',35.7117,139.7985,'Asakusa Station','Leave very early; use booked Tobu limited express or the fastest practical rail plan.'),
   S('06:30','Tokyo → Tobu-Nikko','TRAIN','MUST','Tobu Nikko Station',36.7483,139.6194,'Tōbu Nikkō Station','Roughly 2 hours depending service; reserve seats if using limited express.'),
   S('08:35','Tobu-Nikko → Lake Chuzenji','MOVE','MUST','Chuzenji Onsen Bus Stop Nikko',36.7381,139.4970,'Lake Chūzenji','Local bus up Irohazaka. Expect ~45–55 min and mountain-road variability.'),
   S('09:30','Kegon Falls','NATURE','MUST','Kegon Falls Nikko',36.7380,139.5009,'Kegon Falls','Main overlook first; elevator platform if operating and visibility is good.'),
   S('10:15','Lake Chuzenji shore','WATERFRONT','MUST','Lake Chuzenji Nikko',36.7380,139.4875,'Lake Chūzenji','Walk the useful lakeside section, not a long out-and-back.'),
   S('10:40','Futarasan Chugushi','SHRINE','HIGH','Futarasan Chugushi Nikko',36.7396,139.4868,'Futarasan Shrine','Mountain-shrine context beside the lake.'),
   S('11:10','Akechidaira Ropeway · only if clean timing','VIEW','FLEX','Akechidaira Ropeway Nikko',36.7385,139.5398,'Akechidaira Ropeway','Do only if operating, clear and it fits the bus plan; do not risk shrine hours.')
  ]),
  Z('UNESCO Nikko shrine complex','12:15–16:20','Bus down once, then walk the whole complex.','Museum/long interior dwell first. Never cut Toshogu, Futarasan or Shinkyo.','Nikko Toshogu',[
   S('12:15','Shinkyo Bridge','PHOTO','MUST','Shinkyo Bridge Nikko',36.7536,139.6040,'Shinkyō','Red sacred bridge against forest and river.'),
   S('12:35','Rinno-ji','TEMPLE','HIGH','Rinnoji Nikko',36.7530,139.5985,'Rinnō-ji','Sanbutsudo and temple context before Toshogu.'),
   S('13:05','Toshogu · Yomeimon / Sleeping Cat / core','SHRINE','MUST','Nikko Toshogu',36.7581,139.5989,'Nikkō Tōshō-gū','Give this real time; dense carvings and route sequence matter.'),
   S('14:25','Futarasan Shrine','SHRINE','MUST','Futarasan Shrine Nikko',36.7584,139.5963,'Futarasan Shrine','Older mountain worship layer beside Toshogu.'),
   S('14:55','Taiyuin','TEMPLE','HIGH','Taiyuin Nikko',36.7584,139.5943,'Taiyū-in','Atmospheric mausoleum with a calmer forest approach.'),
   S('15:40','Nikko cedar / shrine approach streets','WALK','HIGH','Nikko World Heritage Area',36.7554,139.5990,'Nikkō, Tochigi','Slow down for the forest scale and approach roads rather than sprinting between gates.')
  ]),
  Z('Kanmangafuchi → Tokyo','16:20–20:30','Use remaining daylight for the Jizo river gorge, then rail home.','Cut Kanmangafuchi if daylight/weather or last-train comfort is poor.','Kanmangafuchi Abyss',[
   S('16:20','Kanmangafuchi Abyss / Bake Jizo','NATURE','FLEX','Kanmangafuchi Abyss Nikko',36.7516,139.5890,'Kanmangafuchi Abyss','River gorge and long Jizo line; excellent late-day mood.'),
   S('17:20','Return to Tobu-Nikko Station','MOVE','MUST','Tobu Nikko Station',36.7483,139.6194,'Tōbu Nikkō Station','Bus/taxi back; protect the rail departure.'),
   S('18:00','Nikko → Tokyo','TRAIN','MUST','Asakusa Tokyo',35.7117,139.7985,'Asakusa','Reserved limited express when possible; eat on return if needed.')
  ])
 ];
}

const d02=D('2026-10-02');
if(d02){
 d02.city='Kamakura shrines + Hase + beaches → Tokyo → Borderless / Tokyo Tower';
 d02.mission='Start Kamakura before crowds, hit the shrine core, ride Enoden west for Hase and the coast, actually spend time on the beaches, then return with a large buffer for Borderless.';
 d02.zones=[
  Z('Tokyo → Kamakura sacred core','05:45–09:15','JR early. Use taxi for the east-side temple if it saves a lot of time.','Hokokuji first if the Hase opening clock gets tight. Keep Tsurugaoka.','Kamakura',[
   S('05:45','Tokyo → Kamakura','TRAIN','MUST','Kamakura Station',35.3192,139.5504,'Kamakura Station','JR from Shinjuku/Tokyo area; roughly 55–70 min depending starting point/service.'),
   S('07:00','Tsurugaoka Hachimangu','SHRINE','MUST','Tsurugaoka Hachimangu Kamakura',35.3258,139.5563,'Tsurugaoka Hachimangū','Main shrine axis before Komachi fills.'),
   S('07:45','Wakamiya-oji / Dankazura','WALK','HIGH','Dankazura Kamakura',35.3220,139.5536,'Wakamiya Ōji','Walk the raised ceremonial approach back toward town.'),
   S('08:15','Hokokuji bamboo garden','TEMPLE','FLEX','Hokokuji Kamakura',35.3207,139.5686,'Hōkoku-ji','Beautiful compact bamboo temple; use taxi both ways if doing it on this compressed day.'),
   S('09:05','Kamakura Station → Hase','TRAIN','MUST','Hase Station Kamakura',35.3114,139.5362,'Enoshima Electric Railway','Enoden gives you the coastal neighborhood transition.')
  ]),
  Z('Hase temples → Kamakura beaches','09:20–12:30','Temple pair first, then walk/Enoden along the beach corridor.','Gokurakuji and Shichirigahama first. Keep Hasedera, Great Buddha and at least one real beach stop.','Kamakura',[
   S('09:20','Hasedera','TEMPLE','MUST','Hasedera Kamakura',35.3124,139.5330,'Hase-dera (Kamakura)','Terraces, Kannon hall and ocean outlook.'),
   S('10:10','Kotoku-in · Great Buddha','TEMPLE','MUST','Kotoku-in Kamakura',35.3167,139.5357,'Kōtoku-in','Bronze Daibutsu; walk the whole courtyard for changing angles.'),
   S('10:50','Yuigahama Beach','BEACH','MUST','Yuigahama Beach Kamakura',35.3086,139.5390,'Yuigahama','Actually go onto the sand and give the coast a real 20–30 minutes.'),
   S('11:25','Gokurakuji · quick shrine/temple lane','TEMPLE','FLEX','Gokurakuji Kamakura',35.3100,139.5282,'Gokuraku-ji','Small atmospheric Enoden-side add.'),
   S('11:45','Inamuragasaki','BEACH','MUST','Inamuragasaki Park Kamakura',35.3048,139.5226,'Inamuragasaki','Classic coast/Fuji direction viewpoint when visibility cooperates.'),
   S('12:10','Shichirigahama · only if ahead','BEACH','FLEX','Shichirigahama Beach Kamakura',35.3068,139.5100,'Shichirigahama','Wide surf/coast view. Turn around here; do not add full Enoshima today.')
  ]),
  Z('Return Tokyo → Borderless / Tower','12:30–late','Leave the coast early enough to reset before the fixed Tokyo afternoon.','Lunch queues first. Borderless and Friday night stay protected.','Azabudai Hills',[
   S('12:30','Kamakura → Tokyo','TRAIN','MUST','Tokyo Station',35.6812,139.7671,'Kamakura','Enoden/JR back. Build delay margin.'),
   S('14:15','Tokyo Airbnb reset','HOME','HIGH','4-chome-11-17 Kitashinjuku Shinjuku Tokyo',35.7042,139.6908,null,'Change/charge/drop beach gear if useful.'),
   S('16:30','teamLab Borderless','BOOKING','BOOK','teamLab Borderless Azabudai Hills',35.6605,139.7408,'teamLab Borderless','Protect target entry and allow ~2 hours.'),
   S('18:45','Azabudai Hills / Mori JP Tower plaza','NEIGHBORHOOD','HIGH','Azabudai Hills Tokyo',35.6606,139.7409,'Azabudai Hills','Architecture and skyline layer immediately outside teamLab.'),
   S('19:25','Tokyo Tower exterior','PHOTO','MUST','Tokyo Tower',35.6586,139.7454,'Tokyo Tower','Night exterior from Zojoji/Shiba side for scale.'),
   S('20:00','Zojoji exterior / Shiba Park','TEMPLE','HIGH','Zojoji Temple Tokyo',35.6575,139.7483,'Zōjō-ji','Temple + tower juxtaposition after dark.'),
   S('21:00','Roppongi / Friday night','NIGHTLIFE','MUST','Roppongi Tokyo',35.6628,139.7314,'Roppongi','Use Friday night; dinner/bar decision based on energy.')
  ])
 ];
}

const d03=D('2026-10-03');
if(d03){
 d03.city='Meiji / Harajuku → Omotesando → Daikanyama / Nakameguro → Shibuya sunset → Saturday night';
 d03.mission='Walk Tokyo’s youth/design spine from shrine forest to street culture, then shift south through Daikanyama/Nakameguro and finish Shibuya from daylight into Saturday night.';
 d03.zones=[
  Z('Meiji + Harajuku shrine/street layer','07:00–11:15','Start sacred/quiet before retail opens, then work outward.','Yoyogi dwell and Togo interior first. Keep Meiji, Takeshita and Cat Street.','Meiji Shrine',[
   S('07:00','Meiji Shrine','SHRINE','MUST','Meiji Shrine Tokyo',35.6764,139.6993,'Meiji Shrine','Long forest approach, main sanctuary and sake-barrel wall.'),
   S('08:30','Yoyogi Park','PARK','FLEX','Yoyogi Park Tokyo',35.6717,139.6949,'Yoyogi Park','Short green connector, not a 60-minute park session.'),
   S('09:00','Togo Shrine','SHRINE','HIGH','Togo Shrine Tokyo',35.6719,139.7050,'Tōgō Shrine','Compact shrine hidden behind Harajuku’s shopping streets.'),
   S('09:30','Takeshita Street','STREET','HIGH','Takeshita Street Tokyo',35.6715,139.7030,'Takeshita Street','Do one pass as shops wake up; novelty food only if immediate.'),
   S('10:10','Cat Street','STREET','MUST','Cat Street Tokyo',35.6667,139.7064,'Cat Street','Streetwear/design corridor toward Omotesando.'),
   S('10:50','Omotesando architecture walk','STREET','MUST','Omotesando Tokyo',35.6652,139.7123,'Omotesandō','Flagship buildings and broad avenue; prioritize architecture over shopping.')
  ]),
  Z('Aoyama → Daikanyama → Nakameguro','11:15–15:25','One short museum/garden decision, then move south to quieter design neighborhoods.','Nezu interior first if the queue/ticketing is bad.','Nakameguro',[
   S('11:15','Nezu Museum garden / architecture','MUSEUM','HIGH','Nezu Museum Tokyo',35.6622,139.7171,'Nezu Museum','Kengo Kuma architecture and garden; check current entry/ticketing.'),
   S('12:30','Daikanyama T-Site / neighborhood','NEIGHBORHOOD','HIGH','Daikanyama T-Site Tokyo',35.6488,139.6998,'Daikanyama','Design/bookstore/cafe neighborhood layer; keep it moving.'),
   S('13:35','Nakameguro River','WATERFRONT','MUST','Nakameguro River Tokyo',35.6441,139.6985,'Nakameguro','Canal-side walk, bridges, cafes and low-rise Tokyo.'),
   S('14:30','Meguro / Nakameguro lunch','FOOD','HIGH','Nakameguro Tokyo restaurants',35.6441,139.6985,'Nakameguro','Eat before Shibuya so sunset time stays clean.'),
   S('15:25','Nakameguro → Shibuya','MOVE','MUST','Shibuya Station',35.6580,139.7016,'Shibuya Station','Short train/taxi. Arrive with real Shibuya Sky buffer.')
  ]),
  Z('Shibuya golden hour → Saturday night','15:45–late','Street icons first, Sky through the light change, then stay in Shibuya for Saturday night.','Miyashita/Center-gai dwell before Shibuya Sky.','Shibuya',[
   S('15:45','Hachiko + Shibuya Crossing','PHOTO','MUST','Shibuya Crossing Tokyo',35.6595,139.7005,'Shibuya Crossing','Ground-level crossing first so you understand the geometry before going up.'),
   S('16:15','Shibuya Sky','BOOKING','BOOK','Shibuya Sky Tokyo',35.6585,139.7018,'Shibuya Scramble Square','Target daylight→sunset→blue hour.'),
   S('18:00','Miyashita Park','NEIGHBORHOOD','HIGH','Miyashita Park Tokyo',35.6622,139.7018,'Miyashita Park','Elevated urban park and youth district connector.'),
   S('18:40','Center-gai / Dogenzaka','NEIGHBORHOOD','MUST','Shibuya Center-gai Tokyo',35.6600,139.6987,'Shibuya','Dense night streets and signs.'),
   S('20:00','Shibuya dinner + bars','NIGHTLIFE','MUST','Shibuya nightlife Tokyo',35.6596,139.6982,'Shibuya','Saturday night stays here unless the group explicitly wants another district.')
  ])
 ];
}

const d04=D('2026-10-04');
if(d04){
 d04.city='Asakusa dawn → Kappabashi → Ueno / Yanaka / Nezu → Skytree → Akihabara';
 d04.mission='Deep old-Tokyo day: empty Senso-ji first, shrine/merchant streets, kitchen district, Ueno religious layer, Yanaka/Nezu neighborhood Tokyo, sunset Skytree and electric Akihabara.';
 d04.zones=[
  Z('Asakusa before crowds','05:45–09:10','Temple and shrine first, side streets second.','Imado first if behind. Keep Senso-ji, Asakusa Shrine and Nakamise atmosphere.','Senso-ji',[
   S('05:45','Kaminarimon','PHOTO','MUST','Kaminarimon Tokyo',35.7111,139.7964,'Kaminarimon','Giant lantern with almost no crowd.'),
   S('06:00','Nakamise before opening','STREET','HIGH','Nakamise Street Tokyo',35.7125,139.7966,'Nakamise-dōri','Shutters and old storefront rhythm before shopping crowds.'),
   S('06:15','Senso-ji','TEMPLE','MUST','Senso-ji Tokyo',35.7148,139.7967,'Sensō-ji','Main hall, incense, pagoda and quiet courtyard.'),
   S('06:50','Asakusa Shrine','SHRINE','MUST','Asakusa Shrine Tokyo',35.7153,139.7974,'Asakusa Shrine','Shinto layer immediately beside Senso-ji.'),
   S('07:20','Asakusa side streets / Hoppy Street','NEIGHBORHOOD','HIGH','Hoppy Street Asakusa Tokyo',35.7143,139.7935,'Asakusa','Old entertainment district texture before it gets busy.'),
   S('08:10','Imado Shrine','SHRINE','FLEX','Imado Shrine Tokyo',35.7203,139.8032,'Imado Shrine','Maneki-neko shrine; use a quick taxi if doing it.'),
   S('08:50','Kappabashi Dougu Street','STREET','MUST','Kappabashi Tokyo',35.7140,139.7894,'Kappabashi-dori','Kitchenware, knives, fake food and merchant streets as shops begin opening.')
  ]),
  Z('Ueno → Yanaka → Nezu','10:00–14:10','Short transit west, then walk through temple/park/residential old Tokyo.','Museum interiors first. Keep Ueno Toshogu, Yanaka and Nezu Shrine.','Ueno Park',[
   S('10:00','Ueno Park','PARK','HIGH','Ueno Park Tokyo',35.7148,139.7731,'Ueno Park','Move through the park as a connector.'),
   S('10:20','Ueno Toshogu','SHRINE','MUST','Ueno Toshogu Tokyo',35.7169,139.7726,'Ueno Tōshō-gū','Gold shrine tucked inside Ueno; very high value.'),
   S('10:50','Shinobazu Pond + Bentendo','SHRINE','HIGH','Shinobazu Bentendo Tokyo',35.7121,139.7700,'Shinobazu Pond','Pond, lotus and temple island.'),
   S('11:25','Ameyoko','MARKET','HIGH','Ameyoko Tokyo',35.7094,139.7744,'Ameya-Yokochō','Fast market pass for food/street energy.'),
   S('12:10','Yanaka Cemetery / temple lanes','NEIGHBORHOOD','MUST','Yanaka Cemetery Tokyo',35.7271,139.7710,'Yanaka Cemetery','Quiet old-Tokyo street/temple atmosphere.'),
   S('12:50','Yanaka Ginza','STREET','MUST','Yanaka Ginza Tokyo',35.7276,139.7669,'Yanaka Ginza Shopping Street','Low-rise shopping street and Yanaka Ginza staircase view.'),
   S('13:35','Nezu Shrine','SHRINE','MUST','Nezu Shrine Tokyo',35.7202,139.7609,'Nezu Shrine','Vermilion gates, pond and compact torii corridor.')
  ]),
  Z('Skytree sunset → Akihabara night','14:10–late','Transit east. Skytree is the fixed light-change anchor, then finish with a completely different night district.','Solamachi shopping before Skytree timing.','Tokyo Skytree',[
   S('14:10','Nezu → Asakusa / Sumida','MOVE','MUST','Azumabashi Bridge Tokyo',35.7107,139.8005,'Sumida River','Use subway/taxi to avoid wasting the afternoon walking cross-city.'),
   S('14:50','Azumabashi + Sumida River walk','WATERFRONT','HIGH','Azumabashi Bridge Tokyo',35.7107,139.8005,'Sumida River','Skytree and Asahi building composition across the river.'),
   S('15:35','Tokyo Skytree / Solamachi arrival','VIEW','MUST','Tokyo Skytree',35.7101,139.8107,'Tokyo Skytree','Arrive early enough for security/entry.'),
   S('16:15','Tokyo Skytree observation','BOOKING','BOOK','Tokyo Skytree',35.7101,139.8107,'Tokyo Skytree','Target daylight → sunset → city lights.'),
   S('18:20','Skytree → Akihabara','TRAIN','MUST','Akihabara Station Tokyo',35.6984,139.7731,'Akihabara Station','Short rail transfer.'),
   S('18:50','Akihabara Electric Town','NEIGHBORHOOD','MUST','Akihabara Electric Town Tokyo',35.6984,139.7731,'Akihabara','Neon, arcades, electronics and otaku culture after dark.'),
   S('20:30','Akihabara dinner / arcade final night','NIGHTLIFE','HIGH','Akihabara Tokyo',35.6984,139.7731,'Akihabara','Keep the final night flexible.')
  ])
 ];
}

const d05=D('2026-10-05');
if(d05){
 d05.city='Tokyo departure · optional final central loop only if flight allows';
 d05.mission='Do not invent a final-day sprint until the airport and flight are locked. If you have a large safe window, use central Tokyo stops that are easy to abandon.';
 d05.zones=[Z('Optional final Tokyo → airport','Morning → flight','Everything here is conditional on a verified airport departure buffer.','Cut every sightseeing stop immediately once airport timing requires it.','Tokyo Station',[
  S('08:00','Hie Shrine · optional','SHRINE','FLEX','Hie Shrine Tokyo',35.6746,139.7397,'Hie Shrine','Red torii stair corridor in central Tokyo if the flight is late enough.'),
  S('09:00','Imperial Palace East Gardens · optional','GARDEN','FLEX','Imperial Palace East Gardens Tokyo',35.6852,139.7528,'East Garden of the Imperial Palace','Only if open and you have a large buffer.'),
  S('10:30','Tokyo Station / Marunouchi final reset','LOGISTICS','HIGH','Tokyo Station',35.6812,139.7671,'Tokyo Station','Bags, food, final train decision.'),
  S('TBD','Airport transfer','TRAIN','MUST','Tokyo airport',null,null,null,'Set this as soon as your flight/airport is confirmed. Aim for a conservative international-flight buffer.')
 ])];
}

// Transfer metadata: keyed by date + destination stop. Durations are field estimates, not live routing.
const X={};
const add=(date,name,mode,duration,text)=>X[date+'|'+name]={mode,duration,text};
const many=(date,rows)=>rows.forEach(r=>add(date,...r));

many('2026-09-22',[
 ['Nagasaki Airport','Airport bus','45–55 min','Airport limousine bus to Nagasaki Station. No car.'],
 ['Nagasaki Station · lockers','Walk','2–5 min','From station bus arrival to lockers.'],
 ['Twenty-Six Martyrs Monument','Walk','6–8 min','Uphill from Nagasaki Station.'],
 ['Fukusaiji Temple','Walk','8–10 min','Short city walk.'],
 ['Urakami Cathedral','Tram + walk','15–20 min','Use tram north, then a short walk; taxi ~10 min if behind.'],
 ['Peace Park','Walk','8–10 min','Downhill/local streets from the cathedral.'],
 ['Atomic Bomb Hypocenter','Walk','4–6 min','Same memorial district.'],
 ['Nagasaki Atomic Bomb Museum','Walk','4–6 min','Same memorial district.'],
 ['National Peace Memorial Hall','Walk','1–3 min','Adjacent to the museum.'],
 ['Sanno Shrine · One-Legged Torii','Walk','10–12 min','Local street walk; taxi only if behind.'],
 ['Kazagashira Park · Ryoma Statue','Taxi','12–18 min','Take a taxi uphill. This is the time-saving move; do not try to walk the climb.'],
 ['Wakamiya Inari Shrine','Walk downhill','8–10 min','Work downhill from Kazagashira.'],
 ['Ryoma’s Boots Statue','Walk downhill','6–8 min','Continue downhill.'],
 ['Kofukuji Temple','Walk','10–12 min','Finish the Ryoma descent into Teramachi.'],
 ['Meganebashi · Nakashima River','Walk','5–7 min','Easy flat walk.'],
 ['Kiyomizu Temple Nagasaki','Walk','10–12 min','Uphill side branch; flex.'],
 ['Sofukuji Temple','Walk','7–9 min','Short local walk.'],
 ['Hamamachi Arcade','Walk','8–10 min','Natural connector toward Chinatown.'],
 ['Nagasaki Shinchi Chinatown','Walk','5–7 min','Flat downtown connection.'],
 ['Dejima','Walk','8–10 min','Short downtown walk; tram is not worth waiting for.'],
 ['Dejima Wharf','Walk','4–5 min','Direct waterfront edge.'],
 ['Nagasaki Seaside Park','Walk','5–7 min','Follow the waterfront.'],
 ['Dutch Slope · Higashiyamate','Walk','12–15 min','South through the foreign-settlement district.'],
 ['Oura Cathedral exterior','Walk','8–10 min','Continue south/uphill.'],
 ['Glover Sky Road','Walk','6–8 min','Use the inclined elevator to gain height.'],
 ['Glover Garden','Walk','5–8 min','From Sky Road upper exit.'],
 ['Nabekanmuriyama Park','Taxi','8–12 min','Taxi protects sunset; walking wastes the light.'],
 ['Nagasaki Ropeway · Fuchi Station','Taxi','15–20 min','Cross town directly after sunset.'],
 ['Mt Inasa Observatory','Ropeway + walk','10–15 min','Ropeway ascent plus station/observatory walking.'],
 ['Shianbashi','Ropeway + taxi/tram','25–35 min','Descend, then taxi/tram downtown.'],
 ['Nagasaki Station · retrieve bags','Tram / taxi','10–15 min','Short late-night city transfer.'],
 ['Nagasaki Airbnb','Walk / taxi','5–10 min','Final short move from station/Gotomachi.']
]);

many('2026-09-23',[
 ['KAMOME · Nagasaki → Takeo-Onsen','Train','35 min','Early Nishi Kyushu Shinkansen segment.'],
 ['Relay KAMOME · Takeo-Onsen → Hakata','Train','~70 min','Timed platform transfer; keep moving.'],
 ['Fukuoka Airport · rental pickup','Subway + shuttle','20–35 min','Hakata→FUK subway ~5 min plus rental shuttle/paperwork.'],
 ['Sakurai Futamigaura','Drive','40–50 min','Rental car west from Fukuoka Airport.'],
 ['Keya no Oto · land lookout / forest approach','Drive','30–35 min','Coastal road west.'],
 ['Shiraito Falls','Drive','35–45 min','Inland mountain road.'],
 ['Drive back to Fukuoka Airport','Drive','45–60 min','Protect traffic buffer.'],
 ['Airport buffer / friend pickup','Airport','0–15 min','You are already back at FUK; regroup and load luggage.'],
 ['Drive Fukuoka Airport → Yufuin','Drive','1 hr 35–1 hr 50','Expressway east; traffic can stretch it.'],
 ['Kinrin Lake','Drive + park','5–15 min','Park once in the Kinrin/Yunotsubo area.'],
 ['Tenso Shrine','Walk','3–5 min','Lakeside.'],
 ['Yufuin Floral Village','Walk','8–10 min','Through the compact core.'],
 ['Yunotsubo Kaido + Mt. Yufu street views','Walk','2–5 min','Same neighborhood.'],
 ['Yufuin Station axis · Mt. Yufu view','Walk','12–15 min','Straight west along the town axis.'],
 ['Sagiridai Overlook · last light only','Drive','10–15 min','On the Beppu side of town.'],
 ['Drive Yufuin → Beppu','Drive','40–50 min','Mountain road toward Beppu.'],
 ['Beppu Airbnb · Kitahama','Drive','0–10 min','Check in/park.'],
 ['Kannawa steam lanes','Drive / taxi','15–20 min','Uphill from Kitahama.'],
 ['Jigoku-mushi / onsen','Walk','2–5 min','Same Kannawa cluster.']
]);

many('2026-09-26',[
 ['Osaka Airbnb → Shin-Osaka','Subway / JR','20–30 min','No car. Build a station-navigation buffer.'],['Shin-Osaka → Himeji','Shinkansen','30–35 min','Fast westbound hop.'],['Otemae-dori castle approach','Walk','15–20 min','Himeji Station straight north.'],['Sannomaru lawn','Walk','5–8 min','Continue to castle foreground.'],['Himeji Castle Main Keep','Walk','5–10 min','Gate/security/entry.'],['Koko-en Garden','Walk','5–8 min','Immediately west of the castle.'],['Himeji → Kobe Sannomiya','JR train','40–50 min','Special Rapid when practical.'],['Ikuta Shrine','Walk','5–8 min','From Sannomiya.'],['Kitano lower streets · optional','Walk uphill / taxi','12–18 min','Taxi if legs/time matter.'],['Meriken Park / Harborland glance','Subway / taxi','15–20 min','Only if ahead.'],['Kobe beef · early meal','Taxi / subway','10–15 min','Return toward Sannomiya.'],['Sannomiya → Osaka','JR train','25–30 min','Special Rapid.'],['Osaka Castle Park + exterior','JR / subway','20–25 min','From Osaka/Umeda area.'],['Shinsekai','Subway','20–25 min','South to Dobutsuen-mae/Ebisucho.'],['Tsutenkaku exterior / Janjan Yokocho','Walk','2–6 min','Same district.'],['Namba Yasaka Shrine','Walk / subway','18–25 min','Head north to Namba.'],['Kuromon edge / Nipponbashi','Walk','15–18 min','East through Namba.'],['Denden Town','Walk','8–10 min','South edge of Nipponbashi.'],['Hozenji / Ura Namba reset','Walk','12–15 min','Back toward Namba core.'],['Dotonbori canal loop','Walk','5–8 min','Adjacent.'],['Shinsaibashi-suji','Walk','10–15 min','North through covered arcade.'],['Amerikamura · Triangle Park','Walk','8–10 min','West one block cluster.'],['Orange Street / Horie','Walk','8–12 min','West/southwest.'],['Osaka bars / clubs','Walk','5–15 min','Stay in the Dotonbori/Soemoncho/Amemura nightlife zone.']
]);

many('2026-09-27',[
 ['Namba / Dotonbori early-photo pass','Walk','5–10 min','From Shimanouchi Airbnb.'],['Kuromon Ichiba morning pass','Walk','10–12 min','East/southeast.'],['Osaka → Kyoto','Train','45–60 min','JR/Hankyu plus local connection depending destination.'],['Kyoto Airbnb / luggage drop','Taxi / train + walk','10–20 min','Drop bags once.'],['Kinkaku-ji','Taxi / JR+bus','25–35 min','Taxi is the over-achiever move from Higashiyama.'],['Ryoan-ji','Bus / taxi','8–12 min','Short westbound hop.'],['Ninna-ji','Bus / taxi / walk','8–12 min','Same Kinukake corridor.'],['Ninna-ji → Arashiyama','Randen','20–25 min','Atmospheric streetcar connection.'],['Tenryu-ji','Walk','5–10 min','From Randen Arashiyama.'],['Nonomiya Shrine','Walk','8–10 min','North exit route.'],['Arashiyama Bamboo Grove','Walk','2–4 min','Adjacent.'],['Okochi Sanso','Walk','5–7 min','At the far bamboo end.'],['Togetsukyo + Katsura River','Walk','15–20 min','Downhill through Arashiyama center.'],['Iwatayama Monkey Park','Walk / climb','5 min to entrance + 20 min climb','Only if ahead.'],['Kimono Forest / Randen','Walk','10–15 min','Return to station area.'],['Yasaka Shrine','Train + taxi / walk','35–45 min','Arashiyama→Gion; use rail, then short walk/taxi.'],['Maruyama Park','Walk','2–5 min','Adjacent.'],['Chion-in Sanmon exterior','Walk','5–8 min','North edge of park.'],['Gion Shirakawa + Tatsumi Bridge','Walk','10–12 min','Downhill west.'],['Hanamikoji','Walk','6–8 min','Same Gion cluster.'],['Kamo River / Shijo Bridge','Walk','7–10 min','West to river.'],['Pontocho + Kiyamachi','Walk','2–5 min','Across/along river.']
]);

many('2026-09-28',[
 ['Kyoto Airbnb → Kiyomizu Nio-mon','Taxi','8–12 min','Save the uphill legs and opening time.'],['Kiyomizu-dera','Walk','2–5 min','At the gate.'],['Sannenzaka','Walk','5–8 min','Downhill.'],['Ninenzaka','Walk','4–6 min','Continue downhill.'],['Hokan-ji / Yasaka Pagoda exterior','Walk','4–6 min','Adjacent lane.'],['Yasaka Koshindo','Walk','2–3 min','Same block.'],['Kodai-ji grounds / approach','Walk','8–10 min','North through preserved streets.'],['Ishibe-koji','Walk','5–7 min','Short lane.'],['Heian Shrine','Taxi','10–15 min','Cross to Okazaki efficiently.'],['Nanzen-ji','Walk / taxi','12–18 min','East/southeast.'],['Suirokaku Aqueduct','Walk','5–7 min','Inside Nanzen complex.'],['Eikan-do','Walk','8–10 min','North.'],['Philosopher’s Path','Walk','5–8 min','Join canal.'],['Honen-in','Walk','12–18 min','Use canal as movement.'],['Ginkaku-ji','Walk','12–15 min','North end.'],['Taxi / transit to Nishiki','Taxi','20–30 min','Cross-city move; taxi often saves the day.'],['Nishiki Market','Walk','0–5 min','Arrive at market edge.'],['Nishiki Tenmangu','Walk','5–10 min','East end.'],['Shinkyogoku + Teramachi','Walk','2–5 min','Adjacent arcades.'],['Nijo Castle','Subway / taxi','15–20 min','Direct westbound reposition.'],['Kennin-ji / Gion south fill-in','Taxi / subway+walk','15–25 min','Only if ahead.'],['Yasaka / Gion fill-in','Walk','8–12 min','Same district.'],['Kiyamachi + Pontocho','Walk','10–12 min','West toward river.']
]);

many('2026-09-29',[
 ['Kyoto Airbnb → Fushimi Inari','Train','20–30 min','Keihan/JR plus walking.'],['Fushimi Inari main shrine','Walk','2–5 min','From station.'],['Senbon Torii','Walk uphill','8–12 min','Behind main shrine.'],['Okusha Hohaisho','Walk uphill','10–15 min','Continue through torii.'],['Yotsutsuji','Walk uphill','20–25 min','Flex upper climb.'],['Return to Airbnb / reset','Walk + train','30–40 min','Descend then rail.'],['Airbnb → teamLab Biovortex Kyoto','Walk / taxi','15–20 min','Use taxi if the reset runs late.'],['teamLab Biovortex Kyoto','Walk','0 min','Booked.'],['Collect bags at Kyoto Airbnb','Taxi','10–15 min','Protect one clean retrieval.'],['Kyoto Station / ekiben','Taxi / bus','10–15 min','Go straight to station.'],['Kyoto → Tokyo','Shinkansen','~2 hr 10–20 min','Nozomi.'],['Tokyo Airbnb · Kitashinjuku','JR / taxi','20–30 min','Tokyo Station→Shinjuku area.'],['Tokyo Metropolitan Government Observatory','Walk / taxi','15–25 min','From Kitashinjuku.'],['Omoide Yokocho','Walk','15–20 min','East toward station.'],['Kabukicho / Godzilla Head','Walk','8–10 min','Across north Shinjuku.'],['Hanazono Shrine','Walk','8–10 min','East side.'],['Golden Gai','Walk','2–4 min','Adjacent.'],['Shinjuku 2-chome / Kabukicho bars','Walk','8–15 min','Same nightlife district.']
]);

many('2026-09-30',[
 ['Tsukiji Outer Market','Subway','25–35 min','From Kitashinjuku/Shinjuku.'],['Namiyoke Inari','Walk','3–5 min','Market edge.'],['Tsukiji Hongwanji','Walk','6–8 min','Across the market area.'],['Tsukiji → Toyosu / Planets','Subway / taxi','20–30 min','Protect entry buffer.'],['teamLab Planets','Walk','0–5 min','At venue.'],['Toyosu / Yurikamome to Odaiba','Yurikamome','20–25 min','Elevated bay line.'],['Odaiba Statue of Liberty + Rainbow Bridge view','Walk','5–10 min','From Daiba station.'],['DiverCity Unicorn Gundam','Walk','8–10 min','Across Odaiba core.'],['Odaiba Seaside Park','Walk','10–12 min','Back toward water.'],['Kabukiza exterior','Train','25–35 min','Odaiba→Ginza.'],['Ginza Chuo-dori','Walk','5–8 min','Nearby.'],['GINZA SIX rooftop','Walk','3–5 min','On Chuo-dori.'],['Tokyo International Forum','Walk / subway','12–18 min','North toward Yurakucho.'],['Marunouchi Naka-dori','Walk','5–8 min','Adjacent.'],['Tokyo Station Marunouchi facade','Walk','6–10 min','North/east.'],['KITTE rooftop garden','Walk','3–5 min','Across plaza.'],['Yurakucho Gado-shita','Walk','10–12 min','South under tracks.'],['Ginza / Yurakucho night walk','Walk','0–10 min','Stay local.']
]);

many('2026-10-01',[
 ['Tokyo Airbnb → Asakusa / rail departure','JR / subway','30–40 min','Leave before rush.'],['Tokyo → Tobu-Nikko','Limited express','~1 hr 50–2 hr','Reserve seats.'],['Tobu-Nikko → Lake Chuzenji','Nikko bus','45–55 min','Up Irohazaka.'],['Kegon Falls','Walk','5–10 min','From Chuzenji Onsen bus stop.'],['Lake Chuzenji shore','Walk','8–12 min','Across road / lakeside.'],['Futarasan Chugushi','Walk','10–15 min','Lakeside west.'],['Akechidaira Ropeway · only if clean timing','Bus + ropeway','20–40 min total','Flex only.'],['Shinkyo Bridge','Bus downhill','40–50 min','Return to central Nikko.'],['Rinno-ji','Walk','5–8 min','Uphill from bridge.'],['Toshogu · Yomeimon / Sleeping Cat / core','Walk','5–8 min','Same complex.'],['Futarasan Shrine','Walk','5–8 min','Adjacent.'],['Taiyuin','Walk','5–8 min','Farther west.'],['Nikko cedar / shrine approach streets','Walk','0–10 min','Same heritage district.'],['Kanmangafuchi Abyss / Bake Jizo','Walk / taxi','18–25 min walk; taxi ~8 min','Flex based on daylight.'],['Return to Tobu-Nikko Station','Bus / taxi','15–25 min','Protect train.'],['Nikko → Tokyo','Limited express','~1 hr 50–2 hr','Return rail.']
]);

many('2026-10-02',[
 ['Tokyo → Kamakura','JR','55–70 min','No car.'],['Tsurugaoka Hachimangu','Walk','12–15 min','From Kamakura Station.'],['Wakamiya-oji / Dankazura','Walk','5–8 min','Main shrine axis.'],['Hokokuji bamboo garden','Taxi / bus','10–15 min','Flex east-side detour.'],['Kamakura Station → Hase','Enoden','15–20 min','Return to station, then coastal train.'],['Hasedera','Walk','5–7 min','From Hase Station.'],['Kotoku-in · Great Buddha','Walk','8–10 min','Short neighborhood walk.'],['Yuigahama Beach','Walk','12–15 min','Down to the water.'],['Gokurakuji · quick shrine/temple lane','Enoden / walk','10–15 min','Flex.'],['Inamuragasaki','Enoden + walk','10–15 min','Coast viewpoint.'],['Shichirigahama · only if ahead','Enoden','8–12 min','One more stop west.'],['Kamakura → Tokyo','Enoden + JR','70–90 min','Turn back with buffer.'],['Tokyo Airbnb reset','JR / taxi','20–30 min','Optional reset.'],['teamLab Borderless','Subway','30–40 min','Aim to arrive early.'],['Azabudai Hills / Mori JP Tower plaza','Walk','0–5 min','Outside venue.'],['Tokyo Tower exterior','Walk','12–18 min','South through Azabudai.'],['Zojoji exterior / Shiba Park','Walk','5–8 min','Tower base area.'],['Roppongi / Friday night','Subway / taxi','10–15 min','Return west/northwest.']
]);

many('2026-10-03',[
 ['Meiji Shrine','JR / subway','20–30 min','From Kitashinjuku.'],['Yoyogi Park','Walk','8–12 min','West/south edge.'],['Togo Shrine','Walk','12–18 min','Cross toward Harajuku.'],['Takeshita Street','Walk','5–8 min','Adjacent.'],['Cat Street','Walk','8–10 min','South.'],['Omotesando architecture walk','Walk','5–10 min','Continue southeast.'],['Nezu Museum garden / architecture','Walk','12–15 min','Down Omotesando.'],['Daikanyama T-Site / neighborhood','Train / taxi','15–20 min','Short reposition south.'],['Nakameguro River','Walk','12–18 min','Downhill/south.'],['Meguro / Nakameguro lunch','Walk','0–10 min','Same area.'],['Nakameguro → Shibuya','Train / taxi','8–12 min','Short move.'],['Hachiko + Shibuya Crossing','Walk','2–5 min','Station exit.'],['Shibuya Sky','Walk','3–5 min','Scramble Square.'],['Miyashita Park','Walk','8–12 min','North.'],['Center-gai / Dogenzaka','Walk','8–10 min','Back west.'],['Shibuya dinner + bars','Walk','0–10 min','Stay local.']
]);

many('2026-10-04',[
 ['Kaminarimon','Subway','25–35 min','From Kitashinjuku.'],['Nakamise before opening','Walk','1–3 min','Through gate.'],['Senso-ji','Walk','4–6 min','Straight north.'],['Asakusa Shrine','Walk','2–4 min','Next door.'],['Asakusa side streets / Hoppy Street','Walk','6–10 min','West side.'],['Imado Shrine','Taxi / walk','8 min taxi / 20 min walk','Flex.'],['Kappabashi Dougu Street','Taxi / walk','10–18 min','West.'],['Ueno Park','Subway / walk','15–20 min','Short westward transfer.'],['Ueno Toshogu','Walk','8–10 min','Inside park.'],['Shinobazu Pond + Bentendo','Walk','8–12 min','South edge.'],['Ameyoko','Walk','6–10 min','Toward Ueno/Okachimachi.'],['Yanaka Cemetery / temple lanes','JR / taxi','12–18 min','Northwest.'],['Yanaka Ginza','Walk','10–12 min','Through old neighborhood.'],['Nezu Shrine','Walk / taxi','15–20 min','South/east.'],['Nezu → Asakusa / Sumida','Subway / taxi','20–30 min','Avoid long cross-city walk.'],['Azumabashi + Sumida River walk','Walk','5–10 min','River edge.'],['Tokyo Skytree / Solamachi arrival','Walk / train','15–20 min','Across Sumida / Tobu line.'],['Tokyo Skytree observation','Elevator','Entry buffer','Arrive early.'],['Skytree → Akihabara','Train','20–30 min','Rail west.'],['Akihabara Electric Town','Walk','2–5 min','Station exits.'],['Akihabara dinner / arcade final night','Walk','0–10 min','Stay local.']
]);
window.JAPAN_TRANSFERS=X;
})();