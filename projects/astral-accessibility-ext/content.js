window.onload = function () {
  const scriptElement = document.createElement("script");
  scriptElement.src = "https://astral-accessibility.pages.dev/main.js";
  document.head.append(scriptElement);

  scriptElement.onload = function () {
    const scriptElement2 = document.createElement("script");
    scriptElement2.innerText = "initializeAstral()";
    document.body.appendChild(scriptElement2);
  };
};
