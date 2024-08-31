document.addEventListener("DOMContentLoaded", () => {
  const searchbar = document.getElementById("searchbar");
  const suggestionsList = document.getElementById("suggestions-list");

  // Fetch search suggestions from google
  const fetchSuggestions = (query) => {
    // Example using a free search suggestions API
    //! Use cors proxy to bypass CORS error
    const cors = "https://corsproxy.io/?";
    const url = encodeURI(
      cors +
        `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`
    );
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        return data[1].slice(5); // Return first 5 suggestions only
      });
  };

  // Show suggestions in dropdown
  const showSuggestions = (suggestions) => {
    suggestionsList.innerHTML = "";
    suggestions.forEach((suggestion) => {
      const a = document.createElement("a");
      a.classList.add("suggestion-item");
      a.textContent = suggestion;
      a.href =
        "https://www.google.com/search?q=" + encodeURIComponent(suggestion);
      suggestionsList.appendChild(a);
    });
  };

  // Show suggestions if they exists, if not then clear
  searchbar.addEventListener("input", () => {
    const query = searchbar.value.trim();
    if (query) {
      suggestionsList.style.display = "block";
      fetchSuggestions(query).then((suggestions) => {
        showSuggestions(suggestions);
      });
    } else {
      suggestionsList.innerHTML = "";
    }
  });

  // Search the query if enter is pressed
  document
    .getElementById("searchbar")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const query = document.getElementById("searchbar").value;
        const googleSearchUrl =
          "https://www.google.com/search?q=" + encodeURIComponent(query);
        window.open(googleSearchUrl);
      }
    });
});
