let counterValue = 0;

const counter = document.getElementById("counter");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

increaseButton.addEventListener("click", () => {
  counterValue++;
  counter.textContent = counterValue;
});

decreaseButton.addEventListener("click", () => {
  if (counterValue > 0) {
    counterValue--;
    counter.textContent = counterValue;
  }
});
