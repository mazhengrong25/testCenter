import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/*页面  */
const routes = [
	
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path=="/login"){
    next();
  }else{
    if(localStorage.login){
      next()
    }else{
      next({name:"Login"})
    }
  }

})

export default router
