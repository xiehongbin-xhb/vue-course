# 路由进阶
## 路由组件传参
三种形式
布尔类型
对象类型
函数类型

在组件中使用$route会使之与器对应路由形成高度耦合。从而使组件只能在特定的URL上使用，限制了其灵活性。
这里是使用路由对象上的props属性将组件和路由解耦.
props可以有三种类型
1. 布尔值
当props设置为true时，route.params将会被设置为组件属性
2. 如果props是一个对象，它将会被原样设置为组件属性，当props是静态的时候，可以这么用
3. 函数模式
你可以创建一个函数返回props，这样你便可以将参数转换成另一个类型，将静态值与路由的值结合。
```js
const router = new VueRouter({
  { 
    path:'/search',
    component: SearchUser,
    props: (route) => { query: route.query.q} )
  }
})
```
```js
// 使用$route 
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User },
    {
      // 对于包含命名视图的路由，必须为每个命名视图添加props选项
      path:'/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true ,sidebar:false }
    }
  ]
})
// 不使用$route
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    {
      path:'/user/:id', component: User, props: true 
    }
  ]
})
```

## HTML5 History模式
Vue-Router默认是hash模式，使用URL的hash模式来模拟一个完整的URL，于是当URL改变时，页面不会重新加载。
可以使用路由的history模式，这种模式充分利用history.pushState API来完成URL跳转而无需重新加载页面。

这种模式需要后台配置支持，因为应用是个单页面应用，如果后台没有正确的配置，当用户直接访问具体某个页面，匹配不到就会返回404。
所以需要在服务端增加一个覆盖所有情况的候选资源，如果URL匹配不到任何静态资源，则应该返回一个index.html页面。
```js
new VueRouter({
  mode:'history',// 默认是hash模式
  router
})
```
## 路由导航守卫
全局守卫
后置钩子

完整导航解析流程

1. 导航被触发
2. 在即将离开的组件时 调用 离开守卫  beforeRouteLeave
3. 调用全局的前置守卫 beforeEach
4. 在重用的组件里调用 beforeRouteUpdate 
5. 调用路由独享的守卫 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里调用beforeRouteEnter
8. 调用全局的解析守卫 beforeResolve
9. 导航被确认
10. 调用全局的后置守卫 afterEach
11. 触发DOM更新渲染
12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数


导航守卫
vue-router 提供的导航守卫主要用于通过跳转或取消的方式 守卫导航。
有三种机会植入路由导航过程：全局的，单个路由独享的，组件级的

### 全局
全局前置守卫
可以使用router.beforeEach 注册一个全局前置守卫
```js
const router = new VueRouter({ routes });
route.beforeEach((to,from,next) => {

})
```
当一个导航被触发时，全局前置守卫按照顺序调用

参数解析：
1. to: Route 即将要进入的目标路由对象
2. from: Route 当前导航要离开的路由
3. next Function 一定要调用该方法来resolve这个钩子。 执行效果依赖next方法的调用参数。
  next()： 不传参数，进行管道中的下一个钩子，如果全部钩子执行完了，那么导航的状态就是confirm
  next(false) 传false，中断当前的导航，如果浏览器的URL改变了，那么URL地址会重置到from路由对应的地址
  next('/')或者next({path:'/'}) 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向next传递任何位置对象，且允许设置诸如router.replace或者router.push方法的选项
  next(error) 如果传入next的参数是一个Error实例，则导航会被终止且该错误会被传递给router.onError() 注册过的回调


全局解析守卫
通过 router.beforeResolve注册一个全局守卫。区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就会被调用

全局后置钩子
router.afterEach((to,from) => {
  //...
})


### 路由独享的守卫
可以直接在路由配置上直接定义beforeEnter守卫：
```js
const router = new VueRouter({
  routes:[
    {
      path:'/foo',
      component:Foo,
      beforeEnter:(to,from,next) => {
        // ...
      }
    }
  ]
})
```

###　组件内的守卫
beforeRouteEnter
beforeRouteUpdate
beforeRouteLeave
```js
const Foo = {
  template:"...'，
  beforeRouteEnter(to,from,next){
    // 在渲染该组件的路由被confirm前调用
    // 组件实例还未创建，页面还未开始渲染，不能获取当前组件的实例
    // 可以在next方法中传递一个回调函数，在页面渲染后会执行
  },
  beforeRouteUpdate(to,from,next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 可以访问当前组件实例
  },
  beforeRouteLeave(to,from,next) {
    // 导航离开该组件对应路由时调用
    // 可以访问当前组件实例
  }
}
```
完整的导航解析：
导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫 (2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
## 路由元信息
每个路由对象都可以配置一个meta属性
routes配置中的每个路由对象为路由记录，路由记录是可以嵌套的，因为当一个路由
## 过渡效果

可以用transition组件给router-view组件设置一些过渡效果
单个路由的过渡


