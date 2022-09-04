"use strict";

//Scroll into view of element if element is not in view

const scrollIntoView = (element) => {
  const rect = element.getBoundingClientRect();

  const isElementInView =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);

  if (!isElementInView) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

const scrollIntoViewOffset = (element, offset) => {
  const rect = element.getBoundingClientRect();

  const isElementInView =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);

  const isElementCovered =
    offset.top <= rect.bottom && rect.bottom <= offset.bottom;

  if (!isElementInView && !isElementCovered) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

// Moves and resized div to match domElement
const transitionElementTo = (highlightDiv, domElement) => {
  const rect = domElement.getBoundingClientRect();
  highlightDiv.style.height = rect.height + "px";
  highlightDiv.style.width = rect.width + "px";
  highlightDiv.style.left = window.pageXOffset + rect.left + "px";
  highlightDiv.style.top = window.pageYOffset + rect.top + "px";
};

export { scrollIntoView, scrollIntoViewOffset, transitionElementTo };
