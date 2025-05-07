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

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
  }, 2700);
});
