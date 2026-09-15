(function(){'use strict';const P={
 nagasaki:{file:'Nagasaki City view from Mt Inasa04s.jpg',credit:'663highland',license:'CC BY 2.5'},
 yufuin:{file:'Lake Kinrin.JPG',credit:'Reggaeman',license:'CC BY-SA 3.0'},
 beppu:{file:'Beppu umijigoku.jpg',credit:'Mkill',license:'CC/GFDL'},
 aso:{file:'Kusasenri01.jpg',credit:'STA3816',license:'CC BY-SA 3.0'},
 takachiho:{file:'Manai Falls at Takachiho Gorge.jpg',credit:'The Modern Polymath',license:'CC BY-SA 4.0'},
 kamishikimi:{file:'上色見熊野座神社 (34654775934).jpg',credit:'Wikimedia Commons contributor',license:'CC'},
 osaka:{file:'Osaka Dotonbori yoru 00.jpg',credit:'Sakai Yayoi',license:'CC0'},
 himeji:{file:'Himeji castle in may 2015.jpg',credit:'Niko Kitsakis',license:'CC BY-SA 4.0'},
 kobe:{file:'Kobe Nunobiki Herb Garden03n3200.jpg',credit:'663highland',license:'CC BY-SA 3.0'},
 arashiyama:{file:'Bamboo Grove, Arashiyama, Kyoto, Japan.jpg',credit:'Basile Morin',license:'CC BY-SA 4.0'},
 kiyomizu:{file:'Kiyomizu-dera, Kyoto, November 2016 -01.jpg',credit:'Martin Falbisoner',license:'CC BY-SA'},
 fushimi:{file:'Fushimi Inari Shrine @ Kyoto (13406174775).jpg',credit:'Wikimedia Commons contributor',license:'CC'},
 shinjuku:{file:'Shinjuku by Night.jpg',credit:'Fboas',license:'CC'},
 shibuya:{file:'Shibuya Crossing.jpg',credit:'Landry Miguel',license:'CC BY-SA 4.0'},
 odaiba:{file:'Rainbow Bridge, Odaiba, Tokyo.jpg',credit:'Lawsonstu',license:'CC0'},
 tokyoStation:{file:'Tokyo-STA Marunouchi-Entrance 2023.jpg',credit:'MaedaAkihiko',license:'CC'},
 nikko:{file:'Nikko Toshogu Yomeimon Gate 2024.jpg',credit:'Jpatokal',license:'CC BY-SA 4.0'},
 kegon:{file:'Kegon Falls, Nikko National Park, Japan.jpg',credit:'Joli Rumi',license:'CC'},
 kamakura:{file:'JP-kamakura-daibutsu-2.jpg',credit:'Bgabel',license:'CC BY-SA 3.0'},
 sensoji:{file:'Asakusa Sensoji.jpg',credit:'ElHeineken',license:'CC BY'},
 skytree:{file:'TokyoSkyTree.jpg',credit:'Douglas P. Perkins',license:'CC BY 3.0'}
};
const dayDefault={
 '2026-09-22':'nagasaki','2026-09-23':'yufuin','2026-09-24':'aso','2026-09-25':'takachiho','2026-09-26':'himeji','2026-09-27':'arashiyama','2026-09-28':'kiyomizu','2026-09-29':'fushimi','2026-09-30':'odaiba','2026-10-01':'kegon','2026-10-02':'kamakura','2026-10-03':'shibuya','2026-10-04':'sensoji','2026-10-05':'shinjuku'};
const rules=[
 [/inasa|nagasaki|dejima|glover|peace|atomic|ryoma/i,'nagasaki'],[/kinrin|yufuin|yunotsubo|tenso/i,'yufuin'],[/beppu|kannawa|umi jigoku|hell/i,'beppu'],[/aso|kusasenri|daikanbo|milk road|komezuka|yamanami|kuju|chojabaru|makinoto|senomoto|kurokawa/i,'aso'],[/takachiho|manai|three bridges|kushifuru|takamagahara|onihachi/i,'takachiho'],[/kamishikimi|ugeto/i,'kamishikimi'],[/dotonbori|osaka|minami|hozenji|amerikamura|shinsaibashi|namba|shinsekai/i,'osaka'],[/himeji|koko-en/i,'himeji'],[/kobe|nunobiki|kitano|nankinmachi|meriken|harborland/i,'kobe'],[/arashiyama|bamboo|tenryu|kinkaku|ryoan|sagano|togetsu/i,'arashiyama'],[/kiyomizu|ninenzaka|sannenzaka|nanz|philosopher|ginkaku|gion|pontocho|yasaka|nishiki/i,'kiyomizu'],[/fushimi/i,'fushimi'],[/shinjuku|kabukicho|golden gai|omoide|hanazono/i,'shinjuku'],[/odaiba|rainbow bridge|divercity|gundam|planets/i,'odaiba'],[/tokyo station|marunouchi|kitte|yurakucho|ginza/i,'tokyoStation'],[/shibuya|harajuku|meiji|omotesando|daikanyama|nakameguro|nezu museum/i,'shibuya'],[/kegon|chuzenji/i,'kegon'],[/nikko|toshogu|futarasan|rinnoji|shinkyo/i,'nikko'],[/kamakura|hase|buddha|hokoku|hachimangu|komachi/i,'kamakura'],[/senso|asakusa|kaminarimon|nakamise|yanaka|nezu shrine|ueno|ameyoko|kappabashi/i,'sensoji'],[/skytree|oshiage|sumida|akihabara/i,'skytree']];
function keyFor(text,date){text=String(text||'');for(const [r,k] of rules)if(r.test(text))return k;return dayDefault[date]||'shibuya'}
function wm(file,w=1800){return'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file)+'?width='+w}
window.JAPAN_PHOTOS={all:P,keyFor,dayDefault,url:(k,w)=>wm((P[k]||P.shibuya).file,w),info:k=>P[k]||P.shibuya,source:k=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent((P[k]||P.shibuya).file).replace(/%20/g,'_')};})();