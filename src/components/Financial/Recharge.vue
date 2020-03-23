<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>财务管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">充值记录</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top20">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" prop="id" width="28"></el-table-column>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="comName" label="企业名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="invMoney" label="充值金额" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="createTime" label="充值时间" show-overflow-tooltip></el-table-column>
                        <el-table-column label="状态" width="150" show-overflow-tooltip>
                             <template slot-scope="scope">
                                <span v-show="scope.row.invState == 1">充值成功</span>
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
                this.rechargeAction();
                console.log(`当前页: ${val}`);
            },
            // 通知消息加载方法
            rechargeAction(){
                let params = {};
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.rechargeList(params).then(res=> {
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
            this.rechargeAction();
        },
        mounted(){}

    }
</script>

<style lang="scss">
    
</style>