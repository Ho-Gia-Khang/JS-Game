const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "../images/GameMap.png";

image.onload = () => {
    ctx.drawImage(image, -650, -530);
};
