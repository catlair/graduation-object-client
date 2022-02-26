import { useRef } from 'react';
import { Button, message } from 'antd';
import { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { LockOutlined } from '@ant-design/icons';
import styles from './index.less';
import { changePassword } from '@/services/user';
import { history } from 'umi';
import { loginPath } from '@/constant';

const rules = [
  {
    required: true,
    message: '密码不能为空',
  },
  {
    max: 20,
    min: 6,
    message: '密码长度必须在6-20位之间',
  },
];

export default () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm<{
      oldPassword: string;
      password: string;
      confirm: string;
    }>
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
        // 新密码不能和旧密码一样
        if (values.password === values.oldPassword) {
          message.info('新密码不能和旧密码一样');
          return;
        } else if (values.password !== values.confirm) {
          message.error('两次密码不一致');
          return;
        }
        try {
          await changePassword(values);
          message.success('密码修改成功');
          history.push(loginPath);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }}
    >
      <div className={styles.modalWidth}>
        <ProFormText.Password
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          label="请输入原密码"
          name="oldPassword"
          placeholder="请输入旧密码！"
          rules={rules}
        />
        <ProFormText.Password
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          label="请输入密码"
          name="password"
          placeholder="请输入新密码！"
          rules={rules}
        />
        <ProFormText.Password
          label="请再次输入密码"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          name="confirm"
          placeholder="请确认新密码！"
          rules={rules}
        />
      </div>
    </ModalForm>
  );
};
