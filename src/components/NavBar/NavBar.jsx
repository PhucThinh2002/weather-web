import React, { useState } from "react";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { removeLocation, selectUniqueLocations } from "../../features/locationsSlice";

const NavBar = ({ onLocationSelect, onUseCurrentLocation }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const dispatch = useDispatch();
  const savedLocations = useSelector(selectUniqueLocations);

  const getUniqueLocations = () => {
    const uniqueLocations = [];
    const seen = new Set();
    
    savedLocations.forEach(location => {
      const key = `${location.name}-${location.region || ''}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLocations.push(location);
      }
    });
    
    return uniqueLocations;
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === "Home") {
      onUseCurrentLocation();
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

        <li className="divider"></li>

        <h4>Saved Locations</h4>

        {getUniqueLocations().map(location => (
          <li
            key={location.id}
            onClick={() => onLocationSelect(location.name)}
          >
            <ion-icon name="location-outline"></ion-icon>
            <span>{location.name}</span>
            {location.region && <span className="region">{`, ${location.region}`}</span>}
            <button
              className="remove-btn"
              onClick={(e) => handleRemoveLocation(location.id, e)}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;