<template>
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="../index">首页</el-breadcrumb-item>
                <el-breadcrumb-item  to="../Management">任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">模板任务</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <div class="informationss">
            <div class="margin-bottom20">
                <div class="el-button-copy" @click="back">返回列表</div>
            </div>
            <el-row :span="24">
                <el-row>
                    <el-col :span="24">
                        <el-form ref="form" :model="form" label-width="120px" class="informationss-content height50 padding20">
                            <el-col :span="12">
                                <el-form-item label="任务名称：">
                                    <el-input v-model="form.taName" class="width300" placeholder="请输入任务名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="任务地区：">
                                    <el-col :span="8" class="margin-right20">
                                        <el-select v-model="form.capitalId" placeholder="请选择省份" @change="selectCapital">
                                            <el-option v-for="item in capital" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="8" class="margin-right20">
                                        <el-select v-model="form.cityId" filterable clearable placeholder="请选择城市">
                                            <el-option v-for="item in city" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                                        </el-select>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row class="informationss-content">
                    <el-col :span="24">
                        <span class="padding-left20 font-size18">任务内容</span>
                    </el-col>
                    <el-col :span="24" class="task-content-table">
                        <el-col :span="24" class="task-content-thead">
                            <el-col :span="3" class="task-content-td text-center">任务类型</el-col>
                            <el-col :span="3" class="task-content-td text-center">产品名称</el-col>
                            <el-col :span="2" class="task-content-td text-center">任务数量</el-col>
                            <el-col :span="2" class="task-content-td text-center">任务单价</el-col>
                            <el-col :span="3" class="task-content-td text-center">任务总额</el-col>
                            <el-col :span="9" class="task-content-td text-center">任务期间</el-col>
                            <el-col :span="2" class="task-content-td text-center">操作</el-col>
                        </el-col>
                        <el-col :span="24" class="task-content-tbody" v-for="(item,index) in form.contentList" :key='index'>
                            <el-col :span="3" class="task-content-td text-center padding10">
                                <el-select v-model="item.taskId" placeholder="请选择" @change="selects(item.taskId,index)">
                                    <el-option v-for="(items,indexs) in typeArr" :key="indexs" :label="items.taskName" :value="items.taskId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3" class="task-content-td text-center padding10">
                                <el-select v-model="item.prodId" placeholder="请选择">
                                    <el-option v-for="(items,indexs) in prodArr" :key="indexs" :label="items.prodName" :value="items.prodId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2" class="task-content-td text-left padding10"><el-input v-model="item.conCount" placeholder="任务数量"></el-input></el-col>
                            <el-col :span="2" class="task-content-td text-center padding10"><el-input v-model="item.conPrice" placeholder="任务单价"></el-input></el-col>
                            <el-col :span="3" class="task-content-td text-center padding10"><el-input :value="item.conCount*item.conPrice" placeholder="任务单价" disabled=""></el-input></el-col>
                            <el-col :span="9" class="task-content-td text-center padding10"><el-date-picker v-model="item.valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']"></el-date-picker></el-date-picker></el-col>
                            <el-col :span="2" class="task-content-td text-center margin-top30 color-red"><span class="cursor" @click="delTem(index)">删除</span></el-col>
                            <el-col :span="17" class="task-content-td text-center padding10"><el-input type="textarea" maxlength="500" :rows="3" v-model="item.taRemark" placeholder="请输入该任务类型的要求" show-word-limit></el-input></el-col>
                            <el-col :span="5" class="task-content-td text-center padding10">
                                <div class="submit">
                                    <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        :action="url"
                                        :headers="myHeaders"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :file-list="fileList"
                                        :limit="1"
                                        :before-upload="uploadSize"
                                        accept=".doc,.docx,.xls,.xlsx"
                                        :on-success="responseAction">
                                        <el-button slot="trigger" size="small" type="primary" @click="zz(index)">上传报告模板</el-button>
                                        <span slot="tip" class="el-upload__tip"></span>
                                    </el-upload>
                                    <p v-if="item.showFile">
                                        <el-link class="text-center" target="_blank" :href="downUrl+item.tempFielUrl" :underline="false">{{item.tempFielName}}</el-link>
                                    </p>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col :span="24" class="text-center color-blue padding10 margin-top20 margin-bottom20" @click="addTem">
                            <span class="cursor" @click="addTem">+新增任务类型</span>
                        </el-col>
                        <div class="text-center margin-bottom20">
                            <el-button type="primary" @click="save">保 存</el-button>
                            <el-button type="success" @click="submit">发 布</el-button>
                            <el-button @click="back">取 消</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-row>
        </div>
        </section>
        
    </div>
</template>

<script>
import { callbackify } from 'util';
import base from '../../request/base';
import store from '../../vuex/store.js';
    export default{
        data(){
            return{
                msg:'行业资讯--内容管理--新增文章',
                form: {
                    taName:'',
                    capitalId:'', //省份ID
                    cityId:'', //城市ID 
                    contentList:[
                        {
                           taskId:'', 
                           conCount:0, 
                           conPrice:0, 
                           valueTime: [],
                           beginTime:'', 
                           endTime:'', 
                           taRemark:'',
                           prodId:"",
                           tempFileId:"",
                           tempFielName:"",
                           tempFielUrl:"",
                           showFile: false,
                        }
                    ]                   
                },
                capital: [], //省份数组
                city: [], //城市数组
                typeArr: [],//类型数组
                prodArr:[],//产品数组
                typeObjs:{},
                prodObjs:{},
                aid:'',
                submitToken:'',
                url:'',
                token:'',
                imageUrl:'',
                myHeaders:{},
                fileArr:[],
                fileList:[],
                downUrl:'',
                file_path:'',
                file_name:'',
                file_num:'',
            }
        },
        methods:{
            back(){
                this.$router.push({path:'/Management'})
            },
            //上传
            zz(index){
                this.file_num = index;
            },
            //资料提交
            uploadSize(file) { 	
                console.log(file);			
				var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
				const isLt2M = file.size / 1024 / 1024 < 300     //这里做文件大小限制
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 300MB!',
						type: 'warning'
                    });
                     return false;
				}
			},
            responseAction(response){
                this.form.contentList[this.file_num].tempFileId = response.data.fileId;
                this.form.contentList[this.file_num].showFile = false;
            },
            handleRemove(file, fileList) {
                //this.form.fileId = '';
                //this.form.fileId = '';
                console.log(2);
            },
            handlePictureCardPreview(file) {
                 console.log(3);
            },
            handlePreview(file) {
                console.log(file);
            },
             addTem(){
                let num = this.form.contentList.length - 1;
                if(this.form.contentList[num].valueTime.length<2){
                    this.$message.error("请先选择任务时间");
                    return false;
                }
                this.form.contentList.push({
                    taskId:'', 
                    conCount:0, 
                    conPrice:0, 
                    valueTime: this.form.contentList[num].valueTime,
                    taRemark:'',
                    prodId:"",
                    tempFileId:"",
                    tempFielName:"",
                    tempFielUrl:"",
                    showFile: false,
                });
            },
            delTem(index){
                if(this.form.contentList.length<2){
                    this.$message.error("至少保留一条任务内容");
                    return false
                }
                this.form.contentList.splice(index,1);
            },
            //地址选择
            //下拉加载城市
            selectCapital(){
                this.form.cityId = '';
                if(!this.form.capitalId){
                    return false
                }
                let parmas = {capitalId : this.form.capitalId};
                this.$api.list.getCity(parmas).then(res=> {
                    if(res.data.status == 200){
                        this.city = res.data.data.list;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //类型选择
            selects(id,index){
                let params = {taskTypeId : id};
                this.$api.task.getMakeTempType(params).then(res=> {
                    if(res.data.status == 200){
                        let data = res.data.data;
                        if(data){
                            this.form.contentList[index].showFile = true;
                            this.form.contentList[index].tempFileId = data.fileId;
                            this.form.contentList[index].tempFielName = data.fileName;
                            this.form.contentList[index].tempFielUrl = data.fileUrl;
                            this.form.contentList[index].taRemark = data.taskRequirement;
                        }else{
                            this.form.contentList[index].showFile = false;
                            this.form.contentList[index].tempFileId = '';
                            this.form.contentList[index].tempFielName = '';
                            this.form.contentList[index].tempFielUrl = '';
                            this.form.contentList[index].taRemark = '';
                        }
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            submitData(data){
                this.$api.task.taskPost(data).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('新增成功');
                        this.back();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //获取月份
            getDate(str){
                let arr = str.split("-");;
                return arr[1]
            },
            save(){
                let obj = {};
                let num = this.form.contentList.length - 1;
                obj.state = 1;
                obj.submitToken = this.submitToken;
                obj.taName =  this.form.taName;
                obj.capitalId = this.form.capitalId;
                obj.cityId = this.form.cityId;
                obj.contentList = [];
                this.form.contentList.forEach((item,index)=>{
                    let objs = {};
                    let str = this.getDate(item.valueTime[0]);
                    objs.taskId = item.taskId;
                    objs.conName = "关于"+this.prodObjs[item.prodId]+str+"月份"+this.typeObjs[item.taskId]+"的推广计划";
                    objs.conCount = item.conCount;
                    objs.conPrice = item.conPrice;
                    objs.beginTime = item.valueTime[0];
                    objs.endTime = item.valueTime[1];
                    objs.taRemark = item.taRemark;
                    objs.prodId = item.prodId;
                    objs.tempFileId = item.tempFileId;
                    objs.tempFielName = item.fileName;
                    objs.tempFielUrl = item.fileUrl;
                    obj.contentList.push(objs);
                    if(index == num){
                        this.submitData(obj) 
                    }
                })
            },
            submitDataPost(data){
                this.$api.task.taskPost(data).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('发布成功');
                        this.back();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            submit(){
                let obj = {};
                let num = this.form.contentList.length - 1;
                obj.state = 2;
                obj.submitToken = this.submitToken;
                obj.taName =  this.form.taName;
                obj.capitalId = this.form.capitalId;
                obj.cityId = this.form.cityId;
                obj.contentList = [];
                this.form.contentList.forEach((item,index)=>{
                    let objs = {};
                    let str = this.getDate(item.valueTime[0]);
                    objs.taskId = item.taskId;
                    objs.conName = "关于"+this.prodObjs[item.prodId]+str+"月份"+this.typeObjs[item.taskId]+"的推广计划";
                    objs.conCount = item.conCount;
                    objs.conPrice = item.conPrice;
                    objs.beginTime = item.valueTime[0];
                    objs.endTime = item.valueTime[1];
                    objs.taRemark = item.taRemark;
                    objs.prodId = item.prodId;
                    objs.tempFileId = item.tempFileId;
                    obj.contentList.push(objs);
                    if(index == num){
                        this.submitDataPost(obj) 
                    }
                })    
            },
        },
        beforeMount(){
            //通过aid判断当前页面：0为新增  
            this.aid = this.$route.params.aid;
            if(this.aid != 0 ){
                //获取修改的企业信息
                let params = {tempId:this.aid}
                this.$api.list.taskAddInfos(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){    
                        let that = this;                    
                        let arr = res.data.data.template.contentList;
                        this.form.contentList = [];
                        arr.forEach((item,index)=>{
                            let objs = {};
                            objs.valueTime = [];
                            objs.taskId = item.taskId;
                            objs.conCount = item.conCount;
                            objs.conPrice = item.conPrice;
                            objs.taRemark = item.conRemark;
                            objs.prodId = item.prodId;
                            objs.tempFileId = item.tempFileId;
                            if(item.tempFileId){
                                objs.showFile = true;
                                objs.tempFielName = item.fileName;
                                objs.tempFielUrl = item.fileUrl;
                            }else{
                                objs.showFile = false;
                                objs.tempFielName = '';
                                objs.tempFielUrl = '';
                            }
                            that.form.contentList.push(objs);
                        });
                        that.form.taName = "";
                        that.form.capitalId = "";
                        that.form.cityId = "";
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
            //获取所有省份
            this.$api.list.getCapital().then(res=> {
                if(res.data.status == 200){
                    this.capital = res.data.data.list;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
            //获取所有类型
            this.$api.list.typeSelect().then(res=> {
                if(res.data.status == 200 ){
                    this.typeArr = res.data.data.list;
                    let arr = res.data.data.list;
                    arr.forEach((item,i)=>{
                        this.typeObjs[item.taskId]= item.taskName;
                    })
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            });
            //获取submitToken
            this.$api.list.getToken().then(res=> {
                if(res.data.status == 200 ){
                    this.submitToken = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            });
            //关联产品
            this.$api.task.getDataproduct().then(res=> {
                if(res.data.status == 200){
                    this.prodArr = res.data.data;
                    let arr = res.data.data;
                    arr.forEach((item,i)=>{
                        this.prodObjs[item.prodId]= item.prodName;
                    })
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            });
            //上传地址
            this.url = base+"/upload/fileUpload";
            //获取token
            this.token = store.state.token;
            //获取token
            this.myHeaders.token = store.state.token;
            //获取下载地址
            this.$api.list.getDownUrl().then(res=> {
                console.log(res);
                if(res.data.status == 200){
                    this.downUrl = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
        }
    }
</script>

<style lang="scss">
.informationss{
  padding: 20px 20px;
}
.informationss-content{
    background: white;
}
// .information-form{
//     margin: 20px 0 0 30%;
// }
.information-form{
    padding-top: 30px
}
.information-form .el-input__inner{
    width: 350px;
    height: 35px;
    line-height: 35px
}
.information-submit{
    margin: 10px 200px
}
.information-form-col-row{
    width: 460px;
    overflow: hidden;
    margin: 0 auto
}
.informations{
    background: white
}
.cmat-center{
    margin-left: 40%;
}
.height50{
    height: 50px;
}
.task-content-table{
    padding: 20px 20px;
    font-size: 16px;
}
.task-content-tbody{
    background: #F4F7FDFF;
    padding: 10px 0;
    margin: 20px 0 0 0;
}
</style>