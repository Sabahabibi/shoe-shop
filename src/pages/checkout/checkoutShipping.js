const radioButtons = document.querySelectorAll('input[name="price"]');
const applyBtn = document.getElementById("applyBtn");
const addressDetail = document.getElementById("addressDetails");

document.addEventListener("DOMContentLoaded", () => {
  const savedAddress = localStorage.getItem("selectedShippingAddress");

  if (savedAddress) {
    radioButtons.forEach((radio) => {
      const addressLabel = radio
        .closest("div")
        .querySelector("p.font-bold").textContent;
      if (addressLabel === savedAddress) {
        radio.checked = true;
      }
    });
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

radioButtons.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    if (event.target.checked) {
      const selectedAddress = event.target
        .closest("div")
        .querySelector("p.font-bold").textContent;

      localStorage.setItem("selectedShippingAddress", selectedAddress);

      console.log(`Saved: ${selectedAddress}`);
    }
  });
});

applyBtn.addEventListener("click", () => {
  window.location.href = "checkout.html";
});
