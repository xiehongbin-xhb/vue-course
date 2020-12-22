<template>
	<div>Tel
		<p>{{message}}</p>
	</div>
</template>

<script>
export default {
	data(){
		return {
			message:''
		}
	},
	mounted() {
		console.log('$bus',this.$bus);
		this.$bus.$on('on-click',mes => {
			this.message = mes;
		})
	}
}
</script>

<style>

</style>
