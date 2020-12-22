<template>
	<div>
		<button @click = "handleClick">按我</button>
	</div>
</template>

<script>
export default {
	methods: {
		handleClick() {
			this.$bus.$emit('on-click','hello');
		}
	}
}
</script>

<style>

</style>
