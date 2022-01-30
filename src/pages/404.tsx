import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉, 你访问的页面并不存在."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        回主页
      </Button>
    }
  />
);

export default NoFoundPage;
