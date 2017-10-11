var canvas = document.getElementById("draw");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;
ctx.globalCompositeOperation = 'multiply';

var 
    isDrawing = false,
    lastX = 0,
    lastY = 0,
    hue = 0,
    direction = true;

function draw(e) {

    if(!isDrawing) return; // stop function when they are not moused
    console.log(e);
    ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);

    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
    hue ++;
    if(hue >= 360)
        heu = 0;

    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction;
    if(direction) ctx.lineWidth++;
    else ctx.lineWidth--;
    

}

canvas.addEventListener('mousedown', function(e) {
    isDrawing = true;
    lastY = e.offsetY;
    lastX = e.offsetX;
    
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', function() {
    isDrawing = false;
});
canvas.addEventListener('mouseout', function() {
    isDrawing = false;
});