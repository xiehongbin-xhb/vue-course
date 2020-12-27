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
有时候需要从store中的state派生出一些状态
Vuex允许在store中定义getter，可以理解为store的计算属性
就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生改变时才会被重新计算
每个getter属性值都是一个函数，函数接收state作为第一个参数
也可以接收其他getter作为第二个参数：getters
Getter会暴露为store.getters对象
在组件中使用 this.$store.getters.getterName

也可以通过让getter返回一个函数，来实现给getter传参，在你对store里的数组进行查询时非常有用
```js
getters: {
  getTodoById: (state => (id) => {
    return state.todos.find(todo => todo.id === id)
  })
}
```
getter在通过方法进行访问时，每次都会去进行调用，而不会缓存结果

mapGetters辅助函数
mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性
使用对象展开符将getter混入到computed对象中
```js
import { mapGetters } from 'vuex
export default {
  // 
  computed: {
    ...mapGetters([
      'doneTodosCount'
    ]),
    // 如果想将一个getter属性取另外一个名字，需要使用对象形式
    ...mapGetters({
      doneCount:'doneTodosCount'
    })
  }
}
```

### Mutations
更改Vuex的store中的状态的唯一方法是提交mutation。
mutation都有一个字符串类型的事件类型type，和一个回调函数handler
回调函数接收state作为第一个参数

不能直接调用mutation handler，要触发一个mutation时，需要调用store.commit('')

可以向store.commit 传入额外的参数，即mutation的载荷（payload）
大多数情况下，payload应该是一个对象，这样可以包含多个字段并且记录的mutation会更易读
```js
mutations:{
  increament(state,payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```
提交mutation的另外一种方式，是直接使用包含type属性的对象
```js
store.commit({
  type: 'increment',
  amount: 10
})
```
注意：
mutation需要遵守一些注意事项：
1. 最好提前在store中初始化所有所需属性
2. 当需要在对象上添加新属性，需要使用
- 使用Vue.set(obj,'newProp',123)
- 以新对象替换老对象
```js
state.obj = { ...state.obj, newProp: 123 }
```

使用常量替代Mutation事件类型
Mutations必须是同步操作

在组件中提交Mutation
可以在组件中使用this.$store.commit('xx')提交mutation
或者使用mapMutations辅助函数，将组件中的methods映射成store.commit 
```js
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations([
      'increment',// 将this.increment 映射成 this.$store.commit('increment')
      // mapMutations 也支持载荷
      'incrementBy', // 将this.incrementBy(mount) 映射成this.$store.commit('increment')
    ]),
    // 对象格式
    ...mapMutations({
      add:'increment' // 将this.add() 映射成 this.$store.commit('increment')
    })
  }
}
```
### Actions
Actions类似于mutations，但是区分：
- Action提交的是mutation，而不是直接变更状态
- Action可以包含任意异步操作

Action函数接受一个与store实例具有相同方法和属性的context对象。可以使用context.commit提交一个mutation
或者通过context.state或者context.getters来获取state和getters。
context不是store实例本身

使用ES6语法的参数结构来简化代码
```js
actions: {
  increment( { commit }) {
    commit('increment')
  }
}
```

分发action
Action通过store.dispatch方法触发
可以在action内部执行异步操作
```js
actions: {
  incrementAsync( { commit } ) {
    setTimeout( () => {
      commit('increment')
    })
  }
}
```
action支持同样的载荷方式和对象方式进行分发
```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

mapActions辅助函数
```js
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'increment', // 将this.increment() 映射成 this.$store.dispatch('increment')
    ]),
    ...mapActions({
      add:'increment', // 将 'this.add()' 映射成 this.$store.dispatch('increment')
    })
  }
}
```
组合action
action通常是异步的
store.dispatch 可以处理被触发的action的处理函数返回的Promise，并且dispatch仍旧返回Promise
```js
actions: {
  actionA ({commit}) {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        commit('someMutaion'),
        resolve()
      },1000)
    })
  },
  // dispatch仍旧返回的是Promise
  actionsB ({dispatch, commit}) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
使用async/await
```js
actions: {
  async actionA({commit}) {
    commit('gotData',await getData())
  },
  async actionB( {dispatch, commit}) {
    await dispatch('actionA');
    commit('gotOtherData',await getOtherData())
  }
}
```
一个store.dispatch 在不同模块中可以触发多个action参数
### Modules
由于使用单一状态树，应用的所有状态会集中到一个较大的对象，当应用变得非常复杂时，store对象就可能变得相当臃肿

为了解决以上问题，Vuex允许我们将store分割成模块。
每个模块拥有自己的state，mutation，action，getter，甚至是嵌套子模块

获取模块内的状态
```js
store.state.moduleA
store.state.moduleB
```
对于模块内部的mutation和getter，接收的第一个参数是模块的局部状态对象
```js
const moduleA = {
  state: () => ({ count:0 }),
  mutations: {
    increment(state){
      state.count++ // 这里的state是模块的局部状态
    }
  },
}
```
对于模块内部的action，局部状态通过context.state 暴露出来，根节点状态则为context.rootState
```js
const moduleA = {
  actions: {
    incrementIfOddRootSun({state, commit,rootState}) {
      // 接收三个参数
      // state 当前模块的局部state
      // commit 触发mutation的方法
      // rootState 根节点的state
    }
  },
  getter: {
    sumWithRootCount(state,getters,rootState) {
      // ...
    }
  }
}
```
命名空间 
默认情况下，模块内部的action、mutation、getter是注册在全局命名空间的，这样使得多个模块能对同一mutation或action做出响应
如果希望模块具体有更高的封装性和复用性，可以通过添加nameSpaced:true 的方式使其成为带有命名空间的模块。
当模块被注册之后，它的所有getter，action，以及mutation都会自动根据其模块注册的路径调整命名。
// 
state会被模块名进行访问
getters,mutations,actions默认情况下会被映射到全局
加了nameSpaced之后会按模块进行区分
```js
const store = new Vuex.Store({
  modules: {
    account: {
      nameSpaced:true,
      state: () => ({}) // 模块内的状态已经是嵌套的了，使用nameSpaced属性不会对其产生影响
      getters:{
        isAdmin() { ... } // getters['account/isAdmin']  加了一个层级
        // 获取时 this.$store.getters['account/isAdmin']
      },
      actions: {
        login() {
          // dispatch('account/login')
        }
      },
      mutations: {
        login(){ 
          // commit('account/login')
        }
      },
      // 模块嵌套模块
      modules: {
        // 继承父模块的命名空间
        maPage: {
          state: () => ({...}),
          getters: {
            profile() {
              // getters['account/profile']
            }
          }
        },
        posts:{
          nameSpaced:true, // 进一步嵌套命名空间
          getters:{
            popular() {
              // getters['account/posts/popular']
            }
          }
        }
      }
    }
  }
})
```
参数传递
如果希望使用全局state和getter，rootState和rootGetters 会作为第三和第四参数传入getter，也会通过context对象的属性传入action

## 进阶