<template>
	<div>
		{{ $route.params.name }}
		<!--
			$route 是当前页面所对应的的路由对象
			fullPath: "/argu/lison"
			hash: ""
			matched: Array(1)
				0:
				beforeEnter: undefined
				components: {default: {…}}
				enteredCbs: {}
				instances: {default: VueComponent}
				matchAs: undefined
				meta: {}
				name: undefined
				parent: undefined
				path: "/argu/:name"
				props: {}
				redirect: undefined
				regex: /^\/argu\/((?:[^\/]+?))(?:\/(?=$))?$/i
			meta: {}
			name: undefined
			params: {name: "lison"} : 路由携带的参数
			path: "/argu/lison"
			query: {}

		 -->
	</div>
</template>

<script>
export default {
	created() {
		console.log('$route',this.$route);
		console.log('$router',this.$router);
	}
}
</script>

<style>

</style>
