<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">开票记录</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-row type="flex" justify="end">
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入收件人、联系方式"></el-input>
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
                        <el-table-column prop="invoInvoice" label="发票抬头"></el-table-column>
                        <el-table-column prop="invoMoney" label="发票金额"></el-table-column>
                        <el-table-column prop="comGetUser" label="收件人"></el-table-column>
                        <el-table-column prop="comGetAddress" label="收件地址"></el-table-column>
                        <el-table-column prop="comGetPhone" label="联系方式"></el-table-column>
                        <el-table-column label="状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="scope.row.state == 1">待开票</span>
                                <span v-if="scope.row.state == 2">待邮寄</span>
                                <span v-if="scope.row.state == 3">待接收</span>
                                <span v-if="scope.row.state == 4">已完成</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
                        <el-table-column label="操作" width="100" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.state == 1" @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">开 票</span>
                                <span v-show="scope.row.state == 2" @click="handleClickDelete(scope.row)" type="text" size="small" class="color-yellow cursor">邮 寄</span>
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
        <!-- 修改模板 -->
        <el-dialog title="修改类型：" :visible.sync="dialogEditVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="form" label-width="120px">
                <el-form-item label="分类名称：">
                    <el-input v-model="forms.typeName" placeholder="请输入类型名称" class="width300"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleEditBtn('您已取消修改')">取 消</el-button>
                <el-button type="primary" @click="changeEditTrue">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>


<script>
import { callbackify } from 'util';
    export default{

        data(){

            return{
                msg:'系统管理--开票记录',
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
                    typeName:''
                },
                forms:{
                    typeName:''
                },
                decideDialog: 0,
                keyWord:'',
                deleteId:'',
                typeId:'',
                status:'',
                deleteIndex:'',
                exitId: '',
                currState:''
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
            //开票回调
            callbackits(index){
                let params ={
                    invoId : this.typeId,
                    state : 2,
                    currState : this.currState
                    }
                this.$api.list.makeIneRec(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('开票成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //开票
            handleClickEdit(row) {
                this.typeId = row.invoId;
                this.currState = row.state;
                this.utils.open("开票","是否确认开票"+row.invoInvoice,"warning",this.callbackits,"开票");
            },
            //邮寄回调
            callbackit(index){
                let params ={
                    invoId : this.typeId,
                    state : 4,
                    currState : this.currState
                    }
                this.$api.list.makeIneRec(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('邮寄成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //邮寄
            handleClickDelete(row) {
                this.typeId = row.invoId;
                this.currState = row.state;
                this.utils.open("邮寄","是否确认邮寄"+row.invoInvoice,"warning",this.callbackit,"邮寄");
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
            cancleEditBtn(){
                this.dialogEditVisible = false;
            },
            //新增、修改、查看弹窗确定按钮
            changeTrue(){
                this.getNewToken(this.addBack);
            },
            changeEditTrue(){
                this.getNewToken(this.editBack);
            },
            // 任务类型列表加载方法
            typeAction(){
                let params = {};
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getIneRecList(params).then(res=> {
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
            //新增
            add(){
                this.dialogVisible = true;
            },
            //搜索
            search(){
                this.currentPage = 1;
                this.typeAction();
            },
            //获取重复提交token，用户提交表单验证重复性
            getNewToken(callback){
                this.$api.list.getToken().then(res=> {
                    if(res.data.status == 200){
                        callback(res.data.data);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
                
        },
        components:{},
        beforeMount(){
            // 任务类型加载
            this.typeAction();   
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
</style>