import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51NFb0NHo0XtniAaJpxVNhZDfQyET3wo8u6fTsbrcjIUxAOGk37SnIrLJ5hE7TxhvJJhmeCiX1NrUjRjFG6KdOjU800EmkQ9iLC');
  }

  return stripePromise;
}

export default getStripe;
