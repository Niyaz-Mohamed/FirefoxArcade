// Update UI elements


// Phaser.js tron light game
class TronGame extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('https://labs.phaser.io');

        // this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        // this.add.image(400, 300, 'sky');
        // const particles = this.add.particles(0, 0, 'red', {
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // });

        // const logo = this.physics.add.image(400, 100, 'logo');
        // logo.setVelocity(100, 200);
        // logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);
        // particles.startFollow(logo);
    }
}

const config = {
    type: Phaser.AUTO,
    scene: TronGame,
    parent: document.getElementById("game-container"),
    fps: { target: 60, min: 30 },
    transparent: true,
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};

const game = new Phaser.Game(config);
