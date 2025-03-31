document.addEventListener("DOMContentLoaded", () => {
  const sliderItems = document.querySelectorAll(".slider-item");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");

  let currentSlide = 0;
  let autoPlayInterval;

  // Initialize first slide content animations
  const initialContent = document.querySelectorAll(
    ".slider-item.active h1, .slider-item.active p, .slider-item.active .cta-button"
  );
  initialContent.forEach((el) => el.classList.add("fade-up"));

  function showSlide(index) {
    if (index < 0 || index >= sliderItems.length) return;

    // Remove active class and animations from all slides
    sliderItems.forEach((item) => {
      item.classList.remove("active");
      const content = item.querySelectorAll("h1, p, .cta-button");
      content.forEach((el) => el.classList.remove("fade-up"));
    });

    // Update current slide
    currentSlide = index;
    const currentSliderItem = sliderItems[currentSlide];
    currentSliderItem.classList.add("active");

    // Update dot navigation
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");

    // Add content animations after slide transition
    currentSliderItem.addEventListener(
      "transitionend",
      (e) => {
        if (e.propertyName === "opacity") {
          const contentElements =
            currentSliderItem.querySelectorAll("h1, p, .cta-button");
          contentElements.forEach((el, i) => {
            setTimeout(() => el.classList.add("fade-up"), i * 200); // Staggered animation
          });
        }
      },
      { once: true }
    );
  }

  // Dot navigation click handlers
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideIndex = parseInt(e.target.getAttribute("data-slide"));
      showSlide(slideIndex);
      resetAutoPlay();
    });
  });

  // Previous button handler
  prevButton.addEventListener("click", () => {
    let newIndex = currentSlide - 1;
    newIndex = newIndex < 0 ? sliderItems.length - 1 : newIndex;
    showSlide(newIndex);
    resetAutoPlay();
  });

  // Next button handler
  nextButton.addEventListener("click", () => {
    let newIndex = currentSlide + 1;
    newIndex = newIndex >= sliderItems.length ? 0 : newIndex;
    showSlide(newIndex);
    resetAutoPlay();
  });

  // Auto-play functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      let newIndex = currentSlide + 1;
      newIndex = newIndex >= sliderItems.length ? 0 : newIndex;
      showSlide(newIndex);
    }, 5000); // 7-second interval
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Initialize auto-play
  startAutoPlay();
});
