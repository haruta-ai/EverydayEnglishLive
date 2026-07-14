
const flows={
mike:[
{q:"How was your day?",jp:"今日はどんな一日だった？",m:"happy",g:"wave",a:[["It was great.","とても良かった。"],["It was busy.","忙しかった。"],["It was okay.","まあまあだった。"]]},
{q:"What did you do today?",jp:"今日は何をしたの？",m:"think",g:"nod",a:[["I worked on a report.","レポートに取り組んだ。"],["I had several meetings.","会議がいくつかあった。"],["I stayed home and relaxed.","家でゆっくりした。"]]},
{q:"What was the best part of your day?",jp:"今日一番良かったことは何？",m:"happy",g:"explain",a:[["Finishing my work felt great.","仕事を終えられて良かった。"],["Lunch with a coworker was nice.","同僚とのランチが良かった。"],["Coming home was the best part.","家に帰れたのが一番だった。"]]},
{q:"What are you going to do tonight?",jp:"今夜は何をする予定？",m:"happy",g:"nod",a:[["I’m going to watch a movie.","映画を見る予定。"],["I’m going to relax.","ゆっくりする予定。"],["I haven’t decided yet.","まだ決めていない。"]]}
],
sophie:[
{q:"How are you feeling today?",jp:"今日はどんな気分？",m:"happy",g:"wave",a:[["I feel good.","いい気分。"],["I’m a little tired.","少し疲れている。"],["I feel relaxed.","リラックスしている。"]]},
{q:"What did you do this morning?",jp:"今朝は何をしたの？",m:"think",g:"nod",a:[["I went to work.","仕事に行った。"],["I had coffee at home.","家でコーヒーを飲んだ。"],["I went for a walk.","散歩に行った。"]]},
{q:"Did anything interesting happen?",jp:"何か面白いことはあった？",m:"happy",g:"explain",a:[["I met an old friend.","昔の友達に会った。"],["I started a new project.","新しいプロジェクトを始めた。"],["Nothing special happened.","特に何もなかった。"]]},
{q:"What would you like to do tomorrow?",jp:"明日は何をしたい？",m:"happy",g:"nod",a:[["I’d like to take it easy.","ゆっくりしたい。"],["I want to go shopping.","買い物に行きたい。"],["I need to do some work.","少し仕事をする必要がある。"]]}
]};
let ch=localStorage.getItem("eel05")||"mike",step=0;
const avatar=document.querySelector("#avatar"),history=document.querySelector("#history");
function name(){return ch==="mike"?"Mike":"Sophie"}
function state(cls,label){avatar.setAttribute("class",cls);document.querySelector("#stateLabel").textContent=label}
function add(type,en,jp){const d=document.createElement("div");d.className=`msg ${type}`;d.innerHTML=`<b>${en}</b><small>${jp}</small>`;history.appendChild(d);history.scrollTop=history.scrollHeight}
function speak(t,m,g){if(!speechSynthesis)return; speechSynthesis.cancel();state(`talk ${g}`,"話しています");const u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=ch==="mike"?.88:.94;u.pitch=ch==="mike"?.92:1.05;u.onend=()=>state(`idle ${m}`,"聞いています");speechSynthesis.speak(u)}
function render(announce=true){const x=flows[ch][step];document.querySelector("#nameLabel").textContent=name();document.querySelector("#speaker").textContent=name();document.querySelector("#qEn").textContent=x.q;document.querySelector("#qJp").textContent=x.jp;const c=document.querySelector("#choices");c.innerHTML="";x.a.forEach(([en,jp])=>{const b=document.createElement("button");b.innerHTML=`${en}<small>${jp}</small>`;b.onclick=()=>answer(en,jp);c.appendChild(b)});state(`idle ${x.m} ${x.g}`,"聞いています");if(announce){add("friend",x.q,x.jp);speak(x.q,x.m,x.g)}}
function answer(en,jp=""){if(!en.trim())return;add("user",en,jp);document.querySelector("#input").value="";document.querySelector("#choices").innerHTML="";state("think","考えています");setTimeout(()=>{step=(step+1)%flows[ch].length;render(true)},600)}
document.querySelector("#form").onsubmit=e=>{e.preventDefault();answer(document.querySelector("#input").value)}
document.querySelector("#switchBtn").onclick=()=>{ch=ch==="mike"?"sophie":"mike";step=0;localStorage.setItem("eel05",ch);document.querySelector("#switchBtn").textContent=ch==="mike"?"Sophieに変更":"Mikeに変更";history.innerHTML="";applyStyle();render(true)}
function applyStyle(){if(ch==="mike"){document.querySelector("#torso").setAttribute("fill","#1f3658");document.querySelector("#hairBack").setAttribute("fill","#2e2423");document.querySelector("#hairFront").setAttribute("fill","#2e2423")}else{document.querySelector("#torso").setAttribute("fill","#8e5578");document.querySelector("#hairBack").setAttribute("fill","#4a302c");document.querySelector("#hairFront").setAttribute("fill","#4a302c")}}
function blink(){setTimeout(()=>{avatar.classList.add("blink");setTimeout(()=>avatar.classList.remove("blink"),150);blink()},2600+Math.random()*4200)}
document.querySelector("#switchBtn").textContent=ch==="mike"?"Sophieに変更":"Mikeに変更";applyStyle();render(true);blink();
if("serviceWorker"in navigator)navigator.serviceWorker.getRegistrations().then(rs=>Promise.all(rs.map(r=>r.unregister()))).then(()=>navigator.serviceWorker.register("./sw.js?v=050"));
