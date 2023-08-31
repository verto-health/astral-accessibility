window.onload = function() {
  const scriptElement = document.createElement("script");
  scriptElement.src = "https://astral-accessibility.pages.dev/main.js";
  document.head.prepend(scriptElement);
};
initializeAstral()