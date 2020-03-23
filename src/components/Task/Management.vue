<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>任务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">任务管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="3">
                            <div class="el-button-copy" @click="adds">新增任务</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="el-button-copy" @click="add">模板任务</div>
                        </el-col>
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
                        <el-table-column prop="taName" label="任务名称"></el-table-column>
                        <el-table-column label="任务地区">
                            <template slot-scope="scope">{{scope.row.capitalName}}{{scope.row.ctiyName}}</template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="开始时间"></el-table-column>
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
                        <el-table-column label="操作" width="180" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.taState == 1">
                                    <span @click="handleClickSubmit(scope.row)" type="text" size="small" class="color-yellow cursor">发 布</span><span class="padding-left5 padding-right5">|</span>
                                </span>
                                <span v-show="scope.row.taState == 1">
                                    <span @click="handleClickDelete(scope.row)" type="text" size="small" class="color-yellow cursor">删 除</span>
                                </span>
                                <span v-show="scope.row.taState == 2">
                                    <span @click="handleClickRecall(scope.row)" type="text" size="small" class="color-yellow cursor">撤 回</span><span class="padding-left5 padding-right5">|</span>
                                </span>
                                <span v-show="scope.row.taState == 3">
                                    <span @click="handleClickAff(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span>
                                </span>
                                <span v-show="scope.row.taState == 4">
                                    <span @click="handleClickReminder(scope.row)" type="text" size="small" class="color-yellow cursor">催 单</span><span class="padding-left5 padding-right5">|</span>
                                </span>
                                <span v-show="scope.row.taState == 6">
                                    <span @click="handleClickCheck(scope.row)" type="text" size="small" class="color-yellow cursor">验 收</span>
                                </span>
                                <span v-show="scope.row.taState == 2" @click="handleClickAff(scope.row)" type="text" size="small" class="color-yellow cursor text-right">查 看</span>
                                <span v-show="scope.row.taState == 4 || scope.row.taState == 5 || scope.row.taState == 7 || scope.row.taState == 8 || scope.row.taState == 9" @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor text-right">查 看</span>
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
            <el-form ref="form" :model="form" label-width="120px" v-if="decideDialog == 1">
                <el-form-item label="任务模板名称：">
                    <el-select v-model="templateId" filterable clearable placeholder="请选择任务模板">
                        <el-option v-for="(item,index) in templateArr" :key="index" :label="item.tempName" :value="item.tempId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消')">取 消</el-button>
                <el-button type="primary" @click="changeTrues">
                    <span v-show="decideDialog==1">确 定</span>
                </el-button>
            </span>
        </el-dialog>

        <!-- 验收 -->
        <el-dialog title="验收" :visible.sync="dialogVisibleCheck" width="900" :before-close="handleCloseCheck">
            <el-form ref="formCheck" :model="forms" label-width="120px" class="margin-right20">
                <div style="margin-top: -20px">
                    <p>任务详情：</p>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务名称：">
                            {{formCheck.taName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务地区：">
                            {{formCheck.capitalName}}{{formCheck.cityName}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始日期：">
                            {{formCheck.startTime}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束日期：">
                            {{formCheck.endTime}}
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
                        <el-col :span="4" class="text-center">
                            <span>{{item.taskName}}</span>
                            <br>
                            <span>({{item.conPrice}})</span>
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
                        <el-progress :text-inside="true" :stroke-width="22" :percentage="formCheck.passCount/formCheck.totalCount*100"></el-progress>
                    </el-col>
                    <el-col :span="4" class="text-left">
                        进度：{{formCheck.passCount/formCheck.totalCount*100}}%
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
                <el-col :span="24">
                    <el-form-item label="所提交资料：">
                        <el-col :span="24" v-for="(item,index) in taskFileList" :key="index">
                            <el-link class="text-center" target="_blank" :href="downUrl+item.fileUrl" :underline="false" style="margin-left:15px">{{item.taskName}}</el-link>
                        </el-col> 
                    </el-form-item>
                </el-col>
            </el-form>
                    
            <div class="audit margin-top20 text-center">
                <el-radio v-model="radio" label="2">通过</el-radio>
                <el-radio v-model="radio" label="3">不通过</el-radio>
                <br>
                <el-input class="margin-top20" style="width: 400px" type="textarea" :rows="2" placeholder="请输入不通过原因" v-model="textarea" v-show="radio == 3"></el-input>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消验收')">取 消</el-button>
                <el-button type="primary" @click="changeTrueCheck">验 收</el-button>
            </span>
        </el-dialog>

        <!-- 查看 -->
        <el-dialog title="查看" :visible.sync="dialogVisibleInfo" width="900" :before-close="handleCloseInfo">
            <el-form ref="formInfo" :model="forms" label-width="120px" class="margin-right20">
                <div style="margin-top: -20px">
                    <p>任务详情：</p>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务名称：">
                            {{formInfo.taName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务地区：">
                            {{formInfo.capitalName}}{{formInfo.cityName}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始日期：">
                            {{formInfo.startTime}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束日期：">
                            {{formInfo.endTime}}
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
                        <el-col :span="4" class="text-center">
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
                        <el-progress :text-inside="true" :stroke-width="22" :percentage="formInfo.passCount/formInfo.totalCount*100"></el-progress>
                    </el-col>
                    <el-col :span="4" class="text-left">
                        进度：{{formInfo.passCount/formInfo.totalCount*100}}%
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
                <el-col :span="24" v-if="formInfo.state > 5">
                    <el-form-item label="所提交资料：">
                    <el-col :span="24" class="text-left" v-for="(item,index) in formCheckArr" :key="index">
                        <el-link class="text-center" target="_blank" :href="downUrl + item.fileUrl" :underline="false" style="margin-left:15px">{{item.taskName}}</el-link>
                    </el-col>  
                    </el-form-item>
                </el-col>
            </el-form>
                    
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeTrueInfo">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>


<script>
import { callbackify } from 'util';
import base from '../../request/base';
import Step from './Step'
    export default{

        data(){

            return{
                msg:'任务管理',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
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
                    addressValue:'',
                    start_date:'',
                    end_time:'',
                    agent:'',
                    agent_name:'',
                    province_id:'',
                    city_id:'',
                    task_content:[]
                },
                stepDescription:'',
                stepName:'',
                decideDialog: 0,
                keyword:'',
                status:'',
                pid:'',
                cid:'',
                taskType:'',
                typeArr:[],
                typeObjs:{},
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
                radio: '2',
                textarea: '',
                downUrl:'',
                file_name:'',
                file_path:'',
                id:'',
                downStatus: 0,
                clickStatus: 1,
                capital: [],
                city: [],
                capitalId: '',
                cityId: '',
                dialogVisibleCheck:false,
                dialogVisibleInfo: false,
                formCheck:{},
                formInfo:{},
                task_my:[],
                task_content:[],
                formCheckArr:[],
                taskFileList:[],
                id:'',
                formCheckFileName:'',
                formCheckFileUrl:'',
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
        components:{
			'v-Step' : Step,
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
                this.currentPage = 1;
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
                this.currentPage = 1;
                this.taskAction();
            },
            //发布信息展示
            handleClickSubmit(row){
                this.$router.push({
                    path:'/TaskAdd/'+ row.taId
                })
            },
            //确认
            handleClickAff(row){
                 this.$router.push({
                    path:'/TaskAff/'+ row.taId
                })
            },
            //验收信息
            handleClickCheck(row){
                let params = {taId : row.taId}
                this.$api.list.taskInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        let data = res.data.data;
                        this.formCheck = data.taskInfo;
                        this.taskFileList = data.taskFileList;
                        this.id = data.taskInfo.taId;
                        this.task_my = data.taskContentList;
                        this.task_content = data.taskDistList;
                        this.dialogVisibleCheck = true;
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
            //数据提交
            saveEditPost(){
                let thef = this;
                if(thef.radio == 5 && !thef.textarea){
                    thef.$message.error('请先输入不通过原因');
                    return false
                }
                let params = {
                    id: thef.id,
                    status: thef.radio,
                    ramks: thef.textarea
                };
                thef.$api.list.acceptanceTaskPost(params).then(res=> {
                    console.log(res);
                    if(res.data.code == 1){
                        this.$message.success(res.data.msg);
                        this.dialogVisible = false;
                        this.taskAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //查看
            handleClickInfo(row) {
                let params = {taId : row.taId}
                this.$api.list.taskInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        let data = res.data.data;
                        this.formInfo = data.taskInfo;
                        this.formInfo.state = row.taState;
                        if(row.taState > 6){
                            this.formCheckArr = data.taskFileList;
                        }
                        this.task_my = data.taskContentList;
                        this.task_content = data.taskDistList;
                        this.dialogVisibleInfo = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //删除回调
            callbackit(){
                //获取用户信息
                let params = {taId:this.deleteId}
                this.$api.list.taskDelete(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('删除成功！');
                        this.taskAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //撤回回调
            callbackitRecall(){
                //获取用户信息
                let params = {taId:this.deleteId}
                this.$api.list.taskRecall(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('撤回成功！');
                        this.taskAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //催单回调
            callbackitReminder(){
                //获取用户信息
                let params = {taId:this.deleteId}
                this.$api.list.taskReminder(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('催单成功！');
                        this.taskAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //删除
            handleClickDelete(row) {
                this.deleteId = row.taId;
                this.deleteIndex = row.index;
                this.utils.open("删除","是否确认删除"+row.taName,"warning",this.callbackit,"删除");
            },
            //撤回
            handleClickRecall(row){
                this.deleteId = row.taId;
                this.deleteIndex = row.index;
                this.utils.open("撤回","是否确认撤回"+row.taName,"warning",this.callbackitRecall,"撤回");
            },
            //催单
            handleClickReminder(row){
                this.deleteId = row.taId;
                this.deleteIndex = row.index;
                this.utils.open("催单","是否确认催单"+row.taName,"warning",this.callbackitReminder,"催单");
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
                this.dialogVisibleCheck = false;
                this.dialogVisibleInfo = false;
            },
            //验收弹窗关闭
             handleCloseCheck(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            //查看弹窗关闭
            handleCloseInfo(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            cancleBtnCheck(){
                this.dialogVisibleCheck = false;
            },
            cancleBtnInfo(){
                this.dialogVisibleInfo = false;
            },
            changeTrueInfo(){
                this.dialogVisibleInfo = false;
            },
            //新增、修改、查看弹窗确定按钮
            changeTrue(){
                let decide = this.decideDialog;
                if(decide == 1){
                    this.clickStatus = 1;
                    this.$router.push({
                        path:'/TaskAdds/'+ this.templateId
                    })
                }
                this.dialogVisible = false;   
            },
            //模板新增
            changeTrues(){
                let decide = this.decideDialog;
                if(decide == 1){
                    this.clickStatus = 1;
                    this.$router.push({
                        path:'/TaskAdds/'+ this.templateId
                    })
                }
                this.dialogVisible = false;   
            },
            //验收
            changeTrueCheck(){
                let thef = this;
                if(thef.radio == 3 && !thef.textarea){
                    thef.$message.error('请先输入不通过原因');
                    return false
                }
                let params = {
                    taId: thef.id,
                    state: thef.radio,
                    reason: thef.textarea
                };
                thef.$api.list.acceptanceTaskPost(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.$message.success('操作成功！');
                        this.dialogVisibleCheck = false;
                        this.taskAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
           
            // 任务模板列表加载方法
            taskAction(){
                let params = {};
                params.capitalId = this.capitalId;
                params.cityId = this.cityId;
                params.state = this.status;
                params.taskName = this.keyword;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.taskList(params).then(res=> {
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
            adds(){
                this.$router.push({
                    path:'/TaskAdd/'+ 0
                })
            },
            add(){
                this.decideDialog = 1;
                this.clickStatus = 0;
                this.diaWidth = '450px';
                this.dialogTitle = '选择任务模板：';
                //获取所有任务模板
                this.$api.list.taskTemplateSelect().then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        let data = res.data.data;
                        this.templateArr = data.list;
                        this.dialogVisible = true;
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