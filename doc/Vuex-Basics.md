# Vuex
## 介绍
是什么
Vuex是一个专为Vue.js应用程序开发的状态管理模式。
通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性。
安装
在一个模块化的打包系统中，必须显示地通过Vue.use()来安装Vuex。
Vuex依赖于Promise。如果支持的浏览器并没有实现IE，那么你可以使用一个polyfill库，例如es6-promise
开始
store基本上就是一个容器，它包含着应用中大部分的状态
Vuex的状态存储是响应式的，当Vue组件从store中读取状态时，若store中的状态发生变化，那么相应组件的也会相应地得到高效更新
不能直接改变store中的状态，改变store中的状态的唯一途径就是显式地提交mutation

为了在Vue组件中访问this.$store属性，需要为Vue实例提供创建好的store，Vuex提供了一个从根组件向所有子组件，以store选项的方式注入该store的选项。


提交mutation，因为想要更明确的追踪到状态的变化
## 核心概念
### State
Vuex使用单一状态树，用一个对象就包含了全部的应用层级状态
存储到Vuex中的数据必须是纯粹的。
#### 在Vue组件中获得Vuex状态
最简单的方式就是在计算属性中返回某个状态
```js
const Counter = {
  template:`<div>{{count}}</div>`,
  computed: {
    count() {
      return store.state.count;
      // return this.$store.state.count
    }
  }
}
```
Vuex通过store选项，提供了一种机制将状态从根组件注入到每一个子组件中（需调用Vue.use(Vuex)）
在子组件中可以通过this.$store访问到

#### mapState辅助函数
当一个组件需要获取多个状态时，可以使用mapState辅助函数来生成计算属性
当映射的计算属性的名称和state的子节点名称相同，也可以给mapState传递一个字符串数组
mapState接受的参数：
对象：
对象的key就是要使用的state
字符串数组:
```js
mapState([
  'count' // 映射this.count 为store.state.count
])
count
```js
mapState({
  count: this.$store.count
})
```
```js
import { mapState } from 'vuex
export default {
  computed: mapState({
    count: state =>  state.count
  })
}
```
mapState函数返回的是一个对象，需要使用一个工具函数将多个对象合并成一个
使用对象展开符
```js
computed: {
  ...mapState({
    // 
  })
}
```
### Getters
### Mutations
### Actions
### Modules
## 进阶