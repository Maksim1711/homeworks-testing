/**
 * @jest-environment jsdom
 */
import CheckCard from "../CheckCard";

test("card validity ok", () => {
  const cardToTest = "371449635398431";
  const checkCard = new CheckCard(cardToTest);
  expect(checkCard.validLuhn()).toBeTruthy();
});

test("card validity invalid", () => {
  const cardToTest = "37144963539843";
  const checkCard = new CheckCard(cardToTest);
  expect(checkCard.validLuhn()).toBeFalsy();
});

test("card PaymentSystem ok", () => {
  const cardToTest = "371449635398431";
  const checkCard = new CheckCard(cardToTest);
  expect(checkCard.checkPaySystem().name).toBe("American Express");
});

test("card PaymentSystem invalid", () => {
  const cardToTest = "37144963539843";
  const checkCard = new CheckCard(cardToTest);
  expect(checkCard.checkPaySystem()).toBe(null);
});
