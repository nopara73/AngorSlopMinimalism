const stage = document.querySelector("#stage");
const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && stage) {
  const updatePointer = (event) => {
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    stage.style.setProperty("--pointer-x", `${x}%`);
    stage.style.setProperty("--pointer-y", `${y}%`);
  };

  stage.addEventListener("pointermove", updatePointer);
  stage.addEventListener("pointerleave", () => {
    stage.style.setProperty("--pointer-x", "50%");
    stage.style.setProperty("--pointer-y", "50%");
  });
}

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}
