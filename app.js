const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class block{
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    
}

var b = new block()[4];

const shape =[
    1,3,5,7,//|
    2,4,5,7,//z
    3,5,4,6,
    3,5,4,7,
    2,3,5,7,
    3,5,7,6,
    2,3,4,5
];

function drawblock(color){//color 0,1,2..8

}

function draw(){

}

setInterval(draw, 100);