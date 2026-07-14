
const characters = {
  mike: {
    name: "Mike",
    images: {
      neutral: "mike-neutral.jpg?v=022",
      happy: "mike-happy.jpg?v=022",
      thinking: "mike-thinking.jpg?v=022"
    },
    mood: "Relaxed & friendly",
    next: "Sophieに変更",
    opening: ["Hey! How was your day?", "やあ！今日はどんな一日だった？"]
  },
  sophie: {
    name: "Sophie",
    images: {
      neutral: "sophie-neutral.jpg?v=022",
      happy: "sophie-happy.jpg?v=022",
      thinking: "sophie-thinking.jpg?v=022"
    },
    mood: "Warm & thoughtful",
    next: "Mikeに変更",
    opening: ["Hi! What have you been up to today?", "こんにちは！今日は何をしていたの？"]
  }
};

const replyRules = [
  {
    words: ["tired", "exhausted", "sleepy", "busy"],
    replies: [
      ["That sounds exhausting. What was the hardest part?", "それは疲れそうだね。一番大変だったことは何？"],
      ["You’ve had a long day. Are you able to relax now?", "長い一日だったね。今は少し休めそう？"]
    ],
    expression: "thinking", gesture: "nod"
  },
  {
    words: ["meeting", "meetings", "work", "report", "project", "office"],
    replies: [
      ["Tell me more about it. What were you working on?", "もう少し聞かせて。何に取り組んでいたの？"],
      ["Interesting. Did the work go the way you expected?", "興味深いね。仕事は予想どおり進んだ？"]
    ],
    expression: "thinking", gesture: "shrug"
  },
  {
    words: ["good", "great", "happy", "fun", "finished", "success"],
    replies: [
      ["That’s great! What made it such a good day?", "それは良かったね！何が一日を良いものにしたの？"],
      ["Nice! You look pleased. What happened?", "いいね！うれしそうだね。何があったの？"]
    ],
    expression: "happy", gesture: "lean"
  },
  {
    words: ["lunch", "dinner", "food", "restaurant", "coffee"],
    replies: [
      ["That sounds good. What did you have?", "おいしそう。何を食べたの？"],
      ["Now I’m curious. Was it somewhere you often go?", "気になるな。よく行くお店だった？"]
    ],
    expression: "happy", gesture: "wave"
  },
  {
    words: ["movie", "music", "game", "book", "weekend"],
    replies: [
      ["That sounds fun. What did you like about it?", "楽しそう。どんなところが良かった？"],
      ["I’d love to hear more. Would you recommend it?", "もっと聞きたいな。おすすめできる？"]
    ],
    expression: "happy", gesture: "nod"
  }
];

const fallbackReplies = [
  ["I see. Could you tell me a little more about that?", "なるほど。もう少し詳しく教えてくれる？"],
  ["That’s interesting. How did you feel about it?", "興味深いね。それについてどう感じた？"],
  ["Got it. What happened after that?", "わかった。その後はどうなったの？"],
  ["Thanks for telling me. What are you thinking about now?", "話してくれてありがとう。今は何を考えているの？"]
];

const suggestionSets = [
  [
    ["It was good. I had a busy day.", "よかったよ。忙しい一日だった。"],
    ["I worked on a report.", "レポートに取り組んだよ。"],
    ["I’m a little tired today.", "今日は少し疲れているよ。"]
  ],
  [
    ["I had meetings all day.", "一日中会議だったよ。"],
    ["I finished an important task.", "大事な仕事を終えたよ。"],
    ["I had lunch with a coworker.", "同僚とランチをしたよ。"]
  ],
  [
    ["I’m going to relax tonight.", "今夜はゆっくりするよ。"],
    ["I might watch a movie.", "映画を見るかもしれない。"],
    ["I’m not sure yet.", "まだ決めていないよ。"]
  ]
];

let currentCharacter = localStorage.getItem("eel-character") || "mike";
let suggestionIndex = 0;
let replyCounter = 0;

const chat = document.querySelector("#chat");
const suggestions = document.querySelector("#suggestions");
const statusEl = document.querySelector("#status");
const micButton = document.querySelector("#micButton");
const input = document.querySelector("#textInput");
const characterImage = document.querySelector("#characterImage");

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function addMessage(type, en, jp = "") {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = `<strong>${escapeHtml(en)}</strong>${jp ? `<span class="jp">${escapeHtml(jp)}</span>` : ""}`;
  chat.appendChild(div);
  requestAnimationFrame(() => div.scrollIntoView({ behavior: "smooth", block: "end" }));
}

function setExpression(expression, speaking = false, gesture = "") {
  const c = characters[currentCharacter];
  characterImage.className = "";
  characterImage.src = c.images[expression] || c.images.neutral;

  if (expression !== "neutral") characterImage.classList.add(`expression-${expression}`);
  if (speaking) characterImage.classList.add("expression-speaking");
  if (gesture) {
    characterImage.classList.add(`gesture-${gesture}`);
    setTimeout(() => characterImage.classList.remove(`gesture-${gesture}`), 1300);
  }
}

let availableVoices = [];
let preferredVoiceIndex = Number(localStorage.getItem("eel-voice-index") || 0);
function refreshVoices() { availableVoices = speechSynthesis.getVoices(); }
if ("speechSynthesis" in window) {
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;
}

function chooseVoice(characterKey) {
  const voices = availableVoices.filter(v => /^en[-_]/i.test(v.lang));
  if (!voices.length) return null;

  const naturalHints = characterKey === "sophie"
    ? ["Samantha", "Ava", "Zoe", "Karen", "Moira", "Tessa", "Serena", "Premium", "Enhanced"]
    : ["Daniel", "Alex", "Tom", "Arthur", "Oliver", "Premium", "Enhanced"];

  const ranked = [];
  for (const hint of naturalHints) {
    voices
      .filter(v => v.name.toLowerCase().includes(hint.toLowerCase()))
      .forEach(v => { if (!ranked.includes(v)) ranked.push(v); });
  }
  voices.forEach(v => { if (!ranked.includes(v)) ranked.push(v); });

  return ranked[preferredVoiceIndex % ranked.length] || ranked[0];
}

function speak(text, expression = "neutral") {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  setExpression(expression, true);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = currentCharacter === "sophie" ? 0.93 : 0.88;
  utterance.pitch = currentCharacter === "sophie" ? 1.05 : 0.93;
  const voice = chooseVoice(currentCharacter);
  if (voice) utterance.voice = voice;
  utterance.onend = () => setExpression(expression, false);
  speechSynthesis.speak(utterance);
}

function renderCharacter(reset = true) {
  const c = characters[currentCharacter];
  document.querySelector("#characterName").innerHTML = `${c.name} <span>● Online</span>`;
  document.querySelector("#captionName").textContent = c.name;
  document.querySelector("#captionMood").textContent = c.mood;
  document.querySelector("#switchCharacter").textContent = c.next;
  characterImage.alt = c.name;
  setExpression("neutral");
  if (reset) {
    chat.innerHTML = "";
    suggestionIndex = 0;
    addMessage("friend", c.opening[0], c.opening[1]);
    speak(c.opening[0], "happy");
    renderSuggestions();
  }
}

function renderSuggestions() {
  suggestions.innerHTML = "";
  const set = suggestionSets[suggestionIndex % suggestionSets.length];
  set.forEach(([en, jp]) => {
    const button = document.createElement("button");
    button.className = "suggestion";
    button.innerHTML = `${escapeHtml(en)}<small>${escapeHtml(jp)}</small>`;
    button.addEventListener("click", () => submitUserText(en, jp));
    suggestions.appendChild(button);
  });
}

function chooseReply(text) {
  const normalized = text.toLowerCase();
  const rule = replyRules.find(r => r.words.some(word => normalized.includes(word)));
  if (rule) {
    const reply = rule.replies[replyCounter % rule.replies.length];
    replyCounter++;
    return { reply, expression: rule.expression, gesture: rule.gesture || "nod" };
  }
  const reply = fallbackReplies[replyCounter % fallbackReplies.length];
  replyCounter++;
  return { reply, expression: "neutral", gesture: "nod" };
}

function submitUserText(en, jp = "") {
  if (!en.trim()) return;
  addMessage("user", en.trim(), jp);
  input.value = "";
  suggestions.innerHTML = "";
  setExpression("thinking");
  statusEl.textContent = `${characters[currentCharacter].name}が考えています…`;

  setTimeout(() => {
    const result = chooseReply(en);
    addMessage("friend", result.reply[0], result.reply[1]);
    setExpression(result.expression, false, result.gesture);
    speak(result.reply[0], result.expression);
    suggestionIndex++;
    renderSuggestions();
    statusEl.textContent = "回答例をタップするか、マイクで話してください。";
  }, 550);
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


document.querySelector("#voiceButton").addEventListener("click", () => {
  preferredVoiceIndex++;
  localStorage.setItem("eel-voice-index", String(preferredVoiceIndex));
  statusEl.textContent = "声を切り替えました。";
  speak(currentCharacter === "mike" ? "This is my new voice." : "This is my new voice.", "happy");
});

function scheduleBlink() {
  const delay = 3200 + Math.random() * 4200;
  setTimeout(() => {
    characterImage.classList.add("blinking");
    setTimeout(() => characterImage.classList.remove("blinking"), 140);
    scheduleBlink();
  }, delay);
}

function scheduleIdleGesture() {
  const delay = 7000 + Math.random() * 8000;
  setTimeout(() => {
    if (!speechSynthesis.speaking) {
      const gestures = ["nod", "lean", "shrug"];
      const gesture = gestures[Math.floor(Math.random() * gestures.length)];
      setExpression("neutral", false, gesture);
    }
    scheduleIdleGesture();
  }, delay);
}

scheduleBlink();
scheduleIdleGesture();

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
      setExpression("thinking");
      statusEl.textContent = "英語で話してください…";
    } catch (_) {}
  });
  recognition.onresult = event => submitUserText(event.results[0][0].transcript);
  recognition.onerror = event => {
    statusEl.textContent = `音声入力を利用できませんでした（${event.error}）。文字入力を使えます。`;
    setExpression("neutral");
  };
  recognition.onend = () => micButton.classList.remove("listening");
} else {
  micButton.addEventListener("click", () => {
    statusEl.textContent = "このブラウザでは音声認識が使えません。文字入力または回答例を使ってください。";
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) await registration.unregister();
    navigator.serviceWorker.register("./sw.js?v=030");
  });
}

renderCharacter(true);
