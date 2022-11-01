import Layout from "@/layout";

export default {
    path: '/setting', // 设置
    component: Layout,
    children: [
      {
        path: '',
        name: 'Setting',
        component: () => import('@/views/setting'),
        meta: { title: '设置' }
      }
    ]
  }