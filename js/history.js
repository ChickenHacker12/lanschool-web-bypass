import { backBtn, forwardBtn, searchBox, browserBox } from "./index.js";

export let history = [];

let observer = new MutationObserver((mutationList) => {
  console.log(mutationList);
  if (mutationList[0].attributeName == "src") {
    // Update
    history.push({
      url: browserBox.src
    });
    // Update URL
    searchBox.value = browserBox.src;
  }

  // Check length
  if (history.length >= 2) {
    // Enable
    backBtn.removeAttribute("disabled");
    forwardBtn.removeAttribute("disabled");
  } else {
    // Disable
    backBtn.setAttribute("disabled", "");
    forwardBtn.setAttribute("disabled", "");
  }

  console.log(history);
});

export function enableHistory() {
  observer.observe(browserBox, { attributes: true });
}

export function disableHistory() {
  observer.disconnect();
}
