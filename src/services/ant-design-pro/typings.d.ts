// @ts-ignore
/* eslint-disable */

enum Role {
  Admin = 'ADMIN',
  Director = 'DIRECTOR',
  Secretary = 'SECRETARY',
  Teacher = 'TEACHER',
  ViceDirector = 'VICE_DIRECTOR',
}

interface ErrorInfoStructure<T = any> {
  success: boolean; // if request is success
  data?: T; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // Convenient for backend Troubleshooting: host of current access server
}

interface RequestError extends Error {
  data?: any; // 这里是后端返回的原始数据
  info?: ErrorInfoStructure;
}

declare namespace API {
  type CurrentUser = User;

  type TokenResult = {
    accessToken?: string;
    refreshToken?: string;
  };

  type LoginResult = TokenResult & {
    user?: User;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type EmailCaptcha = {
    name?: string;
    email: string;
    createdAt: string;
  };

  type LoginParams = {
    username?: string | number;
    password?: string;
    autoLogin?: boolean;
    email?: string;
    captcha?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
