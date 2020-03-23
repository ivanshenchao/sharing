<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="name color-white font-size16 line-space2 padding-left10 margin-tops20"><p>{{msg}}</p></div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新 增</div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top5">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" prop="id" width="28"></el-table-column>
                        <el-table-column type="index" prop="index" width="50"></el-table-column>
                        <el-table-column prop="title" label="任务类型"></el-table-column>
                        <el-table-column label="创建时间" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.create_time | formatDate}}</template>
                        </el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope"><span v-show="scope.row.status == 1">显示</span><span v-show="scope.row.status == 0">隐藏</span></template>
                        </el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">修 改</span><span class="padding-left5 padding-right5">|</span>
                                <span @click="handleClickHidde(scope.row)" v-show="scope.row.status == 1" type="text" size="small" class="color-yellow cursor">隐 藏</span>
                                <span @click="handleClickShow(scope.row)" v-show="scope.row.status == 0" type="text" size="small" class="color-yellow cursor">显 示</span>
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="任务类型：">
                    <el-input v-model="form.title" placeholder="请输入任务类型名称" class="width300"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>


<script>
import { callbackify } from 'util';
    export default{

        data(){

            return{
                msg:'任务类型',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                dialogVisible: false,
                dialogTitle: '新增任务类型: ',
                form:{
                    title:'123',
                },
                decideDialog: 0,
                keyword:'',
                taskType:'',
                typeArr:[],
                typeObjs:{},
                deleteId:'',
                typeId:'',
                status:'',
                deleteIndex:'',
                exitId: ''
            }
        },
        filters: {
            formatDate: function (value) {
                value = 1000*value;
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
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
            //修改
            handleClickEdit(row) {
                this.decideDialog= 2;
                this.dialogTitle = '修改任务类型',
                this.dialogVisible = true;
                this.exitId = row.id;
                this.$api.list.typeInfo(row.id).then(res=> {
                    console.log(res);
                    if(res.data.code == 1){
                         this.form = res.data.data;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //删除回调
            callbackit(index){
                //获取用户信息
                this.$api.list.typeStatus(this.typeId,this.status).then(res=> {
                    if(res.data.code == 1){
                        this.$message.success(res.data.msg);
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //隐藏
            handleClickHidde(row) {
                this.typeId = row.id;
                this.status = 0;
                this.utils.open("隐藏","是否确认隐藏"+row.title,"warning",this.callbackit,"删除");
            },
            //显示
            handleClickShow(row) {
                this.typeId = row.id;
                this.status = 1;
                this.utils.open("显示","是否确认显示"+row.title,"warning",this.callbackit,"显示");
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
                let decide = this.decideDialog;
                let params = {
                            title :this.form.title,
                        };
                if(decide == 1){
                    this.$api.list.typePost(params).then(res=> {
                        if(res.data.code == 1){
                            this.$message.success(res.data.msg);
                            this.dialogVisible = false;
                            this.typeAction();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
                }else if(decide == 2){
                    let params = {
                            title :this.form.title,
                            id : this.exitId
                        };
                    this.$api.list.typePost(params).then(res=> {
                        console.log(res);
                        if(res.data.code == 1){
                            this.$message.success(res.data.msg);
                            this.dialogVisible = false;
                            this.typeAction();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
                }else if(decide == 3){
                    this.dialogVisible = false;
                }else{
                    this.dialogVisible = false;
                }    
            },
            // 任务类型列表加载方法
            typeAction(){
                let page = this.currentPage;
                this.$api.list.typeList(page).then(res=> {
                    console.log(res);
                    if(res.data.code == 1){
                        this.tableData = res.data.data.list;
                        this.total = res.data.data.count;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //新增
            add(){
                this.decideDialog = 1;
                this.form.title='';
                this.form.id= 0;
                this.dialogVisible = true;
            },
            addTem(){
                this.form.template_content.push({
                    task_type:"",
                    task_quantity:"",
                    unit_price:"",
                    requirement:""
                });
            },
            delTem(index){
                if(this.form.template_content.length<2){
                    this.$message.error("至少保留一条任务内容");
                    return false
                }
                this.form.template_content.splice(index,1);
            },
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