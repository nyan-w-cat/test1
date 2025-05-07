AOS.init();

const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

btn.addEventListener("click", () => {
  music.muted = false;
  music.play();
  btn.textContent = "음악 끄기 🔇";

  btn.removeEventListener("click", arguments.callee); // 한 번만 작동
  btn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      btn.textContent = "음악 끄기 🔇";
    } else {
      music.pause();
      btn.textContent = "음악 켜기 🔊";
    }
  });
});
