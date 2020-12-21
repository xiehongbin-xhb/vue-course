import Home from '@/views/Home.vue'
// 路由route 是一个列表，
// 路由对象的属性：包含两个属性 path路径和component组件
export default [
  {
    path: '/',
		name: 'Home',
		// 别名：
		alias:'home_Page',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		// 动态路由对象
		path:'/argu/:name',
		name: 'Argu',
		component:() =>  import('@/views/Argu.vue')
	},
	{
		path:'/parent',
		name: 'Parent',
		component: () => import('@/views/Parent.vue'),
		// 嵌套路由
		children:[
			{
				path:'child', // 不需要加斜杠
				component: () => import('@/views/Child.vue')
			}
		]
	},
	{
		path:'/name_view',
		components:{
			// 命名视图
			default:() => import('@/views/Child.vue'),
			email:() => import('@/views/Email.vue'),
			tel:() => import('@/views/Tel.vue'),
		}
	},
	{
		path:'/main',
		// redirect 可以有多种设置方式
		// 1. 直接些路径
		// redirect: '/',
		// 2. 命名路由的方式
		// redirect: {
		// 	name:'Home'
		// }
		// 3. 函数方式
		redirect: to => {
			console.log('to',to);
			// return 重定向的 字符串路径/路径对象
			return {
				name:'Home',
				// name:'/'
			}
		}
	},
]
