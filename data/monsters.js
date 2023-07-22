const allyMonsters = {
    Emby: {
        position: {
            x: 280,
            y: 325,
        },
        image: {
            src: "./images/monsters/embySprite.png",
        },
        frames: {
            max: 4,
            hold: 24,
        },
        animate: true,
        name: "Emby",
        attacks: [attacks.Tackle, attacks.Fireball],
    },
};

const enemyMonster = {
    Emby: {
        position: {
            x: 800,
            y: 100,
        },
        image: {
            src: "./images/monsters/embySprite.png",
        },
        frames: {
            max: 4,
            hold: 24,
        },
        animate: true,
        name: "Emby",
        isEnemy: true,
        attacks: [attacks.Tackle, attacks.Fireball],
    },
    Draggle: {
        position: {
            x: 800,
            y: 100,
        },
        image: {
            src: "./images/monsters/draggleSprite.png",
        },
        frames: {
            max: 4,
            hold: 24,
        },
        animate: true,
        name: "Draggle",
        isEnemy: true,
        attacks: [attacks.Tackle, attacks.Fireball],
    },
    Bamboo: {
        position: {
            x: 800,
            y: 100,
        },
        image: {
            src: "./images/monsters/bambooSprite.png",
        },
        frames: {
            max: 4,
            hold: 24,
        },
        animate: true,
        name: "Bamboo",
        isEnemy: true,
        attacks: [attacks.Tackle, attacks.Fireball],
    },
    Spirit: {
        position: {
            x: 800,
            y: 100,
        },
        image: {
            src: "./images/monsters/spiritSprite.png",
        },
        frames: {
            max: 4,
            hold: 24,
        },
        animate: true,
        name: "Spirit",
        isEnemy: true,
        attacks: [attacks.Tackle, attacks.Fireball],
    },
    Raccoon: {
        position: {
            x: 800,
            y: 100,
        },
        image: {
            src: "./images/monsters/raccoonSprite.png",
        },
        frames: {
            max: 4,
            hold: 24,
        },
        animate: true,
        name: "Raccoon",
        isEnemy: true,
        attacks: [attacks.Tackle, attacks.Fireball],
    },
    Squid: {
        position: {
            x: 800,
            y: 100,
        },
        image: {
            src: "./images/monsters/squidSprite.png",
        },
        frames: {
            max: 4,
            hold: 24,
        },
        animate: true,
        name: "Squid",
        isEnemy: true,
        attacks: [attacks.Tackle, attacks.Fireball],
    },
};

const enemyMonstersArray = [];
for (let monster in enemyMonster) {
    enemyMonstersArray.push(enemyMonster[monster]);
}
