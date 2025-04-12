import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useDispatch } from "react-redux";
import { addLocation } from "../../features/locationsSlice";
import { searchLocation, getWeatherData } from "../../features/weatherAPI";

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  // Thêm effect để đóng suggestions khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hàm fetch suggestions khi input thay đổi
  useEffect(() => {
    const fetchSuggestions = async () => {
      const query = searchInput.trim();
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchLocation(query);
        setSearchResults(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce 300ms

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  const handleWeatherSelection = async (location) => {
    try {
      const weatherData = await getWeatherData(location);
      onSearch(location);

      dispatch(
        addLocation({
          id: Date.now(),
          name: weatherData.location.name,
          region: weatherData.location.region,
          country: weatherData.location.country,
          lat: weatherData.location.lat,
          lon: weatherData.location.lon
        })
      );

      setSearchInput("");
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error getting weather:", error);
      alert("Không thể lấy dữ liệu thời tiết cho địa điểm này");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() && searchResults.length > 0) {
      handleWeatherSelection(searchResults[0].name);
    }
  };

  const handleSuggestionClick = (result) => {
    handleWeatherSelection(result.name);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          await handleWeatherSelection(`${latitude},${longitude}`);
          setSearchInput("Vị trí hiện tại");
        },
        () => {
          handleWeatherSelection("auto:ip");
          setSearchInput("Vị trí mặc định");
        }
      );
    } else {
      handleWeatherSelection("auto:ip");
      setSearchInput("Vị trí mặc định");
    }
  };

  return (
    <section className="header-section">
      <form className="search-area" onSubmit={handleSearchSubmit} ref={searchRef}>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search any location (city, region, country)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />

          {isSearching && (
            <div className="search-loading">
              <ion-icon name="search-outline"></ion-icon>
            </div>
          )}

          {showSuggestions && searchResults.length > 0 && (
            <div className="suggestions-dropdown">
              {searchResults.map((result, index) => (
                <div
                  key={`${result.id}-${index}`}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(result)}
                >
                  <div className="suggestion-main">
                    <ion-icon name="location-outline"></ion-icon>
                    <div>
                      <div className="suggestion-title">
                        {result.name}
                        {result.region && `, ${result.region}`}
                      </div>
                      <div className="suggestion-subtitle">
                        {result.country}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="search-button">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </form>

      <div className="header-actions">
        <button
          className="current-location"
          onClick={handleCurrentLocation}
          title="Get current location"
        >
          <ion-icon name="locate-outline"></ion-icon>
        </button>
      </div>
    </section>
  );
};

export default Header;