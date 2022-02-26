import { useRef } from 'react';
import { Button, message } from 'antd';
import { ProFormCaptcha, ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { SafetyCertificateOutlined, MailOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getEmailCaptcha } from '@/services/login';
import { changeEmail } from '@/services/user';

export default ({ email }) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm
      title="修改邮箱"
      formRef={formRef}
      width={520}
      trigger={<a>修改</a>}
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
        // 新邮箱不能和旧邮箱一样
        if (values.email === values.oldEmail) {
          message.error('新邮箱不能和旧邮箱一样');
          return;
        }
        try {
          await changeEmail(values);
          message.success('提交成功');
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
          name="oldEmail"
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
          phoneName="oldEmail"
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
              console.log(error);
            }
          }}
        />
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined className={styles.prefixIcon} />,
          }}
          name="email"
          placeholder={'请输入更换邮箱账号！'}
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
      </div>
    </ModalForm>
  );
};
