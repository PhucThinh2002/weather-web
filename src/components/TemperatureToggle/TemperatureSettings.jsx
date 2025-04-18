import React from 'react';
import "./temperature.css";
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowBoth, setTemperatureDisplay } from '../../features/temperatureSlice';

const TemperatureSettings = () => {
  const dispatch = useDispatch();
  const { unit, showBoth } = useSelector(state => state.temperature);

  const handleOptionChange = (newUnit, showBoth) => {
    dispatch(setTemperatureDisplay({ unit: newUnit, showBoth }));
    onClose(); // Đóng dropdown sau khi chọn
  };
  
  return (
    <div className="temperature-settings">
      <div className="settings-title">CÀI ĐẶT THỜI TIẾT</div>
      <div className="settings-group">
        <div className="settings-label">Nhiệt độ</div>
        <div className="settings-options">
          <div className="option-item">
            <input
              type="radio"
              id="fahrenheit"
              checked={!showBoth && unit === 'F'}
              onChange={() => handleOptionChange('F', false)}
            />
            <label htmlFor="fahrenheit">Độ F (°F)</label>
          </div>
          <div className="option-item">
            <input
              type="radio"
              id="celsius"
              checked={!showBoth && unit === 'C'}
              onChange={() => handleOptionChange('C', false)}
            />
            <label htmlFor="celsius">Độ C (°C)</label>
          </div>
          <div className="option-item">
            <input
              type="radio"
              id="both"
              checked={showBoth}
              onChange={() => handleOptionChange(unit, true)}
            />
            <label htmlFor="both">Hiển thị cả hai</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureSettings;