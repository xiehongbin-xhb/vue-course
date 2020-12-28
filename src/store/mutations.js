import vue from 'vue'
const mutations = {
	SET_APP_NAME(state, params) {
		// state 表示同级的state
		// state.appName = params;
		state.appName = params.appName;
	},
	"SET_APP_VERSION":function(){
		vue.set(state,"appVersion", 'v2.0')
	}
}
export default mutations;
//  mutation 只能做一些同步的操作
// 异步的操作 需要在action做
