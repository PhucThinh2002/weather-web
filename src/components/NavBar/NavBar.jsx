import React, { useState } from "react";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { removeLocation } from "../../features/locationsSlice";

const NavBar = ({ onLocationSelect }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const dispatch = useDispatch();
  const savedLocations = useSelector(state => state.locations);

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === "Home") {
      onLocationSelect("auto:ip");
    }
  };

  const handleRemoveLocation = (id, e) => {
    e.stopPropagation();
    dispatch(removeLocation(id));
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <ion-icon name="partly-sunny-outline"></ion-icon>
        <span>Weather</span>
      </div>
      
      <ul className="nav-menu">
        <li 
          className={activeItem === "Home" ? "active" : ""}
          onClick={() => handleItemClick("Home")}
        >
          <ion-icon name="home-outline"></ion-icon>
          <span>Home</span>
        </li>
        
        <li 
          className={activeItem === "Map" ? "active" : ""}
          onClick={() => handleItemClick("Map")}
        >
          <ion-icon name="map-outline"></ion-icon>
          <span>Map</span>
        </li>
        
        <li className="divider"></li>
        
        <h4>Saved Locations</h4>
        
        {savedLocations.map(location => (
          <li 
            key={location.id}
            onClick={() => onLocationSelect(location.name)}
          >
            <ion-icon name="location-outline"></ion-icon>
            <span>{location.name}</span>
            <button 
              className="remove-btn"
              onClick={(e) => handleRemoveLocation(location.id, e)}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </li>
        ))}
      </ul>
      
      <div className="nav-footer">
        <button className="logout-btn">
          <ion-icon name="log-out-outline"></ion-icon>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;