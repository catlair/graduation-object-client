import { StatusCodeEnum } from '@/enums/status-code-emum';
import type { RequestConfig } from 'umi';
import { request as defHttp } from 'umi';
import { getAccessToken, refreshTokens } from './token';
import type { RequestOptionsInit } from 'umi-request';

/** 添加 head token */
export const authHeaderInterceptor = (url: string, options: any) => {
  const accessToken = getAccessToken();
  const authHeader = { Authorization: accessToken ? `Bearer ${accessToken}` : null };

  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

let refreshLocked = false;
const refreshHandle = async () => {
  if (refreshLocked) {
    return;
  }
  try {
    refreshLocked = true;
    await refreshTokens();
  } catch (err) {
    refreshLocked = false;
    throw err;
  } finally {
    setTimeout(() => {
      refreshLocked = false;
    }, 30000);
  }
};
/** 判断过期 */
export const loginExpiredInterceptor = async (res: Response, options: RequestOptionsInit) => {
  let data;
  try {
    data = await res.clone().json();
  } catch (error) {
    console.error(error);
    return res;
  }

  // 目前问题是如果有多个接口同时请求, 可能会导致重复请求
  if (data.errorCode === StatusCodeEnum.LOGIN_EXPIRED) {
    await refreshHandle();
    return await defHttp(options.url, options);
  }

  return res;
};

/** umi 请求配置  */
export const request: RequestConfig = {
  timeout: 5000,
  errorConfig: {},
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [loginExpiredInterceptor],
  middlewares: [
    async function transform(ctx, next) {
      await next();
      const body = ctx.res;

      if (ctx.req.options.noTransform) {
        return;
      }

      if (!body.pageSize) {
        ctx.res = body.data || body;
      }
    },
  ],
  prefix: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};
