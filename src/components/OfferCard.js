import { Link } from "react-router-dom";

const OfferCard = ({ offerInfos }) => {
  //   console.log(props);
  return (
    // <p>salut</p>
    <Link
      to={`/offer/${offerInfos._id}`}
      style={{ textDecoration: "none", color: "" }}
    >
      <article>
        <div className="offer-card-head">
          {offerInfos.owner.account.avatar && (
            <img
              style={{
                height: 30,
                width: 30,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={offerInfos.owner.account.avatar.secure_url}
              alt="owner"
            />
          )}
          <span style={{ fontSize: 12 }} className="profile-name">
            {offerInfos.owner.account.username}
          </span>
        </div>
        <img
          src={offerInfos.product_image.secure_url}
          alt="product"
          style={{ height: 360, width: 234, objectFit: "cover" }}
        />
        <p style={{ fontSize: 14, color: "black" }}>
          {offerInfos.product_price} €
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            fontSize: 12,
          }}
        >
          {offerInfos.product_details.map((detail, index) => {
            if (detail.TAILLE) {
              return <p key={index}>{detail.TAILLE}</p>;
            } else if (detail.MARQUE) {
              return <p key={index}>{detail.MARQUE}</p>;
            } else {
              return null;
            }
          })}
        </div>
      </article>
    </Link>
  );
};

export default OfferCard;
