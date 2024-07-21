document.addEventListener("DOMContentLoaded", () => {
  let currentSection = 0;
  const sections = document.querySelectorAll("section");
  let isScrolling = false;

  console.log("Sections:", sections); // Debugging statement

  function scrollToSection(index) {
    console.log("Scrolling to section:", index); // Debugging statement
    if (index < 0 || index >= sections.length) return;
    currentSection = index;
    const targetPosition = sections[currentSection].offsetTop;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
    // Delay the next scroll event to prevent multiple scrolls
    setTimeout(() => {
      isScrolling = false;
    }, 1000); // Adjust the timeout duration if necessary
  }

  window.addEventListener("wheel", (event) => {
    if (isScrolling) return;
    isScrolling = true;
    console.log("Wheel event:", event); // Debugging statement
    if (event.deltaY > 0) {
      scrollToSection(currentSection + 1);
    } else {
      scrollToSection(currentSection - 1);
    }
  });

  let touchStartY = 0;

  window.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
    console.log("Touch start:", touchStartY); // Debugging statement
  });

  window.addEventListener("touchend", (event) => {
    if (isScrolling) return;
    isScrolling = true;
    const touchEndY = event.changedTouches[0].clientY;
    console.log("Touch end:", touchEndY); // Debugging statement
    if (touchStartY > touchEndY + 50) {
      scrollToSection(currentSection + 1);
    } else if (touchStartY < touchEndY - 50) {
      scrollToSection(currentSection - 1);
    }
  });
});
