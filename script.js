// Select the navigation links element (assumed to be common for both headers)
const navLinks = document.querySelector(".nav-links");

// Attach the toggle to all elements with the class "burger-menu"
document.querySelectorAll(".burger-menu").forEach(function(menu) {
  menu.addEventListener("click", function() {
    navLinks.classList.toggle("active");
  });
});

// Show/hide sticky header when scrolling
window.addEventListener('scroll', function() {
  const stickyHeader = document.querySelector('.sticky-header');
  // Adjust threshold (e.g., 200px) as needed
  if (window.scrollY > 200) {
    stickyHeader.classList.add('visible');
  } else {
    stickyHeader.classList.remove('visible');
  }
});

// New code: Toggle dropdown for "Why choose us" cards
document.querySelectorAll('.why-choose-us-card-top .dropdown-toggle').forEach(function(toggle) {
  toggle.addEventListener('click', function(e) {
    // Prevent any event bubbling if necessary
    e.stopPropagation();
    
    // Find the closest card element and toggle its "open" state
    const card = toggle.closest('.why-choose-us-card');
    card.classList.toggle('open');
  });
});