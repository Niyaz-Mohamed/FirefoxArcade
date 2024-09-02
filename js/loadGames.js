const games = ["tron", "whirlybird"]; // TODO: Update list of games dynamically?
// const selectedGame = games[Math.floor(Math.random() * games.length)];
const selectedGame = "tron";

// Load game-specific HTML
fetch(`./games/${selectedGame}/${selectedGame}.html`)
  .then(response => response.text())
  .then(html => {
    document.getElementById("game-container").innerHTML = html;

    // Load game-specific CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `./games/${selectedGame}/${selectedGame}.css`;
    document.head.appendChild(link);

    // Load game-specific JavaScript
    const script = document.createElement("script");
    script.src = `./games/${selectedGame}/${selectedGame}.js`;
    document.body.appendChild(script);
  })
  .catch(error => {
    console.error('Error loading game:', error);
    // Optionally show the body even if there's an error
    document.body.style.opacity = 1;
  });

