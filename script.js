// 오디오 플레이어
const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume-slider");

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    music.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});

music.addEventListener("ended", () => {
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  isPlaying = false;
});

volumeSlider.addEventListener("input", (e) => {
  music.volume = e.target.value;
});

// 인트로 애니메이션 끝나면 intro 숨김
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.style.display = "none";
  }, 2700);
});

// 매트릭스 효과 (전체 배경)
const canvas = document.getElementById('matrix-bg');
if (canvas) {
  // 풀스크린 대응
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
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // 중앙 소개 영역과 겹치지 않도록 예외 처리
      const centerStart = (window.innerWidth - 520) / 2;
      const centerEnd = (window.innerWidth + 520) / 2;
      const x = i * fontSize;
      if (x > centerStart && x < centerEnd) {
        // 중앙 블록 위는 그리지 않음
        continue;
      }

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);
}
