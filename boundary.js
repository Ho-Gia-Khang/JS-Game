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
