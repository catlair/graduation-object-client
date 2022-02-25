interface HSLColor {
  a?: number | undefined;
  h: number;
  l: number;
  s: number;
}

interface RGBColor {
  a?: number | undefined;
  b: number;
  g: number;
  r: number;
}

type Color = string | HSLColor | RGBColor;

interface ColorResult {
  hex: string;
  hsl: HSLColor;
  rgb: RGBColor;
}

type WaterDrawTextParams = {
  watermark: string;
  rotate: number;
  fontsize: number;
  color: ColorResult;
};
