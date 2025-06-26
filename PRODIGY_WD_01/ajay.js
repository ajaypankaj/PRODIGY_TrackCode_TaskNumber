const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY;

  navLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop + 100 &&
      section.offsetTop + section.offsetHeight > fromTop + 100
    ) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});
