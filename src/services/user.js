import { API_BASE_URL, API_KEY } from "../../home/services/utils.js";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        api_key: API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("there is a problem");
    }

    const result = await response.json();
    localStorage.setItem("token", result.accessToken);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const isUserLoggedin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }

  return false;
};
