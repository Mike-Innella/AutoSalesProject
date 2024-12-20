// Global
const openModal = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("contactModal");
const backdrop = document.querySelector(".modal__backdrop");
const landingPage = document.querySelector(".landing__page");
const navBar = document.querySelector(".nav__container");
const form = document.querySelector("#contactForm");
const formData = new FormData(form);
const submitBtn = document.getElementById("submitBtn");
const loadingOverlay = document.querySelector(".overlay--loading");
const successOverlay = document.querySelector(".overlay--success");

// MODAL

(function () {
  emailjs.init("cePFoU8dvsaDAlAyz");
})();

openModal.addEventListener("click", (event) => {
  event.preventDefault();
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

// FORM SUBMISSION

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // Check form validity
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Show loading overlay
  loadingOverlay.classList.remove("hidden");
  loadingOverlay.style.opacity = "1";

  // Send form data via EmailJS
  emailjs.sendForm("service_mygmail", "template_dfltemailtemp", form).then(
    (response) => {
      console.log("Success:", response);

      loadingOverlay.classList.add("hidden");
      successOverlay.classList.remove("hidden");

    },
    (error) => {
      console.log("Error:", error);
      loadingOverlay.classList.add("hidden");
      alert("Something went wrong. Please try again later.");
    }
  );
});
