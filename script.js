
const flows = {
  mike: [
    {
      q: "How was your day?",
      jp: "今日はどんな一日だった？",
      expression: "happy",
      gesture: "waving",
      answers: [
        ["It was good. I was busy at work.", "よかったよ。仕事で忙しかった。"],
        ["It was relaxing. I stayed home.", "ゆっくりした一日だった。家にいたよ。"],
        ["It was a little tiring.", "少し疲れる一日だった。"]
      ]
    },
    {
      q: "What made you busy today?",
      jp: "今日は何で忙しかったの？",
      expression: "thinking",
      gesture: "nodding",
      answers: [
        ["I had several meetings.", "いくつか会議があった。"],
        ["I worked on an important report.", "大切なレポートに取り組んだ。"],
        ["A new project started.", "新しいプロジェクトが始まった。"]
      ]
    },
    {
      q: "Did anything good happen?",
      jp: "何か良いことはあった？",
      expression: "happy",
      gesture: "explaining",
      answers: [
        ["Yes, I finished an important task.", "うん、大切な仕事を終えた。"],
        ["I had lunch with a coworker.", "同僚とランチをした。"],
        ["Not really, but I’m glad to be home.", "特には。でも家に帰れてうれしい。"]
      ]
    },
    {
      q: "What are you going to do tonight?",
      jp: "今夜は何をする予定？",
      expression: "happy",
      gesture: "nodding",
      answers: [
        ["I’m going to relax and watch a movie.", "ゆっくりして映画を見る予定。"],
        ["I’m going to have dinner with my family.", "家族と夕食を食べる予定。"],
        ["I haven’t decided yet.", "まだ決めていない。"]
      ]
    }
  ],
  sophie: [
    {
      q: "What did you do today?",
      jp: "今日は何をしたの？",
      expression: "happy",
      gesture: "waving",
      answers: [
        ["I went to work and had a busy day.", "仕事に行って忙しい一日だった。"],
        ["I stayed home and relaxed.", "家でゆっくりした。"],
        ["I met a friend for coffee.", "友達とコーヒーを飲んだ。"]
      ]
    },
    {
      q: "What was the best part of your day?",
      jp: "今日一番よかったことは何？",
      expression: "thinking",
      gesture: "nodding",
      answers: [
        ["Finishing my work was the best part.", "仕事を終えたことが一番よかった。"],
        ["Talking with my friend was nice.", "友達と話したことがよかった。"],
        ["Coming home and relaxing was the best.", "家に帰って休めたことが一番だった。"]
      ]
    },
    {
      q: "How are you feeling now?",
      jp: "今はどんな気分？",
      expression: "happy",
      gesture: "explaining",
      answers: [
        ["I feel relaxed now.", "今はリラックスしている。"],
        ["I’m a little tired, but I’m okay.", "少し疲れているけど大丈夫。"],
        ["I feel pretty good.", "かなりいい気分。"]
      ]
    },
    {
      q: "What would you like to do tomorrow?",
      jp: "明日は何をしたい？",
      expression: "happy",
      gesture: "nodding",
      answers: [
        ["I’d like to take it easy.", "ゆっくりしたい。"],
        ["I want to go for a walk.", "散歩に行きたい。"],
        ["I need to get some work done.", "仕事を少し片づけたい。"]
      ]
    }
  ]
};

let character = localStorage.getItem("eel-v04-character") || "mike";
let step = 0;
let voices = [];

const avatar = document.querySelector("#avatar");
const questionText = document.querySelector("#questionText");
const questionTranslation = document.querySelector("#questionTranslation");
const answerButtons = document.querySelector("#answerButtons");
const history = document.querySelector("#history");
const statusEl = document.querySelector("#status");
const input = document.querySelector("#textInput");

function currentName() {
  return character === "mike" ? "Mike" : "Sophie";
}

function refreshVoices() {
  voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
}
if ("speechSynthesis" in window) {
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;
}

function getVoice() {
  const hints = character === "mike"
    ? ["Daniel","Alex","Arthur","Oliver","Tom"]
    : ["Samantha","Ava","Karen","Moira","Tessa"];
  for (const hint of hints) {
    const found = voices.find(v => v.name.includes(hint));
    if (found) return found;
  }
  return voices[character === "mike" ? 0 : Math.max(voices.length - 1, 0)] || null;
}

function setAvatarState(expression = "listening", gesture = "") {
  avatar.setAttribute("class", `avatar ${expression} ${gesture}`.trim());
  document.querySelector("#expressionLabel").textContent =
    expression === "speaking" ? "話しています" :
    expression === "thinking" ? "考えています" :
    expression === "happy" ? "笑顔" : "聞いています";
}

function speak(text, expression = "happy", gesture = "") {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  setAvatarState("speaking", gesture || "explaining");

  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = character === "mike" ? 0.88 : 0.94;
  u.pitch = character === "mike" ? 0.92 : 1.05;
  const v = getVoice();
  if (v) u.voice = v;
  u.onend = () => setAvatarState(expression, "");
  speechSynthesis.speak(u);
}

function addHistory(type, en, jp = "") {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = `<strong>${en}</strong>${jp ? `<small>${jp}</small>` : ""}`;
  history.appendChild(div);
  history.scrollTop = history.scrollHeight;
}

function renderQuestion(announce = true) {
  const flow = flows[character];
  const item = flow[step % flow.length];

  questionText.textContent = item.q;
  questionTranslation.textContent = item.jp;
  document.querySelector("#speakerLabel").textContent = currentName();
  document.querySelector("#characterName").textContent = currentName();

  answerButtons.innerHTML = "";
  item.answers.forEach(([en,jp]) => {
    const btn = document.createElement("button");
    btn.className = "answer-button";
    btn.innerHTML = `${en}<small>${jp}</small>`;
    btn.onclick = () => submitAnswer(en,jp);
    answerButtons.appendChild(btn);
  });

  setAvatarState(item.expression, item.gesture);
  if (announce) {
    addHistory("friend", item.q, item.jp);
    speak(item.q, item.expression, item.gesture);
  }
}

function submitAnswer(en, jp = "") {
  if (!en.trim()) return;
  addHistory("user", en.trim(), jp);
  input.value = "";
  answerButtons.innerHTML = "";
  statusEl.textContent = `${currentName()}が考えています…`;
  setAvatarState("thinking", "");

  setTimeout(() => {
    step = (step + 1) % flows[character].length;
    renderQuestion(true);
    statusEl.textContent = "回答例をタップするか、英語で入力してください。";
  }, 650);
}

document.querySelector("#composer").addEventListener("submit", e => {
  e.preventDefault();
  submitAnswer(input.value);
});

document.querySelector("#switchCharacter").addEventListener("click", () => {
  character = character === "mike" ? "sophie" : "mike";
  step = 0;
  localStorage.setItem("eel-v04-character", character);
  document.querySelector("#switchCharacter").textContent =
    character === "mike" ? "Sophieに変更" : "Mikeに変更";
  history.innerHTML = "";
  applyCharacterStyle();
  renderQuestion(true);
});

function applyCharacterStyle() {
  const root = document.documentElement;
  if (character === "mike") {
    root.style.setProperty("--shirt", "#18385b");
    document.querySelector("#torso").setAttribute("class","shirt");
    document.querySelector("#hair").setAttribute("d","M127 188 C119 117, 160 82, 210 88 C270 72, 305 121, 290 188 C271 148, 248 135, 206 136 C165 137, 144 153, 127 188Z");
    document.querySelector("#hairSide").setAttribute("d","M125 171 C112 207, 119 241, 139 266 C132 226, 134 195, 147 168Z");
  } else {
    document.querySelector("#torso").style.fill = "#8f4f73";
    document.querySelector("#hair").setAttribute("d","M125 191 C112 111, 158 76, 210 82 C270 74, 307 122, 295 194 C281 153, 252 132, 210 132 C165 132, 139 154, 125 191Z");
    document.querySelector("#hairSide").setAttribute("d","M126 160 C95 212, 102 319, 142 350 C127 289, 130 228, 151 166Z M294 159 C326 214, 320 318, 280 352 C296 289, 292 226, 270 166Z");
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const rec = new SpeechRecognition();
  rec.lang = "en-US";
  rec.interimResults = false;

  document.querySelector("#micButton").onclick = () => {
    try {
      rec.start();
      statusEl.textContent = "英語で話してください…";
      setAvatarState("listening","");
    } catch {}
  };
  rec.onresult = e => submitAnswer(e.results[0][0].transcript);
  rec.onerror = () => statusEl.textContent = "音声入力に失敗しました。文字入力を使えます。";
} else {
  document.querySelector("#micButton").onclick = () => {
    statusEl.textContent = "このブラウザでは音声入力が使えません。";
  };
}

function blinkLoop() {
  setTimeout(() => {
    avatar.classList.add("blink");
    setTimeout(() => avatar.classList.remove("blink"), 150);
    blinkLoop();
  }, 2600 + Math.random() * 4200);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then(rs => Promise.all(rs.map(r => r.unregister())))
    .then(() => navigator.serviceWorker.register("./sw.js?v=040"));
}

document.querySelector("#switchCharacter").textContent =
  character === "mike" ? "Sophieに変更" : "Mikeに変更";
applyCharacterStyle();
renderQuestion(true);
blinkLoop();
