document.addEventListener("DOMContentLoaded", function () {
  const burgerIcon = document.getElementById("burger-icon");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-list a");
  const overlay = document.getElementById("overlay");

  function toggleMenu() {
    nav.classList.toggle("nav-active");
    nav.classList.remove("nav-hidden");
    burgerIcon.classList.toggle("burger-icon-active");
    overlay.classList.toggle("active");

    if (nav.classList.contains("nav-active")) {
      document.body.style.overflow = "hidden";
      navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    } else {
      document.body.style.overflow = "";
      navLinks.forEach((link) => link.removeEventListener("click", closeMenu));
    }
  }

  function closeMenu() {
    nav.classList.remove("nav-active");
    burgerIcon.classList.remove("burger-icon-active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
  burgerIcon.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      nav.classList.add("nav-hidden");
      closeMenu();
    } else {
      nav.classList.remove("nav-hidden");
    }
  });

  // ==========================================================

  const BTN_RIGHT = document.getElementById("button-arrow-right");
  const BTN_LEFT = document.getElementById("button-arrow-left");
  const CAROUSEL = document.getElementById("carousel");
  const LEFT_CARDS = document.getElementById("left-cards");
  const RIGHT_CARDS = document.getElementById("right-cards");
  const ACTIVE_CARDS = document.getElementById("active-cards");
  let petsData = [];

  fetch("../../materials/pets.json")
    .then((response) => response.json())
    .then((jsonData) => {
      petsData = jsonData;
      initCarousel();
    });

  const randomNumbers = (min, max) => {
    let limit;
    if (window.innerWidth <= 767) {
      limit = 1;
    } else if (window.innerWidth <= 1080) {
      limit = 2;
    } else {
      limit = 3;
    }

    let numbers = new Set();
    while (numbers.size < limit) {
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(num);
    }
    return [...numbers];
  };

  const createCardTemplate = (i) => {
    const card = document.createElement("div");
    card.classList.add("pets-content-slider-card");
    card.id = i;
    return card;
  };

  const fillWithRandomCards = (container) => {
    container.innerHTML = "";
    let numbersArr = randomNumbers(0, petsData.length - 1);

    numbersArr.forEach(function (i) {
      const card = createCardTemplate(i);

      card.innerHTML = `
          <img src="${petsData[i].img}" alt="${petsData[i].name}" class="pets-content-slider-card-img">
          <p class="pets-content-slider-card-name">${petsData[i].name}</p>
          <button class="pets-content-slider-card-button">Learn more</button>
        `;
      container.appendChild(card);
    });
  };

  const initCarousel = () => {
    fillWithRandomCards(LEFT_CARDS);
    fillWithRandomCards(ACTIVE_CARDS);
    fillWithRandomCards(RIGHT_CARDS);
  };

  const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
  };

  const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
  };

  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);

  CAROUSEL.addEventListener("animationend", (animationEvent) => {
    let changedCards;

    if (animationEvent.animationName === "move-left") {
      CAROUSEL.classList.remove("transition-left");
      changedCards = LEFT_CARDS;
      document.querySelector("#active-cards").innerHTML = LEFT_CARDS.innerHTML;
    } else {
      CAROUSEL.classList.remove("transition-right");
      changedCards = RIGHT_CARDS;
      document.querySelector("#active-cards").innerHTML = RIGHT_CARDS.innerHTML;
    }

    fillWithRandomCards(changedCards);

    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
  });

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  window.onresize = debounce(initCarousel, 700);

  //===============================================================

  const sliderCards = document.querySelectorAll(".pets-content-slider-card");
  const popup = document.querySelector(".popup");
  const popup_overlay = document.getElementById("popup-overlay");
  const sliderContainer = document.querySelector(".pets-content-slider");
  const popup_window = document.querySelector(".popup-window");
  const popup_close_btn = document.querySelector(".popup-close-btn");

  sliderContainer.addEventListener("click", (event) => {
    let card = event.target.closest(".pets-content-slider-card");
    if (!card) return;
    let id = card.id;
    let popupPet = petsData.find((cart) => cart.id == id);
    console.log(popupPet);
    openPopup(popupPet);
  });

  function createPopup(arr) {
    popup_window.innerHTML = `<img src="${arr.img}" alt="${arr.name}" class="popup-img">
                <div class="popup-window-text-container">
                    <h3 class="h3-popup">${arr.name}</h3>
                    <h4 class="h4-popup">${arr.type} - ${arr.breed}</h4>
                    <p class="popup-text">${arr.description}</p>
                    <ul class="popup-list">
                        <li class="popup-list-item"><p class="popup-list-item-text"><span class="popup-span">Age:</span> ${arr.age}</p></li>
                        <li class="popup-list-item"><p class="popup-list-item-text"><span class="popup-span">Inoculations:</span> ${arr.inoculations}</p></li>
                        <li class="popup-list-item"><p class="popup-list-item-text"><span class="popup-span">Diseases:</span> ${arr.diseases}</p></li>
                        <li class="popup-list-item"><p class="popup-list-item-text"><span class="popup-span">Parasites:</span> ${arr.parasites}</p></li>
                    </ul>
                </div>`;
  }

  function openPopup(pet) {
    createPopup(pet);
    popup.classList.add("popup-open");
    popup_overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closePopup() {
    popup.classList.remove("popup-open");
    popup_overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  popup_close_btn.addEventListener("click", () => closePopup());

  document.addEventListener("click", (event) => {
    if (event.target == popup) {
      closePopup();
    }
  });
});
