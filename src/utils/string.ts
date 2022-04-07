/**
 *  生成一个有大小写字母和数字的随机密码
 * @param length 密码长度
 */
export function randomPassword(length: number = 8): string {
  return Math.random().toString(36).slice(-length);
}

/**
 * 获取文件名和后缀
 * @param filename 文件名
 */
export function getFileNameAndExt(filename: string) {
  const tempArr = filename.split('.');
  return {
    name: tempArr.slice(0, tempArr.length - 1).join('.'),
    ext: tempArr.at(-1),
  };
}
