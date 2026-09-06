/* v24 — progress is based on all core courses + the currently selected team. */
(function(){
  function update(){
    if(typeof state==='undefined'||typeof red==='undefined'||typeof blue==='undefined'||typeof done!=='function') return;
    const team=state.branch==='red'?red:blue;
    const all=[...mainStages,...team];
    const completed=all.reduce((n,s)=>n+done(s),0);
    const total=all.reduce((n,s)=>n+s.resources.length,0);
    const percent=total?Math.round(completed/total*100):0;
    const isRed=state.branch==='red';
    const box=document.querySelector('.progress');
    if(!box)return;
    box.classList.add('branch-progress');
    box.dataset.branch=isRed?'red':'blue';
    const title=box.querySelector('.progress-copy b');
    const strong=box.querySelector('.progress-copy strong');
    const small=box.querySelector('.progress-copy small');
    const bar=box.querySelector('.progress-bar span');
    const titleText=isRed?'التقدم مع Red Team':'التقدم مع Blue Team';
    const smallText=`${completed}/${total} كورس مكتمل`;
    if(title&&title.textContent!==titleText)title.textContent=titleText;
    if(strong&&strong.textContent!==percent+'%')strong.textContent=percent+'%';
    if(small&&small.textContent!==smallText)small.textContent=smallText;
    if(bar&&bar.style.width!==percent+'%')bar.style.width=percent+'%';
  }
  function start(){
    const obs=new MutationObserver(()=>requestAnimationFrame(update));
    if(document.body)obs.observe(document.body,{subtree:true,childList:true,characterData:true});
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
