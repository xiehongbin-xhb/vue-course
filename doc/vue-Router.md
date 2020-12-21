# 路由基础
1. router-link和router-view组件
router-link 
2. 路由配置
- 动态路由
- 嵌套路由
- 命名路由: 路由对象的name属性
- 命名视图： 解决多个router-view
3. JS操作路由
编程式导航

4. 重定向和别名


## 安装与在Vue中使用
###　安装
`npm install vue-router`

### 使用 
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// router是新建的VueRouter对象，传入routes数组作为参数
// 挂载在Vue根实例上：将router作为参数
const app = new Vue({
  router
}).$mount('#app')
```
## router-link、router-view组件
1. router-link组件
使用
```html
<router-link>Go to Foo</router-link>
<router-view />
```
- router-link最终会被渲染成一个<a>标签
- 通过to属性指定要跳转到路径，to属性的值可以是一个字符串路径，也可以通过v-bind指令绑定一个包含name属性的对象。
- 通过to属性匹配到的组件将被渲染到 router-view里


当router-link对应的路由匹配成功，将自动class属性值 .router-link-active。
2. router-view组件
视图组件，通过router-link跳转的内容会在router-view组件位置显示

## 定义路由组件
1. 如果使用模块化机制编程，需要先导入Vue以及Vue-Router，然后通过Vue.use(VueRouter)使用vue-router
2. 定义routes
```js
// routes 是一个数组，包含每个页面对应的路由对象
const routes = [
  { 
    // 要匹配的路径
    path:'',
    // 匹配到路径之后要加载的组件
    component:'',
    // 命名路由，通过router-link跳转时或者编程式跳转时可以通过name属性找到这个路由
    name:'',
    // 重定向: 当路由匹配到这个路径时，重定向到另外的页面
    redirect:'',
    // 别名：
    alias:''
  }
]
```
3. 使用routes新建VueRouter对象
```js
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

```
4. 挂载到Vue根实例
```js
const app = new Vue({
  router
}).$mount('#app')
```

## $router
挂载到Vue根实例之后，可以通过在任意页面中通过this.$router 访问到路由器，也可以通过 this.$route 访问当前路由对象
this.$route 路由对象结构：
```js
      fullPath: "/argu/lison" // 完整的路径
			hash: ""
			matched: Array(1) // 匹配到的组件
				0:
				beforeEnter: undefined
				components: {default: {…}}
				enteredCbs: {}
				instances: {default: VueComponent}
				matchAs: undefined
				meta: {}
				name: undefined
				parent: undefined
				path: "/argu/:name"
				props: {}
				redirect: undefined
				regex: /^\/argu\/((?:[^\/]+?))(?:\/(?=$))?$/i
			meta: {}
			name: undefined
			params: {name: "lison"} // 路由携带的参数
			path: "/argu/lison"
			query: {} // 路由路径上携带的参数 通过问号拼接在路径上
```
通过$router进行编程式路由跳转

## 动态路由匹配
用途：经常需要将某种模式匹配到的所有路由，全部映射到同个组件（如 都是用户组件，但是用户的id不一致）
用法：
```js
  const User = {
    template: '<div>User</div>'
  }
  const router = [
    {
      //  动态路径参数 以冒号开头
      path:'user/:id',component:User
    }
  ]
```
一个路径参数 使用冒号进行标记，当匹配到一个路由时，参数值将会被设置到this.$route.params,可以在每个组件内中使用
设置多个路径参数
```js
// 单个路径                       匹配的路径            this.$route.params
'/user/:username'                 /user/evan          { username:'evan'}
// 多个路径
'user/:username/post/:post_id'    /user/evan/post/123  { username:'evan', post_id:'123' }
```

注意：
当使用路由参数时，例如从 /user/foo 导航到 /user/bar ，原来的组件实例会被复用。
这也意味着组件的生命周期钩子不会再被调用。
如果需要处理这种情况，可以通过watch方法监听$route对象
```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

捕获所有路由或者404 Not Found 路由
如果想匹配任意路径，可以使用通配符（*）
```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```
特别注意: 如果使用通配符时，需要注意顺序问题。通配符的路由应该放到最后。
通常用于客户端404错误。如果使用了history模式，确保正确配置你的服务器。
使用了通配符时，$route.params内会自动添加一个名为pathMatch的参数，包含了URL通过通配符被匹配的部分（即*代表的部分）

匹配优先级
同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序
## 嵌套路由
大多数页面都是由多层嵌套的组件组合而成的，同样地，URL中各段动态路径也按某种结构对应嵌套的各层组件。
通过路由对象的children属性来设置子路由
子路由的path属性不需要再加斜杠
```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
## 编程式导航 this.$router
除了使用router-link组件创建a标签来定义导航链接，还可以通过router的实例方法，来实现跳转。

1. router.push(location,onComplete?, onAbort?)

在Vue实例中，可以通过this.$router.push()
push方法会向history栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的URL。
当点击router-link时，内部实际上就是调用push方法

location参数可以是一个字符串路径，也可以是一个描述地址的对象（可带name，params，query参数）
```js
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```
如果提供了path属性，params会被忽略，query不会
这种情况下，可以通过拼接携带完整的参数
```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```
同样的规则也适用于router-link的to属性
在2.2.0+
onComplete  导航成功时触发
onAbort 导航终止（导航到相同的路由，或者在当前导航完成之前跳转到另一个不同的路由）
在3.1.0+ router.push 或者 router.replace会返回一个Promise

注意：
如果目的地和当前路由相同，只有参数发生了改变，需要使用beforeRouteUpdate来响应这个变化

2. router.replace(location,onComplete?, onAbort?)
用法和push方法类似，区别在于不会向history添加新纪录，而是直接替换掉当前的history记录。

3. router.go(n)
参数n是一个整数，意思是在history记录中向前或者退后多少部。
## 命名路由
有时候，通过一个名称来标识一个路由会方便一点。
```js
// 定义
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```
要链接一个命名路由，可以给router-link的to属性或者push方法的参数传一个对象，包含name属性

## 命名视图
有时候需要同时展示多个视图，而不是嵌套展示（多个router-view）
如果router-view没有设置名字，那么默认为default
```js
// 路由对象 
	{
		path:'/name_view',
		components:{
			// 命名视图
			default:() => import('@/views/Child.vue'),
			email:() => import('@/views/Email.vue'),
			tel:() => import('@/views/Tel.vue'),
		}
	}
```
## 重定向和别名
## 路由组件传参
## HTML5 History模式


## 路由对象的属性
https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1
## 处理匹配不到路由情况
hash模式
history模式
## 高级匹配模式
