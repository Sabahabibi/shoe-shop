import { getProductsList } from "../../../services/products.js";
const products = document.getElementById("products");
const titleBrands = document.getElementById("titleBrands");

window.callGetProductList = async (brand) => {
  const products = await getProductsList(brand);
  renderProduct(products.records);
  console.log(products.records);
  titleBrands.innerText = brand.toLowerCase();
};

// render products
function renderProduct(product) {
  products.innerHTML = "";
  products.innerHTML = product
    .map((element) => {
      return `
      <a href="../product/product.html?id=${element.id}">
      <div class="flex flex-col items-center">
        <!-- product image -->
        <div
          class="bg-[#F3F3F3] w-[182px] h-[182px] rounded-[24px] flex items-center justify-center"
        >
          <img
            class="w-[182px] h-[182px] p-[20px] object-contain"
            src="${element.imageURL}"
          />
        </div>
        <!-- product name & price  -->
        <div class="flex flex-col gap-2">
          <p
            class="font-bold text-[20px] leading-[24.2px] -tracking-1 text-[#152536] text-ellipsis"
          >
            ${element.name}
          </p>
          <p class="font-semibold text-[16px] leading-[19.36px] text-[#152536]">
            <span>$</span> ${element.price}
          </p>
        </div>
      </div></a>
    `;
    })
    .join("");
}

const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get("brand");

window.callGetProductList(brand);
