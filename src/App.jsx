import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

const App = () => {
  const [searchCountry, setSearchCountry] = useState(null);
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(true);

  useEffect(() => {
    if (usingCurrentLocation) {
      getCurrentLocation();
    }
  }, [usingCurrentLocation]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSearchCountry(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setSearchCountry("auto:ip");
        }
      );
    } else {
      setSearchCountry("auto:ip");
    }
  };

  const handleSearch = (location) => {
    setUsingCurrentLocation(false);
    setSearchCountry(location);
  };

  const handleUseCurrentLocation = () => {
    setUsingCurrentLocation(true);
  };

  return (
    <div className="app-container">
      <NavBar
        onLocationSelect={handleSearch}
        onUseCurrentLocation={handleUseCurrentLocation}
      />
      <div className="main-content">
        <Header onSearch={handleSearch} />
        <Dashboard searchCountry={searchCountry || "auto:ip"} />
      </div>
    </div>
  );
};

export default App;