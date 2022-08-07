"use strict";
const tutorial = new Tutorial();
const BasicTutorial = tutorial.BasicTutorial;
const TimelineTutorial = tutorial.TimelineTutorial;
const TimedSequence = tutorial.TimedSequence;

// Array of tutorials that we dont want running together
const tutorials = [];

// Elements that will be highlighted
const basicTutorialDiv = document.getElementById("basicTutorial");
const basicTutorialHeading = document.getElementById("basicTutorialHeading");
const importantInfo = document.getElementById("importantInfo");
const importantNote = document.getElementById("importantNote");

const basicTut = new BasicTutorial(
  [
    {
      position: 0,
      domElement: basicTutorialHeading,
      info: document.createTextNode(
        "We can highlight information that may be important to user. \n Note: You can move this menu by clickling and dragging the header."
      ),
    },
    {
      position: 1,
      domElement: importantInfo,
      info: document.createTextNode(
        "These are important features of the menu."
      ),
    },
    {
      position: 2,
      domElement: importantNote,
      info: document.createTextNode(
        "This is more important info you might have missed."
      ),
    },
    {
      position: 3,
      domElement: basicTutorialDiv,
      info: document.createTextNode("This was the basic tutorial."),
    },
  ],
  "turquoise",
  true
);

const heading = document.getElementById("heading");
const jsObjectsDiv = document.getElementById("jsObjects");
const timelineTutorialDiv = document.getElementById("timelineTutorial");
const timedSequenceDiv = document.getElementById("timedSequence");
const customizationHeading = document.getElementById("customizationHeading");

const timelineTut = new TimelineTutorial(
  [
    {
      position: 0,
      domElement: heading,
      info: document.createTextNode(
        "Here are some examples of Tutorial.js in action. You can use the timeline at the bottom to navigate."
      ),
      title: "Start",
    },
    {
      position: 1,
      domElement: jsObjectsDiv,
      info: document.createTextNode(
        "There are three main JS objects available."
      ),
      title: "JS Objects",
    },
    {
      position: 2,
      domElement: basicTutorialDiv,
      info: document.createTextNode(
        "BasicTutorial provides a standard tutorial where a user moves one step at a time whenever they want."
      ),
      title: "Basic Tutorial",
    },
    {
      position: 3,
      domElement: timelineTutorialDiv,
      info: document.createTextNode(
        "TimelineTutorial is the tutorial you are using right now!"
      ),
      title: "Timeline Tutorial",
    },
    {
      position: 4,
      domElement: timedSequenceDiv,
      info: document.createTextNode(
        "TimedSequence is a tutorial where the user is not required to press any buttons. Time spent on a particular element in the tutorial is determined by devs."
      ),
      title: "Timed Sequence",
    },
    {
      position: 5,
      domElement: customizationHeading,
      info: document.createTextNode(
        "These are some ways you can customize the library to your needs."
      ),
      title: "Customization",
    },
  ],
  "red",
  true
);

const timedSequenceCode = document.getElementById("timedSequenceCode");
const timedSequenceDemo = document.getElementById("timedSequenceDemo");

const timedSeq = new TimedSequence(
  [
    {
      position: 0,
      domElement: timedSequenceDiv,
      info: document.createTextNode(
        "This is a timed tutorial that progresses automatically. This element is highlighted for 7s."
      ),
      duration: 7000,
    },
    {
      position: 1,
      domElement: timedSequenceCode,
      info: document.createTextNode(
        "We can introduce new features. You can click the button to view code after the tutorial."
      ),
      duration: 7000,
    },
    {
      position: 2,
      domElement: timedSequenceDemo,
      info: document.createTextNode("This element will be highlighted for 3s."),
      duration: 3000,
    },
  ],
  true,
  "lightblue"
);

const embeddedDiv = document.getElementById("embeddedDiv");
const dummyData = document.getElementById("dummyData");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");

const subsequence = new TimedSequence(
  [
    { position: 0, domElement: option1, duration: 1000 },
    { position: 1, domElement: option2, duration: 1000 },
  ],
  false,
  "gray"
);

const embeddedBasic = new BasicTutorial(
  [
    {
      positon: 0,
      domElement: embeddedDiv,
      info: document.createTextNode("We can trigger callbacks with tutorials."),
    },
    {
      position: 1,
      domElement: dummyData,
      info: document.createTextNode(
        "We started a sequence with 3 repititions."
      ),
      callback: () => {
        subsequence.startSequence(3);
      },
    },
  ],
  "black",
  true
);

tutorials.push(basicTut);
tutorials.push(timelineTut);
tutorials.push(embeddedBasic);

timelineTut.startTutorial();

const tutorialListener = (e) => {
  const id = e.target.id;
  let isRunning = false;

  tutorials.forEach((tutorial) => {
    isRunning = tutorial.isRunning || isRunning;
  });

  if (!isRunning) {
    if (id === "basicTutorialDemo") {
      basicTut.startTutorial();
    }

    if (id === "timelineTutorialDemo") {
      timelineTut.startTutorial();
    }

    if (id === "embeddedDemo") {
      embeddedBasic.startTutorial();
    }
  }
};

// attach listeners
document
  .getElementById("basicTutorialDemo")
  .addEventListener("click", tutorialListener);

document
  .getElementById("timelineTutorialDemo")
  .addEventListener("click", tutorialListener);

document
  .getElementById("embeddedDemo")
  .addEventListener("click", tutorialListener);
timedSequenceDemo.addEventListener("click", timedSeq.startSequence);
