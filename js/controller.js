import * as Model from "./model.js";
import * as View from "./view.js";

window.addEventListener("load", init);

// Globale variabler
let model;
let view;
let intervalId;
let isPaused = false;
let limitInput;
let startBtn;
let pauseBtn;
let speedInput;

function init() {
  console.log("Controller is live!");

  // Hent DOM-elementer
  limitInput = document.getElementById("limit");
  startBtn = document.getElementById("startBtn");
  pauseBtn = document.getElementById("pauseBtn");
  speedInput = document.getElementById("speed");

  // Sæt event listeners
  startBtn.addEventListener("click", startAlgorithm);
  pauseBtn.addEventListener("click", pauseAlgorithm);
}

function startAlgorithm() {
  const limit = parseInt(limitInput.value);

  if (!validateInput(limit)) {
    alert("Indtast venligst et gyldigt tal større end eller lig med 2.");
    return;
  }

  // Stop eventuel eksisterende kørsel
  clearInterval(intervalId);
  intervalId = null;
  isPaused = false;
  pauseBtn.textContent = "Pause";

  // Initialiser model og view
  model = new Model.SieveModel(limit);
  view = new View.SieveView();
  view.render(model.getNumbers(), model.currentPrime);

  // Hent hastighedsværdien
  let speed = parseInt(speedInput.value);
  if (isNaN(speed) || speed < 50) {
    speed = 500; // Standardværdi
  }

  // Start algoritmen
  intervalId = setInterval(runAlgorithm, speed);
}

function pauseAlgorithm() {
  if (!intervalId) return;

  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Fortsæt" : "Pause";
}

function runAlgorithm() {
  if (isPaused) return;

  const stepResult = model.step(); // Få besked om det aktuelle trin
  view.render(model.getNumbers(), model.currentPrime);

  // Opdater animationsområdet
  view.updateAnimation(stepResult);

  if (model.isCompleted) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Algoritmen er færdig!");
  }
}

function validateInput(limit) {
  return !isNaN(limit) && limit >= 2;
}
