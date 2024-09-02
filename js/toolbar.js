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
