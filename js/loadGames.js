const games = ["tron", "whirlybird"]; // TODO: Update list of games dynamically?
// const selectedGame = games[Math.floor(Math.random() * games.length)];
const selectedGame = "tron";

// Load game-specific HTML
fetch(`./games/${selectedGame}/${selectedGame}.html`)
  .then(response => response.text())
  .then(html => {
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
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById("game-container").innerHTML = html;
    })
    console.log('Game loaded: Tron')
  })
  .catch(error => {
    console.error('Error loading game:', error);
    // Optionally show the body even if there's an error
    document.body.style.opacity = 1;
  });

