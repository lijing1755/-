// 样板模块
export default function(Layout) {
  return [{
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [{
      path: 'export-excel',
      component: () => import('@/views/excel/exportExcel'),
      name: 'ExportExcel',
      meta: {
        title: 'exportExcel'
      }
    }]
  }]
}

