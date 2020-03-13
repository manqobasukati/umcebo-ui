import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  
  {
    path: '/',
    component: () => import('components/Home/HomeLayout.vue'),
    children: [
      {path:'/home',component:()=>import('components/Home/Home.vue')},
      {path:'menu',component:()=>import('components/Menu.vue')}
    ]
  },
  

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('components/Error404.vue')
  })
}

export default routes
