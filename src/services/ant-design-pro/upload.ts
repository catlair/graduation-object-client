import { uploadPaperFields } from '@/enums/field';
import { request } from 'umi';

/** 上传试卷文件 POST /upload/paper */
export async function uploadPaperFiles(fileList: any[], options?: Record<string, any>) {
  const formData = new FormData();
  uploadPaperFields.forEach((feild, index) => {
    formData.append(feild, fileList[index]);
  });

  return request<Record<string, any>>('/upload/paper', {
    method: 'POST',
    body: formData,
    requestType: 'form',
    timeout: 20000,
    ...(options || {}),
  });
}
