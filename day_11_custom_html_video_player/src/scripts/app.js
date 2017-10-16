// Get our Element
var 
    player = document.querySelector('.player'),
    video = player.querySelector('.viewer'),
    progress = player.querySelector('.progress'),
    progressBar = player.querySelector('.progress__filled'),
    toggle = player.querySelector('.toggle'),
    skipButtons = player.querySelectorAll('[data-skip]'),
    ranges = player.querySelectorAll('.player__slider');


// Build out functions
function togglePlay() {
    var method = video.paused ? 'play' : 'pause';
    console.dir(video);

    video[video.paused ? 'play' : 'pause']();
}

function updateButton () {
    var icon = this.paused ? '▶' : '&#10074;&#10074;';
    toggle.innerHTML = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    var percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + '%';
}

function scrub(e) {
    var scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Hook up the event listens
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(function(skipBtn) {
    skipBtn.addEventListener('click', skip);
});

ranges.forEach(function(range) {
    range.addEventListener('change', handleRangeUpdate);
});

var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function() {
    if(mousedown) {
        scrub();
    }
});
progress.addEventListener('mousedown', function() {
    mousedown = true;
});
progress.addEventListener('mouseup', function() {
    mousedown = false;
});

// make a button for fullscreen