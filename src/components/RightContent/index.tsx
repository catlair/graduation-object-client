import { message, Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIcon from '@/components/NoticeIcon/NoticeIcon';
export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const list = [
    {
      id: '000000001',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification' as const,
    },
    {
      id: '000000002',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification' as const,
    },
  ];

  return (
    <Space className={className}>
      <NoticeIcon
        count={6}
        onItemClick={(item) => {
          message.info(`${item.title} 被点击了`);
        }}
        onClear={(title: string, key: string) => message.info('点击了清空更多')}
        loading={false}
        clearText="清空"
        viewMoreText="查看更多"
        onViewMore={() => message.info('点击了查看更多')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={2}
          list={list}
          title="通知"
          emptyText="你已查看所有通知"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="message"
          count={2}
          list={list}
          title="消息"
          emptyText="您已读完所有消息"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="event"
          title="待办"
          emptyText="你已完成所有待办"
          count={2}
          list={list}
          showViewMore
        />
      </NoticeIcon>
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
