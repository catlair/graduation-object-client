import { request } from 'umi';

/** 创建试卷 POST /paper */
export async function createPaper(
  data: API.CreatePaperParams,
  paperName: { a: string; b: string },
  options?: Record<string, any>,
) {
  return request<Record<string, any>>('/paper', {
    method: 'POST',
    data: {
      ...data,
      aName: paperName.a,
      bName: paperName.b,
    },
    ...(options || {}),
  });
}

/** 获取试卷列表 GET /paper/teacher */
export async function getPapersByTeacher(
  params: API.PageParams = { pageSize: 10, current: 1 },
  options?: Record<string, any>,
) {
  return request<API.Page<API.Paper>>('/paper/teacher', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取试卷列表 GET /paper */
export async function getPapersByCollege(
  params: API.PageParams = { pageSize: 10, current: 1 },
  options?: Record<string, any>,
) {
  return request<API.Page<API.Paper>>('/paper', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取试卷 GET /paper/:id */
export async function getPaper(id: string, options?: Record<string, any>) {
  return request<API.Paper>(`/paper/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新试卷 Patch /paper/:id */
export async function patchPaper(id: string, content: string, options?: Record<string, any>) {
  return request<API.Paper>(`/paper/${id}`, {
    method: 'PATCH',
    data: {
      content,
    },
    ...(options || {}),
  });
}

/** 获取试卷的生命周期 GET /paper/life/:id */
export async function getPaperLife(id: string, options?: Record<string, any>) {
  return request<API.PaperLife[]>(`/paper/life/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}
