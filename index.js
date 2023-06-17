// HTML FOR POSTS

function instaPost(post) {
  let logoSrc = "";

  if (post.source_type === "facebook") {
    logoSrc = "/icons/facebook.svg";
  } else {
    logoSrc = "/icons/instagram-logo.svg";
  }

  return `
      <div class="card">
        <img class="profile-img" src="${post.profile_image}">
        <div class="profile-name">
          <h5>${post.name}</h5>
          <p class="date">${formatDate(post.date)}</p>
        </div>
        <div class="logo">
          <img class="post-logo" src="${logoSrc}">
        </div>
        <img src="${
          post.image
        }" alt="pic" class="post-image" onclick='imageLightbox("${
    post.image
  }")'>
        <div class="card-content">
          <p>${post.caption}</p>
        </div>
        <div class="card-footer">
          <div class="line"></div>
          <i class="fas fa-heart"></i><p class="likes">${post.likes}</p>  
        </div>
      </div>
    `;
}

// FORMAT DATE

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// GET REQUEST

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const cardContainer = document.querySelector(".cards-container");
    data.slice(0, 4).forEach((post) => {
      const card = instaPost(post);
      cardContainer.innerHTML += card;
    });
  });

//  LOAD MORE BUTTON

const loadMoreBtn = document.querySelector(".load-more-btn");
let cardsLoaded = 0;
loadMoreBtn.addEventListener("click", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const cardContainer = document.querySelector(".cards-container");
      data.slice(cardsLoaded, cardsLoaded + 4).forEach((post) => {
        const card = instaPost(post);
        cardContainer.innerHTML += card;
        cardsLoaded++;
      });
      if (cardsLoaded === data.length) {
        loadMoreBtn.style.display = "none";
      }
    });
});

// LIKES

const cardContainer = document.querySelector(".cards-container");
cardContainer.addEventListener("click", (event) => {
  const heartIcon = event.target.closest(".fa-heart");
  if (heartIcon) {
    const card = heartIcon.closest(".card");
    const likesCounter = card.querySelector(".likes");
    let likesCount = Number(likesCounter.textContent);
    if (heartIcon.classList.contains("active")) {
      likesCount--;
      heartIcon.classList.remove("active");
    } else {
      likesCount++;
      heartIcon.classList.add("active");
    }
    likesCounter.textContent = likesCount;
  }
});

// THEME SWITCHING

const toggleButton = document.getElementById("toggleButton");
const body = document.querySelector("body");

toggleButton.addEventListener("change", () => {
  if (toggleButton.checked) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
});

//IMAGE LIGHTBOX

function imageLightbox(src) {
  var zoomedImage = document.getElementById("zoomed-image");
  const enlargedImage = document.createElement("img");
  enlargedImage.src = src;
  enlargedImage.classList.add("centered-image");
  zoomedImage.innerHTML =
    "<p class='close-lightbox' onclick='removeLighbox()'>X</p>";
  zoomedImage.appendChild(enlargedImage);
  zoomedImage.style.display = "flex";
}

function removeLighbox() {
  var zoomedImage = document.getElementById("zoomed-image");
  zoomedImage.style.display = "none";
}
