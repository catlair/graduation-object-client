// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 发送邮箱验证码 POST /email/captcha */
export async function getEmailCaptcha(
  data: {
    email: string;
    name?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.EmailCaptcha>('/email/captcha', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 发送邮箱验证码 POST /auth/login/email */
export async function loginByEmail(
  data: {
    email: string;
    code: string;
  },
  options?: Record<string, any>,
) {
  return request<API.LoginResult>('/auth/login/email', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 获取 svg 图片验证码 GET /captche/svg */
export async function getSvgCaptcha(options?: Record<string, any>) {
  return request<API.SvgCaptcha>('/captche/svg', {
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
