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

// 매트릭스 효과
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  // 실제 픽셀 크기 맞추기
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // 0, 1만 사용
  const alphabet = '01';
  const fontSize = 22;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.16)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px 'Fira Code', monospace";
    ctx.fillStyle = "#58ff58";
    for (let i = 0; i < drops.length; i++) {
      const text = alphabet[Math.floor(Math.random() * alphabet.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);
}
