<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>发票管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">申请记录</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top20">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" prop="id" width="28"></el-table-column>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="createTime" label="申请时间"></el-table-column>
                        <el-table-column prop="invoInvoice" label="发票抬头"></el-table-column>
                        <el-table-column prop="invoMoney" label="发票金额" show-overflow-tooltip></el-table-column>
                        <el-table-column label="状态" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.state == 1">待开票</span>
                                <span v-show="scope.row.state == 2">待邮寄</span>
                                <span v-show="scope.row.state == 3">待接收</span>
                                <span v-show="scope.row.state == 4">已完成</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.state == 1 && scope.row.isRemind == 1" @click="handleClickMake(scope.row)" type="text" size="small" class="color-yellow cursor">提醒开票</span>
                                <span v-show="scope.row.state == 2 && scope.row.isRemind != 2" @click="handleClickMake(scope.row)" type="text" size="small" class="color-yellow cursor">提醒邮寄</span>
                                <span v-show="scope.row.state == 3" @click="handleClickMakes(scope.row)" type="text" size="small" class="color-yellow cursor">确认接收</span>
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
    </div>

</template>


<script>
    export default{

        data(){

            return{
                msg:'充值记录',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                typeId:'',
                typeIds:'',
                currState:'',
                status:''
            }
        },
        filters: {
            formatDate: function (value) {
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
                this.recordAction();
                console.log(`当前页: ${val}`);
            },
            //开票邮寄回调
            callbackit(index){
                let msg = '';
                let params = {};
                if(this.status == 1){
                    params ={
                        invoId : this.typeId,
                        state: 2
                    };
                    msg = '提醒成功';
                    this.$api.list.invoicRecordMake(params).then(res=> {
                        if(res.data.status == 200){
                            this.$message.success(msg);
                            this.recordAction();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                        
                    }).catch(error=>{
                        console.log(error);
                    })
                }else{
                    params ={
                        invoId : this.typeId,
                        state: 3
                    };
                    msg = '提醒成功';
                    this.$api.list.invoicRecordMake(params).then(res=> {
                        if(res.data.status == 200){
                            this.$message.success(msg);
                            this.recordAction();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                        
                    }).catch(error=>{
                        console.log(error);
                    })
                }
                console.log(params);
                
            },
            //开票邮寄
            handleClickMake(row) {
                this.typeId = row.invoId;
                this.status = row.state;
                if(row.state == 1){
                    this.utils.open("开票","是否确认开票"+row.invoMoney,"warning",this.callbackit,"开票");
                }else{
                    this.utils.open("邮寄","是否确认邮寄"+row.invoMoney,"warning",this.callbackit,"邮寄");
                }
                
            },
            //接收回调
            callbackits(index){
                let params ={
                    invoId : this.typeIds,
                    state : 4,
                    currState : this.currState
                    }
                this.$api.list.invoicRecordReceive(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('接收成功');
                        this.recordAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //接收
            handleClickMakes(row) {
                this.typeIds = row.invoId;
                this.currState = row.state;
                this.utils.open("接收","是否确认接收","warning",this.callbackits,"接收");
            },
            // 通知消息加载方法
            recordAction(){
                let params = {};
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.invoicRecordList(params).then(res=> {
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
        components:{},
        beforeMount(){
            // 通知消息加载
            this.recordAction();
        },
        mounted(){}

    }
</script>

<style lang="scss">
    
</style>