import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ title, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

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
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form style={{ width: "300px", marginTop: "52px" }} onSubmit={handleSubmit}>
      <p>Résumé de la commande</p>
      <section className="price-lines">
        <div className="price-line">
          <span>Commande</span>
          <span id="price">{price.toFixed(2)} €</span>
        </div>
        <div className="price-line">
          <span>Frais protection acheteurs</span>
          <span id="insurance">{((price * 10) / 100).toFixed(2)} €</span>
        </div>
        <div className="price-line">
          <span>Frais de port</span>
          <span id="travel-fees">{((price * 20) / 100).toFixed(2)} €</span>
        </div>
      </section>
      <section>
        <div>
          <span>Total</span>
          <span>{/* ici, je veux mettre le total de la transaction*/} </span>
        </div>
      </section>
      <CardElement />

      {completed ? (
        <p>Paiement effectué</p>
      ) : (
        <button disabled={isLoading} type="submit">
          Payer
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
