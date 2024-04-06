import { countryList } from "./codes.js";

const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

let dropdownSelect = document.querySelectorAll(".dropdown select");

let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");

let msg1 = document.querySelector(".msg1");
let msg2 = document.querySelector(".msg2");

let button = document.querySelector("button");

for (let select of dropdownSelect) {
  for (let currencyCode in countryList) {
    let option = document.createElement("option");
    option.innerHTML = currencyCode;
    option.value = currencyCode;

    if (select.name === "from" && currencyCode === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      option.selected = "selected";
    }
    select.append(option);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

function updateFlag(element) {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;

  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = 1;
  }

  updateMsg(amountValue);
});

window.addEventListener("load", () => {
  updateMsg(1);
});

async function updateMsg(amountValue) {
  let country1 = fromCurrency.value.toLowerCase();
  let country2 = toCurrency.value.toLowerCase();

  let URL = `${BASE_URL}/${country1}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let countryCurrency = data[country1][country2];

  let finalAmount = (countryCurrency * amountValue).toFixed(4);
  msg1.innerText = `${amountValue} ${fromCurrency.value}`;
  msg2.innerText = `${finalAmount} ${toCurrency.value}`;
}
