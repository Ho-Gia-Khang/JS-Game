class Monster extends Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0,
        isEnemy = false,
        name,
        attacks,
    }) {
        super({
            position,
            image,
            frames,
            sprites,
            animate,
            rotation,
        });
        this.health = 100;
        this.isEnemy = isEnemy;
        this.name = name;
        this.attacks = attacks;
    }

    faint() {
        document.querySelector("#dialogue-box").innerHTML =
            this.name + " fainted!";
        gsap.to(this.position, {
            y: this.position.y + 20,
        });

        gsap.to(this, {
            opacity: 0,
        });
    }

    attack({ attack, recipient, renderedSprites }) {
        const activatedAttack = document.querySelector("#dialogue-box");
        activatedAttack.style.display = "block";
        activatedAttack.innerHTML = this.name + " used " + attack.name;

        recipient.health -= attack.damage;

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
                                width: recipient.health + "%",
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
                            width: recipient.health + "%",
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
