"use strict";

import defaultControlsFactory from "./defaultControlsFactory.js";
import { scrollIntoView, transitionElementTo } from "./utils.js";

// A basic tutorial that uses a menu for navigation

class BasicTutorial {
  constructor(elements, outlineColor, defaultControls) {
    this.outlineColor = outlineColor;
    this.elements = elements;

    this.elements.sort((a, b) => {
      return a.position - b.position;
    });

    this.currIndex = 0;
    this.isRunning = false;
    this.defaultControls = defaultControls;

    this.startTutorial = this.startTutorial.bind(this);
    this.skip = this.skip.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  // Start the tutorial
  startTutorial() {
    if (this.elements.length <= 0) {
      return -1;
    }
    this.skip();

    if (this.defaultControls) {
      this.menu = defaultControlsFactory(this.previous, this.next, this.skip);
    } else {
      this.menu = null;
    }

    this.currIndex = 0;
    this.isRunning = true;

    this.highlightDiv = document.createElement("div");
    this.highlightDiv.id = "highlightedElement";

    const domElement = this.elements[this.currIndex].domElement;
    scrollIntoView(domElement);
    transitionElementTo(this.highlightDiv, domElement);

    //If callback is specified, call it
    if (this.elements[this.currIndex].callback) {
      setTimeout(this.elements[this.currIndex].callback, 400);
    }

    updateMenu(this);

    this.highlightDiv.style.position = "absolute";
    this.highlightDiv.style.transition = "all 0.5s ease-in-out";
    this.highlightDiv.style.border = "2px solid " + this.outlineColor;
    this.highlightDiv.style.boxShadow = "0 0 5px " + this.outlineColor;

    document.body.appendChild(this.highlightDiv);
  }

  // End the tutorial altogether
  skip() {
    this.isRunning = false;
    if (this.menu != null) {
      this.menu.remove();
      this.menu = null;
    }
    if (this.highlightDiv != null) {
      this.highlightDiv.remove();
      this.highlightDiv = null;
    }
  }

  // Go back to the previous step
  previous() {
    if (this.currIndex === 0) {
      return;
    }

    this.currIndex--;

    const domElement = this.elements[this.currIndex].domElement;
    scrollIntoView(domElement);
    transitionElementTo(this.highlightDiv, domElement);

    updateMenu(this);
  }

  // Go to the next step
  next() {
    if (this.currIndex === this.elements.length - 1) {
      this.skip();
      return;
    }

    this.currIndex++;

    const domElement = this.elements[this.currIndex].domElement;
    scrollIntoView(domElement);
    transitionElementTo(this.highlightDiv, domElement);
    if (this.elements[this.currIndex].callback) {
      setTimeout(this.elements[this.currIndex].callback, 400);
    }
    updateMenu(this);
  }
}

// Updates the information in the tutorial menu (only if default menu is being used)

function updateMenu(basicTutorial) {
  if (!basicTutorial.menu) {
    return;
  }

  const body = document.getElementById("tutorialControlsBody");
  if (body.lastChild) {
    body.removeChild(body.lastChild);
  }

  body.appendChild(basicTutorial.elements[basicTutorial.currIndex].info);
}

export default BasicTutorial;
