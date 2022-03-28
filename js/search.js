function renderSuggestions(suggestions) {
  suggestionBox.innerHTML = null;
  suggestions.forEach(function (suggestion) {
    console.log(suggestion);
    let suggestionSectionBox = document.createElement("div");
    let suggestionHeader = document.createElement("h3");
    suggestionHeader.className = "dropdown-header";
    suggestionSectionBox.appendChild(suggestionHeader);
    suggestionHeader.innerText = suggestion.name;
    let suggestionLink = document.createElement("buttion");
    suggestionLink.className = "dropdown-item";
    suggestionLink.innerHTML = suggestion.result;
    suggestionSectionBox.appendChild(suggestionLink);
    // suggestionBox.innerHTML = `
    // <h3 class="dropdown-header">${suggestion}</h3>
    // <li class="dropdown-item">${suggestion.keys()[0]}</li>
    // `;
    suggestionBox.appendChild(suggestionSectionBox);
    suggestionBox.classList.add("d-block");
  });
}

function getSuggestions(inputString) {
  let suggestions = [];
  if (inputString.search(/(\.[a-z]{2,})$/) !== -1) {
    // URL
    suggestions.push({ name: "URL", result: `http://${inputString}` });
  }
  if (inputString.search(/\d+ [*\/+-] \d+/) !== -1) {
    // expression
    let sourceName = "Calculator";
    let operator = inputString.match(/[*\/+-]/)[0];
    let numbers = inputString.split(/[*\/+-]/);
    let a = parseFloat(numbers[0]);
    let b = parseFloat(numbers[1]);
    let result;
    switch (operator) {
      case "*":
        result = a * b;
        break;
      case "/":
        result = b === 0 ? "undefined" : a / b;
        break;
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      default:
        result = "Math error";
    }

    suggestions.push({ name: sourceName, result });
  }

  return suggestions;
}
