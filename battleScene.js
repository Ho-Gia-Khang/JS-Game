// initialize the battle background
const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./images/battleBackground.png";

const battleBackGround = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    image: battleBackgroundImage,
});

// initialize the monsters
const draggleImage = new Image();
draggleImage.src = "./images/draggleSprite.png";

const draggle = new Sprite({
    position: {
        x: 800,
        y: 100,
    },
    image: draggleImage,
    frames: {
        max: 4,
        hold: 24,
    },
    animate: true,
    isEnemy: true,
    name: "Draggle",
});

const embyImage = new Image();
embyImage.src = "./images/embySprite.png";

const emby = new Sprite({
    position: {
        x: 280,
        y: 325,
    },
    image: embyImage,
    frames: {
        max: 4,
        hold: 24,
    },
    animate: true,
    name: "Emby",
});

// render the battle background
const renderedSprites = [draggle, emby];
animateBattle = () => {
    window.requestAnimationFrame(animateBattle);
    battleBackGround.draw();

    renderedSprites.forEach((sprite) => {
        sprite.draw();
    });
};

animateBattle();

const queue = [];

// event listeners for attack
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML];

        emby.attack({
            attack: selectedAttack,
            recipient: draggle,
            renderedSprites,
        });

        queue.push(() => {
            draggle.attack({
                attack: attacks.Tackle,
                recipient: emby,
                renderedSprites,
            }); // end enemy attack
        }); // end pushing into queue

        queue.push(() => {
            draggle.attack({
                attack: attacks.Fireball,
                recipient: emby,
                renderedSprites,
            }); // end enemy attack
        }); // end pushing into queue
    }); // end add event listener into buttons
}); // end querySelectorAll

document.querySelector("#dialogue-box").addEventListener("click", (e) => {
    if (queue.length > 0) {
        queue[0]();
        queue.shift();
    } else {
        e.currentTarget.style.display = "none";
        console.log("AmongUs");
    }
});
