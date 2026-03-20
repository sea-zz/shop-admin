import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import store from '../store';
import { getCookie, LOGIN_TOKEN, delCookie } from '../common/utils/cookie';

const Home = () => import('@/pages/index.vue');
const About = () => import('@/pages/about.vue');
const NotFound = () => import('@/pages/404.vue');
const Login = () => import('@/pages/login.vue');
const Layout = () => import('@/layout/layout.vue');
const ImageList = () => import('@/pages/image/list.vue');
const GoodsList = () => import('@/pages/goods/list.vue');
const SkusList = () => import('@/pages/skus/list.vue');
const NoticeList = () => import('@/pages/notice/list.vue');
const ManagerList = () => import('@/pages/manager/list.vue');

const routes = [
  {
    path: '/',
    name: 'admin',
    component: Layout,
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
];

// 动态路由，动态匹配菜单添加路由
const scyncRoutes = [
  {
    path: '/',
    name: '/',
    component: Home,
    // 必须是meta字段
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodsList,
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    component: SkusList,
    meta: {
      title: '规格管理'
    }
  },
  {
    path: '/image/list',
    name: '/image/list',
    component: ImageList,
    meta: {
      title: '图库管理'
    }
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: NoticeList,
    meta: {
      title: '公告管理'
    }
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: ManagerList,
    meta: {
      title: '管理员管理'
    }
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
});


let hasUserInfo = false;
router.beforeEach(async (to, from, next) => {
  const token = getCookie(LOGIN_TOKEN);
  if (!token && to.path != '/login') {
    return next({ path: '/login' });
  }
  if (token && to.path == '/login') {
    return next({ path: from.path ? from.path : '/' });
  }
  let hasNewRoute = false;
  if (token && !hasUserInfo) {
    const { menus } = await store.dispatch('getUserInfo');
    hasNewRoute = addRoutes(menus);
    hasUserInfo = true;
  }

  document.title = `${to?.meta?.title ? to?.meta?.title : ''}-拼多少商城后台管理系统`;
  // 解决刷新路由到404的问题
  hasNewRoute ? next(to.fullPath) : next();
})

// 动态添加路由的方法,根据接口菜单动态返回菜单
export const addRoutes = (menus) => {
  // 解决刷新路由到404的问题
  let hasNewRoute = false;
  const findAndAddRoute = (arr) => {
    arr.forEach(e => {
      const item = scyncRoutes.find(item => item.path === e.frontpath);

      if (item && !router.hasRoute(item?.path)) {
        router.addRoute('admin', item);
        hasNewRoute = true;
      }
      if (e?.child?.length) {
        findAndAddRoute(e.child);
      }
    })
  }

  findAndAddRoute(menus);

  return hasNewRoute;
}


