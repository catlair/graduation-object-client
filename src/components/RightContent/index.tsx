import { message, Space } from 'antd';
import React from 'react';
import { useModel, useRequest } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIcon from '@/components/NoticeIcon/NoticeIcon';
import {
  deleteNoticeAll,
  deleteNoticeReadAll,
  getNotices,
  setNoticeRead,
  setNoticeReadAll,
} from '@/services/notice';
export type SiderTheme = 'light' | 'dark';

const Notice = ({ data, refresh }) => {
  const allList = data.map((item) => ({
    ...item,
    datetime: item.managerNotice.createdAt,
    title: item.managerNotice.title,
    type: 'all',
  }));
  const unreadList = allList
    .filter((item) => !item.read)
    .map((item) => ({
      ...item,
      type: 'unread',
    }));
  const readedList = allList
    .filter((item) => item.read)
    .map((item) => ({
      ...item,
      type: 'read',
    }));
  return (
    <>
      <NoticeIcon
        count={unreadList.length}
        onClear={async (title: string, key: string) => {
          if (key === 'all') {
            await deleteNoticeAll();
            refresh();
            message.success('清空成功');
          } else if (key === 'unread') {
            await setNoticeReadAll();
            message.info('所有未读消息已清除');
            refresh();
          } else if (key === 'read') {
            await deleteNoticeReadAll();
            refresh();
            message.info('所有已读消息已清除');
          }
        }}
        onItemClick={async (item) => {
          if (!item.read) {
            await setNoticeRead(item.id);
            refresh();
          } else {
            return;
          }
        }}
        loading={false}
        clearText="清空"
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="unread"
          count={unreadList.length}
          list={unreadList}
          title="未读"
          emptyText="你已查看所有通知"
        />
        <NoticeIcon.Tab
          tabKey="read"
          title="已读"
          count={readedList.length}
          list={readedList}
          emptyText="你已查看所有通知"
        />
        <NoticeIcon.Tab
          tabKey="all"
          count={allList.length}
          list={allList}
          title="全部"
          emptyText="你已查看所有通知"
        />
      </NoticeIcon>
    </>
  );
};

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { data, refresh } = useRequest(getNotices);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      {data ? <Notice data={data} refresh={refresh} /> : null}
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
