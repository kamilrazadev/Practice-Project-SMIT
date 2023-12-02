const username = document.getElementById("username");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const cPass = document.getElementById("cpassword");

console.log(
  (document.getElementsByTagName("body")[0].style.backgroundColor = "black")
);

let DatabaseUsers = JSON.parse(localStorage.getItem("users")) || [];

const toTitleCase = (name) => {
  var words = name.split(" ");

  for (var i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].substring(1).toLowerCase();
  }

  var titleCaseName = words.join(" ");

  return titleCaseName;
};

function signupHandler() {
  if (
    username.value == "" ||
    email.value == "" ||
    pass.value == "" ||
    cPass.value == ""
  ) {
    return alert("All fields are required!");
  }

  if (pass.value.length < 7) {
    return alert("Password must be 8 characters long");
  }

  if (pass.value != cPass.value) {
    return alert("Passowrd and Confirm Password must be same");
  }

  const checkUser = DatabaseUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  if (checkUser) {
    return alert("Account already exists! Login to Continue");
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
    return alert("All fields are required!");
  }

  if (pass.value.length < 7) {
    return alert("Password must be 8 characters long");
  }

  const checkUser = DatabaseUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  if (!checkUser) {
    return alert("Account not exists!");
  }

  if (checkUser.password != pass.value) {
    return alert("Wrong Password");
  }

  localStorage.setItem("LoggedInUser", JSON.stringify(checkUser));
  alert("Login Successfully");

  window.location.href = "/homepage/index.html";
}