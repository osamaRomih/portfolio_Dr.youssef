// Configuration object
const defaultConfig = {
  doctor_name_en: "Dr. Youssef Saber Romih",
  doctor_name_ar: "د. يوسف صابر رميح",
  specialty_en: "Cardiologist & Catheterization Specialist",
  specialty_ar: "أخصائي أمراض القلب والقسطرة",
  clinic_phone: "+20 123 456 7890",
  clinic_email: "info@dryoussef.com",
  clinic_address_en: "123 Medical Center, Cairo, Egypt",
  clinic_address_ar: "123 المركز الطبي، القاهرة، مصر",
  background_color: "#ffffff",
  surface_color: "#f8fafc",
  text_color: "#1f2937",
  primary_action_color: "#2563eb",
  secondary_action_color: "#64748b",
  font_family: "Inter",
  font_size: 16,
};

// Language and theme management
let currentLang = "en";
let isDark = localStorage.getItem("theme") === "dark" || false;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeNavigation();
  initializeTheme();
  initializeLanguage();
  initializeForm();
  initializeReviewCarousel();

  // Initialize Element SDK if available
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        // Update doctor information
        const doctorNameEn = document.querySelectorAll(".doctor-name-en");
        const doctorNameAr = document.querySelectorAll(".doctor-name-ar");
        const specialtyEn = document.querySelectorAll(".specialty-en");
        const specialtyAr = document.querySelectorAll(".specialty-ar");

        doctorNameEn.forEach(
          (el) =>
            (el.textContent =
              config.doctor_name_en || defaultConfig.doctor_name_en)
        );
        doctorNameAr.forEach(
          (el) =>
            (el.textContent =
              config.doctor_name_ar || defaultConfig.doctor_name_ar)
        );
        specialtyEn.forEach(
          (el) =>
            (el.textContent = config.specialty_en || defaultConfig.specialty_en)
        );
        specialtyAr.forEach(
          (el) =>
            (el.textContent = config.specialty_ar || defaultConfig.specialty_ar)
        );

        // Update contact information
        const phoneElements = document.querySelectorAll(".clinic-phone");
        const emailElements = document.querySelectorAll(".clinic-email");
        const addressEnElements =
          document.querySelectorAll(".clinic-address-en");
        const addressArElements =
          document.querySelectorAll(".clinic-address-ar");

        phoneElements.forEach(
          (el) =>
            (el.textContent = config.clinic_phone || defaultConfig.clinic_phone)
        );
        emailElements.forEach(
          (el) =>
            (el.textContent = config.clinic_email || defaultConfig.clinic_email)
        );
        addressEnElements.forEach(
          (el) =>
            (el.textContent =
              config.clinic_address_en || defaultConfig.clinic_address_en)
        );
        addressArElements.forEach(
          (el) =>
            (el.textContent =
              config.clinic_address_ar || defaultConfig.clinic_address_ar)
        );

        // Apply colors
        const customFont = config.font_family || defaultConfig.font_family;
        const baseFontStack = "system-ui, -apple-system, sans-serif";
        const fontSize = config.font_size || defaultConfig.font_size;

        document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
        document.body.style.fontSize = `${fontSize}px`;
        document.documentElement.style.setProperty(
          "--bg-color",
          config.background_color || defaultConfig.background_color
        );
        document.documentElement.style.setProperty(
          "--surface-color",
          config.surface_color || defaultConfig.surface_color
        );
        document.documentElement.style.setProperty(
          "--text-color",
          config.text_color || defaultConfig.text_color
        );
        document.documentElement.style.setProperty(
          "--primary-color",
          config.primary_action_color || defaultConfig.primary_action_color
        );
        document.documentElement.style.setProperty(
          "--secondary-color",
          config.secondary_action_color || defaultConfig.secondary_action_color
        );
      },
      mapToCapabilities: (config) => ({
        recolorables: [
          {
            get: () =>
              config.background_color || defaultConfig.background_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.setConfig({ background_color: value });
              }
            },
          },
          {
            get: () => config.surface_color || defaultConfig.surface_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.setConfig({ surface_color: value });
              }
            },
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.setConfig({ text_color: value });
              }
            },
          },
          {
            get: () =>
              config.primary_action_color || defaultConfig.primary_action_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.setConfig({ primary_action_color: value });
              }
            },
          },
          {
            get: () =>
              config.secondary_action_color ||
              defaultConfig.secondary_action_color,
            set: (value) => {
              if (window.elementSdk) {
                window.elementSdk.setConfig({ secondary_action_color: value });
              }
            },
          },
        ],
        borderables: [],
        fontEditable: {
          get: () => config.font_family || defaultConfig.font_family,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.setConfig({ font_family: value });
            }
          },
        },
        fontSizeable: {
          get: () => config.font_size || defaultConfig.font_size,
          set: (value) => {
            if (window.elementSdk) {
              window.elementSdk.setConfig({ font_size: value });
            }
          },
        },
      }),
      mapToEditPanelValues: (config) =>
        new Map([
          [
            "doctor_name_en",
            config.doctor_name_en || defaultConfig.doctor_name_en,
          ],
          [
            "doctor_name_ar",
            config.doctor_name_ar || defaultConfig.doctor_name_ar,
          ],
          ["specialty_en", config.specialty_en || defaultConfig.specialty_en],
          ["specialty_ar", config.specialty_ar || defaultConfig.specialty_ar],
          ["clinic_phone", config.clinic_phone || defaultConfig.clinic_phone],
          ["clinic_email", config.clinic_email || defaultConfig.clinic_email],
          [
            "clinic_address_en",
            config.clinic_address_en || defaultConfig.clinic_address_en,
          ],
          [
            "clinic_address_ar",
            config.clinic_address_ar || defaultConfig.clinic_address_ar,
          ],
        ]),
    });
  }
});

function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
}

function initializeNavigation() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-lg");
    } else {
      navbar.classList.remove("shadow-lg");
    }
  });
}

function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");

  // Apply saved theme on load
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateThemeIcons();

  themeToggle.addEventListener("click", () => {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcons();
  });
}

function updateThemeIcons() {
  const moonIcon = document.querySelector(".theme-icon-moon");
  const sunIcon = document.querySelector(".theme-icon-sun");

  if (isDark) {
    if (moonIcon) moonIcon.classList.add("hidden");
    if (sunIcon) sunIcon.classList.remove("hidden");
  } else {
    if (moonIcon) moonIcon.classList.remove("hidden");
    if (sunIcon) sunIcon.classList.add("hidden");
  }
}

// Reviews Carousel functionality
let currentReview = 0;
const totalReviews = 4;
let reviewInterval;

function showReview(index) {
  const slides = document.querySelectorAll(".review-slide");
  const indicators = document.querySelectorAll(".indicator");

  // Remove active classes
  slides.forEach((slide) => {
    slide.classList.remove("active", "prev");
  });
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  // Add prev class to current slide
  if (slides[currentReview]) {
    slides[currentReview].classList.add("prev");
  }

  // Update current review
  currentReview = index;

  // Add active classes
  if (slides[currentReview]) {
    slides[currentReview].classList.add("active");
  }
  if (indicators[currentReview]) {
    indicators[currentReview].classList.add("active");
  }
}

function nextReview() {
  const nextIndex = (currentReview + 1) % totalReviews;
  showReview(nextIndex);
}

function startReviewCarousel() {
  reviewInterval = setInterval(nextReview, 5000); // Change every 5 seconds
}

function stopReviewCarousel() {
  if (reviewInterval) {
    clearInterval(reviewInterval);
  }
}

function initializeReviewCarousel() {
  const indicators = document.querySelectorAll(".indicator");

  // Add click handlers to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      stopReviewCarousel();
      showReview(index);
      startReviewCarousel();
    });
  });

  // Start auto-rotation
  startReviewCarousel();

  // Pause on hover
  const carousel = document.querySelector(".reviews-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopReviewCarousel);
    carousel.addEventListener("mouseleave", startReviewCarousel);
  }
}

function initializeLanguage() {
  const langToggle = document.getElementById("langToggle");

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    updateLanguage();
    localStorage.setItem("language", currentLang);
  });

  // Load saved language
  const savedLang = localStorage.getItem("language");
  if (savedLang) {
    currentLang = savedLang;
    updateLanguage();
  }
}

function updateLanguage() {
  const html = document.documentElement;
  const body = document.body;

  if (currentLang === "ar") {
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
    body.classList.add("rtl");
    body.classList.remove("ltr");

    document.querySelectorAll(".lang-en").forEach((el) => {
      el.classList.add("hidden-lang");
    });
    document.querySelectorAll(".lang-ar").forEach((el) => {
      el.classList.remove("hidden-lang");
    });
  } else {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
    body.classList.add("ltr");
    body.classList.remove("rtl");

    document.querySelectorAll(".lang-ar").forEach((el) => {
      el.classList.add("hidden-lang");
    });
    document.querySelectorAll(".lang-en").forEach((el) => {
      el.classList.remove("hidden-lang");
    });
  }
}

function initializeForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const fullName = `${data.firstName || "-"} ${data.lastName || "-"}`;

    // 👇 هنا نضيف سكربت واتساب
    const phoneNumber = "+201000204565"; // ضع رقمك هنا بدون مسافات
    const message = `مرحبًا دكتور! 
الاسم: ${fullName}
البريد الإلكتروني: ${data.email || "-"}
الهاتف: ${data.phone || "-"}
الرسالة: ${data.message || "-"}
`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // فتح واتساب في نافذة جديدة
    window.open(whatsappUrl, "_blank");

    // تحديث حالة الزرار
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    button.innerHTML = currentLang === "ar" ? "جاري الإرسال..." : "Sending...";
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = currentLang === "ar" ? "تم الإرسال!" : "Message Sent!";
      button.classList.remove("bg-blue-600", "hover:bg-blue-700");
      button.classList.add("bg-green-600");

      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove("bg-green-600");
        button.classList.add("bg-blue-600", "hover:bg-blue-700");
        form.reset();
      }, 2000);
    }, 1000);
  });
}

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'997651c4d750e238',t:'MTc2MTk0NjkxNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();
