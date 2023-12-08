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

// setting items to post modal
const postUserImage = document.getElementById("account-icon-post");
const postUsername = document.getElementById("exampleModalLabel");

postUserImage.src = currentUser.profileImage;
postUsername.innerText = currentUser.username;

// loging out
const logoutHandler = () => {
  localStorage.removeItem("LoggedInUser");
  window.location.reload();
};

document
  .getElementById("logout-handler")
  .addEventListener("click", logoutHandler);

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

document
  .getElementById("acc-details")
  .addEventListener("click", showAccountDetails);

// setting posts

const setAllPosts = () => {
  const postsContainer = document.getElementById("posts-container");

  const allPosts = JSON.parse(localStorage.getItem("posts")) || false;

  if (!allPosts) {
    postsContainer.style.color = "grey";
    postsContainer.innerHTML = "<br/>No Post Available";
  } else {
    postsContainer.innerHTML = "";
    allPosts.forEach((post) => {
      postsContainer.innerHTML += `
      <div class="p-2">
                <div class="min-w-[600px] max-w-[90%]  p-5 !w-fit rounded-lg shadow-md bg-white">
                    <div class="flex gap-3 mb-2">
                        <div
                            style="background-image: url(${
                              post.user.profileImage
                            });"
                            class="w-[40px] h-[40px] rounded-full bg-cover bg-center">
                        </div>

                        <div>
                            <p class="font-semibold">${post.user.username}</p>
                            <p class="text-gray-600 text-[12px]">${
                              post.postDate
                            }</p>
                        </div>
                    </div>
                    <p class="my-2">${post.postDesc}</p>

                    ${
                      post.postImage == ""
                        ? "<div></div>"
                        : `<img class='w-full h-auto' src='${post.postImage}' alt='post image'>`
                    }

                    <div class="mt-3 flex justify-between">
                        <div class="flex gap-2 align-items-center">
                            <i class="fas fa-thumbs-up text-blue-600"></i>
                            <p class="text-gray-600 text-sm" id="like-counts">${
                              post.likes.length
                            }</p>
                            <p class="text-[14px] text-gray-500">liked by names here</p>
                        </div>
                        <div class="flex gap-2">
                            <i class="far fa-comment-dots"></i>
                            <p class="text-gray-600 text-sm" id="like-counts">${
                              post.comments.length
                            }</p>
                        </div>
                    </div>

                    <div class="flex justify-between pt-2 mt-3 px-10 text-xl text-gray-600 border-t-2">
                        <div title="Like Post" class="scale-75 sm:scale-100 flex items-center gap-2 cursor-pointer" onclick="postLiked(${
                          post.id
                        })">
                            <i class="far fa-thumbs-up"></i>
                            <p class="text-base">Like</p>
                        </div>
                        <div title="Comment" class="scale-75 sm:scale-100 flex items-center gap-2 cursor-pointer">
                            <i class="far fa-comment-dots"></i>
                            <p class="text-sm">Comment</p>
                        </div>
                        <div title="Share Post" class="scale-75 sm:scale-100 flex items-center gap-2 cursor-pointer">
                            <i class="fas fa-share"></i>
                            <p class="text-base">Share</p>
                        </div>
                    </div>
                </div>
            </div>
      `;
    });
  }
};

setAllPosts();

// set post date and time

const postDateTime = () => {
  const date = new Date();

  const postDate = [date.getDate(), date.getMonth(), date.getFullYear()];
  const postDateString = postDate.join(" / ");

  const postTime = [
    date.getHours() > 12
      ? date.getHours() - 12
      : date.getHours() == 0
      ? "12"
      : date.getHours(),
    date.getMinutes(),
  ];
  let postTimeString = postTime.join(":");

  postTimeString += date.getHours() >= 12 ? "pm" : "am";

  const postDateAndTime = postDateString + " - " + postTimeString;

  return postDateAndTime;
};

const enablePostBtn = (elem) => {
  const postBtn =
    elem.parentNode.nextElementSibling.firstElementChild.nextElementSibling;
  if (elem.value == "") {
    postBtn.style.backgroundColor = "#93C5FD";
    postBtn.disabled = true;
  } else {
    postBtn.style.backgroundColor = "#1D4ED8";
    postBtn.disabled = false;
  }
};

// Adding post

const setPost = () => {
  const postDesc = document.getElementById("post-desc");
  const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

  const post = {
    id: allPosts.length + 1,
    user: {
      username: currentUser.username,
      email: currentUser.email,
      profileImage: currentUser.profileImage,
    },
    postDate: postDateTime(),
    postDesc: postDesc.value,
    postImage: "",
    likes: [],
    comments: [],
  };

  allPosts.push(post);

  localStorage.setItem("posts", JSON.stringify(allPosts));
  setTimeout(() => {
    setAllPosts();
  }, 2000);
};

// Like The Post

const postLiked = (postId, thisElem) => {
  console.log(thisElem);
  const allPosts = JSON.parse(localStorage.getItem("posts"));

  const postLiked = allPosts.find((post) => {
    if (post.id == postId) return post;
  });

  const alreadyLiked = postLiked.likes.find((likeBy) => {
    if (likeBy == currentUser.email) return likeBy;
  });

  if (alreadyLiked) {
    const indexOfUser = postLiked.likes.indexOf(alreadyLiked);
    postLiked.likes.splice(indexOfUser, 1);
  } else {
    postLiked.likes.push(currentUser.email);
  }

  localStorage.setItem("posts", JSON.stringify(allPosts));

  setAllPosts();
};

document.getElementById("post-btn").addEventListener("click", setPost);
