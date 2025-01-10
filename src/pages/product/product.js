import { ACCESS_TOKEN, API_BASE_URL, API_KEY } from "../../services/utils.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let quantity = 0;
let totalPrice = 0;
let isLiked = false;
let selectedSize = null;
let selectedColor = null;

const productName = document.getElementById("productName");
const sizeContainer = document.getElementById("sizeContainer");
const colorContainer = document.getElementById("colorContainer");
const quantityDisplay = document.getElementById("quantityDisplay");
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");
const totalPriceDisplay = document.getElementById("totalPriceDisplay");
const swiperContainer = document.getElementById("swiperContainer");
const likeButton = document.getElementById("likeButton");
const heartIcon = document.getElementById("heartIcon");
const addProduct = document.getElementById("addProduct");

// like unlike
likeButton.addEventListener("click", () => {
  if (isLiked) {
    heartIcon.setAttribute(
      "src",
      "../../assets/images/icones/heart-svgrepo-com.svg"
    );
    isLiked = false;
  } else {
    heartIcon.setAttribute(
      "src",
      "../../assets/images/icones/heart-svgrepo-com (1).svg"
    );
    isLiked = true;
  }
});

// Get BY ID
async function getProductById() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/records/products/${id}`, {
      method: "GET",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        window.location.href = "../login/login.html";
      }

      throw new Error("NO data reveived");
    }
    const result = await response.json();

    renderProduct(result);

    console.log(result);

    if (result && result.product) {
      renderProduct(result.product);
    } else {
      // console.error("Product data not found in response.");
    }

    return result;
  } catch (error) {
    console.log(`from catch: ${error.message}`);
  }
}
getProductById();

// render product
function renderProduct(product) {
  // render image
  const src =
    typeof product.imageURL === "string"
      ? product.imageURL
      : product.imageURL[0];
  const slider = document.createElement("div");
  slider.innerHTML = ` <swiper-slide><img class="p-10" src=${src} /></swiper-slide>`;
  swiperContainer.appendChild(slider);

  // render name
  productName.innerText = product.name;

  // render sizes
  product.sizes.map((item) => {
    const sizeOption = document.createElement("div");
    sizeOption.innerHTML = ` <input
                type="radio"
                name="size"
                value=${item}
                class="peer hidden"
                id="size-${item}"
              />
              <label
                for="size-${item}"
                class="w-11 h-11 text-lg border rounded-full border-[#717171] flex items-center justify-center cursor-pointer relative"
              >
                ${item}
              </label>`;
    sizeContainer.appendChild(sizeOption);
    // selected size
    const label = sizeOption.querySelector("label");
    label.addEventListener("click", () => {
      selectedSize = item;
      const allLabels = sizeContainer.querySelectorAll("label");
      allLabels.forEach((lbl) => {
        lbl.classList.remove(
          "border-black",
          "text-white",
          "bg-black",
          "text-black",
          "border-4"
        );
        lbl.classList.add("border-[#717171]", "text-black");
      });
      label.classList.remove("border-[#717171]", "text-black");
      label.classList.add("border-black", "text-white", "bg-black", "border-4");
    });
  });

  // render colors
  product.colors.map((color) => {
    const colorOption = document.createElement("div");
    colorOption.innerHTML = `    <button
                id = "colorOption"
                class="min-w-11 h-11 rounded-full flex items-center justify-center relative cursor-pointer"
                style="background-color: ${color}; border: 1px solid black;"
              >
              <img
               src="../../assets/images/icones/check-svgrepo-com.svg"
               alt="checkmark"
               class="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
               />
              </button>`;
    colorContainer.appendChild(colorOption);

    const button = colorOption.querySelector("button");
    const checkmark = button.querySelector("img");
    // selected color
    button.addEventListener("click", () => {
      selectedColor = color;
      const allButtons = colorContainer.querySelectorAll("button");
      allButtons.forEach((btn) => {
        const check = btn.querySelector("img");
        if (check) {
          check.classList.add("hidden");
        }
      });

      if (checkmark) {
        checkmark.classList.remove("hidden");
      }
    });
  });

  // render quantity / increase
  increaseBtn.addEventListener("click", () => {
    if (quantity < product.items_left) {
      quantity += 1;
      quantityDisplay.innerText = quantity;
      totalPrice = quantity * product.price;
      totalPriceDisplay.innerText = totalPrice;
    }
  });

  // render quantity / decrease
  decreaseBtn.addEventListener("click", () => {
    if (quantity > 0) {
      quantity -= 1;
      quantityDisplay.innerText = quantity;
      totalPrice = quantity * product.price;
      totalPriceDisplay.innerText = totalPrice;
    }
  });

  // add product button
  addProduct.addEventListener("click", () => {
    console.log(selectedSize);
    const finalProduct = {
      id: id,
      name: product.name,
      image:
        typeof product.imageURL === "string"
          ? product.imageURL
          : product.imageURL[0],
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      totalPrice: 0,
    };
    console.log(finalProduct);

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart ? cart : [];
    cart.push(finalProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    PostProduct(finalProduct);
  });
}

// post product
async function PostProduct(data = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/records/Cart`, {
      method: "POST",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);

    if (!response.ok) {
      if (response.status === 403) {
        window.location.href = "../Login/login.html";
      }
      console.log(response.status);
      throw new Error("No data received");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
