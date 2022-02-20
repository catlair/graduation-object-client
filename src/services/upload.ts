import { uploadPaperFields } from '@/enums/field';
import { request } from 'umi';

/** 上传试卷文件 POST /upload/paper */
export async function uploadPaperFiles(
  fileList: any[],
  params: API.UploadPaperParams,
  options?: Record<string, any>,
) {
  const formData = new FormData();
  uploadPaperFields.forEach((feild, index) => {
    formData.append(feild, fileList[index]);
  });

  return request<Record<string, any>>('/upload/paper', {
    method: 'POST',
    body: formData,
    params,
    requestType: 'form',
    timeout: 20000,
    ...(options || {}),
  });
}

/** 更新试卷文件 PUT /upload/paper */
export async function uploadPaperUpdate(
  file: any,
  feild: string,
  id: string,
  options?: Record<string, any>,
) {
  const formData = new FormData();
  formData.append(feild, file);

  return request<Record<string, any>>(`/upload/paper/${id}`, {
    method: 'PUT',
    body: formData,
    requestType: 'form',
    timeout: 20000,
    ...(options || {}),
  });
}
