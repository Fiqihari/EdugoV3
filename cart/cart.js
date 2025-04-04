// --- START OF FILE cart.js ---

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed for cart page");

  // --- CONFIGURATION ---
  // <<<--- YOUR SCRIPT DEPLOYMENT ID (Extracted from the URL) --->>>
  const SCRIPT_DEPLOYMENT_ID =
    "AKfycbw9Qb1acDCVO70vv628bbdRWW-QqcEq8a5izOFMGwP0H94l2L7JcGeSOhrBNnDyHFbj";
  // <<<--- YOUR FULL SCRIPT URL (Constructed using the ID above) --->>>
  const SCRIPT_URL = `https://script.google.com/macros/s/${SCRIPT_DEPLOYMENT_ID}/exec`;

  const DEFAULT_IMAGE_URL = "../img/icons/default-placeholder.png"; // <<<--- VERIFY PATH!
  const CURRENCY_SYMBOL = "Rp";
  const DRAG_MOVE_THRESHOLD = 5; // Pixels threshold to trigger drag vs click
  const SLIDER_INTERVAL_MS = 2000; // Auto-slide interval in milliseconds

  // --- DATA (with Prices) ---
  // !! IMPORTANT: UPDATE THE PRICES MANUALLY HERE !!
  // !! VERIFY IMAGE PATHS !!
  const categorizedProducts = [
    {
      categoryName: "Bimbingan & Konsultasi",
      categoryId: "bimbingan",
      products: [
        {
          id: "konsultasi",
          name: "KONSULTASI/BIMBINGAN",
          note: "Diskusi & arahan langsung.",
          imageUrl: "../img/icons/consult.png",
          options: [
            { name: "1 jam konsultasi", price: 50000 },
            { name: "Paket Mingguan (2x)", price: 90000 },
            { name: "Paket Bulanan (8x)", price: 320000 },
          ],
        },
        {
          id: "simulasi",
          name: "SIMULASI SIDANG",
          note: "Latihan presentasi & tanya jawab.",
          imageUrl: "../img/icons/presentation.png",
          options: [
            { name: "1x Simulasi sidang (sempro/sidang akhir)", price: 75000 },
            { name: "Paket 3x", price: 200000 },
            { name: "Paket Sampai Bisa dan lancar", price: 350000 },
          ],
        },
        {
          id: "judul",
          name: "JUDUL SKRIPSI",
          note: "Bantu cari & ajukan judul.",
          imageUrl: "../img/icons/title.png",
          options: [
            { name: "1-3 Judul", price: 30000 },
            { name: "1-3 Judul (incl Jurnal/Reference)", price: 50000 },
            { name: "Paket Pengajuan Judul Free Revisi", price: 80000 },
          ],
        },
      ],
    },
    {
      categoryName: "Penulisan & Dokumen",
      categoryId: "dokumen",
      products: [
        {
          id: "matriks",
          name: "MATRIKS PENELITIAN",
          note: "Per topik bahasan.",
          imageUrl: "../img/icons/matrix.png",
          options: [
            { name: "1x Revisi", price: 40000 },
            { name: "2x Revisi", price: 60000 },
            { name: "Free Revisi", price: 100000 },
          ],
        },
        {
          id: "referensi",
          name: "REFERENSI/DAFPUS",
          note: "Per topik bahasan.",
          imageUrl: "../img/icons/references.png",
          options: [
            { name: "Nasional", price: 25000 },
            { name: "Internasional", price: 40000 },
          ],
        },
        {
          id: "jurnal",
          name: "JURNAL PENELITIAN",
          note: "Pembuatan naskah jurnal.",
          imageUrl: "../img/icons/journal.png",
          options: [
            { name: "Naskah asli", price: 150000 },
            { name: "Tanpa Naskah/Materi", price: 200000 },
          ],
        },
        {
          id: "instrumen",
          name: "INSTRUMEN PENELITIAN",
          note: "Kuesioner, wawancara, dll.",
          imageUrl: "../img/icons/instrument.png",
          options: [
            { name: "Dengan D.O", price: 60000 },
            { name: "Tanpa D.O", price: 80000 },
          ],
        },
        {
          id: "bab1",
          name: "BAB I PENELITIAN",
          note: "Pendahuluan.",
          imageUrl: "../img/icons/chapter.png",
          options: [
            { name: "1x Order (no revisi)", price: 100000 },
            { name: "1x Revisi", price: 130000 },
            { name: "3x Revisi", price: 180000 },
            { name: "Free Revisi sampai ACC", price: 250000 },
          ],
        },
        {
          id: "bab2",
          name: "BAB II PENELITIAN",
          note: "Tinjauan Pustaka.",
          imageUrl: "../img/icons/chapter.png",
          options: [
            { name: "1x Order (no revisi)", price: 120000 },
            { name: "1x Revisi", price: 150000 },
            { name: "3x Revisi", price: 200000 },
            { name: "Free Revisi sampai ACC", price: 280000 },
          ],
        },
        {
          id: "bab3",
          name: "BAB III PENELITIAN",
          note: "Metode Penelitian.",
          imageUrl: "../img/icons/chapter.png",
          options: [
            { name: "1x Order (no revisi)", price: 110000 },
            { name: "1x Revisi", price: 140000 },
            { name: "3x Revisi", price: 190000 },
            { name: "Free Revisi sampai ACC", price: 260000 },
          ],
        },
        {
          id: "bab4",
          name: "BAB IV PENELITIAN",
          note: "Hasil & Pembahasan.",
          imageUrl: "../img/icons/chapter.png",
          options: [
            { name: "1x Order (no revisi)", price: 150000 },
            { name: "1x Revisi", price: 190000 },
            { name: "3x Revisi", price: 250000 },
            { name: "Free Revisi sampai ACC", price: 350000 },
          ],
        },
        {
          id: "bab5",
          name: "BAB V PENELITIAN",
          note: "Kesimpulan & Saran.",
          imageUrl: "../img/icons/chapter.png",
          options: [
            { name: "1x Order (no revisi)", price: 80000 },
            { name: "1x Revisi", price: 100000 },
            { name: "3x Revisi", price: 140000 },
            { name: "Free Revisi sampai ACC", price: 200000 },
          ],
        },
      ],
    },
    {
      categoryName: "Paket Lengkap",
      categoryId: "paket",
      products: [
        {
          id: "paket_sempro",
          name: "PAKET SEMPRO (BAB I-III)",
          note: "Incl PPT, Turnitin, Bimbingan, Referensi, Instrumen.",
          imageUrl: "../img/icons/package-sempro.png",
          options: [
            { name: "1x Revisi", price: 500000 },
            { name: "3x Revisi", price: 650000 },
            { name: "Free Revisi sampai ACC", price: 800000 },
          ],
        },
        {
          id: "paket_hasil",
          name: "PAKET HASIL (BAB IV-V)",
          note: "Incl PPT, Turnitin, Bimbingan, Referensi, Olah data, Revisi Data.",
          imageUrl: "../img/icons/package-final.png",
          options: [
            { name: "1x Revisi", price: 600000 },
            { name: "3x Revisi", price: 750000 },
            { name: "Free Revisi sampai ACC", price: 950000 },
          ],
        },
      ],
    },
    {
      categoryName: "Layanan Pendukung",
      categoryId: "lainnya",
      products: [
        {
          id: "ppt",
          name: "POWERPOINT",
          note: "Presentasi Sempro/Sidang (Free Revisi).",
          imageUrl: "../img/icons/ppt.png",
          options: [
            { name: "Dengan materi: Basic design", price: 50000 },
            { name: "Dengan materi: Premium design", price: 75000 },
            { name: "Dengan materi: Eksklusif design", price: 100000 },
            { name: "Tanpa materi: Basic design", price: 60000 },
            { name: "Tanpa materi: Premium design", price: 90000 },
            { name: "Tanpa materi: Eksklusif design", price: 120000 },
          ],
        },
        {
          id: "turnitin",
          name: "CEK TURNITIN",
          note: "Pengecekan plagiarisme.",
          imageUrl: "../img/icons/turnitin.png",
          options: [
            { name: "1x check", price: 15000 },
            { name: "3x check", price: 35000 },
            { name: "Check sepuasnya", price: 50000 },
          ],
        },
        {
          id: "parafrase",
          name: "PARAFRASE",
          note: "Menurunkan skor Turnitin.",
          imageUrl: "../img/icons/paraphrase.png",
          options: [
            { name: "Per halaman", price: 10000 },
            { name: "All page (Diskon)", price: 0 }, // Check logic if needed
          ],
        },
      ],
    },
  ];
  // >>>>>>>> END OF YOUR DATA <<<<<<<<<<<

  let cart = [];

  // --- DOM Elements Caching ---
  const productListContainer = document.getElementById("product-list");
  const customerForm = document.getElementById("customer-form");
  const modalStatusMessageEl = document.getElementById("modal-status-message");
  const checkoutSubmitBtn = document.getElementById("submit-checkout-btn");
  const floatingCartBtn = document.getElementById("floating-cart-btn");
  const cartItemCountBadge = floatingCartBtn?.querySelector(".cart-item-count");
  const cartPopup = document.getElementById("cart-popup");
  const cartOverlay = document.getElementById("cart-overlay");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartPopupItemsContainer = document.getElementById("cart-popup-items");
  const cartPopupEmptyMsg = document.getElementById("cart-popup-empty-msg");
  const checkoutFromCartBtn = document.getElementById("checkout-from-cart-btn");
  const cartPopupTotalEl = document.getElementById("cart-popup-total");
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutModalOverlay = document.getElementById(
    "checkout-modal-overlay"
  );
  const closeCheckoutModalBtn = document.getElementById(
    "close-checkout-modal-btn"
  );
  const cancelCheckoutModalBtn = document.getElementById(
    "cancel-checkout-modal-btn"
  );
  const toastContainer = document.getElementById("toast-notifications");
  const currentYearSpan = document.getElementById("current-year");
  const promoSlider = document.getElementById("promo-slider");
  const promoSlides = promoSlider?.querySelectorAll(".promo-slide");
  const sliderDotsContainer = promoSlider?.querySelector(".slider-dots");

  // Check critical elements
  if (
    !productListContainer ||
    !floatingCartBtn ||
    !cartPopup ||
    !checkoutModal ||
    !cartPopupTotalEl
  ) {
    console.error("Fatal Error: One or more critical UI elements not found!");
    // Optional: Display user-facing error
  }

  // --- Draggable State ---
  let isDragging = false;
  let rawDragStartX, rawDragStartY;
  let initialButtonX, initialButtonY;
  let touchIdentifier = null;
  let dragMoved = false;

  // --- Slider State ---
  let currentSlideIndex = 0;
  let sliderIntervalId = null;
  let sliderDots = [];

  // --- Functions ---

  function setCurrentYear() {
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
  }

  function formatPrice(amount) {
    if (typeof amount !== "number") amount = 0;
    return `${CURRENCY_SYMBOL} ${amount.toLocaleString("id-ID")}`;
  }

  function renderProducts() {
    if (!productListContainer) return;
    productListContainer.innerHTML = "";

    if (!categorizedProducts || categorizedProducts.length === 0) {
      productListContainer.innerHTML =
        '<p class="cart-empty">Layanan tidak tersedia saat ini.</p>';
      return;
    }

    try {
      categorizedProducts.forEach((category) => {
        if (!category || !category.categoryId || !category.categoryName) {
          console.warn("Skipping invalid category data:", category);
          return;
        }
        const categorySection = document.createElement("section");
        categorySection.className = `category-section`;
        categorySection.id = `category-${category.categoryId}`;
        const initialIconClass = "fa-chevron-down";

        const categoryHeader = document.createElement("div");
        categoryHeader.className = "category-header";
        categoryHeader.innerHTML = `
              <h2>${escapeHTML(category.categoryName)}</h2>
              <button class="category-toggle-btn" aria-expanded="false" aria-controls="grid-${
                category.categoryId
              }" aria-label="Toggle ${escapeHTML(category.categoryName)}">
                  <i class="fas ${initialIconClass}"></i>
              </button>`;
        categorySection.appendChild(categoryHeader);

        const productGrid = document.createElement("div");
        productGrid.className = "product-grid";
        productGrid.id = `grid-${category.categoryId}`;
        productGrid.style.maxHeight = "0px"; // Start closed

        if (category.products && category.products.length > 0) {
          category.products.forEach((product) => {
            if (!product || !product.id || !product.name) {
              console.warn("Skipping invalid product data:", product);
              return;
            }
            const productItem = document.createElement("article");
            productItem.className = "product-item";
            productItem.dataset.productId = product.id;
            const hasOptions = product.options && product.options.length > 0;
            if (hasOptions) productItem.dataset.hasOptions = "true";

            productItem.innerHTML = `
                  <div class="product-image">
                      <img src="${
                        product.imageUrl || DEFAULT_IMAGE_URL
                      }" alt="${
              escapeHTML(product.name) || "Layanan"
            }" loading="lazy" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE_URL}'; this.parentElement.innerHTML='<div class=\\'img-placeholder\\'><i class=\\'fas fa-image\\'></i></div>';">
                  </div>
                  <div class="product-content">
                      <div class="product-header ${
                        hasOptions ? "has-options" : ""
                      }">
                          <h3>${escapeHTML(product.name)}</h3>
                          ${
                            hasOptions
                              ? `<button type="button" class="details-toggle-btn" aria-expanded="false" aria-label="Tampilkan Opsi" tabindex="-1"><i class="fas fa-chevron-down"></i></button>`
                              : ""
                          }
                      </div>
                      ${
                        product.note
                          ? `<p class="product-note">${escapeHTML(
                              product.note
                            )}</p>`
                          : ""
                      }
                      ${
                        hasOptions
                          ? `
                      <div class="product-options" aria-hidden="true">
                          <ul>
                              ${product.options
                                .map((option) => {
                                  const optionName =
                                    option.name || "Pilihan Default";
                                  const optionPrice =
                                    typeof option.price === "number"
                                      ? option.price
                                      : 0;
                                  return `
                                      <li>
                                          <span class="option-name">${escapeHTML(
                                            optionName
                                          )} - <strong>${formatPrice(
                                    optionPrice
                                  )}</strong></span>
                                          <button type="button" class="add-to-cart-btn"
                                                  data-product-id="${
                                                    product.id
                                                  }"
                                                  data-product-name="${escapeHTML(
                                                    product.name
                                                  )}"
                                                  data-option-name="${escapeHTML(
                                                    optionName
                                                  )}"
                                                  data-product-price="${optionPrice}">
                                              <i class="fas fa-plus"></i> Tambah
                                          </button>
                                      </li>`;
                                })
                                .join("")}
                          </ul>
                      </div>
                      `
                          : `
                      <div class="product-no-options">
                           <p class="product-price">${formatPrice(
                             product.price || 0
                           )}</p>
                           <button type="button" class="add-to-cart-btn primary-add"
                                  data-product-id="${product.id}"
                                  data-product-name="${escapeHTML(
                                    product.name
                                  )}"
                                  data-option-name="Layanan Utama"
                                  data-product-price="${product.price || 0}">
                                <i class="fas fa-cart-plus"></i> Tambah
                            </button>
                      </div>
                      `
                      }
                  </div>`;
            productGrid.appendChild(productItem);
          });
        } else {
          productGrid.innerHTML =
            '<p class="grid-empty-msg">Tidak ada layanan di kategori ini.</p>';
        }
        categorySection.appendChild(productGrid);
        productListContainer.appendChild(categorySection);
      });
    } catch (error) {
      console.error("Error during renderProducts:", error);
      productListContainer.innerHTML =
        '<p class="cart-empty error-msg">Gagal memuat produk.</p>';
    }
  }

  function toggleCartPopup(forceOpen = null) {
    if (!cartPopup || !cartOverlay) return;
    const shouldOpen =
      forceOpen !== null ? forceOpen : !cartPopup.classList.contains("active");
    cartPopup.classList.toggle("active", shouldOpen);
    cartOverlay.classList.toggle("active", shouldOpen);
    if (!checkoutModal?.classList.contains("active")) {
      document.body.style.overflow = shouldOpen ? "hidden" : "";
    }
    cartPopup.setAttribute("aria-hidden", !shouldOpen);
    if (shouldOpen)
      cartPopup.querySelector('button, a, input, [tabindex="0"]')?.focus();
  }

  function toggleCheckoutModal(forceOpen = null) {
    if (!checkoutModal || !checkoutModalOverlay) return;
    const shouldOpen =
      forceOpen !== null
        ? forceOpen
        : !checkoutModal.classList.contains("active");
    checkoutModal.classList.toggle("active", shouldOpen);
    checkoutModalOverlay.classList.toggle("active", shouldOpen);
    document.body.style.overflow = shouldOpen ? "hidden" : "";
    checkoutModal.setAttribute("aria-hidden", !shouldOpen);

    if (shouldOpen) {
      if (cartPopup?.classList.contains("active")) toggleCartPopup(false);
      setTimeout(
        () =>
          customerForm
            ?.querySelector("input[required]:not(:disabled)")
            ?.focus(),
        150
      );
    } else {
      hideStatus(modalStatusMessageEl);
    }
  }

  function renderCartItems() {
    if (!cartPopupItemsContainer || !cartPopupEmptyMsg || !checkoutFromCartBtn)
      return;
    cartPopupItemsContainer.innerHTML = "";
    const hasItems = cart.length > 0;
    checkoutFromCartBtn.disabled = !hasItems;
    cartPopupEmptyMsg.style.display = hasItems ? "none" : "block";

    if (hasItems) {
      const ul = document.createElement("ul");
      cart.forEach((item) => {
        const li = document.createElement("li");
        li.dataset.itemId = item.id;
        li.innerHTML = `
               <div class="cart-item-details">
                   <span class="product-name">${escapeHTML(
                     item.productName
                   )}</span>
                   <span class="option-name">${escapeHTML(
                     item.optionName
                   )}</span>
                   <span class="cart-item-price">${formatPrice(
                     item.price
                   )}</span>
               </div>
               <button type="button" class="remove-from-cart-btn" aria-label="Hapus ${escapeHTML(
                 item.optionName
               )}"><i class="fas fa-trash-alt"></i></button>
           `;
        ul.appendChild(li);
      });
      cartPopupItemsContainer.appendChild(ul);
      attachCartItemRemoveListeners();
    }
    updateCartTotal();
  }

  function attachCartItemRemoveListeners() {
    const buttons = cartPopupItemsContainer.querySelectorAll(
      ".remove-from-cart-btn"
    );
    buttons.forEach((button) => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      newButton.addEventListener("click", handleRemoveItemClick);
    });
  }

  function handleRemoveItemClick(event) {
    const listItem = event.currentTarget.closest("li");
    if (listItem?.dataset.itemId) {
      removeFromCart(listItem.dataset.itemId);
    } else {
      console.warn("Could not find item ID to remove.");
    }
  }

  function updateCartCountBadge() {
    if (!cartItemCountBadge || !floatingCartBtn) return;
    const count = cart.length;
    cartItemCountBadge.textContent = count;
    floatingCartBtn.classList.toggle("has-items", count > 0);
  }

  function updateCartTotal() {
    if (!cartPopupTotalEl) return;
    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    cartPopupTotalEl.innerHTML = `Total: <strong>${formatPrice(
      total
    )}</strong>`;
  }

  function showToast(message, type = "success") {
    if (!toastContainer) {
      console.error("Toast container not found!");
      return;
    }
    const toast = document.createElement("div");
    toast.className = `toast-notification ${type}`;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    const iconClass =
      type === "error"
        ? "fa-times-circle"
        : type === "info"
        ? "fa-info-circle"
        : "fa-check-circle";
    toast.innerHTML = `<i class="fas ${iconClass}" aria-hidden="true"></i> ${escapeHTML(
      message
    )}`;
    toastContainer.appendChild(toast);
    void toast.offsetWidth;
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
    setTimeout(() => {
      toast.classList.add("hide");
      toast.addEventListener("transitionend", () => toast.remove(), {
        once: true,
      });
      setTimeout(() => toast?.remove(), 600);
    }, 3500);
  }

  function addToCart(productId, productName, optionName, price) {
    const numericPrice = Number(price) || 0;
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      productId,
      productName,
      optionName,
      price: numericPrice,
    };
    cart.push(newItem);
    renderCartItems();
    updateCartCountBadge();
    updateCartTotal();
    showToast(`"${escapeHTML(optionName)}" ditambahkan!`);
  }

  function removeFromCart(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
      renderCartItems();
      updateCartCountBadge();
      updateCartTotal();
    } else {
      console.warn(`Item ID ${itemId} not found in cart.`);
    }
  }

  // --- Draggable Button Logic ---
  function dragStart(e) {
    if (!floatingCartBtn) return;
    const isTouchEvent = e.type === "touchstart";
    const evt = isTouchEvent ? e.touches[0] : e;
    if (!isTouchEvent && e.button !== 0) return;
    if (isTouchEvent && touchIdentifier !== null && e.touches.length > 1)
      return;

    dragMoved = false;
    const rect = floatingCartBtn.getBoundingClientRect();
    initialButtonX = rect.left;
    initialButtonY = rect.top;
    floatingCartBtn.style.left = `${initialButtonX}px`;
    floatingCartBtn.style.top = `${initialButtonY}px`;
    floatingCartBtn.style.right = "auto";
    floatingCartBtn.style.bottom = "auto";
    floatingCartBtn.style.transform = "none";
    rawDragStartX = evt.clientX;
    rawDragStartY = evt.clientY;
    isDragging = true;
    touchIdentifier = isTouchEvent ? evt.identifier : null;

    floatingCartBtn.classList.add("dragging");
    floatingCartBtn.style.cursor = "grabbing";
    floatingCartBtn.style.transition = "none";

    document.addEventListener(
      isTouchEvent ? "touchmove" : "mousemove",
      dragging,
      { passive: false, capture: true }
    );
    document.addEventListener(isTouchEvent ? "touchend" : "mouseup", dragEnd, {
      capture: true,
    });
    document.addEventListener("touchcancel", dragEnd, { capture: true });
    document.body.style.userSelect = "none";
  }

  function dragging(e) {
    if (!isDragging || !floatingCartBtn) return;
    e.preventDefault();
    e.stopPropagation();
    let evt = e;
    if (e.type === "touchmove") {
      let correctTouch = null;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdentifier) {
          correctTouch = e.changedTouches[i];
          break;
        }
      }
      if (!correctTouch) return;
      evt = correctTouch;
    }
    let currentDeltaX = evt.clientX - rawDragStartX;
    let currentDeltaY = evt.clientY - rawDragStartY;
    if (!dragMoved) {
      if (
        Math.sqrt(
          currentDeltaX * currentDeltaX + currentDeltaY * currentDeltaY
        ) > DRAG_MOVE_THRESHOLD
      )
        dragMoved = true;
    }
    let targetX = initialButtonX + currentDeltaX;
    let targetY = initialButtonY + currentDeltaY;
    const btnWidth = floatingCartBtn.offsetWidth;
    const btnHeight = floatingCartBtn.offsetHeight;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const buffer = 5;
    targetX = Math.max(buffer, Math.min(targetX, winWidth - btnWidth - buffer));
    targetY = Math.max(
      buffer,
      Math.min(targetY, winHeight - btnHeight - buffer)
    );
    let finalDeltaX = targetX - initialButtonX;
    let finalDeltaY = targetY - initialButtonY;
    floatingCartBtn.style.transform = `translate(${finalDeltaX}px, ${finalDeltaY}px)`;
  }

  function dragEnd(e) {
    if (!isDragging || !floatingCartBtn) return;
    e.stopPropagation();
    const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
    let evt = isTouchEvent ? e.changedTouches[0] : e;
    if (isTouchEvent) {
      let correctTouch = null;
      if (e.changedTouches) {
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === touchIdentifier) {
            correctTouch = e.changedTouches[i];
            break;
          }
        }
      }
      if (correctTouch) evt = correctTouch;
      touchIdentifier = null;
    }
    floatingCartBtn.classList.remove("dragging");
    floatingCartBtn.style.cursor = "grab";
    if (dragMoved) {
      let finalX = initialButtonX + (evt.clientX - rawDragStartX);
      let finalY = initialButtonY + (evt.clientY - rawDragStartY);
      const btnWidth = floatingCartBtn.offsetWidth;
      const btnHeight = floatingCartBtn.offsetHeight;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const buffer = 5;
      finalX = Math.max(buffer, Math.min(finalX, winWidth - btnWidth - buffer));
      finalY = Math.max(
        buffer,
        Math.min(finalY, winHeight - btnHeight - buffer)
      );
      floatingCartBtn.style.left = `${finalX}px`;
      floatingCartBtn.style.top = `${finalY}px`;
    }
    floatingCartBtn.style.transform = "none";
    floatingCartBtn.style.transition = "";
    document.removeEventListener("mousemove", dragging, { capture: true });
    document.removeEventListener("mouseup", dragEnd, { capture: true });
    document.removeEventListener("touchmove", dragging, {
      passive: false,
      capture: true,
    });
    document.removeEventListener("touchend", dragEnd, { capture: true });
    document.removeEventListener("touchcancel", dragEnd, { capture: true });
    document.body.style.userSelect = "";
    isDragging = false;
  }

  function setupDraggableButton() {
    if (!floatingCartBtn) {
      console.error("Draggable button not found.");
      return;
    }
    isDragging = false;
    dragMoved = false;
    touchIdentifier = null;
    floatingCartBtn.classList.remove("dragging");
    floatingCartBtn.style.cursor = "grab";
    floatingCartBtn.style.transform = "none";
    const computedStyle = window.getComputedStyle(floatingCartBtn);
    let currentLeft = floatingCartBtn.style.left || computedStyle.left;
    let currentTop = floatingCartBtn.style.top || computedStyle.top;
    if (
      (currentLeft === "auto" || currentLeft === "") &&
      computedStyle.right !== "auto"
    ) {
      currentLeft = `${
        window.innerWidth -
        parseFloat(computedStyle.right) -
        floatingCartBtn.offsetWidth
      }px`;
    }
    if (
      (currentTop === "auto" || currentTop === "") &&
      computedStyle.bottom !== "auto"
    ) {
      currentTop = `${
        window.innerHeight -
        parseFloat(computedStyle.bottom) -
        floatingCartBtn.offsetHeight
      }px`;
    }
    floatingCartBtn.style.left = !isNaN(parseFloat(currentLeft))
      ? currentLeft
      : "auto";
    floatingCartBtn.style.top = !isNaN(parseFloat(currentTop))
      ? currentTop
      : "auto";
    if (floatingCartBtn.style.left !== "auto")
      floatingCartBtn.style.right = "auto";
    if (floatingCartBtn.style.top !== "auto")
      floatingCartBtn.style.bottom = "auto";

    floatingCartBtn.removeEventListener("mousedown", dragStart);
    floatingCartBtn.removeEventListener("touchstart", dragStart);
    document.removeEventListener("mousemove", dragging, { capture: true });
    document.removeEventListener("mouseup", dragEnd, { capture: true });
    document.removeEventListener("touchmove", dragging, {
      passive: false,
      capture: true,
    });
    document.removeEventListener("touchend", dragEnd, { capture: true });
    document.removeEventListener("touchcancel", dragEnd, { capture: true });

    floatingCartBtn.addEventListener("mousedown", dragStart);
    floatingCartBtn.addEventListener("touchstart", dragStart, {
      passive: false,
    });
    floatingCartBtn.setAttribute("tabindex", "0");
  }
  // --- End Draggable Logic ---

  // --- Promo Slider Logic ---
  function showSlide(index) {
    if (
      !promoSlides ||
      promoSlides.length === 0 ||
      !sliderDots ||
      sliderDots.length === 0
    )
      return;
    if (index >= promoSlides.length) index = 0;
    if (index < 0) index = promoSlides.length - 1;
    promoSlides.forEach((slide) => slide.classList.remove("active"));
    sliderDots.forEach((dot) => dot.classList.remove("active"));
    if (promoSlides[index]) promoSlides[index].classList.add("active");
    if (sliderDots[index]) sliderDots[index].classList.add("active");
    currentSlideIndex = index;
  }
  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }
  function setupSlider() {
    if (
      !promoSlider ||
      !promoSlides ||
      promoSlides.length === 0 ||
      !sliderDotsContainer
    ) {
      console.warn("Promo slider elements not found, skipping setup.");
      if (promoSlider) promoSlider.style.display = "none";
      return;
    }
    sliderDotsContainer.innerHTML = "";
    sliderDots = [];
    promoSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("slider-dot");
      dot.dataset.index = index;
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      sliderDotsContainer.appendChild(dot);
      sliderDots.push(dot);
    });
    sliderDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.dataset.index, 10);
        showSlide(index);
        clearInterval(sliderIntervalId);
        sliderIntervalId = setInterval(nextSlide, SLIDER_INTERVAL_MS);
      });
    });
    showSlide(0);
    clearInterval(sliderIntervalId);
    sliderIntervalId = setInterval(nextSlide, SLIDER_INTERVAL_MS);
    promoSlider.addEventListener("mouseenter", () =>
      clearInterval(sliderIntervalId)
    );
    promoSlider.addEventListener("mouseleave", () => {
      clearInterval(sliderIntervalId);
      sliderIntervalId = setInterval(nextSlide, SLIDER_INTERVAL_MS);
    });
  }
  // --- End Promo Slider Logic ---

  function toggleProductOptions(productItemElement) {
    const productOptions = productItemElement.querySelector(".product-options");
    const detailsButton = productItemElement.querySelector(
      ".details-toggle-btn"
    );
    const icon = detailsButton?.querySelector("i");
    if (!productOptions || !detailsButton || !icon) return;
    const isExpanding =
      !productItemElement.classList.contains("options-active");
    productItemElement.classList.toggle("options-active", isExpanding);
    detailsButton.setAttribute("aria-expanded", isExpanding);
    productOptions.setAttribute("aria-hidden", !isExpanding);
    icon.classList.toggle("fa-chevron-down", !isExpanding);
    icon.classList.toggle("fa-chevron-up", isExpanding);
    if (isExpanding) {
      productOptions.style.maxHeight = productOptions.scrollHeight + "px";
      const handleOptionsOpenEnd = () => {
        if (productItemElement.classList.contains("options-active")) {
          productOptions.style.maxHeight = "none";
        }
        productOptions.removeEventListener(
          "transitionend",
          handleOptionsOpenEnd
        );
      };
      productOptions.addEventListener("transitionend", handleOptionsOpenEnd, {
        once: true,
      });
    } else {
      productOptions.style.maxHeight = productOptions.scrollHeight + "px";
      requestAnimationFrame(() => {
        productOptions.style.maxHeight = "0";
      });
    }
  }

  // --- Event Handlers Setup ---
  function setupEventListeners() {
    if (productListContainer) {
      productListContainer.addEventListener("click", handleProductListClick);
    } else {
      console.error("Product list container not found.");
    }
    if (floatingCartBtn) {
      floatingCartBtn.addEventListener("click", (e) => {
        if (isDragging || dragMoved) {
          if (dragMoved) dragMoved = false;
          return;
        }
        toggleCartPopup();
      });
      setupDraggableButton();
    } else {
      console.error("Floating cart button not found.");
    }
    if (closeCartBtn)
      closeCartBtn.addEventListener("click", () => toggleCartPopup(false));
    if (cartOverlay)
      cartOverlay.addEventListener("click", () => toggleCartPopup(false));
    if (checkoutFromCartBtn)
      checkoutFromCartBtn.addEventListener(
        "click",
        handleCheckoutFromCartClick
      );
    if (closeCheckoutModalBtn)
      closeCheckoutModalBtn.addEventListener("click", () =>
        toggleCheckoutModal(false)
      );
    if (cancelCheckoutModalBtn)
      cancelCheckoutModalBtn.addEventListener("click", () =>
        toggleCheckoutModal(false)
      );
    if (checkoutModalOverlay)
      checkoutModalOverlay.addEventListener("click", (e) => {
        if (e.target === checkoutModalOverlay) toggleCheckoutModal(false);
      });
    if (customerForm) {
      customerForm.addEventListener("submit", handleCheckoutSubmit);
    } else {
      console.error("Customer form not found.");
    }
    document
      .querySelectorAll(".nav-link-button[data-href], a.nav-link[data-href]")
      .forEach((button) => {
        if (!button.dataset.listenerAttached) {
          button.addEventListener("click", (e) => {
            if (button.tagName === "BUTTON") e.preventDefault();
            const url = button.getAttribute("data-href");
            if (url) window.open(url, "_blank");
          });
          button.dataset.listenerAttached = "true";
        }
      });
  }

  function handleProductListClick(event) {
    const categoryHeader = event.target.closest(".category-header");
    const addButton = event.target.closest(".add-to-cart-btn");
    const productItem = event.target.closest(".product-item");

    if (categoryHeader) {
      const clickedSection = categoryHeader.closest(".category-section");
      if (!clickedSection) return;
      const wasActive = clickedSection.classList.contains("category-active");
      const gridToToggle = clickedSection.querySelector(".product-grid");
      const buttonToToggle = clickedSection.querySelector(
        ".category-toggle-btn"
      );
      const iconToToggle = buttonToToggle?.querySelector("i");

      productListContainer
        .querySelectorAll(".category-section.category-active")
        .forEach((activeSection) => {
          if (activeSection !== clickedSection) {
            const grid = activeSection.querySelector(".product-grid");
            const button = activeSection.querySelector(".category-toggle-btn");
            const icon = button?.querySelector("i");
            activeSection.classList.remove("category-active");
            if (grid) grid.style.maxHeight = "0px";
            if (button) button.setAttribute("aria-expanded", "false");
            if (icon) {
              icon.classList.remove("fa-chevron-up");
              icon.classList.add("fa-chevron-down");
            }
          }
        });

      if (wasActive) {
        clickedSection.classList.remove("category-active");
        if (gridToToggle) gridToToggle.style.maxHeight = "0px";
        if (buttonToToggle)
          buttonToToggle.setAttribute("aria-expanded", "false");
        if (iconToToggle) {
          iconToToggle.classList.remove("fa-chevron-up");
          iconToToggle.classList.add("fa-chevron-down");
        }
      } else {
        clickedSection.classList.add("category-active");
        if (buttonToToggle)
          buttonToToggle.setAttribute("aria-expanded", "true");
        if (iconToToggle) {
          iconToToggle.classList.remove("fa-chevron-down");
          iconToToggle.classList.add("fa-chevron-up");
        }
        if (gridToToggle) {
          gridToToggle.style.maxHeight = "none";
          const scrollHeight = gridToToggle.scrollHeight;
          gridToToggle.style.maxHeight = "0px";
          requestAnimationFrame(() => {
            gridToToggle.style.maxHeight = scrollHeight + "px";
            const handleTransitionEnd = () => {
              if (clickedSection.classList.contains("category-active")) {
                gridToToggle.style.maxHeight = "none";
              }
              gridToToggle.removeEventListener(
                "transitionend",
                handleTransitionEnd
              );
            };
            gridToToggle.addEventListener(
              "transitionend",
              handleTransitionEnd,
              { once: true }
            );
          });
        }
      }
    } else if (addButton && !addButton.disabled) {
      const { productId, productName, optionName, productPrice } =
        addButton.dataset;
      if (
        productId &&
        productName &&
        optionName &&
        productPrice !== undefined
      ) {
        addToCart(productId, productName, optionName, parseFloat(productPrice));
        addButton.innerHTML = '<i class="fas fa-check"></i> Ditambah';
        addButton.disabled = true;
        setTimeout(() => {
          const parentItem = addButton.closest(".product-item");
          const currentButton =
            parentItem?.querySelector(
              `button.add-to-cart-btn[data-product-id="${productId}"][data-option-name="${escapeAttribute(
                optionName
              )}"]`
            ) ??
            productListContainer?.querySelector(
              `button.add-to-cart-btn[data-product-id="${productId}"][data-option-name="${escapeAttribute(
                optionName
              )}"]`
            );
          if (currentButton) {
            const iconClass = currentButton.classList.contains("primary-add")
              ? "fa-cart-plus"
              : "fa-plus";
            const buttonText = currentButton.classList.contains("primary-add")
              ? "Tambah"
              : "Tambah";
            currentButton.innerHTML = `<i class="fas ${iconClass}"></i> ${buttonText}`;
            currentButton.disabled = false;
          }
        }, 1800);
      } else {
        console.warn("Add button missing data:", addButton.dataset);
        showToast("Gagal menambah item.", "error");
      }
    } else if (productItem && productItem.dataset.hasOptions === "true") {
      const isAddButton = event.target.closest(".add-to-cart-btn");
      const isCategoryHeader = event.target.closest(".category-header");
      if (!isAddButton && !isCategoryHeader) {
        toggleProductOptions(productItem);
        const parentSection = productItem.closest(".category-section");
        if (
          parentSection &&
          parentSection.classList.contains("category-active")
        ) {
          const parentGrid = parentSection.querySelector(".product-grid");
          if (parentGrid && parentGrid.style.maxHeight !== "0px") {
            parentGrid.style.maxHeight = "none";
          }
        }
      }
    }
  }

  function handleCheckoutFromCartClick() {
    if (cart.length > 0) {
      toggleCartPopup(false);
      toggleCheckoutModal(true);
    } else {
      showToast("Keranjang Anda kosong.", "info");
    }
  }

  async function handleCheckoutSubmit(event) {
    event.preventDefault();
    hideStatus(modalStatusMessageEl);
    let isValid = true;
    customerForm
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    customerForm.querySelectorAll("[required]").forEach((field) => {
      let fieldValid = false;
      const value = field.value.trim();
      if (field.type === "checkbox") fieldValid = field.checked;
      else if (field.type === "email")
        fieldValid = value !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      else if (field.type === "tel")
        fieldValid = /^\+?([0-9\s\-()]{8,17})$/.test(value);
      else fieldValid = value !== "";
      if (!fieldValid) {
        isValid = false;
        field.classList.add("input-error");
      }
    });

    if (!isValid) {
      showStatus(
        "Harap periksa data wajib (*) dan isi dengan benar.",
        "error",
        modalStatusMessageEl
      );
      const firstInvalid = customerForm.querySelector(".input-error, :invalid");
      firstInvalid?.focus();
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!SCRIPT_URL || SCRIPT_URL.includes("YOUR_")) {
      // Basic check
      showStatus(
        "Kesalahan Konfigurasi Sistem.",
        "error",
        modalStatusMessageEl
      );
      console.error("SCRIPT_URL is not configured correctly!");
      return;
    }

    const formData = new FormData(customerForm);
    const customerData = {
      name: formData.get("customerName").trim(),
      email: formData.get("customerEmail").trim().toLowerCase(),
      phone: formData.get("customerPhone").trim(),
    };
    const cartItemsString = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.productName} - Opsi: ${
            item.optionName
          } (${formatPrice(item.price)})`
      )
      .join(";\n");
    const totalOrderPrice = cart.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );
    const payload = {
      timestamp: new Date().toISOString(),
      ...customerData,
      cartItems: cartItemsString,
      totalPrice: formatPrice(totalOrderPrice),
    };

    checkoutSubmitBtn.disabled = true;
    checkoutSubmitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    showStatus("Mengirim pesanan Anda...", "loading", modalStatusMessageEl);

    try {
      console.log("Sending payload to:", SCRIPT_URL);
      console.log("Payload:", JSON.stringify(payload, null, 2));

      // Fetch with CORS mode (default)
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "cors", // Explicitly cors, DO NOT use no-cors
        cache: "no-cache",
        redirect: "follow",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response Status:", response.status);
      console.log("Response OK:", response.ok);

      // Check if response is OK (status in 200-299 range)
      if (!response.ok) {
        // Try to get error details from response body
        let errorMsg = `Server Error: ${response.status}`;
        try {
          const errData = await response.json(); // Try parsing as JSON first
          errorMsg =
            errData.message ||
            errData.error?.message ||
            errData.result ||
            errorMsg;
        } catch (parseError) {
          // If not JSON, try getting text
          try {
            const errText = await response.text();
            if (errText && errText.length < 200) {
              // Avoid huge HTML error pages
              errorMsg += `. ${errText}`;
            }
          } catch (textError) {
            /* Ignore if cannot read text */
          }
        }
        throw new Error(errorMsg);
      }

      // If response is OK, process the JSON result
      const result = await response.json();
      console.log("Response JSON:", result);

      if (result.status === "success") {
        showStatus(
          result.message || "Pesanan terkirim! Terima kasih.",
          "success",
          modalStatusMessageEl
        );
        showToast("Pesanan Anda berhasil dikirim!", "success");
        cart = [];
        renderCartItems();
        updateCartCountBadge();
        updateCartTotal();
        customerForm.reset();
        customerForm
          .querySelectorAll(".input-error")
          .forEach((el) => el.classList.remove("input-error"));
        setTimeout(() => toggleCheckoutModal(false), 3000);
      } else {
        // If status is not success, treat as error
        throw new Error(result.message || `Gagal memproses pesanan.`);
      }
    } catch (error) {
      console.error("Checkout Submit Error:", error);
      let userMessage = "Gagal mengirim pesanan. ";
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        userMessage += "Periksa koneksi internet Anda.";
      } else {
        // Use the error message directly if it's informative (like from the 'throw new Error' above)
        userMessage += escapeHTML(error.message);
      }
      showStatus(userMessage, "error", modalStatusMessageEl);
    } finally {
      checkoutSubmitBtn.disabled = false;
      checkoutSubmitBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> Kirim Pesanan';
    }
  }

  // --- Helper Functions ---
  function escapeHTML(str) {
    if (typeof str !== "string")
      return str === null || typeof str === "undefined" ? "" : String(str);
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
  function escapeAttribute(str) {
    if (typeof str !== "string") return "";
    // Replace double quotes with the HTML entity &quot;
    return str.replace(/"/g, "&quot;");
  }
  function hideStatus(targetElement = modalStatusMessageEl) {
    if (targetElement) {
      targetElement.style.display = "none";
      targetElement.textContent = "";
      targetElement.className = "status-message";
      targetElement.removeAttribute("role");
    }
  }
  function showStatus(
    message,
    type = "info",
    targetElement = modalStatusMessageEl
  ) {
    if (targetElement) {
      targetElement.innerHTML = message;
      targetElement.className = `status-message ${type}`;
      targetElement.style.display = "block";
      targetElement.setAttribute("role", "alert");
      targetElement.setAttribute(
        "aria-live",
        type === "error" ? "assertive" : "polite"
      );
    }
  }

  // --- Initial Page Load Setup ---
  function initializePage() {
    setCurrentYear();
    try {
      renderProducts();
    } catch (renderError) {
      console.error("FATAL: Initial Product Render Error:", renderError);
      if (productListContainer)
        productListContainer.innerHTML =
          '<p class="cart-empty error-msg">Error loading products.</p>';
    }
    renderCartItems();
    updateCartCountBadge();
    setupEventListeners();
    setupSlider();
    setTimeout(() => {
      const firstCategoryButton = productListContainer?.querySelector(
        ".category-section:first-child .category-toggle-btn"
      );
      if (firstCategoryButton) {
        firstCategoryButton.click();
      } else {
        console.warn("Could not find first category button.");
      }
    }, 100);
  }

  initializePage();
}); // End DOMContentLoaded Wrapper

// --- END OF FILE cart.js ---
