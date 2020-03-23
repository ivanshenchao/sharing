<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb" style="margin: -30px 0 20px 0;">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>财务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">财务管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="top_area_finance text-center">
            <h3 class="padding-top10 color-white">账户余额</h3>
            <h3 class="padding-top10 color-red margin-tops20"><i class="el-icon-bank-card" style="font-size: 28px;margin-right: 10px;font-weight: 700"></i>{{balance}}</h3>
            <p class="padding-top10 color-white font-size16 line-space2 cursor"><span @click="recharge">充值</span> | <span @click="record">充值记录</span></p>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-row type="flex" justify="end">
                            <el-col :span="5" class="margin-right10">
                                <el-input v-model="keyword" placeholder="请输入任务名称"></el-input>
                            </el-col>
                            <el-col style="width: 100px" class="text-right">
                                <div class="el-button-copy" @click="search"><i class="el-icon-search"></i> 搜索</div>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top5">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" prop="id" width="28"></el-table-column>
                        <el-table-column type="index" prop="index" width="50"></el-table-column>
                        <el-table-column prop="taName" label="任务名称"></el-table-column>
                        <el-table-column prop="conCount" label="任务总量"></el-table-column>
                        <el-table-column prop="conTotalPrice" label="任务总价"></el-table-column>
                        <el-table-column label="状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.taState == 7">待打款</span>
                                <span v-show="scope.row.taState == 8">已完成</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="180" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.taState == 7" @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">待打款</span><span v-show="scope.row.taState == 7" class="padding-left5 padding-right5">|</span>
                                <span @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor text-right">查 看</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-col :span="24" class="pagination padding-left20 padding-right20 margin-top20 text-right">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]"
                    :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </el-col>
        </section>
        <!-- 新增任务模板 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :width="diaWidth" :before-close="handleClose">
            <el-form ref="forms" :model="forms" label-width="120px" class="margin-right20" v-if="decideDialog == 4">
                <table class="taskTable margin-left20 text-center" style="width : 95%;">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>打款金额</th>
                            <th>身份证号</th>
                            <th>银行卡号</th>
                            <th>开户行</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list" :key="index">
                            <td>{{item.accName}}</td>
                            <td>{{item.conTotalPrice}}</td>
                            <td>{{item.idCard}}</td>
                            <td>{{item.bankCard}}</td>
                            <td>{{item.bankName}}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <el-pagination @size-change="handleSizeChanges" @current-change="handleCurrentChanges" :current-page="currentPages" :page-sizes="[10]"
                        :page-size="pageSizes" layout="total, prev, pager, next, jumper" :total="totals" class="text-center margin-top20"></el-pagination>
                </div>
                
            </el-form>
            <div class="margin-right20" v-if="decideDialog == 1">
                <div class="recharge">
                    <div class="recharge-item" style="margin-top: -20px">
                        <div class="recharge-div-item">
                            <p>汇款信息</p>
                        </div>
                    </div>
                    <div class="recharge-item" style="height: 240px">
                        <el-row :span="24" class="recharge-div-item">
                            <el-col :span="6">
                                <p class="recharge-item-lable">预期付款账户：</p>
                            </el-col>
                            <el-col :span="16">
                                <p class="recharge-item-title">{{company_name}}</p>
                            </el-col>
                        </el-row>
                        <div :span="24" class="recharge-div-item">
                            <el-col :span="6">
                                <p class="recharge-item-lable">账户名称：</p>
                            </el-col>
                            <el-col :span="16">
                                <p class="recharge-item-title">{{account}}</p>
                            </el-col>
                        </div>
                        <div :span="24" class="recharge-div-item">
                            <el-col :span="6">
                                <p class="recharge-item-lable">开户银行：</p>
                            </el-col>
                            <el-col :span="16">
                                <p class="recharge-item-title">{{bank_of_deposit}}</p>
                            </el-col>
                        </div>
                        <div :span="24" class="recharge-div-item">
                            <el-col :span="6">
                                <p class="recharge-item-lable">专属账户：</p>
                            </el-col>
                            <el-col :span="16">
                                <p class="recharge-item-title">{{exclusive_account}}</p>
                            </el-col>
                        </div>
                        <div :span="24" class="recharge-div-item">
                            <el-col :span="6">
                                <p class="recharge-item-lable">联系我们：</p>
                            </el-col>
                            <el-col :span="16">
                                <p class="recharge-item-title">{{contact_us}}</p>
                            </el-col>
                        </div>
                        <div :span="24" class="recharge-div-item">
                            <el-col :span="6">
                                <p class="recharge-item-lable">用途：</p>
                            </el-col>
                            <el-col :span="17">
                                <p class="recharge-item-title">{{purpose}}</p>
                            </el-col>
                        </div>
                    </div>
                    <div :span="24" class="recharge-div-item margin-bottom20">
                            <el-col :span="6">
                                <p class="recharge-item-lable">温馨提示</p>
                            </el-col>
                            <el-col :span="17">
                                <p class="recharge-item-lable">{{reminder}}</p>
                            </el-col>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">
                    <span v-show="decideDialog == 4">确 定</span>
                    <span v-show="decideDialog == 1">知道了</span>
                </el-button>
            </span>
        </el-dialog>
    </div>

</template>


<script>
import { callbackify } from 'util';
import base from '../../request/base';
    export default{

        data(){

            return{
                msg:'财务管理',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                dialogVisible: false,
                diaWidth: '450px',
                dialogTitle: '',
                form:{},
                forms:{},
                stepDescription:'',
                stepName:'',
                decideDialog: 0,
                keyword:'',
                status:-1,
                pid:'',
                cid:'',
                taskType:'',
                typeArr:[],
                typeObjs:{},
                statusArr:[],
                statusObj:{},
                statusObjs:{},
                addressValue:[],
                addressOptions:[],
                task_my:[],
                templateId:'',
                templateArr:[],
                agentArr:[],
                deleteId:'',
                deleteIndex:'',
                exitId: '',
                statusStart:0,
                statusEnd:0,
                statusAgent: 0,
                radio: '6',
                textarea: '',
                downUrl:'',
                file_name:'',
                file_path:'',
                id:'',
                downStatus: 0,
                remitId:'',
                balance:'',
                company_name:'',
                account:'',
                bank_of_deposit:'',
                exclusive_account:'',
                contact_us:'',
                purpose:'',
                reminder:'',
                totals: 0,
                pageSizes: 10,
                currentPages: 1,
                list:[],
                taId:''
            }
        },
        methods:{
            //勾选
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.taskAction();
                console.log(`当前页: ${val}`);
            },
            handleSizeChanges(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChanges(val) {
                this.currentPages = val;
                this.taskActions();
                console.log(`当前页: ${val}`);
            },
            //待打款
            remit(){
                let params = this.remitId;
                // this.$api.list.financePost(params).then(res=> {
                //     console.log(res);
                //     if(res.data.code == 1){
                //         this.$message.success(res.data.msg);
                //         this.taskAction();
                //     }else{
                //         this.$message.error(res.data.msg);
                //     }
                // }).catch(error=>{
                //     console.log(error);
                // })
            },
            handleClickEdit(row){
                this.remitId = row.taId;
                this.utils.open("打款","亲！系统升级当中，暂不支持线上打款，请您联系我们，我们将为您线下打款,联系方式：18408234176","warning",this.remit,"打款");
            },
            //充值
            recharge(){
                this.account = '重庆医盟友科技有限公司';
                this.bank_of_deposit = '招商银行股份有限公司重庆南岸支行';
                this.exclusive_account = '123911858110301';
                this.contact_us = '17384096641';
                this.purpose = '银行卡通道充值 汇款时请务必填写以上用途，以便充值到您期望的通道。';
                this.reminder = '请线下汇款，汇款时间在 工作日 9:00~16:30 之间预计2小时内到账，其它时间汇款预计下个工作日内到账，请注意查收到账短信或邮件。';
                this.decideDialog = 1;
                this.dialogVisible= true;
                this.diaWidth = '740px';
                this.dialogTitle = '充值：';
                
            },
            //充值记录
            record(){
                this.$router.push({
                    path : './Recharge'
                })
            },
            //查看
            handleClickInfo(row) {
                this.taId = row.taId;
                this.diaWidth = '740px';
                this.dialogTitle = '查看：';
                this.decideDialog = 4;
                this.dialogVisible = true;
                this.taskActions();
            },
            //删除回调
            callbackit(id,index){
                //获取用户信息
                this.$api.list.taskDelete(this.deleteId).then(res=> {
                    if(res.data.code == 1){
                        this.$message.success(res.data.msg);
                        this.tableData.splice(this.deleteIndex,1);
                        this.total = this.total - 1;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
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
            //新增、修改、查看弹窗确定按钮
            changeTrue(){
                 this.dialogVisible = false;    
            },
            //数据提交 保存 发布
            savePost(numA,numB){
                return false
            },
            //发布
            saveBtn(){
                if(this.decideDialog == 2){
                    this.savePost(0,1);
                }else if(this.decideDialog == 3){
                    this.savePost(this.exitId,1); 
                }
            },
            // 任务模板列表加载方法
            taskAction(){
                let params = {};
                params.keyword = this.keyword;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.financeList(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.tableData = res.data.data.list;
                        this.total = res.data.data.total;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            // 打款详细信息方法
            taskActions(){
                let params = {
                    taId : this.taId,
                    keyWord : '',
                    pageSize : 100,
                    pageNo : this.currentPages
                };
                this.$api.list.financeInfo(params).then(res=> {
                    if(res.data.status == 200){
                        let data = res.data.data;
                        this.list = data.list;
                        this.totals = data.total;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //搜索
            search(){
                this.currentPage = 1;
                this.taskAction();
            },
        },
        beforeMount(){
            // 任务加载
            this.taskAction();
            this.$api.list.financeBalance().then(res=> {
                if(res.data.status == 200){
                    this.balance = res.data.data.balance;
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            this.$api.list.user().then(res=> {
                if(res.data.status == 200){
                    this.company_name = res.data.data.userInfo.comName;
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
        },
        mounted(){}

    }
</script>

<style lang="scss">
 .el-input__inner{
    height: 35px;
    line-height: 35px
}
.taskTable{
    margin-top: -15px
}
.taskTable th,.taskTable td{
        padding: 5px
}
.top_area_finance{
    width: 100%;
    height: 150px;
    background-image: url("../../assets/images/management.png");
    background-size: cover;
    margin: 30px 0 0 0;
    padding-top:10px
}
.recharge-item{
    width: 100%;
    border-bottom: 1px solid #999999
}
// .recharge-div-item{
//     line-height: 20px;
//     height: 30px;
//     width: 100%;
// }
.recharge-item-lable{
    text-align: right;
}
.recharge-item-title{
    margin-left: 20px;
}
</style>