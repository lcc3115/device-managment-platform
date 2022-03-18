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
    method: 'post',
    data: {
      jsonData: JSON.stringify(crossroad_info),
    },
  });
}

// 增加路口
export function addCrossroad(crossroad_info) {
  return http.request({
    url: '/InsertCrossData',
    method: 'post',
    data: {
      jsonData: JSON.stringify(crossroad_info),
    },
  });
}

// 删除路口
export function deleteCrossroad(crossroad_id) {
  return http.request({
    url: '/DeleteCrossData',
    method: 'get',
    params: { crossing_id: crossroad_id },
  });
}

// 获取相位数据
export function getCrossroadPhase(crossroad_id) {
  return http.request({
    url: '/GetCrossSchema',
    method: 'get',
    params: {
      crossing_id: crossroad_id,
    },
  });
}

// 更新相位数据
export function changeCrossroadPhase(phase) {
  return http.request({
    url: '/UpdatePhaseData',
    method: 'post',
    data: {
      jsonData: JSON.stringify(phase),
    },
  });
}
