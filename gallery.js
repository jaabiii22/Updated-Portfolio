/* ====== EDIT HERE: posters and logos ======
   Posters: add the full image + a 900px-wide thumb to assets/posters/, then add one object below.
   w / h are the image's pixel size; they reserve the exact aspect ratio so nothing is cropped or stretched.
   Logos: add a transparent PNG to assets/logos/ and one object below. */
/*@P-DATA*/const POSTERS=[
 {src:'assets/posters/starbucks-frappuccino-matcha.webp',thumb:'assets/posters/starbucks-frappuccino-matcha-thumb.webp',w:920,h:1280,
  title:'Starbucks Frappuccino Matcha',cat:'Beverage promotion',tools:'Photoshop · Illustrator',
  alt:'Matcha Frappuccino cup surrounded by green powder, leaves and a liquid splash on a deep-green background',
  desc:'A matcha Frappuccino bursts out of a deep-green field of powder, leaves and liquid splash. A tone-on-tone brand pattern adds depth, and a lime two-weight headline leads the eye straight to the cup.'},
 {src:'assets/posters/pheromone-zahrah-perfume.webp',thumb:'assets/posters/pheromone-zahrah-perfume-thumb.webp',w:1532,h:2048,
  title:'Phermone Zahrah Perfume',cat:'Fragrance advertising',tools:'Photoshop · Illustrator',
  alt:'Perfume bottle on driftwood surrounded by pink flowers on a plum and rose gradient',
  desc:'A frosted bottle rests on driftwood among pink blossoms against a plum-to-rose glow. A flowing script headline, a gold serif tagline and a three-point Timeless, Elegant, You column set a soft, confident luxury tone.'},
 {src:'assets/posters/travelgood-italy-travel.webp',thumb:'assets/posters/travelgood-italy-travel-thumb.webp',w:1639,h:2048,
  title:'Travelgood Italy Travel',cat:'Travel & tourism',tools:'Photoshop · Illustrator',
  alt:'Italy travel package poster with the Colosseum, price, inclusions and cards for Milan, Rome, Venice and Florence',
  desc:'A seven-night Italy package built around the Colosseum under a deep blue sky. Icon-led inclusions, a clear price block and four rounded city cards for Milan, Rome, Venice and Florence lead to a high-contrast Book Now button.'},
 {src:'assets/posters/lionel-messi-2010-poster.webp',thumb:'assets/posters/lionel-messi-2010-poster-thumb.webp',w:1472,h:1892,
  title:'Lionel Messi Football',cat:'Sports portrait',tools:'Photoshop',
  alt:'Greyscale portrait of Lionel Messi with a colour action figure in an Argentina shirt on a light grey background',
  desc:'An editorial tribute to Lionel Messi in 2010. A greyscale close-up is paired with a full-colour action cut-out, a hand-drawn signature and a short biography, all on a clean light-grey field.'},
 {src:'assets/posters/ahsilaf-luxury-real-estate.webp',thumb:'assets/posters/ahsilaf-luxury-real-estate-thumb.webp',w:1511,h:2048,
  title:'Ahsilaf Real Estate',cat:'Real estate',tools:'Photoshop · Illustrator',
  alt:'Luxury real estate poster with twin towers at dusk and three frosted-glass cards for villas, a pool and parking',
  desc:'A luxury property campaign set at dusk. Three frosted-glass cards present villas, a private pool and premium parking with prices and interior photos, held in an open hand above a glowing twin-tower skyline.'},
 {src:'assets/posters/jewel-studio-jewellery.webp',thumb:'assets/posters/jewel-studio-jewellery-thumb.webp',w:1626,h:2047,
  title:'Jewel Studio Jewellery',cat:'Jewellery & fashion',tools:'Photoshop · Illustrator',
  alt:'Jewellery poster with a blurred portrait in burnt orange and framed close-ups of an earring and diamond pendant',
  desc:'A fashion-editorial look for a jewellery studio. A softly defocused portrait glows in burnt orange while two crisp, white-framed close-ups of an earring and a diamond pendant pull the eye, under a bold gold headline.'}
];/*@/P-DATA*/
/*@L-DATA*/const LOGOS=[
 {name:'Benzao Cafe',cat:'Café & coffee',src:'assets/logos/benzao-cafe.png',c:'#149c48',
  concept:'A friendly neighbourhood café identity built on the two things every order starts with: a straw and a coffee bean.',
  design:'A bold lowercase wordmark where the “o” becomes a coffee bean and a drinking straw curls out of the “b”. “café” is stacked beneath so the lockup stays compact.',
  colors:[['#149C48','Fresh green'],['#184221','Roasted green']],type:'Heavy rounded geometric sans, lowercase',tools:'Illustrator'},
 {name:'ZENTRO',cat:'Gaming gear',src:'assets/logos/zentra.png',c:'#32a64f',
  concept:'A gaming brand where the controller is the symbol and dripping slime is the personality.',
  design:'A glossy dark controller with a four-button layout carries the wordmark on its top edge. Toxic-green liquid runs off its base, giving the mark a memorable, playful silhouette.',
  colors:[['#212C20','Carbon'],['#32A64F','Slime green'],['#FAFBFA','Highlight']],type:'Compact techno wordmark with a slashed O',tools:'Illustrator · Photoshop'},
 {name:'VYRO',cat:'Technology',src:'assets/logos/vyro.png',c:'#3a5a9a',
  concept:'A premium tech wordmark that quietly shows what the brand makes: the “O” doubles as a computer mouse.',
  design:'Tall, high-contrast letterforms in deep navy with a sweeping V that stretches the width. A hairline mouse drawn inside the O reads as precise and refined rather than techy.',
  colors:[['#304978','Royal navy'],['#26324A','Midnight']],type:'High-contrast serif, tall and light',tools:'Illustrator'},
 {name:'VEYRA',cat:'Beauty & fashion',src:'assets/logos/veyra.png',c:'#b8984a',
  concept:'A beauty mark that pairs a monogram with a woman’s profile, so the initial and the customer are one image.',
  design:'A metallic gold V with a single-line female profile drawn beside its right stroke. Widely spaced serif capitals underneath keep it elegant and legible at small sizes.',
  colors:[['#F8E793','Champagne'],['#BA9E61','Antique gold'],['#7B5B30','Bronze']],type:'High-contrast serif, wide tracking',tools:'Illustrator'},
 {name:'OUTSPORTS',cat:'Sportswear · est. 1975',src:'assets/logos/utsports-1975.png',c:'#f26b35',
  concept:'A sports brand with heritage: every athlete leaves a unique mark, like a fingerprint.',
  design:'Heavy, extended capitals filled with a fingerprint texture. The O is drawn as a basketball with seam lines, and a small 1975 tag works as a founding-year badge.',
  colors:[['#F26B35','Signal orange']],type:'Extra-bold extended sans, all caps',tools:'Illustrator · Photoshop'},
 {name:'ELVORA',cat:'Natural beauty',src:'assets/logos/elvora.png',c:'#b9b52a',
  concept:'A natural-beauty identity that links the initial E to a botanical sprig and a soft circular sweep.',
  design:'A gold-olive monogram E sits inside an open circle crowned by a leafy sprig. The wordmark uses airy, widely spaced serif capitals with a small leaf accent on the A.',
  colors:[['#C3BF2F','Olive gold'],['#C8C791','Pale sage']],type:'Light serif capitals, wide tracking',tools:'Illustrator'}
];/*@/L-DATA*/
/* ====== end of editable area ====== */
(()=>{
const $=(s,c=document)=>[...c.querySelectorAll(s)],ring=$('.ring')[0];
const canHover=matchMedia('(hover:hover)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const grow=el=>{el.addEventListener('pointerenter',()=>ring&&ring.classList.add('big'));el.addEventListener('pointerleave',()=>ring&&ring.classList.remove('big'))};
const tilt=(el,k=8)=>el.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
el.style.setProperty('--x',x+'px');el.style.setProperty('--y',y+'px');el.style.setProperty('--ry',((x/r.width-.5)*k)+'deg');el.style.setProperty('--rx',((.5-y/r.height)*k)+'deg')});
const flat=el=>el.addEventListener('pointerleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});

/*@P-JS*/
/* ---------- Posters: JS masonry (shortest column first, real aspect ratios) ---------- */
const pm=$('#pmas')[0];
const figs=POSTERS.map((p,i)=>{const f=document.createElement('figure');f.className='pm rv';f.tabIndex=0;f.setAttribute('role','button');
f.setAttribute('aria-label','Open '+p.title+' full screen');f.style.transitionDelay=(i%3)*.1+'s';
f.innerHTML=`<div class="pimg" style="aspect-ratio:${p.w}/${p.h}"><img src="${p.thumb||p.src}" width="${p.w}" height="${p.h}" alt="${esc(p.alt||p.title)}" loading="lazy" decoding="async"></div><figcaption><b>${esc(p.title)}</b><i>${esc(p.cat)} · ${esc(p.tools||'')}</i><p>${esc(p.desc||'')}</p><em aria-hidden="true">↗</em></figcaption>`;
tilt(f);flat(f);grow(f);io.observe(f);f.addEventListener('click',()=>open(i));
f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}});return f});
let nc=0;
function layout(){const w=pm.clientWidth,n=w<480?1:w<860?2:3;if(n===nc)return;nc=n;pm.textContent='';pm.dataset.cols=n;
const cols=Array.from({length:n},()=>{const el=document.createElement('div');el.className='pcol';pm.appendChild(el);return{el,h:0}});
const cw=w/n;figs.forEach((f,i)=>{const t=cols.reduce((a,b)=>b.h<a.h?b:a);t.el.appendChild(f);t.h+=cw*POSTERS[i].h/POSTERS[i].w+24})}
layout();let rt;addEventListener('resize',()=>{cancelAnimationFrame(rt);rt=requestAnimationFrame(layout)});

/*@/P-JS*/
/*@L-JS*/
/* ---------- Logos: 3D flip cards ---------- */
const lg=$('#lggrid')[0];
LOGOS.forEach((l,i)=>{const d=document.createElement('div');d.className='lg rv';d.tabIndex=0;d.setAttribute('role','group');
d.setAttribute('aria-label',l.name+' logo card. Hover, focus or tap to see the design notes.');
d.style.setProperty('--c',l.c||'#2447ff');d.style.transitionDelay=(i%3)*.1+'s';
const sw=(l.colors||[]).map(c=>`<span class="sw" title="${esc(c[1])}"><i style="background:${c[0]}"></i>${c[0]}</span>`).join('');
d.innerHTML=`<div class="lgt"><div class="lgi">
<div class="lf"><span class="hint" aria-hidden="true">↻</span><div class="lfm"><img src="${l.src}" alt="${esc(l.name)} logo" loading="lazy" decoding="async"></div><div class="lfc"><b>${esc(l.name)}</b><span>${esc(l.cat||'')}</span></div></div>
<div class="lk"><div class="lkh"><h4>${esc(l.name)}</h4><span>${esc(l.cat||'')}</span></div>
<dl><div><dt>Concept</dt><dd>${esc(l.concept)}</dd></div><div><dt>Design</dt><dd>${esc(l.design)}</dd></div>
<div><dt>Colours</dt><dd class="sws">${sw}</dd></div>
<div class="two2"><div><dt>Typography</dt><dd>${esc(l.type)}</dd></div><div><dt>Tools</dt><dd>${esc(l.tools)}</dd></div></div></dl></div>
</div></div>`;
lg.appendChild(d);if(canHover){tilt(d,5);flat(d)}grow(d);io.observe(d);
d.addEventListener('click',e=>{if(!canHover)d.classList.toggle('flip')});
d.addEventListener('keydown',e=>{if(e.key==='Escape')d.classList.remove('flip')})});

/*@/L-JS*/
/*@P-LB*/
/* ---------- Lightbox with zoom-from-card animation ---------- */
const lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Poster viewer');
lb.innerHTML='<div class="lbbg"></div><img class="lbimg" alt=""><div class="lbcap"><b></b><span class="lbcat"></span><p></p><i></i></div><button class="lbx" aria-label="Close">✕</button><button class="lbp" aria-label="Previous poster">←</button><button class="lbn" aria-label="Next poster">→</button><span class="lbc" aria-live="polite"></span>';
document.body.appendChild(lb);
const im=$('.lbimg',lb)[0],cap=$('.lbcap',lb)[0],cnt=$('.lbc',lb)[0];let idx=0,busy=false,from=null,lastFocus=null;
const isOpen=()=>lb.classList.contains('open');
const srcEl=i=>$('.pimg',figs[i])[0];
const setBox=(r,rad)=>{im.style.left=r.left+'px';im.style.top=r.top+'px';im.style.width=r.width+'px';im.style.height=r.height+'px';im.style.borderRadius=rad+'px'};
const fit=()=>{const m=innerWidth<700,capH=innerHeight<520?70:(m?(innerWidth<400?164:146):164),top=m?56:64,w0=im.naturalWidth||800,h0=im.naturalHeight||1000,
s=Math.min(innerWidth*(m?.94:.78)/w0,(innerHeight-capH-top)/h0),w=w0*s,h=h0*s;return{left:(innerWidth-w)/2,top:top+(innerHeight-capH-top-h)/2,width:w,height:h}};
const info=()=>{const p=POSTERS[idx];$('b',cap)[0].textContent=p.title;$('.lbcat',cap)[0].textContent=p.cat;$('p',cap)[0].textContent=p.desc||'';$('i',cap)[0].textContent=p.tools||'';im.alt=p.alt||p.title;
cnt.textContent=String(idx+1).padStart(2,'0')+' / '+String(POSTERS.length).padStart(2,'0')};
const preload=()=>[1,-1].forEach(d=>{const i=(idx+d+POSTERS.length)%POSTERS.length;new Image().src=POSTERS[i].src});
async function open(i){if(busy||isOpen())return;busy=true;idx=i;from=srcEl(i);lastFocus=document.activeElement;const r=from.getBoundingClientRect();
im.style.transition='none';im.style.opacity=1;im.style.transform='none';im.src=POSTERS[i].src;try{await im.decode()}catch(e){}
setBox(r,20);info();from.classList.add('lift');lb.classList.remove('closing');lb.classList.add('open');im.getBoundingClientRect();
requestAnimationFrame(()=>{im.style.transition='all .7s cubic-bezier(.2,.8,.2,1)';setBox(fit(),18);setTimeout(()=>{busy=false;$('.lbx',lb)[0].focus({preventScroll:true});preload()},720)})}
async function go(d){if(busy||!isOpen())return;busy=true;idx=(idx+d+POSTERS.length)%POSTERS.length;
im.style.transition='opacity .25s,transform .25s';im.style.opacity=0;im.style.transform=`translateX(${-d*40}px)`;
await new Promise(r=>setTimeout(r,250));from.classList.remove('lift');from=srcEl(idx);from.classList.add('lift');
im.style.transition='none';im.src=POSTERS[idx].src;try{await im.decode()}catch(e){}
setBox(fit(),18);info();im.style.transform=`translateX(${d*40}px)`;im.getBoundingClientRect();
im.style.transition='opacity .35s,transform .45s cubic-bezier(.2,.8,.2,1)';im.style.opacity=1;im.style.transform='none';setTimeout(()=>{busy=false;preload()},450)}
function close(){if(busy||!isOpen())return;busy=true;lb.classList.add('closing');
const r=from.getBoundingClientRect(),off=r.bottom<0||r.top>innerHeight;
im.style.transition='all .6s cubic-bezier(.2,.8,.2,1)';
if(off){im.style.opacity=0;im.style.transform='scale(.85)'}else setBox(r,20);
setTimeout(()=>{from.classList.remove('lift');lb.classList.remove('open','closing');im.style.transition='none';im.style.opacity=1;im.style.transform='none';busy=false;
if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true})},640)}
$('.lbx',lb)[0].onclick=close;$('.lbbg',lb)[0].onclick=close;$('.lbp',lb)[0].onclick=()=>go(-1);$('.lbn',lb)[0].onclick=()=>go(1);
im.onclick=close;$('button',lb).forEach(grow);
addEventListener('keydown',e=>{if(!isOpen())return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);
else if(e.key==='Tab'){const b=$('button',lb),i=b.indexOf(document.activeElement);e.preventDefault();b[(i+(e.shiftKey?-1:1)+b.length)%b.length].focus()}
else if([' ','PageDown','PageUp','ArrowDown','ArrowUp','Home','End'].includes(e.key))e.preventDefault()});
['wheel','touchmove'].forEach(t=>addEventListener(t,e=>{if(isOpen())e.preventDefault()},{passive:false}));
let tx=0,ty=0;lb.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
lb.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)go(dx<0?1:-1)},{passive:true});
addEventListener('resize',()=>{if(isOpen()&&!busy){im.style.transition='none';setBox(fit(),18)}});
/*@/P-LB*/
})();
