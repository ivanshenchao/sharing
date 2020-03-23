<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="../index">首页</el-breadcrumb-item>
                <el-breadcrumb-item to="../EnterpriseInfo">任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">区域任务</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-row type="flex" justify="end">
                            <el-col :span="4" class="margin-right20">
                                <el-select v-model="capitalId" filterable clearable placeholder="请选择省份" @change="selectCapital">
                                    <el-option v-for="item in capital" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" class="margin-right20">
                                <el-select v-model="cityId" filterable clearable placeholder="请选择城市" @change="selectCity">
                                    <el-option v-for="item in city" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" class="margin-right20">
                                <el-select v-model="status" filterable placeholder="请选择任务状态" @change="select" clearable>
                                    <el-option value="1" label="待发布"></el-option>
                                    <el-option value="2" label="待接收"></el-option>
                                    <el-option value="3" label="待确认"></el-option>
                                    <el-option value="4" label="进行中"></el-option>
                                    <el-option value="5" label="申请验收"></el-option>
                                    <el-option value="6" label="待验收"></el-option>
                                    <el-option value="7" label="待打款"></el-option>
                                    <el-option value="8" label="已完成"></el-option>
                                    <el-option value="9" label="已过期"></el-option>
                                </el-select>
                            </el-col>
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
                        <el-table-column prop="comName" label="药企名称"></el-table-column>
                        <el-table-column prop="taName" label="任务名称"></el-table-column>
                        <el-table-column label="任务地区">
                            <template slot-scope="scope">{{scope.row.capitalName}}{{scope.row.ctiyName}}</template>
                        </el-table-column>
                        <el-table-column label="开始时间" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.createTime}}</template>
                        </el-table-column>
                        <el-table-column label="状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.taState == 1">待发布</span>
                                <span v-show="scope.row.taState == 2">待接收</span>
                                <span v-show="scope.row.taState == 3">待确认</span>
                                <span v-show="scope.row.taState == 4">进行中</span>
                                <span v-show="scope.row.taState == 5">申请验收</span>
                                <span v-show="scope.row.taState == 6">待验收</span>
                                <span v-show="scope.row.taState == 7">待打款</span>
                                <span v-show="scope.row.taState == 8">已完成</span>
                                <span v-show="scope.row.taState == 9">已过期</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.taState == 2">
                                    <span @click="handleClickSubmit(scope.row)" type="text" size="small" class="color-yellow cursor">分 配</span>
                                </span>
                                <span v-show="scope.row.taState == 3">
                                    <span @click="handleClickSubmits(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span>
                                </span>
                                <span v-show="scope.row.taState == 5">
                                    <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">申请验收</span>
                                </span>
                                <span v-show="scope.row.taState != 2 &&scope.row.taState != 3 &&  scope.row.taState != 5" @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor text-right">查 看</span>
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
            <el-form ref="forms" :model="form" label-width="120px" class="margin-right20" v-if="decideDialog == 1 || decideDialog == 2">
                <div style="margin-top: -20px">
                    <p>任务详情：</p>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务名称：">
                            {{forms.taName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务地区：">
                            {{forms.capitalName}}{{forms.cityName}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始日期：">
                            {{forms.startTime}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束日期：">
                            {{forms.endTime}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="实施进度：">
                    <span class="process-progress process-bg"></span>
                    <span class="padding-left10">已完成</span>
                    <span class="padding-left20"></span>
                    <span class="process-progress process-bgs"></span>
                    <span class="padding-left10">总数量</span>
                </el-form-item>
                <el-col :span="24" style="margin-top: -10px">
                    <el-col :span="24" class="margin-bottom10" v-for="(item,index) in task_my" :key="index">
                        <el-col :span="4" class="text-right">
                            <span>{{item.taskName}}</span>
                            <br>
                            <span class="font-size12">单价：({{item.conPrice}})</span>
                        </el-col>
                            <el-col :span="16" style="padding:10px 20px 0 20px">
                            <el-progress :text-inside="true" :stroke-width="16" :percentage="item.process"></el-progress>
                        </el-col>
                        <el-col :span="4" class="text-left" style="padding:10px 0 0 0">
                            进度：{{item.process}}%
                        </el-col>
                    </el-col>
                </el-col>
                
                <el-form-item label="整体进度："></el-form-item>
                <el-col :span="24" class="margin-bottom20">
                        <el-col :span="20" style="padding:0 20px 0 80px">
                        <el-progress :text-inside="true" :stroke-width="22" :percentage="forms.passCount/forms.totalCount*100"></el-progress>
                    </el-col>
                    <el-col :span="4" class="text-left">
                        进度：{{forms.passCount/forms.totalCount*100}}%
                    </el-col>
                </el-col>
                <el-form-item label="任务跟踪："></el-form-item>
                <table class="margin-left20 text-center margin-bottom20" style="width : 100%; margin-top: -30px">
                     <thead>
                        <tr>
                            <th>任务类型</th>
                            <th>任务数量</th>
                            <th>执行人</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in task_content" :key="index">
                            <td>{{item.taskName}}</td>
                            <td>{{item.conCount}}</td>
                            <td>{{item.accName}}</td>
                            <td>
                                <span v-show="item.state == 1">待提交</span>
                                <span v-show="item.state == 2">待审核</span>
                                <span v-show="item.state == 3">审核通过</span>
                                <span v-show="item.state == 4">审核失败</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <el-row v-if="forms.reason">
                    <el-col :span="12">
                        <el-form-item label="失败--原因：">
                            <span class="color-red">{{forms.reason}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="任务资料：" v-if="pdfArr.length > 0">
                    <el-col :span="24" class="text-left" v-for="(item,index) in pdfArr" :key="index">
                        <span @click="handleClickInfos(item.fileUrl)" type="text" size="small" class="hover-font cursor">{{item.taskName}}</span>
                    </el-col>   
                </el-form-item>     
                <!--<el-form-item label="上传文件：" v-if="decideDialog == 2"></el-form-item>-->
            </el-form>
                        <!--<div class="submit" v-if="decideDialog == 2">-->
                            <!--<el-upload-->
                                <!--class="upload-demo"-->
                                <!--ref="upload"-->
                                <!--:action="url"-->
                                <!--:headers="myHeaders"-->
                                <!--:on-preview="handlePreview"-->
                                <!--:on-remove="handleRemove"-->
                                <!--:file-list="fileList"-->
                                <!--:limit="1"-->
                                <!--:before-upload="uploadSize"-->
                                <!--accept=".pdf"-->
                                <!--:on-success="responseAction">-->
                                <!--<el-button slot="trigger" size="small" type="primary"> 选 择 文 件 (非必填)</el-button>-->
                                <!--<div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过300M</div>-->
                            <!--</el-upload>-->
                        <!--</div>-->
                 <div class="down text-center margin-top20" v-if="decideDialog == 1 && downStatus == 1">
                     <el-link target="_blank" :href="downUrl" :underline="false" style="margin-left:15px">{{file_name}}</el-link>
                </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">
                    <span v-show="decideDialog==1">确 定</span>
                    <span v-show="decideDialog==2">提 交</span>
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
                msg:'区域任务',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                company:'',
                companyArr:'',
                currentPage: 1,
                dialogVisible: false,
                diaWidth: '450px',
                dialogTitle: '',
                form:{
                    task_name:'',
                    addressValue:[],
                    start_date:'',
                    end_time:'',
                    agent:'',
                    agent_name:'',
                    province_id:'',
                    city_id:'',
                    content:[],
                },
                forms:{
                    task_name:'',
                    address:'',
                    start_date:'',
                    end_time:'',
                    agent:'',
                    agent_name:'',
                    province_id:'',
                    city_id:'',
                    task_content:[]
                },
                fileList:[],
                downUrl:'',
                file_path:'',
                file_name:'',
                id:'',
                stepDescription:'',
                stepName:'',
                decideDialog: 0,
                keyword:'',
                status:'',
                capital:[],
                city:[],
                capitalId:'',
                cityId:'',
                pid:'',
                cid:'',
                taskType:'',
                typeArr:[],
                typeObjs:{},
                task_my:[],
                statusArr:[],
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
                downStatus: 0,
                clickInfo: 0,
                task_content:[],
                url:'',
                token:'',
                imageUrl:'',
                myHeaders:{},
                showFile: true,
                fileArr:[],
                taskNameArr: ["一","二","三","四","五","六","七","八","九","十"],
                pdfArr:[],
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
                this.taskAction();
                console.log(`当前页: ${val}`);
            },
            //地址选择
            //下拉加载城市
            selectCapital(){
                this.cityId = '';
                //获取当前省份城市
                if(this.capitalId == ''){
                    this.taskAction();
                    return false;
                }
                let parmas = {capitalId : this.capitalId};
                this.$api.list.getCity(parmas).then(res=> {
                    if(res.data.status == 200){
                        this.city = res.data.data.list;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
                this.taskAction();
            },
            selectCity(){
                this.taskAction();
            },
            //时间转换
            formDate(value){
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
            },
            //进度
            format(percentage) {
                return percentage = `进度：${percentage}%`;
            },
            //分配 分配
            handleClickSubmit(row){
                this.$router.push({
                    path: '/Allocation/'+row.taId
                });
            },
            //分配 查看
            handleClickSubmits(row){
                this.$router.push({
                    path: '/Allocations/'+row.taId
                });
            },
            //申请验收
             handleClickEdit(row) {
                 //if(this.file_path){
                     //this.$refs.upload.clearFiles();
                 //}
                let params = {taId:row.taId}
                this.$api.list.taskInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.diaWidth = '740px';
                        this.dialogTitle = '申请验收：';
                        this.decideDialog = 2;
                        this.pdfArr = [];
                        let data = res.data.data;
                        this.forms = data.taskInfo;
                        this.id = data.taskInfo.taId;
                        this.task_my = data.taskContentList;
                        this.task_content = data.taskDistList;
                        this.fileArr = data.taskFileList;
                        this.dialogVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
                this.$api.list.getTaskPdfs(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.pdfArr = res.data.data.list;   
                    }else{
                        this.pdfArr =[];
                    }
                                     
                }).catch(error=>{
                    console.log(error);
                })
            },
            //查看
            handleClickInfo(row) {
                console.log(row.id);
                let params = {taId:row.taId}
                this.$api.list.taskInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.diaWidth = '740px';
                        this.dialogTitle = '查看：';
                        this.decideDialog = 1;
                        this.pdfArr = [];
                        this.downStatus = 0;
                        let data = res.data.data;
                        this.forms = data.taskInfo;
                        this.id = data.taskInfo.taId;
                        this.task_my = data.taskContentList;
                        this.task_content = data.taskDistList;
                        this.pdfArr = data.taskFileList;
                        this.dialogVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //pdf预览
            handleClickInfos(url){
                sessionStorage.setItem("pdfUrl", url);
                let routeUrl = this.$router.resolve({
                    path: "/Share/Previewpdf",
                });
                window.open(routeUrl.href, '_blank');
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
            //删除
            handleClickDelete(row) {
                this.deleteId = row.id;
                this.deleteIndex = row.index;
                this.utils.open("删除","是否确认删除"+row.task_name,"warning",this.callbackit,"删除");
            },
            //撤回
            handleClickRecall(row){
                this.deleteId = row.id;
                this.deleteIndex = row.index;
                this.utils.open("撤回","是否确认撤回"+row.task_name,"warning",this.callbackitRecall,"撤回");
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
                    this.dialogVisible = false;
                }else if(decide == 2){  
                    this.savePost();                  
                }else if(decide == 3){
                    this.savePost(this.exitId,0);   
                }else{
                    this.dialogVisible = false;
                }    
            },
            //资料提交
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
                this.file_path = response.data.fileId;
            },
            handleRemove(file, fileList) {
                console.log(2);
            },
            handlePictureCardPreview(file) {
                 console.log(3);
            },
            handlePreview(file) {
                console.log(file);
            },
            //数据提交 申请
            savePost(){
                let thef = this;
                let params = {
                    taId: thef.id,
                    fileIdList: [thef.file_path]
                };
                thef.$api.task.taskDistPost(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('申请成功');
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
                params.capitalId = this.capitalId;
                params.cityId = this.cityId;
                params.state = this.status;
                params.taskName = this.keyword;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.taskDistList(params).then(res=> {
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
            //获取所有省份
            this.$api.list.getCapital().then(res=> {
                if(res.data.status == 200){
                    this.capital = res.data.data.list;
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
.submit{
    margin: 20px 50px;
    text-align: center
}
.process-progress{
    font-size: 1px;
    padding : 0px 8px;
}
.process-bg{
    background-color: #1989FA;
}
.process-bgs{
    background-color: #EBEEF5;
}
</style>
