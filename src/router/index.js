import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'
import { setTitle } from '@/lib/utils'

const router = new VueRouter({
  routes
})
// 注册全局守卫
const HAS_LOGINED = true;
router.beforeEach((to,from,next) => {
	to.meta &&  setTitle(to.meta.title);
	// to,from都是路由对象
	// next 函数 确定跳转
	if(to.name !== 'login') {
		if(HAS_LOGINED) next();
		else next({ name:'login' });
	} else {
		if(HAS_LOGINED) next({name:'home'})
		else next();
	}

})
// router.afterEach((to,from) => {
// 	// 处理一些简单逻辑  取消loading效果
// })
// router.beforeResolve((to,from) => {
// 	// 导航被确认过：组件内守卫，异步守卫
// })
// Vue.use(VueRouter)
export default router
