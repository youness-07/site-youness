document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll("#nav-links a");
  const navbar = document.getElementById("navbar");
  const contactForm = document.getElementById("contact-form");
  const formNotice = document.getElementById("form-notice");

  // Burger menu
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      const clickedInsideMenu = navLinks.contains(e.target);
      const clickedBurger = burger.contains(e.target);

      if (!clickedInsideMenu && !clickedBurger) {
        navLinks.classList.remove("active");
      }
    });
  }

  // Navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 10px 30px rgba(17, 17, 17, 0.06)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

  // Contact form front-end validation only
  if (contactForm && formNotice) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nom = document.getElementById("nom")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const sujet = document.getElementById("sujet")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!nom || !email || !sujet || !message) {
        formNotice.textContent = "Per favore, compila tutti i campi richiesti.";
        formNotice.style.color = "#c62828";
        return;
      }

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!emailValid) {
        formNotice.textContent = "Per favore, inserisci un indirizzo email valido.";
        formNotice.style.color = "#c62828";
        return;
      }

      formNotice.textContent =
        "Messaggio pronto. Per il momento puoi contattarmi direttamente via email o telefono.";
      formNotice.style.color = "#1f8f5f";

      contactForm.reset();
    });
  }
});
