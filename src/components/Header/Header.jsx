import React, { useState, useEffect } from "react";
import "./Header.css";
import { useDispatch } from "react-redux";
import { addLocation } from "../../features/locationsSlice";

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      dispatch(addLocation({ id: Date.now(), name: searchInput }));
      setSearchInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="header-section">
      {/* <div className="logo">
        <ion-icon name="partly-sunny-outline"></ion-icon>
        <span>WeatherApp</span>
      </div> */}
      
      <form className="search-area" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="submit" className="search-button">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </form>

      <div className="header-actions">
        <button className="current-location" onClick={() => onSearch("auto:ip")}>
          <ion-icon name="locate-outline"></ion-icon>
        </button>
        {/* <ion-icon name="notifications-outline"></ion-icon> */}
      </div>
    </section>
  );
};

export default Header;