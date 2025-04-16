import { useEffect, useState } from 'react';
import '../App.css';
import RgbInputGroup from '../components/RgbInputGroup';
import ColorPickerBox from '../components/ColorPickerBox';

function Hero() {

  const [rgb, setRgb] = useState({ r: 240, g: 128, b: 49 });
  const [rgb8, setRgb8] = useState({ r: 30, g: 16, b: 6 });
  const [hexValue, setHexValue] = useState('0');

  useEffect(() => {
    const r8 = Math.floor(rgb.r / 8);
    const g8 = Math.floor(rgb.g / 8);
    const b8 = Math.floor(rgb.b / 8);
    setRgb8({ r: r8, g: g8, b: b8 });
    calculateHex(r8, g8, b8);
  }, [rgb]);

  const updateFromRGB8 = (newRgb8) => {
    const newRgb = {
      r: newRgb8.r * 8,
      g: newRgb8.g * 8,
      b: newRgb8.b * 8,
    };
    setRgb8(newRgb8);
    setRgb(newRgb);
    calculateHex(newRgb8.r, newRgb8.g, newRgb8.b);
  };

  const handleColorChange = (e) => {
    const hex = e.target.value;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setRgb({ r, g, b });
  };

  const calculateHex = (r8, g8, b8) => {
    const value = (b8 << 10) | (g8 << 5) | r8;
    const hex = value.toString(16).toUpperCase().padStart(4, '0');
    setHexValue(hex);
  };

  const toHex = (r, g, b) =>
    '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

  return (
      <div className="container">
        <h1>🎨 SNES Color Calculator</h1>

        <ColorPickerBox
          color={toHex(rgb.r, rgb.g, rgb.b)}
          onChange={handleColorChange}
        />

        <RgbInputGroup
          title="RGB Input (0–255)"
          values={rgb}
          onChange={setRgb}
          min={0}
          max={255}
        />

        <RgbInputGroup
          title="RGB/8 Input (0–31)"
          values={rgb8}
          onChange={updateFromRGB8}
          min={0}
          max={31}
        />

        <div className="result">
          <p>📊 RGB/8: R = {rgb8.r}, G = {rgb8.g}, B = {rgb8.b}</p>
          <p>🧮 SNES Hex Value: {hexValue.slice(2)} {hexValue.slice(0, 2)}</p>
          <p>🎯 Final SNES Byte: <code>0x{hexValue}</code></p>
        </div>
      </div>  
  )
}

export default Hero