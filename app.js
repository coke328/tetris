const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const body = document.querySelector("body");

document.addEventListener("keydown",keyDownEvent,false);

const width = 10;
const height = 20;

const tic = 500;

const shape =[
    [1,3,5,7],//|
    [2,4,5,7],//Z
    [3,5,4,6],//S
    [3,5,4,7],//T
    [2,5,3,7],//L
    [3,5,7,6],//J
    [2,3,4,5] //ㅁ
]

var rShape;
/*
var pauseScreen = document.createElement('div');
pauseScreen.style.background = 'black';
pauseScreen.style.width = screenX;
pauseScreen.style.height = screenY;
*/
var Pause = false;

var gameover = false;

var score = 0;

var map = new Array(height);
for(var i=0; i<height; i++){
    map[i] = new Array(width);
}

class point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
};
var b = new Array(4);

var loop = setInterval(main, tic);

function blockSetup(){
    rShape = Math.floor(Math.random()*7);
    const figure = shape[rShape];
    for(var i=0; i<4; i++) {
        const x = figure[i] % 2 + 4;
        const y = parseInt(figure[i] / 2)-1;
        if(y>=0 && map[y][x]){gameOver(); break;}
        b[i] = null;
        b[i] = new point(x,y);
    }
}

function bDraw() {
    for(var i=0; i<4; i++){
        ctx.fillRect(30*b[i].x+1,30*b[i].y+1,28,28);
    }
}
function bEraise(){
    for(var i=0; i<4; i++){
        ctx.clearRect(30*b[i].x, 30*b[i].y,30,30);
    }
}

function collidFloor(){
    for(var i=0; i<4; i++){
        var x = b[i].x;
        var y = b[i].y;
        map[y][x] = true;
        var count = 0;
        for(var j=0; j<width; j++){
            if(map[y][j]) {count++;}
            else {break;}
        }
        if(count == 10){
            clearMap();
            for(var h=y; h>0; h--){
                for(var w=0; w<width; w++){
                    map[h][w] = map[h-1][w];
                }
                score += 5;
            }
            drawMap();
        }
    }
    score++;
}

function clearMap(){
    ctx.clearRect(0,0,width,height);
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

function rotate(d){//d:1 시계방향 d:-1 반시계방향
    if(rShape != 6){
        var tb = new Array(4);
        for(var i=0; i<4; i++){
            tb[i] = new point(b[i].x,b[i].y);
        }
        var center = tb[1];
        for(var i=0; i<4; i++){
            var x = tb[i].y - center.y;
            var y = tb[i].x - center.x;
            tb[i].x = center.x - d*x;
            tb[i].y = center.y + d*y;
        }
        var count = 0;
        for(var i=0 ;i<4; i++){
            if(tb[i].x>=0 && tb[i].x<10 && tb[i].y<20){
                if(!map[tb[i].y][tb[i].x]) {count++;}
                else break;
            }else break;
        }
        if(count == 4) {b = tb;}
        tb = null;
    }
}

function collidCheckY(){
    for(var i=0; i<4; i++){
        if(b[i].y >= 19){
            return false;
        }
        else if(map[b[i].y+1][b[i].x]){
            return false;
        }
    }
    return true;
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
    if(Pause){
        resume();
    }else{
        if(e.keyCode == 68 && collidCheckR()){//D
            bEraise();
            bMove(1,0);
            bDraw();
        }
        if(e.keyCode == 65 && collidCheckL()){//A
            bEraise();
            bMove(-1,0);
            bDraw();
        }
        if(e.keyCode == 32){//space
            bEraise();
            while(collidCheckY()){
                bMove(0,1);
            }
            collidFloor();
            drawMap();
            bDraw();
        }
        if(e.keyCode == 37){//<--
            bEraise();
            rotate(-1);
            bDraw();
        }
        if(e.keyCode == 39){//-->
            bEraise();
            rotate(1);
            bDraw();
        }
        if(e.keyCode == 27){
            pause();
        }
    }
}

function gameOver(){
    gameover = true;
    pause();
}

function resume(){
    Pause = false;
    if(gameover){
        map = null;
        map = new Array(height);
        for(var i=0; i<height; i++){
            map[i] = new Array(width);
        }
        clearMap();
        gameover = false;
    }else{
        loop = setInterval(main, tic);
        //body.removeChild(pauseScreen);
    }
}

function pause(){
    Pause = true;
    clearInterval(loop);
    //pauseScreen.textContent = 'Score : '+score;
    //document.appendChild(pauseScreen);

}

blockSetup();

function main(){
    bEraise();
    if(!collidCheckY()){
        collidFloor();
        
        drawMap();
        
        blockSetup();
    }
    bMove(0,1);
    bDraw();
}

