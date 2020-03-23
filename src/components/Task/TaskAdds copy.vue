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
                            <el-col :span="5" class="task-content-td text-center">任务类型</el-col>
                            <el-col :span="2" class="task-content-td text-center">任务数量</el-col>
                            <el-col :span="2" class="task-content-td text-center">任务单价</el-col>
                            <el-col :span="3" class="task-content-td text-center">任务总额</el-col>
                            <el-col :span="5" class="task-content-td text-center">开始日期</el-col>
                            <el-col :span="5" class="task-content-td text-center">结束日期</el-col>
                            <el-col :span="2" class="task-content-td text-center">操作</el-col>
                        </el-col>
                        <el-col :span="24" class="task-content-tbody" v-for="(item,index) in form.contentList" :key='index'>
                            <el-col :span="5" class="task-content-td text-center padding10">
                                <el-select v-model="item.taskId" placeholder="请选择" class="width150">
                                    <el-option v-for="(items,indexs) in typeArr" :key="indexs" :label="items.taskName" :value="items.taskId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2" class="task-content-td text-center padding10"><el-input v-model="item.conCount" placeholder="任务数量"></el-input></el-col>
                            <el-col :span="2" class="task-content-td text-center padding10"><el-input v-model="item.conPrice" placeholder="任务单价"></el-input></el-col>
                            <el-col :span="3" class="task-content-td text-center padding10"><el-input :value="item.conCount*item.conPrice" placeholder="任务单价" disabled=""></el-input></el-col>
                            <el-col :span="5" class="task-content-td text-center padding10"><el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false" :editable='false' v-model="item.beginTime" placeholder="开始日期"></el-date-picker></el-col>
                            <el-col :span="5" class="task-content-td text-center padding10"><el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false" :editable='false' v-model="item.endTime" placeholder="结束日期"></el-date-picker></el-col>
                            <el-col :span="2" class="task-content-td text-center margin-top30 color-red"><span class="cursor" @click="delTem(index)">删除</span></el-col>
                            <el-col :span="22" class="task-content-td text-center padding-left20 margin-top10 margin-bottom10"><el-input type="textarea" maxlength="500" :rows="1" v-model="item.taRemark" placeholder="请输入该任务类型的要求" show-word-limit></el-input></el-col>
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
    export default{
        data(){
            return{
                msg:'行业资讯--内容管理--新增文章',
                form: {
                    taName:'', //任务名称
                    capitalId:'', //省份ID
                    cityId:'', //城市ID 
                    contentList:[
                        {
                           taskId:'', 
                           conCount:0, 
                           conPrice:0, 
                           beginTime:'', 
                           endTime:'', 
                           taRemark:''
                        }
                    ]                   
                },
                capital: [], //省份数组
                city: [], //城市数组
                typeArr: [],//类型数组
                aid:'',
                submitToken:''
            }
        },
        methods:{
            back(){
                this.$router.push({path:'/Management'})
            },
             addTem(){
                let num = this.form.contentList.length - 1;
                this.form.contentList.push({
                    taskId:'', 
                    conCount:0, 
                    conPrice:0, 
                    beginTime: this.form.contentList[num].beginTime, 
                    endTime: this.form.contentList[num].endTime, 
                    taRemark:''
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
                this.cityId = '';
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
            save(){
                if(this.aid == 0){
                    this.form.state = 1;
                    this.form.submitToken = this.submitToken;
                    this.$api.task.taskPost(this.form).then(res=> {
                            if(res.data.status == 200){
                                this.$message.success('新增成功');
                                this.back();
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        }).catch(error=>{
                            console.log(error);
                        })
                }else{
                    this.form.state = 1;
                    this.form.submitToken = this.submitToken;
                    console.log(this.form);
                    return false;
                    this.$api.task.taskPost(this.form).then(res=> {
                            if(res.data.status == 200){
                                this.$message.success('新增成功');
                                this.back();
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        }).catch(error=>{
                            console.log(error);
                        })
                }
            },
            submit(){
                if(this.aid == 0){
                    this.form.state = 2;
                    this.form.submitToken = this.submitToken;
                    this.$api.task.taskPost(this.form).then(res=> {
                            if(res.data.status == 200){
                                this.$message.success('发布成功');
                                this.back();
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        }).catch(error=>{
                            console.log(error);
                        })
                }else{
                    this.form.state = 2;
                    this.form.submitToken = this.submitToken;
                    this.$api.task.taskPost(this.form).then(res=> {
                            if(res.data.status == 200){
                                this.$message.success('发布成功');
                                this.back();
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        }).catch(error=>{
                            console.log(error);
                        })
                }
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
                        this.form = res.data.data.template;
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