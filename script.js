"use strict";
const colorSelector = document.querySelector("input");
colorSelector.addEventListener("input", readColor);

function readColor() {
  console.log(colorSelector.value);
  const theColor = colorSelector.value;
  const firstSet = theColor.substring(1, 3);
  const secondSet = theColor.substring(3, 5);
  const thirdSet = theColor.substring(5);
  colorSelector.addEventListener("change", readColor);
  changeToRGB(firstSet, secondSet, thirdSet);
}

function changeToRGB(valR, valG, valB) {
  let r = parseInt(valR, 16);
  let g = parseInt(valG, 16);
  let b = parseInt(valB, 16);
  console.log(r, g, b);
  changeToHSL(r, g, b);
}

function changeToHSL(r, g, b) {
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l);
}
