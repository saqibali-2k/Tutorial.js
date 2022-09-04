import FloatingToolTip from "./floatingTooltip.js";
import timelineBarFactory from "./timelineBar.js";
import { scrollIntoViewOffset, transitionElementTo } from "./utils.js";

class TimelineTutorial {
  constructor(elements, outlineColor) {
    this.outlineColor = outlineColor;
    this.elements = elements;

    this.elements.sort((a, b) => {
      return a.position - b.position;
    });
    this.elements.push({
      title: "Exit",
    });

    this.nextCheckpoint = this.nextCheckpoint.bind(this);
    this.isRunning = false;
  }

  startTutorial() {
    this.reset();
    this.timelineBar = timelineBarFactory(this.elements, this.nextCheckpoint);
    this.highlightDiv = createHighlightDiv(this.outlineColor);
    this.tooltip = new FloatingToolTip();
    this.isRunning = true;
  }

  nextCheckpoint(node, title) {
    if (title === "Exit") {
      this.reset();
      return;
    }

    updateActiveNode(node, this.oldNode);
    this.oldNode = node;
    const rect = this.timelineBar.getBoundingClientRect();
    const elem = updateHighlightDiv(this.highlightDiv, this.elements, title);
    scrollIntoViewOffset(this.tooltip.tooltip, rect);

    this.tooltip.performTransition(elem.domElement, elem.info, 200);

    if (elem.callback) {
      setTimeout(elem.callback, 400);
    }
  }

  reset() {
    if (this.timelineBar) {
      this.timelineBar.remove();
    }

    if (this.highlightDiv) {
      this.highlightDiv.remove();
    }

    if (this.tooltip) {
      this.tooltip.remove();
    }

    this.isRunning = false;
  }
}

function createHighlightDiv(outlineColor) {
  const highlightDiv = document.createElement("div");

  highlightDiv.style.position = "absolute";
  highlightDiv.style.transition = "all 0.5s ease-in-out";
  highlightDiv.style.border = "2px solid " + outlineColor;
  highlightDiv.style.boxShadow = "0 0 5px " + outlineColor;
  highlightDiv.style.opacity = "0%";
  document.body.appendChild(highlightDiv);
  return highlightDiv;
}

function updateHighlightDiv(highlightDiv, elements, title) {
  const element = elements.find((obj) => {
    return obj.title === title;
  });
  highlightDiv.style.opacity = "100%";
  transitionElementTo(highlightDiv, element.domElement);
  return element;
}

function updateActiveNode(node, oldNode) {
  if (oldNode) {
    oldNode.classList.remove("active");
  }

  node.classList.add("active");
}

export default TimelineTutorial;
