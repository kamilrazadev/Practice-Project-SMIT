const username = document.getElementById("username");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const pass = document.getElementById("password");
const cPass = document.getElementById("cpassword");
const errorMessage = document.getElementById("error-message");
const passwordError = document.getElementById("password-error");

email.value = "@gmail.com";

// Show and Hide Password
function password_show_hide(elem) {
  var x = elem.previousElementSibling;
  var show_eye = elem.children[0];
  var hide_eye = elem.children[1];
  hide_eye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "password";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
}

// Login Handler

function loginHandler() {
  const email = document.getElementById("email");
  const pass = document.getElementById("password");

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

  window.location.href = "../../application";
}

document
  .getElementById("login-handler")
  .addEventListener("click", loginHandler);
