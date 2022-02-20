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

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: Record<string, any>) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    prefix: '',
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: Record<string, any>) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    prefix: '',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: Record<string, any>) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    prefix: '',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    prefix: '',
    ...(options || {}),
  });
}
