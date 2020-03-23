<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">任务模板</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新 增</div>
                        </el-col>
                        <el-row type="flex" justify="end">
                            <el-col class="width150 text-right color-black font-size16 line-height35">
                                <span>任务类型：</span>
                            </el-col>
                            <el-col :span="6" class="margin-right20">
                                <el-select v-model="taskType" filterable clearable placeholder="请选择任务类型" @change="select">
                                    <el-option v-for="(item,index) in typeArr" :key="index" :label="item.taskName" :value="item.taskId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyword" placeholder="请输入模板名称"></el-input>
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
                        <el-table-column prop="tempName" label="模板名称"></el-table-column>
                        <el-table-column prop="taskName" label="任务类型"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
                        <el-table-column label="操作" width="180" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">修 改</span><span class="padding-left5 padding-right5">|</span>
                                <span @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span><span class="padding-left5 padding-right5">|</span>
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
        <!-- 新增任务模板 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="1100px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px" v-if="dialogAdd">
                <el-form-item label="模板名称：">
                    <el-input v-model="form.tempName" placeholder="请输入模板名称" class="width220"></el-input>
                </el-form-item>
                <el-form-item label="任务内容："></el-form-item>
                <table class="taskTable margin-left20">
                        <thead>
                            <tr>
                                <th>任务类型</th>
                                <th>产品名称</th>
                                <th>任务数量</th>
                                <th>任务单价</th>
                                <th>报告模板</th>
                                <th>任务要求</th>
                                <th>删除</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in form.contentList" :key="index">
                                <td>
                                    <el-select v-model="item.taskId" placeholder="请选择" class="width115" @change="selects(item.taskId,index)">
                                        <el-option v-for="(items,indexs) in typeArr" :key="indexs" :label="items.taskName" :value="items.taskId"></el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="item.prodId" placeholder="请选择" class="width115">
                                        <el-option v-for="(items,indexs) in prodArr" :key="indexs" :label="items.prodName" :value="items.prodId"></el-option>
                                    </el-select>
                                </td>
                                <td><el-input v-model="item.conCount" placeholder="任务数量" class="width105"></el-input></td>
                                <td><el-input v-model="item.conPrice" placeholder="任务单价" class="width105"></el-input></td>
                                <td class="submit">
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
                                        accept=".doc,.docx,.xls,.xlsx"
                                        :on-success="responseAction">
                                        <el-button slot="trigger" size="small" type="primary" class="margin-left20" @click="zz(index)">上传报告模板</el-button>
                                        <span slot="tip" class="el-upload__tip"></span>
                                    </el-upload>
                                    <p v-if="item.showFile">
                                        <el-link class="text-center" target="_blank" :href="downUrl+item.fileUrl" :underline="false">{{item.fileName}}</el-link>
                                    </p>
                                </div>
                                </td>
                                <td><el-input v-model="item.conRemark" placeholder="任务要求" class="width220"></el-input></td>
                                <td class="text-center width80"><i class="el-icon-delete color-red cursor font-size16" @click="delTem(index)"></i></td>
                            </tr>
                        </tbody>
                        <div><i class="el-icon-circle-plus color-blue cursor font-size22 margin-top10" @click="addTem"></i></div>
                    </table>
            </el-form>
            <el-form ref="form" :model="form" label-width="120px" v-if="dialogInfo">
                <el-form-item label="模板名称：">
                    {{form.tempName}}
                </el-form-item>
                <el-form-item label="任务内容："></el-form-item>
                <table class="taskTable margin-left20">
                        <thead>
                            <tr>
                                <th>任务类型</th>
                                <th>产品名称</th>
                                <th>任务数量</th>
                                <th>任务单价</th>
                                <th>报告模板</th>
                                <th>任务要求</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in form.contentList" :key="index">
                                <td class="width150 text-center">{{typeObjs[item.taskId]}}</td>
                                <td class="width150 text-center">{{prodObjs[item.prodId]}}</td>
                                <td class="width150 text-center">{{item.conCount}}</td>
                                <td class="width150 text-center">{{item.conPrice}}</td>
                                <td class="width150 text-center"><el-link class="text-center" target="_blank" :href="downUrl+item.fileUrl" :underline="false">{{item.fileName}}</el-link></td>
                                <td class="width150 text-center">{{item.conRemark}}</td>
                            </tr>
                        </tbody>
                    </table>
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
import base from '../../request/base';
import store from '../../vuex/store.js';
    export default{

        data(){

            return{
                msg:'任务模板',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                dialogVisible: false,
                dialogAdd: false,
                dialogEdit: false,
                dialogInfo: false,
                dialogTitle: '新增任务模板: ',
                form:{
                    tempName:'',
                    contentList:[],
                },
                decideDialog: 0,
                keyword:'',
                taskType:'',
                typeArr:[],
                prodArr:[],
                typeObjs:{},
                prodObjs:{},
                deleteId:'',
                deleteIndex:'',
                exitId: '',
                submitToken:'',
                url:'',
                token:'',
                imageUrl:'',
                myHeaders:{},
                fileArr:[],
                fileList:[],
                downUrl:'',
                file_path:'',
                file_name:'',
                file_num:'',
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
                this.templateAction();
                console.log(`当前页: ${val}`);
            },
            //上传
            zz(index){
                this.file_num = index;
            },
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
                this.form.contentList[this.file_num].tempFileId = response.data.fileId;
                this.form.contentList[this.file_num].showFile = false;
            },
            handleRemove(file, fileList) {
                //this.form.fileId = '';
                //this.form.fileId = '';
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
                this.dialogAdd = true;
                this.dialogInfo = false;
                this.decideDialog= 2;
                this.dialogTitle = '修改任务模板：',
                this.dialogVisible = true;
                this.exitId = row.tempId;
                let params = {tempId : row.tempId}
                this.$api.list.templateInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        let obj = res.data.data.template;
                        obj.contentList.forEach((item,index)=>{
                            obj.contentList[index].showFile = true;
                        })
                         this.form = obj;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //查看
            handleClickInfo(row) {
                this.dialogAdd = false;
                this.dialogInfo = true;
                this.decideDialog= 3;
                this.dialogTitle = '查看：',
                this.dialogVisible = true;
                let params = {tempId : row.tempId}
                this.$api.list.templateInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        let obj = res.data.data.template;
                        obj.contentList.forEach((item,index)=>{
                            obj.contentList[index].showFile = true;
                        })
                         this.form = obj;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //删除回调
            callbackit(id,index){
                //获取用户信息
                let params = {tempId:this.deleteId};
                this.$api.list.templateDelete(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('删除成功');
                        this.templateAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //删除
            handleClickDelete(row) {
                this.deleteId = row.tempId;
                this.deleteIndex = row.index;
                this.utils.open("删除","是否确认删除"+row.tempName,"warning",this.callbackit,"删除");
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
                console.log(this.form);
                if(decide == 1){
                    this.$api.task.templatePost(this.form).then(res=> {
                        if(res.data.status == 200){
                            this.$message.success('新增成功');
                            this.dialogVisible = false;
                            location.reload();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
                }else if(decide == 2){
                    this.$api.task.templatePostEdit(this.form).then(res=> {
                        console.log(res);
                        if(res.data.status == 200){
                            this.$message.success('修改成功');
                            this.dialogVisible = false;
                            location.reload();
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
            // 任务模板列表加载方法
            templateAction(){
                let params = {};
                params.keyword = this.keyword;
                params.taskId = this.taskType;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.templateList(params).then(res=> {
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
                this.decideDialog = 1;
                this.form.tempName='';
                this.dialogTitle = '新增任务模板：';
                this.dialogAdd = true;
                this.dialogInfo = false;
                this.form.contentList = [];
                this.form.contentList.push({
                    taskId:"",
                    prodId:"",
                    conCount:"",
                    conPrice:"",
                    tempFileId:"",
                    conRemark:"",
                    fileName:"",
                    fileUrl:"",
                    showFile:false,
                });
                this.dialogVisible = true;
            },
            addTem(){
                this.form.contentList.push({
                    taskId:"",
                    prodId:"",
                    conCount:"",
                    conPrice:"",
                    tempFileId:"",
                    conRemark:"",
                    fileName:"",
                    fileUrl:"",
                    showFile:false,
                });
            },
            delTem(index){
                if(this.form.contentList.length<2){
                    this.$message.error("至少保留一条任务内容");
                    return false
                }
                this.form.contentList.splice(index,1);
            },
            //搜索
            search(){
                this.currentPage = 1;
                this.templateAction();
            },
            //下拉选择
            select(){
                this.currentPage = 1;
                this.templateAction();
            },
            //类型选择
            selects(id,index){
                let params = {taskTypeId : id};
                this.$api.task.getMakeTempType(params).then(res=> {
                    if(res.data.status == 200){
                        let data = res.data.data;
                        if(data){
                            this.form.contentList[index].tempFileId = data.fileId;
                            this.form.contentList[index].fileName = data.fileName;
                            this.form.contentList[index].filelUrl = data.fileUrl;
                            this.form.contentList[index].conRemark = data.taskRequirement;
                            this.form.contentList[index].showFile = true;
                        }else{
                            this.form.contentList[index].showFile = false;
                            this.form.contentList[index].tempFileId = '';
                            this.form.contentList[index].fileName = '';
                            this.form.contentList[index].fileUrl = '';
                            this.form.contentList[index].conRemark = '';
                        }
                       
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
            this.templateAction();
            this.$api.list.typeSelect().then(res=> {
                if(res.data.status == 200 ){
                    this.typeArr = res.data.data.list;
                    let arr = res.data.data.list;
                    arr.forEach((item,i)=>{
                        this.typeObjs[item.taskId]= item.taskName;
                    })
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            });
            //关联产品
            this.$api.task.getDataproduct().then(res=> {
                if(res.data.status == 200){
                    this.prodArr = res.data.data;
                    let arr = res.data.data;
                    arr.forEach((item,i)=>{
                        this.prodObjs[item.prodId]= item.prodName;
                    })
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            });
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
.submit{
    width: 150px !important;
    overflow: hidden !important;
    text-aglin: center !important;
}
</style>