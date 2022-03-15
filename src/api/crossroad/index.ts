import { http } from '@/utils/http/axios';

//获取路口列表
export function getCrossroadList() {
  return http.request({
    url: '/GetCrossMainArray',
    method: 'get',
  });
}

export function getCrossroadInfo(crossing_id: number | string) {
  return http.request({
    url: '/GetCrossInfo',
    method: 'get',
    params: {
      crossing_id,
    },
  });
}
