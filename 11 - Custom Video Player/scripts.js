// Get our elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButton = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
//const time = document.querySelector('.player__video');

//Building functions

function toggleplay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
    console.log('update The Button');   
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
    console.log(video.currentTime);
}
   

function handleRangeUpdate() {
    video[this.name] = this.value;
  }


function handleProgress(){
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis =  `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(scrubTime);
    console.log(video.currentTime);

}


//Add event listener
let mousedown = false;
video.addEventListener('click', toggleplay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', toggleplay);
video.addEventListener('timeupdate', handleProgress);
skipButton.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = false);
progress.addEventListener('mouseup', () => mousedown = false);
