class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
    }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
        this.animate = animate;
        this.sprites = sprites;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );

        if (this.animate) {
            if (this.frames.max > 1) {
                this.frames.elapsed += 1;
            }

            if (this.frames.elapsed % this.frames.hold === 0) {
                if (this.frames.val < this.frames.max - 1) {
                    this.frames.val += 1;
                } else {
                    this.frames.val = 0;
                }
            }
        }
    }
}
