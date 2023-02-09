import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Je récupère l'id présent dans l'url
  const params = useParams();
  const id = params.id;
  //   console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div>
          <img
            src={data.product_image.secure_url}
            className="product-img"
            alt="product"
          />
        </div>
        <div className="offer-infos">
          <div>
            <p className="product-price">{data.product_price} €</p>
            {data.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];
              return (
                <div className="product-details" key={index}>
                  <p className="product-key">{key} : </p>
                  <p className="product-key-info">{detail[key]}</p>
                </div>
              );
            })}
          </div>
          <div className="divider"></div>
          <div>
            <p className="product-name">{data.product_name}</p>
            <p className="product-description">{data.product_description}</p>
            <div className="user-infos">
              {data.owner.account.avatar && (
                <img
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={data.owner.account.avatar.secure_url}
                  alt="owner"
                />
              )}
              <span className="offer-username">
                {data.owner.account.username}
              </span>
            </div>
            <div>
              <button className="buy-button">Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
