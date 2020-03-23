<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="../index">首页</el-breadcrumb-item>
                <el-breadcrumb-item to="../Management">任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">确认任务</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row style="padding: 20px 30px">
            <el-col class="admin-table">
                <el-row class="allocation-row">
                    <el-col class="allocation-items">
                        <div class="allocation-item allocation-details">
                            <div class="allocation-title">任务详情：</div>
                            <p class="allocation-title-item" style="margin-top:-20px">药企名称：{{company_name}}</p>
                            <p class="allocation-title-item">任务名称：{{taName}}</p>
                            <p class="allocation-title-item">任务地区：{{province_label}}{{city_label}}</p>
                            <p class="allocation-title-item">开始日期：{{start_date}}</p>
                            <p class="allocation-title-item">结束日期：{{end_time}}</p>
                        </div>
                        <div class="allocation-item allocation-limit">
                            <div class="allocation-title">任务额度：</div>
                            <p class="text-center font-weight color-blue" style="font-size:40px;margin-top:0">{{totalPrice}}</p>
                        </div>
                    </el-col>
                     <el-col class="allocation-item allocation-content">
                         <div class="allocation-title">任务内容：</div>
                         <div class="allocation-content-div-table">
                             <table class="color-black font-size14 text-center allocation-content-table">
                                 <thead>
                                     <tr>
                                         <th>任务类型</th>
                                         <th>任务数量</th>
                                         <th>任务单价</th>
                                         <th>任务要求</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     <tr v-for="(item,index) in contents" :key="index">
                                         <td>{{item.taskName}}</td>
                                         <td>{{item.conCount}}</td>
                                         <td>{{item.conPrice}}</td>
                                         <td class="ellipsis">{{item.taRemark}}</td>
                                     </tr>
                                 </tbody>
                             </table>
                         </div>
                         <el-col :span="24" class="text-center">
                            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row class="allocation-width">
                    <el-col class="allocation-item" id="allocation">
                        <div class="allocation-title">任务分配：</div>
                        <div class="allocation-table">
                            <el-row class="margin-right20" style="margin-top: -10px">
                                <el-col :span="20" class="padding-left20">
                                    <el-radio-group v-model="status" :tab-click="select()">
                                        <el-radio-button v-for="(item,key) in ideaList" :key="key" :label="key"><span>推荐方案{{key+1}}</span></el-radio-button>
                                    </el-radio-group>
                                </el-col>
                                <el-col :span="4" class="text-right padding-right10">
                                    <div class="el-button-copy" @click="submit">确认分配</div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="allocation-div-table"> 
                             <table class="color-black font-size14 text-center allocation-content-table">
                                 <thead>
                                     <tr>
                                         <th>姓名</th>
                                         <th v-for="(item,index) in task_content" :key="index">{{item.title}}({{item.count}})</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     <tr v-for="(item,index) in userContents" :key="index">
                                         <td>{{item.accName}}</td>
                                         <td v-for="(items,indexs) in item.countList" :key="indexs">
                                         <span>{{items.count}}</span>
                                         </td>
                                     </tr>
                                 </tbody>
                             </table>
                             
                         </div>
                         
                         <el-col :span="24" class="text-center margin-top10">
                            <el-pagination @current-change="handleCurrentChanges" :current-page="currentPages" :page-size="pageSizes" layout="total, prev, pager, next" :total="totals"></el-pagination>
                        </el-col>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>


<script>
import Vue from 'vue' 
import { callbackify } from 'util';
    export default{

        data(){

            return{
                msg:'任务分配',
                allocations:{},
                value: 0,
                total: 0,
                pageSize: 5,
                currentPage: 1,
                totals: 0,
                pageSizes: 5,
                currentPages: 1,
                keyword:'',
                typeObj:'',
                company_name:'',
                taName:'',
                company:'',
                task_id:'',
                task_name:'',
                agent:'',
                start_date:'',
                end_time:'',
                province_id:'',
                city_id:'',
                province_label:'',
                city_label:'',
                task_content:[],
                task_contents:[],
                contents:[],
                allocation_content:[],
                allocationTotal:[],
                user:[],
                users:[],
                user_content:[],
                userContents:[],
                sum_price:0,
                totalPrice:'',
                submitToken:'',
                status: 0,
                ideaList:[],
            }
        },
        methods:{
            back(){
                this.$router.push({
                    path: '/TaskDist'
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.contents = this.task_contents[val-1];
                console.log(`当前页: ${val}`);
            },
            handleCurrentChanges(val) {
                this.currentPages = val;
                this.userContents = this.users[val-1];
                console.log(`当前页: ${val}`);
            },
            //获取分配信息
            getAllocation(params){
                this.$api.list.taskAddInfo(params).then(res=> {
                    if(res.data.status == 200){
                        let allocation = res.data.data;
                        this.allocations = allocation;
                        let task = res.data.data.task;
                        this.company_name = task.comName;
                        this.taName = task.taName;
                        this.province_label =task.capitalName;
                        this.city_label =task.ctiyName;
                        this.start_date = task.beginTime;
                        this.end_time =task.endTime;
                        this.totalPrice = task.totalPrice;
                        this.ideaList = allocation.ideaList;
                        this.task_contents = this.sliceContent(task.contentList);
                        this.task_id = task.taId;
                        this.total = task.contentList.length;
                        this.contents = this.task_contents[0];
                        let pams = {
                            taId: allocation.ideaList[0].taId,
                            agId: allocation.ideaList[0].agId
                        }
                        this.$api.list.getInfoByTaIdAndAgId(pams).then(res=> {
                            if(res.data.status == 200){
                                let data = res.data.data;
                                this.task_content = data.titleList;
                                this.user = data.dateList;
                                this.users = this.sliceContent(this.user);
                                this.userContents = this.users[0];
                                this.totals = this.user.length;
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
                });
            },
            //任务内容分页
            sliceContent(data){
                let arr =[]
                for (var i = 0; i < data.length; i += 5) {
                    arr.push(data.slice(i, i + 5));
                }
                return arr
            },
            //选择任务
            select(){
                //console.log(this.status);
            },
            //确认任务
            submit(){
                let thef = this;
                let params = {taId: thef.ideaList[0].taId};
                this.$api.list.taskAffSavePost(params).then(res=> {      
                    if(res.data.status == 200){
                        this.$message.success('操作成功');
                        this.$router.push({
                            path:'/Management'
                        })
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
        components:{},
        mounted(){
        },
        beforeMount(){
            let params = {taId : this.$route.params.aid};
            this.getAllocation(params);
            //获取submitToken
            this.$api.list.getToken().then(res=> {
                    if(res.data.status == 200){
                        this.submitToken = res.data.data;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
        }

    }
</script>

<style lang="scss" scoped>
.allocation-row{
    margin-bottom: 1%;
}
.allocation-items{
    float: left;
    width: 34%;
}
.allocation-content{
    margin-left: 1%;
    width: 65%;
    height: 340px;
}
.allocation-item{
    background: #ffffff;
    border-radius: 10px
}
.allocation-details,.allocation-limit{
    height: 165px;
}
.allocation-limit{
    margin-top: 10px;
}
#allocation{
    height: 420px;
}
.allocation-title{
    color: #213b4e;
    font-size: 15px;
    font-weight: bold;
    padding: 20px;
    letter-spacing: 2px
}
.block{
    margin-left: 30px;
    margin-right: 20px
}
.allocation-title-item{
    color: #213b4e;
    font-size: 14px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    margin: 0 40px;
    padding: 0;
    line-height: 25px
}
.allocation-content-div-table{
    height: 220px;
}
.allocation-content-table{
    width: 100%;
    padding: 0 30px;
}
.allocation-content-div-table table{
    table-layout: fixed;
}
.allocation-content-table thead tr th{
    background: rgba(244,247,253,1);
    line-height: 30px;
    letter-spacing: 2px
}
.allocation-content-table tbody tr td{
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}
.allocation-div-table{
    margin-top: 10px;
    height: 260px;
    width: 100%;
    overflow: hidden;
    overflow-x: auto
}
.allocation-div-table thead tr th{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}
input {
    // background: #353C48;
    // color: #213b4e;
    // border: none;
    line-height: 20px;
    text-align: center;
    width: 60px;
    // border-bottom: 1px solid #FF9300;
}
.el-buttons-copys{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #213b4e;
    background-color: rgba(244,247,253,1);
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;   
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
}
.el-buttons-copys:hover{
    background: rgb(229, 232, 238);
}
.el-buttons-copys:active{
    background: rgb(206, 209, 214);
}
.ellipsis{
    overflow:hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
}
</style>