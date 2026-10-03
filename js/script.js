const body = document.body;
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const nav = document.querySelector(".navbar");
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const backToTop = document.querySelector("#back-to-top");
const brandLinks = document.querySelectorAll(".brand[href='#top']");

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
};

const savedTheme = localStorage.getItem("crumb-theme");
if (savedTheme === "light") body.classList.add("light");
const updateThemeButton = () => {
  const isLight = body.classList.contains("light");
  themeIcon.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  document.querySelector('meta[name="theme-color"]').content = isLight ? "#fbf6ef" : "#181512";
};
updateThemeButton();
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("crumb-theme", body.classList.contains("light") ? "light" : "dark");
  updateThemeButton();
});

window.addEventListener("pointermove", (event) => {
  body.style.setProperty("--mouse-x", `${event.clientX}px`);
  body.style.setProperty("--mouse-y", `${event.clientY}px`);
}, { passive: true });

const updateScrollUI = () => {
  nav.classList.toggle("scrolled", window.scrollY > 12);
  backToTop.classList.toggle("is-visible", window.scrollY > 400);
};
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();
backToTop.addEventListener("click", scrollToTop);
brandLinks.forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToTop();
}));
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.textContent = "☰";
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email");
  document.querySelector("#form-message").textContent = "Thanks for stopping by! Connect this form to your newsletter service to collect sign-ups.";
  email.value = "";
});
document.querySelector("#year").textContent = new Date().getFullYear();
