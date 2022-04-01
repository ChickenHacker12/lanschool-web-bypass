import { toolbarBox, browserBox } from "./index.js";

export function resizeBrowser(height) {
  browserBox.style.height = `${height - toolbarBox.getBoundingClientRect().height}px`;
  console.log("RESIZED");
}
