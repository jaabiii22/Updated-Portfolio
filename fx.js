(()=>{
const $=(s,c=document)=>[...c.querySelectorAll(s)],clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const IC={bz:'<path d="M4 18C6 6 18 6 20 18"/><rect x="2.5" y="16.5" width="3" height="3"/><rect x="18.5" y="16.5" width="3" height="3"/>',cu:'<path d="M5 3l14 7-6 2-2 6z"/>',gr:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16M12 4v16"/>',ly:'<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/>',fr:'<path d="M7 3v14h14M3 7h14v14"/>',ey:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',ty:'<path d="M4 19 10 5l6 14M6.5 14h7"/>',pl:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/>',sp:'<path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>'};
const svg=k=>`<svg viewBox="0 0 24 24">${IC[k]}</svg>`;
// ---------- Marquee ----------
const vm=$('.vm')[0];
if(vm){
const words=[['User Research','ey'],['Wireframing','gr'],['Prototyping','cu'],['Visual Hierarchy','ly'],['Typography','ty'],['Accessibility','ey'],['Design Systems','fr'],['Branding','pl'],['Motion','sp']];
const chips=[['Figma','#a259ff'],['Adobe XD','#ff61f6'],['Illustrator','#ff9a00'],['Photoshop','#31a8ff'],['After Effects','#9999ff'],['WCAG 2.1','#10b981'],['Usability Testing','#f97316'],['Journey Mapping','#ec4899'],['Information Architecture','#60a5fa'],['Responsive Design','#a78bfa'],['Logo Design','#facc15'],['Posters','#34d399']];
const A=words.map((w,i)=>`<span class="vi ${['','o','g'][i%3]}">${svg(w[1])}${w[0]}</span>`).join('');
const B=chips.map(c=>`<span class="vc"><i style="--d:${c[1]}"></i>${c[0]}</span>`).join('');
const rows=$('.vm-row',vm).map((el,i)=>{const tr=$('.vm-track',el)[0],set=i?B:A;tr.innerHTML=set+set+set+set;return{el,tr,dir:i?-1:1,pos:0,k:1,hover:false,w:1,base:i?55:78}});
const measure=()=>rows.forEach(r=>{r.w=r.tr.scrollWidth/2});
measure();addEventListener('resize',measure);if(document.fonts)document.fonts.ready.then(measure);
rows.forEach(r=>{r.el.addEventListener('pointerenter',()=>r.hover=true);r.el.addEventListener('pointerleave',()=>r.hover=false)});
vm.addEventListener('pointermove',e=>{const b=vm.getBoundingClientRect();vm.style.setProperty('--mx',e.clientX-b.left+'px');vm.style.setProperty('--my',e.clientY-b.top+'px')});
let vis=true,lastY=scrollY,v=0,dirF=1,last=performance.now();
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(vm);
(function tick(now){const dt=Math.min(.05,(now-last)/1000);last=now;const dy=scrollY-lastY;lastY=scrollY;v+=(dy-v)*.12;if(Math.abs(dy)>.5)dirF+=((dy>0?1:-1)-dirF)*.12;
if(vis&&!reduce)rows.forEach(r=>{r.k+=((r.hover?0:1)-r.k)*.08;r.pos+=r.dir*dirF*(r.base+Math.abs(v)*40)*r.k*dt;r.pos=((r.pos%r.w)+r.w)%r.w;
r.tr.style.transform=`translate3d(${-r.pos}px,0,0)`;r.el.style.transform=`skewX(${clamp(-v*.4,-9,9)}deg)`});
requestAnimationFrame(tick)})(last);
}
// ---------- Progress bar, back-to-top ----------
const sp=document.createElement('div');sp.className='sp';document.body.appendChild(sp);
const btt=document.createElement('button');btt.className='btt';btt.setAttribute('aria-label','Back to top');
btt.innerHTML='<svg viewBox="0 0 54 54"><circle class="tr" cx="27" cy="27" r="22"/><circle class="pg" cx="27" cy="27" r="22"/></svg><b>↑</b>';
document.body.appendChild(btt);btt.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const ring=$('.ring')[0];[btt].forEach(el=>{el.addEventListener('pointerenter',()=>ring&&ring.classList.add('big'));el.addEventListener('pointerleave',()=>ring&&ring.classList.remove('big'))});
// ---------- Doodles ----------
const dd=document.createElement('div');dd.className='dd';
const D=[['bz',8,40,.18,60],['cu',86,120,.3,36],['fr',18,380,.22,48],['gr',72,520,.14,56],['ty',92,700,.26,44],['pl',4,820,.2,50],['sp',55,260,.34,34],['ly',40,640,.16,52]];
const dn=D.map(d=>{dd.insertAdjacentHTML('beforeend',`<svg viewBox="0 0 24 24" style="left:${d[1]}%;width:${d[4]}px;height:${d[4]}px">${IC[d[0]]}</svg>`);return{el:dd.lastChild,top:d[2],sp:d[3]}});
document.body.prepend(dd);
// ---------- Pen underline under headings ----------
$('.big,.huge').forEach(h=>h.insertAdjacentHTML('afterend','<svg class="pen" viewBox="0 0 300 14" preserveAspectRatio="none"><path d="M3 9C60 2 120 14 180 6S270 3 297 8"/></svg>'));
// ---------- Scrollspy ----------
const links=$('.nav nav a[href^="#"]:not(.talk)'),secs=links.map(a=>$(a.getAttribute('href'))[0]);
// ---------- Scroll loop ----------
const hT=$('.hero-text')[0],hP=$('.hero-photo')[0],b1=$('.b1')[0];let tk=false;
function onScroll(){tk=false;const y=scrollY,H=document.documentElement.scrollHeight-innerHeight,p=H>0?y/H:0;
document.body.style.setProperty('--sp',p.toFixed(4));btt.classList.toggle('show',y>650);
let cur=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<innerHeight*.4)cur=i});links.forEach((a,i)=>a.classList.toggle('act',i===cur));
if(reduce)return;
if(y<innerHeight*1.3){if(hT)hT.style.translate=`0 ${y*.12}px`;if(hP){hP.style.translate=`0 ${y*.07}px`;hP.style.scale=1-clamp(y/innerHeight,0,1)*.08}}
if(b1)b1.style.translate=`0 ${y*.18}px`;
const R=innerHeight+240;dn.forEach((d,i)=>{const yy=(((d.top-y*d.sp)%R)+R)%R-120;d.el.style.transform=`translate3d(0,${yy}px,0) rotate(${y*(.03+i*.006)}deg)`})}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onScroll)}},{passive:true});addEventListener('resize',onScroll);onScroll();
// ---------- Click ripple ----------
addEventListener('pointerdown',e=>{if(reduce)return;const r=document.createElement('span');r.className='rp';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),700)});
})();
