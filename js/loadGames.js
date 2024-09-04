const games = ["tron", "whirlybird"]; // TODO: Update list of games dynamically?
// const selectedGame = games[Math.floor(Math.random() * games.length)];
const selectedGame = "tron";

// Load game-specific CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `./games/${selectedGame}/${selectedGame}.css`;

// Load game-specific JavaScript
const script = document.createElement("script");
script.src = `./games/${selectedGame}/${selectedGame}.js`;

// Add elements to DOM
document.head.appendChild(link);
document.head.appendChild(script);
console.log(`Game loaded: ${selectedGame.toUpperCase()}`)

