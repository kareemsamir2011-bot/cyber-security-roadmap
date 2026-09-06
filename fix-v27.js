/* v27 — show course completion time for every roadmap item. */
(function(){
  if(window.__roadmap_duration_v27) return;
  window.__roadmap_duration_v27 = true;
  const ESTIMATED = {'5:2':12,'5:5':15,'5:6':13.25,'r1:0':60};
  function info(key){
    const exact = typeof COURSE_DURATION_HOURS !== 'undefined' ? COURSE_DURATION_HOURS[key] : null;
    if(typeof exact==='number' && isFinite(exact) && exact>0) return {hours:exact,estimated:false};
    if(typeof ESTIMATED[key]==='number') return {hours:ESTIMATED[key],estimated:true};
    return null;
  }
  function fmt(h){
    const m=Math.round(h*60), hh=Math.floor(m/60), mm=m%60;
    return hh&&mm?`${hh}س ${mm}د`:hh?`${hh}س`:`${mm}د`;
  }
  const baseStage=stage;
  stage=function(s,ac=''){
    const d=done(s),t=s.resources.length,o=!!state.open[s.id];
    return `<article class="stage ${ac}"><button class="stagehead" data-open="${s.id}"><span><b>${s.title}</b><small>${s.sub} · ${d}/${t}</small></span><i>${o?'−':'+'}</i></button>${o?`<div class="resources">${s.resources.map((r,i)=>{
      const k=s.id+':'+i,on=!!state.doneRes[k],x=info(k),daily=Number(studyHours)>0?Number(studyHours):2;
      const days=x?Math.max(1,Math.ceil(x.hours/daily)):null;
      const text=x?`⏱ مدة المحتوى: ${fmt(x.hours)} · وقت الإنهاء: ${days} يوم على ${daily} ساعة/يوم${x.estimated?' · تقديري':''}`:'⏱ وقت الإنهاء: قيد التحقق';
      return `<div class="res"><div class="res-check"><button class="check ${on?'on':''}" data-res="${k}" aria-label="منجز">${on?'✓':''}</button><span>منجز</span></div><a href="${r[2]}" target="_blank" rel="noreferrer"><strong>${r[0]}</strong><small>${r[1]}</small><em>${text}</em></a></div>`;
    }).join('')}</div>`:''}</article>`;
  };
})();
