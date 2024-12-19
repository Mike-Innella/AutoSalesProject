const openModal = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("contactModal");
const backdrop = document.querySelector(".modal__backdrop");

// Open Modal
openModal.addEventListener("click", () => {
  modal.classList.add("active");
  backdrop.classList.add("active");
});

// Close Modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  backdrop.classList.remove("active");
});

// Close Modal when clicking backdrop
backdrop.addEventListener("click", () => {
  modal.classList.remove("active");
  backdrop.classList.remove("active");
});
