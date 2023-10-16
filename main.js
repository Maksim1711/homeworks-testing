/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/CheckCard.js
class CheckCard {
  constructor(cardNumber) {
    this.card = cardNumber;
  }
  checkValidity() {
    return {
      validity: this.validLuhn(),
      paySystem: this.checkPaySystem()
    };
  }
  validLuhn() {
    let value = this.card;
    if (/[^0-9-\s]+/.test(value)) return false;
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;
    value = value.replace(/\D/g, "");
    for (let n = value.length - 1; n >= 0; n -= 1) {
      const cDigit = value.charAt(n);
      nDigit = parseInt(cDigit, 10);
      if (bEven) {
        nDigit *= 2;
        if (nDigit > 9) {
          nDigit -= 9;
        }
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return nCheck % 10 === 0;
  }
  checkPaySystem() {
    const paySystems = {
      visa: {
        name: "Visa",
        alias: "visa",
        pattern: /^4/
      },
      mastercard: {
        name: "Mastercard",
        alias: "mastercard",
        pattern: /^(51|52|53|54|55|22[2-9]|271|272)/
      },
      "american-express": {
        name: "American Express",
        alias: "american-express",
        pattern: /^(34|37)/
      },
      "diners-club": {
        name: "Diners Club",
        alias: "diners",
        pattern: /^(30|36)/
      },
      discover: {
        name: "Discover",
        alias: "discover",
        pattern: /^(60|622[1-3]|64|65)/
      },
      jcb: {
        name: "JCB",
        alias: "jcb",
        pattern: /^35[2-8]/
      },
      mir: {
        name: "Mir",
        alias: "mir",
        pattern: /^(22)/
      }
    };
    if (this.validLuhn()) {
      for (const system in paySystems) {
        if (paySystems[system].pattern.test(this.card)) {
          return paySystems[system];
        }
      }
    }
    return null;
  }
}
;// CONCATENATED MODULE: ./src/js/Validator.js

class Validator {
  constructor(element) {
    this.form = element.querySelector(".card_form");
    this.input = element.querySelector(".card_input");
    this.validityElement = element.querySelector(".card_info .validity");
    this.paymentElement = element.querySelector(".card_info .pay_system");
    this.validation = this.validation.bind(this);
  }
  init() {
    this.form.addEventListener("submit", this.validation);
  }
  validation(event) {
    event.preventDefault();
    const checkCard = new CheckCard(this.input.value);
    const cardValidity = checkCard.checkValidity();
    this.showInfo(cardValidity);
  }
  showInfo(cardValidity) {
    this.validityElement.innerText = "validity: ";
    const validityInfo = document.createElement("span");
    if (cardValidity.validity) {
      validityInfo.classList.add("valid");
      validityInfo.innerText = "OK";
      this.validityElement.appendChild(validityInfo);
      this.paymentElement.innerText = "pay system: ";
      const paySystemInfo = document.createElement("span");
      paySystemInfo.innerText = cardValidity.paySystem ? cardValidity.paySystem.name : "unknown";
      this.paymentElement.appendChild(paySystemInfo);
      if (cardValidity.paySystem) {
        const paySystemImage = document.createElement("img");
        paySystemImage.classList.add("logo");
        paySystemImage.src = `src/img/${cardValidity.paySystem.alias}.png`;
        this.paymentElement.appendChild(paySystemImage);
      }
    } else {
      validityInfo.classList.add("invalid");
      validityInfo.innerText = "INVALID";
      this.validityElement.appendChild(validityInfo);
      this.paymentElement.innerText = "";
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const validator = new Validator(document.querySelector(".validator"));
validator.init();
;// CONCATENATED MODULE: ./src/licenses.txt
/* harmony default export */ const licenses = (__webpack_require__.p + "licenses.txt");
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;