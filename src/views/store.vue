{}<template>
  <div >
		<p>appNameWithVersion : {{ appNameWithVersion }}</p>
    <a-input v-model="inputValue"></a-input>
		<p>{{inputValue}}</p>
		<!-- <p>{{appName}}</P> -->
		<!-- <p>{{userName}}</p> -->

  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
// import { createNamespaceHelpers  } from 'vuex'
// const { mapState } = createNamespaceHelpers('user')
export default {
	data() {
		return {
			inputValue:''
		}
	},
	computed: {
		// appName() {
		// 	return this.$store.state.appName
		// },
		// userName(){
		// 	return this.$store.state.user.userName
		// }
		// ...mapState(['appName'])
		// ...mapState({
		// 	appName:state => state.appName,
		// 	userName:state => state.user.userName
		// })
		// ... 展开操作符，这里表示展开一个对象
		// ...mapState({
		// 	userName: state => state.userName
		// }),
		appNameWithVersion() {
			return this.$store.getters.appNameWithVersion
		}
	},
	components: {
		AInput
	}
}
</script>


