import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  const handleSearch = (country) => {
    setSearchCountry(country);
    setNavOpen(false);
  };

  return (
    <div className="app-container">
      <NavBar 
        className={navOpen ? "open" : ""} 
        onLocationSelect={handleSearch} 
      />
      
      <main className={navOpen ? "nav-open" : ""}>
        <Header onSearch={handleSearch} />
        <Dashboard searchCountry={searchCountry} />
      </main>
    </div>
  );
};

export default App;