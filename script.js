const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.getElementById("progress-bar");

let isPlaying = false;

// 재생/일시정지 버튼
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    playBtn.innerHTML = "▶️";
  } else {
    music.play();
    playBtn.innerHTML = "⏸️";
  }
  isPlaying = !isPlaying;
});

// 음악 끝나면 버튼 상태 복구
music.addEventListener("ended", () => {
  playBtn.innerHTML = "▶️";
  isPlaying = false;
});

// 볼륨 조절
volumeSlider.addEventListener("input", (e) => {
  music.volume = e.target.value;
});

// 재생바 동기화
music.addEventListener("timeupdate", () => {
  if (music.duration) {
    progressBar.value = (music.currentTime / music.duration) * 100;
  }
});

// 재생바 클릭 시 이동
progressBar.addEventListener("input", (e) => {
  if (music.duration) {
    music.currentTime = (e.target.value / 100) * music.duration;
  }
});

// 인트로 애니메이션 끝나면 intro 숨김
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
  }, 2700);
});
