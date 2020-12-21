<template>
  <div id="app">
    <div id="nav">
			<!-- router-link封装了a标签，有个to属性，值是一个路径 -->
      <router-link to="/">Home</router-link> |

      <!-- <router-link to="/about">About</router-link> -->
			<!-- 使用命名路由进行跳转 -->
			<router-link v-bind:to="{name:'About'}">About</router-link>
    </div>
		<!-- 视图组件，通过router-link跳转的内容会在router-view组件位置显示 -->
		<transition-group :name="routerTransition">
			<!-- name 指定css类名 -->
			<router-view key="defalut" />
			<router-view key="email" name='email'/>
			<router-view key="tel" name='tel'/>
		</transition-group>

  </div>
</template>
<script>
export default {
	data() {
		return {
			routerTransition:''
		}
	},
	watch:{
		'$route'(to) {
			to.query && to.query.transitionName && (this.routerTransition = to.query.transitionName)
		}
	}
}
</script>
<style lang="less">
.router-enter {
	// 即将要展示的
	opacity: 0;
}
.router-enter-active {
	// 展示过程中
	transition: opacity 1s ease;
}
.router-enter-to {
	// 完全展示的效果
	opacity: 1;
}

.router-leave {
	// 即将要离开的
	opacity: 1;
}
.router-leave-active {
	// 离开过程中
	transition: opacity 1s ease;
}
.router-leave-to {
	// 完全离开的效果
	opacity: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
