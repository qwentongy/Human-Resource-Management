import Layout from "@/layout";

export default {
    path: '/departments', // 组织架构
    component: Layout,
    children: [
      {
        path: '',
        name: 'Departments',
        component: () => import('@/views/departments'),
        meta: { title: '审批' }
      }
    ]
  }