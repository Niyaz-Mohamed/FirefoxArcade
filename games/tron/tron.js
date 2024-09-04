// Update UI elements
const title = document.getElementById('center-title').querySelector('h1')
const desc = document.getElementById('center-title').querySelector('p')
title.innerHTML = 'Tron'
desc.innerHTML = 'From the 1982 video game! Ride a lightcycle, being careful not to hit any trails!'
// Add Start Buttons
window.arcade.createButton('Start', () => { })

// Phaser.js tron light game
class TronGame extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('./games/tron/assets/')
        this.load.image('logo', 'white-box.webp');
    }

    create() {
        const logo = this.physics.add.image(400, 100, 'logo').setScale(0.2);
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    }
}

// Generate the game
const config = {
    type: Phaser.AUTO,
    scene: TronGame,
    parent: document.getElementById("game-container"),
    width: '100%',
    height: '100%',
    fps: { target: 60, min: 30 },
    transparent: true,
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false,
        }
    }
};
const game = new Phaser.Game(config);
