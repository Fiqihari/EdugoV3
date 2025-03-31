// Helper Functions for Cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
  }
  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("promo-modal");
  const dontShowCheckbox = document.querySelector(".dont-show-label input");
  const promoConfig = {
    code: "AprilOff",
    endDate: new Date(2025, 3, 25), // April 25, 2025 (months are 0-indexed: Jan=0)
  };
  // // Check if navbar exists
  const navbar = document.querySelector(".navbar");
  // Select elements
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(
    ".nav-links a, .nav-links button"
  ); // Include button
  // Active section underline functionality
  const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sectionLinkMap = new Map();

  if (!navbar) {
    console.error("Navbar not found!");
    return;
  }

  window.addEventListener("scroll", function () {
    // Debugging: Check if scroll event is firing
    console.log("Scroll event detected");

    if (window.scrollY > 0) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close menu when link/button is clicked
  navLinksItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

  sectionLinks.forEach((link) => {
    const targetId = link.hash.substring(1);
    const section = document.getElementById(targetId);
    if (section) {
      sectionLinkMap.set(section, link);
    }
  });

  // Kontak Kami Button Handler
  const kontakButton = document.querySelector(".nav-link-button");
  if (kontakButton) {
    kontakButton.addEventListener("click", () => {
      const whatsappUrl = kontakButton.dataset.href; // Better than getAttribute
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  const observerOptions = {
    root: null,
    threshold: 0.5, // Adjust sensitivity (0.1 to 0.9)
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active from all links
        sectionLinks.forEach((link) => link.classList.remove("active"));
        // Add active to current link
        const activeLink = sectionLinkMap.get(entry.target);
        activeLink?.classList.add("active");
      }
    });
  }, observerOptions);

  sectionLinkMap.forEach((link, section) => {
    observer.observe(section);
  });

  // Handle initial load hash
  if (window.location.hash) {
    const initialLink = document.querySelector(
      `.nav-links a[href="${window.location.hash}"]`
    );
    initialLink?.classList.add("active");
  }

  // Check if user opted out (using sessionStorage)
  if (sessionStorage.getItem("dontShowPromo") === "true") {
    console.log("Modal opted out. Not showing.");
    return;
  }

  // Show modal after 15 seconds
  setTimeout(() => modal.classList.add("active"), 15000);

  // Close modal handlers
  document
    .querySelector(".modal-close")
    .addEventListener("click", () => modal.classList.remove("active"));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

  // Countdown timer setup
  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = promoConfig.endDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.querySelector(".countdown").innerHTML =
        '<span class="expired">Expired!</span>';
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document
      .querySelectorAll(".countdown-item span:first-child")
      .forEach((el, i) => {
        el.textContent = [days, hours, minutes, seconds][i]
          .toString()
          .padStart(2, "0");
      });
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  // Don't show checkbox handler
  dontShowCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      sessionStorage.setItem("dontShowPromo", "true"); // Store in sessionStorage
      modal.classList.remove("active"); // Hide modal immediately
    } else {
      sessionStorage.removeItem("dontShowPromo");
    }
  });

  // Promo code copy and button action
  document.querySelector(
    ".promo-code"
  ).textContent = `Use code: ${promoConfig.code}`;
  document.querySelector(".promo-button").addEventListener("click", () => {
    navigator.clipboard
      .writeText(promoConfig.code)
      .then(() => alert("Promo code copied!"))
      .catch((err) => console.error("Copy failed:", err));
    window.location.href =
      "https://wa.me/6285250794070?text=Halo%20Edugo!%2C%20saya%20mau%20promo%20pilin2025."; // Redirect example
  });
});

// FAQ Accordion Functionalities
setupFAQ(); // Tambahkan baris ini
function setupFAQ() {
  // Select all FAQ questions
  const faqQuestions = document.querySelectorAll(".faq-question");

  // Add click event to each question
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      // Get the parent FAQ item
      const faqItem = question.closest(".faq-item");

      // Toggle active class on the FAQ item
      faqItem.classList.toggle("active");

      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });
    });
  });
}

function initializeTestimonialSlider() {
  const slider = document.querySelector(".testimonial-slider");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  const dotsContainer = document.querySelector(".testimonial-dots");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval; // For auto-sliding

  // Create navigation dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "testimonial-dot";
    dot.addEventListener("click", () => {
      goToSlide(index);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".testimonial-dot");

  // Update slider position and active dot
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  // Navigation functions
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Auto-slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds interval
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  // Initialize
  updateSlider();
  startAutoSlide();

  // Cleanup on page unload (optional)
  return () => {
    clearInterval(autoSlideInterval);
  };
}

// Initialize slider when DOM is ready
document.addEventListener("DOMContentLoaded", initializeTestimonialSlider);

// Tab Switching Functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    // Hide all tab contents
    tabContents.forEach((content) => content.classList.remove("active"));

    // Show the selected tab content
    const tabId = button.getAttribute("data-tab");
    document.getElementById(tabId + "-tab").classList.add("active");
  });
});

// Details Button Functionality
const detailsButtons = document.querySelectorAll(".details-button");

detailsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const card = button.closest(".service-card");

    // Toggle active class for the clicked card
    card.classList.toggle("active");
    button.classList.toggle("active");

    // Set the height of package details
    const details = card.querySelector(".package-details, .service-details");
    if (card.classList.contains("active")) {
      details.style.height = details.scrollHeight + "px";
      button.textContent = "Hide Details";
    } else {
      details.style.height = "0";
      button.textContent = "See Details";
    }
  });
});
