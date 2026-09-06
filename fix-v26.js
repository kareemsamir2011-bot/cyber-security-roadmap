/* v27 — Cloudflare Turnstile human-verification gate. */
(function(){
  const SITE_KEY = '0x4AAAAAAEqKmWZOGYAbd7KD';
  const VERIFY_URL = 'https://cyber-security-roadmap.kareemsamir2011.workers.dev/verify';
  const SESSION_KEY = 'cyber_roadmap_human_verified_v1';
  function byId(id){ return document.getElementById(id); }
  function unlock(){
    document.body.classList.remove('roadmap-locked');
    const gate = byId('human-gate'); if(gate) gate.remove();
    const boot = byId('boot'); if(boot) boot.remove();
  }
  function renderWidget(){
    const box = byId('turnstile-box');
    if(!box || box.dataset.rendered === '1') return;
    if(!window.turnstile){ setTimeout(renderWidget,150); return; }
    box.dataset.rendered='1';
    window.turnstile.render(box,{
      sitekey:SITE_KEY, theme:'dark',
      callback:async function(token){
        const status=byId('gate-status'); if(status) status.textContent='جاري التحقق…';
        try{
          const response=await fetch(VERIFY_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});
          const result=await response.json();
          if(!response.ok || !result.success) throw new Error(result.error||'Verification failed');
          sessionStorage.setItem(SESSION_KEY,'1'); unlock();
        }catch(e){
          if(status) status.textContent='تعذر التحقق. حاول مرة أخرى.';
          box.dataset.rendered='0'; if(window.turnstile) window.turnstile.reset();
        }
      },
      'expired-callback':function(){const s=byId('gate-status');if(s)s.textContent='انتهت صلاحية التحقق، حاول مرة أخرى.';},
      'error-callback':function(){const s=byId('gate-status');if(s)s.textContent='حدث خطأ في التحقق. حاول مرة أخرى.';}
    });
  }
  function boot(){
    if(!window.sessionStorage) return;
    if(sessionStorage.getItem(SESSION_KEY)==='1') return unlock();
    document.body.classList.add('roadmap-locked');
    const gate=byId('human-gate'); if(gate) gate.style.display='flex';
    renderWidget();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
