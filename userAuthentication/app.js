const username = document.getElementById("username");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const pass = document.getElementById("password");
const cPass = document.getElementById("cpassword");
const errorMessage = document.getElementById("error-message");
const passwordError = document.getElementById("password-error");

// to change user's name into title case
const toTitleCase = (name) => {
  var words = name.split(" ");

  for (var i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].substring(1).toLowerCase();
  }

  var titleCaseName = words.join(" ");

  return titleCaseName;
};

// to check password and confirm password
const matchPasswords = () => {
  if (pass.value != cPass.value) {
    passwordError.innerText = "Not Matching with Password";
  } else {
    passwordError.innerText = "";
  }
};

function signupHandler() {
  if (
    username.value == "" ||
    email.value == "" ||
    gender.value == "" ||
    pass.value == "" ||
    cPass.value == ""
  ) {
    errorMessage.innerText = "All Fields are Required";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (pass.value.length < 7) {
    errorMessage.innerText = "Password must be 8 characters long";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (pass.value != cPass.value) {
    errorMessage.innerText = "Password and Confirm Password must be same";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1800);
    return;
  }

  let DatabaseUsers = JSON.parse(localStorage.getItem("users")) || [];

  const checkUser = DatabaseUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  if (checkUser) {
    errorMessage.innerText = "Account already created! Login to Continue";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  const user = {
    username: toTitleCase(username.value),
    email: email.value,
    password: pass.value,
    gender: gender.value,
    profileImage:
      gender.value == "female"
        ? "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
        : gender.value == "male"
        ? "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
        : "",
  };

  DatabaseUsers.push(user);

  localStorage.setItem("users", JSON.stringify(DatabaseUsers));

  alert("Account Created Successfully!");

  window.location.href = "/userAuthentication/login/index.html";
}

function loginHandler() {
  if (email.value == "" || pass.value == "") {
    errorMessage.innerText = "All Fields are Required";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (pass.value.length < 7) {
    errorMessage.innerText = "Password must be 8 characters long";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  let DatabaseUsers = JSON.parse(localStorage.getItem("users")) || [];

  const checkUser = DatabaseUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  if (!checkUser) {
    errorMessage.innerText = "Account don't exists!";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (checkUser.password != pass.value) {
    errorMessage.innerText = "Wrong Password";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  localStorage.setItem("LoggedInUser", JSON.stringify(checkUser));
  alert("Login Successfully");

  window.location.href = "../../homepage";
}

// ----------
const isUserExists = localStorage.getItem("LoggedInUser") || false;
const userProfile = document.getElementById("account-bar");
const userProfileImage = document.getElementById("account-icon");
const userName = document.getElementById("username");
userProfile.style.display = "none";

if (isUserExists) {
  const currentUser = JSON.parse(isUserExists);
  email.value = currentUser.email;

  userProfile.style.display = "flex";
  userProfileImage.src = currentUser.profileImage;
  userName.innerText = currentUser.username;
}

const resetPasswordHandler = () => {
  if (email.value == "" || pass.value == "") {
    errorMessage.innerText = "All Fields are Required";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (pass.value.length < 7) {
    errorMessage.innerText = "Password must be 8 characters long";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  let DatabaseUsers = JSON.parse(localStorage.getItem("users")) || [];

  const checkUser = DatabaseUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  if (!checkUser) {
    errorMessage.innerText = "Account don't exists!";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  const updatedUsers = DatabaseUsers.map((user) => {
    if (user.email == email.value) {
      user.password = pass.value;
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(updatedUsers));
  alert("Password Updated Successfully");
};
