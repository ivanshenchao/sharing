
<template>
	<div class="home" style="background: white;">
		<el-container>
			<el-aside width='200px' style="background: white;height:100vh">
				<div class="logoa">
					<img src="../assets/images/logo.png" class="logo" alt="logo" @click="toIndex()">
				</div>
				<div class="menu">
					<ul class="menu-ul">
						<li class="menu-ul-li" v-for="(item,index) in list" :key="index">
							<div class="menu-title"><i :class="item.icon"></i> {{item.name}}</div>
							<ul class="menu-ul-li-ul">
								<li class="menu-item" v-for="(items,indexs) in item.content" :key="indexs" :class="{active:index == tabIndex&&indexs == tabIndexs}" @click="addClassFun(index,indexs,items.url)">
									<p class="menu-item-p"><span class="dot"></span>{{items.name}}</p>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</el-aside>
			<el-container style="height: 100vh">
				<el-header style="background: white;height: 90px;postion: fixed;top:0">
					<el-row type="flex" justify="start" style="height: 90px">
						<el-col align="left" :span="8"></el-col>
						<el-col align="right" :span="16">
							<div class="header-content">
								<span class="news" @click="toNews">
									<el-badge :value="newsNum" class="item">
										<i class="el-icon-bell"></i>
									</el-badge>
								</span>
								<span class="welcome">欢迎您，</span>
								<el-dropdown @command="handleCommand">
									<span class="el-dropdown-link">
										<span class="user-name cursor">{{username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
									</span>
									<el-dropdown-menu slot="dropdown" style="margin-top: -20px">
										<!-- <el-dropdown-item command="a">我的资料</el-dropdown-item> -->
										<el-dropdown-item command="b">修改密码</el-dropdown-item>
										<el-dropdown-item command="c">清除缓存</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
								
								<span class="exit" @click="exit()"><img src="../assets/images/exit.png" class="exit-image" alt="exit"></span>
							</div>
						</el-col>
					</el-row>
				</el-header>
				<el-main style="background: #eff1f7">
					<el-dialog title="修改密码" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
						 <el-form :model="form">
							<el-form-item label="密码：" label-width="100px">
								<el-input v-model="form.old_pass" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="新密码：" label-width="100px">
								<el-input v-model="form.user_pass" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="再次输入：" label-width="100px">
								<el-input v-model="form.user_pasd" autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="cancleBtn('您已取消修改')">取 消</el-button>
							<el-button type="primary" @click="changePassword">确 定</el-button>
						</span>
					</el-dialog>
					<el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="p20-scrollbar__view">
						<div class="main">
							<router-view v-if="mainShow"></router-view>
						</div>
        			</el-scrollbar>	
				</el-main>
			</el-container>
		</el-container>
		<div class="fill" v-if="fillSignedShow">
			<v-Fill v-if="fillShow"></v-Fill>
            <v-Signed v-if="signedShow"></v-Signed>
		</div>
	</div>
</template>

<script>
import Signed from './Signed/Signed'
import Fill from './Signed/Fill'
import store from '../vuex/store.js'
import md5 from 'js-md5'
import { callbackify } from 'util';
export default {
    data() {
      return {
		isCollapse: true,
		tabIndex:-1,
		tabIndexs:-1,
		mainShow: true,
		fillSignedShow: false,
		fillShow: false,
		signedShow: false,
		dialogVisible: false,
		form: {
			old_pass: '',
			user_pass: '',
			user_pasd: ''
		},
		formLabelWidth: '120px',
		newsNum : '',
		username:'',
		list:[]
      };
    },
	store,
    methods: {
		//查看个人信息、修改密码、清除缓存
		handleCommand(command) {
			if(command == 'a'){    //查看个人信息
				this.$router.push({path:'./Information'})
			}else if(command == 'b'){    //修改密码
				this.form.old_pass = '';
				this.form.user_pass = '';
				this.form.user_pasd = '';
			    this.dialogVisible= true;
			}else if(command == 'c'){    //清除缓存
				this.$message.success('清除成功');
				this.$router.go(0);
				
			}else{
				return false;
			}
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
			.then(_ => {
				done();
			})
			.catch(_ => {});
		},
		changePassword(){
			let params = {
				oldPwd : this.calcuMD5(this.form.old_pass),
				newPwd : this.calcuMD5(this.form.user_pass),
				newPwdOk : this.calcuMD5(this.form.user_pasd),
			};
			this.$api.list.changePass(params).then(res=> {
				if(res.data.status == 200){
					this.$message.success('修改成功');
					this.dialogVisible = false;
				}else{
					this.$message.error(res.data.msg);
				}
				
			}).catch(error=>{
				console.log(error);
			})
		},
		cancleBtn(msg){
			this.dialogVisible = false;
			this.$message(msg);
		},
	  //退出登录-回调函数
	    callbackit(){
			//获取用户信息
			this.$api.list.logout().then(res=> {
				if(res.data.status == 200){
					this.$message.success('退出成功');
					this.$store.commit('delToken');
					this.$router.push({
						path: '/Login',
					});
				}else{
					this.$message.error(res.data.msg);
				}
				
			}).catch(error=>{
				console.log(error);
			})
	    },
	    //弹窗-退出二次确认
	    exit(){
		  this.utils.open("退出","是否确认退出当前登录？","warning",this.callbackit,"退出");
	    },
	    //导航点击样式及跳转
	    addClassFun(index,indexs,url){
			this.tabIndex = index;
			this.tabIndexs = indexs;
			this.$router.push({
				path: '../'+url,
			});
			console.log(url);
		},
		//实现加密
        calcuMD5(pwd) {
            pwd = pwd.toUpperCase();
            pwd = md5(pwd);
            return pwd;
        },
		//点击logo前往首页
		toIndex(){
			this.$router.push({
				path: '../Index',
			});
		},
		//用户第一次登陆需签协议
		//第一步，签订协议
		singedShow(){
			this.fillShow = true;
			this.signedShow = false;
		},
		//第二步，填写必要信息
		singedClose(){
			this.fillShow = false;
			this.signedShow = true;
			//this.$router.go(0); //刷新当前页面
		},
		//第三步，签订协议
		singedSuccess(){
			this.fillShow = false;
			this.signedShow = false;
			this.fillSignedShow = false;
			this.mainShow = true;
			this.$router.go(0); //刷新当前页面
		},
		//   跳转消息通知，并清空未显示数量
		toNews(){
			let str= this.$route.path;
			let arr =  str.split("/");
			if(arr.length>2){
				this.$router.push({path:'../Notices'})
				return false
			}
			this.$router.push({path:'./Notices'})
		},
		},
		components:{ 
			'v-Signed' : Signed,
			'v-Fill' : Fill
		},
		beforeMount(){
			//获取用户信息
			this.$api.list.user().then(res=> {
				if(res.data.status == 200){
					let data = res.data.data;
					this.username= data.userInfo.accName;
					let roleId = res.data.data.userInfo.roleId;
					if(roleId==3 || roleId==4){
						if(data.userInfo.isSgin != 2){
							this.mainShow = false;
							this.fillSignedShow = true;
							this.signedShow = true;
							return false
						}	
					}
					if(roleId == 1){
						this.list= [{
				            name:'客服服务',
				            icon:'el-icon-setting',
				            content:[{
				                name:'合同管理',
				                url:'ContractMat'
				            },{
				                name:'企业信息',
				                url:'EnterpriseInfo'
				            },{
				                name:'代理团队',
				                url:'AgentTeam'
				            },{
				                name:'费率管理',
				                url:'Ratemat'
				            }]
				            },{
				                name:'行业资讯',
				                icon:'el-icon-document',
				                content:[{
				                    name:'资讯分类',
				                    url:'Category'
				                },{
				                    name:'内容管理',
				                    url:'ContentMat'
				                }]
				            },{
				                name:'企业专栏',
				                icon:'el-icon-money',
				                content:[{
				                    name:'专栏管理',
				                    url:'ColumnMat'
				                },{
				                    name:'专栏内容',
				                    url:'ColumnCont'
				                }]
				            },{
					            name:'系统管理',
					            icon:'el-icon-setting',
					            content:[{
					                name:'账号管理',
					                url:'Account'
					            },{
					                name:'企业充值',
					                url:'MakeRecharge'
					            },{
					                name:'企业模板',
					                url:'MakeTemplate'
					            },{
					                name:'开票记录',
					                url:'MakeIneRec'
					            },{
					                name:'通知公告',
					                url:'NoticeSys'
					            },{
					                name:'需求类型',
					                url:'ReqType'
					            },{
					                name:'打款任务',
					                url:'Remit'
					            },{
					                name:'banner',
					                url:'Banner'
					            }]
					         }
				        ]
					}else if(roleId == 2){
						this.list =[{
				                name:'任务管理',
				                icon:'el-icon-document',
				                content:[{
				                    name:'任务模板',
				                    url:'Template'
				                },{
				                    name:'任务管理',
				                    url:'Management'
				                }]
				            },{
				                name:'财务管理',
				                icon:'el-icon-money',
				                content:[{
				                    name:'财务管理',
				                    url:'Financial'
				                },{
				                    name:'充值记录',
				                    url:'Recharge'
				            }]
					        },{
					            name:'发票管理',
					            icon:'el-icon-tickets',
					            content:[{
					                name:'发票申请',
					                url:'Invoice'
					            },{
					                name:'申请记录',
					                url:'InvoicRecord'
					            }]
					        },{
					            name:'资源管理',
					            icon:'el-icon-folder-opened',
					            content:[{
					                name:'产品管理',
					                url:'ProductMat'
					            },{
					                name:'资料管理',
					                url:'DataMat'
					            }]
					        },{
					            name:'系统管理',
					            icon:'el-icon-setting',
					            content:[{
					                name:'合作管理',
					                url:'CooperativeMat'
					//             },{
					//                 name:'签约信息',
					//                 url:'SignInfo'
					            },{
					                name:'企业信息',
					                url:'CompanyInfo'
					            },{
					                name:'通知公告',
					                url:'Notice'
					            }]
				            }]
					}else if(roleId == 3){
						this.list =[{
				                name:'任务管理',
				                icon:'el-icon-document',
				                content:[{
				                    name:'任务管理',
				                    url:'TaskDist'
				                },{
				                    name:'我的任务',
				                    url:'MyTask'
				                },{
				                    name:'任务审核',
				                    url:'TaskCheck'
				                }]
				            },{
				                name:'财务管理',
				                icon:'el-icon-money',
				                content:[{
				                    name:'区域财务',
				                    url:'FinancialDist'
				                },{
				                    name:'我的财务',
				                    url:'MyFinancial'
				                }]
					        },{
					            name:'系统管理',
					            icon:'el-icon-setting',
					            content:[{
					                name:'个人信息',
					                url:'Information'
					            },{
					                name:'产品资料',
					                url:'DataSem'
					            },{
					                name:'通知公告',
					                url:'Notice'
					            },{
					                name:'合同信息',
					                url:'ContractInfo'
					            }]
				            }]
					}else if(roleId == 4){
						this.list =[{
					                name:'任务管理',
					                icon:'el-icon-document',
					                content:[{
					                    name:'我的任务',
					                    url:'MyTask'
					                }]
					            },{
					                name:'财务管理',
					                icon:'el-icon-money',
					                content:[{
					                    name:'我的财务',
					                    url:'MyFinancial'
					                }]
						        },{
						            name:'系统管理',
						            icon:'el-icon-setting',
						            content:[{
						                name:'个人信息',
						                url:'Information'
						            },{
						                name:'产品资料',
						                url:'DataSem'
						            },{
						                name:'通知公告',
						                url:'Notice'
						            },{
						                name:'合同信息',
						                url:'ContractInfo'
						            }]
					            }]
				    }
					//获取为查看通知消息
					let params = {
						pageNo : 1,
						pageSize : 10
					}
					this.$api.list.noticeLists(params).then(res=> {
						if(res.data.status == 200){
							if(res.data.data.count>0){
								this.newsNum = res.data.data.count;
							}
						}else{
							this.$message.error(res.data.msg);
						}
					}).catch(error=>{
						console.log(error);
					})
				}else{
					this.$message.error(res.data.msg);
				}
				
			}).catch(error=>{
				console.log(error);
			})
		}
}
</script>

<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}
    .el-aside {
		color: #333;
		scrollbar-width:none;
    	-ms-overflow-style:none;
	}
	.el-aside::-webkit-scrollbar {
		display: none;
	}
	.el-main{
		padding: 0;
	}
	.el-main {
		width: 100%;
		height: 100%;
	}
	.el-main.default {
		height: auto;
	}
	.default-scrollbar {
		width: 100%;
		height: 100%;
	}
	.flex-scrollbar {
		width: auto;
		height: auto;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.el-scrollbar__wrap.default-scrollbar__wrap {
		overflow-x: auto;
	}
	.el-scrollbar__view.p20-scrollbar__view {
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		-o-box-sizing: border-box;
		-ms-box-sizing: border-box;
	}
	.el-badge__content{
		background: none !important;
		line-height: 90px !important;
		border: none !important;
		color: red !important;
		font-weight: bold !important
	}
	.header-content{
		height: 90px;
		line-height: 90px
	}
	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}
	.el-dialog__footer{
		text-align: center;
	}
	.exit{
		margin: 0 20px;
		cursor: pointer;
		font-size: 20px;
	}
	.exit-image{
		height: 20px;
		width: auto;
	}
	.user-name{
		font-size: 20px;
		color: #409EFF;
	}
	.welcome{
		font-size: 20px;
		color: rgba(46,59,78,1);
	}
	.news{
		font-size: 25px;
		margin-right: 30px;
		cursor: pointer;
		color: #409EFF;
	}
	.logoa{
		background:white;
		padding: 16px 10px;
		cursor: pointer;
		position:fixed;
		z-index:999;
		border-bottom: 1px solid #eff1f7;
	}
	.logo{
		width: 180px;
		height: 53px;
	}
	li{
		list-style: none;
	}
	.menu{
		margin-top: 90px;
	}
	.menu-ul{
		padding: 5px 0;
		margin: 0;
	}
	.menu-title{
		height: 35px;
		font-size: 16px;
		line-height: 35px;
		color: #929fa9;
		letter-spacing: 2px;
		margin-left: 20px
	}
	.menu-ul-li{
		width: 100%;
	}
	.menu-item{
		width: 100%;
		height: 45px;
		font-size: 14px;
		line-height: 45px;
		color: #213b4e;
		letter-spacing: 2px;
		cursor: pointer;
		padding: 0;
		width: 200px;
		overflow: hidden;
	}
	.menu-item-p{
		width: 200px;
		padding-left: 40px;
		margin: 0;
	}
	.dot{
		display: block;
		width: 8px;
		height: 8px;
		background: rgb(190, 191, 192);
		border-radius: 8px;
		float: left;
		margin: 20px 10px
	}
	.menu-ul-li-ul{
		padding: 0
	}
	.menu-item:hover{
		background: rgba(232,243,255,1);
	}
	.menu-item:hover .menu-item-p{
		padding-left: 36px;
		border-left: 4px solid #409EFF;
	}
	.menu-item:hover .dot{
		background: #409EFF;
	}
	.menu-ul-li-ul .active{
		background: rgba(232,243,255,1);
	}
	.menu-ul-li-ul .active .menu-item-p{
		padding-left: 36px;
		border-left: 4px solid #409EFF;
	}
	.menu-ul-li-ul .active .dot{
		background: #409EFF;
	}
	.fill{
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(250, 250, 250, 0.1);
	}
</style>
