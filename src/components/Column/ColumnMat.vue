<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>企业专栏</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">专栏管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新增专栏</div>
                        </el-col>
                        <el-row type="flex" justify="end">
                            <el-col class="width150 text-right color-white font-size16 line-height35">
                                <span>选择企业：</span>
                            </el-col>
                            <el-col :span="6" class="margin-right20">
                                <el-select v-model="comName" filterable clearable placeholder="请选择企业名称" @change="selectCapital">
                                    <el-option v-for="item in capital" :key="item.comId" :label="item.comName" :value="item.comId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入专栏名称"></el-input>
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
                        <el-table-column prop="colName" label="专栏名称"></el-table-column>
                        <el-table-column prop="comName" label="企业名称"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">修 改</span><span class="padding-left5 padding-right5">|</span>
                                <span @click="handleClickDelete(scope.row)" type="text" size="small" class="color-yellow cursor">删 除</span>
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
        <el-dialog title="新增专栏" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="专栏名称：">
                    <el-input v-model="form.colName" placeholder="请输入类型名称" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="企业名称：">
                    <el-select v-model="form.comId" filterable clearable placeholder="请选择企业名称">
                        <el-option v-for="item in capital" :key="item.comId" :label="item.comName" :value="item.comId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专栏封面：">
                    <el-upload :action="url" :headers="myHeaders"  accept=".png,.jpg" :show-file-list="showFile" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="responseAction">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消新增')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改模板 -->
        <el-dialog title="修改专栏：" :visible.sync="dialogEditVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="form" label-width="120px">
                <el-form-item label="专栏名称：">
                    <el-input v-model="forms.colName" placeholder="请输入类型名称" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="企业名称：">
                    <el-select v-model="forms.comId" filterable clearable placeholder="请选择企业名称">
                        <el-option v-for="item in capital" :key="item.comId" :label="item.comName" :value="item.comId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专栏封面：">
                    <el-upload :action="url" :headers="myHeaders"  accept=".png,.jpg" :show-file-list="showFiles" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="responseActions">
                        <img v-if="imageUrls" :src="imageUrls" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
import base from '../../request/base';
import store from '../../vuex/store.js';
    export default{

        data(){

            return{
                msg:'企业专栏--专栏管理',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                comName: '',
                capital:[],
                dialogVisible: false,
                dialogEditVisible: false,
                dialogInfoVisible: false,
                form:{
                    colName:'',
                    comId:'',
                    fileId:''
                },
                forms:{
                    taskName:''
                },
                decideDialog: 0,
                keyWord:'',
                deleteId:'',
                typeId:'',
                status:'',
                deleteIndex:'',
                exitId: '',
                imageUrl:'',
                imageUrls:'',
                url:'',
                myHeaders:{},
                showFile: true,
                showFiles: true,
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
            //上传
            responseAction(response){
                console.log(response);
                this.imageUrl = this.downUrl+response.data.fileUrl;
                this.showFile = false;
                this.form.fileId = response.data.fileId;
                console.log(this.imageUrl);
            },
            handleRemove(file, fileList) {
                console.log(2);
            },
            handlePictureCardPreview(file) {
                 console.log(3);
                this.imageUrl = file.url;
            },
            responseActions(response){
                console.log(response);
                this.imageUrls = this.downUrl+response.data.fileUrl;
                this.showFiles = false;
                this.forms.fileId = response.data.fileId;
                console.log(this.imageUrl);
            },
            //修改
            handleClickEdit(row) {
                let params = {colId : row.colId}
                this.$api.list.getColumnMatInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.forms = res.data.data.column;
                        this.imageUrls = this.downUrl+this.forms.fileUrl;
                        this.dialogEditVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
                
            },
            //删除回调
            callbackit(index){
                let params ={colId : this.typeId}
                this.$api.list.deleteColumnMat(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('删除成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //删除
            handleClickDelete(row) {
                this.typeId = row.colId;
                this.utils.open("删除","是否确认删除"+row.colName,"warning",this.callbackit,"删除");
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
            //新增返回函数
            addBack(data){
                let params = this.form;
                params.submitToken = data;
                this.$api.list.insertColumnMat(params).then(res=> {
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
             //修改返回函数
            editBack(data){
                let params = this.forms;
                params.submitToken = data;
                this.$api.list.editColumnMat(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('修改成功！');
                        this.dialogEditVisible = false;
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                
                }).catch(error=>{
                    console.log(error);
                })
            },
            // 任务类型列表加载方法
            typeAction(){
                let params = {};
                params.colName = this.keyWord;
                params.comName = this.comName;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getColumnMatList(params).then(res=> {
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
            //选择
            selectCapital(){
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
            //获取所有企业
            this.$api.list.getColumnMatCom().then(res=> {
                if(res.data.status == 200){
                    this.capital = res.data.data.companyList;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            });
            //上传地址
            this.url = base+"/upload/fileUpload";
            //获取token
            this.myHeaders.token = store.state.token;
            //获取下载地址
            this.$api.list.getDownUrl().then(res=> {
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
</style>