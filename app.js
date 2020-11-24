const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown",keyDownEvent,false);

const width = 10;
const height = 20;

const tic = 5;

const shape =[
    [1,3,5,7],//|
    [2,4,5,7],//z
    [3,5,4,6],
    [3,5,4,7],
    [2,3,5,7],
    [3,5,7,6],
    [2,3,4,5]
]

var map = new Array(height);
for(var i=0; i<height; i++){
    map[i] = new Array(width);
    map[i] = false;
}

class block{
    
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
};
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
var b = new Array(4);

function blockSetup(){
    var r = Math.floor(Math.random()*7);
    const figure = shape[r];
    for(var i=0; i<4; i++) {
        const x = figure[i] % 2 + 4;
        const y = parseInt(figure[i] / 2);
        b[i] = null;
        b[i] = new block(x,y);
    }
}
function bDraw() {
    for(var i=0; i<4; i++){
        ctx.fillRect(30*b[i].x+1,30*b[i].y+1,28,28);
    }
}
function bEraise(){
    for(var i=0; i<4; i++){
        ctx.clearRect(30*b[i].x,30*b[i].y,30,30);
    }
}

function collidFloor(){
    for(var i=0; i<4; i++){
        map[b[i].y][b[i].x] = true;
        console.log(map);
    }
}

function drawMap(){
    for(var i=0; i<height; i++){
        for(var j=0; j<width; j++){
            if(map[i][j]){
                ctx.fillRect(30*j+1,30*i+1,28,28);
            }
        }
    }
}

function bMove(mx,my){
    for(var i=0; i<4; i++){
        b[i].x += mx;
        b[i].y += my;
    }
}

function collidCheckY(){
    for(var i=0; i<4; i++){
        if(b[i].y == 19){
            return true;
        }
        else if(map[b[i].y+1][b[i].x]){
            return true;
        }
    }
    return false;
}

function collidCheckR(){
    for(var i=0; i<4; i++){
        if(b[i].x == 9){
            return false;
        }
        else if(map[b[i].y][b[i].x+1]){
            return false;
        }
    }
    return true;
}

function collidCheckL(){
    for(var i=0; i<4; i++){
        if(b[i].x == 0){
            return false;
        }
        else if(map[b[i].y][b[i].x-1]){
            return false;
        }
    }
    return true;
}

function keyDownEvent(e){
    if(e.keyCode == 39 && collidCheckR()){
        bEraise();
        bMove(1,0);
        bDraw();
    }
    if(e.keyCode == 37 && collidCheckL()){
        bEraise();
        bMove(-1,0);
        bDraw();
    }
}

blockSetup();

var t = 0;
function main(){
    bEraise();
    if(t==tic){
        if(collidCheckY()){
            collidFloor();
            
            drawMap();
            
            blockSetup();
        }
        bMove(0,1);
        t=0;
    }
    bDraw();
    
    t++;
}

setInterval(main, 100);