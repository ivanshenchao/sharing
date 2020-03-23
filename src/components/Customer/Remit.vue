<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">打款任务</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
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
                        <el-table-column prop="taName" label="任务名称"></el-table-column>
                        <el-table-column prop="conCount" label="任务总量"></el-table-column>
                        <el-table-column prop="conTotalPrice" label="任务总价"></el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope">
                                <span v-show="scope.row.taState == 7">待打款</span>
                                <span v-show="scope.row.taState == 8">已完成</span>
                                <span v-show="scope.row.taState == 9">超期</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="70" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.taState == 7" @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">打 款</span>
                                <span v-show="scope.row.taState != 7" @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span>
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
            <el-row>
                <el-col :span="24" class="margin-left20 margin-right20 text-center font-weight">
                    <el-col :span="3">姓名</el-col>
                    <el-col :span="3">打款金额</el-col>
                    <el-col :span="6">身份证号</el-col>
                    <el-col :span="6">银行卡号</el-col>
                    <el-col :span="6">开户行</el-col>
                </el-col>
                <el-col :span="24" class="margin-left20 margin-right20 text-center margin-top10" v-for="(item,index) in remitArr" :key="index">
                    <el-col :span="3">{{item.accName}}</el-col>
                    <el-col :span="3">{{item.totalMoney}}</el-col>
                    <el-col :span="6">{{item.idCard}}</el-col>
                    <el-col :span="6">{{item.bankCard}}</el-col>
                    <el-col :span="6">{{item.bankName}}</el-col>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已关闭窗口')">关 闭</el-button>
                <el-button v-if="remitButton == 1" type="primary" @click="changeTrue">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>


<script>
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
                dialogTitle: '打款: ',
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
                remitButton:'',
                remitArr: [],
                remitId:''
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
            //打款
            handleClickEdit(row) {
                let params = {taId : row.taId}
                this.$api.list.getRemitInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.remitArr = res.data.data.list;
                        this.remitButton = 1;
                        this.dialogVisible = true;
                        this.remitId = row.taId;
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
                this.$api.list.getRemitInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.remitArr = res.data.data.list;
                        this.remitButton = 0;
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
                this.getNewToken(this.remitBack)
            },
            remitBack(data){
                let params = {
                    taId :this.remitId,
                    submitToken :data
                    };
                this.$api.list.insertRemit(params).then(res=> {
                        console.log(res);
                        if(res.data.status == 200){
                            this.$message.success('打款成功');
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
                let params = {};
                params.capitalId = this.capitalId;
                params.cityId = this.city;
                params.keyWord = this.keyWord;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getRemitList(params).then(res=> {
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