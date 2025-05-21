// 🎵 오디오 플레이어
const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playBtn.classList.remove('playing');
  } else {
    music.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

music.addEventListener("ended", () => {
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  playBtn.classList.remove('playing');
  isPlaying = false;
});

volumeSlider.addEventListener("input", (e) => {
  music.volume = e.target.value;
});

music.addEventListener("timeupdate", () => {
  if (music.duration) {
    const percent = (music.currentTime / music.duration) * 100;
    progressBar.value = percent;
    currentTimeEl.textContent = formatTime(music.currentTime);
    totalTimeEl.textContent = formatTime(music.duration);
  }
});

progressBar.addEventListener("input", (e) => {
  if (music.duration) {
    music.currentTime = (e.target.value / 100) * music.duration;
  }
});

function formatTime(sec) {
  sec = Math.floor(sec);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// 👋 인트로 애니메이션
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }, 2700);

  // 📝 방명록 메시지 로드
  const saved = JSON.parse(localStorage.getItem("guestbook")) || [];
  saved.forEach(addMessageToList);
});

// 🟩 매트릭스 배경
const canvas = document.getElementById('matrix-bg');
if (canvas) {
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const ctx = canvas.getContext('2d');
  const alphabet = '01';
  let fontSize = 22;
  let columns, drops;

  function setupMatrix() {
    fontSize = Math.max(18, Math.floor(window.innerWidth / 70));
    columns = Math.floor(window.innerWidth / fontSize);
    drops = Array(columns).fill(1);
  }
  setupMatrix();
  window.addEventListener('resize', setupMatrix);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.13)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px 'Fira Code', monospace";
    ctx.fillStyle = "#58ff58";
    for (let i = 0; i < drops.length; i++) {
      const text = alphabet[Math.floor(Math.random() * alphabet.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      const centerStart = (window.innerWidth - 520) / 2;
      const centerEnd = (window.innerWidth + 520) / 2;
      if (x > centerStart && x < centerEnd && y > 80 && y < window.innerHeight - 140) {
        // 중앙 블록 위는 그리지 않음
      } else {
        ctx.fillText(text, x, y);
      }

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);
}

// 💬 방명록 기능
const form = document.getElementById("guestbook-form");
const nameInput = document.getElementById("guest-name");
const messageInput = document.getElementById("guest-message");
const messageList = document.getElementById("message-list");

function addMessageToList(entry) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${entry.name}</strong><br/>${entry.message}`;
  messageList.prepend(li);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name && message) {
      const entry = { name, message };
      const messages = JSON.parse(localStorage.getItem("guestbook")) || [];
      messages.push(entry);
      localStorage.setItem("guestbook", JSON.stringify(messages));
      addMessageToList(entry);
      form.reset();
    }
  });
}
document.getElementById("guestbook-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("guest-name").value.trim();
  const message = document.getElementById("guest-message").value.trim();

  if (!name || !message) return;

  const entry = { name, message, timestamp: new Date().toLocaleString() };
  const entries = JSON.parse(localStorage.getItem("guestbookEntries") || "[]");
  entries.push(entry);
  localStorage.setItem("guestbookEntries", JSON.stringify(entries));

  appendMessage(entry);
  this.reset();
});

function appendMessage(entry) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${entry.name}</strong> (${entry.timestamp}):<br>${entry.message}`;
  document.getElementById("message-list").appendChild(li);
}

function loadMessages() {
  const entries = JSON.parse(localStorage.getItem("guestbookEntries") || "[]");
  entries.forEach(appendMessage);
}

window.addEventListener("DOMContentLoaded", loadMessages);

function revealOnScroll() {
  const hiddenElements = document.querySelectorAll('.hidden-on-load');
  const windowHeight = window.innerHeight;

  hiddenElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 100) {
      el.classList.add('fade-in-visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('guestbook-form');
  const nameInput = document.getElementById('guest-name');
  const messageInput = document.getElementById('guest-message');
  const messageList = document.getElementById('message-list');

  // 저장된 메시지 불러오기
  const savedMessages = JSON.parse(localStorage.getItem('guestbookMessages')) || [];
  savedMessages.forEach(addMessageToList);

  // 폼 제출 시 처리
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (!name || !message) return;

    const newMessage = { name, message };
    savedMessages.push(newMessage);
    localStorage.setItem('guestbookMessages', JSON.stringify(savedMessages));
    addMessageToList(newMessage);

    form.reset();
  });

  // 메시지를 리스트에 추가하는 함수
  function addMessageToList({ name, message }) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong>: ${message}`;
    messageList.appendChild(li);
  }
});
