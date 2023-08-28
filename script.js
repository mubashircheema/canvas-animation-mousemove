
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const particALArray=[];
let hue=0;
// Adjust canvas size on window resize
window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<5; i++){
        particALArray.push(new Partical())
    }
});
canvas.addEventListener('mousemove',(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<2; i++){
        particALArray.push(new Partical())
    }
})

class Partical{
    constructor(){
          this.x=mouse.x;
          this.y=mouse.y
          //this.x=Math.random()*canvas.width;
          //this.y=Math.random() *canvas.height;
          this.size= Math.random()*7+1;
          this.speedX=Math.random()*3 - 1.5;
          this.speedY=Math.random()*3 - 1.5;
          this.color='hsl( '+ hue +', 100% , 50%)';
    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.size>0.2) this.size -=0.1;
    }
    Draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
console.log(particALArray)
function handleParticles(){
    for(let i=0; i< particALArray.length;i++){
        particALArray[i].update();
        particALArray[i].Draw();
      
        for(let j=i; j<particALArray.length;j++){
            const dx=particALArray[i].x - particALArray[j].x;
            const dy=particALArray[i].y - particALArray[j].y;
            const distance= Math.sqrt(dx*dx + dy*dy)
            if (distance<100){
                ctx.beginPath();
                ctx.strokeStyle =particALArray[i].color;
                ctx.lineWidth =particALArray[i].size/10;
                ctx.moveTo(particALArray[i].x, particALArray[i].y)
                ctx.lineTo(particALArray[j].x, particALArray[j].y)
                ctx.stroke();

            }
        }
        if(particALArray[i].size<=0.3){
            particALArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    //ctx.fillStyle="rgba(0,0,0,0.02)";
    //ctx.fillRect(0,0,canvas.width,canvas.height)
    handleParticles();
    requestAnimationFrame(animate)
    hue+=5
}
animate()

