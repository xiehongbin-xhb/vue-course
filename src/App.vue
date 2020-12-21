<template>
  <div id="app">
    <div id="nav">
			<!-- router-link封装了a标签，有个to属性，值是一个路径 -->
      <router-link to="/">Home</router-link> |
			<!-- 使用命名路由进行跳转 -->
      <!-- <router-link to="/about">About</router-link> -->
			<router-link v-bind:to="{name:'About'}">About</router-link>
    </div>
		<!-- 视图组件，通过router-link跳转的内容会在router-view组件位置显示 -->
    <router-view />
		<router-view name='email'/>
		<router-view name='tel'/>
  </div>
</template>

<style lang="less">
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
