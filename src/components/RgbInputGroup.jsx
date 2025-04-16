import React from 'react';

const RgbInputGroup = ({ title, values, onChange, min = 0, max = 255 }) => {
  const handleChange = (channel) => (e) => {
    const value = Math.max(min, Math.min(max, parseInt(e.target.value) || 0));
    onChange({ ...values, [channel]: value });
  };

  return (
    <div className="section">
      {title && <h3>{title}</h3>}
      <div className="box">
        <label>
          R: <input type="number" min={min} max={max} value={values.r} onChange={handleChange('r')} />
        </label>
        <label>
          G: <input type="number" min={min} max={max} value={values.g} onChange={handleChange('g')} />
        </label>
        <label>
          B: <input type="number" min={min} max={max} value={values.b} onChange={handleChange('b')} />
        </label>
      </div>
    </div>
  );
};

export default RgbInputGroup;
