import React from 'react';
import './ColorPickerBox.css';

const ColorPickerBox = ({ color, onChange }) => {
  return (
    <div className="color-picker-box">
      <label></label>
      <input
        type="color"
        value={color}
        onChange={onChange}
        className="custom-color-input"
      />
    </div>
  );
};

export default ColorPickerBox;
