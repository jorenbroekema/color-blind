import { expect } from "chai";
import blinder from "../lib/color-blind.js";

describe("color-blind", () => {
  it("should handle invalid hex", () => {
    const invalidHex = "WoWoWoWnfnfnf";
    expect(blinder.deuteranomaly(invalidHex)).to.equal("#000000");
    const res = blinder.deuteranomaly(invalidHex, true);
    expect(res).to.eql({ R: 0, G: 0, B: 0 });
  });

  it("should handle black color", () => {
    const hex = "#000000";
    expect(blinder.tritanomaly(hex)).to.equal("#000");
    const res = blinder.tritanomaly(hex, true);
    expect(res).to.eql({ R: 0, G: 0, B: 0 });
  });

  it("should handle basic color deuteranomaly #c86432", () => {
    const hex = "#c86432";
    expect(blinder.deuteranomaly(hex)).to.equal("#af7130");
    const res = blinder.deuteranomaly(hex, true);
    expect(res).to.eql({
      R: 174.63501465104628,
      G: 113.20677847820777,
      B: 48.09525195743322,
    });
  });

  it("should handle basic color deuteranopia #c86432", () => {
    const hex = "#c86432";
    expect(blinder.deuteranopia(hex)).to.equal("#a0792f");
    const res = blinder.deuteranopia(hex, true);
    expect(res).to.eql({
      R: 160.140737308787,
      G: 120.75350903718365,
      B: 47.00682450453791,
    });
  });
});
