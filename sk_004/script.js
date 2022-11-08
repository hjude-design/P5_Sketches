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

    Pad = window.innerWidth/20;

    textFont('IBM Plex Serif');
    textStyle(BOLDITALIC);

    barHeight = 80;


    noStroke();
    blendMode(MULTIPLY);

    

    drawIntro(spacer, barHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    drawIntro(spacer, barHeight);
  }

function draw(){
}

function drawIntro(spacer, barHeight){

    lineWidth = window.innerWidth - Pad*2;

    spacer = -1 * textWidth('.');

    textSize(windowHeight/10);

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

            fill('#000000');
            text(word,Pad,lineHeight,lineWidth);

            wordWidth += textWidth(word);
        });

        barXHeight = textAscent()*(barHeight/100);
        const barYpos = lineHeight + textAscent()/2 - barXHeight/2;

        const gapAvail = gap.end - gap.start;
        console.log(gap, gapAvail);
        const barXWidth = Math.abs(gapAvail);

        fill('#ff0000');
        rect(gap.start,barYpos,barXWidth,barXHeight);

    })
}