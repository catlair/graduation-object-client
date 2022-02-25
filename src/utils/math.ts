/**
 * 已知宽高计算夹角
 * @param width 宽度
 * @param height 高度
 */
export function getAngle(width: number, height: number): number {
  return (getAngleRadian(width, height) * 180) / Math.PI;
}

/**
 * 已知宽高计算夹角弧度
 * @param width 宽度
 * @param height 高度
 */
export function getAngleRadian(width: number, height: number): number {
  return Math.atan(height / width);
}

/**
 * 已知宽高计算对角线
 * @param width 宽度
 * @param height 高度
 */
export function getDiagonal(width: number, height: number): number {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
}
