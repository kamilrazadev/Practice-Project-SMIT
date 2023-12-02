const username = document.getElementById("username");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const cPass = document.getElementById("cpassword");
const errorMessage = document.getElementById("error-message");
const passwordError = document.getElementById("password-error");

let DatabaseUsers = JSON.parse(localStorage.getItem("users")) || [];

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
    passwordError.innerText = "Password and Confirm Password must be same";
  } else {
    passwordError.innerText = "";
  }
};

function signupHandler() {
  if (
    username.value == "" ||
    email.value == "" ||
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
  };

  DatabaseUsers.push(user);

  localStorage.setItem("users", JSON.stringify(DatabaseUsers));

  alert("Account Created Successfully!");

  window.location.href = "/login/index.html";
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
    return alert("Wrong Password");
  }

  localStorage.setItem("LoggedInUser", JSON.stringify(checkUser));
  alert("Login Successfully");

  window.location.href = "/homepage/index.html";
}
