<template>
  <div >
    <a-input v-model="inputValue"></a-input>
		<p>{{inputValue}}</p>
		store
  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
export default {
	data() {
		return {
			inputValue:''
		}
	},
	components: {
		AInput
	}
}
</script>


