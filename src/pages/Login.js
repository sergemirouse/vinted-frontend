import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data.message === "User not found" || "Unauthorized") {
        setErrorMessage(
          "L'adresse mail et/ou le mot de passe renseignés ne sont pas valides"
        );
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "82px",
        textAlign: "center",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", width: "275px" }}
        className="login-form"
        onSubmit={handleLogin}
      >
        <h2>Se connecter</h2>
        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit" className="login-validation-button">
          Se connecter
        </button>
        {errorMessage && (
          <p style={{ color: "red", lineHeight: "20px", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}
        <Link
          to="/signup"
          style={{ marginTop: "10px", fontSize: "12px", color: "#017580" }}
        >
          Pas encore de compte ? Inscris-toi
        </Link>
      </form>
    </div>
  );
};

export default Login;
