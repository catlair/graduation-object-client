import React, { useState, useEffect, useCallback } from 'react';
import { Input } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { getSvgCaptcha } from '@/services/login';

interface CaptchaInputValue {
  code?: string;
  key?: string;
}

interface CaptchaInputProps {
  value?: CaptchaInputValue;
  onChange?: (value: CaptchaInputValue) => void;
}

interface CaptchaInputState {
  key: string;
  code: string;
  img: string;
}

const CaptchaInput: React.FC<CaptchaInputProps> = ({ value = {}, onChange }) => {
  const [captcha, setCaptcha] = useState<CaptchaInputState>({} as CaptchaInputState);

  // 触发改变
  const triggerChange = (changedValue: CaptchaInputValue) => {
    if (onChange) {
      onChange({ ...value, key: captcha?.key, ...changedValue });
    }
  };

  const changeCaptchaCode = useCallback(async () => {
    try {
      const { key, img } = await getSvgCaptcha();
      setCaptcha((v) => ({ ...v, key, img }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    changeCaptchaCode();
  }, [changeCaptchaCode]);

  // 输入框变化
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value || '';
    triggerChange({ code });
  };

  // 时间类型变化
  const onClickImage = () => {
    changeCaptchaCode();
  };

  return (
    <div style={{ display: 'flex' }}>
      <Input
        size="large"
        prefix={<SafetyCertificateOutlined />}
        placeholder="请输入验证码！"
        onChange={onChangeInput}
        style={{
          width: '75%',
          marginRight: 5,
          padding: '6.5px 11px 6.5px 11px',
          verticalAlign: 'middle',
        }}
      />
      <span>
        <img
          src={captcha.img}
          style={{
            cursor: 'pointer',
          }}
          onClick={onClickImage}
          alt="验证码"
          title="请输入验证码！"
        />
      </span>
    </div>
  );
};
export default CaptchaInput;
