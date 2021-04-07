//since it's html5 video elem, theres mehtods we can use

const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//Play & pause video
function toggleVideoStatus(){
    if(video.paused) {//html5 video tag comes with API property "paused" (checks if video is paused)
        video.play();
    } else{//not paused
        video.pause();
    }
}

//update play/pause icon
function updatePlayIcon(){
  if(video.paused){
    //returns html property (play icon) = resets html property (play icon)
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'; //take the initial play icon

  } else{
    //returns play icon (button) = sets to pause icon (only if video is playing)
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'; 
  }
}

//update progress & timestamp
function updateProgress(){
    //shows the seconds of the video
    // console.log(video.currentTime);
    //value = interval the bar is at at a given time
    progress.value = (video.currentTime / video.duration) * 100; //*100 gives %
    //progress bar now moves along with the video, it's contsantly getting the percentage

    //Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins<10){
      mins = '0' + String(mins);
    }

    //Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if(secs<10){
      secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress
function setVideoProgress(){
    video.currentTime = (+progress.value * video.duration)/100;
}

//stop video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}


//Event listeners
video.addEventListener('click', toggleVideoStatus); //tvs plays video when paused, paused video when played
video.addEventListener('pause', updatePlayIcon);//pause/play switch icon
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);//as video plays, continuously call timeupdate

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress); //when we change timestamp, it calls this, it goes to that point in video
