import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({token}) => {
  const location = useLocation();
  const { title, price } = location.state;

  //   console.log(title);
  //   console.log(price);
  return token ? (
    <div>
      <span>{title}</span>
      <span>{price}</span>
      <Elements stripe={stripePromise}>
        <CheckoutForm className="payment-wrapper" title={title} price={price} />
      </Elements>
    </div>
  ) : (<Navigate to="/login" />)
};

export default Payment;
