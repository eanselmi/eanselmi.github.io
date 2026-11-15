(function () {
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  var root = document.documentElement;

  function syncAria() {
    var isLight = root.getAttribute("data-theme") === "light";
    var en = root.getAttribute("lang") === "en";
    toggle.setAttribute("aria-label", isLight
      ? (en ? "Switch to dark mode" : "Cambiar a modo oscuro")
      : (en ? "Switch to light mode" : "Cambiar a modo claro"));
    toggle.setAttribute("aria-pressed", String(isLight));
  }
  syncAria();
  document.addEventListener("langchange", syncAria);

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "dark") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "light");
    }
    try { localStorage.setItem("apprendiendo-theme", next); } catch (e) {}
    syncAria();
    if (typeof gtag !== "undefined") {
      gtag("event", "theme_toggle", { event_category: "UI", event_label: next });
    }
  });
})();
