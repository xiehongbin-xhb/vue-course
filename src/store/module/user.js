const state = {
	userName:'lisin'
};
const getters = {
	firstLetter: (state) => {
		return state.userName.subStr(1,1)
	}
}
const mutations = {};
const actions = {};
export default{
	namespaced:true,// 使用命名空间
	state,
	getters,
	mutations,
	actions
}
