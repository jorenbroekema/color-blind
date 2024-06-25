/*
 * color-blind
 * https://github.com/skratchdot/color-blind
 *
 * see blind.js for more information about the original source.
 *
 * Copyright (c) 2014 skratchdot
 * Licensed under the MIT license.
 */
import Color from "colorjs.io";
import { Blind } from "./blind.js";

const colorVisionData = {
  protanomaly: { type: "protan", anomalize: true },
  protanopia: { type: "protan" },
  deuteranomaly: { type: "deutan", anomalize: true },
  deuteranopia: { type: "deutan" },
  tritanomaly: { type: "tritan", anomalize: true },
  tritanopia: { type: "tritan" },
  achromatomaly: { type: "achroma", anomalize: true },
  achromatopsia: { type: "achroma" },
};
const denorm = function (ratio) {
  return Math.round(ratio * 255);
};
const createBlinder = function (key) {
  return function (colorString, returnRgb) {
    let color;
    try {
      color = new Color(colorString);
    } catch (e) {
      return returnRgb ? { R: 0, G: 0, B: 0 } : "#000000";
    }
    const rgb = new Blind(
      {
        R: denorm(color.srgb.red || 0),
        G: denorm(color.srgb.green || 0),
        B: denorm(color.srgb.blue || 0),
      },
      colorVisionData[key].type,
      colorVisionData[key].anomalize
    );
    // blinder.tritanomaly('#000000') causes NaN / null
    rgb.R = rgb.R || 0;
    rgb.G = rgb.G || 0;
    rgb.B = rgb.B || 0;
    if (returnRgb) {
      delete rgb.X;
      delete rgb.Y;
      delete rgb.Z;
      return rgb;
    }
    return new Color("sRGB", [
      (rgb.R % 256) / 255,
      (rgb.G % 256) / 255,
      (rgb.B % 256) / 255,
    ]).toString({ format: "hex" });
  };
};

export const protanomaly = createBlinder("protanomaly");
export const protanopia = createBlinder("protanopia");
export const deuteranomaly = createBlinder("deuteranomaly");
export const deuteranopia = createBlinder("deuteranopia");
export const tritanomaly = createBlinder("tritanomaly");
export const tritanopia = createBlinder("tritanopia");
export const achromatomaly = createBlinder("achromatomaly");
export const achromatopsia = createBlinder("achromatopsia");

export default {
  protanomaly,
  protanopia,
  deuteranomaly,
  deuteranopia,
  tritanomaly,
  tritanopia,
  achromatomaly,
  achromatopsia,
};
