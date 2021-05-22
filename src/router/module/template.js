// 样板模块
export default function(Layout) {
  return [{
    path: '/template-details',
    component: Layout,
    redirect: '/template-details/index',
    name: 'template-details',
    meta: {
      title: 'template-details',
      icon: 'template-details'
    },
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/template-details/index'),
      name: 'template-details-index',
      meta: {
        title: '详情'
      }
    }]
  }]
}

