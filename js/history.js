import { browserBox } from "./index.js";

export let history = [];

let observer = new MutationObserver((mutationList) => {
  console.log(mutationList);
  if (mutationList[0].attributeName == "src") {
    history.push({
      url: browserBox.src
    });
  }

  console.log(history);
});

export function enableHistory() {
  observer.observe(browserBox, { attributes: true });
}

export function disableHistory() {
  observer.disconnect();
}
