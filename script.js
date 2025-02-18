// Constants
const STICKY_HEADER_HEIGHT = 60; // Adjust to match your sticky header's height
const SCROLL_THRESHOLD = 200; // Adjust as needed

// DOM Elements
const stickyHeader = document.querySelector('.sticky-header');
const callUsSection = document.querySelector('.call-us');

// Toggle mobile menu position
function updateMobileMenuPosition() {
  const activeMenu = document.querySelector('.nav-links.active');
  if (!activeMenu) return;

  // Disable transitions for instant snapping
  activeMenu.style.transition = 'none';

  if (stickyHeader.classList.contains('visible')) {
    // Snap to sticky header
    activeMenu.style.top = `${STICKY_HEADER_HEIGHT}px`;
  } else {
    // Snap to below call-us section
    const callUsRect = callUsSection.getBoundingClientRect();
    activeMenu.style.top = `${callUsRect.bottom + window.scrollY}px`;
  }

  // Re-enable transitions after repositioning
  requestAnimationFrame(() => {
    activeMenu.style.transition = '';
  });
}

// Handle scroll events
window.addEventListener('scroll', () => {
  // Toggle sticky header visibility
  stickyHeader.classList.toggle('visible', window.scrollY > SCROLL_THRESHOLD);
  
  // Update menu position if open
  updateMobileMenuPosition();
});

// Handle burger menu clicks
document.querySelectorAll('.burger-menu').forEach((menu) => {
  menu.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Find the relevant nav-links (sticky or main header)
    const parentContainer = menu.closest('header, .sticky-container');
    const targetMenu = parentContainer.querySelector('.nav-links');

    // Close other menus
    document.querySelectorAll('.nav-links').forEach((nav) => {
      if (nav !== targetMenu) nav.classList.remove('active');
    });

    // Toggle the clicked menu
    targetMenu.classList.toggle('active');
    
    // Update position immediately
    updateMobileMenuPosition();
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-links, .burger-menu')) {
    document.querySelectorAll('.nav-links').forEach((nav) => {
      nav.classList.remove('active');
    });
  }
});

// "Why Choose Us" dropdown toggles
document.querySelectorAll('.why-choose-us-card-top .dropdown-toggle').forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle.closest('.why-choose-us-card').classList.toggle('open');
  });
});