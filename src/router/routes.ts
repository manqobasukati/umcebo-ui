import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('components/Account/AccountsLayout.vue'),
    children: [
      { path: '', component: () => import('components/Index.vue') },
      { path: 'login', component: () => import('components/Account/Login.vue') },
      { path: 'sign-up', component: () => import('components/Account/SignUp.vue') }

    ]
  },
  {
    path: '/home',
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
