import { loginByEmail, login } from '@/services/login';
import { message } from 'antd';
import type { LoginInput } from './interface';

export async function validatorLogin(values: API.LoginParams) {
  if (values.type === 'email') {
    return await loginByEmail({ email: values.email!, code: values.captcha as string });
  }
  const loginInput: LoginInput = { password: '', username: '' };
  if (!values.password || !values.username) {
    message.error('请输入用户信息');
    return;
  } else {
    loginInput.password = values.password;
    loginInput.username = values.username;
  }
  return await login({ ...loginInput, ...(values.captcha as {}) } as API.LoginParams);
}
