<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">任务审核</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-row type="flex" justify="end">
                            <el-col :span="4" class="margin-right10">
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
                        <el-table-column prop="conName" label="任务名称"></el-table-column>
                        <el-table-column prop="taskName" label="任务类型"></el-table-column>
                        <el-table-column prop="accName" label="执行人"></el-table-column>
                        <el-table-column prop="conPrice" label="任务单价"></el-table-column>
                        <el-table-column prop="conCount" label="任务数量"></el-table-column>
                        <el-table-column label="状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.state == 1">待提交</span>
                                <span v-show="scope.row.state == 2">待审核</span>
                                <span v-show="scope.row.state == 3">审核通过</span>
                                <span v-show="scope.row.state == 4">审核失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.state == 2">
                                    <span @click="handleClickSubmit(scope.row)" type="text" size="small" class="color-yellow cursor">审 核</span>
                                </span>
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
            <el-form ref="forms" :model="forms" label-width="120px" class="margin-right20" v-if="decideDialog == 1 || decideDialog == 2">
                <div style="margin-top: -20px">
                    <p>任务详情：</p>
                    <h3 class="text-center line-space2">{{forms.conName}}</h3>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务类型：">
                            {{forms.taskName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品名称：">
                            {{forms.prodName}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务单价：">
                            {{forms.conPrice}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务数量：">
                            {{forms.conCount}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始日期：">
                            {{forms.beginTime}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束日期：">
                            {{forms.endTime}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务要求：">
                            {{forms.taRemark}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="报告模板：">
                            <el-link class="text-center" target="_blank" :href="downUrl+forms.fileUrl" :underline="false">{{forms.fileName}}</el-link>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <div class="down">
                    <el-col :span="12">
                        <el-form-item label="文件下载：">
                            <p v-for="(item,index) in fileListInfo" :key="index">
                                <el-link target="_blank" :href="downUrl+item.fileUrl" :underline="false" style="margin-left:15px">{{item.fileName}}</el-link>
                            </p>
                        </el-form-item>     
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图片下载：">
                            <span v-for="(item,index) in fileImgesInfo" :key="index">
                                <el-link target="_blank" :href="downUrl+item.fileUrl" :underline="false" style="margin-left:15px"><img :src="downUrl+item.fileUrl" class="downImages" alt=""></el-link>
                            </span>
                        </el-form-item>  
                    </el-col>
                </div>
                <div class="audit margin-top20 text-center" v-if="decideDialog == 1">
                    <el-radio v-model="radio" label="3">通过</el-radio>
                    <el-radio v-model="radio" label="4">不通过</el-radio>
                    <br>
                    <el-input class="margin-top20" style="width: 400px" type="textarea" :rows="2" placeholder="请输入不通过原因" v-model="textarea" v-show="radio == 4"></el-input>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">
                    <span v-show="decideDialog==1">审 核</span>
                    <span v-show="decideDialog==2">确 定</span>
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
                msg:'任务审核',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                task_type:'',
                currentPage: 1,
                dialogVisible: false,
                diaWidth: '450px',
                dialogTitle: '',
                forms:{},
                fileList:[],
                url:'',
                downUrl:'',
                stepDescription:'',
                stepName:'',
                decideDialog: 0,
                keyword:'',
                status:'',
                id:'',
                taskType:'',
                typeArr:[],
                typeObjs:{},
                task_my:[],
                statusArr:[],
                statusObj:{},
                statusObjs:{},
                addressValue:[],
                addressOptions:[],
                templateId:'',
                templateArr:[],
                agentArr:[],
                deleteId:'',
                deleteIndex:'',
                exitId: '',
                statusStart:0,
                statusEnd:0,
                statusAgent: 0,
                file_path:'',
                file_name:'',
                task_id:'',
                textarea:'',
                radio: '3',
                fileListInfo:[],
                fileImgesInfo:[],
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
                return y + '-' + MM + '-' + d;
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
            //地址选择
            handleChange(value) {
                
                this.taskAction();
            },
            //审核
            handleClickSubmit(row){
                this.radio = '3';
                this.file_path='';
                this.file_name='';
                this.textarea = '';
                let params = {disId:row.disId}
                this.$api.list.auditTaskInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.diaWidth = '900px';
                        this.dialogTitle = '审核：';
                        this.decideDialog = 1;
                        let data = res.data.data;
                        this.forms = data.info; 
                        this.fileListInfo = data.info.fileList;
                        this.fileImgesInfo = data.info.imageList;
                        this.id = data.id;
                        this.task_id = data.info.disId;
                        this.dialogVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //查看
            handleClickInfo(row) {
                this.file_path='';
                this.file_name='';
               let params = {disId:row.disId}
                this.$api.list.auditTaskInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.diaWidth = '900px';
                        this.dialogTitle = '查看：';
                        this.decideDialog = 2;
                        let data = res.data.data;
                        this.forms = data.info; 
                        this.fileListInfo = data.info.fileList;
                        this.fileImgesInfo = data.info.imageList;
                        this.dialogVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //撤回回调
            callbackitRecall(id,index){
                //获取用户信息
                this.$api.list.taskDelete(this.deleteId).then(res=> {
                    if(res.data.code == 1){
                        this.$message.success(res.data.msg);
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
                let decide = this.decideDialog;
                if(decide == 1){
                     this.savePost();
                }else{  
                    this.dialogVisible = false;      
                }   
            },
            //资料提交
            submitUpload() {
                this.$refs.upload.submit();
            },
            responseAction(response){
                console.log(response);
                this.file_path = response.data.id;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            //数据提交
            savePost(){
                let thef = this;
                if(thef.radio == 4 && !thef.textarea){
                    thef.$message.error('请先输入不通过原因');
                    return false
                }
                let params = {
                    disId: thef.task_id,
                    state: thef.radio,
                    reason: thef.textarea
                };
                thef.$api.list.audiTaskPost(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.$message.success('操作成功！');
                        this.dialogVisible = false;
                        this.taskAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //发布
            saveBtn(){
                if(this.decideDialog == 2){
                    this.savePost(0,1);
                }else if(this.decideDialog == 3){
                    this.savePost(this.exitId,1); 
                }
            },
            // 任务列表加载方法
            taskAction(){
                let params = {};
                params.state = 2;
                params.keyWord = this.keyword;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.auditTaskList(params).then(res=> {
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
            //修改代理商判断
            selectAgent(){
                this.statusAgent = 1;
            },
            //修改时间判断
            selectStart(){
                this.statusStart = 1;
            },
            selectEnd(){
                this.statusEnd = 1;
            },
            //搜索
            search(){
                this.currentPage = 1;
                this.taskAction();
            },
            //下拉选择
            select(){
                this.currentPage = 1;
                this.taskAction();
            }
        },
        beforeMount(){
            // 任务加载
            this.taskAction();
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
        mounted(){
            console.log(base);
        }

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
.submit{
    margin: 20px 50px;
    text-align: center
}
.downImages{
    width: 100px;
    height: 120px;
    border: 2px solid #ffffff
}
.downImages:hover{
    border: 2px solid #409EFF
}
</style>