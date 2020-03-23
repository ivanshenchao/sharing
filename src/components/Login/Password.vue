<template>
	<el-row>
		<el-container>
			<el-main>
				<div class="demo-input-suffix">
					<p class="tipMessage">{{tipMessage}}</p>
					<el-input class="loginInput" placeholder="请输入用户名" v-model="username" clearable></el-input>
				</div>
				<div class="demo-input-suffix">
					<el-input class="loginInput" placeholder="请输入密码" v-model="password" show-password></el-input>
				</div>
				
				<el-button type="primary" @click="submit()">登 录</el-button>
			</el-main>
		</el-container>
	</el-row>
</template>

<script>
	import store from '../../vuex/store.js'
	export default{
		data(){
			return{
				username: '',
				password: '',
				tipMessage:''
			}
		},
		store,
	methods: {
	  submit(){
		    let params = {
		  		username : this.username,
		  		password : this.password
		    }
		   this.$api.list.login(params).then(res=> {
					this.$message.success("登录成功");
					let token = res.data.data.token;
					this.$store.commit("setToken",234);
					this.$router.push({path:decodeURIComponent(this.$route.query.redirect)})
        }).catch(error=>{
				this.tipMessage = "账户或密码错误";
				this.$message.error(this.tipMessage);
			})
	  }
	}
	
}
</script>

<style scoped="scoped">
	.loginInput{
		margin-bottom: 1rem;
	}
	.tipMessage{
		color: red;
		text-align: center;
		font-size: 12px;
		letter-spacing: 1px;
		padding: 0;
		margin-top: -20px	
	}
	button{
		width: 100%;
	}
</style>
