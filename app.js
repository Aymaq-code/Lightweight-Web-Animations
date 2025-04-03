// ============================================
// ANIMATION ON SCROLL (AOS) IMPLEMENTATION
// ============================================

/**
 * Checks if an element is currently visible in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - True if element is in viewport, false otherwise
 */
function isInViewport(element) {
  // Get the position and size of the element
  const rect = element.getBoundingClientRect();

  // Check if element is within the viewport height
  const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;

  return isInView;
}

/**
 * Adds or removes the 'animate' class based on element visibility
 * @param {HTMLElement} element - The element to animate
 */
function toggleAnimation(element) {
  if (isInViewport(element)) {
    // Element is visible - add animation class
    element.classList.add("animate");
  } else {
    // Element is not visible - remove animation class
    element.classList.remove("animate");
  }
}

/**
 * Handles all animations on the page
 */
function handleScrollAnimations() {
  // Get all elements that should be animated
  const animatedElements = document.querySelectorAll(".content-item");

  // Check each element and toggle its animation
  animatedElements.forEach((element) => {
    toggleAnimation(element);
  });
}

// ============================================
// SCROLL EVENT HANDLING
// ============================================

// This variable helps prevent too many scroll events
let isScrolling = false;

/**
 * Handles the scroll event with performance optimization
 */
function onScroll() {
  // If we're already handling a scroll event, skip this one
  if (isScrolling) return;

  // Mark that we're handling a scroll event
  isScrolling = true;

  // Use requestAnimationFrame for smooth performance
  window.requestAnimationFrame(function () {
    // Update animations
    handleScrollAnimations();

    // Reset the scroll flag
    isScrolling = false;
  });
}

// ============================================
// INITIALIZATION
// ============================================

// Add scroll event listener
window.addEventListener("scroll", onScroll);

// Run once when page loads to check initial state
handleScrollAnimations();
