<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>客服服务</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">代理团队</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新增团队</div>
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
                                <el-select v-model="cityId" filterable clearable placeholder="请选择城市" @change="selectCity">
                                    <el-option v-for="item in city" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入代理团队名称、联系人"></el-input>
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
                        <el-table-column prop="agName" label="代理团队名称"></el-table-column>
                        <el-table-column prop="agConect" label="联系人"></el-table-column>
                        <el-table-column prop="agConectPhone" label="联系方式"></el-table-column>
                        <el-table-column label="所在地区" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.capitalName}}{{scope.row.cityName}}</template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
                        <el-table-column label="操作" width="200" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">修 改</span><span class="padding-left5 padding-right5 color-silver">|</span>
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
        <!-- 新增模板 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="团队名称：">
                    <el-input v-model="form.agName" placeholder="请输入团队名称" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="所在省份：">
                     <el-select v-model="form.capitalId" filterable clearable placeholder="请选择省份" class="width300" @change="selectCapitalAdd">
                        <el-option v-for="item in capital" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在城市：">
                    <el-select v-model="form.cityId" filterable clearable placeholder="请选城市" class="width300">
                        <el-option v-for="item in cityAdd" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="具体地址：">
                    <el-input v-model="form.agAddress" placeholder="请输入具体地址" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input v-model="form.agConect" placeholder="请输入联系人姓名" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input v-model="form.agConectPhone" placeholder="请输入联系方式" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="营业执照：">
                    <el-upload :action="url" :headers="myHeaders"  accept=".png,.jpg,.jpeg,.bmp,.tif" :show-file-list="showFile" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="responseAction">
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
        <el-dialog title="修改代理团队：" :visible.sync="dialogEditVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="form" label-width="120px">
                <el-form-item label="团队名称：">
                    <el-input v-model="forms.agName" placeholder="请输入团队名称" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="所在省份：">
                     <el-select v-model="forms.capitalId" filterable clearable placeholder="请选择省份" class="width300" @change="selectCapitalAdds">
                        <el-option v-for="item in capital" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在城市：">
                    <el-select v-model="forms.cityId" filterable clearable placeholder="请选城市" class="width300">
                        <el-option v-for="item in cityAdd" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="具体地址：">
                    <el-input v-model="forms.agAddress" placeholder="请输入具体地址" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input v-model="forms.agConect" placeholder="请输入联系人姓名" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input v-model="forms.agConectPhone" placeholder="请输入联系方式" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="营业执照：">
                    <el-upload :action="url" :headers="myHeaders"  accept=".png,.jpg,.jpeg,.bmp,.tif" :show-file-list="showFiles" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="responseActions">
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
        <!-- 查看模板 -->
        <el-dialog title="查看代理团队：" :visible.sync="dialogInfoVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="form" label-width="120px">
                <el-form-item label="团队名称：">
                    {{forms.agName}}
                </el-form-item>
                <el-form-item label="所在省份：">
                     {{forms.capitalName}}
                </el-form-item>
                <el-form-item label="所在城市：">
                    {{forms.cityName}}
                </el-form-item>
                <el-form-item label="具体地址：">
                    {{forms.agAddress}}
                </el-form-item>
                <el-form-item label="联系人：">
                    {{forms.agConect}}
                </el-form-item>
                <el-form-item label="联系方式：">
                    {{forms.agConectPhone}}
                </el-form-item>
                <el-form-item label="营业执照：">
                    <img :src="imageUrl" class="avatar">
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
import base from '../../request/base';
import store from '../../vuex/store.js';
    export default{

        data(){

            return{
                msg:'客服服务--代理团队',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                capitalId:'',
                cityId: '',
                capital:[],
                city:[],
                cityAdd:[],
                dialogVisible: false,
                dialogEditVisible: false,
                dialogInfoVisible: false,
                dialogTitle: '新增团队: ',
                form:{
                    agName:'',
                    capitalId:'',
                    cityId:'',
                    agAddress:'',
                    agConect:'',
                    agConectPhone:'',
                    agCreditUrl:'',
                    fileId: '',
                },
                forms:{
                    agName:'',
                    capitalId:'',
                    cityId:'',
                    agAddress:'',
                    agConect:'',
                    agConectPhone:'',
                    agCreditUrl:'',
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
                imageUrls:'',
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
            selectCapitalAdd(){
                let parmas = {capitalId : this.form.capitalId};
                this.$api.list.getCity(parmas).then(res=> {
                    if(res.data.status == 200){
                        this.cityAdd = res.data.data.list;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            selectCapitalAdds(){
                 this.forms.cityId = '';
                let parmas = {capitalId : this.forms.capitalId};
                this.$api.list.getCity(parmas).then(res=> {
                    if(res.data.status == 200){
                        this.cityAdd = res.data.data.list;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            selectCity(){
                this.typeAction();
            },
            //修改
            handleClickEdit(row) {
                let params = {agId : row.agId}
                this.$api.list.getAgentInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.forms = res.data.data.agent;
                        this.imageUrls = this.downUrl+res.data.data.file.fileUrl;
                        if(this.forms.capitalId !=''&& this.forms.capitalId!= 0){
                            let parmas = {capitalId : this.forms.capitalId};
                            this.$api.list.getCity(parmas).then(res=> {
                                if(res.data.status == 200){
                                    this.cityAdd = res.data.data.list;
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                            }).catch(error=>{
                                console.log(error);
                            })
                        }
                        this.decideDialog = 1;
                        this.dialogEditVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
                
            },
            handleClickInfo(row){
                this.dialogInfoVisible = true;
                let params = {agId : row.agId}
                this.$api.list.getAgentInfo(params).then(res=> {
				console.log(res);
                    if(res.data.status == 200){
                        this.forms = res.data.data.agent;
                        this.imageUrl = this.downUrl+res.data.data.file.fileUrl;
                        this.dialogInfoVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //删除回调
            callbackit(index){
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
            //删除
            handleClickDelete(row) {
                this.typeId = row.agId;
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
            changeEditTrue(){
                this.getNewToken(this.editBack);
            },
            changeInfoTrue(){
                this.dialogInfoVisible = false;
            },
            //新增返回函数
            addBack(data){
                let params = this.form;
                params.submitToken = data;
                this.$api.list.insertAgent(params).then(res=> {
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
                this.$api.list.editAgent(params).then(res=> {
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
                params.capitalId = this.capitalId;
                params.cityId = this.city;
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getAgentList(params).then(res=> {
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
                this.form={
                    agName:'',
                    capitalId:'',
                    cityId:'',
                    agAddress:'',
                    agConect:'',
                    agConectPhone:'',
                    agCreditUrl:'',
                    fileId: '',
                };
                this.imageUrl = '';
                this.decideDialog = 1;
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
</style>