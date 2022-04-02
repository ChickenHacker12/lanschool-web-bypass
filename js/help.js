import {toolbarBox, browserBox, helpBox } from "./index.js";

export function showHelp() {
  toolbarBox.classList.add("d-none");
  browserBox.classList.add("d-none");
  helpBox.classList.remove("d-none");
}

export function hideHelp() {
  toolbarBox.classList.remove("d-none");
  browserBox.classList.remove("d-none");
  helpBox.classList.add("d-none");
}
