# 总结
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
// 访问带有命名空间的模块
// 访问state,getters
computed:{
  // 通过this.$store
  stateNameSpace(){
      return this.$store.state.nameSpaceModule.stateNameSpace
  },
  // 通过mapState： 只能使用对象形式，字符串数组形式不可用
  ...mapState({
      stateNameSpace1: (state) => state.nameSpaceModule.stateNameSpace1
    }),
  // 访问getter
  // 方式1：
  getterNameSpace(){
      // 这是不带命名空间的getter获取方式
      // return this.$store.getters.getterNameSpace 
      // 这是带有命名空间的getter获取方式
      return this.$store.getters['nameSpaceModule/getterNameSpace']
  }
  // 方式2：只支持对象形式，不支持字符串数组
  ...mapGetters({
      getterNameSpace1: "nameSpaceModule/getterNameSpace1",
    }),
},
// 触发mutation,action
methods:{
  // 触发action
  // 方式1 通过 this.$store
  dispatchNameSpaceAction() { // dispatchNameSpaceAction为点击按钮时执行的函数
      this.$store.dispatch("nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE");
  },
  // 方式2 通过mapActions
  // 对象形式
  ...mapActions({
      dispatchNameSpaceAction: "nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE",
      dispatchNameSpaceAction1: {
        type: "nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE",
      },
    }),
  // 字符串数组形式
  ...mapActions(["nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE"]),// 会映射成this['nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE'],这样的形式在template模板内不能写，需要加一层函数
    dispatchNameSpaceAction1() {
      this["nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE"]();
  },
  // 为了解决这个难写的问题，可以给map**这样的辅助函数传递一个标识模块名的字符串
  ...mapActions('nameSpaceModule',["EDIT_STATE_ACTION_NAMESPACE"]), // 这么写之后就可以直接通过this['EDIT_STATE_ACTION_NAMESPACE']() 来调用这个函数
  // 触发mutation
  // 方式1 通过 this.$store
  dispatchNameSpaceMutation() { // dispatchNameSpaceMutation为点击按钮时执行的函数
      this.$store.commit(
        "nameSpaceModule/EDIT_STATE_NAMESPACE",
        "这是要修改的内容"
      );
  },
  // 方式2 通过 mapMutations 
  // 对象形式
  ...mapMutations({
      // 需要携带参数1
      dispatchNameSpaceMutation: {
        // 需要带moduleName
        type: "nameSpaceModule/EDIT_STATE_NAMESPACE",
        fixContent: "这是要修改的内容1",
      },
      // 需要携带参数2  也可以在调用  @click = dispatchNameSpaceMutation(param)  传递参数
      dispatchNameSpaceMutation1: 'nameSpaceModule/EDIT_STATE_NAMESPACE',
    }),
    // 不需要携带参数
    // 字符串数组形式
    ...mapMutations(["nameSpaceModule/EDIT_STATE_NAMESPACE"]), // 会映射成this['nameSpaceModule/EDIT_STATE_NAMESPACE'],这样的形式在template模板内不能写，需要加一层函数
    dispatchNameSpaceMutation1() {
      this["nameSpaceModule/EDIT_STATE_NAMESPACE"]("这是要修改的内容1222");
    },
    //  为了解决这个难写的问题，可以给map**这样的辅助函数传递一个标识模块名的字符串
    ...mapMutations("nameSpaceModule", ["EDIT_STATE_NAMESPACE"]),
    

}


在带命名空间的模块中注册全局action或者提交mutation
只需要将 root:true 作为第三个参数传递出去即可   
dispatch('someOtherAction') // -> 'foo/someOtherAction'
dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

commit('someMutation') // -> 'foo/someMutation'
commit('someMutation', null, { root: true }) // -> 'someMutation'

```
```js
// 还可以引入createNamespacedHelpers来创建基于某个命名空间辅助函数，它返回一个对象，对象内有新的辅助函数
import { createNamespacedHelpers } from 'vue'
const functionObj = createNamespacedHelpers('nameSpaceModule');
const nameSpaceModuleMapState = functionObj.mapState;
const nameSpaceModuleMapGetters = functionObj.mapGetters;
const nameSpaceModuleMapMutations = functionObj.mapMutations;
const nameSpaceModuleMapActions = functionObj.mapActions;

// 创建
const store = {
  state:{},
  mutations:{},
  getters:{},
  actions:{},
  modules:{
    nameSpaceModule:{
     namespaced: true,
     state:{},
     getters:{},
     mutations:{},
     actions:{} 
    }
  }
}
```

