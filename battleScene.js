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

// initialize the battle scence
let draggle;
let emby;
let renderedSprites;
let battleAnimationId;
let queue;
let enemy;

initBattle = () => {
    audio.Battle.play();

    enemy = new Monster(
        monstersArray[Math.floor(Math.random() * monstersArray.length)]
    );
    console.log(enemy);
    emby = new Monster(monsters.Emby);
    renderedSprites = [enemy, emby];
    queue = [];

    document.querySelector("#user-interface").style.display = "block";
    document.querySelector("#enemy-pokemon-name").innerHTML = enemy.name;
    document.querySelector("#dialogue-box").style.display = "none";
    document.querySelector("#enemy-health-amount").style.width = "100%";
    document.querySelector("#ally-health-amount").style.width = "100%";
    document.querySelector("#buttons").replaceChildren();

    // create buttons of the skills
    emby.attacks.forEach((attack) => {
        const button = document.createElement("button");
        button.innerHTML = attack.name;
        document.querySelector("#buttons").append(button);
    });

    // event listeners for attack
    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML];

            emby.attack({
                attack: selectedAttack,
                recipient: enemy,
                renderedSprites,
            });

            if (enemy.health <= 0) {
                queue.push(() => {
                    enemy.faint();
                });

                endBattle();
            }
            // initilize the enemy attacks
            const randomAttack =
                enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
            queue.push(() => {
                enemy.attack({
                    attack: randomAttack,
                    recipient: emby,
                    renderedSprites,
                }); // end enemy attack

                if (emby.health <= 0) {
                    queue.push(() => {
                        emby.faint();
                    });

                    endBattle();
                }
            }); // end pushing into queue
        }); // end add event listener into buttons

        // display the attack type when player hover the correspond attack button
        button.addEventListener("mouseenter", (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            document.querySelector("#selected-status").innerHTML =
                selectedAttack.type;
            document.querySelector("#selected-status").style.color =
                selectedAttack.color;
        });
    }); // end querySelectorAll
};

// render the battle background
animateBattle = () => {
    battleAnimationId = window.requestAnimationFrame(animateBattle);
    battleBackGround.draw();

    renderedSprites.forEach((sprite) => {
        sprite.draw();
    });
};

endBattle = () => {
    audio.Battle.stop();
    queue.push(() => {
        // fade back to black
        gsap.to("#flashing-rect", {
            opacity: 1,
            onComplete: () => {
                // re-initialize the world map
                window.cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector("#user-interface").style.display =
                    "none";

                gsap.to("#flashing-rect", {
                    opacity: 0,
                });

                battle.initiated = false;
                audio.Map.play();
            },
        });
    });
};

document.querySelector("#dialogue-box").addEventListener("click", (e) => {
    if (queue.length > 0) {
        queue[0]();
        queue.shift();
    } else {
        e.currentTarget.style.display = "none";
    }
});
