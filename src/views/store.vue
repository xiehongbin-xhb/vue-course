{}<template>
  <div >
		<p>appNameWithVersion : {{ appNameWithVersion }}</p>
    <a-input v-model="inputValue"></a-input>
		<p>{{inputValue}}</p>
		<p>{{appName}}</P>
		<button @click="handleChangeAppName">修改appName</button>
		<button @click="handleChangeAppNameByAction">触发action</button>
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
	methods:{
		handleChangeAppName(){
			// appName 是store中的数据，如果要修改，需要触发一个mutation
			// 方式一
			// this.$store.commit('SET_APP_NAME',{
			// 	appName:'newAppName'
			// });
			// 方式2
			this.$store.commit({
				type:'SET_APP_NAME',
				appName:'newAppName'
			});
			this.$store.commit('SET_APP_VERSION');
		},
		handleChangeAppNameByAction(){
			// ...
			this.$store.dispatch('updateAppName', '123')
		}
	},
	computed: {
		appName() {
			return this.$store.state.appName
		},
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


