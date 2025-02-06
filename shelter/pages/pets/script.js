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
  let petsData = [];

  fetch("../../materials/pets.json")
    .then((response) => response.json())
    .then((jsonData) => {
      petsData = jsonData;
      console.log(petsData);
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
});
