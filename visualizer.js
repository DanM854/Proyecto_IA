function main(){
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

class Bar{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }
    update(micInput){
        this.height = micInput * 1000;
    }
    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}

const microphone = new Microphone();
let bars = [];
let barWidth = canvas.width/256;
function createBars(){
    for(let i =0 ; i < 256; i++){
        let color = 'hsl(' + i * 2 + '0, 100%, 50%)';
        bars.push(new Bar(i* barWidth, canvas.height/2, 1, 20, color))
    }
}
createBars();
console.log(bars);

function animate(){
    if(microphone.initialized){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const samples = microphone.getSamples();
    console.log(samples);
    bars.forEach(function(bar, i){
        bar.update(samples[i]);
        bar.draw(ctx);
    });
    }
    requestAnimationFrame(animate);
}
animate();
}