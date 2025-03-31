document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animated");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  elements.forEach((element) => {
    const animationType = element.getAttribute("data-animation");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.remove(`${animationType}-out`);
          element.classList.add(`${animationType}-in`);
        } else {
          element.classList.remove(`${animationType}-in`);
          element.classList.add(`${animationType}-out`);
        }
      });
    }, observerOptions);

    observer.observe(element);
  });
});
