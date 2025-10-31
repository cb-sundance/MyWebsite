"use strict";

/*
  script.js
  - Form validation & submit simulation
  - Small UI helpers (timer, date, theme toggle)
  - Defensive: checks for element existence to avoid runtime errors
*/

document.addEventListener("DOMContentLoaded", function () {

  // Utility: safe getEl
  const $ = id => document.getElementById(id);

  // Output examples (only if elements exist)
  if ($("output")) {
    $("output").textContent = "JavaScript loaded — interactive features active.";
  }

  if ($("date")) {
    const now = new Date();
    $("date").textContent = "Today's Date: " + now.toDateString();
  }

  // Alert function (connected to button)
  function showAlert() {
    // use confirm-style UI for clarity in demos
    if (confirm("This is a demo alert box. Proceed?")) {
      console.log("User confirmed demo alert.");
    } else {
      console.log("User dismissed demo alert.");
    }
  }

  if ($("showAlertBtn")) {
    $("showAlertBtn").addEventListener("click", showAlert);
  }

  // Timer
  function startTimer(durationSeconds = 5) {
    if (!$("timer")) return;
    let count = durationSeconds;
    $("timer").textContent = `Timer: ${count}`;
    const timer = setInterval(function () {
      count--;
      if (count >= 0) {
        $("timer").textContent = `Timer: ${count}`;
      }
      if (count < 0) {
        clearInterval(timer);
        $("timer").textContent = "Time's up!";
      }
    }, 1000);
  }

  if ($("startTimerBtn")) {
    $("startTimerBtn").addEventListener("click", function () { startTimer(5); });
  }

  // Theme toggle (light/dark) - also respects prefers-color-scheme
  const themeToggle = $("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.documentElement.classList.toggle("site-dark");
      // toggle a data attribute or store preference if desired
      const isDark = document.documentElement.classList.contains("site-dark");
      themeToggle.textContent = isDark ? "☀️" : "🌗";
    });
  }

  /* ---------- Contact form validation + simulated submit ---------- */
  const form = $("contactForm");
  const formStatus = $("formStatus");

  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();

      // Simple honeypot check (spam trap)
      const honeypot = form.querySelector("input[name='fax']");
      if (honeypot && honeypot.value) {
        // detected as bot/spam — silently drop
        formStatus.textContent = "Submission blocked.";
        formStatus.style.color = "crimson";
        return;
      }

      // Get fields
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");

      // Basic validation
      const errors = [];

      if (!name || name.value.trim().length < 2) {
        errors.push("Please enter your name (2+ characters).");
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.push("Please enter a valid email address.");
      }

      if (!message || message.value.trim().length < 10) {
        errors.push("Please enter a message (10+ characters).");
      }

      if (errors.length) {
        formStatus.innerHTML = errors.map(e => `<div>• ${e}</div>`).join("");
        formStatus.style.color = "crimson";
        return;
      }

      // Simulated sending (since GitHub Pages has no server). Provide user instructions.
      formStatus.textContent = "Sending message…";
      formStatus.style.color = "inherit";

      // Simulate async send (here we only demo client-side)
      setTimeout(function () {
        formStatus.innerHTML = "Message sent (simulation). For production, connect this form to a mail service or use GitHub Actions / Formspree / Netlify Forms.";
        formStatus.style.color = "green";
        form.reset();
      }, 900);
    });

    // Clear button
    const clearBtn = $("clearForm");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        form.reset();
        if (formStatus) {
          formStatus.textContent = "";
        }
      });
    }
  }

  /* ---------- Smooth scroll for in-page links (accessibility) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // focus for keyboard users
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Defensive console log for debugging in development
  console.log("script.js initialized");
});
