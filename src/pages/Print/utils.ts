import { getAngleRadian } from '@/utils/math';
import { degrees } from 'pdf-lib';

/**
 * 水印倾斜居中 （伪）
 */
export function slantWatermark(fontsize: number, width: number, height: number, length: number) {
  const angle = getAngleRadian(width, height);
  return {
    x: width * 0.5 - (Math.cos(angle) * (length * fontsize)) / 3.5,
    y: height * 0.5 - fontsize / 1.2,
    rotate: degrees((angle * 180) / Math.PI),
  };
}
