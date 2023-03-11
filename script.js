let d = document
let sound = d.querySelector('audio')
let profile = d.querySelector('.profile')
let artist_name = d.querySelector('.artist-name')
let song_name = d.querySelector('.song-name')
let previos = d.querySelector('.previos')
let playStop = d.querySelector('.play-stop')
let next = d.querySelector('.next')
let progressContainer = d.querySelector('.progress-container')
let progress = d.querySelector('.progress')
let durationEl = d.querySelector('#duration')
let currentTimeEl = d.querySelector('#current-time')
let soundList = [
    {srcMusic:"audio/Babe-Babe-Babe.mp3", cover:"img/profile/1.jpg", nameArtist:'Mr Kiarash', nameSong:"Babe Babe Babe"},
    {srcMusic:"audio/Delam-Boye-Toro-Mikhad.mp3", cover:"img/profile/2.jpg", nameArtist:'Tarasho', nameSong:"Dealm Boye Toro Mikhad"},
    {srcMusic:"audio/EVE.mp3", cover:"img/profile/3.jpg", nameArtist:'Pvol & Erfan', nameSong:"EVE"},
    {srcMusic:"audio/Hayula.mp3", cover:"img/profile/4.jpg", nameArtist:'kourosh & Sami', nameSong:"Hayula"},
    {srcMusic:"audio/Heeey-Mikham-Raamet-Konam.mp3", cover:"img/profile/5.jpg", nameArtist:'Steelth', nameSong:"Hey Mikham Ramet Konam"},
    {srcMusic:"audio/Man-Nadaram-Bi-To.mp3", cover:"img/profile/6.jpg", nameArtist:'Tabahkar', nameSong:"Man nadaram Bito Fardaei"},
    {srcMusic:"audio/Yadesh-Bekheir.mp3", cover:"img/profile/7.jpg", nameArtist:'Mr Ech', nameSong:"Yadesh Bekheyr"}
]

// PREVIOS MUSIC
let counterSoung = 0
function previosFunc(){
    counterSoung--
    if(counterSoung<0){
        counterSoung = soundList.length - 1
        profile.setAttribute('src', soundList[counterSoung].cover)
        artist_name.innerHTML = soundList[counterSoung].nameArtist
        song_name.innerHTML = soundList[counterSoung].nameSong
    }
    else if(counterSoung>= 0 && counterSoung<soundList.length -1){
        profile.setAttribute('src', soundList[counterSoung].cover)
        sound.setAttribute('src', soundList[counterSoung].srcMusic)
        artist_name.innerHTML = soundList[counterSoung].nameArtist
        song_name.innerHTML = soundList[counterSoung].nameSong
    }
    console.log(soundList[counterSoung].cover);
    flagPlay = true
    playStopFunc()
}

// PLAY & PAUSE MUSIC
let flagPlay = true
let isPlay = false
function playStopFunc(){
    if(flagPlay){
        playStop.setAttribute('src','img/stop.png')
        sound.play()
        flagPlay = false
        isPlay = true
    }
    else if(!flagPlay){
        playStop.setAttribute('src','img/play.png')
        sound.pause()
        flagPlay = true
        isPlay = false
    }
}

// NEXT MUSIC
function nextFunc(){
    counterSoung++
    if(counterSoung >= 0 && counterSoung<soundList.length ){
        profile.setAttribute('src', soundList[counterSoung].cover)
        sound.setAttribute('src', soundList[counterSoung].srcMusic)
        artist_name.innerHTML = soundList[counterSoung].nameArtist
        song_name.innerHTML = soundList[counterSoung].nameSong
    }
    if(counterSoung > soundList.length -1){
        counterSoung = 0
        profile.setAttribute('src', soundList[counterSoung].cover)
        sound.setAttribute('src', soundList[counterSoung].srcMusic)
        artist_name.innerHTML = soundList[counterSoung].nameArtist
        song_name.innerHTML = soundList[counterSoung].nameSong
    }
    flagPlay = true
    playStopFunc()
}
function updateTimePlay(){
    if(sound.currentTime == sound.duration){
        nextFunc()
    }
}



function updateProgressBar(e) {
    if (isPlay) {
      const duration = e.srcElement.duration;
      const currentTime = e.srcElement.currentTime;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = progressPercent + "%";
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = durationMinutes + ":" + durationSeconds;
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
    }
  }

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = sound.duration;
    sound.currentTime = (clickX / width) * duration;
}


previos.addEventListener('click', previosFunc)
playStop.addEventListener('click', playStopFunc)
next.addEventListener('click', nextFunc)
sound.addEventListener("timeupdate", updateProgressBar)
sound.addEventListener("timeupdate", updateTimePlay)
progressContainer.addEventListener('click', setProgressBar)