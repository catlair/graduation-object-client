import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Form, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { getEmailCaptcha } from '@/services/login';
import styles from './index.less';
import { setTokens } from '@/utils/token';
import { validatorLogin } from './utils';
import CaptchaInput from './components/CaptchaInput';

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

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState({ status: '', errorMessage: '' });
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录;
      const data = await validatorLogin({ ...values, type });

      if (!data) {
        message.error('登录失败，请重试！');
        return;
      }

      message.success('登录成功！');
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
          title="Ant Design"
          subTitle={'Ant Design 是西湖区最具影响力的 Web 设计规范'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
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
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
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
                name="captcha"
                phoneName="email"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
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
