import { http } from '@/utils/http/axios';

//获取路口列表
export function getCrossroadList() {
  return http.request({
    url: '/crossroad/list',
    method: 'get',
  });
}
