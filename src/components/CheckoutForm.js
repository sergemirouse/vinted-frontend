import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ title, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const total = (price + (price * 10) / 100 + (price * 20) / 100).toFixed(2);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      console.log(stripeToken);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="payment-form">
      <form className="payment-container" onSubmit={handleSubmit}>
        <p className="payment-title">Résumé de la commande</p>
        <div className="content">
          <div className="amount-lines">
            <p className="first-part-line">Commande</p>
            <p className="first-part-line">{price.toFixed(2)} €</p>
          </div>
          <div className="amount-lines">
            <p className="first-part-line">Frais protection acheteurs</p>
            <p className="first-part-line">
              {((price * 10) / 100).toFixed(2)} €
            </p>
          </div>
          <div className="amount-lines">
            <p className="first-part-line">Frais de port</p>
            <p className="first-part-line">
              {((price * 20) / 100).toFixed(2)} €
            </p>
          </div>
        </div>
        <div className="total-container">
          <div>
            <div className="amount-lines">
              <p className="bold">Total</p>
              <p className="bold">{total} €</p>
            </div>
          </div>
        </div>
        <div className="summary-container">
          <div className="summary">
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir{" "}
              <span className="bold">{title}</span>. Vous allez payer{" "}
              <span className="bold">{total} €</span> (frais de protection et
              frais de port inclus).
            </p>
          </div>
        </div>
        <div>
          <CardElement className="card-number-block" />

          {completed ? (
            <p>Paiement effectué</p>
          ) : (
            <button disabled={isLoading} type="submit">
              Payer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
