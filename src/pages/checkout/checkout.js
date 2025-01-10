document.addEventListener("DOMContentLoaded", () => {
  const savedAddress = localStorage.getItem("selectedShippingAddress");
  console.log("Address from localStorage:", savedAddress);

  if (savedAddress) {
  } else {
    radioButtons.forEach((radio) => {
      const addressLabel = radio
        .closest("div")
        .querySelector("p.font-bold").textContent;
      if (addressLabel === "Home") {
        radio.checked = true;
        localStorage.setItem("selectedShippingAddress", "Home");
      }
    });
  }
});
