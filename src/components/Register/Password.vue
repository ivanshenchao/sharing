<template>
	<el-row>
		<el-container>
			<el-main>
				<div class="demo-input-suffix">
					<span class="tipMessage">{{tipMessage}}</span>
					<el-input class="loginInput" placeholder="请输入用户名" v-model="username" clearable></el-input>
				</div>
				<div class="demo-input-suffix">
					<el-input class="loginInput" placeholder="请输入密码" v-model="password" show-password></el-input>
				</div>
				<div class="demo-input-suffix">
					<el-input class="loginInput" placeholder="请再次输入密码" v-model="repassword" show-password></el-input>
				</div>
				<el-button type="primary" @click="submit()">登 录</el-button>
			</el-main>
		</el-container>
	</el-row>
</template>

<script>
	export default{
		data(){
			return{
				username: '',
				password: '',
				repassword: '',
				tipMessage:''
			}
		},
	methods: {
	  submit(){
		  let params = {
			  username : this.username,
			  password : this.password,
			  repassword : this.repassword
		  }
		   this.$api.list.register(params).then(res=> {
			   this.$message.success("注册成功");
			   this.$router.push({path:'../Login'});
            // 执行某些操作
			console.log(res)
        }).catch((error)=>{
			console.log(error);
				this.tipMessage = "账户或密码错误";
				this.$message.error("账户或密码错误");
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
		font-size: .9rem;
	}
	button{
		width: 20rem;
	}
</style>
