import { ACCESS_TOKEN, API_BASE_URL, API_KEY } from "./utils.js";

export async function getProductsList(brand) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/records/products${
        brand !== "ALL" ? `?filterKey=brand&filterValue=${brand}` : ""
      }`,
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

    return result;
  } catch (error) {
    console.log(`from catch: ${error.message}`);
  }
}
