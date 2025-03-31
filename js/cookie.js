/* Cookie Management Script */
document.addEventListener("DOMContentLoaded", () => {
  const CookieManager = {
    // Cookie management utilities
    setCookie: function (name, value, days = 365) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}; ${expires}; path=/; SameSite=Strict; Secure`;
    },

    getCookie: function (name) {
      const cookieName = `${name}=`;
      const cookies = document.cookie.split(";");

      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(cookieName)) {
          return decodeURIComponent(cookie.substring(cookieName.length));
        }
      }
      return null;
    },

    deleteCookie: function (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;
    },

    // Cookie notification logic
    init: function () {
      const cookieNotice = document.querySelector(".cookie-notification");
      if (!cookieNotice) return;

      // Check if cookies have been previously accepted
      const cookiesAccepted = this.getCookie("cookiesAccepted");
      if (cookiesAccepted === "true") {
        cookieNotice.remove();
        return;
      }

      // Accept All Cookies
      const acceptBtn = cookieNotice.querySelector(".cookie-accept-btn");
      if (acceptBtn) {
        acceptBtn.addEventListener("click", () => {
          this.acceptAllCookies(cookieNotice);
        });
      }

      // Cookie Settings
      const settingsBtn = cookieNotice.querySelector(".cookie-settings-btn");
      if (settingsBtn) {
        settingsBtn.addEventListener("click", () => {
          this.openCookieSettings(cookieNotice);
        });
      }
    },

    acceptAllCookies: function (cookieNotice) {
      // Set comprehensive cookie preferences
      this.setCookie(
        "cookiePreferences",
        JSON.stringify({
          essential: true,
          analytics: true,
          marketing: true,
        })
      );

      // Mark as cookies accepted
      this.setCookie("cookiesAccepted", "true");

      // Animate and remove notice
      cookieNotice.style.animation = "cookieFadeOut 0.3s forwards";
      setTimeout(() => cookieNotice.remove(), 300);
    },

    openCookieSettings: function (cookieNotice) {
      // Create settings panel
      const settingsPanel = document.createElement("div");
      settingsPanel.className = "cookie-settings-panel";
      settingsPanel.innerHTML = `
                <div class="settings-content">
                    <h3>Cookie Preferences</h3>
                    <div class="settings-close">×</div>
                    <p>Select cookies to allow:</p>
                    <label>
                        <input type="checkbox" checked disabled>
                        Essential Cookies
                    </label>
                    <label>
                        <input type="checkbox" name="analytics">
                        Analytics Cookies
                    </label>
                    <label>
                        <input type="checkbox" name="marketing">
                        Marketing Cookies
                    </label>
                    <button class="save-settings-btn">Save Preferences</button>
                </div>
            `;

      // Close button functionality
      const closeBtn = settingsPanel.querySelector(".settings-close");
      closeBtn.addEventListener("click", () => {
        settingsPanel.remove();
      });

      // Save preferences
      const saveBtn = settingsPanel.querySelector(".save-settings-btn");
      saveBtn.addEventListener("click", () => {
        const analyticsChecked = settingsPanel.querySelector(
          'input[name="analytics"]'
        ).checked;
        const marketingChecked = settingsPanel.querySelector(
          'input[name="marketing"]'
        ).checked;

        // Save preferences
        this.setCookie(
          "cookiePreferences",
          JSON.stringify({
            essential: true,
            analytics: analyticsChecked,
            marketing: marketingChecked,
          })
        );

        // Mark as cookies accepted
        this.setCookie("cookiesAccepted", "true");

        // Remove settings and notice
        settingsPanel.remove();
        cookieNotice.style.animation = "cookieFadeOut 0.3s forwards";
        setTimeout(() => cookieNotice.remove(), 300);
      });

      // Append and animate settings panel
      cookieNotice.appendChild(settingsPanel);
      settingsPanel.style.animation = "slideIn 0.3s";
    },
  };

  // Initialize cookie management
  CookieManager.init();
});
