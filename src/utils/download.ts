/**
 * 下载文件
 */
export const download = (res: any, filename: string) => {
  const blob = new Blob([res], {
    type: 'application/octet-stream',
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};
