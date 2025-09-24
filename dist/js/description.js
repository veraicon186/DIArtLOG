document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".description").forEach(desc => {
    const btn = desc.querySelector(".toggle-btn");
    btn.addEventListener("click", () => {
      desc.classList.toggle("expanded");
      btn.textContent = desc.classList.contains("expanded") ? "méně" : "více";
    });
  });
});
