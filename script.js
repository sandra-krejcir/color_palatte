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
  newColors.splice(2, 0, changeToHSL(changeToRGB(theColor)));
  writeToInterface(newColors);
  console.log(changeColors(newColors, harmony));
}
function writeToInterface(newcolors) {
  newcolors.forEach((elm) => {
    const colorbox = document.createElement("div");
    const text1 = document.createElement("p");
    const text2 = document.createElement("p");
    const text3 = document.createElement("p");
    text1.textContent = `${RGBToHex(changeHSLtoRGB(elm))}`;
    text2.textContent = `r:${changeHSLtoRGB(elm).r}, g:${
      changeHSLtoRGB(elm).g
    }, b:${changeHSLtoRGB(elm).b}`;
    text3.textContent = `h:${elm.h}, s:${elm.s}, l:${elm.l}`;
    colorbox.style.backgroundColor = RGBToHex(changeHSLtoRGB(elm));
    const parent = document.querySelector("#theColors");
    colorbox.appendChild(text1);
    colorbox.appendChild(text2);
    colorbox.appendChild(text3);
    parent.appendChild(colorbox);
  });
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
    changeAnalogous(theColorsArray);
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
  return theColorsArray;
}

function changeAnalogous(colorsArray) {
  colorsArray[0].h = setInterval((colorsArray[0].h -= 10), 360);
  colorsArray[1].h = setInterval((colorsArray[1].h += 10), 360);
  colorsArray[2].h = setInterval((colorsArray[2].h += 20), 360);
  colorsArray[3].h = setInterval((colorsArray[3].h += 30), 360);
  console.log(colorsArray);
  return colorsArray;
}

function setInterval(number, max) {
  while (number < 0) {
    number += max;
  }
  return number % max;
}
function RGBToHex(obj) {
  let r = obj.r;
  let g = obj.g;
  let b = obj.b;

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
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

function changeHSLtoRGB(HSLObject) {
  let h = HSLObject.h;
  let s = HSLObject.s;
  let l = HSLObject.l;

  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  console.log(r, g, b);
  return { r, g, b };
}

/*
function changeHSLtoRGB(arrayOfNewColors) {
  arrayOfNewColors.forEach((elm) => {
    let h = elm.h;
    let s = elm.s;
    let l = elm.l;

    h = h;
    s = s / 100;
    l = l / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    let RGBObject = { r, b, g };
    arrayOfNewColors = Object.assign({}, RGBObject);
    console.log(arrayOfNewColors);
    return arrayOfNewColors;
  });
  return arrayOfNewColors;
}
*/
