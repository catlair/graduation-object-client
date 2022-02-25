import { request } from 'umi';

/** 提交审核 POST /paper */
export async function createCheck(data: API.CreateCheckParams, options?: Record<string, any>) {
  return request<Record<string, any>>('/check', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
