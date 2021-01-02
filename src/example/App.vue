<template>
  <div>
    <div id="storeStateDiv">
      <div id="app1">storeState:{{ storeState }}</div>
      <!-- 点击时触发 EditStoreState 这个函数，就相当于this.$store.commit('EDIT_STORE_STATE') -->
      <!--  如果commit Mutation时需要携带参数需要在这写 -->
      <!-- <button @click="EditStoreState({ fixText: 'fixText1111' })">
        编辑全局的state
      </button> -->
      <!-- <button @click="EditStoreState1">编辑全局的state 对象形式</button> -->
      <!-- <button
        @click="
          EDIT_STORE_STATE({
            fixText: '这是通过触发mutation后修改的值，字符串数组形式',
          })
        "
      >
        编辑全局的state 字符串数组形式
      </button> -->
      <!-- <button @click="EditActionStore">派发action</button>
      <button @click="EditState">编辑modules的state</button> -->

      <p>
        这是获取全局的state，通过mapState辅助函数，对象形式，用于改名{{
          storeState12
        }}
      </p>
      <p>
        这是获取全局的getter，通过mapGetters,数组形式，直接使用名字{{
          fixStoreState1
        }}
      </p>
      <p>fixStoreState1是：{{ fixStoreState1 }}</p>
      <p>fixStoreState：{{ fixStoreState }}</p>
      <!-- <button @click="EditActionStore">触发action 通过字符串数组形式</button>
      <button @click="dispatchAction">触发action 通过对象形式</button> -->
    </div>

    <div id="app">-----------------访问state--------------------</div>
    <p>获取带命名空间的state：{{ stateNameSpace }}</p>
    <p>获取带命名空间的state1：{{ stateNameSpace1 }}</p>
    <div id="app">-----------------访问getter--------------------</div>
    <p>获取带命名空间的state：{{ getterNameSpace }}</p>
    <p>获取带命名空间的state1：{{ getterNameSpace1 }}</p>
    <button @click="EDIT_STATE_NAMESPACE('这是要修改的内容234')">
      触发带命名空间的Mutation
    </button>
    <button @click="EDIT_STATE_ACTION_NAMESPACE">触发带命名空间的Action</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState({
      // storeState12: (state) => state.storeState,
      storeState12: "storeState",
      testState: (state) => state.testModule.testState,
    }),
    ...mapState(["storeState"]),
    ...mapGetters(["fixStoreState"]),
    fixStoreState1() {
      return this.$store.getters.fixStoreState;
    },
    stateNameSpace() {
      return this.$store.state.nameSpaceModule.stateNameSpace;
    },
    ...mapState({
      stateNameSpace1: (state) => state.nameSpaceModule.stateNameSpace1,
    }),
    getterNameSpace() {
      // 这是不带命名空间的getter获取方式
      // return this.$store.getters.getterNameSpace
      // 这是带有命名空间的getter获取方式
      return this.$store.getters["nameSpaceModule/getterNameSpace"];
    },
    ...mapGetters({
      getterNameSpace1: "nameSpaceModule/getterNameSpace1",
    }),
    // testState() {
    //   console.log("this.$store", this.$store);
    //   // this.$store.state.moduleName.stateName
    //   return this.$store.state.testModule.testState;
    // },
  },
  methods: {
    // ...mapMutations({
    //   dispatchNameSpaceMutation: {
    //     type: "nameSpaceModule/EDIT_STATE_NAMESPACE",
    //     fixContent: "这是要修改的内容1",
    //   },
    //   dispatchNameSpaceMutation1: "nameSpaceModule/EDIT_STATE_NAMESPACE",
    // }),
    // ...mapMutations(["nameSpaceModule/EDIT_STATE_NAMESPACE"]),
    // dispatchNameSpaceMutation1() {
    //   this["nameSpaceModule/EDIT_STATE_NAMESPACE"]("这是要修改的内容1222");
    // },
    // ...mapActions(["nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE"]),
    // dispatchNameSpaceAction1() {
    //   this["nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE"]();
    // },
    // 为了解决这个问题，可以传递map**辅助函数一个函数，用来绑定指定的命名空间
    ...mapActions("nameSpaceModule", ["EDIT_STATE_ACTION_NAMESPACE"]),
    ...mapMutations("nameSpaceModule", ["EDIT_STATE_NAMESPACE"]),
    // ...mapActions({
    //   dispatchNameSpaceAction: "nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE",
    //   dispatchNameSpaceAction1: {
    //     type: "nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE",
    //   },
    // }),
    // dispatchNameSpaceAction() {
    //   this.$store.dispatch("nameSpaceModule/EDIT_STATE_ACTION_NAMESPACE");
    // },
    // dispatchNameSpaceMutation() {
    //   this.$store.commit(
    //     "nameSpaceModule/EDIT_STATE_NAMESPACE",
    //     "这是要修改的内容"
    //   );
    // },
    // btnClick() {
    //   this["EDIT_STORE_STATE"]({
    //     fixText: "这是通过触发mutation后修改的值，字符串数组形式",
    //   });
    // },
    // ...mapMutations({
    //   // 将
    //   EditStoreState1: {
    //     type: "EDIT_STORE_STATE",
    //     // 参数传递的第二种方式
    //     fixText: "这是通过触发mutation后修改的值，对象形式",
    //   },
    // }),
    // ...mapMutations(["EDIT_STORE_STATE"]),
    // ...mapActions(["EditActionStore"]),
    // ...mapActions({
    //   dispatchAction: "EditActionStore",
    // }),

    // EditState() {
    //   this.$store.commit("Edit_Test_State", "这是修改后的值");
    // },
  },
};
</script>

<style>
</style>
