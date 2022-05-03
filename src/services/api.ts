import { request } from 'umi';

/** 获取当前的用户 GET /user/me */
export async function currentUser(options?: Record<string, any>) {
  return request<API.CurrentUser>('/user/me', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取学院列表 GET /college */
export async function getColleges(options?: Record<string, any>) {
  return request<API.College[]>('/college', {
    method: 'GET',
    ...(options || {}),
  });
}
