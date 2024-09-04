//! Handle toolbar setup
document.addEventListener("DOMContentLoaded", () => {
    // Start the clock
    function startTime() {
        // Update the time
        const today = new Date();
        const h = today.getHours() % 12;
        const m = today.getMinutes();
        document.getElementById("clock").innerHTML =
            (h == 0 ? 12 : h) + ":" + m.toString().padStart(2, "0"); // Add leading 0 to minutes

        // Update AM/PM
        const ampmContainer = document.getElementById("am-pm-container");
        const am = ampmContainer.querySelector("span:first-child");
        const pm = ampmContainer.querySelector("span:last-child");
        const isPm = Math.floor(today.getHours() / 12);
        if (isPm) {
            pm.classList.add("activetime");
            am.classList.remove("activetime");
        } else {
            am.classList.add("activetime");
            pm.classList.remove("activetime");
        }
        setTimeout(startTime, 1000);
    }
    startTime();

    // Trigger window buttons
    const dropdownBtns = document.querySelectorAll("#toolbar button");
    dropdownBtns.forEach((dropBtn) => {
        dropBtn.onclick = () => {
            document.getElementById(`${dropBtn.id}-window`).style.display = "block";
        };
    });

    // Trigger draggeable windows
    document
        .querySelectorAll(".window")
        .forEach((windowElem) => triggerDragElement(windowElem));

    // Define function to initializa draggeable windows
    function triggerDragElement(windowElem) {
        let xPos = 0,
            yPos = 0,
            changeOfX = 0,
            changeOfY = 0;

        // Fix the width of the window
        windowElem.style.width = windowElem.getBoundingClientRect().width + "px";
        // Randomize initial window position
        const horizontalOffset = Math.floor(Math.random() * 40) + "px";
        const verticalOffset =
            Math.floor(
                Math.random() *
                (window.innerHeight - windowElem.getBoundingClientRect().height)
            ) + "px";
        Math.random() < 0.5
            ? (windowElem.style.right = horizontalOffset)
            : (windowElem.style.left = horizontalOffset);
        windowElem.style.top = verticalOffset;

        // Make header react to dragging events
        const header = document.getElementById(windowElem.id + "-header");
        const windowDelete = header.querySelector(".window-delete");
        header.onmousedown = dragMouseDown;
        header.ontouchstart = dragMouseDown;
        windowDelete.onclick = () => (windowElem.style.display = "none");
        windowElem.style.display = "none"; // Hide the window

        function dragMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            // Get starting mouse position
            xPos = e.clientX;
            yPos = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            document.ontouchend = closeDragElement;
            document.ontouchmove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            e.stopPropagation();
            // Get current position of touch/mouse
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            // Calculate drag distance in x and y directions
            changeOfX = xPos - clientX;
            xPos = clientX;
            changeOfY = yPos - clientY;
            yPos = clientY;

            // Set new position
            windowElem.style.top = windowElem.offsetTop - changeOfY + "px";
            windowElem.style.left = windowElem.offsetLeft - changeOfX + "px";
        }

        function closeDragElement() {
            // Stop moving when mouse stops
            document.onmouseup = null;
            document.onmousemove = null;
            document.ontouchend = null;
            document.ontouchmove = null;
        }
    }
});

//! Handle searchbar setup
document.addEventListener("DOMContentLoaded", () => {
    // TODO: Update this based on the game
    document.querySelector("#center-buttons").onclick =
        window.arcade.hideNongameElements; // Add start action to buttons

    // Get searchbar and track current suggestion
    const searchbar = document.getElementById("searchbar");
    const suggestionsList = document.getElementById("suggestions-list");
    let selectedSuggestionIndex = 0;
    searchbar.focus()

    //! Setup search suggestions
    // Fetch search suggestions from google
    function fetchSuggestions(query) {
        //! Use cors proxy to bypass CORS error
        const cors = "https://corsproxy.io/?";
        const url = `${cors}https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`;
        return fetch(url)
            .then((response) => response.json())
            .then((data) => {
                return data[1].slice(0, 5); // Return first 5 suggestions only
            })
            .catch((e) => {
                console.log(`Error ${e} when loading ${url}`);
            });
    };

    // Show suggestions in dropdown
    function showSuggestions(suggestions) {
        suggestionsList.innerHTML = "";

        // Make the first suggestion the input value and filter unique 
        if (!suggestions) suggestions = [];
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
                    // Filter to exclude current value
                    showSuggestions(suggestions.filter(suggestion => suggestion != searchbar.value));
                });
            } else {
                suggestionsList.style.display = "none";
            }
        })
    );

    // Hide the search suggestions if focus lost
    searchbar.addEventListener("blur", () => {
        suggestionsList.style.display = "none";
    });

    // Cycle between suggestions using arrow keys
    searchbar.addEventListener("keydown", function (event) {
        if (['ArrowUp', 'ArrowDown'].includes(event.key) && suggestionsList.childElementCount > 1) {
            // Remove selected status from current suggestion
            const currentActive = suggestionsList.querySelector(
                `:nth-child(${selectedSuggestionIndex + 1})`
            );
            currentActive.classList.remove("selected-suggestion");

            // Give the new selection a selected status
            const change = event.key == 'ArrowUp' ? - 1 + suggestionsList.childElementCount : 1
            selectedSuggestionIndex = (selectedSuggestionIndex + change) % suggestionsList.childElementCount
            const newActive = suggestionsList.querySelector(
                `:nth-child(${selectedSuggestionIndex + 1})`
            );
            newActive.classList.add("selected-suggestion");

            // Update value of searchbar and move the cursor
            searchbar.value = newActive.innerHTML;
            searchbar.selectionStart = searchbar.selectionEnd = searchbar.value.length;
        }
    });

    //! Setup searchbar functionality
    // Search the query if enter is pressed
    searchbar.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            window.open(
                "https://www.google.com/search?q=" + encodeURIComponent(searchbar.value)
            );
        }
    });
});
