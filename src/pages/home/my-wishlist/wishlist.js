import { getProductsList } from "../../../services/products.js";

const container = document.getElementById("productCard");
const products = document.getElementById("products");
const NikeProducts = document.getElementById("NikeProducts");
const allProducts = document.getElementById("allProducts");
const brandSection = document.getElementById("brand-section");

export const isUserLoggedin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    location.href = "../login/login.html";
  }

  return false;
};
isUserLoggedin();
const brandList = [
  "ALL",
  "NIKE",
  "PUMA",
  "ADIDAS",
  "NEWBALANCE",
  "CONVERSE",
  "ASICS",
];

// services

// render products
function renderProduct(product) {
  products.innerHTML = "";
  if (!product) {
    return null;
  }
  products.innerHTML = product
    ?.map((element) => {
      return `<a href="../product/product.html?id=${element.id}"> <div class="flex flex-col items-start gap-2">
          <!-- product image -->
          <div
            class="bg-[#F3F3F3] w-[182px] h-[182px] rounded-[24px] flex items-center justify-center relative"
          >
            <img
              class="w-[182px] h-[182px] p-[20px] object-contain"
              src=${element.imageURL}
            />
             <img
            class="absolute top-3 right-3 w-6"
            src="../../../assets/images/icones/heart-search.svg"
            alt=""
          />
          </div>
          <!-- product name & price  -->
          <div class="flex flex-col gap-2">
            <p
              class="font-bold text-[20px] leading-[24.2px] -tracking-1 text-[#152536]  text-ellipsis"
            >
              ${element.name}
            </p>
            <div class="flex gap-3">
            <div class="flex items-center gap-1">
              <img
                class="w-7"
                src="../../../assets/images/icones/star-half-svgrepo-com.svg"
                alt="star"
              />
              <p class="text-[#697279] text-sm">4.5</p>
            </div>
            <p>|</p>
            <p
              class="bg-[#F3F3F3] text-[#212529] rounded-xl px-3 py-1 text-center text-sm font-medium"
            >
              5.371 sold
            </p>
          </div>
          </div>
            <p
              class="font-semibold text-[16px] leading-[19.36px] text-[#152536]"
            >
              <span>$</span> ${element.price}
            </p>
          </div>
        </div></a>`;
    })
    .join("");
}

document
  .getElementById("allProducts")
  .addEventListener("click", renderProduct());

window.callGetProductList = async (brand) => {
  const products = await getProductsList(brand);
  renderProduct(products.records);
};

function renderBrandButtons() {
  brandSection.innerHTML = "";

  brandList.forEach((b) => {
    brandSection.innerHTML += `
    <button
            onclick="callGetProductList('${b}')"
            class="px-5 py-2 border border-[#152536] rounded-[25px] bg-white text-[#152536] font-semibold text-base leading-[19.36px] hover:bg-[#152536] hover:text-white"
          >
            ${b}
          </button>
    `;
  });
}

renderBrandButtons();
callGetProductList("ALL");
