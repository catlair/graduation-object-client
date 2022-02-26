import { updateEmail } from '@/services/user';
import { Input, message } from 'antd';
import { useEffect, useRef } from 'react';
import { history, useRouteMatch } from 'umi';
import styles from './index.less';
import { loginPath } from '@/constant';

export default () => {
  // 获取 input 元素
  const inputRef = useRef<Input>(null);
  const match = useRouteMatch();

  useEffect(() => {
    fetch('https://api.xygeng.cn/Bing/url/')
      .then((res) => res.json())
      .then(({ data }) => {
        document.body.style.backgroundImage = `url(${data})`;
      })
      .catch(() => {
        document.body.style.backgroundImage = `url(https://bing.ioliu.cn/photo/DarwinsArch_ZH-CN9740478501?force=download)`;
      });
    inputRef?.current?.focus();
  }, []);

  return (
    <div className={styles.wrapper}>
      <main className={styles.wrapper}>
        <Input
          ref={inputRef}
          className={styles.input}
          placeholder="请输入用户 ID"
          onKeyPress={async (e) => {
            // 回车键
            if (e.key === 'Enter') {
              await updateEmail({
                // @ts-ignore
                userId: +e.target.value,
                key: match.params.id,
              });
              message.success('修改成功');
              history.push(loginPath);
            }
          }}
        ></Input>
      </main>
    </div>
  );
};
