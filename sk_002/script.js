let center;
let left;
let right;
let angle = 0;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    center = new arcWorld(0,0, height/2, 1);
    left = new arcWorld(-height/4,0, height/2, -1);
    right = new arcWorld(height/4,0, height/2, 1);
}

function draw(){
    background(2);
    translate(width/2, height/2);


    // center.create();
    left.create();
    right.create();


    angle+= .01

}

class arcWorld{
    constructor(cX, cY, R, Dir){
        this.c = createVector(cX, cY);
        this.r = R;
        this.s = 0;
        this.dir = Dir;
    }

    create(){
        angleMode(DEGREES);
        noFill();
        strokeWeight(5);
        stroke(225);

        const e = this.s - 180;

        arc(this.c.x, this.c.y, this.r, this.r, this.s, e);

        arc(this.c.x, this.c.y, this.r/2, this.r, this.s+20, e+20);

        arc(this.c.x, this.c.y, this.r, this.r/2, this.s-20, e-20);

        arc(this.c.x, this.c.y, this.r/2, this.r/2, this.s-20, e-20);

        arc(this.c.x - (this.dir * this.r/2.5), this.c.y, this.r/5, this.r/5, this.s-20, e-20);

        
        // this.s = this.dir * Math.sin(angle) * 180 + 180;
        this.s += this.dir * 2;

    }
}