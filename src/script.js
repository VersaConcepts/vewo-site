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

 /* ---- Audit form (submits to Web3Forms) ---- */
 var form = document.getElementById("auditForm");
 var note = document.getElementById("formNote");
 if (form) {
  form.addEventListener("submit", function (e) {
   e.preventDefault();
   var name = (form.elements["name"] ? form.elements["name"].value : "").trim();
   var email = (form.elements["email"] ? form.elements["email"].value : "").trim();
   var emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
   if (!name || !emailOk) {
    note.textContent = "Please enter your name and a valid email.";
    note.className = "form-note err";
    return;
   }
   var website = (form.elements["website"] ? form.elements["website"].value : "").trim();
   if (!/[a-z0-9-]+\.[a-z]{2,}/i.test(website)) {
    note.textContent = "Please enter your website, for example yourbrand.com.";
    note.className = "form-note err";
    if (form.elements["website"]) { form.elements["website"].focus(); }
    return;
   }
   var revenueEl = form.elements["revenue"];
   if (revenueEl && !revenueEl.value) {
    note.textContent = "Please select your annual revenue range.";
    note.className = "form-note err";
    revenueEl.focus();
    return;
   }

   // hCaptcha: the widget writes its token into this textarea once the check is done.
   var captcha = form.querySelector('textarea[name="h-captcha-response"]');
   if (captcha && !captcha.value) {
    note.textContent = "Please complete the human check above the button. If it won't load for you, email hello@vewo.ai instead.";
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
      note.textContent = "Thanks, " + name + ", your Visibility Report request has been received. We'll be in touch at " + email + ".";
      note.className = "form-note ok";
      if (window.fbq) { fbq("track", "Lead"); }
      // Also start their Brand Radar Intake as a Lead in VEWO (2026-10-05). Nothing is sent to them until we approve it.
      try {
       fetch("https://app.vewo.ai/api/report-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
         name: name,
         email: email,
         website: website,
         platform: form.elements["platform"] ? form.elements["platform"].value : "",
         revenue: form.elements["revenue"] ? form.elements["revenue"].value : "",
         botcheck: form.elements["botcheck"] ? form.elements["botcheck"].checked : false
        })
       }).then(function (res) {
        // The email above already reached us; a refused request is only logged for us to see in the console.
        if (!res.ok && window.console) { console.warn("VEWO intake not started (" + res.status + "); the request email still arrived."); }
       }).catch(function () { /* the email above already reached us */ });
      } catch (err) { /* older browsers: the email above already reached us */ }
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
     // A token works once; get a fresh check for the next attempt.
     if (window.hcaptcha && typeof window.hcaptcha.reset === "function") { try { window.hcaptcha.reset(); } catch (err) { /* widget not ready */ } }
    });
  });
 }

 /* ---- Radar waitlist form (n8n webhook -> Airtable, Web3Forms email backup) ---- */
 var rform = document.getElementById("radarForm");
 var rnote = document.getElementById("radarNote");
 var RADAR_WEBHOOK = "https://versaconcepts.app.n8n.cloud/webhook/Radar-Waitlist";
 if (rform) {
  rform.addEventListener("submit", function (e) {
   e.preventDefault();
   var first = rform.first_name.value.trim();
   var email = rform.email.value.trim();
   var valid = first && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
   if (!valid) {
    rnote.textContent = "Please enter your first name and a valid work email.";
    rnote.className = "form-note err";
    return;
   }
   var submitBtn = rform.querySelector('button[type="submit"]');
   var originalLabel = submitBtn ? submitBtn.textContent : "";
   if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting…"; }
   rnote.textContent = "Adding you to the waitlist…";
   rnote.className = "form-note";

   var fd = new FormData(rform);

   function done(ok) {
    if (ok) {
     rnote.textContent = "You're on the Radar waitlist. We'll keep you posted as early access becomes available.";
     rnote.className = "form-note ok";
     if (window.fbq) { fbq("track", "Lead"); }
     rform.reset();
    } else {
     rnote.textContent = "Network error. Please email hello@vewo.ai directly.";
     rnote.className = "form-note err";
    }
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
   }

   // Send to the n8n webhook, which writes the record to Airtable.
   // Fire-and-forget (no-cors); the response is opaque, so treat a dispatched
   // request as success and only surface an error on an actual network failure.
   fetch(RADAR_WEBHOOK, { method: "POST", mode: "no-cors", body: fd })
    .then(function () { done(true); })
    .catch(function () { done(false); });
  });
 }

 /* ---- Footer year (keep static 2026 per source, but guard) ---- */
})();
