# 路由进阶
## 路由组件传参
三种形式
布尔类型
对象类型
函数类型
## HTML5 History模式
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


