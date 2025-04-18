import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../../features/locationsSlice";
import { searchLocation, getWeatherData } from "../../features/weatherAPI";
import TemperatureSettings from '../TemperatureToggle/TemperatureSettings';

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const tempSettingsRef = useRef(null);
  const dispatch = useDispatch();
  const [searchError, setSearchError] = useState(null);
  const [showTempSettings, setShowTempSettings] = useState(false);
  const { unit } = useSelector(state => state.temperature);

  const hasInvalidSpecialChars = (query) => {
    const invalidChars = /[@#$%^&*()_+=\[\]{};':"\\|<>\/]+/;
    return invalidChars.test(query);
  };

  // Đóng suggestions và temperature settings khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Đóng search suggestions nếu click bên ngoài
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      
      // Đóng temperature settings nếu click bên ngoài
      if (tempSettingsRef.current && !tempSettingsRef.current.contains(event.target)) {
        setShowTempSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  const fetchSuggestions = async () => {
    const query = searchInput.trim();
    
    // Kiểm tra ký tự đặc biệt trước khi gọi API
    if (hasInvalidSpecialChars(query)) {
      setSearchError("Tên địa điểm không được chứa ký tự đặc biệt (@, *, _, ...)");
      setSearchResults([]);
      return;
    }
    
    if (query.length < 2) {
      setSearchResults([]);
      setSearchError(null); // Reset lỗi khi query quá ngắn
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    
    try {
      const results = await searchLocation(query);
      
      // Ưu tiên kết quả có tên trùng khớp hơn
      const exactMatch = results.find(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.region?.toLowerCase().includes(query.toLowerCase())
      );
      
      if (exactMatch) {
        setSearchResults([exactMatch, ...results.filter(item => item !== exactMatch)]);
      } else {
        setSearchResults(results);
      }
      
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSearchResults([]);
      setSearchError(error.message || "Không thể tìm kiếm địa điểm");
    } finally {
      setIsSearching(false);
    }
  };

  const debounceTimer = setTimeout(() => {
    fetchSuggestions();
  }, 500);

  return () => clearTimeout(debounceTimer);
}, [searchInput]);

  const handleWeatherSelection = async (location) => {
    try {
      // Thử tìm kiếm chính xác hơn bằng cách kết hợp name và region
      const weatherData = await getWeatherData(location);
      
      // Kiểm tra xem có phải là kết quả mong muốn không
      const isDesiredLocation = weatherData.location.name.toLowerCase().includes(searchInput.toLowerCase()) || 
                               weatherData.location.region?.toLowerCase().includes(searchInput.toLowerCase());
      
      if (!isDesiredLocation && searchResults.length > 1) {
        // Thử với kết quả thứ 2 nếu kết quả đầu không khớp
        const secondTry = await getWeatherData(searchResults[1].name);
        if (secondTry.location.name.toLowerCase().includes(searchInput.toLowerCase())) {
          onSearch(searchResults[1].name);
          dispatch(
            addLocation({
              id: Date.now(),
              name: secondTry.location.name,
              region: secondTry.location.region,
              country: secondTry.location.country,
              lat: secondTry.location.lat,
              lon: secondTry.location.lon
            })
          );
          setSearchInput("");
          setShowSuggestions(false);
          return;
        }
      }

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

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchInput.trim();
    
    // Kiểm tra nếu search input rỗng
    if (!query) {
      setSearchError("Vui lòng nhập địa điểm cần tìm");
      return;
    }
  
    // Kiểm tra ký tự đặc biệt
    if (hasInvalidSpecialChars(query)) {
      setSearchError("Tên địa điểm không được chứa ký tự đặc biệt (@, *, _, ...)");
      return;
    }
  
    setIsSearching(true);
    setSearchError(null);
  
    try {
      const results = await searchLocation(query);
      
      if (!results || results.length === 0) {
        throw new Error(`Không tìm thấy địa điểm "${query}"`);
      }
  
      const firstResult = results[0];
      await handleWeatherSelection(firstResult.name);
      
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(error.message || "Không thể tìm kiếm địa điểm");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
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
          setSearchInput(""); 
        },
        () => {
          handleWeatherSelection("auto:ip");
          setSearchInput(""); 
        }
      );
    } else {
      handleWeatherSelection("auto:ip");
      setSearchInput(""); 
    }
  };

  return (
    <section className="header-section">
      <form className="search-area" onSubmit={handleSearchSubmit} ref={searchRef}>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search any location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />

          {isSearching && (
            <div className="search-loading">
              <ion-icon name="search-outline"></ion-icon>
            </div>
          )}

        {searchError && (
          <div className="error-message">
            <ion-icon name="warning-outline"></ion-icon>
            <span>{searchError}</span>
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

      <div className="header-actions" ref={tempSettingsRef}>
        <button 
          className="temperature-toggle"
          onClick={() => setShowTempSettings(!showTempSettings)}
          aria-expanded={showTempSettings}
        >
          {unit}°
        </button>
        
        <button
          className="current-location"
          onClick={handleCurrentLocation}
          title="Get current location"
        >
          <ion-icon name="locate-outline"></ion-icon>
        </button>
        
        {showTempSettings && (
          <div className="settings-dropdown">
            <TemperatureSettings onClose={() => setShowTempSettings(false)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;