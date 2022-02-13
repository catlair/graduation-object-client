// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 发送邮箱验证码 POST /email/captcha */
export async function getEmailCaptcha(
  data: {
    email: string;
    name?: string;
  },
  options?: { [key: string]: any },
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
  options?: { [key: string]: any },
) {
  return request<API.LoginResult>('/auth/login/email', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
