import { ThemeStore } from "./requiredModules.jsx";
export const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", ""),
    )
    .join("")}`;
export const getBackgroundColor = () => {
  const getBody = document.getElementsByTagName("body")[0],
    prop = window.getComputedStyle(getBody).getPropertyValue("background-color");
  if (prop === "transparent") {
    Logger.err("Transparent background detected. Contact the developer for help!");
  }
  return rgba2hex(prop);
};
export const LightenDarkenColor = (color, amount) =>
  `#${color
    .replace(/^#/, "")
    .replace(/../g, (color) =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)}`.substr(-2),
    )}`;
export const makeColorVisible = (color, precent) => {
  const { theme } = ThemeStore;
  switch (theme) {
    case "light":
      return LightenDarkenColor(color, -precent);
    case "dark":
      return LightenDarkenColor(color, precent);
    default:
      Logger.err("Unknown theme detected. Contact the developer for help!");
  }
};
export const getDifference = (color1, color2) => {
  if (!color1 && !color2) {
    return;
  }
  color1 = color1.substring(1, 7);
  color2 = color2.substring(1, 7);
  const _r = parseInt(color1.substring(0, 2), 16),
    _g = parseInt(color1.substring(2, 4), 16),
    _b = parseInt(color1.substring(4, 6), 16),
    __r = parseInt(color2.substring(0, 2), 16),
    __g = parseInt(color2.substring(2, 4), 16),
    __b = parseInt(color2.substring(4, 6), 16),
    _p1 = (_r / 255) * 100,
    _p2 = (_g / 255) * 100,
    _p3 = (_b / 255) * 100,
    perc1 = Math.round((_p1 + _p2 + _p3) / 3),
    __p1 = (__r / 255) * 100,
    __p2 = (__g / 255) * 100,
    __p3 = (__b / 255) * 100,
    perc2 = Math.round((__p1 + __p2 + __p3) / 3);
  return Math.abs(perc1 - perc2);
};
