// to check user logged or not
const isUserLoggedIn = () => {
  const isUserExists = localStorage.getItem("LoggedInUser") || false;

  if (isUserExists) {
    window.location.href = "./homepage";
  } else {
    window.location.href = "../userAuthentication/login";
  }
};

isUserLoggedIn();
