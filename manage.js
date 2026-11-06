(()=>{const $=s=>document.querySelector(s),MAX=25*1024*1024,OKX=/\.(png|jpe?g|svg|webp|pdf|zip)$/i;
let files=[],uid=0,me=null;
const tt=$('#toast');let tm;const toast=(m,k='')=>{tt.textContent=m;tt.className='on '+k;clearTimeout(tm);tm=setTimeout(()=>tt.className='',4500)};
const api=async(p,o={})=>{const r=await fetch(p,{credentials:'same-origin',...o,headers:{'X-Requested-With':'manage',...(o.body?{'Content-Type':'application/json'}:{})}});const j=await r.json().catch(()=>({}));if(!r.ok)throw Error(j.error||'Request failed ('+r.status+')');return j};
const size=n=>n<1024?n+' B':n<1048576?(n/1024).toFixed(1)+' KB':(n/1048576).toFixed(1)+' MB';
const ext=n=>(n.split('.').pop()||'').toUpperCase();
$('#theme').onclick=()=>{const d=document.documentElement,dark=getComputedStyle(d).getPropertyValue('--bg').trim()==='#0d1117';d.dataset.t=dark?'light':'dark'};

/* ---- files ---- */
function add(list){[...list].forEach(f=>{if(!OKX.test(f.name))return toast(f.name+': unsupported file type','bad');if(f.size>MAX)return toast(f.name+' is larger than 25 MB','bad');
 const o={id:++uid,file:f,pct:0,data:null,url:/^image\//.test(f.type)?URL.createObjectURL(f):null};files.push(o);read(o)});render();gate()}
function read(o){const r=new FileReader();r.onprogress=e=>{if(e.lengthComputable){o.pct=Math.round(e.loaded/e.total*100);bar(o)}};
 r.onload=()=>{o.data=r.result.split(',')[1];o.pct=100;bar(o);gate()};r.onerror=()=>{o.err='Could not read file';render()};r.readAsDataURL(o.file)}
const bar=o=>{const b=document.querySelector(`[data-id="${o.id}"] .bar2 i`);if(b)b.style.width=o.pct+'%'};
function render(){const ul=$('#files');ul.textContent='';files.forEach(o=>{const li=document.createElement('li');li.dataset.id=o.id;
 li.innerHTML=`<div class="th">${o.url?`<img src="${o.url}" alt="">`:ext(o.file.name)}</div><div><div class="nm"></div><div class="mt">${ext(o.file.name)} · ${size(o.file.size)}${o.err?` · <span class="err">${o.err}</span>`:''}</div></div><div class="acts"><button type="button" class="ghost" data-a="pv">Preview</button><label class="ghost" style="margin:0">Replace<input type="file" hidden accept=".png,.jpg,.jpeg,.svg,.webp,.pdf,.zip"></label><button type="button" class="ghost" data-a="rm">Remove</button></div><div class="bar2"><i style="width:${o.pct}%"></i></div>`;
 li.querySelector('.nm').textContent=o.file.name;
 li.querySelector('[data-a=rm]').onclick=()=>{files=files.filter(x=>x!==o);render();gate()};
 li.querySelector('[data-a=pv]').onclick=()=>preview(o);
 li.querySelector('input').onchange=e=>{const f=e.target.files[0];if(!f)return;if(!OKX.test(f.name)||f.size>MAX)return toast('Unsupported or oversized file','bad');Object.assign(o,{file:f,pct:0,data:null,err:null,url:/^image\//.test(f.type)?URL.createObjectURL(f):null});render();read(o);gate()};
 ul.appendChild(li)})}
function preview(o){const b=$('#pvb');b.textContent='';const u=o.url||URL.createObjectURL(o.file);
 if(o.url||/svg$/i.test(o.file.name)){const i=new Image();i.src=u;i.alt=o.file.name;b.appendChild(i)}else if(/pdf$/i.test(o.file.name)){const f=document.createElement('iframe');f.src=u;f.title=o.file.name;b.appendChild(f)}
 else{const p=document.createElement('p');p.style.color='#fff';p.textContent=o.file.name+' (ZIP files can’t be previewed) · '+size(o.file.size);b.appendChild(p)}$('#pv').hidden=false}
$('#pvx').onclick=()=>$('#pv').hidden=true;
const drop=$('#drop');['dragenter','dragover'].forEach(t=>drop.addEventListener(t,e=>{e.preventDefault();drop.classList.add('over')}));
['dragleave','drop'].forEach(t=>drop.addEventListener(t,e=>{e.preventDefault();drop.classList.remove('over')}));
drop.addEventListener('drop',e=>add(e.dataTransfer.files));drop.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#pick').click()}});
$('#pick').onchange=e=>{add(e.target.files);e.target.value=''};

/* ---- repos ---- */
let repos=[];
const opt=(s,v,t)=>{const o=document.createElement('option');o.value=v;o.textContent=t||v;s.appendChild(o)};
async function loadRepos(sel){repos=await api('/api/repos');const s=$('#repo');s.textContent='';repos.forEach(r=>opt(s,r.full,r.full+(r.priv?' 🔒':'')));opt(s,'__new','+ Create a new repository…');if(sel)s.value=sel;await repoChange()}
async function loadBranches(){const s=$('#branch'),r=$('#repo').value;s.textContent='';if(r==='__new'){opt(s,'main','main (new repository)');return}
 try{const bs=await api('/api/branches?repo='+encodeURIComponent(r));bs.forEach(b=>opt(s,b));const d=(repos.find(x=>x.full===r)||{}).def;if(d)s.value=d}catch(e){toast(e.message,'bad')}}
async function repoChange(){$('#newrepo').hidden=$('#repo').value!=='__new';await loadBranches();gate();projects()}
$('#repo').onchange=repoChange;$('#branch').onchange=projects;
async function projects(){const r=$('#repo').value,box=$('#projects');if(!r||r==='__new'){$('#list').hidden=true;return}$('#list').hidden=false;$('#where').textContent=r+' @ '+$('#branch').value;
 try{const ps=await api(`/api/projects?repo=${encodeURIComponent(r)}&branch=${encodeURIComponent($('#branch').value)}`);box.textContent='';
  if(!ps.length){box.textContent='No projects published to this repository yet.';return}
  ps.forEach(p=>{const a=document.createElement('a');a.href=p.url;a.target='_blank';a.rel='noopener';const b=document.createElement('b'),s=document.createElement('span');b.textContent=p.title;s.textContent=` · ${p.category||'Project'} · ${p.files.length} file(s) · ${(p.published||'').slice(0,10)}`;const d=document.createElement('div');d.textContent=p.description||'';d.style.color='var(--mut)';a.append(b,s,d);box.appendChild(a)})}catch(e){box.textContent=e.message}}

/* ---- publish ---- */
const gate=()=>{$('#pub').disabled=!(me&&files.length&&files.every(f=>f.data)&&$('#title').value.trim()&&($('#repo').value!=='__new'||$('#rname').value.trim()))};
['#title','#rname'].forEach(s=>$(s).addEventListener('input',gate));
$('#f').addEventListener('submit',async e=>{e.preventDefault();const btn=$('#pub');btn.disabled=true;btn.textContent='Publishing…';
 try{let repo=$('#repo').value,branch=$('#branch').value;
  if(repo==='__new'){const r=await api('/api/repos',{method:'POST',body:JSON.stringify({name:$('#rname').value.trim(),private:$('#rpriv').checked})});toast('Repository created: '+r.full,'good');await loadRepos(r.full);repo=r.full;branch=r.def}
  const title=$('#title').value.trim(),payload=JSON.stringify({repo,branch,title,description:$('#desc').value,category:$('#cat').value,repoUrl:$('#url').value,message:$('#msg').value.trim()||'Add project: '+title,files:files.map(f=>({name:f.file.name,data:f.data}))});
  const res=await new Promise((ok,no)=>{const x=new XMLHttpRequest(),pg=$('#prog');pg.hidden=false;x.open('POST','/api/publish');x.setRequestHeader('Content-Type','application/json');x.setRequestHeader('X-Requested-With','manage');
   x.upload.onprogress=ev=>{if(ev.lengthComputable)pg.firstChild.style.width=Math.round(ev.loaded/ev.total*100)+'%'};
   x.onload=()=>{let j={};try{j=JSON.parse(x.responseText)}catch(_){}x.status<300?ok(j):no(Error(j.error||'Upload failed ('+x.status+')'))};x.onerror=()=>no(Error('Network error'));x.send(payload)});
  toast(`Published ${res.count} file(s) — commit created on GitHub`,'good');files=[];render();$('#f').reset();$('#repo').value=repo;projects()}
 catch(err){toast(err.message,'bad')}finally{btn.textContent='Publish Project';$('#prog').hidden=true;$('#prog').firstChild.style.width='0';gate()}});

/* ---- boot ---- */
(async()=>{const o=location.origin;$('#cb').textContent=o+'/auth/callback';$('#home').textContent=o;
 let st;try{st=await api('/api/status')}catch(e){$('#setupMsg').textContent='No backend responded at '+o+'. This page needs the included Node server (GitHub OAuth can’t run from static hosting).';$('#setup').hidden=false;return}
 if(!st.configured){$('#setupMsg').textContent='The server is running but GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET are not set.';$('#setup').hidden=false;return}
 if(!st.user){$('#connect').hidden=false;return}
 me=st.user;$('#acct').innerHTML='<img alt=""><span></span><button class="ghost" id="out">Disconnect</button>';$('#acct img').src=me.avatar;$('#acct span').textContent=me.login;
 $('#out').onclick=async()=>{await api('/auth/logout',{method:'POST',body:'{}'});location.reload()};
 $('#f').hidden=false;try{await loadRepos()}catch(e){toast(e.message,'bad')}})();
})();
