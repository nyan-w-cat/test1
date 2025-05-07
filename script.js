const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

btn.addEventListener("click", () => {
  music.muted = !music.muted;
  btn.textContent = music.muted ? "🔇" : "🔊";
});
