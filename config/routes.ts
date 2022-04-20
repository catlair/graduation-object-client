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
    redirect: '/settings',
  },
  {
    name: '个人设置',
    icon: 'setting',
    path: '/settings',
    routes: [
      {
        name: '个人设置',
        icon: 'setting',
        path: '/settings',
        component: './Settings',
        hideInMenu: true,
      },
      {
        name: '更换邮箱',
        icon: 'email',
        path: '/settings/email/:id',
        component: './settings/Email',
        hideInMenu: true,
        layout: false,
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/workplace',
    name: '工作台',
    icon: 'dashboard',
    redirect: '/settings',
    hideInMenu: true,
  },
  {
    path: '/admin',
    name: '用户管理',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
  },
  {
    access: 'canTeacher',
    name: '试卷管理',
    icon: 'filePdf',
    path: '/paper',
    routes: [
      {
        path: '/paper',
        redirect: '/paper/list',
      },
      {
        name: '试卷列表',
        icon: 'filePdf',
        path: '/paper/list',
        component: './paper/List',
      },
      {
        name: '上传试卷',
        icon: 'filePdf',
        path: '/paper/create',
        component: './paper/Create',
      },
      {
        name: '试卷编辑',
        icon: 'filePdf',
        path: '/paper/edit/:id',
        component: './paper/Edit',
        hideInMenu: true,
      },
      {
        name: '试卷详情',
        icon: 'filePdf',
        path: '/paper/detail/:id',
        component: './paper/Detail',
        hideInMenu: true,
        access: 'canViewPaper',
      },
      {
        component: './404',
      },
    ],
  },
  {
    access: 'canDirectors',
    name: '试卷审核',
    icon: 'fileProtect',
    path: '/check',
    routes: [
      {
        path: '/check',
        redirect: '/check/list',
      },
      {
        name: '试卷列表',
        icon: 'fileProtect',
        path: '/check/list',
        component: './check/List',
      },
      {
        name: '试卷审核',
        icon: 'fileProtect',
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
    name: '打印试卷',
    icon: 'printer',
    path: '/print',
    access: 'canSecretary',
    footerRender: false,
    routes: [
      {
        path: '/print',
        redirect: '/print/list',
      },
      {
        name: '打印试卷',
        icon: 'printer',
        path: '/print/list',
        component: './print/List',
        hideInMenu: true,
      },
      {
        name: '打印试卷',
        icon: 'printer',
        path: '/print/view/:id',
        component: './print/View',
        hideInMenu: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '失败页',
    hideInMenu: true,
    path: '/fail',
    component: './sys/Fail',
  },
  {
    name: '成功页',
    hideInMenu: true,
    path: '/success',
    component: './sys/Success',
  },
  {
    component: './404',
  },
];
