/** 生成一个有大小写字母和数字的随机密码 */
export function randomPassword(length: number = 8): string {
  return Math.random().toString(36).slice(-length);
}
