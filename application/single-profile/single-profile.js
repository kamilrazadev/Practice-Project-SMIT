// Loading Logic

const mainSection = document.getElementById("main");
const loader = document.getElementById("loader");

window.onload = () => {
  setTimeout(() => {
    loader.style.display = "none";
    mainSection.style.display = "block";
  }, 500);
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
// setting page title

const titleElem = document.getElementById("page-title");

// setting page title and favicon

titleElem.textContent = currentUser.username;

userNameDisplay.innerText = currentUser ? currentUser.username : "";

// setting user's profile image
const accountIcon = document.getElementById("account-icon");
const accountIcon2 = document.getElementById("account-icon-2");

accountIcon.style.backgroundImage = `url(${currentUser.profileImage})`;
accountIcon2.style.backgroundImage = `url(${currentUser.profileImage})`;

// setting user's name in account details container
const userNameAcc = document.getElementById("acc-username");
const userNameAccSidebar = document.getElementById("acc-username-sidebar");

userNameAcc.innerText = currentUser?.username;

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

// setting main profile image

const mainProfileImage = document.getElementById("main-profile-image");
const mainProfileImageZoomed = document.getElementById(
  "main-profile-image-full"
);

mainProfileImageZoomed.src = currentUser.profileImage;
mainProfileImage.style.backgroundImage = `url(${currentUser.profileImage})`;

document
  .getElementById("acc-details")
  .addEventListener("click", showAccountDetails);

// Show and hide full profile image

const fullProfileImageContainer = document.getElementById(
  "full-profile-container"
);

fullProfileImageContainer.style.transform = "scale(0)";

const showFullProfileImage = () => {
  fullProfileImageContainer.style.transform = "scale(1)";
  setTimeout(() => {
    fullProfileImageContainer.classList.add(
      "bg-[#00000061]",
      "backdrop-blur-[2px]"
    );
  }, 100);
};
mainProfileImage.addEventListener("click", showFullProfileImage);

const hideFullProfileImage = () => {
  fullProfileImageContainer.classList.remove(
    "bg-[#00000061]",
    "backdrop-blur-[2px]"
  );
  fullProfileImageContainer.style.transform = "scale(0)";
};
fullProfileImageContainer.addEventListener("click", hideFullProfileImage);

// loging out
const logoutHandler = () => {
  localStorage.removeItem("LoggedInUser");
  window.location.reload();
};

document
  .getElementById("logout-handler")
  .addEventListener("click", logoutHandler);

// setting users info side bar

const bio = document.getElementById("user-bio");
const email = document.getElementById("user-email-sidebar");
const address = document.getElementById("user-address-sidebar");
const institute = document.getElementById("user-institute-sidebar");
const work = document.getElementById("user-work-sidebar");
const phone = document.getElementById("user-phone-sidebar");

bio.textContent = currentUser.bio
  ? currentUser.bio
  : ("Bio not added", (bio.style.color = "gray"));

currentUser.email
  ? ((email.textContent = currentUser.email),
    (email.href = `mailto:${currentUser.email}`))
  : (email.parentNode.style.display = "none");

currentUser.address
  ? (address.textContent = "Lives in " + currentUser.address)
  : (address.parentNode.style.display = "none");

currentUser.institute
  ? (institute.textContent = "Study at " + currentUser.institute)
  : (institute.parentNode.style.display = "none");

currentUser.work
  ? (work.textContent = "Works at " + currentUser.work)
  : (work.parentNode.style.display = "none");

currentUser.phone
  ? ((phone.textContent = currentUser.phone),
    (phone.href = `tel:${currentUser.phone}`))
  : (phone.parentNode.style.display = "none");
