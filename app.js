const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//document.addEventListener("keydown",keyDownEvent);

let width = 10;
let height = 20;

let blockSize = 28;


const shape =[
    [1,3,5,7],//|
    [2,4,5,7],//z
    [3,5,4,6],
    [3,5,4,7],
    [2,3,5,7],
    [3,5,7,6],
    [2,3,4,5]
]

var map = new Array(20);
for(var i=0; i<20; i++){
    map[i] = new Array(10);
    map[i] = 0;
}

class block{
    
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    Draw(){
        bDraw(this.x,this.y);
    }
    Eraise(){
        bEraise(this.x,this.y);
        //ctx.clearRect(30*this.X+2, 30*this.Y+2, 26, 26);
    }
};
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
var b = new Array(4);
//for(var i=0; i<4; i++){
//   // b[i] = new block();
//}

//
//var map = new Array(20);
//for(var i=0; i<20; i++){
//    map[i] = new Array(10);
//}

function blockSetup(){
    var r = Math.floor(Math.random()*7);
    const figure = shape[r];
    for(var i=0; i<4; i++) {
        const x = figure[i] % 2 + 4;
        const y = parseInt(figure[i] / 2);
        b[i] = new block(x,y);
    }
}
function bDraw(x,y) {
    ctx.fillRect(30*x+1,30*y+1,28,28);
}
function bEraise(x,y){
    ctx.clearRect(30*x,30*y,30,30);
}

function collided(){

}

function collidCheck(){
    for(var i=0; i<4; i++){
        if(map[b[i].x][b[i].y+1]){
            return true;
        }
    }
    for(var i=0; i<4; i++){
        if(b[i].y == 19){
            return true;
        }
    }
}

blockSetup();

var t = 0;
function main(){
    if(t==10){
        for(var i=0; i<4; i++){
            b[i].Eraise();
        }
        for(var i=0; i<4; i++){
            b[i].y += 1;
            b[i].Draw();
        }
        if(collidCheck()){
            collided();
            console.log('collid!!');
        }

        t=0;
    }
    /*
    for(var i=0; i<height; i++){
        for(var j=0; j<width; j++){

        }
    }
    */
    t++;
}

setInterval(main, 100);