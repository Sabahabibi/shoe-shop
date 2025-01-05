import { getProductsList } from "../../services/products.js";
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
      return `<a href="../product/product.html?id=${element.id}"> <div class="flex flex-col items-center">
          <!-- product image -->
          <div
            class="bg-[#F3F3F3] w-[182px] h-[182px] rounded-[24px] flex items-center justify-center"
          >
            <img
              class="w-[182px] h-[182px] p-[20px] object-contain"
              src=${element.imageURL}
            />
          </div>
          <!-- product name & price  -->
          <div class="flex flex-col gap-2">
            <p
              class="font-bold text-[20px] leading-[24.2px] -tracking-1 text-[#152536]  text-ellipsis"
            >
              ${element.name}
            </p>
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

// async function callGetProductList(brand) {
//   const products = await getProductsList(brand);
//   renderProduct(products.records);
// }

window.callGetProductList = async (brand) => {
  const products = await getProductsList(brand);
  renderProduct(products.records);
};

function renderBrandButtons() {
  // console.log("called");
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
