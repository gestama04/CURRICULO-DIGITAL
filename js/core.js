/* =====================================================
   BERNARDO SILVA PORTFOLIO - CORE.JS
   Global interactions shared by every page
===================================================== */

"use strict";

(() => {
  const root = document.documentElement;
  const themeStorageKey = "portfolio-theme";
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const darkThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredTheme() {
    const storedTheme = localStorage.getItem(themeStorageKey);
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : null;
  }

  function getPreferredTheme() {
    return getStoredTheme() ?? (darkThemeQuery.matches ? "dark" : "light");
  }

  function updateThemeControls(theme) {
    const isDark = theme === "dark";

    document.querySelectorAll("[data-theme-toggle], #themeToggle").forEach((button) => {
      const icon = button.querySelector("i");

      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
      button.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );

      if (icon) {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        icon.setAttribute("aria-hidden", "true");
      }
    });
  }

  function applyTheme(theme, persist = false) {
    root.setAttribute("data-bs-theme", theme);
    updateThemeControls(theme);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute("content", theme === "dark" ? "#061429" : "#07182f");
    }

    if (persist) {
      localStorage.setItem(themeStorageKey, theme);
    }
  }

  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("readingProgressBar");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");
    const navigation = document.getElementById("navbarNav");

    document.querySelectorAll("[data-theme-toggle], #themeToggle").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme =
          root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
      });
    });

    function updateScrollInterface() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const percentage = Math.min(100, Math.max(0, progress * 100));

      if (progressBar) {
        progressBar.style.width = `${percentage}%`;
      }

      backToTop?.classList.toggle("visible", window.scrollY > 500);
    }

    let scrollFrame = null;

    function requestScrollUpdate() {
      if (scrollFrame !== null) return;

      scrollFrame = window.requestAnimationFrame(() => {
        updateScrollInterface();
        scrollFrame = null;
      });
    }

    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate, { passive: true });
    updateScrollInterface();

    backToTop?.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
      });
    });

    if (currentYear) {
      currentYear.textContent = String(new Date().getFullYear());
    }

    document.querySelectorAll("#navbarNav .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (!navigation?.classList.contains("show")) return;
        if (typeof bootstrap === "undefined") return;

        bootstrap.Collapse.getOrCreateInstance(navigation).hide();
      });
    });

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const relations = new Set((link.getAttribute("rel") ?? "").split(/\s+/).filter(Boolean));
      relations.add("noopener");
      relations.add("noreferrer");
      link.setAttribute("rel", [...relations].join(" "));
    });
  });

  darkThemeQuery.addEventListener?.("change", (event) => {
    if (getStoredTheme() !== null) return;
    applyTheme(event.matches ? "dark" : "light");
  });
})();
