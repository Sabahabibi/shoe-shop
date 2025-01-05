// import { loginUser } from "../../services/user.js";
import { API_BASE_URL, API_KEY } from "../../services/utils.js";

const loginUser = async (email, password) => {
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

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const signInBtn = document.getElementById("signIn-btn");
console.log(signInBtn);
signInBtn.addEventListener("click", async () => {
  const status = await loginUser(emailInput.value, passwordInput.value);
  console.log(status);
  if (status) {
    location.href = "../home/home.html";
  }
});
