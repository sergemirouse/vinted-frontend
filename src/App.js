import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";

import Home from "./pages/Home";
import Offer from "./pages/Offer";

import Header from "./components/Header";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  return (
    // Router doit contenir tout mon site
    <Router>
      {/* Mon Header apparait sur toutes mes pages */}
      <Header />
      {/* Le composant Routes doit contenir toutes mes Route il affiche un composant à la fois */}
      <Routes>
        {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
        <Route path="/" element={<Home />} />
        {/* Cette route attend un params dans son URL */}
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
