/* ============ VEWO interactions ============ */
(function () {
  "use strict";

  /* ---- Nav: scrolled state + mobile toggle ---- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive: true });

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll("#navMobile a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Framework layer data + interactive detail ---- */
  var LAYERS = [
    {
      title: "Content Authority",
      means: "The expert, operator-led content AI systems trust as a primary source.",
      matters: "AI surfaces brands that demonstrate first-hand experience and original insight. Generic content is filtered out.",
      compounds: "Every authoritative piece becomes a citation surface that strengthens future recommendations across every AI system.",
      tags: ["Operator-level expertise", "Original research and POV", "First-hand product experience", "Non-commodity perspective"]
    },
    {
      title: "Entity Optimization",
      means: "A resolvable, trustworthy brand entity AI systems can confidently identify and reason about.",
      matters: "If AI cannot resolve who you are, it cannot recommend you. Entity clarity is the precondition for visibility.",
      compounds: "A well-structured entity gets reinforced by every new mention, making your brand progressively easier for AI to surface.",
      tags: ["Knowledge graph presence", "Consistent identity signals", "Disambiguation", "Cross-source corroboration"]
    },
    {
      title: "Structured Data Infrastructure",
      means: "Foundational data hygiene that lets machines and agents understand your products and offerings.",
      matters: "Structured data is not a strategy — it is the readable foundation AI and agentic systems depend on to act.",
      compounds: "Clean structured data makes every other layer more effective and prepares you for agentic commerce.",
      tags: ["Schema hygiene", "Product & offering data", "Machine readability", "Agent-ready foundation"]
    },
    {
      title: "Ecosystem Reinforcement",
      means: "Authority and citation signals spread across the open web sources AI cross-checks to triangulate trust.",
      matters: "AI does not trust a single source. It triangulates across the ecosystem before it recommends a brand.",
      compounds: "Citation diversity accumulates, widening your semantic footprint and hardening your visibility over time.",
      tags: ["Citation diversity", "Authoritative sources", "Open-web presence", "Trust triangulation"]
    },
    {
      title: "Competitive Intelligence",
      means: "Continuous tracking of where competitors appear in AI results — and where you don't.",
      matters: "Visibility is relative. Knowing the gaps tells you exactly what closes the distance to category leadership.",
      compounds: "Each cycle sharpens your positioning, turning competitor visibility into a roadmap you systematically close.",
      tags: ["Share of model voice", "Visibility gap analysis", "Comparison conversations", "Category positioning"]
    },
    {
      title: "Brand Brain Learning System",
      means: "The proprietary intelligence layer that learns your category, customers, and the AI surface itself.",
      matters: "Static documentation goes stale. A learning system stays in front of shifting model behavior.",
      compounds: "It gets sharper every cycle, compounding into a defensible moat competitors cannot reproduce.",
      tags: ["Continuously evolving", "Category & customer learning", "Model-behavior aware", "Compounding moat"]
    }
  ];

  var detail = document.getElementById("layerDetail");
  var layerBtns = document.querySelectorAll(".layer");

  function renderLayer(i) {
    var d = LAYERS[i];
    if (!detail || !d) return;
    detail.innerHTML =
      '<h3>' + d.title + '</h3>' +
      '<div class="ld-grid">' +
        '<div><h4>What it means</h4><p>' + d.means + '</p></div>' +
        '<div><h4>Why it matters</h4><p>' + d.matters + '</p></div>' +
        '<div><h4>How it compounds</h4><p>' + d.compounds + '</p></div>' +
      '</div>' +
      '<div class="ld-tags">' + d.tags.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div>';
  }

  layerBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      layerBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      renderLayer(parseInt(btn.getAttribute("data-layer"), 10));
    });
  });
  renderLayer(0);

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
    // Failsafe: never leave content hidden. Reveal anything still unanimated after 2s.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }, 2000);
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- FAQ: single-open accordion ---- */
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) { if (other !== item) other.open = false; });
      }
    });
  });

  /* ---- Conditional "other platform" field ---- */
  var platformSelect = document.getElementById("platform");
  var platformOtherField = document.getElementById("platformOtherField");
  if (platformSelect && platformOtherField) {
    platformSelect.addEventListener("change", function () {
      var show = platformSelect.value === "Something custom / other";
      platformOtherField.classList.toggle("field--hidden", !show);
      if (show) { platformOtherField.querySelector("input").focus(); }
    });
  }

  /* ---- Audit form (submits to Web3Forms) ---- */
  var form = document.getElementById("auditForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var valid = name && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
      if (!valid) {
        note.textContent = "Please enter your name and a valid email.";
        note.className = "form-note err";
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      note.textContent = "Sending your request…";
      note.className = "form-note";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            note.textContent = "Thanks, " + name + " — your visibility audit request has been received. We'll be in touch at " + email + ".";
            note.className = "form-note ok";
            form.reset();
          } else {
            note.textContent = "Something went wrong. Please email hello@vewo.ai directly.";
            note.className = "form-note err";
          }
        })
        .catch(function () {
          note.textContent = "Network error. Please email hello@vewo.ai directly.";
          note.className = "form-note err";
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        });
    });
  }

  /* ---- Footer year (keep static 2026 per source, but guard) ---- */
})();
