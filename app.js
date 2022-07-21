const musicContainer = document.querySelector("#music__container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#music");
const progressContainer = document.querySelector("#progress__container");
const progress = document.querySelector("#progress"),
  cover = document.querySelector("#cover"),
  title = document.querySelector("#title");

//song titles
const songs = ["Alan Walker & Ava Max", "Cem Adrian", "Dancin","Elyorbek", "Yura"];
let songIndex = 0;

//load song details
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
//Eventlistener play
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//playsong function
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
//pauseSong function
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

//change song
//EventListener prev
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//time and update function change
audio.addEventListener("timeupdate", updateProgress);
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);
  progress.style.width = `${progressPercent}%`;
}

//click and progress bar
progressContainer.addEventListener("click", setProgress);
function setProgress (e) {
  const width = this.clientWidth;
  // console.log(width);
  const clickX = e.offsetX;
  // console.log(clickX);
  const duration = audio.duration
  audio.currentTime = (clickX/width)*duration;
}
