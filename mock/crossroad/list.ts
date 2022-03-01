import { resultSuccess } from '../_util';

const crossroad_list = [];

export default [
  //路口 列表数据
  {
    url: '/api/crossroad/list',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(crossroad_list);
    },
  },
];
