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

## 路由元信息
每个路由对象都可以配置一个meta属性
## 过渡效果


