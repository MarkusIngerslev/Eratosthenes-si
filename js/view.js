export class SieveView {
  constructor() {
    this.container = document.getElementById("visualization");
    this.currentActionElement = document.getElementById("currentAction");
  }

  render(numbers, currentPrime) {
    // Ryd containeren
    this.container.innerHTML = "";

    // Gennemgå alle tal og opret elementer
    numbers.forEach((num) => {
      const numberDiv = document.createElement("div");
      numberDiv.classList.add("number");

      numberDiv.textContent = num.value;

      // Ændret rækkefølgen af betingelserne
      if (num.isPrime) {
        numberDiv.classList.add("prime");
      } else if (num.isMarked) {
        numberDiv.classList.add("marked");
      } else {
        numberDiv.classList.add("unmarked");
      }

      if (num.value === currentPrime) {
        numberDiv.classList.add("current-prime");
      }

      this.container.appendChild(numberDiv);
    });
  }

  updateAnimation(action) {
    this.currentActionElement.textContent = action;
  }
}
