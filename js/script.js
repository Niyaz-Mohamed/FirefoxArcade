document
  .getElementById("searchbar")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Open up new link with google
      const query = document.getElementById("searchbar").value;
      const googleSearchUrl =
        "https://www.google.com/search?q=" + encodeURIComponent(query);
      window.open(googleSearchUrl);
    }
  });
