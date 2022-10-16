let words = [
    ['hey', 'you'],
    ['lets', 'create'],
    ['someting'],
    ['remarkable']
];

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);

    background(200);

    console.log(words);
    
}
function draw(){
}

class phraseChunk{
    constructor(words){
        this.words = words;
    }
}
