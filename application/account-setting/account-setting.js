// to check user logged or not
const isUserExists = localStorage.getItem("LoggedInUser") || false;

const currentUser = JSON.parse(isUserExists);

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

profileImage.style.backgroundImage = `url(${currentUser.profileImage})`;
profileImageInputDiv.style.display = "none";

// setting account icon
const userProfile = document.getElementById("account-bar");
const userProfileImage = document.getElementById("account-icon");
const userName = document.getElementById("usernameAcc");
userProfile.style.display = "none";

if (isUserExists) {
  email.value = currentUser.email;

  userProfile.style.display = "flex";
  userProfileImage.style.backgroundImage = `url(${currentUser.profileImage})`;
  userName.innerText = currentUser.username;
}

// if not logged in redirected to login page
if (!isUserExists) {
  window.location.href = "/userAuthentication/login";
}

// to get all database users

const getAllUsers = () => {
  let allUsers = JSON.parse(localStorage.getItem("users"));
  return allUsers;
};

// update account details
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
