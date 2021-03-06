import React, { useState, useRef, useLayoutEffect } from 'react';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import SecurityView from './components/Security';
import styles from './style.less';

const { Item } = Menu;

type AccountSettingsStateKeys = 'security';
type AccountSettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: AccountSettingsStateKeys;
};

const AccountSettings: React.FC = () => {
  const menuMap: Record<string, React.ReactNode> = {
    security: '安全设置',
  };

  const [initConfig, setInitConfig] = useState<AccountSettingsState>({
    mode: 'inline',
    selectKey: 'security',
  });
  const dom = useRef<HTMLDivElement>();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setInitConfig({ ...initConfig, mode: mode as AccountSettingsState['mode'] });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'security':
        return <SecurityView />;
      default:
        return null;
    }
  };

  return (
    <PageHeaderWrapper>
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              dom.current = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={initConfig.mode}
              selectedKeys={[initConfig.selectKey]}
              onClick={({ key }) => {
                setInitConfig({
                  ...initConfig,
                  selectKey: key as AccountSettingsStateKeys,
                });
              }}
            >
              {getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
            {renderChildren()}
          </div>
        </div>
      </GridContent>
    </PageHeaderWrapper>
  );
};
export default AccountSettings;
