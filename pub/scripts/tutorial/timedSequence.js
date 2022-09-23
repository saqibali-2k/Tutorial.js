"use strict";
import FloatingToolTip from "./floatingTooltip.js";
import { scrollIntoView, transitionElementTo } from "./utils.js";

class TimedSequence {
  constructor(elements, useTooltip, outlineColor) {
    this.elements = elements;
    this.outlineColor = outlineColor;
    this.useTooltip = useTooltip;

    // Sort elements by position in sequence
    this.elements.sort((a, b) => {
      return a.position - b.position;
    });

    this.startSequence = this.startSequence.bind(this);
    this.reset = this.reset.bind(this);
  }

  // Initiate sequence for some number of repititions
  startSequence(repititions) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (this.highlightDiv) {
      this.highlightDiv.remove();
    }

    if (this.useTooltip) {
      if (this.tooltip) {
        this.tooltip.remove();
      }
      this.tooltip = new FloatingToolTip();
    }

    this.highlightDiv = createHighlightDiv(this.outlineColor);
    this.currIndex = 0;
    sequenceTransition(this, repititions);
  }

  reset() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (this.highlightDiv) {
      this.highlightDiv.remove();
    }

    if (this.tooltip) {
      this.tooltip.remove();
    }
  }
}

function createHighlightDiv(outlineColor) {
  const highlightDiv = document.createElement("div");

  highlightDiv.style.position = "absolute";
  highlightDiv.style.transition = "all 0.5s ease-in-out";
  highlightDiv.style.border = "2px solid " + outlineColor;
  highlightDiv.style.boxShadow = "0 0 5px " + outlineColor;
  document.body.appendChild(highlightDiv);
  return highlightDiv;
}

// Recursive function that propogates a sequence

function sequenceTransition(sequence, repititions) {
  if (sequence.currIndex < sequence.elements.length && repititions != 0) {
    // Highlight the next DOM element in the sequence
    const nextElem = sequence.elements[sequence.currIndex];
    const domElement = nextElem.domElement;
    const duration = nextElem.duration;

    scrollIntoView(domElement);
    transitionElementTo(sequence.highlightDiv, domElement);
    if (sequence.useTooltip) {
      sequence.tooltip.performTransition(domElement, nextElem.info, 200);
    }
    sequence.currIndex++;

    // Wait for duration specified before moving to next element
    sequence.timer = setTimeout(() => {
      sequenceTransition(sequence, repititions);
    }, duration + 500);
  } else if (repititions > 0) {
    // Restart sequence
    sequence.currIndex = 0;
    repititions--;
    sequenceTransition(sequence, repititions);
  } else {
    // currIndex is 0 and repititions is 0
    sequence.reset();
    return;
  }
}

export default TimedSequence;
