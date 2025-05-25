// 음악 재생 및 컨트롤
const audio = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const volumeSlider = document.getElementById('volume-slider');

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  totalTimeEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
  const time = (progressBar.value / 100) * audio.duration;
  audio.currentTime = time;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// 방명록 기능
document.getElementById('guestbook-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('guest-name').value;
  const message = document.getElementById('guest-message').value;

  const li = document.createElement('li');
  li.textContent = `${name}: ${message}`;
  document.getElementById('message-list').appendChild(li);

  this.reset();
});

// 이스터에그 영상
const likeBtn = document.querySelector('.like-btn');
const eggVideoContainer = document.getElementById('easter-egg-video');
const eggVideo = document.getElementById('egg-video');
const closeVideo = document.getElementById('close-video');

likeBtn.addEventListener('click', () => {
  eggVideoContainer.classList.remove('hidden');
  eggVideo.play();
});

closeVideo.addEventListener('click', () => {
  eggVideo.pause();
  eggVideo.currentTime = 0;
  eggVideoContainer.classList.add('hidden');
});

// 스크롤 애니메이션
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
