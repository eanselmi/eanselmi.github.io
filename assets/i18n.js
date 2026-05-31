(function () {
  var html = document.documentElement;

  function applyLang(lang) {
    html.dataset.lang = lang;
    html.setAttribute("lang", lang);
    try { localStorage.setItem("lang", lang); } catch (e) {}
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.setAttribute("aria-label", lang === "en" ? "Cambiar a español" : "Switch to English");
    });
  }

  var saved = (function () { try { return localStorage.getItem("lang"); } catch (e) { return null; } })();
  applyLang(saved === "en" ? "en" : "es");

  document.addEventListener("click", function (e) {
    if (e.target.closest(".lang-toggle")) {
      var next = html.dataset.lang === "en" ? "es" : "en";
      applyLang(next);
      if (typeof gtag !== "undefined") {
        gtag("event", "lang_toggle", { event_category: "UI", event_label: next });
      }
    }
  });
})();
