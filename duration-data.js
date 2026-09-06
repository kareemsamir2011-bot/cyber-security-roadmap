/* Verified course durations. Values are total video/content hours, not study time. */
const COURSE_DURATION_HOURS={
  '1:0':null,
  '1:1':36.2833,
  '2:0':19.55,
  '3:0':null,
  '3:1':88.05,
  '4:0':null,
  '5:0':1.4006,
  '5:1':19.3867,
  '5:2':null,
  '5:3':null,
  '5:4':null,
  '5:5':null,
  '5:6':null,
  '6:0':35,
  '7:0':55,
  '8:0':1,
  '8:1':null,
  'r1:0':null,
  'b1:0':null,
  'b2:0':null
};

const COURSE_DURATION_SOURCE={
  '1:1':'Teracourses: Sameh Ramadan A+ — 36h 17m / 56 lessons',
  '2:0':'Teracourses: Sameh Ramadan Network+ — 19h 33m / 36 lessons',
  '3:1':'Teracourses: Arab Linux Community Linux System Administration — 88h 3m / 91 lessons',
  '5:0':'Video metadata: Yehia Tech HTML & CSS — about 1h 24m',
  '5:1':'Ecosyste.ms mirror of Elzero playlist — 19h 23m 12s / 188 videos',
  '6:0':'Netriders Academy — Security+ SY0-601 Prep — 35h / 52 videos',
  '7:0':'Netriders Academy — eJPTv1 Prep — 55h / 59 lessons',
  '8:0':'Video description: GenTiL Security Burp Suite + ZAProxy — about 1 hour'
};

function formatDurationHours(h){
  if(h==null) return 'المدة غير موثقة حاليًا';
  const total=Math.round(h*60),hh=Math.floor(total/60),mm=total%60;
  return hh?`${hh}س ${mm?mm+'د':''}`:`${mm}د`;
}

const originalStage=stage;
stage=function(s,ac=''){
  const d=done(s),t=s.resources.length,o=!!state.open[s.id];
  return `<article class="stage ${ac}"><button class="stagehead" data-open="${s.id}"><span><b>${s.title}</b><small>${s.sub} · ${d}/${t}</small></span><i>${o?'−':'+'}</i></button>${o?`<div class="resources">${s.resources.map((r,i)=>{const k=s.id+':'+i,on=!!state.doneRes[k],h=COURSE_DURATION_HOURS[k];const days=h==null?'—':Math.ceil(h/Math.max(1,studyHours));return `<div class="res"><button class="check ${on?'on':''}" data-res="${k}">${on?'✓':''}</button><a href="${r[2]}" target="_blank" rel="noreferrer"><strong>${r[0]}</strong><small>${r[1]}</small><em>⏱ مدة المحتوى: ${formatDurationHours(h)}${h!=null?` · ${days} يوم على ${studyHours} ساعة/يوم`:''}</em></a></div>`}).join('')}</div>`:''}</article>`;
};
