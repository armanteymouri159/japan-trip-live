(function(){
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
T.version='clean-v2-final';T.audited='2026-09-14';
const D=date=>T.days.find(d=>d.date===date);
Object.assign(T.lodgings,{
 NAG:{name:'Nagasaki Airbnb',address:'7-18 Gotōmachi 菱工ビル 4F 5F, Nagasaki, Nagasaki 850-0036, Japan'},
 BEP:{name:'Beppu Airbnb',address:'3-2-15 Kitahama, Beppu, Oita 874-0920, Japan'},
 TAK:{name:'Takachiho Airbnb',address:'5899-2 Mitai, Takachiho, Nishiusuki District, Miyazaki 882-1101, Japan'},
 OSA:{name:'Osaka Airbnb',address:'2 Chome-4-15 Shimanouchi, Chūō-ku, Osaka 542-0082, Japan'},
 KYO:{name:'Kyoto Airbnb',address:'340 Shimoatarashichō, Higashiyama-ku, Kyoto 605-0914, Japan'},
 TYO:{name:'Tokyo Airbnb',address:'4-chōme-11-17 Kitashinjuku 北新宿四丁目旅館, Shinjuku City, Tokyo 169-0074, Japan'}
});
T.days.forEach(d=>d.zones.forEach(z=>{const exact=z.stops.find(s=>s[7]);z.image=exact?exact[7]:null}));
const d23=D('2026-09-23');if(d23){d23.city='Nagasaki → Fukuoka Airport → Yufuin → Beppu';d23.mission='Leave Nagasaki around 7–8 AM. No Itoshima. Meet the friend around 2 PM at Fukuoka Airport, collect the rental car, protect Yufuin daylight and sleep at the Kitahama Airbnb.';d23.alerts=[{k:'info',t:'Locked route',x:'No Itoshima and no Fukuoka overnight. Airport pickup → Yufuin → Beppu.'}];}
const d24=D('2026-09-24');if(d24){d24.alerts=[{k:'warning',t:'Aso crater currently restricted',x:'Official Sep 1 update lowered Aso to Alert Level 2, but the roughly 1 km crater zone remains restricted. Do not budget crater-viewing time.'},{k:'info',t:'Road-trip priority',x:'Protect Yamanami Highway → Kuju → Kurokawa → Daikanbo → Milk Road → Aso Panorama Line → Kusasenri → safe Takachiho arrival.'},{k:'info',t:'Kokonoe is optional',x:'September opening begins at 08:30. Cut it before sacrificing Aso daylight.'}];d24.zones.forEach(z=>z.stops.forEach(s=>{if(/crater/i.test(s[1])){s[3]='LIVE';s[8]='Currently restricted at Alert Level 2. Recheck official status before Sep 24; the day does not depend on crater access.'}}));}
const d25=D('2026-09-25');if(d25){
 d25.city='Takachiho on foot → Kamishikimi → Fukuoka → Osaka';
 d25.mission='Use the no-boat morning to explore Takachiho properly on foot, then protect Kamishikimi, a safe rental return and Friday night in Osaka.';
 d25.alerts=[
  {k:'warning',t:'Takachiho promenade status',x:'Official Sep 3 notice closed the promenade after heavy rain; the Manai Falls viewing platform remains accessible. Recheck immediately before Sep 25 and follow only posted open/detour sections.'},
  {k:'info',t:'No rowboat scheduled',x:'There is no boat reservation. The morning is intentionally rebuilt around gorge viewpoints, basalt geology and the Takachiho/Kushifuru shrine cluster.'},
  {k:'info',t:'No Sep 25 shuttle',x:'The official September gorge shuttle runs Sep 19–23, not Sep 25. Self-park early and follow current parking guidance.'}
 ];
 d25.zones[0]={name:'Takachiho on foot · gorge + mythic town',time:'06:15–09:15',summary:'Start before crowds. Check the posted closure/detour, use only open signed sections, get Three Bridges / basalt / Manai Falls, then use the freed boat time for Takachiho Shrine and Kushifuru/Takamagahara.',cut:'If behind: cut Takamagahara first, then shorten shrine dwell. Never cut the safe westbound departure buffer.',image:'Takachiho Gorge',food:[['Breakfast to-go','convenience store Takachiho Miyazaki Japan','Buy breakfast and water the night before.']],stops:[
 ['06:15','Takachiho Airbnb → gorge parking','DRIVE','MUST','Takachiho Gorge P2 Araragi Parking Lot, Miyazaki, Japan',32.7054456,131.2974317,null,'Leave with camera, water and a light layer. Use the first practical open lot and current parking guidance.'],
 ['06:25','Official closure / detour board','LOGISTICS','MUST','Takachiho Gorge, Miyazaki, Japan',32.7032,131.3014,null,'Read the posted walking status before entering any route. Current signs beat old saved maps.'],
 ['06:35','Three Bridges viewpoint','PHOTO','MUST','Takachiho Three Bridges Viewpoint, Miyazaki, Japan',32.7022,131.3034,'Takachiho Gorge','Get the layered bridge composition while the gorge is quiet.'],
 ['06:50','Columnar basalt / gorge geology','NATURE','MUST','Takachiho Gorge, Miyazaki, Japan',32.7014,131.3023,'Takachiho Gorge','Use open viewpoints for the vertical basalt walls and deep V-shaped gorge.'],
 ['07:10','Manai Falls viewing platform','PHOTO','MUST','Manai Falls, Takachiho, Miyazaki, Japan',32.702106,131.301025,'Takachiho Gorge','Spend real time here from above. Official Sep 3 guidance says the waterfall viewing platform remains accessible.'],
 ['07:35','Open gorge edges / signed detour','WALK','HIGH','Takachiho Gorge, Miyazaki, Japan',32.7006,131.3016,'Takachiho Gorge','Use only signed open paths or the official roadway detour. Work water, basalt and bridge angles.'],
 ['08:00','Takachiho Shrine','SHRINE','MUST','Takachiho Shrine, Miyazaki, Japan',32.7064116,131.3019862,'Takachiho Shrine','Old cedar atmosphere and the main town shrine.'],
 ['08:30','Kushifuru Shrine','SHRINE','HIGH','Kushifuru Shrine, Takachiho, Miyazaki, Japan',32.7099346,131.3145174,null,'Wooded approach on the legendary Tenson-korin peak.'],
 ['08:50','Takamagahara Yohaisho','SHRINE','FLEX','Takamagahara Yohaisho, Takachiho, Miyazaki, Japan',32.7099907,131.3148768,null,'Very short companion stop beside Kushifuru; first town stop to cut.'],
 ['09:05','Back to car · depart Takachiho','MOVE','MUST','Kushifuru Shrine, Takachiho, Miyazaki, Japan',32.7099346,131.3145174,null,'Hard departure for Kamishikimi and the westbound exit.']
 ]};
 d25.zones.slice(1).forEach(z=>{z.stops=z.stops.filter(s=>!/boat|rowboat/i.test(s[1]+' '+s[8]))});
 const transit=d25.zones.find(z=>/Kamishikimi/i.test(z.name));if(transit){transit.time='10:00–18:30';transit.summary='Kamishikimi is the protected forest-shrine stop. After that, logistics win: safe drive, full-tank return, Hakata, Shinkansen and Osaka Friday night.';const times={'Kamishikimi Kumanoimasu Shrine':'10:00','Ugeto-Iwa · dry/ahead only':'10:40','Drive to Fukuoka Airport':'11:00','Fuel + rental return':'13:45','Airport → Hakata Station':'14:30','Hakata → Shin-Osaka':'15:30','Osaka Airbnb · Shimanouchi':'18:30'};transit.stops.forEach(s=>{if(times[s[1]])s[0]=times[s[1]]});}
}
T.days.forEach(d=>{const l=d.sleep&&T.lodgings[d.sleep];d.zones.forEach(z=>z.stops.forEach(s=>{if(s[2]==='HOME'&&l)s[4]=l.address}))});
T.sourceNotes=(T.sourceNotes||[]).filter(x=>!/rowboat|reserved boat|boat reservation/i.test(x));
})();