const container = document.getElementById("productCard");
const products = document.getElementById("products");

const API_BASE_URL = "http://api.alikooshesh.ir:3000";
const API_KEY =
  "sabaICDm86Vi9PHRnAI7WNKrNRFRf9PzcRC1p2nH8JtcgOgZdMR8Qu119yuXY5mdFq2xdgsUk5CtvdnaITGoR4RS92bhaRUugU9RQyGkvespZ6ln2pfs1RmoeY5O6H2z";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzY3ZmMzYmRhODllOGMwOWFhZWM0ZSIsImlhdCI6MTczNTgxOTIxOCwiZXhwIjoxNzM1OTkyMDE4fQ.8snBmc_2MFf6BF62faNWHa0w2o_9Zk4J5J__6rx3RBk";

// services

// GET
async function getProductList() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/records/products`, {
      method: "GET",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    console.log(response);

    if (!response.ok) {
      throw new Error("has error");
    }
    const result = await response.json();
    console.log(result);

    renderProduct(result.records);
    return result;
  } catch (error) {
    console.log(`from catch: ${error.message}`);
  }
}

getProductList();

function renderProduct(product) {
  console.log(product);
  products.innerHTML = "";
  products.innerHTML = product
    .map((element) => {
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
