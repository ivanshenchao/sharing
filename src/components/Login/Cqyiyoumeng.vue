<template>
  <div class="login-container">
    <el-row>
		<el-container>
			<el-main class="login-first">
                <div class="logo-image">
                    <img src="../../assets/images/logo2.png" alt="医二三">
                </div>
                <div class="login-message">
                    <p class="login-message-name">医二三</p>
                    <p class="login-message-title">一站式医药营销管理平台。</p>
                    <p class="login-message-company">成都黑果科技有限公司</p>
                </div>
			  <p class=""></p>
			</el-main>
            <el-main class="login-second">
                <div class="demo-input-suffix">
					<p class="title-submit">登 录</p>
				</div>
				<div class="demo-input-suffix login-username">
					<el-input class="login-name" placeholder="请输入用户名" v-model="username" v-focus="picFocusUsername" @focus="focusUsername()" clearable></el-input>
                    <p class="tipMessage">{{tipUsername}}</p>
				</div>
				<div class="demo-input-suffix">
					<el-input class="login-password" placeholder="请输入密码" v-model="password" v-focus="picFocusPassword" @focus="focusPassword()" show-password></el-input>
                    <p class="tipMessage">{{tipPassword}}</p>
				</div>
				<el-checkbox v-model="checked">记住密码</el-checkbox>
                <br />
                <div class="submit">
                    <el-button class="btn-submit" type="primary" @click="submit()">登 录</el-button>
                </div>
			</el-main>
		</el-container>
	</el-row>
  </div>
	
</template>

<script>
	import store from '../../vuex/store.js'
	export default{
		data(){
			return{
				username: '',
				password: '',
                tipUsername:'',
                tipPassword:'',
                checked: false,
                picFocusUsername: false,
                picFocusPassword: false
			}
		},
		store,
        methods: {
            //设置cookie
            setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie =
                "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie =
                "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            },
            //读取cookie
            getCookie: function() {                
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split("="); //再次切割
                    //判断查找相对应的值
                        if (arr2[0] == "userName") {
                            this.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == "userPwd") {
                            this.password = arr2[1];
                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            },
            focusUsername(){
                this.tipUsername = "";
            },
            focusPassword(){
                this.tipPassword = "";
            },
            submit(){
                if(!this.username){
                    this.tipUsername = "请输入用户名";
                    return false
                }
                if(!this.password){
                    this.tipPassword = "请输入密码";
                    return false
                }
                const self = this;
                let params = {
                    username : this.username,
                    password : this.password
                }
                if(this.checked == true){
                    self.setCookie(this.username, this.password, 30);
                }else{
                    self.clearCookie();
                }
                this.$api.list.login(params).then(res=> {
                    if(res.data.code == 1){
                        this.$message.success("登录成功");
                        let token = res.data.data.token;
                        this.$store.commit("setToken",token);
                        this.$router.push({path: '/Index',});
                    }else{
                        this.$message.error(res.data.msg);
                    }
                   
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
        mounted(){
            this.getCookie();
            if(this.username){
                this.checked = true;
            }
        }
	
}
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/images/login.png");
    background-size: cover;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-justify-content:center;
    justify-content: center;
    -moz-box-pack:center;
    -webkit-box-pack:center;
    box-pack:center;
    align-items: center;
    -webkit-align-items:center;
    box-align:center;
    -moz-box-align:center;
    -webkit-box-align:center;
}

@media screen and (min-height: 1001px) {
  
}
@media screen and (min-height:900px) and (max-height:1000px) {
  
}
@media screen and (min-height:800px) and (max-height:899px) {
  
}
@media screen and (min-height:700px) and (max-height:799px) {
  
}
@media screen and (min-height:600px) and (max-height:699px){
  
}
@media screen and (max-height: 599px) {
  
}

.login-first{
    width: 750px;
    height: 280px;
    margin-top: 35px;
    overflow: hidden;
    background-color: rgba(67, 67, 67, 0.8);
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
    letter-spacing: 1px;
    .logo-image img{
        width: 100px;
        height: auto;
        margin: 50px 0 10px;
    }
    .login-message-name{
        font-size: 1.2rem;
        margin: 10px;
        letter-spacing: 5px;
        font-weight: bold
    }
    .login-message-title{
        font-size: 0.8rem
    }
    .login-message-company{
        font-size: 0.8rem
    }
}
.login-second{
    width: 450px;
    height: 360px;
    margin-left: -500px;
    background: white;
    border-radius: 10px;
     -webkit-box-shadow: 0 0 30px 10px #7a7a7a;
    -moz-box-shadow: 0 0 30px 10px #7a7a7a;
    box-shadow: 0 0 30px 10px #7a7a7a;
    padding: 20px 50px;
}
.demo-input-suffix{
    margin: 15px 0;
}
.title-submit{
    font-size: 1rem;
    color: #1494E5;
    margin-bottom: 25px;
}
.tipMessage{
    margin: 0;
    padding: 0;
    font-size: 0.65rem;
    color: red;
    text-align: left;
    height: 10px;
    letter-spacing: 1px
}
.submit{
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
    .btn-submit{
        width: 100%;
        font-size: 0.9rem
    }
}

</style>
