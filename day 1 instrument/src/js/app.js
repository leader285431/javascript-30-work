window.addEventListener('keydown', playSound);

function playSound(e) {
    var 
        audio = document.querySelectorAll('audio[data-key="' + e.keyCode + '"]')[0],
        key = document.querySelectorAll('.key[data-key="' + e.keyCode + '"]')[0];

    // if not select audio just stop
    if(!audio) return;

    // everty time you keydown, rewind the playtime
    audio.currentTime = 0;
    audio.play();

    // initial effect
    key.classList.remove('playing');
    // add effect
    key.classList.add('playing');
}

var keys = document.querySelectorAll('.key');

keys.forEach(function(key) {
    key.addEventListener('transitionend', removeTransition);
});

function removeTransition(e) {

    // identify propertyName and return propertyName not equal to transition
    if(e.propertyName !== 'transform') return;

    this.classList.remove('playing');
}