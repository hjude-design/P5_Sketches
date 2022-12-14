const adjectives = ['amazing', 'remarkable', 'impossible', 'out of this world', 'new'];
const verbs = ['create', 'build', 'inspire', 'design', 'dream', 'code'];

const words = [
    ['Hey there,'],
    ["let's", verbs[Math.round(Math.random()*(verbs.length-1))]],
    ['something'],
    [`${adjectives[Math.round(Math.random()*(adjectives.length-1))]}!`]
];

let Pad;
let spacer;
let barHeight = 80;
const PTS = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    Warble = createGraphics(windowWidth, windowHeight);
    Pad = width/20;

    textFont('IBM Plex Serif');
    textStyle(BOLDITALIC);
    barHeight = 80;
    noStroke();

    drawIntro(spacer, barHeight, 30);

    for(let col = 0; col < Warble.width; col+=10){
        for(let row = 0; row < Warble.height; row+=10){
          let alphaCheck = Warble.get(col,row);
          if(alphaCheck[3] !== 0){
            let xPos = col;
            let yPos = row;
            PTS.push(new PT(xPos, yPos));
          }
        }
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    Warble = createGraphics(windowWidth, windowHeight);
    Pad = width/20;
  }


function draw(){
    clear();

    blendMode(BLEND);

    drawIntro(spacer, barHeight, 30);

    blendMode(ADD);
    fill(220);
    circle(mouseX, mouseY, windowWidth/8);


    blendMode(BLEND)
    PTS.forEach((PT)=>{
        PT.draw();
    })
}

function drawIntro(spacer, barHeight, fontColor){

    lineWidth = window.innerWidth - Pad*2;
    spacer = -1 * textWidth('.');
    textSize(windowHeight/10);
    fill(fontColor);
    
    if (height < width) {
        words.forEach(line=>{
        
            const lineIndex = words.indexOf(line);
            const lineHeight = Pad + lineIndex*(textAscent()+20);
    
            let wordWidth = 0;
            let leftInset = Pad;
            let gap = {
                start:Pad,
                end:lineWidth + Pad
            }
    
            line.forEach(word=>{
                
                if(line.length > 1 && line.indexOf(word) < 1){
                    textAlign(LEFT);
                    gap.start += textWidth(word) - spacer;
                }else if(line.length > 1){
                    textAlign(RIGHT);
                    gap.end -= textWidth(word) - spacer;
                }else if(lineIndex % 2 === 0){
                    textAlign(LEFT);
                    leftInset += textWidth(word) + spacer;
                    gap.start += textWidth(word) - spacer;
                }else if(lineIndex % 2 !== 0){
                    textAlign(RIGHT);
                    gap.end -= textWidth(word) - spacer;
                }

                text(word,Pad,lineHeight,lineWidth);
    
                wordWidth += textWidth(word);
            });
    
            barXHeight = textAscent()*(barHeight/100);
            const barYpos = lineHeight + textAscent()/2 - barXHeight/2;
    
            const gapAvail = gap.end - gap.start;
            const barXWidth = Math.abs(gapAvail);
    
            Warble.rect(gap.start,barYpos,barXWidth,barXHeight);
    
        })
    }
    

    if (width < height) {
            
        const phrase = [];

        words.forEach(line=>{
            line.forEach(word=>{
            phrase.push(word);
            });

        })
        
    
        phrase.forEach(word=>{

            textSize(windowWidth/8);
            const lineHeight = textAscent() + Pad + phrase.indexOf(word)*(textAscent()
            *1.25);
    
            textAlign(LEFT);
            text(word, Pad, lineHeight)
            
            const barYHeight = textAscent()*(barHeight/100);
            const barYPos = lineHeight - textAscent() + barYHeight/3;
            Warble.rect(Pad + textWidth(word) - spacer*2, barYPos, width, barYHeight);
        })
    

    }


    

}

class PT{
    constructor(xPos,yPos){
      this.x = xPos;
      this.y = yPos;
      this.xBase = this.x;
      this.yBase = this.y;
    }
    draw(){
      let prox = dist(mouseX,mouseY,this.x,this.y);
      let xVel;
      let yVel;
      let SPD = 2;
      noStroke();
      fill(255,0,0);
      
      let xOfst = Math.abs(this.xBase - this.x);
      if(mouseX < this.xBase){
        xVel = 1;
      }else{
        xVel = -1;
      }
      let yOfst = Math.abs(this.yBase - this.y);
      if(mouseY > this.yBase){
        yVel = -1;
      }else{
        yVel = 1;
      }
      
      
      if(prox < 200){
         this.x += SPD * xVel;
         this.y += SPD * yVel;
      }
      else if(xOfst > 0 || yOfst > 0){
        if(this.x > this.xBase){
          this.x -= SPD;
        }
        if(this.x < this.xBase){
          this.x += SPD;
        }
        if(this.y > this.yBase){
          this.y -= SPD;
        }
        if(this.y < this.yBase){
          this.y += SPD;
        } 
      }
      
      circle(this.x, this.y, (yOfst/2 + xOfst/2) + 3);
    }
  }