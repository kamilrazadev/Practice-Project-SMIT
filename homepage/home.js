const userNameDisplay = document.getElementById("username-span");

// to check user logged or not
const isUserExists = localStorage.getItem("LoggedInUser") || false;

if (!isUserExists) {
  window.location.href = "../userAuthentication/login";
}

const currentUser = JSON.parse(isUserExists);

userNameDisplay.innerText = currentUser ? currentUser.username : "";

// loging out
const logoutHandler = () => {
  localStorage.removeItem("LoggedInUser");
  window.location.reload();
};
