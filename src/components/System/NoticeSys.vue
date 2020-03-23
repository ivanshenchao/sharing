<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">通知公告</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新增通知</div>
                        </el-col>
                        <el-row type="flex" justify="end">
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入标题"></el-input>
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
                        <el-table-column prop="notTitle" label="标题"></el-table-column>
                        <el-table-column prop="notContent" label="内容"></el-table-column>
                        <el-table-column prop="notOpt" label="发布人"></el-table-column>
                        <el-table-column prop="publishTime" label="发布时间"></el-table-column>
                        <el-table-column label="操作" width="200" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.notState == 1" @click="handleClickSubmit(scope.row)" type="text" size="small" class="color-yellow cursor">发 布</span><span v-show="scope.row.notState == 1" class="padding-left5 padding-right5 color-white">|</span>
                               <span @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span>
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
        <!-- 新增模板 -->
        <el-dialog title="新增通知" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="标题：">
                    <el-input v-model="form.notTitle" placeholder="请输入通知标题" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                    <el-input class="margin-top20" style="width: 300px" type="textarea" :rows="2" placeholder="请输入通知内容" v-model="form.notContent"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消新增')">取 消</el-button>
                <el-button type="primary" @click="changeTrueSubmit">发 布</el-button>
                <el-button type="primary" @click="changeTrue">保 存</el-button>
            </span>
        </el-dialog>
        <!-- 修改模板 -->
        <!-- <el-dialog title="修改通知：" :visible.sync="dialogEditVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="form" label-width="120px">
                <el-form-item label="标题：">
                    <el-input v-model="forms.notTitle" placeholder="请输入通知标题" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                    <el-input class="margin-top20" style="width: 400px" type="textarea" :rows="2" placeholder="请输入通知内容" v-model="forms.notContent"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleEditBtn('您已取消修改')">取 消</el-button>
                <el-button type="primary" @click="changeEditSubmit">发 布</el-button>
                <el-button type="primary" @click="changeEditTrue">保 存</el-button>
            </span>
        </el-dialog> -->
        <!-- 查看模板 -->
        <el-dialog title="查看通知：" :visible.sync="dialogInfoVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="form" label-width="120px">
                <el-form-item label="标题：">
                    {{forms.notTitle}}
                </el-form-item>
                <el-form-item label="内容：">
                     {{forms.notContent}}
                </el-form-item>
            </el-form>
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
                msg:'系统管理--通知公告',
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
                    notTitle:'',
                    notContent:''
                },
                forms:{
                    notTitle:'',
                    notContent:''
                },
                decideDialog: 0,
                keyWord:'',
                deleteId:'',
                typeId:'',
                status:'',
                deleteIndex:'',
                exitId: ''
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
            // handleClickEdit(row) {
            //     let params = {typeId : row.typeId}
            //     this.$api.list.getNoticeInfo(params).then(res=> {
            //         console.log(res);
            //         if(res.data.status == 200){
            //             this.forms = res.data.data.type;
            //             this.dialogEditVisible = true;
            //         }else{
            //             this.$message.error(res.data.msg);
            //         }
            //     }).catch(error=>{
            //         console.log(error);
            //     })
                
            // },
            handleClickInfo(row){
                this.dialogInfoVisible = true;
                let params = {notId : row.notId}
                this.$api.list.getNoticeInfo(params).then(res=> {
                    if(res.data.status == 200){
                        this.forms = res.data.data.notice;
                        this.dialogInfoVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //发布回调
            callbackit(index){
                let params ={notId : this.typeId}
                this.$api.list.submitNotice(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('发布成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //发布
            handleClickSubmit(row) {
                this.typeId = row.notId;
                this.utils.open("发布","是否确认发布"+row.notTitle,"warning",this.callbackit,"发布");
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
            cancleInfoBtn(){
                this.dialogInfoVisible = false;
            },
            //新增、修改、查看弹窗确定按钮
            changeTrue(){
                this.getNewToken(this.addBack);
            },
            changeTrueSubmit(){
                this.getNewToken(this.addSubmitBack);
            },
            // changeEditTrue(){
            //     this.editBack();
            // },
            // changeEditSubmit(){
            //     this.editSubmitBack();
            // },
            changeInfoTrue(){
                this.dialogInfoVisible = false;
            },
            //新增返回函数
            addBack(data){
                let params = this.form;
                params.notState = 1;
                params.submitToken = data;
                this.$api.list.insertNotice(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('新增成功！');
                        this.dialogVisible = false;
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                
                }).catch(error=>{
                    console.log(error);
                })
            },
            addSubmitBack(data){
                let params = this.form;
                params.notState = 2;
                params.submitToken = data;
                this.$api.list.insertNotice(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('发布成功！');
                        this.dialogVisible = false;
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                
                }).catch(error=>{
                    console.log(error);
                })
            },
             //修改返回函数
            // editBack(){
            //     let params = this.forms;
            //     this.$api.list.editNotice(params).then(res=> {
            //         if(res.data.status == 200){
            //             this.$message.success('修改成功！');
            //             this.dialogEditVisible = false;
            //             this.typeAction();
            //         }else{
            //             this.$message.error(res.data.msg);
            //         }
                
            //     }).catch(error=>{
            //         console.log(error);
            //     })
            // },
            // changeEditSubmit(){
            //     let params = this.forms;
            //     this.$api.list.submitNotice(params).then(res=> {
            //         if(res.data.status == 200){
            //             this.$message.success('发布成功！');
            //             this.dialogEditVisible = false;
            //             this.typeAction();
            //         }else{
            //             this.$message.error(res.data.msg);
            //         }
                
            //     }).catch(error=>{
            //         console.log(error);
            //     })
            // },
            // 任务类型列表加载方法
            typeAction(){
                let params = {};
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getNoticeList(params).then(res=> {
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