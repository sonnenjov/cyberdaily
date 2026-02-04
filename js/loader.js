window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("page-loader");
    if (loader) loader.style.display = "none";
  }, 1000); // 1.5 seconds
});
