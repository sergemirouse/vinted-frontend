import { useParams } from "react-router-dom";

const Offer = () => {
  //   const params = useParams();
  //   console.log(params);

  //   Je récupère le params dans l'URL avec useParams
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Je suis sur Offer</h1>
      <p>L' id de l'offre sur laquelle j'ai cliqué est : {id}</p>
    </div>
  );
};

export default Offer;
