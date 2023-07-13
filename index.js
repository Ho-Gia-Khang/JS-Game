const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// slice the collision into sub-arrays containing 70 elements
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70));
}

// convert the battle zone array into 2d array
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, i + 70));
}

// player character initializing
const playerDownImage = new Image();
playerDownImage.src = "../images/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "../images/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "../images/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "../images/playerRight.png";

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4,
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage,
    },
});

// background initializing
const offset = {
    x: -930,
    y: -490,
};

const backgroundImage = new Image();
backgroundImage.src = "../images/GameMap.png";
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: backgroundImage,
});

// initialize the foregrounds
const foregroundImage_above = new Image();
foregroundImage_above.src = "../images/foreground_above.png";
const foreground_above = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage_above,
});

// create the collisions boundary array
const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                })
            );
        }
    });
});

// create the battle zone boundaries
const battleZones = [];

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                })
            );
        }
    });
});

console.log(battleZones);

// initialize the control keys
const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

const movables = [background, ...boundaries, foreground_above, ...battleZones];

// rendering
animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });
    battleZones.forEach((battleZone) => {
        battleZone.draw();
    });
    player.draw();
    foreground_above.draw();

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];

            // calculate the overlapping area between the player character and the battle zones
            const overlappingRecWidth =
                Math.min(
                    player.position.x + player.width,
                    battleZone.position.x + battleZone.width
                ) - Math.max(player.position.x, battleZone.position.x);
            const overlappingRecHeight =
                Math.min(
                    player.position.y + player.width,
                    battleZone.position.y + battleZone.width
                ) - Math.max(player.position.y, battleZone.position.y);
            const overlappingArea = overlappingRecWidth * overlappingRecHeight;

            if (
                isRectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone,
                }) &&
                overlappingArea > (player.width * player.height) / 2 &&
                Math.random() < 0.05
            ) {
                console.log("battle zone collided");
                break;
            }
        }
    }

    let moving = true;
    player.moving = false;
    if (keys.w.pressed && lastKey === "w") {
        player.moving = true;
        player.image = player.sprites.up;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                isRectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 4,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 4;
            });
        }
    } else if (keys.s.pressed && lastKey === "s") {
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                isRectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 4,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 4;
            });
        }
    } else if (keys.a.pressed && lastKey === "a") {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                isRectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 4,
                            y: boundary.position.y,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 4;
            });
        }
    } else if (keys.d.pressed && lastKey === "d") {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                isRectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 4,
                            y: boundary.position.y,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 4;
            });
        }
    }
};

animate();

// the key event for moving the player character
let lastKey = "";
window.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
        case "w":
            keys.w.pressed = true;
            lastKey = "w";
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "s":
            keys.s.pressed = true;
            lastKey = "s";
            break;
        case "d":
            keys.d.pressed = true;
            lastKey = "d";
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key.toLowerCase()) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});
