const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// player character initializing
const playerImage = new Image();
playerImage.src = "../images/playerDown.png";

// background initializing
const backgroundImage = new Image();
backgroundImage.src = "../images/GameMap.png";

// rendering
backgroundImage.onload = () => {
    ctx.drawImage(backgroundImage, -930, -490);
    ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    );
};
