import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { Crossroads } from '@vicons/carbon';
import { renderIcon } from '@/utils/index';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/crossroad',
    name: 'Crossroad',
    redirect: '/crossroad/list',
    component: Layout,
    meta: {
      title: '路口',
      icon: renderIcon(Crossroads),
      sort: 3,
    },
    children: [
      {
        path: 'list',
        name: 'crossroad_list',
        meta: {
          title: '路口列表',
        },
        component: () => import('@/views/crossroad/index.vue'),
      },
      {
        path: 'info/:id',
        name: 'crossroad_info',
        meta: {
          title: '路口详情',
          hidden: true,
        },
        component: () => import('@/views/crossroad/CrossroadInfo.vue'),
      },
      {
        path: 'add',
        name: 'crossroad_add',
        meta: {
          title: '新增路口',
          hidden: true,
        },
        component: () => import('@/views/crossroad/CrossroadInfo.vue'),
      },
    ],
  },
];

export default routes;
