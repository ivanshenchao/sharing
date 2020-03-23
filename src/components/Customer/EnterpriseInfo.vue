<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>客服服务</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">企业信息</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新增企业</div>
                        </el-col>
                        <el-row type="flex" justify="end">
                            <el-col class="width150 text-right color-black font-size16 line-height35">
                                <span>所在地区：</span>
                            </el-col>
                            <el-col :span="4" class="margin-right20">
                                <el-select v-model="capitalId" filterable clearable placeholder="请选择省份" @change="selectCapital">
                                    <el-option v-for="item in capital" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" class="margin-right20">
                                <el-select v-model="cityId" filterable clearable placeholder="请选择任城市" @change="selectCity">
                                    <el-option v-for="item in city" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入企业名称、联系人"></el-input>
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
                        <el-table-column prop="comConect" label="联系人"></el-table-column>
                        <el-table-column prop="comConectPhone" label="联系方式"></el-table-column>
                        <el-table-column label="所在地区" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.capitalName}}{{scope.row.ctiyName}}</template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
                        <el-table-column label="协议状态">
                            <template slot-scope="scope"><span v-show="scope.row.comTreState == 1">未签约</span><span v-show="scope.row.status == 0">已签约</span></template>
                        </el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickHidde(scope.row)" v-show="scope.row.comTreState == 1" type="text" size="small" class="color-yellow cursor">上传协议</span><span v-show="scope.row.comTreState == 1" class="padding-left5 padding-right5 color-silvers">|</span>
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">修 改</span>
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
        <el-dialog title="上传协议" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="选择文件："></el-form-item>
                <div class="submit text-center">
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                :action="url"
                                :headers="myHeaders"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :limit="1"
                                :on-success="responseAction">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <div slot="tip" class="el-upload__tip"></div>
                            </el-upload>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>


<script>
import base from '../../request/base';
import store from '../../vuex/store.js';
import { callbackify } from 'util';
    export default{

        data(){

            return{
                msg:'客服服务--企业信息',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                capitalId:'',
                cityId: '',
                capital:[],
                city:[],
                dialogVisible: false,
                dialogTitle: '新增任务类型: ',
                form:{
                    title:'123',
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
                comId: '',
                fileId:'',
                fileList:[],
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
            //下拉加载城市
            selectCapital(){
                this.cityId = '';
                //获取当前省份城市
                if(this.capitalId == ''){
                    this.typeAction();
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
                this.typeAction();
            },
            selectCity(){
                this.typeAction();
            },
            //资料提交
            //上传
            responseAction(response){
                console.log(response);
                this.fileId = response.data.fileId;
            },
            handleRemove(file, fileList) {
                this.fileId = '';
                console.log(2);
            },
            handlePictureCardPreview(file) {
                 console.log(3);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleClickHidde(row){
     			this.fileId = '';
				this.fileList = [];
                this.comId = row.comId;
                this.dialogVisible = true;
            },
            //修改
            handleClickEdit(row) {
                this.$router.push({
                    path:'/EnterpriseAdd/'+ row.comId
                })
            },
            //删除回调
            callbackit(index){
			let params = {comId:this.typeId};
                this.$api.list.deleteCompany(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('删除成功！');
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
                this.typeId = row.comId;
                this.utils.open("删除","是否确认删除"+row.comName,"warning",this.callbackit,"删除");
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
                let params = {
                    comId :this.comId,
                    comTreFileId:this.fileId
                };
                this.$api.list.updateComTreUrl(params).then(res=> {
                        if(res.data.status == 200){
                            this.$message.success('保存成功！');
                            this.dialogVisible = false;
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
                let page = this.currentPage;
                let params = {};
                params.capitalId = this.capitalId;
                params.cityId = this.city;
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getCompanyList(params).then(res=> {
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
                this.$router.push({
                    path:'/EnterpriseAdd/0'
                })
            },
            //搜索
            search(){
                this.currentPage = 1;
                this.typeAction();
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