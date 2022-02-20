import React, { useState, useEffect, useCallback } from 'react';
import { Input } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { getSvgCaptcha } from '@/services/login';

interface CaptchaInputValue {
  captchaCode?: string;
  captchaKey?: string;
}

interface CaptchaInputProps {
  value?: CaptchaInputValue;
  onChange?: (value: CaptchaInputValue) => void;
}

const CaptchaInput: React.FC<CaptchaInputProps> = ({ value = {}, onChange }) => {
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [captchaKey, setCaptchaKey] = useState<string>('');
  const [imageData, setImageData] = useState<string>('');

  // 触发改变
  const triggerChange = (changedValue: { captchaCode?: string; captchaKey?: string }) => {
    if (onChange) {
      onChange({ captchaCode, captchaKey, ...value, ...changedValue });
    }
  };

  const changeCaptchaCode = useCallback(async () => {
    try {
      const { key, img } = await getSvgCaptcha();
      setCaptchaKey(key);
      setImageData(img);
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
    if (!isEmpty(code)) {
      setCaptchaCode(code);
    }
    triggerChange({ captchaCode: code });
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
        placeholder="请输入验证码"
        onChange={onChangeInput}
        style={{
          width: '75%',
          marginRight: 5,
          padding: '6.5px 11px 6.5px 11px',
          verticalAlign: 'middle',
        }}
      />
      <span
        className="ant-input-affix-wrapper-lg"
        title="点击刷新验证码"
        style={{
          display: 'inline-block',
          width: '40%',
          background: `url(${imageData}) no-repeat`,
          cursor: 'pointer',
        }}
        onClick={onClickImage}
      >
        <span className="ant-input" style={{ padding: '0', border: '0' }} />
      </span>
    </div>
  );
};
export default CaptchaInput;
