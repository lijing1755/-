// 样板模块
export default function(Layout) {
  return [{
    path: '/element-details',
    component: Layout,
    redirect: '/element-details/index',
    name: 'element-details',
    meta: {
      title: 'element-details',
      icon: 'element-details'
    },
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/element-details/index'),
      name: 'details-index',
      meta: {
        title: '详情'
      }
    }]
  }]
}

