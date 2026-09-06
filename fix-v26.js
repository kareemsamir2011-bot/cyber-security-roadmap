/* v26 — Cloudflare Turnstile human-verification gate. */
(function(){
  const SITE_KEY = '0x4AAAAAAEqKmWZOGYAbd7KD';
  const VERIFY_URL = 'https://cyber-security-roadmap.kareemsamir2011.workers.dev/verify';
  const SESSION_KEY = 'cyber_roadmap_human_verified_v1';

  function unlock(){
    document.body.classList.remove('roadmap-locked');
    const gate = document.getElementById('human-gate');
    if(gate) gate.remove();
  }

  function showGate(){
    if(sessionStorage.getItem(SESSION_KEY) === '1') return unlock();
    document.body.classList.add('roadmap-locked');

    const gate = document.createElement('div');
    gate.id = 'human-gate';
    gate.innerHTML = `
      <div class="human-gate-card" dir="rtl">
        <div class="human-gate-icon">🛡️</div>
        <div class="human-gate-kicker">CYBER SECURITY ROADMAP</div>
        <h1>تأكيد إنك إنسان</h1>
        <p>اعمل التحقق الأمني مرة واحدة للدخول إلى خارطة التعلم.</p>
        <div id="turnstile-box"></div>
        <div id="gate-status" aria-live="polite"></div>
      </div>`;
    document.body.appendChild(gate);

    const renderWidget = () => {
      if(!window.turnstile) return setTimeout(renderWidget, 100);
      window.turnstile.render('#turnstile-box', {
        sitekey: SITE_KEY,
        theme: 'dark',
        callback: async function(token){
          const status = document.getElementById('gate-status');
          if(status) status.textContent = 'جاري التحقق…';
          try {
            const response = await fetch(VERIFY_URL, {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({token})
            });
            const result = await response.json();
            if(!response.ok || !result.success) throw new Error(result.error || 'Verification failed');
            sessionStorage.setItem(SESSION_KEY, '1');
            unlock();
          } catch(e) {
            if(status) status.textContent = 'تعذر التحقق. حاول مرة أخرى.';
            if(window.turnstile) window.turnstile.reset();
          }
        },
        'expired-callback': function(){
          const status = document.getElementById('gate-status');
          if(status) status.textContent = 'انتهت صلاحية التحقق، حاول مرة أخرى.';
        },
        'error-callback': function(){
          const status = document.getElementById('gate-status');
          if(status) status.textContent = 'حدث خطأ في التحقق. حاول مرة أخرى.';
        }
      });
    };
    renderWidget();
  }

  function boot(){
    if(!window.sessionStorage) return;
    showGate();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
