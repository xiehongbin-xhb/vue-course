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
    }
  }
});
export default store;
