import {createRouter,createWebHistory} from "vue-router";
import login from './views/login/login.vue'
import homepage from './views/homepage/homepage.vue'

const routers1=[
    {
        path:'/',
        component:login
    },
    {
        path:'/login',
        component:login
    },
    {
        path:'/homepage',
        component:homepage
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes:routers1
})
router.beforeEach((to,from,next)=>{
    //测试数据可以删除
    // next()
    if(sessionStorage.getItem('token')==null){
        if(to.path=='/login'){
            next()
        }else{
            next('/login')
        }
    }else{
        var oldtime=sessionStorage.getItem('oldtime')
        var now=new Date()
        var cha=(now-parseInt(oldtime)) % (1000 * 60 * 60) / (1000 * 60)
        if(cha>30){
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('oldtime')
            next('login')
        }else{
            next()
        }
    }
})

export default router