import { request } from 'umi';

/** 获取当前的用户 GET /currentUser */
export async function currentUser(options?: Record<string, any>) {
  return request<API.CurrentUser>('/user/me', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /auth/logout */
export async function outLogin(token: string, options?: Record<string, any>) {
  return request<Record<string, any>>('/auth/logout', {
    method: 'DELETE',
    data: {
      token,
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /login/account */
export async function login(body: API.LoginParams, options?: Record<string, any>) {
  return request<API.LoginResult>('/auth/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 刷新 accessToken /auth/token/refresh */
export async function refreshToken(token: string, options?: Record<string, any>) {
  return request<API.TokenResult>('/auth/token/refresh', {
    method: 'PUT',
    data: {
      token: token,
    },
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

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
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
