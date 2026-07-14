
const characters = {
  mike: {
    name: "Mike",
    image: "assets/mike-square-glasses.jpg",
    mood: "Relaxed & friendly",
    next: "Sophieに変更",
    opening: ["Hey! How was your day?", "やあ！今日はどんな一日だった？"]
  },
  sophie: {
    name: "Sophie",
    image: "assets/sophie-square-glasses.jpg",
    mood: "Warm & thoughtful",
    next: "Mikeに変更",
    opening: ["Hi! What have you been up to today?", "こんにちは！今日は何をしていたの？"]
  }
};

const turns = [
  {
    suggestions: [
      ["It was good. I had a busy day.", "よかったよ。忙しい一日だった。"],
      ["I worked on a report.", "レポートに取り組んだよ。"],
      ["I’m a little tired today.", "今日は少し疲れているよ。"]
    ],
    reply: ["I see. What made your day so busy?", "そうなんだ。何でそんなに忙しかったの？"]
  },
  {
    suggestions: [
      ["I had meetings all day.", "一日中会議だったよ。"],
      ["I had a lot of paperwork.", "書類仕事がたくさんあったよ。"],
      ["A new project started.", "新しいプロジェクトが始まったよ。"]
    ],
    reply: ["That sounds like a lot. Did anything good happen?", "それは大変そうだね。何か良いことはあった？"]
  },
  {
    suggestions: [
      ["Yes, I finished an important task.", "うん、大事な仕事を終えたよ。"],
      ["I had lunch with a coworker.", "同僚とランチをしたよ。"],
      ["Not really, but I’m glad to be home.", "特には。でも家に帰れてうれしいよ。"]
    ],
    reply: ["Nice! You did well today. What are you going to do tonight?", "いいね！今日はよく頑張ったね。今夜は何をする予定？"]
  }
];

let currentCharacter = localStorage.getItem("eel-character") || "mike";
let turnIndex = 0;

const chat = document.querySelector("#chat");
const suggestions = document.querySelector("#suggestions");
const statusEl = document.querySelector("#status");
const micButton = document.querySelector("#micButton");
const input = document.querySelector("#textInput");

function addMessage(type, en, jp = "") {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = `<strong>${escapeHtml(en)}</strong>${jp ? `<span class="jp">${escapeHtml(jp)}</span>` : ""}`;
  chat.appendChild(div);
  div.scrollIntoView({ behavior: "smooth", block: "end" });
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.92;
  speechSynthesis.speak(utterance);
}

function renderCharacter(reset = true) {
  const c = characters[currentCharacter];
  document.querySelector("#characterName").innerHTML = `${c.name} <span>● Online</span>`;
  document.querySelector("#characterImage").src = c.image;
  document.querySelector("#characterImage").alt = c.name;
  document.querySelector("#captionName").textContent = c.name;
  document.querySelector("#captionMood").textContent = c.mood;
  document.querySelector("#switchCharacter").textContent = c.next;
  if (reset) {
    chat.innerHTML = "";
    turnIndex = 0;
    addMessage("friend", c.opening[0], c.opening[1]);
    speak(c.opening[0]);
    renderSuggestions();
  }
}

function renderSuggestions() {
  suggestions.innerHTML = "";
  const turn = turns[Math.min(turnIndex, turns.length - 1)];
  turn.suggestions.forEach(([en, jp]) => {
    const button = document.createElement("button");
    button.className = "suggestion";
    button.innerHTML = `${escapeHtml(en)}<small>${escapeHtml(jp)}</small>`;
    button.addEventListener("click", () => submitUserText(en, jp));
    suggestions.appendChild(button);
  });
}

function submitUserText(en, jp = "") {
  if (!en.trim()) return;
  addMessage("user", en.trim(), jp);
  input.value = "";
  suggestions.innerHTML = "";
  statusEl.textContent = `${characters[currentCharacter].name}が考えています…`;

  setTimeout(() => {
    const turn = turns[Math.min(turnIndex, turns.length - 1)];
    addMessage("friend", turn.reply[0], turn.reply[1]);
    speak(turn.reply[0]);
    turnIndex = Math.min(turnIndex + 1, turns.length - 1);
    renderSuggestions();
    statusEl.textContent = "回答例をタップするか、マイクで話してください。";
  }, 650);
}

document.querySelector("#composer").addEventListener("submit", e => {
  e.preventDefault();
  submitUserText(input.value);
});

document.querySelector("#switchCharacter").addEventListener("click", () => {
  currentCharacter = currentCharacter === "mike" ? "sophie" : "mike";
  localStorage.setItem("eel-character", currentCharacter);
  renderCharacter(true);
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  micButton.addEventListener("click", () => {
    try {
      recognition.start();
      micButton.classList.add("listening");
      statusEl.textContent = "英語で話してください…";
    } catch (_) {}
  });
  recognition.onresult = event => {
    const text = event.results[0][0].transcript;
    submitUserText(text);
  };
  recognition.onerror = event => {
    statusEl.textContent = `音声入力を利用できませんでした（${event.error}）。文字入力を使えます。`;
  };
  recognition.onend = () => micButton.classList.remove("listening");
} else {
  micButton.addEventListener("click", () => {
    statusEl.textContent = "このブラウザでは音声認識が使えません。文字入力または回答例を使ってください。";
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}

renderCharacter(true);
