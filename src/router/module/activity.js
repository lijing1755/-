// // 样板模块
// export default function(Layout) {
//     return [{
//       path: '/activity',
//       component: Layout,
//       redirect: '/activity/index',
//       name: '运营模块',
//       meta: {
//         title: '运营模块',
//         icon: '运营模块'
//       },
//       children: [
//         {
//           path: 'model',
//           component: () => import('@/views/activity/index'),
//           name: 'model',
//           meta: {
//             title: '模块列表'
//           }
//         },
//         {
//           path: 'modelList',
//           component: () => import('@/views/activity/modelList'),
//           name: 'modelList',
//           meta: {
//             title: '模块管理'
//           },
//           hidden:true
//         },
//         {
//           path: 'activity2',
//           component: () => import('@/views/activity/test'),
//           name: 'activity2',
//           meta: {
//             title: '测试'
//           },
//           hidden:true
//         },
//         {
//           path: 'activityList',
//           component: () => import('@/views/activity/activityList'),
//           name: 'activityList',
//           meta: {
//             title: '活动列表'
//           }
//         },
//         {
//           path: 'activityData',
//           component: () => import('@/views/activity/activityData'),
//           name: 'activityData',
//           meta: {
//             title: '活动详情'
//           },
//           hidden:true
//         }]
//     }]
//   }
  
  