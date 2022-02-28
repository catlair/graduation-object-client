import { Mimetype } from '@/enums/mimetype';
import { getFile } from '@/services/upload';
import { message } from 'antd';
import { isNull } from 'lodash';

export type BytesType = string | ArrayBuffer | Uint8Array;

export const renderInIframe = (pdfBytes: Blob | BytesType) => {
  const blob = new Blob([pdfBytes], { type: Mimetype.pdf });
  return URL.createObjectURL(blob);
};

export const pdfPreview = async (filename: string = '') => {
  const tempArr = filename.split('.');
  tempArr[tempArr.length - 1] = 'pdf';
  const name = tempArr.join('.');
  const res = await getFile(name);
  const src = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(res);
    reader.onload = () => resolve(reader.result);
  });

  const pdfWindow = window.open('about:blank', `查看文件 - ${filename}`);
  if (isNull(pdfWindow)) {
    message.error('请允许弹窗');
    return;
  }
  const iframe = `<iframe src="${src}" style="width:100%;height:100%;border:none;"></iframe>`;
  if (window.navigator.userAgent.includes('Firefox')) {
    // Firefox 使用
    pdfWindow.document.write(iframe);
  } else {
    //  chrome 使用 write 方法可能会一致转圈，故使用 innerHTML
    pdfWindow.document.body.innerHTML = iframe;
  }

  pdfWindow.document.body.style.margin = '0';
  pdfWindow.document.title = `查看文件 - ${filename}`;
};
