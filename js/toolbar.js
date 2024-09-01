document.addEventListener("DOMContentLoaded", () => {
  // Start the clock
  function startTime() {
    // Update the time
    const today = new Date();
    const h = today.getHours() % 12;
    const m = today.getMinutes();
    document.getElementById("clock").innerHTML =
      h + ":" + m.toString().padStart(2, "0"); // Add leading 0 to minutes

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

  // Trigger dropdowns
  const dropdownBtns = document.querySelectorAll("#toolbar button");
  dropdownBtns.forEach((dropBtn) => {
    const dropdown = dropBtn.querySelector(".dropdown");
    // Create a bounding element
    const boundingElement = document.createElement("div");
    boundingElement.style.position = "absolute";
    boundingElement.style.zIndex = "-1";
    boundingElement.style.background = "transparent";
    // Calculate the dimensions and position of the bounding element
    const buttonRect = dropBtn.getBoundingClientRect();
    dropdown.style.display = "block";
    const dropdownRect = dropdown.getBoundingClientRect();
    dropdown.style.display = "none";
    // Set absolute position of the bounding element relative to body
    boundingElement.style.width = `${Math.max(
      buttonRect.width,
      dropdownRect.width
    )}px`;
    boundingElement.style.height = `${
      buttonRect.height + dropdownRect.height
    }px`;
    boundingElement.style.top = `${buttonRect.top + window.scrollY}px`;
    boundingElement.style.left = `${buttonRect.left + window.scrollX}px`;
    document.body.appendChild(boundingElement);

    // Add the required events
    dropBtn.addEventListener("mouseenter", () => {
      dropdown.style.display = "block";
    });
    boundingElement.addEventListener("mouseleave", () => {
      dropdown.style.display = "none";
    });
  });
});
