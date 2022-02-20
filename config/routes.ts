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
    redirect: '/Workplace',
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
        path: '/admin/sub-page',
        name: '二级管理页',
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
    path: '/papper',
    routes: [
      {
        name: '试卷列表',
        icon: 'smile',
        path: '/papper/list',
        component: './papper/List',
      },
      {
        name: '上传试卷',
        icon: 'smile',
        path: '/papper/create',
        component: './papper/Create',
      },
      {
        name: '试卷编辑',
        icon: 'smile',
        path: '/papper/edit/:id',
        component: './papper/Edit',
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
    component: './Check',
  },
  {
    name: '个人设置',
    icon: 'smile',
    path: '/accountsettings',
    component: './AccountSettings',
  },
  {
    component: './404',
  },
];
