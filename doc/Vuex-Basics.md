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

启用了命名空间之后，
mutations或者state ，如果希望获取到全局的state或者getters， rootState，rootGetters会作为第三，第四参数传递进去
action部分，rootState会作为context的属性

如果希望在子模块内派发出全局的action或者mutation，将root:true作为第三个参数传给dispatch或者commit
```js
modules: {
  foo: {
    namespaced: true, // 模块内开启命名空间
    state: {
      // 定义的state自带有“命名空间”，访问需要带模块名
    },
    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        // 四个参数： dispatch commit  getters rootGetters
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```
在命名空间的模块中定义全局action
以对象的形式定义一个action，带有root属性以及handler属性
```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```
使用辅助函数mapState,mapMutations,mapActions绑定带命名空间的
将模块名作为第一个参数
```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

使用createNamespaceHelpers,创建基于某个命名空间辅助函数，返回一个对象，对象有新的绑定在给命名空间值上的组件绑定辅助函数
相当于返回了一个新的辅助函数，用于映射具体某个模块的属性
```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
```

动态注册模块
通过store.registerModule注册模块

```js
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```


## 总结
全局状态
1. state
定义: state直接写
在组件中如何使用：this.$store.state.stateName
```js
// 在store中定义
const store = new Vuex.Store({
  state:{
    stateName:'这是stateName的值'
  }
})
// 在组件中如何使用
// 方式1 计算属性
computed: {
  stateName() {
    return this.$store.state.stateName
  }
}
// 方式2 使用mapState辅助函数
import { mapState } from 'vuex'
// mapState函数会将vuex中的state映射成当前组件实例的计算属性
computed:{
  // 使用mapState函数有两种方式
  // 方式1 给mapState函数传递一个字符串数组
  ...mapState(['stateName']) // 相当于将this.$store.state.stateName 映射成 this.stateName
  // 方式2 给mapState函数传递一个对象
  ...mapState({
    // 对象的属性名就是state名字
    // 属性值可以是一个函数，函数接受state作为参数，也可以是一个stateName的字符串
    // 这种情况下 可以对stateName进行改名
    fixStateName: stateName => state.stateName
    fixStateName1：'stateName'
  })
}
```
2. getters
定义：

```js
// 在getters对象中定义
getters: {
  stateGetter(state, getters){
    // 接受state作为参数1，getters作为参数2，可以用来获取其他getters
    return state.stateName + 'fix' // 返回新的getters
  }
}
// 在组件中如何使用
// 方式1 计算属性
computed: {
  stateGetter1(){
    return this.$store.getters.stateGetter;
  }
}
// 方式2 通过mapGetters辅助函数
computed: {
  // mapGetters  使用对象参数类型，支持对getter进行改名
  ...mapGetters({
    stateGetter1:'stateGetter'
  }),
  // mapGetters  使用字符串数组参数类型
  ...mapGetters([
    'stateGetter'
  ]),
}

```
3. mutation
```js
// 定义mutation
mutations:{
  // 事件类型  对应的回调函数
  "EDIT_STATE":function(state,payload){
    // payload参数的获取要根据携带过来的参数格式做处理，不同情况下不一样
    state.stateName = 'newStateName By mutation'
  }
}
// 组件中触发mutation
// 方式1  通过 this.$store.commit()
handleClick(){
  // commmit 方法允许使用两种方式进行传参
  // 方式1 传两个参数，参数1 mutation类型，参数2 要携带的参数
  this.$store.commit('EDIT_STATE','这是通过触发mutation之后要修改的值');
  // 参数1 mutation类型  参数2 payload
  // 方式2 一个参数 ，带有type属性的是对象
  this.$store.commit({
    type:'EDIT_STATE',
    // 要携带的参数，可以罗列写在这里
    fixedContent:'这是通过触发mutation之后要修改的值'
  })
  // 通过对象形式传递过去mutation，mutation回调函数的第二个参数就是这个对象，可以通过payload上解构出想要的值
}
// 方式二 通过mapMutation辅助函数，将this.$store.commit('EDIT_STATE') 映射成 this['EDIT_STATE']()，映射成 methods上的方法
// 映射之后，使用时可以直接写方法 如  <button @click="EDIT_STATE({ fixText: 'fixText1111' })"> 
methods:{
  // 对象形式
  ...mapMutations({
    // 不传参数写法
    btnClick: 'EDIT_STATE' 
    // 传参数写法
    btnClick: {
      type:'EDIT_STATE',
      fixedContent:'这是通过触发mutation后修改的值，对象形式'
    }
  })
  // 字符串数组形式
  ...mapMutations(['EDIT_STATE']) // 不传参数写法
  // 如果需要以这种方式传递参数，需要在调用该方法的时候去写参数
  // 如: this['EDIT_STATE']({ fixedContent:'这是通过触发mutation后修改的值，字符串数组形式' })
}
```
3. action
```js
// 如何定义
actions:{
  // action的handler会接受一个和store实例拥有相同属性和方法的context对象，可以从上面解构出commit，dispatch方法
  EDIT_ACTION(context) {
    // action中不能直接修改state，如需修改，应触发一个对应的mutation来修改
    const { commit, dispatch } = context;
    commit('EDIT_STATE','这是通过触发action来修改store中的state');
  }
}
// 组件中如何使用
// 方式1 通过this.$store.dispatch 来派发出相应的action
methods:{
  dispatchAciton(){
    this.$store.dispatch('EDIT_ACTION');
  }
}
// 方式2  通过mapActions辅助函数，将methods里的方法加以映射
// 映射之后 使用时 可直接写方法名 如：<button @click="dispatchAction">触发action </button>
methods: {
  // mapActions支持两种方式传参
  ...mapActions({
    // 对象形式,可以对action名称进行修改
    dispatchAcion:'EDIT_ACTION'
  })
  // 字符串数组形式
  ...mapActions(['EDIT_ACTION'])
}
```

4. modules 在模块中使用
state
```js
// 定义
const store = {
  modules: {
    testModule: {
      state: {
        moduleState:'这是store中的state'
      }
    }
  }
}
// 在组件中获取
// 方式1  this.$store.state.模块名.stateName,通过计算属性
computed: {
  moduleState(){
    return this.$store.state.testModule.moduleState
  }
}
// 方式2 通过mapState辅助函数 
computed: {
  ...mapState({
    testState: state => state.testModule.testState
  })
}
```
mutation,getters,action
```js
// 定义： 未带有命名空间的
const store = {
  modules: {
    testModule: {
      state: {
        moduleState:'这是模块中 store中的state'
      },
      getters: {
        moduleGetter: '这是模块中 store中的getter'
      },
      actions: {
        EDIT_STATE_ACTION_MODULE(context) {
          const { commit } = context;
          commit('EDIT_MODULE_STATE','通过action来修改的state，')
        }
      },
      mutation: {
        // 参数1  接收的是局部状态组件
        // 参数2 payload 触发mutation携带的参数
        EDIT_MODULE_STATE(state, payload){
          state.moduleState = payload + '这是模块中'
        }
      }
    }
  }
}
// 触发
// 未带有命名空间的模块，mutation，getters,action都是全局的，获取getters以及触发mutation,action都和之前的一致
// 触发mutation 1. this.$store.commit('EDIT_MODULE_STATE','测试') 2. 通过mapMutations函数，将methods中的方法 映射成  this.$store.commit('')
// 获取getters 都是通过计算属性 1. this.$store.getters.getterName 2. 通过mapGetters函数 ，将getters映射成 计算属性
// 派发action 1. this.$store.dispatch('EDIT_STATE_ACTION_MODULE') 2. 通过mapActions函数，将methods中的方法 映射成  this.$store.dispatch('')
```

命名空间  定义模块时设置  namespaced:true 
设置之后，这个模块所有的getters，actions，mutations都会自动根据模块注册的路径命名
```js
// 定义
const store = {
  modules: {
    namespaced:true,
    testModule: {
      state: {
        moduleState:'这是模块中 store中的state'
      },
      getters: {
        moduleGetter: '这是模块中 store中的getter'
      },
      actions: {
        EDIT_STATE_ACTION_MODULE(context) {
          const { commit } = context;
          commit('EDIT_MODULE_STATE','通过action来修改的state，')
        }
      },
      mutation: {
        // 参数1  接收的是局部状态组件
        // 参数2 payload 触发mutation携带的参数
        EDIT_MODULE_STATE(state, payload){
          state.moduleState = payload + '这是模块中'
        }
      }
    }
  }
}
```