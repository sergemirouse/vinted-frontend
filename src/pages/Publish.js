import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Publish({ handleToken, token }) {
  const [picture, setPicture] = useState();
  const [imageToDisplay, setImageToDisplay] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  return (
    <div className="Publish">
      <form
        className="publish-form"
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage("");
          try {
            // Je crée une nouvelle instance du constructeur FormData
            const formData = new FormData();
            // Je rajoute 3 paires clef/valeur à mon formdata
            formData.append("picture", picture);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("price", price);

            // Je donne 3 arguments à axios.post :
            // - L'URL à interroger
            // - le body, ici un formData
            // - Les potentiels headers à envoyer : ici un token et le type du body que j'envoie
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response);
            setImageToDisplay(response.data);
            if (response.data.token) {
              handleToken(response.data.token);
              navigate("/");
            }
          } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            if (error.response.data.message === "Unauthorized") {
              setErrorMessage("Veuillez remplir tous les chanmps obligatoires");
            }
          }
        }}
      >
        <h2 style={{ textAlign: "left" }}>Vends ton article</h2>
        <section className="picture-section">
          <input
            type="file"
            label="Ajoute une photo"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
        </section>
        <section className="first-section">
          <div>
            <label>Titre</label>
            <input
              value={title}
              type="text"
              placeholder="ex: Chemise Sézane Verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Décris ton article</label>
            <textarea
              value={description}
              type="text"
              rows="5"
              style={{ border: "1px solid black" }}
              placeholder="ex: porté quelques fois, taille correctement"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </section>
        <section className="second-section">
          <div>
            <label>Marque</label>
            <input
              value={brand}
              type="text"
              placeholder="ex: Zara"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Taille</label>
            <input
              value={size}
              type="text"
              placeholder="ex: L / 40 / 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Couleur</label>
            <input
              value={color}
              type="text"
              placeholder="ex: Fushia"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div>
            <label>État</label>
            <input
              value={condition}
              type="text"
              placeholder="ex: Neuf avec étiquette"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Lieu</label>
            <input
              value={city}
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </section>
        <section className="third-section">
          <div>
            <label>Prix</label>
            <input
              value={price}
              type="text"
              placeholder="0,00 €"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div className="checkbox-section">
            <input type="checkbox" />
            <span>Je suis intéressé par les échanges</span>
          </div>
        </section>
        <div className="form-button-container">
          <button className="form-button" type="submit">
            Ajouter
          </button>
        </div>
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}
      </form>
      {imageToDisplay && <img src={imageToDisplay.secure_url} alt="Post" />}
    </div>
  );
}

export default Publish;
