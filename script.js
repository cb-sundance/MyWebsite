"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);

  /* STATUS WIDGETS */
  if ($("output")) $("output").textContent = "JavaScript active ✅";
  if ($("date")) $("date").textContent = "Today's Date: " + new Date().toDateString();

  /* ALERT DEMO */
  const showAlertBtn = $("showAlertBtn");
  if (showAlertBtn) {
    showAlertBtn.addEventListener("click", () =>
      confirm("This is a demo alert box.") ? console.log("Confirmed") : console.log("Canceled")
    );
  }

  /* TIMER DEMO */
  const startTimerBtn = $("startTimerBtn");
  if (startTimerBtn) {
    startTimerBtn.addEventListener("click", () => {
      let seconds = 5;
      $("timer").textContent = `Timer: ${seconds}`;
      const interval = setInterval(() => {
        $("timer").textContent = seconds > 0 ? `Timer: ${--seconds}` : "Time's up!";
        if (seconds < 0) clearInterval(interval);
      }, 1000);
    });
  }

  /* DARK MODE — persistent */
  const themeToggle = $("themeToggle");
  if (themeToggle) {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") document.documentElement.classList.add("site-dark");

    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("site-dark");
      localStorage.setItem("theme",
        document.documentElement.classList.contains("site-dark") ? "dark" : "light"
      );
      themeToggle.textContent = document.documentElement.classList.contains("site-dark") ? "☀️" : "🌗";
    });
  }

  /* CONTACT FORM */
  const form = $("contactForm");
  const formStatus = $("formStatus");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("name");
      const email = $("email");
      const message = $("message");
      const errors = [];

      if (name.value.trim().length < 2) errors.push("Name must be at least 2 characters.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) errors.push("Enter a valid email.");
      if (message.value.trim().length < 10) errors.push("Message must be 10+ characters.");

      if (errors.length > 0) {
        formStatus.innerHTML = errors.map(e => `<div>• ${e}</div>`).join("");
        formStatus.style.color = "crimson";
        return;
      }

      formStatus.textContent = "Sending…";
      setTimeout(() => {
        formStatus.textContent = "Message sent (simulated — GitHub Pages has no backend).";
        formStatus.style.color = "green";
        form.reset();
      }, 800);
    });

    $("clearForm").addEventListener("click", () => {
      form.reset();
      formStatus.textContent = "";
    });
  }

  /* SMOOTH SCROLL + FOCUS */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        target.setAttribute("tabindex", "-1");
        target.focus();
      }
    });
  });

  /* QR MODAL */
  const qrModal = $("qrModal");
  const qrImage = $("qrImage");
  const qrLabel = $("qrLabel");
  const qrLink = $("qrLink");
  const openQrBtn = $("openQrBtn");
  const closeQrBtn = $("closeQr");

  if (openQrBtn && qrModal) {
    openQrBtn.addEventListener("click", () => {
      const url = openQrBtn.dataset.qrUrl;
      qrImage.src = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(url)}`;
      qrLabel.textContent = url;
      qrLink.href = url;
      qrModal.setAttribute("aria-hidden", "false");
      closeQrBtn.focus();
    });

    closeQrBtn.addEventListener("click", () => qrModal.setAttribute("aria-hidden", "true"));
    qrModal.addEventListener("click", (e) => e.target === qrModal && qrModal.setAttribute("aria-hidden", "true"));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") qrModal.setAttribute("aria-hidden", "true");
    });
  }
});
