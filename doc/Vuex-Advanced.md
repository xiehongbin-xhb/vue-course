# Vuex进阶
## 项目结构
Vuex不限制代码结构，但是规定了一些需要遵守的规则
1. 应用层级的状态应该记中到单个store对象
2. 提交mutation时更改状态的唯一方法，并且这个过程是同步的
3. 异步逻辑都应该封装到action里面

## 插件
Vuex的store接受plugins选项，这个选项暴露出每次mutation的钩子。
Vuex插件就是一个函数，接受store作为唯一参数
```js
// 定义Vuex插件
const myPlugin = store => {
  // 当store初始化时调用
  store.subscribe( (mutation, state) => {
    // 每次mutation之后调用，mutation的格式为 {type, payload}
  })
}
// 使用Vuex插件
const store = new Vuex.store({
  plugins: [ myPlugin] // plugins是一个数组
})
```
在插件中是不允许直接修改状态的，只能通过mutation来触发变化
通过提交mutation，插件可以用来同步数据源到store

生成State快照
有时候插件需要获得状态的快照，比较前后的前后状态，想要实现这项功能，需要对状态对象进行深拷贝

内置logger插件
Vuex自带一个日志插件用于一般的调试
```js
import createLogger from 'vuex/dist/logger'

```

## 严格模式
开启严格模式，仅需要在创建store的时候传入 strict:true
```js
const store = new Vuex.store({
  strict: true
})
```
在严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误

不要在发布环境下启用严格模式，严格模式会深入监测状态树来监测不合规的状态变更
请确保在发布环境下关闭严格模式，以避免性能损失

## 表单处理
在严格模式下使用Vuex，在属于Vuex的state上使用v-model会比较麻烦
因为v-model指令会直接去修改绑定的值，这种情况下，如果修改的state是Vuex里的值，就会报错
处理这种情况有两种解决方法
1. 不使用v-model，替换成相应的表达式，监听input事件，手动触发mutation来修改这个值
2. 继续使用v-model,使用带有setter的双向绑定计算属性
首先Vuex中的state，在组件中使用计算属性来获取
其次通过设置该计算属性的set方法，在方法中触发mutation来修改