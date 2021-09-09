let currentMusic = 0;
const music = document.querySelector('#audio');

const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');

const seekBar = document.querySelector('.seek-bar');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');

const playButton = document.querySelector('.play-button');
const forwardButton = document.querySelector('.forward-button');
const backwardButton = document.querySelector('.backward-button');

// play music
function formatTime(time) {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${min}:${sec}`;
}

function setMusic(i) {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.getElementsByClassName.backgroundImage = `url("${song.cover}")"`;

  currentTime.innerHTML = '00:00';

  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
}

function playMusic() {
  music.play();
  playButton.classList.remove('pause');
  disk.classList.add('play');
}

setMusic(0);

// seek bar
setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);

  if (Math.floor(music.currentTime) === Math.floor(seekBar.max)) {
    forwardButton.click();
  }
}, 500);

seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value;
})

// button
playButton.addEventListener('click', () => {
  if (playButton.className.includes('pause')) {
    music.pause(); 
  } else {
    music.play();
  }

  playButton.classList.toggle('pause');
  disk.classList.toggle('play')
})

forwardButton.addEventListener('click', () => {
  if (currentMusic >= songs.length -1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
})

backwardButton.addEventListener('click', () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
})
