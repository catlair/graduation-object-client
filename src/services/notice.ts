import { request } from 'umi';

/** 设置一条为已读 PATCH /notice/:id */
export const setNoticeRead = (id: string, options?: Record<string, any>) => {
  return request(`/notice/${id}`, {
    method: 'PATCH',
    ...(options || {}),
  });
};

/** 设置全部为已读 PATCH /notice/read-all */
export const setNoticeReadAll = (options?: Record<string, any>) => {
  return request('/notice/read-all', {
    method: 'PATCH',
    ...(options || {}),
  });
};

/** 删除所有已读的 DELETE /notice/read-all */
export const deleteNoticeReadAll = (options?: Record<string, any>) => {
  return request('/notice/read-all', {
    method: 'DELETE',
    ...(options || {}),
  });
};

/** 删除所有 DELETE /notice/all */
export const deleteNoticeAll = (options?: Record<string, any>) => {
  return request('/notice/all', {
    method: 'DELETE',
    ...(options || {}),
  });
};

/** 获取通知 GET /user/notices */
export const getNotices = (options?: Record<string, any>) => {
  return request<API.Page<API.NoticeIconItem>>('/user/notices', {
    method: 'GET',
    noTransform: true,
    ...(options || {}),
  });
};
