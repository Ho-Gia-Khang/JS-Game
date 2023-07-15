class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        isEnemy = false,
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
        this.opacity = 1;
        this.health = 100;
        this.isEnemy = isEnemy;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
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
        ctx.restore();

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

    attack({ attack, recipient }) {
        const timeLine = gsap.timeline();

        this.health -= attack.damage;

        let movementDistance = 20;
        if (this.isEnemy) {
            movementDistance = -20;
        }

        let healthBar = "#enemy-health-amount";
        if (this.isEnemy) {
            healthBar = "#ally-health-amount";
        }

        timeLine
            .to(this.position, {
                x: this.position.x - movementDistance,
            })
            .to(this.position, {
                x: this.position.x + movementDistance * 2,
                duration: 0.1,
                onComplete: () => {
                    gsap.to(healthBar, {
                        width: this.health + "%",
                    });

                    gsap.to(recipient.position, {
                        x: recipient.position.x + 10,
                        yoyo: true,
                        repeat: 3,
                        duration: 0.12,
                    });

                    gsap.to(recipient, {
                        opacity: 0,
                        repeat: 3,
                        yoyo: true,
                        duration: 0.12,
                    });
                },
            })
            .to(this.position, {
                x: this.position.x,
            });
    }
}
