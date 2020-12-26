import { getAppName } from '@/api/app.js'
const actions = {
	updateAppName({ commit, state, rootState, dispatch }){
		// commit 方法 提交一个mutation 去做同步的操作
		// 修改state 只能通过触发mutation来实现
		// getAppName().then( res => {
		// 	console.log('res',res);
		// 	commit('SET_APP_NAME',res.info.appName);
		// })
	}
}

export default actions;
