"use strict";

//Default controls

function defaultControlsFactory(previousCallback, nextCallback, skipCallback) {
  const parentDiv = getParentControl();

  // Header Element
  const headingDiv = document.createElement("div");
  headingDiv.appendChild(document.createTextNode("Tutorial"));
  headingDiv.id = "tutorialControlsHeader";

  parentDiv.appendChild(headingDiv);

  // Body element (where useful info will appear)
  const bodyDiv = document.createElement("div");
  bodyDiv.id = "tutorialControlsBody";

  // Navigation buttons and the listeners
  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "tutorialControlsButtons";

  const prev = document.createElement("button");
  prev.innerHTML = "Previous";
  prev.onclick = previousCallback;
  const next = document.createElement("button");
  next.innerHTML = "Next";
  next.onclick = nextCallback;
  const finish = document.createElement("button");
  finish.innerHTML = "Finish";
  finish.onclick = skipCallback;

  // Put everything together
  buttonsDiv.appendChild(prev);
  buttonsDiv.appendChild(next);
  buttonsDiv.appendChild(finish);

  parentDiv.appendChild(bodyDiv);
  parentDiv.appendChild(buttonsDiv);

  document.body.appendChild(parentDiv);
  draggableDOMElement(parentDiv);
  return parentDiv;
}

// Helper to make an element draggable

function draggableDOMElement(element) {
  let changeX = 0,
    changeY = 0,
    x = 0,
    y = 0;

  // Can only be dragged from the header
  const pivot = document.getElementById(element.id + "Header");
  element.style.right = "0px";
  element.style.bottom = "0px";

  const mouseMove = (e) => {
    e.preventDefault();

    changeX = x - e.clientX;
    changeY = y - e.clientY;

    // Update coordinates when mouse is moved
    element.style.bottom = parseInt(element.style.bottom, 10) + changeY + "px";
    element.style.right = parseInt(element.style.right, 10) + changeX + "px";

    x = e.clientX;
    y = e.clientY;
  };

  // Stop updating when mouse is released
  const mouseUp = (e) => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  // Start updating coordinates when mouse is pressed
  const mouseDown = (e) => {
    e.preventDefault();
    x = e.clientX;
    y = e.clientY;

    document.onmousemove = mouseMove;
    document.onmouseup = mouseUp;
  };

  pivot.onmousedown = mouseDown;
}

// Creates the parent element for tutorial controls
function getParentControl() {
  const parentDiv = document.createElement("div");

  parentDiv.id = "tutorialControls";
  return parentDiv;
}

export default defaultControlsFactory;
