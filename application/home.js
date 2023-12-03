// to check user logged or not
const isUserExists = localStorage.getItem("LoggedInUser") || false;

// if not logged in redirected to login page
if (!isUserExists) {
  window.location.href = "../userAuthentication/login";
}

// setting user's name
const userNameDisplay = document.getElementById("username-span");
const currentUser = JSON.parse(isUserExists);
userNameDisplay.innerText = currentUser ? currentUser.username : "";

// setting user's profile image
const accountIcon = document.getElementById("account-icon");
const accountIcon2 = document.getElementById("account-icon-2");
accountIcon.src =
  currentUser.profileImage == ""
    ? "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
    : currentUser.profileImage;

accountIcon2.src =
  currentUser.profileImage == ""
    ? "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
    : currentUser.profileImage;

// setting user's name in account details container
const userNameAcc = document.getElementById("acc-username");
userNameAcc.innerText = currentUser?.username;

// loging out
const logoutHandler = () => {
  localStorage.removeItem("LoggedInUser");
  window.location.reload();
};

// show account details/actions container

const showAccountDetails = () => {
  const accoutnDetails = document.getElementById("account-container");
  if (accoutnDetails.classList.contains("hidden")) {
    accoutnDetails.classList.remove("hidden");
    accoutnDetails.classList.add("flex");
  } else {
    accoutnDetails.classList.add("hidden");
    accoutnDetails.classList.remove("flex");
  }
};
