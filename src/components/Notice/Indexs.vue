<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">消息通知</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top20">
                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" prop="id" width="28"></el-table-column>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="msgTitle" label="标题" width="120"></el-table-column>
                        <el-table-column prop="msgContent" label="内容" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="msgOpt" label="发布人" width="120"></el-table-column>
                        <el-table-column prop="createTime" label="发布时间" width="180"></el-table-column>
                        <el-table-column label="状态" width="100" show-overflow-tooltip>
                            <template slot-scope="scope">
                               <span v-show="scope.row.isLook == 1">未读</span>
                               <span v-show="scope.row.isLook == 2">已读</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClick(scope.row)" type="text" size="small" class="color-yellow cursor">查看</span>
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
        <el-dialog title="查看通知: " :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="通知标题：">
                    <span>{{form.title}}</span>
                </el-form-item>
                <el-form-item label="通知内容：">
                    <span>{{form.content}}</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer text-center">
                <el-button @click="cancleBtn('您已取消查看')">取 消</el-button>
                <el-button type="primary" @click="changeTrue">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>


<script>
    export default{

        data(){

            return{
                msg:'通知公告',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                keyWord:'',
                dialogVisible: false,
                form:{
                    title:'',
                    content:''
                }
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
                this.noticeAction();
                console.log(`当前页: ${val}`);
            },
            //查看
            handleClick(row) {
                let params = {msgId:row.msgId};
                this.$api.list.noticeListsInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        let data = res.data.data.tbMsgInfo;
                        this.form.title = data.msgTitle;
                        this.form.content = data.msgContent;
                        this.dialogVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
                
            },
            //弹窗关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            cancleBtn(msg){
                this.dialogVisible = false;
			    this.$message(msg);
            },
            changeTrue(){
                this.dialogVisible = false;
            },
            //搜索
            search(){
                this.currentPage = 1;
                this.noticeAction();
            },
            // 通知消息加载方法
            noticeAction(){
                let params = {};
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.noticeLists(params).then(res=> {
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
            this.noticeAction();
        },
        mounted(){}

    }
</script>

<style lang="scss">
    
</style>