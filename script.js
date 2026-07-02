
(function () {
  "use strict";

  const app = document.getElementById("app");
  const html = document.documentElement;


  const themeToggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("nebula-theme");
  if (stored) html.setAttribute("data-theme", stored);

  themeToggle.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("nebula-theme", next);
  });


  const menuToggle = document.getElementById("menuToggle");
  const overlay = document.getElementById("overlay");
  menuToggle.addEventListener("click", () => app.classList.toggle("nav-open"));
  overlay.addEventListener("click", () => app.classList.remove("nav-open"));

  
  document.querySelectorAll(".nav__item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".nav__item.is-active")?.classList.remove("is-active");
      item.classList.add("is-active");
      app.classList.remove("nav-open");
    });
  });

  document.querySelectorAll(".segmented").forEach((group) => {
    group.querySelectorAll(".segmented__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelector(".is-active")?.classList.remove("is-active");
        btn.classList.add("is-active");
        randomizeBars();
      });
    });
  });

  document.querySelectorAll("[data-spark]").forEach((el) => {
    const values = el.dataset.spark.split(",").map(Number);
    const max = Math.max(...values);
    el.innerHTML = values
      .map((v, i) => `<i style="--h:${(v / max) * 100}%;animation-delay:${i * 60}ms"></i>`)
      .join("");
  });

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function animateCount(el) {
    const target = Number(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const value = Math.floor(easeOut(p) * target);
      el.textContent = prefix + value.toLocaleString("pt-BR") + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));

  function randomizeBars() {
    document.querySelectorAll("#bars .bar").forEach((bar) => {
      const v = 40 + Math.round(Math.random() * 60);
      bar.style.setProperty("--v", v + "%");
      bar.classList.toggle("is-peak", v >= 95);
    });
  }

  const search = document.getElementById("tableSearch");
  const rows = Array.from(document.querySelectorAll("#ordersTable tbody tr"));
  search.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();
    rows.forEach((row) => {
      const match = row.textContent.toLowerCase().includes(term);
      row.classList.toggle("is-hidden", !match);
    });
  });
})();
