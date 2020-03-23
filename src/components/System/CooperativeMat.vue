<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">合作管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-row type="flex" justify="end">
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入姓名、联系方式)"></el-input>
                            </el-col>
                            <el-col style="width: 100px" class="text-right">
                                <div class="el-button-copy" @click="search"><i class="el-icon-search"></i> 搜索</div>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col class="tab">
                    <span class="tabSpan margin-right10" :class="{active:1 == tabIndex}" @click="addClass(1)">合作人员</span>
                    <span class="tabSpan" :class="{active:2 == tabIndex}" @click="addClass(2)">潜在关系</span>
                </el-col>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top5">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" prop="id" width="28"></el-table-column>
                        <el-table-column type="index" prop="index" width="50"></el-table-column>
                        <el-table-column prop="agConect" label="姓名"></el-table-column>
                        <el-table-column label="所在地区">
                            <template slot-scope="scope">
                                <span>{{scope.row.capitalName}}{{scope.row.cityName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="agArea" label="侧重地区"></el-table-column>
                        <el-table-column prop="agType" label="侧重类型"></el-table-column>
                        <el-table-column v-if="tabIndex == 2" prop="agDepart" label="侧重科室"></el-table-column>
                        <el-table-column label="操作" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.state == 2 && tabIndex == 1" @click="handleClickDelete(scope.row)" type="text" size="small" class="color-yellow cursor">开 启</span>
                                <span v-show="scope.row.state == 1 && tabIndex == 1" @click="handleClickDelete(scope.row)" type="text" size="small" class="color-yellow cursor">关 闭</span>
                                <span v-show="tabIndex == 2" @click="handleClickAdd(scope.row)" type="text" size="small" class="color-yellow cursor">添 加</span>
                                <span class="padding-left5 padding-right5">|</span>
                                <span @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span>
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
        <el-dialog title="查看" :visible.sync="dialogEditVisible" width="500px" :before-close="handleClose">
            <el-form ref="forms" :model="forms" label-width="120px">
                <el-form-item v-if="tabIndex == 2" label="代理商：">
                    <span>{{forms.agName}}</span>
                </el-form-item>
                <el-form-item label="姓 名：">
                    <span>{{forms.agConect}}</span>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <span>{{forms.agConectPhone}}</span>
                </el-form-item>
                <el-form-item label="所在地区：">
                    <span>{{forms.capitalName}}{{forms.cityName}}</span>
                </el-form-item>
                <el-form-item label="侧重科室：">
                    <span>{{forms.agDepart}}</span>
                </el-form-item>
                <el-form-item label="侧重地区：">
                    <span>{{forms.agArea}}</span>
                </el-form-item>
                 <el-form-item label="侧重类型：">
                    <span>{{forms.agType}}</span>
                </el-form-item>
                 <el-form-item label="其 他：">
                    <span>{{forms.agOther}}</span>
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
                msg:'系统管理--合作管理',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                capital:[],
                tabIndex:1,
                dialogVisible: false,
                dialogEditVisible: false,
                dialogInfoVisible: false,
                forms:{},
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
            //添加class
            addClass(data){
                if(this.tabIndex == data){
                    return false
                }else{
                    this.tabIndex = data;
                    this.currentPage = 1;
                    this.keyWord = '';
                    this.typeAction();
                }
            },
            //查看
            handleClickInfo(row) {
                if(this.tabIndex == 1){
                    let params = {caId : row.caId}
                    this.$api.list.getCoopMatAgentInfo(params).then(res=> {
                        console.log(res);
                        if(res.data.status == 200){
                            this.forms = res.data.data.comAgent;
                            this.dialogEditVisible = true;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
                }else{
                    let params = {agId : row.agId}
                    this.$api.list.getPotpMatAgentInfo(params).then(res=> {
                        console.log(res);
                        if(res.data.status == 200){
                            this.forms = res.data.data.agent;
                            this.dialogEditVisible = true;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
                }
            },
            //开启关闭回调
            callbackit(index){
                let params ={caId : this.typeId}
                this.$api.list.getCoopMatAgentOpen(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('开启成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //开启关闭
            handleClickDelete(row) {
                this.typeId = row.caId;
                if(row.state == 1){
                    this.$message.warning('亲，至少选择一个合作人员！');
                }else{
                    this.utils.open("开启","是否确认开启"+row.agConect,"warning",this.callbackit,"开启");
                }
                
            },
            //添加回调
            callbackitAdd(index){
                let params ={agId : this.typeId}
                this.$api.list.getPotpMatAgentAdd(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('添加成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //添加
            handleClickAdd(row) {
                this.typeId = row.agId;
                this.utils.open("添加","是否确认添加"+row.agName,"warning",this.callbackitAdd,"添加");
                
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
            changeEditTrue(){
                this.dialogEditVisible = false;
            },
            // 任务类型列表加载方法
            typeAction(){
                let params = {};
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                if(this.tabIndex == 1){
                    this.$api.list.getCoopMatAgent(params).then(res=> {
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
                }else{
                    this.$api.list.getPotpMatAgent(params).then(res=> {
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
                }
                
            },
            //新增
            add(){
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
.tab{
    padding: 0;
    margin: 0;
    color: #213b4e;
    font-size: 16px;
    margin-left: 20px;
}
.tab span{
    padding: 0 5px 5px 5px;
    cursor: pointer;
}
.tab .active{
    color: #409EFF;
    border-bottom: 2px solid #409EFF
}
</style>