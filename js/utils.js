//! Element fading
// Elements that fade out when a game begins
const fadeElements = [
  // document.getElementById("infobar"),
  document.getElementById("toolbar"),
  document.getElementById("center-title"),
  ...document.querySelectorAll(".window"),
];

const instantReappearElements = [
  document.getElementById("toolbar"),
  document.getElementById("center-title"),
];

export function hideNongameElements() {
  document.getElementById("searchbar").blur(); // Stop searching
  const opacityFadeTime = 0.3; // For finetuning opacity fade times
  fadeElements.forEach((e) => {
    const tunedTime =
      e.id == "center-title" ? opacityFadeTime / 2 : opacityFadeTime; // Halve the time required for center-title
    e.style.transition = `top 0.5s ease, transform 1s ease, opacity ${tunedTime}s ease`;
    e.style.opacity = 0;
  });

  // Move up center items to top of screen and fade others
  document.getElementById("center").style.transition =
    "top 0.7s ease-in-out, transform 0.7s ease-in-out";
  document.getElementById("center").classList.add("move-to-top");
}

export function showNongameElements() {
  // Force center title to appear first
  instantReappearElements.forEach((e) => {
    e.transition = "";
    e.style.opacity = 1;
  });
  // Remove added classes
  document.getElementById("center").classList.remove("move-to-top");
  fadeElements.forEach((e) => e.classList.remove("faded"));
}
