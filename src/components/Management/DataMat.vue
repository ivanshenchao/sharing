<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>资源管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">资料管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新增资料</div>
                        </el-col>
                        <el-row type="flex" justify="end">
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入资料名称"></el-input>
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
                        <el-table-column prop="materialName" label="资料名称"></el-table-column>
                        <el-table-column prop="prodName" label="关联产品"></el-table-column>
                        <el-table-column prop="prodTypeName" label="资料类型"></el-table-column>
                        <el-table-column prop="materialExplain" label="资料说明"></el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">修 改</span><span class="padding-left5 padding-right5 color-white">|</span>
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
        <el-dialog title="新增资料" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="资料名称：">
                    <el-input v-model="form.materialName" placeholder="请输入资料名称" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="关联产品：">
                    <el-select v-model="form.prodId" placeholder="请选择关联产品" class="width300">
                        <el-option v-for="item in products" :key="item.prodId" :label="item.prodName" :value="item.prodId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资料类型：">
                    <el-select v-model="form.prodTypeId" placeholder="请选择资料类型" class="width300">
                        <el-option v-for="item in materials" :key="item.prodTypeId" :label="item.prodTypeName" :value="item.prodTypeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传资料：">
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
                            accept=".doc,.docx,.xls,.xlsx,.rmvb,.mp4,.pptx,.ppt"
                            :on-success="responseAction">
                            <el-button slot="trigger" size="small" type="primary"> 选 择 文 件</el-button>
                            <span slot="tip" class="el-upload__tip">(支持上传.doc,.docx,.xls,.xlsx,.mp4,.pptx,.ppt文件)</span>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label="资料说明：">
                    <el-input type="textarea" maxlength="2000" :rows="3" v-model="form.materialExplain" placeholder="请输入资料说明" class="width300" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消新增')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改模板 -->
        <el-dialog title="修改资料：" :visible.sync="dialogEditVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="forms" label-width="120px">
                <el-form-item label="资料名称：">
                    <el-input v-model="forms.materialName" placeholder="请输入资料名称" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="关联产品：">
                    <el-select v-model="forms.prodId" placeholder="请选择关联产品" class="width300">
                        <el-option v-for="item in products" :key="item.prodId" :label="item.prodName" :value="item.prodId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资料类型：">
                    <el-select v-model="forms.prodTypeId" placeholder="请选择资料类型" class="width300">
                        <el-option v-for="item in materials" :key="item.prodTypeId" :label="item.prodTypeName" :value="item.prodTypeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传资料：">
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
                            accept=".doc,.docx,.xls,.xlsx,.mp4,.pptx,.ppt"
                            :on-success="responseActions">
                            <el-button slot="trigger" size="small" type="primary"> 选 择 文 件</el-button>
                            <span slot="tip" class="el-upload__tip">(支持上传.doc,.docx,.xls,.xlsx,.mp4,.pptx,.ppt文件)</span>
                        </el-upload>
                        <p v-if="showFile">
                            <el-link class="text-center" target="_blank" :href="downUrl+forms.fileUrl" :underline="false">{{forms.fileName}} 下载</el-link>
                        </p>
                    </div>
                </el-form-item>
                <el-form-item label="资料说明：">
                    <el-input type="textarea" maxlength="2000" :rows="3" v-model="forms.materialExplain" placeholder="请输入资料说明" class="width300" show-word-limit></el-input>
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
                msg:'系统管理--需求类型',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                products:[],
                materials:[],
                dialogVisible: false,
                dialogEditVisible: false,
                dialogInfoVisible: false,
                form:{
                    materialName:'',
                    prodId:'',
                    prodTypeId:'',
                    fileId:'',
                    materialExplain:''
                },
                forms:{
                    materialName:'',
                    prodId:'',
                    prodTypeId:'',
                    fileId:'',
                    materialExplain:''
                },
                decideDialog: 0,
                keyWord:'',
                deleteId:'',
                typeId:'',
                status:'',
                deleteIndex:'',
                exitId: '',
                url:'',
                token:'',
                imageUrl:'',
                myHeaders:{},
                showFile: true,
                fileArr:[],
                fileList:[],
                downUrl:'',
                file_path:'',
                file_name:'',
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
                console.log(response);
                this.form.fileId = response.data.fileId;
            },
            responseActions(response){
                console.log(response);
                this.forms.fileId = response.data.fileId;
                this.showFile = false;
            },
            handleRemove(file, fileList) {
                this.form.fileId = '';
                this.forms.fileId = '';
                console.log(2);
            },
            handlePictureCardPreview(file) {
                 console.log(3);
            },
            handlePreview(file) {
                console.log(file);
            },
            //修改
            handleClickEdit(row) {
                let params = {materialId : row.materialId}
                this.$api.list.getDataInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.forms = res.data.data;
                        this.showFile = true;
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
                let params ={materialId : this.typeId}
                this.$api.list.deleteData(params).then(res=> {
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
                this.typeId = row.materialId;
                this.utils.open("删除","是否确认删除"+row.materialName,"warning",this.callbackit,"删除");
            },
            //新增、编辑、查看弹窗关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    this.$refs.upload.clearFiles();
                    done();
                })
                .catch(_ => {});
            },
            cancleBtn(){
                this.dialogVisible = false;
                this.$refs.upload.clearFiles();
            },
            cancleEditBtn(){
                this.$refs.upload.clearFiles();
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
                this.$api.task.insertData(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('新增成功！');
                        this.$refs.upload.clearFiles();
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
                this.$api.task.dataBanner(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('修改成功！');
                        this.dialogEditVisible = false;
                        this.$refs.upload.clearFiles();
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
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.dataList(params).then(res=> {
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
                this.form.materialName = '';
                this.form.prodId = '';
                this.form.prodTypeId = '';
                this.form.fileId = '';
                this.form.materialExplain = '';
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

            //关联产品
            this.$api.task.getDataproduct().then(res=> {
                if(res.data.status == 200){
                    this.products = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            }) 

            //资料类型
            this.$api.task.getDataTye().then(res=> {
                if(res.data.status == 200){
                    this.materials = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            }) 

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
.el-upload__tip{
    color: #999999;
    margin:0;
    padding-left: 10px;
}
</style>