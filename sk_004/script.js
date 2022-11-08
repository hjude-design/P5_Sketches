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

function setup(){
    createCanvas(windowWidth, windowHeight);
    Warble = createGraphics(100, 100);
    Pad = width/20;

    textFont('IBM Plex Serif');
    textStyle(BOLDITALIC);
    barHeight = 80;
    noStroke();
    blendMode(SCREEN);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    Warble = createGraphics(windowWidth, windowHeight);
    Pad = width/20;
  }


function draw(){
    clear();

    fill(75,75,75);
    circle(mouseX, mouseY, windowWidth/8);

    drawIntro(spacer, barHeight);

}

function drawIntro(spacer, barHeight){

    lineWidth = window.innerWidth - Pad*2;
    spacer = -1 * textWidth('.');
    textSize(windowHeight/10);
    
    const phrase = [];
    
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
    
                fill(30,30,30);
                text(word,Pad,lineHeight,lineWidth);
    
                wordWidth += textWidth(word);
            });
    
            barXHeight = textAscent()*(barHeight/100);
            const barYpos = lineHeight + textAscent()/2 - barXHeight/2;
    
            const gapAvail = gap.end - gap.start;
            const barXWidth = Math.abs(gapAvail);
    
            fill('#ff0000');
            rect(gap.start,barYpos,barXWidth,barXHeight);
    
        })
    }
    

    if (width < height) {

        words.forEach(line=>{
            line.forEach(word=>{
            phrase.push(word);
            });

        })
        
    
        phrase.forEach(word=>{

            textSize(windowWidth/8);
            const lineHeight = textAscent() + Pad + phrase.indexOf(word)*(textAscent()
            *1.25);
    
            fill(0);
            textAlign(LEFT);
            text(word, Pad, lineHeight)
            
            fill(255,0,0);
            const barYHeight = textAscent()*(barHeight/100);
            const barYPos = lineHeight - textAscent() + barYHeight/3;
    
            rect(Pad + textWidth(word) - spacer*2, barYPos, width, barYHeight);


        })
    

    }


    

}