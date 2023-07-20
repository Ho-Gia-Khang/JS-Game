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
const draggle = new Monster(monsters.Draggle);
const emby = new Monster(monsters.Emby);

const renderedSprites = [draggle, emby];

// create buttons of the skills
emby.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#buttons").append(button);
});

// render the battle background
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

        // initilize the enemy attacks
        const randomAttack =
            draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];
        queue.push(() => {
            draggle.attack({
                attack: randomAttack,
                recipient: emby,
                renderedSprites,
            }); // end enemy attack
        }); // end pushing into queue
    }); // end add event listener into buttons

    button.addEventListener("mouseenter", (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML];
        document.querySelector("#selected-status").innerHTML =
            selectedAttack.type;
        document.querySelector("#selected-status").style.color =
            selectedAttack.color;
    });
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
