import { XY } from "./Types";

export const add = (a: XY, b: XY, out: XY) => {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
};

export const subtract = (a: XY, b: XY, out: XY) => {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
};

export const scale = (a: XY, scalar: number, out: XY) => {
  out[0] = a[0] * scalar;
  out[1] = a[1] * scalar;
};

export const lengthSquared = (a: XY): number => {
  return a[0] * a[0] + a[1] * a[1];
};

export const length = (a: XY): number => {
  return Math.sqrt(lengthSquared(a));
};

export const normalize = (a: XY, out: XY) => {
  const len = length(a);
  out[0] = a[0] / len;
  out[1] = a[1] / len;
};

export const dot = (a: XY, b: XY): number => {
  return a[0] * b[0] + a[1] * b[1];
};

export const angleBetween = (a: XY, b: XY): number => {
  return Math.acos(dot(a, b) / (length(a) * length(b)));
};

export const project = (a: XY, b: XY, out: XY) => {
  const scalar = dot(a, b) / lengthSquared(b);
  scale(b, scalar, out);
};

export const floor = (a: XY, out: XY) => {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
};

export const round = (a: XY, out: XY) => {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
};

export const max = (a: XY, b: XY, out: XY) => {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
};

export const min = (a: XY, b: XY, out: XY) => {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
};
