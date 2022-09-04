"use strict";

// Got the inspiration from this link: https://codepen.io/cjl750/pen/MXvYmg

function timelineBarFactory(items, listener) {
  const timelineBar = document.createElement("div");
  timelineBar.classList.add("timelineBar");

  const timeline = document.createElement("div");
  timeline.classList.add("timeline");

  timelineBar.appendChild(timeline);

  const nodes = items.map((item) => {
    const node = document.createElement("div");
    node.classList.add("node");
    const heading = document.createElement("span");
    heading.setAttribute("title", item.title);
    node.appendChild(heading);

    node.addEventListener("click", () => {
      listener(node, item.title);
    });

    // Add node to timeline
    timeline.appendChild(node);
    return node;
  });

  document.body.appendChild(timelineBar);
  return timelineBar;
}

export default timelineBarFactory;
