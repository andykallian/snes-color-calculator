# SNES Color Calculator

A web-based utility for converting RGB colors into the **Super Nintendo (SNES) 15-bit BGR color format**, designed for ROM hacking, graphics editing, and palette work.

This tool allows precise conversion between standard RGB values and SNES-compatible color values, including support for **8-color and 16-color palettes**, with export-ready little-endian output.

---

## Features

- Convert **RGB (0–255)** to **SNES BGR555**
- Convert **RGB/8 (0–31)** directly to SNES format
- Live color picker with hex input
- Automatic conversion to SNES little-endian hex
- Palette editor:
  - 8 or 16 color modes
  - Click to assign colors to palette slots
  - Preserves colors when switching between 8 and 16 colors
- One-click copy of palette data
- Reset palette functionality
- Responsive UI (desktop and mobile)
- Clean, SNES-inspired interface

---

## SNES Color Format Explained

The SNES uses a **15-bit color format (BGR555)**: BBBBBGGGGGRRRRR

Each channel ranges from **0–31**, not 0–255.

This tool automatically handles:
- RGB → RGB/8 scaling
- Bit packing into SNES format
- Little-endian byte ordering used in ROM data

Example:

RGB: 99, 67, 44
RGB/8: 12, 8, 5
SNES Hex: 0C15
Little Endian: 15 0C

---

## Built With

- React
- Vite
- JavaScript (ES6)
- CSS (custom styling)

---

## Running Locally

npm install
npm run dev
Then open: http://localhost:5173

---

## Output Format

Output Format
Each value is already formatted in little-endian, ready to paste into ROM data or assembly.

---

## Intended Use

This tool is useful for:

- SNES ROM hacking
- Sprite and palette editing
- Homebrew development
- Emulator testing
- Graphics reverse engineering
- Learning how SNES color encoding works

---

## Author
Built by Anderson Viana,
based on technical research originally compiled at https://wiki.superfamicom.org

## License
This project is provided for educational and personal use.