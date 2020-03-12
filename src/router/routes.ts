import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  
  {
    path: '/',
    component: () => import('components/Home/HomeLayout.vue'),
    children: [
      //{path:'',component:()=>import('')}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('components/Error404.vue')
  })
}

export default routes
