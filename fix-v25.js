/* v25 — always return Google OAuth to the live GitHub Pages app. */
(function(){
  const REDIRECT='https://kareemsamir2011-bot.github.io/cyber-security-roadmap/';
  function patch(){
    if(!window.supabase||typeof window.supabase.createClient!=='function') return false;
    if(window.supabase.createClient.__roadmap_v25) return true;
    const original=window.supabase.createClient;
    const wrapped=function(){
      const client=original.apply(this,arguments);
      if(client&&client.auth&&typeof client.auth.signInWithOAuth==='function'){
        const oauth=client.auth.signInWithOAuth.bind(client.auth);
        client.auth.signInWithOAuth=function(options){
          if(options&&options.provider==='google'){
            options=Object.assign({},options,{options:Object.assign({},options.options,{redirectTo:REDIRECT})});
          }
          return oauth(options);
        };
      }
      return client;
    };
    wrapped.__roadmap_v25=true;
    window.supabase.createClient=wrapped;
    return true;
  }
  if(!patch()){
    const timer=setInterval(function(){if(patch())clearInterval(timer)},50);
    setTimeout(function(){clearInterval(timer)},10000);
  }
})();
