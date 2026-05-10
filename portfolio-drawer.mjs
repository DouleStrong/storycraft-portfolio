const shell = document.querySelector(".portfolio-shell, .researchflow-demo-shell") || document.body;
const openButton = document.querySelector("[data-drawer-open]");
const closeTargets = [...document.querySelectorAll("[data-drawer-close]")];
const drawer = document.querySelector("[data-drawer-panel]");

if (shell && openButton && drawer) {
  const setDrawerState = (isOpen) => {
    shell.classList.toggle("has-drawer-open", isOpen);
    openButton.setAttribute("aria-expanded", String(isOpen));
  };

  openButton.addEventListener("click", () => setDrawerState(true));

  closeTargets.forEach((target) => {
    target.addEventListener("click", () => setDrawerState(false));
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setDrawerState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setDrawerState(false);
    }
  });
}
