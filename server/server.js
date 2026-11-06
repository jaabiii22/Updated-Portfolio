// Zero-dependency Node 18+ server: serves the portfolio and a small GitHub OAuth + upload API.
// The GitHub token lives ONLY in server memory, tied to an HttpOnly session cookie. Never sent to the browser.
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const {GITHUB_CLIENT_ID:CID,GITHUB_CLIENT_SECRET:SEC,PORT=8000}=process.env;
const BASE=process.env.BASE_URL||`http://localhost:${PORT}`,ROOT=path.join(__dirname,'..');
const OK=!!(CID&&SEC),S=new Map(),MAX=25*1024*1024,EXT=/\.(png|jpe?g|svg|pdf|zip|webp)$/i;
const MIME={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
const send=(r,c,o,h={})=>{r.writeHead(c,{'Content-Type':'application/json',...h});r.end(JSON.stringify(o))};
const ck=q=>Object.fromEntries((q.headers.cookie||'').split(/;\s*/).filter(Boolean).map(s=>s.split('=')));
const sess=q=>S.get(ck(q).sid);
const body=q=>new Promise((ok,no)=>{let b=[],n=0;q.on('data',d=>{n+=d.length;if(n>150*1024*1024){no(Error('Payload too large'));q.destroy()}else b.push(d)});q.on('end',()=>{try{ok(JSON.parse(Buffer.concat(b)||'{}'))}catch(e){no(e)}})});
async function gh(t,p,m='GET',b){const r=await fetch('https://api.github.com'+p,{method:m,headers:{Authorization:'Bearer '+t,Accept:'application/vnd.github+json','User-Agent':'portfolio-manager','X-GitHub-Api-Version':'2022-11-28'},body:b&&JSON.stringify(b)});
 const j=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(Error(j.message||'GitHub error '+r.status),{code:r.status});return j}
const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)||'project';
const repoOk=r=>/^[\w.-]+\/[\w.-]+$/.test(r||'');
http.createServer(async(q,r)=>{try{
 const u=new URL(q.url,BASE),p=u.pathname,s=sess(q);
 if(p==='/auth/login'){if(!OK)return send(r,503,{error:'not_configured'});const st=crypto.randomBytes(16).toString('hex');
  r.writeHead(302,{'Set-Cookie':`oas=${st}; HttpOnly; SameSite=Lax; Path=/; Max-Age=600`,Location:'https://github.com/login/oauth/authorize?'+new URLSearchParams({client_id:CID,redirect_uri:BASE+'/auth/callback',scope:'repo',state:st})});return r.end()}
 if(p==='/auth/callback'){if(!OK||u.searchParams.get('state')!==ck(q).oas)return send(r,400,{error:'Invalid OAuth state'});
  const t=await(await fetch('https://github.com/login/oauth/access_token',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:CID,client_secret:SEC,code:u.searchParams.get('code'),redirect_uri:BASE+'/auth/callback'})})).json();
  if(!t.access_token)return send(r,400,{error:t.error_description||'OAuth failed'});
  const me=await gh(t.access_token,'/user'),sid=crypto.randomBytes(24).toString('hex');S.set(sid,{t:t.access_token,login:me.login,avatar:me.avatar_url});
  r.writeHead(302,{'Set-Cookie':[`sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=28800`,'oas=; Max-Age=0; Path=/'],Location:'/manage.html'});return r.end()}
 if(p.startsWith('/api/')||p==='/auth/logout'){
  if(p==='/api/status')return send(r,200,{configured:OK,user:s&&{login:s.login,avatar:s.avatar}});
  if(q.method==='POST'&&q.headers['x-requested-with']!=='manage')return send(r,403,{error:'Bad request'});
  if(p==='/auth/logout'){S.delete(ck(q).sid);return send(r,200,{ok:1},{'Set-Cookie':'sid=; Max-Age=0; Path=/'})}
  if(!s)return send(r,401,{error:'Not connected to GitHub'});
  const rp=u.searchParams.get('repo'),br=u.searchParams.get('branch');
  if(p==='/api/repos'&&q.method==='GET')return send(r,200,(await gh(s.t,'/user/repos?per_page=100&sort=pushed&affiliation=owner,collaborator')).filter(x=>x.permissions&&x.permissions.push).map(x=>({full:x.full_name,def:x.default_branch,priv:x.private})));
  if(p==='/api/repos'){const b=await body(q);if(!/^[\w.-]{1,100}$/.test(b.name||''))return send(r,400,{error:'Invalid repository name'});
   const x=await gh(s.t,'/user/repos','POST',{name:b.name,private:!!b.private,auto_init:true,description:'Portfolio project files'});return send(r,200,{full:x.full_name,def:x.default_branch,priv:x.private})}
  if(p==='/api/branches'){if(!repoOk(rp))return send(r,400,{error:'Bad repo'});return send(r,200,(await gh(s.t,`/repos/${rp}/branches?per_page=100`)).map(x=>x.name))}
  if(p==='/api/projects'){if(!repoOk(rp))return send(r,400,{error:'Bad repo'});let d;try{d=await gh(s.t,`/repos/${rp}/contents/projects?ref=${encodeURIComponent(br||'')}`)}catch(e){return send(r,200,[])}
   const out=await Promise.all(d.filter(x=>x.type==='dir').map(async x=>{try{const f=await gh(s.t,`/repos/${rp}/contents/${x.path}/project.json?ref=${encodeURIComponent(br||'')}`);return{...JSON.parse(Buffer.from(f.content,'base64')),url:x.html_url}}catch(e){return null}}));return send(r,200,out.filter(Boolean))}
  if(p==='/api/publish'){const b=await body(q);if(!repoOk(b.repo)||!/^[\w./-]{1,100}$/.test(b.branch||''))return send(r,400,{error:'Bad repository or branch'});
   if(!b.title||!Array.isArray(b.files)||!b.files.length)return send(r,400,{error:'Title and at least one file are required'});
   const dir='projects/'+slug(b.title),used=new Set(),ents=[];
   const blob=async(buf)=>(await gh(s.t,`/repos/${b.repo}/git/blobs`,'POST',{content:buf.toString('base64'),encoding:'base64'})).sha;
   for(const f of b.files){const n=path.basename(String(f.name)).replace(/[^\w.\- ]/g,'_');if(!EXT.test(n))return send(r,400,{error:'File type not allowed: '+n});
    const buf=Buffer.from(f.data,'base64');if(buf.length>MAX)return send(r,400,{error:n+' exceeds 25 MB'});let m=n,i=1;while(used.has(m))m=i+++'-'+n;used.add(m);
    ents.push({path:`${dir}/${m}`,mode:'100644',type:'blob',sha:await blob(buf)})}
   const meta={title:b.title,description:b.description||'',category:b.category||'',repoUrl:b.repoUrl||'',files:ents.map(e=>path.basename(e.path)),published:new Date().toISOString()};
   ents.push({path:dir+'/project.json',mode:'100644',type:'blob',sha:await blob(Buffer.from(JSON.stringify(meta,null,2)))});
   const ref=await gh(s.t,`/repos/${b.repo}/git/ref/heads/${b.branch}`),pc=await gh(s.t,`/repos/${b.repo}/git/commits/${ref.object.sha}`);
   const tr=await gh(s.t,`/repos/${b.repo}/git/trees`,'POST',{base_tree:pc.tree.sha,tree:ents});
   const c=await gh(s.t,`/repos/${b.repo}/git/commits`,'POST',{message:String(b.message||'Add project: '+b.title).slice(0,500),tree:tr.sha,parents:[ref.object.sha]});
   await gh(s.t,`/repos/${b.repo}/git/refs/heads/${b.branch}`,'PATCH',{sha:c.sha});
   return send(r,200,{commit:c.html_url,folder:`https://github.com/${b.repo}/tree/${b.branch}/${dir}`,count:b.files.length})}
  return send(r,404,{error:'Not found'})}
 let f=path.normalize(path.join(ROOT,p==='/'?'index.html':decodeURIComponent(p)));
 if(!f.startsWith(ROOT)||f.startsWith(__dirname)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end('Not found')}
 r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)
}catch(e){send(r,e.code>=400&&e.code<600?e.code:500,{error:e.message})}}).listen(PORT,()=>console.log(`Portfolio: ${BASE}  ·  GitHub OAuth ${OK?'configured':'NOT configured (see README)'}`));
