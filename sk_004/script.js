const rings = [];
let ringCount;
let baseGap = 50;

let mPosX;
let mDist;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    if(window.innerWidth>window.innerHeight){
        ringCount = window.innerWidth/baseGap;
        ringCount *= 1.5;
        console.log(ringCount);
    }else{
        console.log('confused');
    }

    for(i=0; i<ringCount; i++){
        rings.push(new RING(i));
    }
}
function draw(){
    clear();

    mPosX = (mouseX / window.innerWidth) - .5;

    translate(width/2, height/2);

    mDist = dist(width/2,height/2,mouseX,mouseY);

    rings.forEach((ring)=>{
        ring.create();
    })
    
}

class RING{
    constructor(index){
        this.indx = index;

        this.rad = baseGap * (this.indx+1);

    }
    
    create(){
        noFill();
        strokeWeight(mDist/100);
        rotate(.5*mPosX);
        ellipse(0, 0, this.rad, this.rad*1.5);
    }


}
