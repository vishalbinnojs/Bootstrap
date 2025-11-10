
const topBar = document.querySelector('.top-bar');
const navbar = document.querySelector('.navbar-custom');
const hoverBox = document.querySelector('.hover-box');
const mybutton = document.querySelector("#btn-back-to-top");


let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Navbar scroll behavior
  if (currentScroll > lastScroll && currentScroll > 10) {
    topBar.classList.add('hide');
  } else {
    topBar.classList.remove('hide');
  }

  if (currentScroll > 10) {
    navbar.classList.add('scrolled');
    hoverBox.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
    hoverBox.classList.remove('scrolled');
  }

  lastScroll = currentScroll;

  // Scroll to Top button behavior
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
});

// Smooth Scroll to Top
mybutton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
