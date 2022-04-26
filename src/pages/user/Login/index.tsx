import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Form, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { getEmailCaptcha } from '@/services/login';
import styles from './index.less';
import { setTokens, storage } from '@/utils/token';
import { validatorLogin } from './utils';
import CaptchaInput from './components/CaptchaInput';
import { getGreeting } from '@/utils/time';

function setAutoLogin(autoLogin) {
  if (autoLogin) {
    storage.changeStorageType('localStorage');
    window.localStorage.setItem('autoLogin', '1');
  } else {
    storage.changeStorageType('sessionStorage');
    window.localStorage.removeItem('autoLogin');
  }
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

interface LoginValueType {
  username?: string;
  password?: string;
  img_captcha?: {
    code: string;
    key: string;
  };
  mail_captcha?: string;
  autoLogin?: boolean;
  email?: string;
}

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState({ status: '', errorMessage: '' });
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: LoginValueType) => {
    let params: any;
    if (type === 'account') {
      params = {
        username: values.username,
        password: values.password,
        captcha: values.img_captcha,
        type,
      };
    } else {
      params = {
        email: values.email,
        captcha: values.mail_captcha,
        type,
      };
    }

    try {
      // 登录;
      const data = await validatorLogin(params);

      if (!data) {
        message.error('登录失败，请重试！');
        return;
      }

      message.success('登录成功！');
      setAutoLogin(values.autoLogin);
      setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      await setInitialState((s: any) => ({ ...s, currentUser: data.user }));

      /** 此方法会跳转到 redirect 参数所在的位置 */
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as {
        redirect: string;
      };

      history.push(redirect || '/');
      return;
    } catch (error) {
      const { message: msg, name } = error as RequestError;
      if (name === 'BizError') {
        setUserLoginState({ status: 'error', errorMessage: msg });
      } else {
        console.error(error);
        message.error('登录失败，请重试！');
      }
    }
  };

  const { status, errorMessage } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Paper Management OS"
          subTitle={getGreeting()}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账户密码登录'} />
            <Tabs.TabPane key="email" tab={'邮箱验证登录'} />
          </Tabs>

          {status === 'error' && type === 'account' && <LoginMessage content={errorMessage} />}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户邮箱或者id'}
                rules={[
                  {
                    required: true,
                    message: '用户是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入用户密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  // 限制密码长度 6-20 位
                  {
                    min: 6,
                    max: 20,
                    message: '密码长度为 6-20 位！',
                  },
                ]}
              />
              <Form.Item
                name="img_captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                  {
                    validator: (_rule, value) => {
                      if (Number.isInteger(Number(value.code))) {
                        return Promise.resolve();
                      }
                      return Promise.reject('验证码格式不正确！');
                    },
                    validateTrigger: 'onBlur',
                  },
                ]}
              >
                <CaptchaInput />
              </Form.Item>
            </>
          )}

          {status === 'error' && type === 'email' && <LoginMessage content={errorMessage} />}
          {type === 'email' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                name="email"
                placeholder={'请输入邮箱账号！'}
                rules={[
                  {
                    required: true,
                    message: '邮箱账号是必填项！',
                  },
                  {
                    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message: '不合法的邮箱账号！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="mail_captcha"
                phoneName="email"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                  {
                    validator: (_rule, value) => {
                      if (Number.isInteger(Number(value))) {
                        return Promise.resolve();
                      }
                      return Promise.reject('验证码格式不正确！');
                    },
                  },
                  {
                    len: 6,
                    message: '验证码长度为 6 位！',
                    validateTrigger: 'onBlur',
                  },
                ]}
                onGetCaptcha={async (email) => {
                  try {
                    await getEmailCaptcha({ email });
                    message.success('获取验证码成功！');
                  } catch (error) {
                    console.warn(error);
                  }
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
