export class SieveModel {
  constructor(limit) {
    this.limit = limit;
    this.numbers = [];
    this.currentIndex = 0;
    this.isCompleted = false;
    this.currentPrime = null;
    this.initialize();
  }

  initialize() {
    // Opret en liste af objekter for tal fra 2 til limit
    for (let i = 2; i <= this.limit; i++) {
      this.numbers.push({
        value: i,
        isMarked: false,
        isPrime: false,
      });
    }
  }

  getNumbers() {
    return this.numbers;
  }

  step() {
    if (this.isCompleted) return;

    // Find næste ikke-markerede tal
    while (
      this.currentIndex < this.numbers.length &&
      this.numbers[this.currentIndex].isMarked
    ) {
      this.currentIndex++;
    }

    // Hvis vi har nået slutningen, er algoritmen færdig
    if (
      this.currentIndex >= this.numbers.length ||
      Math.pow(this.numbers[this.currentIndex].value, 2) > this.limit
    ) {
      // Marker resterende ikke-markerede tal som primtal
      for (let i = this.currentIndex; i < this.numbers.length; i++) {
        if (!this.numbers[i].isMarked) {
          this.numbers[i].isPrime = true;
        }
      }
      this.isCompleted = true;
      this.currentPrime = null;
      return;
    }

    // Sæt currentPrime og marker det som primtal
    this.currentPrime = this.numbers[this.currentIndex].value;
    this.numbers[this.currentIndex].isPrime = true;

    // Marker alle multipler af currentPrime
    for (let i = this.currentIndex + 1; i < this.numbers.length; i++) {
      if (this.numbers[i].value % this.currentPrime === 0) {
        this.numbers[i].isMarked = true;
      }
    }

    // Flyt til næste indeks
    this.currentIndex++;
  }
}
