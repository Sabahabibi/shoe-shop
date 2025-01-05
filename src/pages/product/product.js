// const id = location.search;
// console.log(id);
// console.log(location);

const container = document.getElementById("productCard");
const singleProduct = document.getElementById("singleProduct");
const swiperSingleProduct = document.getElementById("swiperSingleProduct");

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
  singleProduct.innerHTML = "";
  swiperSingleProduct.innerHTML = "";
  products.innerHTML = product
    .map((element) => {
      return `<a href="">
      <swiper-container
        class="mySwiper"
        pagination="true"
        pagination-dynamic-bullets="true"
      >
        <swiper-slide
          ><img
            class="p-10"
            src=${element.imageURL}
            alt="product"
        /></swiper-slide>
        <swiper-slide
          ><img
            class="p-10"
            src=${element.imageURL}
            alt="product"
        /></swiper-slide>
        <swiper-slide
          ><img
            class="p-10"
            src=${element.imageURL}
            alt="product"
        /></swiper-slide>
      </swiper-container>
       <!-- reviews section -->
      <div id="singleProduct" class="flex flex-col pt-7 gap-4">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-[32px] text-[#152536] text-center">
            ${element.name}
          </p>
          <img src="../../assets/images/icones/favourite.svg" alt="fav" />
        </div>
        <div class="flex gap-4 items-center">
          <p
            class="bg-[#F3F3F3] text-[#212529] rounded-xl px-3 py-1 text-center text-sm"
          >
            5.371 sold
          </p>

          <div class="flex items-center gap-1">
            <svg
              fill="#181616"
              width="30px"
              height="30px"
              viewBox="-17.16 -17.16 86.32 86.32"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#181616"
              stroke-width="0.0005200000000000001"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#b2aeae"
                stroke-width="0.10400000000000001"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M27.4133467,3.10133815 L32.0133467,18.1013381 C32.2133467,18.7013381 32.8133467,19.0013381 33.4133467,19.0013381 L48.4133467,19.0013381 C49.9133467,19.0013381 50.5133467,21.0013381 49.3133467,21.9013381 L37.1133467,30.9013381 C36.6133467,31.3013381 36.4133467,32.0013381 36.6133467,32.6013381 L42.4133467,48.0013381 C42.8133467,49.4013381 41.3133467,50.6013381 40.1133467,49.7013381 L27.0133467,39.9013381 C26.5133467,39.5013381 25.8133467,39.5013381 25.2133467,39.9013381 L12.0133467,49.7013381 C10.8133467,50.6013381 9.21334668,49.4013381 9.71334668,48.0013381 L15.3133467,32.6013381 C15.5133467,32.0013381 15.3133467,31.3013381 14.8133467,30.9013381 L2.61334668,21.9013381 C1.41334668,21.0013381 2.11334668,19.0013381 3.51334668,19.0013381 L18.5133467,19.0013381 C19.2133467,19.0013381 19.7133467,18.8013381 19.9133467,18.1013381 L24.6133467,3.00133815 C25.0133467,1.60133815 27.0133467,1.70133815 27.4133467,3.10133815 Z M26.0133467,12.8023264 C26,14.1700393 26,33.5426636 26,34.4953918 C26.1865845,34.6476135 28.9331193,36.6890643 34.2396046,40.6197441 C34.9394191,41.144605 35.8141872,40.4447905 35.5809157,39.6283403 L35.5809157,39.6283403 L32.3085327,31.0201416 C31.9597778,30.2501831 32.3085327,29.7487793 32.7398682,29.4849854 L32.7398682,29.4849854 L39.6048489,24.6961622 C40.3046634,24.1713013 39.9547562,23.0049438 39.0799881,23.0049438 L39.0799881,23.0049438 L31.0206299,23.0049438 C30.6707226,23.0049438 29.7518921,22.8880615 29.5025635,21.9888306 L29.5025635,21.9888306 L26.8332347,13.4436151 C26.7175852,13.0388421 26.3602784,12.8204102 26.0133467,12.8023264 Z"
                ></path>
              </g>
            </svg>
            <p class="text-[#212529] text-sm">4.3(5.389 reviews)</p>
          </div>
        </div>
        <!-- gray border -->
        <div class="border text-[#F3F3F3]"></div>
     </a>`;
    })
    .join("");
}
