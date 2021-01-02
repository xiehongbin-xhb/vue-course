import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    storeState: "这是整个store的state"
  },
  mutations: {
    // mutations中的函数会接受两个参数，参数一state，参数二触发时传递的payload
    EDIT_STORE_STATE(state, payload) {
      console.log("payload", payload);
      state.storeState = payload.fixText;
    },
    increment(state, payload) {
      state.storeState = payload.fixText;
    }
  },
  actions: {
    // actions中的函数会接受一个和store实例具有相同属性和方法的context，可以从中解构中commit方法，从中获取state，以及getters
    EditActionStore(context) {
      const commitAction = context.commit;
      commitAction({
        type: "EDIT_STORE_STATE",
        fixText: "这是要修改后的内容，通过dispatchAction"
      });
    }
  },
  getters: {
    // getters中的函数会接受两个参数，参数一state，参数二getters，获取其他的getter
    fixStoreState(state) {
      return "fix" + state.storeState;
    }
  },
  modules: {
    testModule: {
      state: {
        testState: "这是测试的值"
      },
      mutations: {
        Edit_Test_State(state, payload) {
          state.testState = payload;
        }
      },
      actions: {},
      getters: {
        fixTestState(state) {
          return "fix" + state.testState;
        }
      }
    },
    nameSpaceModule: {
      namespaced: true,
      state: {
        stateNameSpace: "这是带有命名空间的模块的state",
        stateNameSpace1: "这是带有命名空间的模块的state1"
      },
      getters: {
        // 带有命名空间之后getter回调函数会多接受两个三个 rootState,rootGetters
        // 用于获取全局的状态和getters
        // 也会作为context的属性传入action回调函数的context函数
        getterNameSpace(state, getters, rootState, rootGetters) {
          return "这是带有命名空间的getter";
        },
        getterNameSpace1(state, getters, rootState, rootGetters) {
          return "这是带有命名空间的getter1";
        }
      },
      mutations: {
        // 定义mutation暂时没有区别
        EDIT_STATE_NAMESPACE(state, payload) {
          state.stateNameSpace = payload;
        }
      },
      actions: {
        EDIT_STATE_ACTION_NAMESPACE(context) {
          // context 包含四个属性  commit  dispatch rootState rootGetters
          const { commit, dispatch, rootState, rootGetters } = context;
          console.log("context", context);
          commit("EDIT_STATE_NAMESPACE", "通过action要修改的值");
        }
      }
    }
  }
});
export default store;
