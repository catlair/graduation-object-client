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

  type User = {
    id: number;
    email: string;
    name: string;
    password: string;
    college: string;
    createdAt: Date;
    updatedAt: Date;
    roles: string[];
  };

  type ChangePassword = {
    oldPassword: string;
    password: string;
  };

  type ResetPassword = {
    email: string;
    code: string;
    password: string;
  };

  type SvgCaptcha = {
    img: string;
    key: string;
  };

  type College = {
    id: number;
    name: string;
  };

  type CreatePaperParams = {
    college: string;
    remark?: string;
    course: string;
  };

  type Paper = {
    id: string;
    aName: string;
    bName: string;
    course: string;
    college: string;
    teacherId: number;
    remark?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    teacher?: User;
  };

  type UploadPaperParams = Partial<Omit<CreatePaperParams, 'remark'>>;

  type CreateCheckParams = {
    content: string;
    images?: string[];
    status: string;
    paperId: string;
  };

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

  type ChangeEmail = {
    email: string;
    oldEmail: string;
    code: string;
  };

  type UpdateEmail = {
    key: string;
    userId: number;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    email?: string;
    captcha?:
      | {
          code: string;
          key: string;
        }
      | string;
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

  /** 分页 */
  type Page<T> = {
    current: number;
    pageSize: number;
    success: true;
    data: T[];
    total: number;
  };
}
