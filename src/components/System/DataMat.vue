<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">产品资料</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
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
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span>
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
        <!-- 查看模板 -->
        <el-dialog title="查看资料：" :visible.sync="dialogEditVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="forms" label-width="120px">
                <div style="margin-top: -20px">
                    <h5>资料详情：</h5>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资料名称：">
                            {{forms.materialName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资料类型：">
                            {{forms.prodTypeName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="关联产品：">
                            {{forms.prodName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业名称：">
                            {{forms.comName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="资料说明：">
                            {{forms.materialExplain}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="资料下载：">
                            <el-link class="text-center" target="_blank" :href="downUrl+forms.fileUrl" :underline="false">{{forms.fileName}}</el-link>
                        </el-form-item>
                    </el-col>
                </el-row>                
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
            //查看
            handleClickEdit(row) {
                let params = {materialId : row.materialId}
                this.$api.list.getDataInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.forms = res.data.data;
                        this.dialogEditVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
                
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
                this.dialogEditVisible = false;
            },
            changeEditTrue(){
                this.dialogEditVisible = false;
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
            
            //搜索
            search(){
                this.currentPage = 1;
                this.typeAction();
            },            
        },
        components:{},
        beforeMount(){
            // 任务类型加载
            this.typeAction(); 

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