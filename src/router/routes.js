import Home from '@/views/Home.vue'
// 路由route 是一个列表，
// 路由对象的属性：包含两个属性 path路径和component组件
export default [
  {
    path: '/',
		name: 'Home',
		// 别名：
		// alias:'homePage',
		component: Home,
		props: route => {
			// route 表示当前的路由对象
			return {
				food:route.query.food
			}
		},
		// 路由独享守卫
		beforeEnter: (to,from,next) => {
			//
			if(from.name === 'About'){
				console.log('这是从登录页来的');
			}
			else {
				console.log('这不是从登录页来的');
			}
			next();
		}
  },
  {
		path: '/about',
		meta:{
			title:'关于'
		},
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
		props:{
			food:'banana'
		}
	},
	{
		// 动态路由对象
		path:'/argu/:name',
		name: 'Argu',
		component:() =>  import('@/views/Argu.vue'),
		props:true // 会将组件的params作为props传递给对应的组件，在这里就是 把name传给组件
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
	{
		path:'/login',
		name:'login',
		component:() => import('@/views/Login.vue'),
	},
	{
		path:'/store',
		name:'store',
		component:() => import('@/views/store.vue'),
	},
	{
		path:'*',
		component:() => import('@/views/error_404.vue'),
	}
]
