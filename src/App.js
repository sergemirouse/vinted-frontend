import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import Header from "./components/Header";

import { faMagnifyingGlass, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faCheck);

function App() {
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-vinted");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        search={search}
        handleToken={handleToken}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token}/>} />
      </Routes>
    </Router>
  );
}

export default App;
