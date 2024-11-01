import { RGB, XY } from "./Types";

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const randomElement = <T>(array: T[]): T => {
  return array[randomInt(0, array.length)];
};

export const randomColor = (): RGB => {
  const colors: RGB[] = [
    [219, 194, 200],
    [164, 227, 177],
    [244, 57, 27],
    [139, 145, 142],
    [130, 51, 96],
    [173, 70, 146],
    [179, 192, 211],
    [171, 96, 166],
    [212, 219, 96],
    [135, 56, 46],
    [83, 250, 132],
    [71, 41, 52],
    [66, 177, 122],
    [84, 123, 118],
    [63, 50, 102],
    [38, 23, 232],
    [10, 96, 109],
    [34, 147, 199],
    [52, 187, 11],
    [187, 195, 150],
    [236, 59, 245],
    [243, 52, 203],
    [217, 27, 187],
    [10, 208, 83],
    [62, 116, 4],
  ];
  return randomElement(colors);
};

export const randomAngle = (): XY => {
  const angle = Math.random() * Math.PI * 2;
  return [Math.cos(angle), Math.sin(angle)];
};
