<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">banner</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新增图片</div>
                        </el-col>
                        <el-row type="flex" justify="end">
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入图片标题、图片类型"></el-input>
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
                        <el-table-column prop="banTitle" label="标题"></el-table-column>
                        <el-table-column label="类型" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.banType == 1">
                                    首页
                                </span>
                                <span v-show="scope.row.banType == 2">
                                    资讯
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="图片" show-overflow-tooltip>
                            <template slot-scope="scope"><img :src="downUrl+scope.row.banLinkUrl" alt="" style="height:50px;width: auto;"></template>
                        </el-table-column>
                        <el-table-column prop="banSort" label="排序"></el-table-column>
                        <el-table-column label="状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.isDel == 1">
                                    使用
                                </span>
                                <span v-show="scope.row.isDel == 2">
                                    停用
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">修 改</span><span class="padding-left5 padding-right5 color-silver">|</span>
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
                <el-form-item label="选择类型：">
                     <el-select v-model="form.banType" placeholder="请选择类型" class="width300">
                        <el-option label="首页" value="1"></el-option>
                        <el-option label="资讯" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="团队名称：">
                    <el-input v-model="form.banTitle" placeholder="请输入图片标题" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="排序：">
                    <el-input v-model="form.banSort" placeholder="请输入序号（1-99）" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="上传图片：">
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
            <el-form ref="forms" :model="forms" label-width="120px">
                <el-form-item label="选择类型：">
                     <el-select v-model="forms.banType" placeholder="请选择类型" class="width300">
                        <el-option label="首页" value="1"></el-option>
                        <el-option label="资讯" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="团队名称：">
                    <el-input v-model="forms.banTitle" placeholder="请输入图片标题" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="排序：">
                    <el-input v-model="forms.banSort" placeholder="请输入序号（1-99）" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="上传图片：">
                    <el-upload :action="url" :headers="myHeaders"  accept=".png,.jpg,.jpeg,.bmp,.tif" :show-file-list="showFile" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="responseActions">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
                    {{forms.agCreditUrl}}
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
                msg:'客服服务--banner',
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
                dialogTitle: '新增banner: ',
                form:{
                    banType:'',
                    capitalId:'',
                    fileId:'',
                    banLinkUrl:'',
                    banSort:'',
                },
                forms:{
                    banType:'',
                    capitalId:'',
                    fileId:'',
                    banLinkUrl:'',
                    banSort:'',
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
                this.form.banLinkUrl = response.data.fileUrl;
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
                this.forms.banLinkUrl = response.data.fileUrl;
                this.showFiles = false;
                this.forms.fileId = response.data.fileId;
                console.log(this.imageUrl);
            },
            selectCity(){
                this.typeAction();
            },
            //修改
            handleClickEdit(row) {
                this.forms = row;
                this.forms.banType = this.forms.banType.toString();
                this.imageUrl = this.downUrl+this.forms.banLinkUrl;
                this.decideDialog = 1;
                this.dialogEditVisible = true;
            },
            handleClickInfo(row){
                this.dialogInfoVisible = true;
                let params = {agId : row.agId}
                this.$api.list.getAgentInfo(params).then(res=> {
                    if(res.data.status == 200){
                        this.forms = res.data.data.agent;
                        this.dialogInfoVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //删除回调
            callbackit(){
                let params = {banId:this.typeId};
                this.$api.list.deleteBanner(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('删除成功！');
                        this.dialogVisible = false;
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
                this.typeId = row.banId;
                this.utils.open("删除","是否确认删除"+row.banTitle,"warning",this.callbackit,"删除");
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
                this.$api.task.insertBanner(params).then(res=> {
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
                this.$api.task.updateBanner(params).then(res=> {
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
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getbannersList(params).then(res=> {
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
                    banType:'',
                    capitalId:'',
                    fileId:'',
                    banLinkUrl:'',
                    banSort:'',
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
</style>