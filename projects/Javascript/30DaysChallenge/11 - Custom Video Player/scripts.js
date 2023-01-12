const btns = document.querySelectorAll('.player__button');
const ranges = document.querySelectorAll('.player__slider');
const video = document.querySelector('.player__video');
const progressFill = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress')
const info = document.querySelector('.info');

function onBtnClick(e){
    switch(this.id){
        case 'playBtn' :
        case 'video' : 
            if(video.paused){
                video.play();
                btns[0].textContent = '⏸'
            } else {
                video.pause();
                btns[0].textContent = '⏵'
            } break;
        case 'forwardBtn' :
        case 'backwardBtn' : 
            video.currentTime += parseInt(this.dataset.skip, 10);
            break;
    }
}

function onRangeChange(e){
    switch(this.id){
        case 'volRange' :
            video.volume = this.value;
        case 'rateRange' :
            video.playbackRate = this.value;
    }
}

function onTimeUpdate(){
    progressFill.style.flexBasis = `${video.currentTime/video.duration*100}%`;
}

function onProgressClick(e){
    video.currentTime = (e.layerX/this.offsetWidth)*video.duration ;
}

function onProgressMousemove(e){
    info.style.display = 'block';
    const time = e.layerX/this.offsetWidth*video.duration;
    const min = Math.floor(time/60);
    const sec = Math.floor(time%60);
    info.innerText = `${min} : ${sec}`;
    console.log(e);
    info.style.left = `${e.clientX}px`
    info.style.top = `-20%`
}

function onProgressMouseleave(e){
    info.style.display = 'none';
}

btns.forEach((btn) => {
    btn.addEventListener('click', onBtnClick);
})

video.addEventListener('click', onBtnClick);

ranges.forEach((range) => {
    range.addEventListener('change', onRangeChange);
})

video.addEventListener('timeupdate', onTimeUpdate)
progress.addEventListener('click', onProgressClick)
progress.addEventListener('mousemove', onProgressMousemove)
progress.addEventListener('mouseleave', onProgressMouseleave)