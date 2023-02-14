import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

function Publish({ token }) {
  // console.log(token);
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(picture);
  const navigate = useNavigate();

  return token ? (
    <div className="publish">
      <form
        className="publish-form"
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage("");
          try {
            const formData = new FormData();

            formData.append("picture", picture);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("price", price);

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
            navigate("/");
          } catch (error) {
            console.log(error);
            if (error.message === "Unauthorized") {
              setErrorMessage("Veuillez remplir tous les chanmps obligatoires");
            }
          }
        }}
      >
        <h2 style={{ textAlign: "left" }}>Vends ton article</h2>
        <div className="file-select">
          <div className="file-area">
            <input
              id="file"
              type="file"
              label="Ajoute une photo"
              style={{ display: "none" }}
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
            {!picture ? (
              <label htmlFor="file" className="file">
                Ajoute une photo
              </label>
            ) : (
              <img
                src={URL.createObjectURL(picture)}
                alt="product"
                className="img-preview"
              />
            )}
          </div>
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <h4>Titre</h4>
            <input
              value={title}
              type="text"
              placeholder="ex: Chemise Sézane Verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Décris ton article</h4>
            <textarea
              value={description}
              type="text"
              rows="5"
              placeholder="ex: porté quelques fois, taille correctement"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <h4>Marque</h4>
            <input
              value={brand}
              type="text"
              placeholder="ex: Zara"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Taille</h4>
            <input
              value={size}
              type="text"
              placeholder="ex: L / 40 / 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Couleur</h4>
            <input
              value={color}
              type="text"
              placeholder="ex: Fushia"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>État</h4>
            <input
              value={condition}
              type="text"
              placeholder="ex: Neuf avec étiquette"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Lieu</h4>
            <input
              value={city}
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <h4>Prix</h4>
            <div className="checkbox-section">
              <input
                value={price}
                type="text"
                placeholder="0,00 €"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <div className="checkbox-input">
                <input type="checkbox" />
                <span>Je suis intéressé par les échanges</span>
              </div>
            </div>
          </div>
        </div>
        <div className="form-button-container">
          <button className="form-button" type="submit">
            Ajouter
          </button>
        </div>
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Publish;
