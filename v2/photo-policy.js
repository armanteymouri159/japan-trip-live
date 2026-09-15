(function(){
'use strict';
const T=window.JAPAN_TRIP;if(!T)return;
const n=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const aliases={
 'twenty six martyrs monument':['twenty six martyrs'],
 'atomic bomb hypocenter':['nagasaki'],
 'sanno shrine one legged torii':['sanno shrine'],
 'kazagashira park ryoma statue':['sakamoto ryoma'],
 'meganebashi nakashima river':['meganebashi'],
 'nagasaki shinchi chinatown':['nagasaki chinatown'],
 'oura cathedral exterior':['oura church'],
 'mt inasa observatory':['mount inasa'],
 'kinrin lake':['yufuin'],
 'kannawa steam lanes optional':['beppu onsen'],
 'umi jigoku optional signature hell':['hells of beppu'],
 'chojabaru tadewara':['aso kuju national park'],
 'makinoto pass':['kuju mountains'],
 'daikanbo lookout':['mount aso'],
 'kusasenri':['mount aso'],
 'takachiho gorge rim walk':['takachiho gorge'],
 'manai falls overlook':['takachiho gorge'],
 'takachiho rowboat':['takachiho gorge'],
 'dotonbori ebisu bridge':['dotonbori'],
 'hozenji temple mizukake fudo':['hozen ji'],
 'shinsekai tsutenkaku exterior':['shinsekai'],
 'kitano ijinkan':['kitano cho'],
 'meriken park be kobe':['meriken park'],
 'tenryu ji sogenchi garden':['tenryu ji'],
 'arashiyama bamboo grove':['bamboo forest kyoto'],
 'togetsukyo katsura river':['togetsukyo bridge'],
 'gion shirakawa tatsumi bridge':['gion'],
 'hase dera':['hase dera kamakura'],
 'kotoku in great buddha':['kotoku in'],
 'hokokuji bamboo garden':['hokoku ji'],
 'shibuya crossing hachiko':['shibuya crossing'],
 'senso ji at dawn':['senso ji']
};
function plausible(label,wiki){if(!wiki)return false;const a=n(label),b=n(wiki);if(aliases[a])return aliases[a].some(x=>b.includes(n(x)));const A=a.split(' ').filter(x=>x.length>=4),B=new Set(b.split(' ').filter(x=>x.length>=4));return A.some(x=>B.has(x));}
const usedZoneTitles=new Set();
T.days.forEach(d=>d.zones.forEach(z=>{
 if(z.image){const zi=n(z.image);if(usedZoneTitles.has(zi))z.image=null;else usedZoneTitles.add(zi)}
 const usedStopTitles=new Set();
 z.stops.forEach(s=>{
   if(!s[7])return;
   if(!plausible(s[1],s[7])){s[7]=null;return}
   const wi=n(s[7]);
   if(usedStopTitles.has(wi)&&!n(s[1]).includes(wi)){s[7]=null;return}
   usedStopTitles.add(wi);
 });
}));
})();