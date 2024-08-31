document.addEventListener("DOMContentLoaded", () => {
  const searchbar = document.getElementById("searchbar");
  const suggestionsList = document.getElementById("suggestions-list");
  let selectedSuggestionIndex = 0;

  // Search the query if enter is pressed
  searchbar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(searchbar.value)
      );
    }
  });

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
        return data[1].slice(5); // Return first 5 suggestions only
      });
  };

  // Show suggestions in dropdown
  const showSuggestions = (suggestions) => {
    suggestionsList.innerHTML = "";
    // Make the first suggestion the input value
    suggestions.unshift(searchbar.value);
    // Add each suggestion to the list
    suggestions.forEach((suggestion) => {
      const a = document.createElement("a");
      a.classList.add("suggestion-item");
      if (suggestions.indexOf(suggestion) == 0) {
        selectedSuggestionIndex = 0;
        a.classList.add("selected-suggestion");
      }
      a.textContent = suggestion;
      a.href =
        "https://www.google.com/search?q=" + encodeURIComponent(suggestion);
      suggestionsList.appendChild(a);
    });
  };

  // Show suggestions if they exists, if not then clear
  ["input", "focus"].forEach((event) =>
    searchbar.addEventListener(event, () => {
      const query = searchbar.value.trim();
      if (query) {
        suggestionsList.style.display = "block";
        fetchSuggestions(query).then((suggestions) => {
          showSuggestions(suggestions);
        });
      } else {
        suggestionsList.style.display = "none";
      }
    })
  );

  // Hide the shearch suggestions if focus lost
  searchbar.addEventListener("blur", () => {
    suggestionsList.style.display = "none";
  });

  // Cycle between suggestions using arrow keys
  searchbar.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && suggestionsList.childElementCount > 1) {
      // Remove selected status from current suggestion
      const currentActive = suggestionsList.querySelector(
        `:nth-child(${selectedSuggestionIndex + 1})`
      );
      currentActive.classList.remove("selected-suggestion");

      // Update new selection
      selectedSuggestionIndex = Math.abs(
        (selectedSuggestionIndex - 1 + suggestionsList.childElementCount) %
          suggestionsList.childElementCount
      );
      const newActive = suggestionsList.querySelector(
        `:nth-child(${selectedSuggestionIndex + 1})`
      );
      newActive.classList.add("selected-suggestion");
      searchbar.value = newActive.innerHTML;
    } else if (
      event.key === "ArrowDown" &&
      suggestionsList.childElementCount > 1
    ) {
      // Remove selected status from current suggestion
      const currentActive = suggestionsList.querySelector(
        `:nth-child(${selectedSuggestionIndex + 1})`
      );
      currentActive.classList.remove("selected-suggestion");

      // Update new selection
      selectedSuggestionIndex = Math.abs(
        (selectedSuggestionIndex + 1) % suggestionsList.childElementCount
      );
      const newActive = suggestionsList.querySelector(
        `:nth-child(${selectedSuggestionIndex + 1})`
      );
      newActive.classList.add("selected-suggestion");
      searchbar.value = newActive.innerHTML;
    }
  });
});
