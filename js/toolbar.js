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
});
