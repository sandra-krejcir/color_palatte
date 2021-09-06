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
}
