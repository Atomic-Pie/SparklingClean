// Constants (sticky header remains if you need it)
const STICKY_HEADER_HEIGHT = 60; // Adjust to match your sticky header's height
const SCROLL_THRESHOLD = 200; // Adjust as needed

// DOM Elements
const stickyHeader = document.querySelector('.sticky-header');
const body = document.body;

// Handle scroll events for sticky header visibility
window.addEventListener('scroll', () => {
  stickyHeader.classList.toggle('visible', window.scrollY > SCROLL_THRESHOLD);
});

// Toggle menu function
function toggleMenu() {
  const menu = document.querySelector('.offcanvas-menu');
  menu.classList.toggle('active');
  body.classList.toggle('menu-open');
}

// Toggle off-canvas menu on burger menu click
document.querySelectorAll('.burger-menu').forEach((menu) => {
  menu.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
});

// Close off-canvas menu when clicking the X (close) button
document.querySelector('.offcanvas-close').addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

// Close off-canvas menu when clicking outside of it
document.addEventListener('click', (e) => {
  if (!e.target.closest('.offcanvas-menu') && !e.target.closest('.burger-menu')) {
    body.classList.remove('menu-open');
    document.querySelector('.offcanvas-menu').classList.remove('active');
  }
});

// "Why Choose Us" dropdown toggles
document.querySelectorAll('.why-choose-us-card-top .dropdown-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle.closest('.why-choose-us-card').classList.toggle('open');
  });
});