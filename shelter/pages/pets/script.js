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
  //==========================================================

  fetch("../../materials/pets.json")
    .then((response) => response.json())
    .then((jsonData) => {
      petsData = jsonData;
      console.log(petsData);

      mixedCards = mixCards(petsData, 6);
      mixedCards = [].concat(...mixedCards);
      console.log(mixedCards);

      num_of_pages = Math.ceil(mixedCards.length / cardsPerPage);
      console.log(num_of_pages);

      showPage(1);
    });

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
  // ================================================
  let petsData = [];
  let mixedCards = [];
  let num_of_pages;
  let cardsPerPage = 8;
  let currentPage = 1;
  const cardsContainer = document.querySelector(".cards-container");
  const START_BTN = document.getElementById("start-btn");
  const PREV_BTN = document.getElementById("prev-btn");
  const PAGE_NUMBER = document.getElementById("page-number");
  const NEXT_BTN = document.getElementById("next-btn");
  const END_BTN = document.getElementById("end-btn");

  START_BTN.disabled = currentPage === 1;
  PREV_BTN.disabled = currentPage === 1;
  PAGE_NUMBER.innerHTML = `<span class="button-paginator-text">${currentPage}</span>`;

  function buttonsEnabled() {
    START_BTN.disabled = false;
    START_BTN.classList.remove("button-paginator-inactive");
    START_BTN.classList.add("button-paginator");

    PREV_BTN.disabled = false;
    PREV_BTN.classList.remove("button-paginator-inactive");
    PREV_BTN.classList.add("button-paginator");

    END_BTN.disabled = false;
    END_BTN.classList.remove("button-paginator-inactive");
    END_BTN.classList.add("button-paginator");

    NEXT_BTN.disabled = false;
    NEXT_BTN.classList.remove("button-paginator-inactive");
    NEXT_BTN.classList.add("button-paginator");
  }

  NEXT_BTN.addEventListener("click", () => {
    if (currentPage < num_of_pages) {
      currentPage++;
      PAGE_NUMBER.innerHTML = `<span class="button-paginator-text">${currentPage}</span>`;
      buttonsEnabled();
      if (currentPage === num_of_pages) {
        END_BTN.disabled = true;
        END_BTN.classList.add("button-paginator-inactive");
        END_BTN.classList.remove("button-paginator");

        NEXT_BTN.disabled = true;
        NEXT_BTN.classList.add("button-paginator-inactive");
        NEXT_BTN.classList.remove("button-paginator");
      }
      showPage(currentPage);
    }
  });

  PREV_BTN.addEventListener("click", () => {
    currentPage--;
    PAGE_NUMBER.innerHTML = `<span class="button-paginator-text">${currentPage}</span>`;
    buttonsEnabled();
    if (currentPage === 1) {
      START_BTN.disabled = true;
      START_BTN.classList.add("button-paginator-inactive");
      START_BTN.classList.remove("button-paginator");

      PREV_BTN.disabled = true;
      PREV_BTN.classList.add("button-paginator-inactive");
      PREV_BTN.classList.remove("button-paginator");
    }
    showPage(currentPage);
  });

  START_BTN.addEventListener("click", () => {
    currentPage = 1;
    PAGE_NUMBER.innerHTML = `<span class="button-paginator-text">${currentPage}</span>`;
    buttonsEnabled();
    START_BTN.disabled = true;
    START_BTN.classList.add("button-paginator-inactive");
    START_BTN.classList.remove("button-paginator");

    PREV_BTN.disabled = true;
    PREV_BTN.classList.add("button-paginator-inactive");
    PREV_BTN.classList.remove("button-paginator");
    showPage(currentPage);
  });

  END_BTN.addEventListener("click", () => {
    currentPage = num_of_pages;
    buttonsEnabled();
    END_BTN.disabled = true;
    END_BTN.classList.add("button-paginator-inactive");
    END_BTN.classList.remove("button-paginator");

    NEXT_BTN.disabled = true;
    NEXT_BTN.classList.add("button-paginator-inactive");
    NEXT_BTN.classList.remove("button-paginator");
    PAGE_NUMBER.innerHTML = `<span class="button-paginator-text">${currentPage}</span>`;
    showPage(currentPage);
  });

  function createCards(arr) {
    cardsContainer.innerHTML = "";
    arr.forEach(function (item) {
      const card = createCardTemplate(item.id);
      card.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="pets-content-slider-card-img">
          <p class="pets-content-slider-card-name">${item.name}</p>
          <button class="pets-content-slider-card-button">Learn more</button>
        `;
      cardsContainer.appendChild(card);
    });
  }

  const createCardTemplate = (i) => {
    const card = document.createElement("div");
    card.classList.add("pets-content-slider-card");
    card.id = i;
    return card;
  };

  function mixCards(arr, copies = 6) {
    let result = [];
    for (let i = 0; i < copies; i++) {
      const copy = [...arr];

      copy.sort(() => Math.random() - 0.5);
      result.push(copy);
    }
    return result;
  }

  function showPage(currentPage) {
    let startIndex = (currentPage - 1) * cardsPerPage;
    let endIndex = startIndex + cardsPerPage;
    let cardsSet = mixedCards.slice(startIndex, endIndex);
    console.log(cardsSet);
    return createCards(cardsSet);
  }

  window.addEventListener('resize', function(){
    cardsPerPage = widthSee();
    num_of_pages = Math.ceil(mixedCards.length / itemsPerPage);
});

  function widthSee() {
    let width = window.innerWidth;
    let items = 0;

    if (width <= 639) {
        items = 3;
    } else if (width <= 768) {
        items = 6;
    }
    else {
        items = 8;
    }
    return items;
 }
});
