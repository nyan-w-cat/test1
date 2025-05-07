AOS.init();

const music = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

btn.addEventListener("click", () => {
  music.muted = false;
  music.play();
  btn.textContent = "음악 끄기 🔇";

  btn.removeEventListener("click", arguments.callee); // 첫 클릭만
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
