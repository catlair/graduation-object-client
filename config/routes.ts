export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/workplace',
  },
  {
    path: '/workplace',
    name: '欢迎',
    icon: 'smile',
    component: './Workplace',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/add-user',
        name: '添加用户',
        icon: 'smile',
        component: './Workplace',
      },
      {
        component: './404',
      },
    ],
  },
  {
    access: 'canTeacher',
    name: '试卷管理',
    icon: 'table',
    path: '/paper',
    routes: [
      {
        path: '/paper',
        redirect: '/paper/list',
      },
      {
        name: '试卷列表',
        icon: 'smile',
        path: '/paper/list',
        component: './paper/List',
      },
      {
        name: '上传试卷',
        icon: 'smile',
        path: '/paper/create',
        component: './paper/Create',
      },
      {
        name: '试卷编辑',
        icon: 'smile',
        path: '/paper/edit/:id',
        component: './paper/Edit',
        hideInMenu: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    access: 'canDirectors',
    name: '试卷审核',
    icon: 'smile',
    path: '/check',
    routes: [
      {
        path: '/check',
        redirect: '/check/list',
      },
      {
        name: '试卷列表',
        icon: 'smile',
        path: '/check/list',
        component: './check/List',
      },
      {
        name: '试卷审核',
        icon: 'smile',
        path: '/check/operation/:id',
        component: './check/Operation',
        hideInMenu: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '个人设置',
    icon: 'smile',
    path: '/settings',
    component: './settings',
    routes: [
      {
        name: '更换邮箱',
        icon: 'smile',
        path: '/settings/list',
        component: './settings/Email',
        hideInMenu: true,
      },
      {
        name: '修改密码',
        icon: 'smile',
        path: '/settings/operation/:id',
        component: './settings/Password',
        hideInMenu: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '打印试卷',
    icon: 'smile',
    path: '/print',
    component: './Print',
  },
  {
    name: '失败页',
    icon: 'smile',
    path: '/fail',
    component: './sys/Fail',
  },
  {
    name: '成功页',
    icon: 'smile',
    path: '/success',
    component: './sys/Success',
  },
  {
    component: './404',
  },
];
