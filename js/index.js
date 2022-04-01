import { renderSuggestions, getSuggestions, search } from "./search.js";

// DOM references
let toolbarBox = document.getElementById("toolbar-box");
let searchBox = document.getElementById("search-box");
let goBtn = document.getElementById("go-btn");
let fullscreenBtn = document.getElementById("fullscreen-btn");

let browserBox = document.getElementById("browser-box");

export { toolbarBox, browserBox };
import { resizeBrowser } from "./resize.js";

function go() {
  let isExpression = searchBox.value.search(/^http?(s):\/\//);
  if (isExpression !== -1) {
  browserBox.src = searchBox.value;
  } else {
    browserBox.src = "https://bing.com/search?q=" + searchBox.value.replace(/ /g, "+");
  }
  // if (urlBox.value.indexOf("http://") !== -1 || urlBox.value.indexOf("https://") !== -1) {
  // browserBox.src = urlBox.value;
  // } else {
  // 	browserBox.src = "https://bing.com/search?q=" + urlBox.value.replace(/ /g, "+");
  // }
}

// searchBox.onkeypress = function(event) {
//   var key = event.which || event.keyCode;
//   if (key == 13) {
//     go();
//   }
// }

goBtn.onclick = go;
fullscreenBtn.onclick = function() {
  if (browserBox.requestFullscreen) {
    browserBox.requestFullscreen();
  } else if (browserBox.msRequestFullscreen) {
    browserBox.msRequestFullscreen();
  }
}
// Dialog
// function closeDialog(dialog) {
//   dialog.classList.add("hidden");
//   dialog.setAttribute("aria-hidden", "true");
// }
//
// function openDialog(dialog) {
//   dialog.classList.remove("hidden");
//   dialog.removeAttribute("aria-hidden");
// }

// helpBtn.onclick = function () {
//   openDialog(helpBox);
// }
//
// closeHelpBtn.onclick = function () {
//   closeDialog(helpBox);
// }

window.onresize = resizeBrowser(window.innerHeight);
