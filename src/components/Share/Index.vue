<template>
    <div class="share">
        <el-container ref="homePage">
            <el-header style="height: 70px !important;background-color: #FFFFFF;color: #111;line-height: 70px;border-bottom: 1px solid #F5F5F5;">
                <el-row type="flex" justify="start" style="height: 90px">
                    <el-col align="center" :span="8">
                        <img src="../../assets/images/logo.png" class="share-image-logo" alt="exit">
                    </el-col>
                    <el-col align="center" :span="1">
                        <span class="font-size16 header-link cursor"><router-link to="./ShareIndex">首页</router-link></span>
                    </el-col>
                    <el-col align="center" :span="2">
                        <span class="font-size16 header-link cursor"><router-link to="./ShareIndustry">行业资讯</router-link></span>
                    </el-col>
                    <el-col align="center" :span="2">
                        <span class="font-size16 header-link cursor"><router-link to="./ShareAbout">关于我们</router-link></span>
                    </el-col>
                    <el-col align="center" :span="2">
                        <span class="font-size16 header-link cursor"><router-link to="./ShareDownload">APP下载</router-link></span>
                    </el-col>
                    <el-col align="right" :span="9" v-if="loginStatus == 0" class="margin-right20">
                        <span class="font-size16 color-blue cursor" @click="logon">登 录</span>
                    </el-col>
                    <el-col align="right" :span="9" v-if="loginStatus == 1">
                        <div class="share-header-content margin-right20">
                            <span class="share-welcome font-size16">欢迎您，</span>
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    <span class="share-user-name font-size16 cursor color-blue">{{username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                                </span>
                                <el-dropdown-menu slot="dropdown" style="margin-top: -20px">
                                    <el-dropdown-item command="a">进入后台</el-dropdown-item>
                                    <el-dropdown-item command="b">退 出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="padding: 0;background: #F5F5F5FF">
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-dialog title="登 录" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
            <div class="demo-input-suffix login-username">
                <el-input class="login-name" placeholder="请输入用户名" v-model="username" v-focus="picFocusUsername" @focus="focusUsername()" clearable></el-input>
                <p class="tipMessage">{{tipUsername}}</p>
            </div>
            <div class="demo-input-suffix">
                <el-input class="login-password" placeholder="请输入密码" v-model="password" v-focus="picFocusPassword" @focus="focusPassword()" show-password></el-input>
                <p class="tipMessage">{{tipPassword}}</p>
            </div>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消新增')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">登 录</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import store from '../../vuex/store.js'
import md5 from 'js-md5'
export default {
  name: 'Share',
	data(){
		return{
            loginStatus: 0,
            username: '',
            dialogVisible: false,
            username: '',
            password: '',
            tipUsername:'',
            tipPassword:'',
            checked: false,
            picFocusUsername: false,
            picFocusPassword: false,
            clientHeight:'',
		}
    },
    store,
    methods: {
        changeFixed(clientHeight){ //动态修改样式
            // console.log(clientHeight);
            // console.log(this.$refs.homePage.$el.style.height);
            this.$refs.homePage.$el.style.height = clientHeight+'px';
        },
        handleCommand(command) {
			if(command == 'a'){    //去往后台
				this.$router.push({path:'/Index'})
			}else if(command == 'b'){    //退出
				this.$api.list.logout().then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('退出成功');
                        this.$store.commit('delToken');
                        this.loginStatus = 0;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
                }else{
                    return false;
                }
        },
        //新增、编辑、查看弹窗关闭
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        cancleBtn(){
            this.dialogVisible = false;
        },
        callback(){
            console.log(1);
        },
        //实现加密
        calcuMD5(pwd) {
            pwd = pwd.toUpperCase();
            pwd = md5(pwd);
            return pwd;
        },
        user(){
            this.$api.list.user().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    this.username= data.userInfo.accName;
                    this.loginStatus = 1;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        changeTrue(callback){
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
                account : this.username,
                // username : this.username,
                password : this.calcuMD5(this.password)
            }
            if(this.checked == true){
                self.setCookie(this.username, this.password, 30);
            }else{
                self.clearCookie();
            }
            this.$api.list.login(params).then(res=> {
                console.log(res);
                if(res.data.status == 200){
                    this.$message.success("登录成功");
                    let token = res.data.data;
                    this.$store.commit("setToken",token);
                    this.dialogVisible = false;
                    this.user();
                    callback();
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
        },
        logon(){
            this.dialogVisible = true;
        },
        focusUsername(){
            this.tipUsername = "";
        },
        focusPassword(){
            this.tipPassword = "";
        },
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
    },
    beforeMount(){
        let that = this;
        let token = store.state.token;
        // if(token != ''){
        //     that.user()
        // }
    },
    mounted(){
        // 获取浏览器可视区域高度
        this.clientHeight =   `${document.documentElement.clientHeight}`              
        //document.body.clientWidth;
        //console.log(self.clientHeight);
        window.onresize = function temp() {
            this.clientHeight = `${document.documentElement.clientHeight}`;
        };
        },
    watch: {
        // 如果 `clientHeight` 发生改变，这个函数就会运行
        clientHeight: function () {
            this.changeFixed(this.clientHeight)
        }
    },
    }
</script>

<style>
  .share-image-logo{
      height: 50px;
      width: auto;
      margin-top: 10px;
      margin-left: 120px;
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
.header-link a {
    text-decoration: none;
    color: #111111;
}
.header-link a:hover{
    color: #409EFF;
}
.header-link .router-link-active {
    text-decoration: none;
    color: #409EFF;
}
</style>
