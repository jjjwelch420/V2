// Favicon
const icon = document.createElement("link");
icon.rel = "icon";
icon.href = window.PATHS.favicon;
document.head.appendChild(icon);

// Only load launcher CSS on main screen
if (!window.location.search.includes("page=")) {
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = window.PATHS.css;
  document.head.appendChild(css);
}

// Always load launcher.js
const script = document.createElement("script");
script.defer = true;
script.src = window.PATHS.js;
document.head.appendChild(script);
// Always load frame.css
const frameCss = document.createElement("link");
frameCss.rel = "stylesheet";
frameCss.href = window.PATHS.frameCss;
document.head.appendChild(frameCss);

