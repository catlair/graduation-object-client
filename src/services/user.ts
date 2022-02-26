import { request } from 'umi';

/** 请求更换邮箱 POST /user/email */
export const changeEmail = (data: API.ChangeEmail, options?: Record<string, any>) => {
  return request('/user/email', {
    method: 'POST',
    data,
    ...(options || {}),
  });
};

/** 更新邮箱 PATCH /user/email */
export const updateEmail = (data: API.UpdateEmail, options?: Record<string, any>) => {
  return request('/user/email', {
    method: 'PATCH',
    data,
    ...(options || {}),
  });
};

/** 修改密码 PATCH /user/password */
export const changePassword = (data: API.ChangePassword, options?: Record<string, any>) => {
  return request('/user/password', {
    method: 'PATCH',
    data,
    ...(options || {}),
  });
};

/** 重置密码 PATCH /user/password/reset */
export const resetPassword = (data: API.ResetPassword, options?: Record<string, any>) => {
  return request('/user/password/reset', {
    method: 'PATCH',
    data,
    ...(options || {}),
  });
};
