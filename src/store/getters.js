const getters = {
	appNameWithVersion: (state) => {
		// state 表示同级的state
		console.log('state',state)
		return state.appName + '2.0'
	}
}
export default getters;
