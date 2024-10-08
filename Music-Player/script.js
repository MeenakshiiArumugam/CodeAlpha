const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['Lover', 'Unstoppable', 'Heeriye Heeriye', 'Nadaaniyan', 'Aasa kooda'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  console.log(`Loading song: ${song}`); // Debug statement
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;

  // Reset audio and play
  audio.load();
  playSong();
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Update time display
  updateTimeDisplay(currentTime, duration);
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Update time display
function updateTimeDisplay(currentTime, duration) {
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  currTime.innerText = formatTime(currentTime);
  durTime.innerText = formatTime(duration);
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Volume control
const volumeSlider = document.getElementById('volume');
const muteButton = document.getElementById('mute');

// Set initial volume
audio.volume = volumeSlider.value;

// Volume slider event listener
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Mute button event listener
muteButton.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    muteButton.classList.remove('active');
    muteButton.querySelector('i.fas').classList.remove('fa-volume-mute');
    muteButton.querySelector('i.fas').classList.add('fa-volume-up');
  } else {
    audio.muted = true;
    muteButton.classList.add('active');
    muteButton.querySelector('i.fas').classList.remove('fa-volume-up');
    muteButton.querySelector('i.fas').classList.add('fa-volume-mute');
  }
});
