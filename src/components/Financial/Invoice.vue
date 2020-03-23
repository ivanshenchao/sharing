<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>发票管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">发票申请</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top20">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" prop="id" width="50"></el-table-column>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="createTime" label="充值时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="invMoney" label="充值金额" show-overflow-tooltip></el-table-column>
                        <el-table-column label="状态" width="150" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.invState == 1">充值成功</span>
                                <span v-show="scope.row.invState == 2">完成</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <span @click="handleClickMake(scope.row)" type="text" size="small" class="color-yellow cursor">申请开票</span>
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
import { callbackify } from 'util';
    export default{
        data(){

            return{
                msg:'发票申请',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                typeId:''
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
            //申请发票
            callbackit(data){
                let params ={
                    invoId : this.typeId,
                    submitToken : data
                    }
                this.$api.list.invoiceDemand(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('申请发票成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
                // let data = this.$refs.multipleTable.selection;
                // let params = [];
                // data.forEach(element => {
                //     params.push(element.id)
                // });
                // this.$api.list.invoiceDemand(params).then(res=> {
                //     console.log(res);
                //     if(res.data.status == 200){
                //         this.$message.success('申请成功');
                //         this.recordAction();
                //     }else{
                //         this.$message.error(res.data.msg);
                //     }
                    
                // }).catch(error=>{
                //     console.log(error);
                // })
            },
            handleClickMake(row){
                this.typeId = row.invId;
                this.utils.open("开票","确认向平台提交开票申请："+row.invMoney,"warning",this.getNewToken,"开票");
            },
            // add(){
            //     if(this.$refs.multipleTable.selection.length == 0){
            //         this.$message.error('请先勾选所要申请发票');
            //     }else{
            //         this.utils.open("申请发票","是否确认申请发票","warning",this.callbackit,"申请发票");
            //     }
            // },
            // 通知消息加载方法
            recordAction(){
                let params = {};
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.invoiceList(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.tableData = res.data.data.list;
                        this.total = res.data.data.count;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //获取重复提交token，用户提交表单验证重复性
            getNewToken(){
                this.$api.list.getToken().then(res=> {
                    if(res.data.status == 200){
                        this.callbackit(res.data.data);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
        components:{},
        beforeMount(){},
        mounted(){
            // 通知消息加载
            this.recordAction();
        }

    }
</script>

<style lang="scss">
    
</style>