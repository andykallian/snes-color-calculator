import { useEffect, useState } from 'react';
import '../App.css';
import RgbInputGroup from '../components/RgbInputGroup';
import ColorPickerBox from '../components/ColorPickerBox';

function Hero() {
  const [rgb, setRgb] = useState({ r: 240, g: 128, b: 49 });
  const [rgb8, setRgb8] = useState({ r: 30, g: 16, b: 6 });

  const [hexValue, setHexValue] = useState('1A1E');
  const [snesHexInput, setSnesHexInput] = useState('1A1E');
  const [inputReadyToClear, setInputReadyToClear] = useState(false);

  const [paletteSize, setPaletteSize] = useState(8);
  const [palette, setPalette] = useState([]);

  const [animateCopy, setAnimateCopy] = useState(false);
  const [animateReset, setAnimateReset] = useState(false);

  useEffect(() => {
    setPalette(Array(paletteSize).fill(null));
  }, [paletteSize]);

  useEffect(() => {
    const r8 = Math.floor(rgb.r / 8);
    const g8 = Math.floor(rgb.g / 8);
    const b8 = Math.floor(rgb.b / 8);

    setRgb8({ r: r8, g: g8, b: b8 });
    calculateHex(r8, g8, b8);
  }, [rgb]);

  useEffect(() => {
    setSnesHexInput(hexValue);
  }, [hexValue]);


  const toHex = (r, g, b) =>
    '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');

  const calculateHex = (r8, g8, b8) => {
    const value = (b8 << 10) | (g8 << 5) | r8;
    const hex = value.toString(16).toUpperCase().padStart(4, '0');

    setHexValue(hex);
    if (!inputReadyToClear) setSnesHexInput(hex);
  };


  const updateFromRGB8 = (newRgb8) => {
    setRgb8(newRgb8);
    setRgb({
      r: newRgb8.r * 8,
      g: newRgb8.g * 8,
      b: newRgb8.b * 8,
    });

    calculateHex(newRgb8.r, newRgb8.g, newRgb8.b);
  };

  const handleColorChange = (e) => {
    const hex = e.target.value;
    setRgb({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    });
  };

  const handleSnesInputChange = (e) => {
    let value = e.target.value
      .toUpperCase()
      .replace(/^0X/, '')
      .replace(/[^0-9A-F]/g, '');

    if (inputReadyToClear) {
      value = value.slice(-1);
      setInputReadyToClear(false);
    }

    value = value.slice(0, 4);
    setSnesHexInput(value);

    if (value.length === 4) {
      const snesValue = parseInt(value, 16);

      const r5 = snesValue & 0x1F;
      const g5 = (snesValue >> 5) & 0x1F;
      const b5 = (snesValue >> 10) & 0x1F;

      setRgb({
        r: Math.round((r5 * 255) / 31),
        g: Math.round((g5 * 255) / 31),
        b: Math.round((b5 * 255) / 31),
      });

      setRgb8({ r: r5, g: g5, b: b5 });
      setInputReadyToClear(true);
    }
  };

  const handleSetPaletteColor = (index) => {
    const newPalette = [...palette];
    newPalette[index] = {
      rgb,
      littleEndian: `${hexValue.slice(2)} ${hexValue.slice(0, 2)}`,
    };
    setPalette(newPalette);
  };

  const handleCopyPalette = () => {
    navigator.clipboard.writeText(
      palette.filter(Boolean).map(c => c.littleEndian).join(' ')
    );

    setAnimateCopy(true);
    setTimeout(() => setAnimateCopy(false), 400);
  };

  const handleResetPalette = () => {
    setPalette(Array(paletteSize).fill(null));

    setAnimateReset(true);
    setTimeout(() => setAnimateReset(false), 400);
  };


  return (
    <div className="container">

      <div className='containerBox'>
        <h1>SNES Color Calculator</h1>
      </div>
      
      <div className='containerBox'>

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

      </div>

      <div className='containerBox'>
        
      <div className="result">
        
        <p>
          Snes Hex Value: {hexValue.slice(2)} {hexValue.slice(0, 2)}
        </p>

        <div className="snesbyte">
          <p>Little Endian:</p>
          <input
            type="text"
            value={snesHexInput}
            onChange={handleSnesInputChange}
            maxLength={4}
            placeholder="7FFF"
          />
        </div>

      </div>
    </div>

    <div className='containerBox'>
      <div className="palette-selector">
        <label>
          Palette size:
          <select
            value={paletteSize}
            onChange={(e) => setPaletteSize(Number(e.target.value))}
          >
            <option value={8}>8 colors</option>
            <option value={16}>16 colors</option>
          </select>
        </label>
    </div>

    <div className="palette-grid">
      {palette.map((color, index) => (
        <div
          key={index}
          className="palette-slot"
          onClick={() => handleSetPaletteColor(index)}
          style={{
            backgroundColor: color
              ? toHex(color.rgb.r, color.rgb.g, color.rgb.b)
              : '#333',
          }}
          title={color ? color.littleEndian : 'Click to set'}
        />
      ))}
    </div>

    <div className="palette-output-wrapper">

      <textarea
        readOnly
        className="palette-output"
        value={palette.filter(Boolean).map(c => c.littleEndian).join(' | ')}
      />

      <div className="palette-buttons">
        <button
          className={`copy-button ${animateCopy ? 'clicked' : ''}`}
          onClick={handleCopyPalette}
        >
          Copy palette
        </button>

        <button
          className={`reset-button ${animateReset ? 'clicked' : ''}`}
          onClick={handleResetPalette}
        >
          Reset palette
        </button>
      </div>
    </div>
  </div>     
</div>)};

export default Hero;
