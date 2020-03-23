<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>客服服务</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">合同管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-row type="flex" justify="end">
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入合同名称、需求方"></el-input>
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
                        <el-table-column prop="conName" label="合同名称"></el-table-column>
                        <el-table-column prop="agConect" label="需求方"></el-table-column>
                        <el-table-column prop="firstPart" label="提供方"></el-table-column>
                        <el-table-column label="签署状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="scope.row.conState == 1">甲方发起</span>
                                <span v-if="scope.row.conState == 2">甲方签署</span>
                                <span v-if="scope.row.conState == 3">已查看</span>
                                <span v-if="scope.row.conState == 4">已签署</span>
                                <span v-if="scope.row.conState == 5">合同生效</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="签署时间"></el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span><span class="padding-left5 padding-right5">|</span>
                                <el-link target="_blank" :href="scope.row.templateUrl" :underline="false"><span class="color-yellow cursor">下 载</span></el-link>
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
        <!-- 查看费率 -->
        <el-dialog title="合同信息：" :visible.sync="dialogInfoVisible" width="900px" :before-close="handleClose">
            <el-row>
                <el-col :span="6">
                    <p>甲方：{{forms.firstPart}}</p>
                    <p>乙方：{{forms.agConect}}</p>
                    <p>发起时间：{{forms.createTime}}</p>
                    <p>合同状态：
                        <span v-if="forms.conState == 1">甲方发起</span>
                            <span v-if="forms.conState == 2">甲方签署</span>
                            <span v-if="forms.conState == 3">已查看</span>
                            <span v-if="forms.conState == 4">已签署</span>
                            <span v-if="forms.conState == 5">合同生效</span>
                    </p>
                </el-col>
                <el-col :span="18" class="margin-top30 padding-left20">
                    <el-col :span="5">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 1}"></span> 
                           <span class="dialog-line">
                               <div class="dialog-line-block"></div>
                           </span>
                        </div>
                        <p class="dialog-title">{{forms.firstPart}}发起</p>  
                    </el-col>
                    <el-col :span="5">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 2}"></span> 
                           <span class="dialog-line">
                               <div class="dialog-line-block"></div>
                           </span>
                        </div>
                        <p class="dialog-title">{{forms.firstPart}}签署</p>  
                    </el-col>
                    <el-col :span="5">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 3}"></span> 
                           <span class="dialog-line">
                               <div class="dialog-line-block"></div>
                           </span>
                        </div>
                        <p class="dialog-title">{{forms.agConect}}查看</p>  
                    </el-col>
                    <el-col :span="5">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 4}"></span> 
                           <span class="dialog-line">
                               <div class="dialog-line-block"></div>
                           </span>
                        </div>
                        <p class="dialog-title">{{forms.agConect}}签署</p>  
                    </el-col>
                    <el-col :span="3">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 5}"></span> 
                        </div>
                        <p class="dialog-title">合同生效</p>  
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <h3 class="text-center line-space1">平台服务条款</h3>
                    <iframe :src="forms.templateUrl" frameborder="0" width="100%" style="height: 26rem"></iframe>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleInfoBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeInfoTrue">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>


<script>
import { callbackify } from 'util';
    export default{

        data(){

            return{
                msg:'客服服务--合同管理',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                capital:[],
                dialogVisible: false,
                dialogEditVisible: false,
                dialogInfoVisible: false,
                form:{
                    comId:'',
                    comRate:''
                },
                forms:{
                    comRate:1
                },
                decideDialog: 0,
                keyWord:'',
                deleteId:'',
                typeId:'',
                status:'',
                deleteIndex:'',
                exitId: '',
                downUrl:'',
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
                this.typeAction();
                console.log(`当前页: ${val}`);
            },
            handleClickInfo(row){
                this.dialogInfoVisible = true;
                let params = {conId : row.conId}
                this.$api.list.getContractInfo(params).then(res=> {
                    if(res.data.status == 200){
                        this.forms = res.data.data.contract;
                        this.dialogInfoVisible = true;
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
            cancleInfoBtn(){
                this.dialogInfoVisible = false;
            },
            //新增、修改、查看弹窗确定按钮
            changeInfoTrue(){
                this.dialogInfoVisible = false;
            },
            // 任务类型列表加载方法
            typeAction(){
                let params = {};
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getContractList(params).then(res=> {
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
            //搜索
            search(){
                this.currentPage = 1;
                this.typeAction();
            },
                
        },
        components:{},
        beforeMount(){
            // 任务类型加载
            this.typeAction();
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
.el-dialog__body{
    padding: 0 30px !important;
}
.dialog-status{
    height: 20px;
}
.dialog-circle{
    margin: 0;
    padding: 5px 15px;
    background-color: #999;
    border-radius: 50%;
}
.dialog-line-block{
    margin-top: -10px;
    margin-left: 40px;
    margin-right: 10px;
    padding: 1px 20px;
    border-top: 2px solid #999;
}
.dialog-title{
    width: 90px;
}
.dialog-status .active{
    background-color: blue;
}
.el-link.el-link--default{
    color: white;
}
</style>