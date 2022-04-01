import { renderSuggestions, getSuggestions, search } from "./search.js";

// DOM references
let toolbarBox = document.getElementById("toolbar-box");
let searchBox = document.getElementById("search-box");
let goBtn = document.getElementById("go-btn");
let fullscreenBtn = document.getElementById("fullscreen-btn");

let browserBox = document.getElementById("browser-box");

export { toolbarBox, browserBox, searchBox };
import { resizeBrowser } from "./resize.js";

goBtn.onclick = go;

window.onresize = resizeBrowser(window.innerHeight);

function go() {
  let isExpression = searchBox.value.search(/^http(s)?:\/\//);
  if (isExpression !== -1) {
    // Redirect
    browserBox.src = searchBox.value;
  } else if (searchBox.value.search(/^(\w*\.)*\w+\.[a-z]{2,}(?:\/?[\w-]+\/?)*$/) !== -1) {
    // Append protocol and redirect
    browserBox.src = `http://${searchBox.value}`;
  } else {
    // Search
    search(searchBox.value);
  }
}

// searchBox.onkeypress = function(event) {
//   var key = event.which || event.keyCode;
//   if (key == 13) {
//     go();
//   }
// }


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
