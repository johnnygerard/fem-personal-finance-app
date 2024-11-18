import { Color } from "../types/color.enum.js";

export const colors: Map<
  Color,
  {
    name: string;
    hex: string;
  }
> = new Map([
  [
    Color.GREEN,
    {
      name: "Green",
      hex: "277C78",
    },
  ],
  [
    Color.YELLOW,
    {
      name: "Yellow",
      hex: "F2CDAC",
    },
  ],
  [
    Color.CYAN,
    {
      name: "Cyan",
      hex: "82C9D7",
    },
  ],
  [
    Color.NAVY,
    {
      name: "Navy",
      hex: "626070",
    },
  ],
  [
    Color.RED,
    {
      name: "Red",
      hex: "C94736",
    },
  ],
  [
    Color.PURPLE,
    {
      name: "Purple",
      hex: "826CB0",
    },
  ],
  [
    Color.TURQUOISE,
    {
      name: "Turquoise",
      hex: "597C7C",
    },
  ],
  [
    Color.BROWN,
    {
      name: "Brown",
      hex: "93674F",
    },
  ],
  [
    Color.MAGENTA,
    {
      name: "Magenta",
      hex: "934F6F",
    },
  ],
  [
    Color.BLUE,
    {
      name: "Blue",
      hex: "3F82B2",
    },
  ],
  [
    Color.NAVY_GREY,
    {
      name: "Navy Grey",
      hex: "97A0AC",
    },
  ],
  [
    Color.ARMY_GREEN,
    {
      name: "Army Green",
      hex: "7F9161",
    },
  ],
  [
    Color.PINK,
    {
      name: "Pink",
      hex: "AF81BA",
    },
  ],
  [
    Color.GOLD,
    {
      name: "Gold",
      hex: "CAB361",
    },
  ],
  [
    Color.ORANGE,
    {
      name: "Orange",
      hex: "BE6C49",
    },
  ],
]);
