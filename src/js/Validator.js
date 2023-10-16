import CheckCard from "./CheckCard";

export default class Validator {
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
      paySystemInfo.innerText = cardValidity.paySystem
        ? cardValidity.paySystem.name
        : "unknown";
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
