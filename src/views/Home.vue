<template>
  <div class="home">
		{{ food }}
    <img alt="Vue logo" src="../assets/img/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
		<button @click = 'handleClick("back")'> 返回上一页 </button>
		<button @click = 'handleClick("push")'> 返回parent </button>
		<button @click = 'handleClick("replace")'> 替换 </button>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'Home',
	props:{
		food: {
			type:String,
			default:'apple'
		}
	},
  components: {
    HelloWorld
	},
	beforeRouteLeave(to,from,next) {
		// 即将离开这个页面时触发
		const leave = confirm('您确定要离开吗');
		if(leave)next();
		else next(false);
	},
	beforeRouteEnter(to ,from, next) {
		// 即将进入这个页面时触发
		console.log('name',to.name);
		// 这里当前页面还没渲染
		next( vm => {
			console.log(vm); // vm就是当前组件的实例
		});
	},

	methods:{
		handleClick(type){
			if(type === 'back') this.$router.back();
			// else if(type === 'push') this.$router.push('/parent');
			else if(type === 'push') this.$router.push(
				{
					name: 'Argu',
					// 跳转时可以携带一些参数，命名式路由才允许这么传参
					params:{
						name:'lison111'
					},
					query:{
						name:'lison' // 会直接加在路径后面
					},
					// 也可以这么写
				}
				);
			// this.$router.go(-1);// -1 返回上一页  1 下一页
			else if(type === 'replace') {
				this.$router.replace({
					name:'Parent'
				})
			}

		}
	}
}
</script>
