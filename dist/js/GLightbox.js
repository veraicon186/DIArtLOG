import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

document.addEventListener("DOMContentLoaded", () => {
  GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
  });
});
