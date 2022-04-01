import { renderSuggestions, getSuggestions, search } from "./search.js";


// DOM references
// Toolbar
let toolbarBox = document.getElementById("toolbar-box");
let refreshBtn = document.getElementById("refresh-btn");
let searchBox = document.getElementById("search-box");
let goBtn = document.getElementById("go-btn");
let fullscreenBtn = document.getElementById("fullscreen-btn");
let openBtn = document.getElementById("open-btn");

// Browser
let browserBox = document.getElementById("browser-box");

export { toolbarBox, browserBox, searchBox };
import { resizeBrowser } from "./resize.js";
import { enableHistory, disableHistory, history } from "./history.js";

refreshBtn.onclick = refresh;

goBtn.onclick = go;

window.onresize = resizeBrowser(window.innerHeight);

enableHistory();
// window.onblur = disableHistory;


function refresh() {
  browserBox.src = history[history.length - 1] || browserBox.src;
}

function go() {
  let isExpression = searchBox.value.search(/^http(s)?:\/\//);
  if (isExpression !== -1) {
    // Redirect
    browserBox.src = searchBox.value;
  } else if (searchBox.value.search(/^(\w*\.)*\w+\.[a-z]{2,}(?:\/?[\w-]+\/?)*([\w-]\.[a-z]+)?$/) !== -1) {
    // Append protocol and redirect
    browserBox.src = `http://${searchBox.value}`;
  } else {
    // Search
    search(searchBox.value);
  }
}

searchBox.onkeypress = function(event) {
  let key = event.which || event.keyCode;
  if (key == 13) {
    go();
  }
}

// Fullscreen
fullscreenBtn.onclick = function() {
  if (browserBox.requestFullscreen) {
    browserBox.requestFullscreen();
  } else if (browserBox.msRequestFullscreen) {
    browserBox.msRequestFullscreen();
  }
}

// Open in new tab
openBtn.onclick = function() {
  window.open(browserBox.src, "_blank");
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
