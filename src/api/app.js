export const getAppName  = function(){
	return new Promise((resolve,reject) => {
		let err = null;
		setTimeout(() => {
			if(!err) {
				resolve({code: 200, info:{ appName: 'newAppName'}})
			}else {
				reject(err)
			}
		}, 2000)
	})
}
