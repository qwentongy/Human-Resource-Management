import Layout from "@/layout";

export default {
    path: '/salary', // 工资
    component: Layout,
    children: [
      {
        path: '',
        name: 'Salary',
        component: () => import('@/views/salary'),
        meta: { title: '工资' }
      }
    ]
  }