"use strict";

import { scrollIntoView } from "./utils.js";

// A JS tool tip that appears beside highlighted elements
class FloatingToolTip {
  constructor() {
    const tooltipElem = document.createElement("div");
    tooltipElem.classList.add("tutorialTooltip");
    const style = tooltipElem.style;
    document.body.appendChild(tooltipElem);

    this.tooltip = tooltipElem;
    this.tooltip.style.opacity = "0%";
  }

  show() {
    this.tooltip.style.opacity = "100%";
  }

  hide() {
    this.tooltip.style.opacity = "0%";
  }

  // Reposition the tooltip (put it on the side which has most space)
  move(domElement) {
    const rect = domElement.getBoundingClientRect();

    // Get the side with most space
    const directions = [
      { dir: "left", space: rect.left },
      { dir: "right", space: window.innerWidth - rect.right },
      { dir: "bottom", space: window.innerHeight - rect.height },
      { dir: "top", space: rect.top },
    ];
    const mostSpace = directions.reduce((prev, curr, index) => {
      if (prev.space < curr.space) {
        return curr;
      } else {
        return prev;
      }
    });

    const trect = this.tooltip.getBoundingClientRect();
    const width = trect.width;
    const height = trect.height;

    // Reposition tool tip according to space
    if (mostSpace.dir === "top") {
      this.tooltip.style.top =
        rect.top - height - 10 + window.pageYOffset + "px";
      this.tooltip.style.left = rect.left + window.pageXOffset + "px";
    }

    if (mostSpace.dir === "left") {
      this.tooltip.style.top = rect.top + window.pageYOffset + "px";
      this.tooltip.style.left =
        rect.left - width - 10 + window.pageXOffset + "px";
    }

    if (mostSpace.dir === "right") {
      this.tooltip.style.top = rect.top + window.pageYOffset + "px";
      this.tooltip.style.left = rect.right + 10 + window.pageXOffset + "px";
    }

    if (mostSpace.dir === "bottom") {
      this.tooltip.style.top = rect.bottom + window.pageYOffset + 10 + "px";
      this.tooltip.style.left = rect.left + window.pageXOffset + "px";
    }
  }

  // Disappears, reappearing at location w.r.t domElement after given duration
  performTransition(domElement, info, duration) {
    this.hide();
    setTimeout(() => {
      this.changeChildren(info);
      this.move(domElement);
      scrollIntoView(this.tooltip);
      this.show();
    }, duration);
  }

  // Update info
  changeChildren(newChild) {
    if (this.tooltip.lastChild) {
      this.tooltip.removeChild(this.tooltip.lastChild);
    }
    this.tooltip.appendChild(newChild);
  }

  // Remove from DOM
  remove() {
    this.tooltip.remove();
  }
}

export default FloatingToolTip;
