<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>财务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">我的财务</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <section class="admin-table">
            <div class="top_area_finance text-center">
                <h3 class="padding-top10 color-white">个人总收入</h3>
                <h2 class="color-white">{{balance}}</h2>
            </div>
            <el-row>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top5">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" prop="id" width="28"></el-table-column>
                        <el-table-column type="index" prop="index" width="50"></el-table-column>
                        <el-table-column prop="taskName" label="任务名称"></el-table-column>
                        <el-table-column prop="taskCount" label="任务总量"></el-table-column>
                        <el-table-column prop="taskTotalPrice" label="任务总价"></el-table-column>
                        <el-table-column prop="starTime" label="开始日期"></el-table-column>
                        <el-table-column prop="endTime" label="完成日期"></el-table-column>
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
                msg:'我的财务',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                keyword:'',
                balance:'',
                company_name:'',
                account:'',
                bank_of_deposit:'',
                exclusive_account:'',
                purpose:'',
                reminder:''
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
            
            // 任务模板列表加载方法
            taskAction(){
                let page = this.currentPage;
                let size = this.pageSize;
                this.$api.list.myFinanceList(page,size).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.tableData = res.data.data.list;
                        this.total = res.data.data.total;
                        let  countPrice = res.data.data.countPrice;
                        if(countPrice){
                            this.balance = res.data.data.countPrice;
                        }else{
                            this.balance = 0;
                        }
                        
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
        },
        beforeMount(){
            // 任务加载
            this.taskAction();
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
.top_area_finance{
    height: 150px;
    background-image: url("../../assets/images/management.png");
    background-size: cover;
    margin: 0 20px;
}
.recharge-item{
    width: 100%;
    border-bottom: 1px solid #999999
}
.recharge-div-item{
    line-height: 20px;
    height: 30px;
    width: 100%;
}
.recharge-item-lable{
    text-align: center;
}
.recharge-item-title{
    margin-left: 20px;
}

</style>