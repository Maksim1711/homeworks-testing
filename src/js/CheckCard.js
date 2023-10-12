export default class CheckCard {
  constructor(cardNumber) {
    this.card = cardNumber;
  }

  checkValidity() {
    return { validity: this.validLuhn(), paySystem: this.checkPaySystem() };
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
      mir: {
        name: "Mir",
        issuer: "mir",
        pattern: /^(22)/,
      },
      visa: {
        name: "Visa",
        issuer: "visa",
        pattern: /^4/,
      },
      mastercard: {
        name: "Mastercard",
        issuer: "mastercard",
        pattern: /^(51|52|53|54|55|22[2-9]|271|272)/,
      },
      "american-express": {
        name: "American Express",
        issuer: "american-express",
        pattern: /^(34|37)/,
      },
      "diners-club": {
        name: "Diners Club",
        issuer: "diners-club",
        pattern: /^(30|36)/,
      },
      discover: {
        name: "Discover",
        issuer: "discover",
        pattern: /^(60|622[1-3]|64|65)/,
      },
      jcb: {
        name: "JCB",
        issuer: "jcb",
        pattern: /^35[2-8]/,
      },
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
