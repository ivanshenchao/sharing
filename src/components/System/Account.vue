<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">账号管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新增账号</div>
                        </el-col>
                        <el-row type="flex" justify="end">
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入登录名、姓名、联系方式"></el-input>
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
                        <el-table-column prop="accAccount" label="登录名"></el-table-column>
                        <el-table-column prop="accName" label="姓名"></el-table-column>
                        <el-table-column prop="roleName" label="角色名称"></el-table-column>
                        <el-table-column prop="accPhone" label="联系方式"></el-table-column>
                        <el-table-column prop="relateName" label="所属单位"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
        <el-dialog title="新增账号" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="登录名：">
                    <el-input v-model="form.accAccount" placeholder="请输入登录名" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="form.accName" placeholder="请输入姓名" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input v-model="form.accPhone" placeholder="请输入联系方式" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="所属平台：">
                    <el-radio v-model="form.terrace" label="1">药企</el-radio>
                    <el-radio v-model="form.terrace" label="2">代理团队</el-radio>
                </el-form-item>
                <el-form-item label="所属单位：">
                     <el-select v-if="form.terrace == 1" v-model="form.relateId" filterable placeholder="请选择药企" class="width300">
                        <el-option v-for="item in capital" :key="item.comId" :label="item.comName" :value="item.comId"></el-option>
                    </el-select>
                    <el-select v-if="form.terrace == 2" v-model="form.relateId" filterable placeholder="请选代理团队" class="width300">
                        <el-option v-for="item in capitals" :key="item.agId" :label="item.agName" :value="item.agId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色：">
                    <el-radio v-show="form.terrace == 1" v-model="form.roleId" label="2">药企</el-radio>
                    <el-radio v-show="form.terrace == 2" v-model="form.roleId" label="3">医药代理商</el-radio>
                    <el-radio v-show="form.terrace == 2" v-model="form.roleId" label="4">医药代表</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消新增')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改模板 -->
        <el-dialog title="修改账号：" :visible.sync="dialogEditVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="forms" label-width="120px">
                <el-form-item label="登录名：">
                    <el-input v-model="forms.accAccount" placeholder="请输入登录名" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                    <el-input v-model="forms.accName" placeholder="请输入姓名" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input v-model="forms.accPhone" placeholder="请输入联系方式" class="width300"></el-input>
                </el-form-item>
                <el-form-item label="所属平台：">
                    <el-radio v-model="forms.terrace" label="1">药企</el-radio>
                    <el-radio v-model="forms.terrace" label="2">代理团队</el-radio>
                </el-form-item>
                <el-form-item label="所属单位：">
                     <el-select v-if="forms.terrace == 1" v-model="forms.relateId" filterable placeholder="请选择药企" class="width300">
                        <el-option v-for="item in capital" :key="item.comId" :label="item.comName" :value="item.comId"></el-option>
                    </el-select>
                    <el-select v-if="forms.terrace == 2" v-model="forms.relateId" filterable placeholder="请选代理团队" class="width300">
                        <el-option v-for="item in capitals" :key="item.agId" :label="item.agName" :value="item.agId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色：">
                    <el-radio v-if="forms.terrace == 1" v-model="forms.roleId" label="2">药企</el-radio>
                    <el-radio v-if="forms.terrace == 2" v-model="forms.roleId" label="3">医药代理商</el-radio>
                    <el-radio v-if="forms.terrace == 2" v-model="forms.roleId" label="4">医药代表</el-radio>
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
    export default{

        data(){

            return{
                msg:'系统管理--账号管理',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                capital:[],
                capitals:[],
                dialogVisible: false,
                dialogEditVisible: false,
                dialogInfoVisible: false,
                form:{
                    accAccount:'',
                    accName:'',
                    accName:'',
                    terrace:'1',
                    relateId:'',
                    roleId:'',
                },
                forms:{
                    accAccount:'',
                    accName:'',
                    accName:'',
                    terrace:'1',
                    relateId:'',
                    roleId:'',
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
            handleClickEdit(row) {
                this.getAllMedical();
                this.getAllAgent();
                let params = {accId : row.accId}
                this.$api.list.infoAccount(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        res.data.data.tbAccount.roleId = res.data.data.tbAccount.roleId.toString();
                        if(res.data.data.tbAccount.roleId == '2'){
                            res.data.data.tbAccount.terrace = '1';
                        }else{
                            res.data.data.tbAccount.terrace = '2';
                        }
                        this.forms = res.data.data.tbAccount;
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
                let params ={accId : this.typeId}
                this.$api.list.deletAccount(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('删除成功');
                        if(this.tableData.length<2){
                            this.currentPage = this.currentPage - 1;
							this.typeAction();
                        }
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
                this.typeId = row.accId;
                this.utils.open("删除","是否确认删除"+row.accName,"warning",this.callbackit,"删除");
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
                this.$api.list.insertAccount(params).then(res=> {
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
                this.$api.list.editAccount(params).then(res=> {
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
            //获取所有药企
            getAllMedical(){
                this.$api.list.getAllMedical().then(res=> {
                    if(res.data.status == 200){
                        this.capital = res.data.data.companyList;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })       
            },
            //获取所有代理商
            getAllAgent(){
                this.$api.list.getAllAgent().then(res=> {
                    if(res.data.status == 200){
                        this.capitals = res.data.data.agentList;
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
                params.roleId = '';
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getAccountList(params).then(res=> {
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
                this.form = {
                    accAccount:'',
                    accName:'',
                    accName:'',
                    terrace:'1',
                    relateId:'',
                    roleId:'',
                };
                this.getAllMedical();
                this.getAllAgent();
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