const togglerButton = document.querySelector(".menu-button");
const sideNav = document.querySelector(".side-nav");
const closeMenu = document.querySelector(".bi-x");



togglerButton.addEventListener("click",()=>{
    sideNav.classList.toggle("show");
})

closeMenu.addEventListener("click",()=>{
    sideNav.classList.remove("show");
});


window.addEventListener("scroll", () => {
  const announcement = document.querySelector(".announcement-text");
  const navbar = document.querySelector(".nav-container");

  if (window.scrollY > 1) {
    announcement.classList.add("hide");
    navbar.classList.add("scrolled");
  } else {
    announcement.classList.remove("hide");
    navbar.classList.remove("scrolled");
  }
});


const scroller = document.querySelector(".product-scroller");
const track = document.querySelector(".scroll-track");

let position = 0;
let speed = 1;           // base scroll speed
let momentum = 0;        // drag momentum
let lastX = 0;
let isDown = false;
let startX = 0;
let paused = false;
let animationFrame;

// --- Auto-scroll loop ---
function animate() {
  if (!paused && !isDown) {
    position -= speed;
  } else if (momentum !== 0) {
    position += momentum;
    momentum *= 0.95; // gradual slowdown
    if (Math.abs(momentum) < 0.01) momentum = 0;
  }

  track.style.transform = `translateX(${position}px)`;

  // seamless loop
  if (Math.abs(position) >= track.scrollWidth / 2) {
    position = 0;
  }

  animationFrame = requestAnimationFrame(animate);
}

// start after 1s
setTimeout(() => {
  animationFrame = requestAnimationFrame(animate);
}, 1000);

// --- Dragging ---
scroller.addEventListener("mousedown", (e) => {
  isDown = true;
  paused = true;
  startX = e.pageX;
  lastX = startX;
  cancelAnimationFrame(animationFrame);
});

scroller.addEventListener("mouseup", (e) => {
  isDown = false;
  momentum = (e.pageX - lastX) * 0.2; // drag speed → momentum
  paused = false;
  animationFrame = requestAnimationFrame(animate);
});

scroller.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  const x = e.pageX;
  const walk = x - startX;
  position += walk;
  startX = x;
  lastX = x;
  track.style.transform = `translateX(${position}px)`;
});

scroller.addEventListener("mouseleave", () => {
  if (isDown) {
    isDown = false;
    momentum = (event.pageX - lastX) * 0.2;
    paused = false;
    animationFrame = requestAnimationFrame(animate);
  }
});

// --- Touch support ---
scroller.addEventListener("touchstart", (e) => {
  isDown = true;
  paused = true;
  startX = e.touches[0].clientX;
  lastX = startX;
  cancelAnimationFrame(animationFrame);
});

scroller.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].clientX;
  const walk = x - startX;
  position += walk;
  startX = x;
  lastX = x;
  track.style.transform = `translateX(${position}px)`;
});

scroller.addEventListener("touchend", (e) => {
  isDown = false;
  momentum = (e.changedTouches[0].clientX - lastX) * 0.2;
  paused = false;
  animationFrame = requestAnimationFrame(animate);
});

// --- Pause on hover ---
scroller.addEventListener("mouseenter", () => (paused = true));
scroller.addEventListener("mouseleave", () => (paused = false));

