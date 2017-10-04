var secondHand = document.querySelector('.second-hand');
var minHand = document.querySelector('.min-hand');
var hourHand = document.querySelector('.hour-hand');

function setDate() {
    var 
        now = new Date(),

        seconds = now.getSeconds(),
        secondsDegrees = ((seconds / 60) * 360 ) + 90,

        mins = now.getMinutes(),
        minsDegrees = ((mins / 60) * 360) + 90,

        hours = now.getHours();
        hoursDegrees = ((hours / 12) * 360 ) + 90;

    secondHand.style.transform = 'rotate(' + secondsDegrees + 'deg)';
    minHand.style.transform = 'rotate(' + minsDegrees + 'deg)';
    hourHand.style.transform = 'rotate(' + hoursDegrees + 'deg)';
}

setInterval(setDate, 1000);