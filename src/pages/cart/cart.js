let counterValue = 0;
let totalPrice = 0;

const counter = document.getElementById("counter");
const openModalButton = document.getElementById("openModal");
const footerCart = document.getElementById("footerCart");
const closeModalButton = document.getElementById("closeModal");
const confirmRemoveButton = document.getElementById("confirmRemove");
const navbar = document.getElementById("navbar");
const cartContainer = document.getElementById("cart-container");
const totalPriceDisplay = document.getElementById("totalPrice");

function saveCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// render Product
function renderProduct() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  if (!cart) {
    return null;
  }

  cartContainer.innerHTML = cart
    ?.map((product, index) => {
      return ` <div class="bg-white shadow-md rounded-3xl p-4 mb-4 flex   gap-6 ">
      <div
          class="bg-gray-100 rounded-2xl items-center justify-center flex gap-5 w-full h-[100px]"
        >
          <img
            src=${product.image}
            alt="Product Image"
            class="object-contain py-2 px-2 w-[100px] h-[120px] "
          />
        </div>
        <div class="flex flex-col gap-4 pl-4 justify-start">
          <div class="flex items-center gap-4 w-full">
            <div >
              <h1 class="text-sm text-ellipsis font-semibold w-[80%]  overflow-hidden whitespace-nowrap ">
                ${product.name}
              </h1>
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <div class="rounded-full w-6 h-6 border" style="background-color:${
              product.color
            }" ></div>
            <p class="text-gray-500 text-sm">${product.color}</p>
            <p>|</p>
            <p class="text-gray-500 text-sm">Size = ${product.size}</p>
          </div>
        
          <div class="flex justify-start items-center">
            <p  class="text-lg font-semibold mr-4 flex gap-2">
            <span>$</span>
              <span id="price-${index}">${
        product.price * product.quantity
      }</span>
            </p>
            <div class="flex items-center gap-3 bg-gray-100 rounded-3xl p-2">
              <button
                id="decrease-${index}"
                class="w-6 h-6 flex items-center justify-center"
              >
                -
              </button>
              <span
                id="counter-${index}"
                class="w-6 h-6 flex items-center justify-center font-medium"
              >
                ${product.quantity}
              </span>
              <button
                id="increase-${index}"
                class="w-6 h-6 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          
        </div>
        <div class = "w-[100px]">
           <img
              class="w-7 h-7 cursor-pointer"
              src="../../assets/images/icones/Delete 1.svg"
              alt="Trash Icon"
              id="deleteBtn"
            />
          </div>
      </div> `;
    })
    .join("");

  cart.forEach((product, index) => {
    const increaseButton = document.getElementById(`increase-${index}`);
    const decreaseButton = document.getElementById(`decrease-${index}`);
    const counter = document.getElementById(`counter-${index}`);
    const price = document.getElementById(`price-${index}`);
    totalPrice += product.totalPrice;
    totalPriceDisplay.textContent = totalPrice;

    // increaseButton
    increaseButton.addEventListener("click", () => {
      product.quantity++;
      counter.textContent = product.quantity;
      product.totalPrice = product.quantity * product.price;
      price.textContent = product.totalPrice;
      totalPrice += product.price;
      totalPriceDisplay.textContent = totalPrice;
      saveCartToLocalStorage(cart);
    });

    decreaseButton.addEventListener("click", () => {
      if (product.quantity > 1) {
        product.quantity--;
        counter.textContent = product.quantity;
        product.totalPrice = product.quantity * product.price;
        price.textContent = product.totalPrice;
        totalPrice -= product.price;
        totalPriceDisplay.textContent = totalPrice;
        saveCartToLocalStorage(cart);
      }
    });
  });

  // modal
  const modal = document.getElementById("deleteModal");
  const deleteBtn = document.getElementById("deleteBtn");

  deleteBtn.addEventListener("click", () => {
    console.log(deleteBtn);
    modal.classList.remove("hidden");
    footerCart.classList.add("hidden");
    navbar.classList.add("hidden");
  });

  closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    footerCart.classList.remove("hidden");
    navbar.classList.remove("hidden");
  });

  confirmRemoveButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    footerCart.classList.remove("hidden");
    navbar.classList.remove("hidden");
  });
}
renderProduct();
