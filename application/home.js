// to get all database users

const getAllUsers = () => {
  let allUsers = JSON.parse(localStorage.getItem("users"));
  return allUsers;
};

// to check user logged or not
const isUserExists = localStorage.getItem("LoggedInUser") || false;

// if not logged in redirected to login page
if (!isUserExists) {
  window.location.href = "/userAuthentication/login";
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

// update account details
const username = document.getElementById("username");
const email = document.getElementById("email");
const profileImageInputDiv = document.getElementById("profile-image-input");
const profileImageInput = document.getElementById(
  "profile-image-input"
).firstElementChild;
const profileImage = document.getElementById("profile-image");
const updateImageBtn = document.getElementById("update-profile-btn");

username.disabled = true;
username.value = currentUser.username;
email.value = currentUser.email;

profileImage.src = currentUser.profileImage;
profileImageInputDiv.style.display = "none";

const showprofileImageInput = () => {
  updateImageBtn.style.display = "none";
  profileImageInputDiv.style.display = "flex";
  profileImageInput.focus();
};

const closeProfileImageInput = () => {
  updateImageBtn.style.display = "block";
  profileImageInput.value = "";
  profileImageInputDiv.style.display = "none";
};

const showUsernameInput = () => {
  username.disabled = false;
  username.nextElementSibling.style.display = "none";
  username.focus();
};

const updateAccountDetails = () => {
  const errorMessage = document.getElementById("error-message");

  if (username.value == "") {
    errorMessage.innerText = "Your Name is Required";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (username.value == currentUser.username && profileImageInput.value == "") {
    errorMessage.innerText = "Nothing to Update";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  const updatedUser = {
    email: email.value,
    gender: currentUser.gender,
    password: currentUser.password,
    username: username.value,
    profileImage: profileImageInput.value
      ? profileImageInput.value
      : currentUser.profileImage,
  };

  const allUsers = getAllUsers();

  const userToUpdate = allUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  userToUpdate.email = email.value;
  userToUpdate.username = username.value;
  userToUpdate.profileImage = profileImageInput.value
    ? profileImageInput.value
    : currentUser.profileImage;

  localStorage.setItem("LoggedInUser", JSON.stringify(userToUpdate));

  localStorage.setItem("users", JSON.stringify(allUsers));

  alert("Details updated successfully");

  window.location.href = "/application";
};
