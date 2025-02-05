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
    let numbers = new Set();
    while (numbers.size < 3) {
      let num = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(num);
    }
    return [...numbers];
  };

  const createCardTemplate = () => {
    const card = document.createElement("div");
    card.classList.add("pets-content-slider-card");
    return card;
  };

  const fillWithRandomCards = (container) => {
    container.innerHTML = "";
    let numbersArr = randomNumbers(0, petsData.length - 1);

    numbersArr.forEach(function (i) {
      const card = createCardTemplate();

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
});
