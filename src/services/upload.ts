import { uploadPaperFields } from '@/enums/field';
import { request } from 'umi';
import { ResponseType } from 'umi-request';

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

/** 上传图片 POST /upload/picture */
export async function uploadPicture(file: FormData, options?: Record<string, any>) {
  return request(`/upload/picture`, {
    method: 'POST',
    body: file,
    ...(options || {}),
  });
}
/** 删除图片 DELETE /upload/picture */
export async function deletePicture(path: string, options?: Record<string, any>) {
  return request(`/upload/picture/${path}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 获取 pdf 文件 GET /upload/${path}/${name} */
export async function getFile(
  name: string,
  path: 'paper' | 'img' = 'paper',
  type: ResponseType = 'blob',
  options?: Record<string, any>,
) {
  return request(`/upload/${path}/${name}`, {
    method: 'GET',
    ...(options || {}),
    responseType: type,
    noTransform: true,
  });
}
