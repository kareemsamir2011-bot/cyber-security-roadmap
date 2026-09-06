/* Verified course durations. Values are total video/content hours, not study time. */
const COURSE_DURATION_HOURS={
  '1:0':19.4261,
  '2:0':19.55,
  '3:0':37,
  '3:1':88.05,
  '4:0':0.3153,
  '5:0':1.4006,
  '5:1':19.3867,
  '5:2':null,
  '5:3':1.6014,
  '5:4':3,
  '5:5':null,
  '5:6':null,
  '6:0':35,
  '7:0':55,
  '8:0':1.0842,
  '8:1':11.6333,
  'r1:0':null,
  'b1:0':52,
  'b2:0':16
};

const COURSE_DURATION_SOURCE={
  '1:0':'Nouvil CS50 page: sum of all listed video durations in Weeks 0–7 = 19h 25m 38s; Weeks 8–10 have no durations published on the page',
  '2:0':'Teracourses: Sameh Ramadan Network+ — 19h 33m / 36 lessons',
  '3:0':'Public course listing for the exact Linux playlist — 37h',
  '3:1':'Teracourses: Arab Linux Community Linux System Administration — 88h 3m / 91 lessons',
  '4:0':'Technawi.net Telegram post for the exact PowerShell video — 18m 55s',
  '5:0':'Video metadata: Yehia Tech HTML & CSS — 1h 24m 2s',
  '5:1':'Ecosyste.ms mirror of Elzero playlist — 19h 23m 12s / 188 videos',
  '5:3':'KorsatCode listing for the exact SQL video — 1h 36m 5s',
  '5:4':'Public Telegram post linking the exact Nour Homsi project video — about 3h',
  '6:0':'Netriders Academy — Security+ SY0-601 Prep — 35h / 52 videos',
  '7:0':'Netriders Academy — eJPTv1 Prep — 55h / 59 lessons',
  '8:0':'M3aarf listing for the exact GenTiL Security video — 1h 5m 3s',
  '8:1':'Egypt 24 Academy listing for the exact GenTiL Security WAPT course — 11h 38m / 44 lessons',
  'b1:0':'Netriders Academy — eCIR Prep — 52h / 48 videos',
  'b2:0':'Netriders Academy — CCNP Security SCOR Prep — 16h'
};

function formatDurationHours(h){
  if(h==null) return 'المدة قيد التحقق';
  const total=Math.round(h*60),hh=Math.floor(total/60),mm=total%60;
  return hh?`${hh}س ${mm?mm+'د':''}`:`${mm}د`;
}

const originalStage=stage;
stage=function(s,ac=''){
  const d=done(s),t=s.resources.length,o=!!state.open[s.id];
  return `<article class="stage ${ac}"><button class="stagehead" data-open="${s.id}"><span><b>${s.title}</b><small>${s.sub} · ${d}/${t}</small></span><i>${o?'−':'+'}</i></button>${o?`<div class="resources">${s.resources.map((r,i)=>{const k=s.id+':'+i,on=!!state.doneRes[k],h=COURSE_DURATION_HOURS[k];const days=h==null?'—':Math.ceil(h/Math.max(1,studyHours));return `<div class="res"><button class="check ${on?'on':''}" data-res="${k}">${on?'✓':''}</button><a href="${r[2]}" target="_blank" rel="noreferrer"><strong>${r[0]}</strong><small>${r[1]}</small><em>⏱ مدة المحتوى: ${formatDurationHours(h)}${h!=null?` · ${days} يوم على ${studyHours} ساعة/يوم`:''}</em></a></div>`}).join('')}</div>`:''}</article>`;
};
