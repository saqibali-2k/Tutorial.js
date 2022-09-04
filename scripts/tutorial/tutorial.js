"use strict";

import BasicTutorial from "./basicTutorial.js";
import TimelineTutorial from "./timelineTutorial.js";
import TimedSequence from "./timedSequence.js";

(function (global) {
  function Tutorial() {
    this.BasicTutorial = BasicTutorial;
    this.TimelineTutorial = TimelineTutorial;
    this.TimedSequence = TimedSequence;
  }

  global.Tutorial = global.Tutorial || Tutorial;
})(window);
