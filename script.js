"use strict";

const colorSelector = document.querySelector("input");
colorSelector.addEventListener("input", readColor);
const operator = document.querySelector("#operator");

function readColor() {
  console.log(colorSelector.value);
  const theColor = colorSelector.value;
  changeToRGB(theColor);
  showHex(theColor);
  console.log(changeToRGB(theColor));
  showRGB(changeToRGB(theColor));
  changeToHSL(changeToRGB(theColor));
  showHSL(changeToHSL(changeToRGB(theColor)));
  operator.addEventListener("click", getHarmony);
  const harmony = getHarmony();
  console.log(harmony);
  getRandomColors(changeToHSL(changeToRGB(theColor)));
  const newColors = getRandomColors(changeToHSL(changeToRGB(theColor)));
  changeColors(newColors, harmony);
  console.log(changeColors(newColors, harmony));
}

function getHarmony() {
  if (operator.value === "analogous") {
    return "analogous";
  } else if (operator.value === "monochromatic") {
    return "monochromatic";
  } else if (operator.value === "triad") {
    return "triad";
  } else if (operator.value === "complementary") {
    return "complementary";
  } else if (operator.value === "compound") {
    return "compound";
  } else {
    return "shades";
  }
}

function getRandomColors(theMainColor) {
  let hslObject = { h: theMainColor.h, s: theMainColor.s, l: theMainColor.l };
  let arrayOfColors = [];
  for (let i = 0; i < 4; i++) {
    console.log(i);
    arrayOfColors[i] = Object.assign({}, hslObject);
  }
  console.log(arrayOfColors);
  return arrayOfColors;
}

function changeColors(theColorsArray, theHarmony) {
  console.log(theHarmony);
  if (theHarmony === "analogous") {
    theColorsArray[0].h += 10;
  } else if (theHarmony === "monochromatic") {
    theColorsArray[1].h += 10;
  } else if (theHarmony === "triad") {
    theColorsArray[2].h += 10;
  } else if (theHarmony === "complementary") {
    theColorsArray[1].h += 50;
  } else if (theHarmony === "compound") {
    theColorsArray[3].h += 30;
  } else if (theHarmony === "shades") {
    theColorsArray[4].h += 10;
  }
  console.log(theColorsArray);
  return theColorsArray;
}

function changeToRGB(colorHex) {
  let r = parseInt(colorHex.substring(1, 3), 16);
  let g = parseInt(colorHex.substring(3, 5), 16);
  let b = parseInt(colorHex.substring(5), 16);
  return { r, g, b };
}

function changeToHSL(rgbValue) {
  let r = rgbValue.r;
  let g = rgbValue.g;
  let b = rgbValue.b;

  r /= 255;
  g /= 255;
  b /= 255;

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

  Math.floor((l = (min + max) / 2));

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  Math.floor((s *= 100));
  Math.floor((l *= 100));

  console.log("hsl(%f,%f%,%f%)", h, s, l);
  return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
}

function showHex(color) {
  document.querySelector("#hex").textContent = color;
}

function showRGB(theRGBValues) {
  let r = theRGBValues.r;
  let g = theRGBValues.g;
  let b = theRGBValues.b;

  document.querySelector("#rgb").textContent = `r:${r} g:${g} b:${b}`;
}

function showHSL(theHSLValues) {
  let h = theHSLValues.h;
  let s = theHSLValues.s;
  let l = theHSLValues.l;

  document.querySelector("#hsl").textContent = `h:${h} s:${s}% l:${l}%`;
}
