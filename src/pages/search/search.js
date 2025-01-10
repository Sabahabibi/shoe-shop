import { ACCESS_TOKEN, API_BASE_URL, API_KEY } from "../../services/utils.js";

async function getDataSearch(searchvalue) {
  try {
    const Notfound = document.getElementById("Notfound");
    if (Notfound) {
      Notfound.innerHTML = "";
      if (showHistory) {
        const showHistory = document.getElementById("showHistory");
        showHistory.innerHTML = "";
      }
    }

    const response = await fetch(
      `${API_BASE_URL}/api/records/products?searchKey=name&searchValue=${searchvalue}`,
      {
        method: "GET",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error("has error");
    }
    const result = await response.json();
    console.log(result);

    if (result.records && result.records.length > 0) {
      const Notfound = document.getElementById("Notfound");
      if (Notfound) {
        Notfound.innerHTML = "";
      }

      // Update search history
      const getHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      localStorage.setItem(
        "searchHistory",
        JSON.stringify([...new Set([...getHistory, searchvalue])])
      );

      const getHistorys = JSON.parse(localStorage.getItem("searchHistory"));
      showHistory.innerHTML = "";
      const uniqueHistory = [...new Set(getHistorys)];

      // Get the products container
      const searchProduct = document.getElementById("searchProduct");
      searchProduct.innerHTML = "";

      // Create HTML for all products
      let productHTML = "";

      result.records.forEach((product) => {
        productHTML += `
  <div class="flex flex-col items-center">
  <!-- Product Image Section -->
  <div class="bg-[#F3F3F3] w-[182px] h-[182px] rounded-[24px] flex items-center justify-center relative">
  <img class="w-[182px] h-[182px] p-[20px] object-contain" src="${
    product.imageURL
  }" alt="product" />
 <img
      class="absolute top-3 right-3 w-6"
      src="../../assets/images/icones/heart-search.svg"
      alt="Wishlist"
    />
  </div>
  
  <!-- Product Name & Price Section -->
  <div class="flex flex-col gap-2 pt-4">
  <p class="font-bold text-[20px] leading-[24.2px] tracking-[-0.04em] text-[#152536]">
  ${product.name || "Default Product Name"}
  </p>
  <div class="flex gap-4 items-center">
    <img
      class="w-4 h-4"
      src="../../assets/images/icones/star-half-svgrepo-com.svg"
      alt="Star Icon"
    />
  <p>|</p>
  <p class="bg-[#F3F3F3] text-[#212529] rounded-xl px-3 py-1 text-center text-sm font-medium">
  5.371 sold
  </p>
  </div>
  
  <p class="font-bold text-[18px] leading-[19.36px] text-[#152536]">
  <span>$</span> ${product.price || "85.00"}
  </p>
  </div>
  </div>
  `;
      });

      // Insert the product HTML into the product container
      searchProduct.innerHTML = productHTML;
      console.log(produ);
    } else {
      // No results found
      const searchProduct = document.getElementById("searchProduct");
      searchProduct.innerHTML = "";

      const Notfound = document.getElementById("Notfound");
      if (Notfound) {
        Notfound.innerHTML = `
         <div id="showHistory" class="flex justify-between w-full ">
      <p class="font-semibold color-[#152536] text-xl leading-[24.2px]">
        Results for "<span>${searchvalue}</span>"
      </p>
      <p class="font-semibold color-[#152536] text-lg leading-[24.2px]">
        0 <span>found</span>
      </p>
      </div>
  <img
        class="px-6 pb-4"
        src="../../assets/images/shadow/Doc.png"
        alt="not found"
      />
      <div class="flex flex-col gap-3">
        <p class="font-bold text-2xl text-[#101c29]">Not Found</p>
        <p class="text-lg text-[#152435]">
          Sorry, the keyword you entered cannot be found, please check again or
          search with another keyword.
        </p>
      </div>
  `;
      }
    }

    return result;
  } catch (error) {
    console.log(`from catch: ${error.message}`);
  }
}

function handlerSearch() {
  const Searchinput = document.getElementById("Search-input");
  // console.log(Searchinput.value);
  getDataSearch(Searchinput.value);
}

const searchIcon = document.getElementById("searchIcon");
searchIcon.addEventListener("click", handlerSearch);

///Searchhistory-User
const serachHistoyuser = document.getElementById("serachHistoy-user");

serachHistoyuser.addEventListener("click", () => {
  const searchContainer = document.getElementById("searchContainer");
  const searchProduct = document.getElementById("searchProduct");
  const showHistory = document.getElementById("showHistory");

  searchContainer.classList.remove("hidden");

  if (searchProduct) {
    searchProduct.innerHTML = ""; //Remove My result Carte
  }
  const getHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  console.log(getHistory);

  localStorage.setItem(
    "searchHistory",
    JSON.stringify([...new Set([...getHistory])])
  );

  const getHistorys = JSON.parse(localStorage.getItem("searchHistory"));
  showHistory.innerHTML = "";

  const uniqueHistory = [...new Set(getHistorys)];
  console.log(uniqueHistory);

  uniqueHistory.forEach((searchItem) => {
    showHistory.innerHTML += `
      <div class="flex justify-between items-center py-6 history-item gap-3">
        <p class="text-gray-500 text-lg">${searchItem}</p>
        <button
          class="border border-gray-600 text-gray-600 rounded-[9px] w-[25px] h-[25px] flex items-center justify-center delete-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </button>
      </div>
    `;
  });

  // Add event listeners for delete buttons
  document.querySelectorAll(".delete-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      const updatedHistory = uniqueHistory.filter((_, i) => i !== index);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      button.parentElement.remove();
    });
  });

  // Clear all functionality
  const ClearALL = document.getElementById("clearAll");
  ClearALL.addEventListener("click", () => {
    localStorage.setItem("searchHistory", JSON.stringify([]));
    showHistory.innerHTML = "";
  });
});
