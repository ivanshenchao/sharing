<template>
	<el-row>
		<el-container>
			<el-main>
				<el-input class="loginInput" placeholder="请输入手机号码" @keyup.native="handleClick" v-model="num" clearable></el-input>
				<el-row>
					<el-col class="test">
						<el-input class="loginInput" placeholder="请输入验证码" v-model="password" show-password></el-input>
					</el-col>
				<el-col class="getTest">
					<el-button type="info" plain :disabled="disabled" @click="getTest()">获取验证码</el-button>
				</el-col>
				</el-row>
				
				<el-button class="button" type="primary">登 录</el-button>
			</el-main>
		</el-container>
	</el-row>
</template>

<script>
	export default{
		data(){
			return{
				num: '',
				password: '',
				disabled: false
			}
		},
	methods: {
		handleClick(){
		    this.num=this.num.replace(/[^\.\d]/g,'');
			this.num=this.num.replace('.','');
		},
		getTest(){
			this.disabled = true;
		}
		
	}
	
}
</script>

<style scoped="scoped">
	.loginInput{
		margin-bottom: 1rem;
	}
	.button{
		width: 20rem;
	}
	.test{
		width: 12rem;
	}
	.getTest{
		margin-left: 1rem;
		width: 7rem;
	}
</style>
