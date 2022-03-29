import { renderSuggestions, getSuggestions, search } from "./search.js";


//Changing this doesn't make you a 'hacker' :D
var navBox = document.getElementById("nav-box");
var helpBtn = document.getElementById("help-btn");
var closeHelpBtn = document.getElementById("close-help-btn");
var helpBox = document.getElementById("help-box");
var browserBox = document.getElementById("browser-box");
var urlBox = document.getElementById("url-box");
var goBtn = document.getElementById("go-btn");
var fullscreenBtn = document.getElementById("fullscreen-btn");
var iframeBox = document.getElementById("iframe-box");

function go() {
  var isExpression = urlBox.value.search(/^http?(s):\/\//);
  if (isExpression !== -1) {
  iframeBox.src = urlBox.value;
  } else {
    iframeBox.src = "https://bing.com/search?q=" + urlBox.value.replace(/ /g, "+");
  }
  // if (urlBox.value.indexOf("http://") !== -1 || urlBox.value.indexOf("https://") !== -1) {
  // browserBox.src = urlBox.value;
  // } else {
  // 	browserBox.src = "https://bing.com/search?q=" + urlBox.value.replace(/ /g, "+");
  // }
}

urlBox.onkeypress = function(event) {
  var key = event.which || event.keyCode;
  if (key == 13) {
    go();
  }
}

goBtn.onclick = go;
fullscreenBtn.onclick = function() {
  if (browserBox.requestFullscreen) {
    browserBox.requestFullscreen();
  } else if (browserBox.msRequestFullscreen) {
    browserBox.msRequestFullscreen();
  }
}
// Dialog
function closeDialog(dialog) {
  dialog.classList.add("hidden");
  dialog.setAttribute("aria-hidden", "true");
}

function openDialog(dialog) {
  dialog.classList.remove("hidden");
  dialog.removeAttribute("aria-hidden");
}

helpBtn.onclick = function () {
  openDialog(helpBox);
}

closeHelpBtn.onclick = function () {
  closeDialog(helpBox);
}

window.onresize = resizeBrowser();

function resizeBrowser() {
  browserBox.style.height = `${window.innerHeight - navBox.getBoundingClientRect().height}px`;
}
