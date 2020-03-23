<template>
	<el-row class="register">
		<el-container>
			<el-header>
				<el-tabs v-model="activeName" tab-position='bottom' @tab-click="handleClick">
					<el-tab-pane label="账号注册" name="Password"></el-tab-pane>
					<el-tab-pane label="手机注册" name="Message"></router-link></el-tab-pane>
				</el-tabs>
			</el-header>
			<el-main>
				<v-password v-if="tabName == 'Password'"></v-password>
				<v-Message v-if="tabName == 'Message'"></v-Message>
			</el-main>
		</el-container>
	</el-row>
</template>

<script>
	import Password from './Password'
	import Message from './Message'
	export default{
		data(){
			return{
				activeName:'Password',
				tabName:'Password'			
			}
		},
		components:{
			'v-password' : Password,
			'v-Message' : Message
		},
    methods: {
		 handleClick(tab, event) {
			 if(this.tabName!=tab.name){
				 this.tabName = tab.name;
			 }
		  }
    },
	mounted(){
		
	}
	}
</script>

<style scoped>
	.register{
		width: 25rem;
		border-radius: 0.5rem;
		box-shadow:  0 2px 4px rgba(0, 0, 0, .12);
		margin: 10rem auto;
	}
	
</style>
