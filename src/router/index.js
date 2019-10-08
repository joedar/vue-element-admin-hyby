import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * No注意te: sub-menu 只在路由的子路由大于等于1个的时候出现
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置成true，item将不会出现在侧边栏(默认:false)
 * alwaysShow: true               如果设置成true，将始终显示根菜单
 *                                如果未设置该属性，当item有大于一个子路由的时候，它将变为嵌套模式，否则不显示跟菜单
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']     控制页面的角色（你可以设置多个角色）
    title: 'title'                显示在侧边栏的导航名称，以及面包屑上 (推荐设置)
    icon: 'svg-name'              侧边栏导航的icon
    breadcrumb: false             如果设置成false，将不显示在面包屑上 (默认:true)
    activeMenu: '/example/list'   如果设置了路径，则侧边栏将高亮显示您设置的路径
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
/**
 * 基本的路由
 * 无需权限都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/administrators',
    component: Layout,
    redirect: '/administrators/list',
    name: 'Administrators',
    meta: { title: '管理员', icon: 'admin' },
    children: [
      {
        path: 'list',
        name: 'administratorsList',
        component: () => import('@/views/administrators/list'),
        meta: { title: '列表', icon: '' }
      },
      {
        path: 'add',
        name: 'administratorsAdd',
        component: () => import('@/views/administrators/add'),
        meta: { title: '添加', icon: '' }
      },
      {
        path: 'modify/:id(\\d+)',
        name: 'administratorsModify',
        component: () => import('@/views/administrators/modify'),
        meta: { title: '修改', icon: '' },
        hidden: true
      }
    ]
  },

  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: '',
        name: 'BannerIndex',
        component: () => import('@/views/banner/index'),
        meta: { title: 'Banner图管理', icon: '' }
      }
    ]
  },

  {
    path: '/wechatUsers',
    component: Layout,
    children: [
      {
        path: '',
        name: 'wechatUsersIndex',
        component: () => import('@/views/wechatUsers/index'),
        meta: { title: '微信用户列表', icon: '' }
      }
    ]
  },

  {
    path: '/news',
    component: Layout,
    redirect: '/news/list',
    name: 'News',
    meta: { title: '好运新闻', icon: '' },
    children: [
      {
        path: 'list',
        name: 'NewsList',
        component: () => import('@/views/news/list'),
        meta: { title: '列表', icon: '' }
      },
      {
        path: 'add',
        name: 'NewsAdd',
        component: () => import('@/views/news/add'),
        meta: { title: '添加', icon: '' }
      },
      {
        path: 'modify/:id(\\d+)',
        name: 'NewsModify',
        component: () => import('@/views/news/modify'),
        meta: { title: '修改', icon: '' },
        hidden: true
      }
    ]
  },

  {
    path: '/item',
    component: Layout,
    redirect: '/item/list',
    name: 'item',
    meta: { title: '产品', icon: 'curtain' },
    children: [
      {
        path: 'list',
        name: 'itemList',
        component: () => import('@/views/item/list'),
        meta: { title: '列表', icon: '' }
      },
      {
        path: 'add',
        name: 'itemAdd',
        component: () => import('@/views/item/add'),
        meta: { title: '添加', icon: '' }
      },
      {
        path: 'modify/:id(\\d+)',
        name: 'itemModify',
        component: () => import('@/views/item/modify'),
        meta: { title: '修改', icon: '' },
        hidden: true
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    name: 'order',
    meta: { title: '订单', icon: 'order' },
    children: [
      {
        path: 'list',
        name: 'orderList',
        component: () => import('@/views/order/list'),
        meta: { title: '列表', icon: '' }
      },
      {
        path: 'add',
        name: 'orderAdd',
        component: () => import('@/views/order/add'),
        meta: { title: '添加', icon: '' }
      },
      {
        path: 'modify/:id(\\d+)',
        name: 'orderModify',
        component: () => import('@/views/order/modify'),
        meta: { title: '修改', icon: '' },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // require service support
  // mode: 'history',
  // 路由切换滚至顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
