const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// slice the collision into sub-arrays containing 70 elements
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70));
}

class Sprite {
    constructor({ position, image, frames = { max: 1 } }) {
        this.position = position;
        this.image = image;
        this.frames = frames;

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
    }

    draw() {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );
    }
}

// player character initializing
const playerImage = new Image();
playerImage.src = "../images/playerDown.png";
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerImage,
    frames: {
        max: 4,
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

class Boundary {
    static width = 45;
    static height = 45;
    constructor({ position }) {
        this.position = position;
        this.width = 45;
        this.height = 45;
    }
    draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// create the boundary array
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

// initialize te control keys
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

const movables = [background, ...boundaries];

isRectangularCollision = ({ rectangle1, rectangle2 }) => {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
};

// rendering
animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    });
    player.draw();

    let moving = true;
    if (keys.w.pressed && lastKey === "w") {
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
                console.log("colliding");
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
                console.log("colliding");
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
                console.log("colliding");
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
                console.log("colliding");
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
