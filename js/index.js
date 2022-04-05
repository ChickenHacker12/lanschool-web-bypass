import { renderSuggestions, getSuggestions, search, hideSuggestions } from "./search.js";


// DOM references
// Toolbar
let toolbarBox = document.getElementById("toolbar-box");

// Navigation
let backBtn = document.getElementById("back-btn");
let forwardBtn = document.getElementById("forward-btn");
let refreshBtn = document.getElementById("refresh-btn");
let homeBtn = document.getElementById("home-btn");

// Search
let searchBox = document.getElementById("search-box");
let suggestionsBox = document.getElementById("suggestions-box");
let goBtn = document.getElementById("go-btn");

// Other
let fullscreenBtn = document.getElementById("fullscreen-btn");
let openBtn = document.getElementById("open-btn");
let helpBtn = document.getElementById("help-btn");
let helpBox = document.getElementById("help-box");
let closeHelpBtn = document.getElementById("close-help-btn");


// Browser
let browserBox = document.getElementById("browser-box");
const homeUrl = browserBox.src;

export { toolbarBox, backBtn, forwardBtn, suggestionsBox, browserBox, searchBox, helpBox };
import { resizeBrowser } from "./resize.js";
import { enableHistory, disableHistory, history } from "./history.js";
import { showHelp, hideHelp } from "./help.js";

backBtn.onclick = goBack;
forwardBtn.onclick = goForward;
refreshBtn.onclick = refresh;
homeBtn.onclick = goHome;

searchBox.onfocus = function() {
  searchBox.select();
}
searchBox.oninput = function() {
  let suggestions = getSuggestions(searchBox.value);
  renderSuggestions(suggestions);
}
// searchBox.onblur = hideSuggestions;
goBtn.onclick = go;

helpBtn.onclick = showHelp;
closeHelpBtn.onclick = hideHelp;

window.onresize = resizeBrowser(window.innerHeight);

enableHistory();
// window.onblur = disableHistory;


function goBack() {
  disableHistory();
  browserBox.src = history[history.length - 2].url;
  if (browserBox.src = history[history.length - 2].url) {
    backBtn.setAttribute("disabled", "");
  }
  // console.log(history);
}

function goForward() {
  disableHistory();
  searchBox.value = browserBox.src  = history[history.length - 1].url;
  if (browserBox.src = history[history.length - 1].url) {
    forwardBtn.setAttribute("disabled", "");
  }
}

function refresh() {
  enableHistory();
  browserBox.src = browserBox.src;
}

function goHome() {
  enableHistory();
  browserBox.src = homeUrl;
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

  enableHistory();
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
