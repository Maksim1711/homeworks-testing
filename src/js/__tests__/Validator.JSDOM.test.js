/**
 * @jest-environment jsdom
 */
import Validator from "../Validator";

test.each([
  ["American Express", "371449635398431", "OK"],
  ["MasterCard", "5555555555554444", "OK"],
  ["Visa", "4111111111111111", "OK"],
  ["Мир", "2202200223948454", "OK"],
  ["Invalid card", "1111122334", "INVALID"],
])("card must be checked", (_, input, expected) => {
  document.body.innerHTML = `<section class="validator">
    <div class="card_info">
      <div class="validity"></div>
      <div class="pay_system"></div>
    </div>
    <form class="card_form">
      <input type="text" class="card_input">
      <button>Click to Validate</button>
    </form>
  </section>`;
  const validator = new Validator(document.querySelector(".validator"));
  validator.init();
  const formInput = document.querySelector(".card_input");
  formInput.value = input;
  const formSubmit = document.querySelector(".card_form button");
  formSubmit.click();
  const validityInfo = document.querySelector(".validity span");
  expect(validityInfo.innerText).toBe(expected);
});

test.each([
  ["American Express", "371449635398431", "American Express"],
  ["MasterCard", "5555555555554444", "Mastercard"],
  ["Visa", "4111111111111111", "Visa"],
  ["Мир", "2202200223948454", "Mir"],
])("payment system must be show", (_, input, expected) => {
  document.body.innerHTML = `<section class="validator">
    <div class="card_info">
      <div class="validity"></div>
      <div class="pay_system"></div>
    </div>
    <form class="card_form">
      <input type="text" class="card_input">
      <button>Click to Validate</button>
    </form>
  </section>`;
  const validator = new Validator(document.querySelector(".validator"));
  validator.init();
  const formInput = document.querySelector(".card_input");
  formInput.value = input;
  const formSubmit = document.querySelector(".card_form button");
  formSubmit.click();
  const paySystemInfo = document.querySelector(".pay_system span");
  expect(paySystemInfo.innerText).toBe(expected);
});
