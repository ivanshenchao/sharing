<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">我的任务</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-row type="flex" justify="end">
                            <el-col :span="4" class="margin-right20">
                                <el-select v-model="status" filterable placeholder="请选择任务状态" @change="select">
                                    <el-option label="待提交" value="1"></el-option>
                                    <el-option label="待审核" value="2"></el-option>
                                    <el-option label="审核通过" value="3"></el-option>
                                    <el-option label="审核失败" value="4"></el-option>
                                </el-select>
                            </el-col>
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
                        <el-table-column prop="comName" label="药企名称"></el-table-column>
                        <el-table-column prop="conName" label="任务名称"></el-table-column>
                        <el-table-column prop="taskName" label="任务类型"></el-table-column>
                        <el-table-column prop="conPrice" label="任务单价"></el-table-column>
                        <el-table-column prop="conCount" label="任务数量"></el-table-column>
                        <el-table-column label="报告模板" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-link class="text-center link-hover" target="_blank" :href="downUrl+scope.row.fileUrl" :underline="false">{{scope.row.fileName}}</el-link>
                            </template>
                        </el-table-column>
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
                                <span v-show="scope.row.state == 1 || scope.row.state == 4">
                                    <span @click="handleClickSubmit(scope.row)" type="text" size="small" class="color-yellow cursor">提 交<span class="padding-left5 padding-right5 color-silver">|</span></span>
                                </span>
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
            <el-form ref="forms" :model="forms" label-width="120px" class="margin-right20" v-if="decideDialog == 1 || decideDialog == 2">
                <div>
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
                        <el-form-item label="任务地区：">
                            {{forms.capitalName}}{{forms.cityName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务要求：">
                            {{forms.taRemark}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务状态：">
                            <span v-show="forms.state == 1">待提交</span>
                            <span v-show="forms.state == 2">待审核</span>
                            <span v-show="forms.state == 3">审核通过</span>
                            <span v-show="forms.state == 4">审核失败--原因：<span class="color-red">{{forms.reason}}</span></span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="报告模板：">
                            <el-link class="text-center" target="_blank" :href="downUrl+forms.fileUrl" :underline="false">{{forms.fileName}}</el-link>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="decideDialog == 1">
                    <el-form-item label="上传资料：">
                    </el-form-item>
                    <el-col :span="12" class="padding-left50 margin-tops20 margin-bottom20 padding-bottom20">
                        <el-form-item label="word格式：">
                        </el-form-item>
                        <div class="submit">
                            <el-upload
                                class="upload-demo"
                                ref="uploads"
                                :action="url"
                                :headers="myHeaders"
                                :on-preview="handlePreviews"
                                :on-remove="handleRemoves"
                                :file-list="fileList"
                                :limit="3"
                                accept=".doc,.docx,.docm,.dotx,.dotm"
                                :before-upload="uploadSize"
                                :on-success="responseActions">
                                <el-button slot="trigger" size="medium" type="primary">上传word文件</el-button>
                                <!--<div slot="tip" class="el-upload__tip">只能上传 Word/Excel 文件，且不超过300M</div>-->
                            </el-upload>
                        </div>
                    </el-col>
                    <el-col :span="12" class="padding-left50 margin-tops20 padding-bottom20">
                         <el-form-item label="excel格式：">
                        </el-form-item>
                        <div class="submit">
                            <el-upload
                                class="upload-demo"
                                ref="uploadss"
                                :action="url"
                                :headers="myHeaders"
                                :on-preview="handlePreviews"
                                :on-remove="handleRemoves"
                                :file-list="fileList"
                                :limit="3"
                                accept=".xlsm,.xltx,.xltm,.xls,.xlsx,.xlsb,.xlam"
                                :before-upload="uploadSize"
                                :on-success="responseActions">
                                <el-button slot="trigger" size="medium" type="primary">上传excel文件</el-button>
                                <!--<div slot="tip" class="el-upload__tip">只能上传 Word/Excel 文件，且不超过300M</div>-->
                            </el-upload>
                        </div>
                    </el-col>
                     <el-col :span="24">
                         <el-form-item label="上传图片：">
                        </el-form-item>
                        <el-col class="padding-left50">
                            <el-upload :action="url" :limit="3" ref="upload" :headers="myHeaders"  accept=".png,.jpg,.jpeg,.bmp,.tif" :on-preview="handlePictureCardPreview" list-type="picture-card" :on-remove="handleRemove" :on-success="responseAction">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col> 
                    </el-col>
                </el-row>
                 <div class="down" v-if="decideDialog == 2 && decideDialogs == 2">
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
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">
                    <span v-show="decideDialog==1">提 交</span>
                    <span v-show="decideDialog==2">确 定</span>
                </el-button>
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
                msg:'我的任务',
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
                downUrl:'',
                stepDescription:'',
                stepName:'',
                decideDialog: 0,
                decideDialogs: 1,
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
                url:'',
                token:'',
                imageUrl:'',
                myHeaders:{},
                showFile: true,
                disId : '',
                files:[],
                fileImg:[],
                fileListInfo:[],
                fileImgesInfo:[],
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
            responseActions(response){
                console.log(response);
                let obj = {};
                obj.name = response.data.fileName;
                obj.id = response.data.fileId;
                this.files.push(obj);
            },
            handleRemoves(file, fileList) {
                let name = file.response.data.fileName;
                this.files.forEach((item,index)=>{
                    if(name == item.name){
                        this.files.splice(index,1)
                    }
                })
            },
            handlePreviews(file) {
                console.log(file);
            },
            //上传图片
            responseAction(response){
                console.log(response);
                let obj = {};
                obj.name = response.data.fileName;
                obj.id = response.data.fileId;
                this.fileImg.push(obj);
            },
            handleRemove(file, fileList) {
                let name = file.response.data.fileName;
                this.fileImg.forEach((item,index)=>{
                    if(name == item.name){
                        this.fileImg.splice(index,1)
                    }
                })
            },
            handlePictureCardPreview(file) {
                console.log(file);
            },
            //提交资料
            handleClickSubmit(row){
                let params = {disId:row.disId};
                this.$api.list.myTaskListInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.diaWidth = '900px';
                        this.dialogTitle = '提交资料：';
                        this.decideDialog = 1;
                        this.files = [];
                        this.fileImg = [];
                        let data = res.data.data;
                        this.forms = data.info; 
                        this.disId = row.disId;
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
                if(row.state>1){
                    this.decideDialogs = 2;
                }else{
                    this.decideDialogs = 1;
                }
                let params = {disId:row.disId}
                this.$api.list.myTaskListInfo(params).then(res=> {
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
            //新增、编辑、查看弹窗关闭
            handleClose(done) {
                if(this.decideDialog == 1){
                    this.$refs.uploads.clearFiles();
                    this.$refs.uploadss.clearFiles();
                    this.$refs.upload.clearFiles();
                }
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            cancleBtn(){
                if(this.decideDialog == 1){
                    this.$refs.uploads.clearFiles();
                    this.$refs.uploadss.clearFiles();
                    this.$refs.upload.clearFiles();
                }
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
            //数据提交
            savePost(){
                let thef = this;
                console.log(thef.files);
                if(thef.files.length<1){
                    thef.$message.error('请先上传资料');
                    return false
                }
                //if(thef.fileImg.length<1){
                    //thef.$message.error('请先上传图片');
                    //return false
                //}
                let arr1 = [];
                let arr2 = [];
                thef.files.forEach(item=>{
                    arr1.push(item.id)
                })
                thef.fileImg.forEach(item=>{
                    arr2.push(item.id)
                })
                let params = {
                    disId: thef.disId,
                    fileList : arr1,
                    imageList: arr2
                };
                console.log(params);
                thef.$api.task.myTaskPost(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.$message.success('提交成功');
                        this.$refs.uploads.clearFiles();
                        this.$refs.uploadss.clearFiles();
                        this.$refs.upload.clearFiles();
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
                params.state = this.status;
                params.keyWord = this.keyword;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.myTaskList(params).then(res=> {
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
            },
            //图片下载
    //         downloadCodeImg(data){
    //             var a = document.createElement('a')
    //              a.download = name || 'pic'
    //              // 设置图片地址
    //              a.href = data;
    //               a.click();
    //         }
        },
        beforeMount(){
            // 任务加载
            this.taskAction();
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
.el-upload__tip{
    color: #999999;
}
</style>