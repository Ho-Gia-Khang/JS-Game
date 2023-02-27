let playerState = 'fall';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// animation
// load the image
const playerImage = new Image();
playerImage.scr = 'shadow_dog.png';
// define the width and the height of the subimage that will be loaded
const spritesWidth = 575;
const spritesHeight = 525;

// setup the frame index to loop through all the sprites
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationState = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
animationState.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j < state.frames; j++){
        let posX = j * spritesWidth;
        let posY = index * spritesHeight;
        frames.loc.push({x: posX, y: posY});
    }
    spriteAnimations[state.name] = frames;
});

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // get the position of the subimage in the sprite
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length; // loop through the subimage in a row
    let frameX = spritesWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    // draw the image
    ctx.drawImage(playerImage, frameX, frameY, spritesWidth, spritesHeight, 0, 0, spritesWidth, spritesHeight);
    
    gameFrame++
    requestAnimationFrame(animate);
};

animate();