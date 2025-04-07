import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ onSearch }) => {
  const [country, setCountry] = useState("Fetching...");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          "https://api.weatherapi.com/v1/current.json?key=1f6ced3bfab143cda1e44028240205&q=auto:ip"
        );
        const data = await response.json();
        setCountry(data.location.country);
      } catch (error) {
        console.error("Lỗi khi lấy tên nước:", error);
        setCountry("Unknown");
      }
    };

    fetchCountry();
  }, []);

  const handleSearch = () => {
    if (searchInput) {
      onSearch(searchInput); // Gửi dữ liệu tìm kiếm lên App
      setSearchInput("");
    }
  };

  return (
    <section className="header-section">
      <div>
        <ion-icon name="location-outline"></ion-icon>
        <span>{country}</span>
      </div>
      <div className="search-area">
        <input
          type="text"
          placeholder="Search here"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>
      <div>
        <ion-icon name="calendar-outline"></ion-icon>
        <ion-icon name="notifications-outline"></ion-icon>
      </div>
    </section>
  );
};

export default Header;
