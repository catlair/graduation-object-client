import { useRef } from 'react';
import { Button, message } from 'antd';
import { ProFormCaptcha, ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getEmailCaptcha } from '@/services/login';
import { resetPassword } from '@/services/user';
import { history } from 'umi';
import { loginPath } from '@/constant';

export default ({ email }) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm<{
      email: string;
      code: string;
      password: string;
    }>
      title="修改邮箱"
      formRef={formRef}
      width={520}
      trigger={<a>重置密码</a>}
      submitter={{
        render: (props, defaultDoms) => {
          return [
            ...defaultDoms,
            <Button
              key="extra-reset"
              onClick={() => {
                props.reset();
              }}
            >
              重置
            </Button>,
          ];
        },
      }}
      onFinish={async (values) => {
        try {
          await resetPassword(values);
          message.success('重置密码成功');
          history.push(loginPath);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }}
    >
      <div className={styles.modalWidth}>
        <ProFormText
          label={`请输入邮箱：${email}`}
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
          width="md"
          style={{ marginTop: 16 }}
          fieldProps={{
            size: 'large',
            width: 'md',
            prefix: <SafetyCertificateOutlined />,
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
          name="code"
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
              console.error(error);
            }
          }}
        />
        <ProFormText.Password
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          name="password"
          placeholder="请输入密码！"
          rules={[
            {
              required: true,
              message: '密码是必填项！',
            },
            {
              min: 6,
              max: 20,
              message: '密码长度必须在 6 到 20 个字符之间！',
            },
          ]}
        />
      </div>
    </ModalForm>
  );
};
