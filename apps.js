//MODAL
const openModal = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("contactModal");
const backdrop = document.querySelector(".modal__backdrop");
const landingPage = document.querySelector(".landing__page");
const navBar = document.querySelector(".nav__container");

// Open Modal
openModal.addEventListener("click", () => {
  modal.classList.add("active");
  backdrop.classList.add("active");
  backdrop.style.display = "block";
  backdrop.style.visibility = "visible";
  setTimeout(() => {
    backdrop.style.opacity = "1";
    navBar.style.opacity = "0";
    landingPage.style.opacity = "0";
  }, 200);
});

// Close Modal
closeModalBtn.addEventListener("click", () => {
  backdrop.style.visibility = "hidden";
  modal.classList.remove("active");
  backdrop.classList.remove("active");
  setTimeout(() => {
    backdrop.style.opacity = "0";
  }, 200);
  setTimeout(() => {
    landingPage.style.opacity = "1";
    navBar.style.opacity = "1";
  }, 400);
});

backdrop.addEventListener("click", () => {
  backdrop.style.visibility = "hidden";
  modal.classList.remove("active");
  backdrop.classList.remove("active");
  setTimeout(() => {
    backdrop.style.opacity = "0";
  }, 200);
  setTimeout(() => {
    landingPage.style.opacity = "1";
    navBar.style.opacity = "1";
  }, 400);
});
