export class SieveModel {
  constructor(limit) {
    this.limit = limit;
    this.numbers = [];
    this.currentIndex = 0;
    this.isCompleted = false;
    this.currentPrime = null;
    this.currentMultipleIndex = null;
    this.markingRemainingPrimes = false; 
    this.remainingPrimeIndex = null; 
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
    if (this.isCompleted) return null;

    // Hvis vi er i fasen, hvor vi markerer resterende primtal
    if (this.markingRemainingPrimes) {
      // Fortsæt med at markere ubehandlede tal som primtal ét ad gangen
      while (
        this.remainingPrimeIndex < this.numbers.length &&
        this.numbers[this.remainingPrimeIndex].isMarked
      ) {
        this.remainingPrimeIndex++;
      }

      if (this.remainingPrimeIndex >= this.numbers.length) {
        // Alle tal er blevet behandlet
        this.isCompleted = true;
        return "Algoritmen er færdig.";
      } else {
        // Marker det aktuelle tal som primtal
        const num = this.numbers[this.remainingPrimeIndex];
        num.isPrime = true;
        num.isMarked = true; // Marker det for at springe over i fremtidige iterationer
        const primeValue = num.value;

        // Forbered til næste iteration
        this.remainingPrimeIndex++;

        return `Markerer ${primeValue} som primtal.`;
      }
    }

    // Hovedalgoritmen
    if (this.currentPrime === null) {
      // Find næste ikke-markerede tal
      while (
        this.currentIndex < this.numbers.length &&
        this.numbers[this.currentIndex].isMarked
      ) {
        this.currentIndex++;
      }

      // Tjek om vi har nået slutningen, eller hvis kvadratet af det aktuelle tal overstiger grænsen
      if (
        this.currentIndex >= this.numbers.length ||
        Math.pow(this.numbers[this.currentIndex].value, 2) > this.limit
      ) {
        // Begynd at markere resterende ikke-markerede tal som primtal én ad gangen
        this.markingRemainingPrimes = true;
        this.remainingPrimeIndex = this.currentIndex;
        return "Ingen flere multipler at markere. Begynder at markere resterende tal som primtal.";
      }

      // Sæt currentPrime og marker det som primtal
      this.currentPrime = this.numbers[this.currentIndex].value;
      this.numbers[this.currentIndex].isPrime = true;
      this.numbers[this.currentIndex].isMarked = true; // Marker det

      // Start med første multiple
      this.currentMultipleIndex = this.currentIndex + 1;

      return `Nyt primtal fundet: ${this.currentPrime}. Starter med at markere dets multipler.`;
    } else {
      // Marker næste multiple af currentPrime
      while (
        this.currentMultipleIndex < this.numbers.length &&
        (this.numbers[this.currentMultipleIndex].isMarked ||
          this.numbers[this.currentMultipleIndex].value % this.currentPrime !==
            0)
      ) {
        this.currentMultipleIndex++;
      }

      if (this.currentMultipleIndex >= this.numbers.length) {
        // Færdig med at markere multipler af currentPrime
        const completedPrime = this.currentPrime;
        this.currentPrime = null;

        // Inkrementér currentIndex for at gå videre til næste tal
        this.currentIndex++;

        return `Færdig med at markere multipler af ${completedPrime}.`;
      } else {
        // Marker det aktuelle multiple
        this.numbers[this.currentMultipleIndex].isMarked = true;
        const multiple = this.numbers[this.currentMultipleIndex].value;
        this.currentMultipleIndex++;
        return `Markerer ${multiple}, da det er et multiple af ${this.currentPrime}.`;
      }
    }
  }
}
