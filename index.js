const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

console.log(context);

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
