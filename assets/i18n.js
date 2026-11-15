(function () {
  var html = document.documentElement;

  // El idioma inactivo se saca del DOM (no solo se oculta con CSS): así los
  // buscadores y lectores de pantalla ven una sola versión de cada texto.
  // Cada nodo retirado deja un comentario marcador para poder restaurarlo.
  var detached = [];

  function swapDom(lang) {
    detached.forEach(function (r) {
      if (r.marker.parentNode) r.marker.parentNode.replaceChild(r.el, r.marker);
    });
    detached = [];
    var off = lang === "en" ? ".lang-es" : ".lang-en";
    document.querySelectorAll(off).forEach(function (el) {
      if (!el.parentNode) return;
      var marker = document.createComment("i18n");
      el.parentNode.replaceChild(marker, el);
      detached.push({ el: el, marker: marker });
    });
  }

  function applyLang(lang) {
    html.dataset.lang = lang;
    html.setAttribute("lang", lang);
    try { localStorage.setItem("lang", lang); } catch (e) {}
    swapDom(lang);
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
