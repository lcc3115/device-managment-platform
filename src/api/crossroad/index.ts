import { http } from '@/utils/http/axios';

//获取所有路口主要属性
export function getCrossroadList() {
  return http.request({
    url: '/GetCrossMainArray',
    method: 'get',
  });
}

//根据路口ID查询路口数据 ,crossing_id 非空
export function getCrossroadInfo(crossing_id) {
  return http.request({
    url: '/GetCrossInfo',
    method: 'get',
    params: {
      crossing_id,
    },
  });
}

//修改路口数据
export function changeCrossroadInfo(crossroad_info) {
  return http.request({
    url: '/UpdateCrossData',
    method: 'get',
    params: {
      jsonData: crossroad_info,
    },
  });
}
