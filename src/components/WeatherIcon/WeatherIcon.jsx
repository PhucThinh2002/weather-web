import React from "react";
import blizzardIcon from "../../assets/blizzard.png";
import blowingSnowIcon from "../../assets/blowing-snow.png";
import cloudyDayIcon from "../../assets/cloudy-day.png";
import drizzleIcon from "../../assets/drizzle.png";
import dropsIcon from "../../assets/drops.png";
import fogIcon from "../../assets/fog.png";
import freezingDrizzleIcon from "../../assets/freezing-drizzle.png";
import hailIcon from "../../assets/hail.png";
import heavyRainIcon from "../../assets/heavy-rain.png";
import heavySnowIcon from "../../assets/heavy-snow.png";
import heavyThunderRainIcon from "../../assets/heavy-thunder-rain.png";
import lightDrizzleIcon from "../../assets/light-drizzle.png";
import lightRainIcon from "../../assets/light-rain.png";
import lightShowersIcon from "../../assets/light-showers.png";
import mistIcon from "../../assets/mist.png";
import moderateRainIcon from "../../assets/moderate-rain.png";
import overcastIcon from "../../assets/overcast.png";
import partlyCloudyIcon from "../../assets/partly-cloudy.png";
import partlySunnyIcon from "../../assets/partly-sunny.png";
import rainIcon from "../../assets/rain.png";
import sleetIcon from "../../assets/sleet.png";
import snowIcon from "../../assets/snow.png";
import sunCloudyIcon from "../../assets/sun-cloudy.png";
import sunWindyIcon from "../../assets/sun-windy.png";
import sunnyIcon from "../../assets/sunny.png";
import thunderRainIcon from "../../assets/thunder-rain.png";
import thunderIcon from "../../assets/thunder.png";
import defaultIcon from "../../assets/partly-cloudy.png";

const WeatherIcon = ({ condition, small = false }) => {
  const size = small ? "50px" : "150px";

  // Ánh xạ điều kiện thời tiết với icon tương ứng
  const getIcon = () => {
    if (!condition) return defaultIcon;

    const lowerCondition = condition.toLowerCase();

    const iconMap = {
      "blizzard": blizzardIcon,
      "blowing snow": blowingSnowIcon,
      "cloudy": cloudyDayIcon,
      "drizzle": drizzleIcon,
      "drops": dropsIcon,
      "fog": fogIcon,
      "freezing drizzle": freezingDrizzleIcon,
      "hail": hailIcon,
      "heavy rain": heavyRainIcon,
      "heavy snow": heavySnowIcon,
      "heavy thunder rain": heavyThunderRainIcon,
      "light drizzle": lightDrizzleIcon,
      "light rain": lightRainIcon,
      "light showers": lightShowersIcon,
      "mist": mistIcon,
      "moderate rain": moderateRainIcon,
      "overcast": overcastIcon,
      "partly cloudy": partlyCloudyIcon,
      "partly sunny": partlySunnyIcon,
      "rain": rainIcon,
      "sleet": sleetIcon,
      "snow": snowIcon,
      "sun cloudy": sunCloudyIcon,
      "sun windy": sunWindyIcon,
      "sunny": sunnyIcon,
      "thunder rain": thunderRainIcon,
      "thunder": thunderIcon,
    };

    // Tìm icon phù hợp nhất
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerCondition.includes(key.toLowerCase())) {
        return icon;
      }
    }

    return defaultIcon;
  };

  const iconSrc = getIcon();

  return (
    <div className="weather-icon">
      <img
        src={iconSrc}
        alt={condition}
        style={{ width: size, height: size }}
        onError={(e) => {
          e.target.src = defaultIcon; // Fallback icon
        }}
      />
    </div>
  );
};

export default WeatherIcon;