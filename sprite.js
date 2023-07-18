class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        isEnemy = false,
        rotation = 0,
        name,
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
        this.rotaion = rotation;
        this.name = name;
    }

    draw() {
        ctx.save();
        ctx.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );
        ctx.rotate(this.rotaion);
        ctx.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        );
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

    attack({ attack, recipient, renderedSprites }) {
        const activatedAttack = document.querySelector("#dialogue-box");
        activatedAttack.style.display = "block";
        activatedAttack.innerHTML = this.name + " used " + attack.name;

        this.health -= attack.damage;

        let movementDistance = 20;
        let healthBar = "#enemy-health-amount";
        let rotation = 2;
        if (this.isEnemy) {
            movementDistance = -20;
            healthBar = "#ally-health-amount";
            rotation = -2.2;
        }

        switch (attack.name) {
            case "Tackle":
                const timeLine = gsap.timeline();

                timeLine
                    .to(this.position, {
                        x: this.position.x - movementDistance,
                    })
                    .to(this.position, {
                        x: this.position.x + movementDistance * 2,
                        duration: 0.1,

                        // Enemy get hits
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

                break;

            case "Fireball":
                // initialize the fireball sprite
                const fireballImage = new Image();
                fireballImage.src = "./images/fireball.png";
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y,
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 8,
                    },
                    animate: true,
                    rotation,
                });
                renderedSprites.splice(1, 0, fireball);

                // fire the fireball to the enemy
                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,

                    // enemy get hit
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
                        renderedSprites.splice(1, 1);
                    },
                });
                break;
        }
    }
}
