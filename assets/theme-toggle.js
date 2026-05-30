(function () {
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  var root = document.documentElement;

  function syncAria() {
    var isLight = root.getAttribute("data-theme") === "light";
    toggle.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
    toggle.setAttribute("aria-pressed", String(isLight));
  }
  syncAria();

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
