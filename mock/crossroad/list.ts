// import { resultSuccess } from '../_util';

// const crossroad_list = [
//   {
//     crossing_id: 42010001,
//     intersection: '十字型',
//     Channel: '有',
//     width_Sections_road: '4',
//     width_interse_road: '3',
//     crossing_name: '测试路口',
//     longitude: '30.1234',
//     latitude: '114.1234',
//     organiz: '借道左转',
//     signal_brand: '海信',
//     road_paving: '沥青',
//     submit_time: '2022-02-1 15:00:00',
//     operater: '0',
//     roadList: [
//       {
//         direction: '东',
//         export_numb: '3',
//         import_numb: '4',
//         straight: '0',
//         left: '1',
//         right: '1',
//         turnaround: '0',
//         left_turn: '1',
//         straight_left: '1',
//         straight_right: '0',
//         left_straight_right: '0',
//         variation: '0',
//       },
//       {
//         direction: '西',
//         export_numb: '2',
//         import_numb: '4',
//         straight: '0',
//         left: '1',
//         right: '0',
//         turnaround: '1',
//         left_turn: '1',
//         straight_left: '0',
//         straight_right: '0',
//         left_straight_right: '1',
//         variation: '0',
//       },
//       {
//         direction: '南',
//         export_numb: '3',
//         import_numb: '4',
//         straight: '0',
//         left: '1',
//         right: '1',
//         turnaround: '0',
//         left_turn: '0',
//         straight_left: '1',
//         straight_right: '0',
//         left_straight_right: '0',
//         variation: '1',
//       },
//       {
//         direction: '北',
//         export_numb: '4',
//         import_numb: '4',
//         straight: '0',
//         left: '1',
//         right: '1',
//         turnaround: '0',
//         left_turn: '1',
//         straight_left: '0',
//         straight_right: '0',
//         left_straight_right: '1',
//         variation: '0',
//       },
//     ],
//     subList: [
//       {
//         attribute: 'signs',
//         longitude: '30.1234',
//         latitude: '114.1234',
//         east: '有',
//         south: '有',
//         west: '有',
//         north: '有',
//       },
//       {
//         attribute: 'guide',
//         longitude: '30.2345',
//         latitude: '114.2345',
//         east: '有',
//         south: '有',
//         west: '有',
//         north: '有',
//       },
//       {
//         attribute: 'isolation',
//         longitude: '30.2345',
//         latitude: '114.2345',
//         east: '有',
//         south: '无',
//         west: '有',
//         north: '无',
//       },
//       {
//         attribute: 'vehicleSignal',
//         longitude: '30.2345',
//         latitude: '114.2345',
//         east: '有',
//         south: '有',
//         west: '有',
//         north: '有',
//       },
//       {
//         attribute: 'pedeSignal',
//         longitude: '30.2345',
//         latitude: '114.2345',
//         east: '有',
//         south: '有',
//         west: '有',
//         north: '有',
//       },
//       {
//         attribute: 'EPMonitor',
//         longitude: '30.2345',
//         latitude: '114.2345',
//         east: '有',
//         south: '有',
//         west: '有',
//         north: '有',
//       },
//       {
//         attribute: 'videoMonitor',
//         longitude: '30.2345',
//         latitude: '114.2345',
//         east: '有',
//         south: '有',
//         west: '有',
//         north: '有',
//       },
//     ],
//   },
// ];

// export default [
//   //路口 列表数据
//   {
//     url: '/api/crossroad/list',
//     timeout: 1000,
//     method: 'get',
//     response: () => {
//       return resultSuccess(crossroad_list);
//     },
//   },
// ];
