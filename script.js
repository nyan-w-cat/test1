const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume-slider");

let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  } else {
    music.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  }
  isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", (e) => {
  music.volume = e.target.value;
});
