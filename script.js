(()=>{
const $=(s,c=document)=>[...c.querySelectorAll(s)];
let mx=innerWidth/2,my=innerHeight/3,rx=mx,ry=my,gx=mx,gy=my;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
$('#y')[0].textContent=new Date().getFullYear();
// letter-split headings
$('[data-split]').forEach(el=>{const t=el.textContent.trim();el.setAttribute('aria-label',t);
el.innerHTML=t.split(' ').map(w=>'<span class="w" aria-hidden="true">'+[...w].map(c=>'<span class="ch">'+c+'</span>').join('')+'</span>').join(' ');
if(!el.closest('h1'))el.classList.add('rv')});
// scroll-driven word highlight
const sc=$('[data-scrub]')[0];sc.innerHTML=sc.textContent.trim().split(' ').map(w=>'<span>'+w+'</span>').join(' ');const sw=$('span',sc);
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);
$('[data-count]',e.target).forEach(n=>{const to=+n.dataset.count;let i=0;const t=setInterval(()=>{n.textContent=++i;if(i>=to)clearInterval(t)},120)})}}),{threshold:.15});
$('.rv').forEach((el,i)=>{if(el.closest('.hero'))el.style.transitionDelay=(i*.09)+'s';io.observe(el)});
document.querySelectorAll('h1 .ch').forEach((c,i)=>{c.style.opacity=0;c.style.transform='translateY(40px)';setTimeout(()=>{c.style.transition='opacity .7s,transform .7s cubic-bezier(.2,.7,.2,1),color .25s';c.style.opacity=1;c.style.transform=''},150+i*55);setTimeout(()=>c.style.transition='',1400+i*55)});
// scroll handlers
const nav=$('#nav')[0],steps=$('.steps')[0];
function onScroll(){nav.classList.toggle('sc',scrollY>20);
const r=sc.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));
sw.forEach((s,i)=>s.classList.toggle('on',i/sw.length<p));
const q=steps.getBoundingClientRect();steps.style.setProperty('--pr',Math.min(1,Math.max(0,(innerHeight*.8-q.top)/(q.height+150))))}
addEventListener('scroll',onScroll,{passive:true});onScroll();
// cursor, glow, parallax
const dot=$('.dot')[0],ring=$('.ring')[0],blob=$('.b2')[0],chars=$('.ch'),cbox=$('.cbox')[0];
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px)`;
const px=mx/innerWidth-.5,py=my/innerHeight-.5;
$('[data-par]').forEach(el=>el.style.transform=`translate(${px*16}px,${py*16}px)`);
$('[data-par2]').forEach((el,i)=>el.style.transform=`translate(${px*-(26+i*10)}px,${py*-(26+i*10)}px)${el.classList.contains('script')?' rotate(-8deg)':''}`)});
cbox.addEventListener('pointermove',e=>{const r=cbox.getBoundingClientRect();cbox.style.setProperty('--x',e.clientX-r.left+'px');cbox.style.setProperty('--y',e.clientY-r.top+'px')});
(function loop(){rx+=(mx-rx)*.17;ry+=(my-ry)*.17;gx+=(mx-gx)*.06;gy+=(my-gy)*.06;
ring.style.transform=`translate(${rx}px,${ry}px)`;blob.style.setProperty('--gx',gx+'px');blob.style.setProperty('--gy',gy+'px');
if(fine&&!reduce)for(const c of chars){const r=c.getBoundingClientRect();if(r.bottom<-80||r.top>innerHeight+80)continue;
const d=Math.hypot(mx-(r.left+r.width/2),my-(r.top+r.height/2));c.style.setProperty('--p',Math.max(0,1-d/120).toFixed(2))}
requestAnimationFrame(loop)})();
$('a,.tool,.card,.skills span,.step,.stats div').forEach(el=>{el.addEventListener('pointerenter',()=>ring.classList.add('big'));el.addEventListener('pointerleave',()=>ring.classList.remove('big'))});
// magnetic buttons
$('[data-mag]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.28}px,${(e.clientY-r.top-r.height/2)*.38}px)`});
el.addEventListener('pointerleave',()=>el.style.transform='');el.style.transition='transform .3s ease-out,background .3s,color .3s,border-color .3s,box-shadow .3s'});
// tilt + spotlight
$('[data-tilt]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
el.style.setProperty('--x',x+'px');el.style.setProperty('--y',y+'px');el.style.setProperty('--ry',((x/r.width-.5)*7)+'deg');el.style.setProperty('--rx',((.5-y/r.height)*7)+'deg')});
el.addEventListener('pointerleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')})});
})();
