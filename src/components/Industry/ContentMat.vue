<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>行业资讯</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">行业资讯</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-row>
                <el-col :span="24">
                    <el-row class="margin-top20 padding-left20 padding-right20">
                        <el-col :span="4">
                            <div class="el-button-copy" @click="add">新增内容</div>
                        </el-col>
                        <el-row type="flex" justify="end">
                            <el-col class="width150 text-right color-black font-size16 line-height35">
                                <span>选择分类：</span>
                            </el-col>
                            <el-col :span="4" class="margin-right20">
                                <el-select v-model="typeId" filterable clearable placeholder="请选择所属分类" @change="selectCapital">
                                    <el-option v-for="item in capital" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="margin-right10">
                                <el-input v-model="keyWord" placeholder="请输入文章名称"></el-input>
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
                        <el-table-column prop="newsTitle" label="文章名称"></el-table-column>
                        <el-table-column prop="typeName" label="所属分类"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
                        <el-table-column label="是否热点" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.isHot == 1">是</span>
                                <span v-show="scope.row.isHot == 2">否</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="设置热点" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-show="scope.row.isHot == 2">
                                    <span @click="handleClickSet(scope.row)" type="text" size="small" class="color-yellow cursor">设 置</span>
                                </span>
                                <span v-show="scope.row.isHot == 1">
                                    <span @click="handleClickSets(scope.row)" type="text" size="small" class="color-yellow cursor">取 消</span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span @click="handleClickEdit(scope.row)" type="text" size="small" class="color-yellow cursor">修 改</span><span class="padding-left5 padding-right5">|</span>
                                <span @click="handleClickInfo(scope.row)" type="text" size="small" class="color-yellow cursor">查 看</span><span class="padding-left5 padding-right5">|</span>
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
    </div>

</template>


<script>
import { callbackify } from 'util';
    export default{

        data(){

            return{
                msg:'行业资讯--内容管理',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                capital:[],
                dialogVisible: false,
                dialogEditVisible: false,
                dialogInfoVisible: false,
                form:{
                    comId:'',
                    comRate:''
                },
                forms:{
                    comRate:''
                },
                decideDialog: 0,
                keyWord:'',
                deleteId:'',
                typeId:'',
                typeIds:'',
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
                 this.$router.push({
                    path:'/ContentMatAdd/'+ row.newsId
                })
            },
            //查看
            handleClickInfo(row){
                sessionStorage.setItem("DetailsId", row.newsId);
                let routeUrl = this.$router.resolve({
                    path: "/Share/ShareDetails",
                });
                window.open(routeUrl.href, '_blank');
            },
            //删除回调
            callbackit(index){
                let params ={newsId : this.typeIds}
                this.$api.list.deleteCategoryContent(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('删除成功');
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
                this.typeIds = row.newsId;
                this.utils.open("删除","是否确认删除"+row.newsTitle,"warning",this.callbackit,"删除");
            },
            //设置回调
            callbackst(){
                let params = {
                newsId : this.typeIds,
                isHot : 1
                }
                this.$api.list.setHot(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('设置成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //设置
            handleClickSet(row) {
                this.typeIds = row.newsId;
                this.utils.open("设置","是否将设置"+row.newsTitle+"成热点","warning",this.callbackst,"设置");
            },
            //设置回调
            callbacksts(){
                let params = {
                newsId : this.typeIds,
                isHot : 2
                }
                this.$api.list.setHot(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('取消成功');
                        this.typeAction();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //设置
            handleClickSets(row) {
                this.typeIds = row.newsId;
                this.utils.open("取消","是否将取消"+row.newsTitle+"的热点","warning",this.callbacksts,"取消");
            },
            // 任务类型列表加载方法
            typeAction(){
                let params = {};
                params.newsTitle = this.keyWord;
                params.typeId = this.typeId;
                params.pageNo = this.currentPage;
                params.pageSize = this.pageSize;
                this.$api.list.getCategoryContentList(params).then(res=> {
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
                this.$router.push({
                    path:'/ContentMatAdd/0'
                })
            },
            //搜索
            search(){
                this.currentPage = 1;
                this.typeAction();
            },
            //选择
            selectCapital(){
                this.currentPage = 1;
                this.typeAction();
            },
                
        },
        components:{},
        beforeMount(){
            // 任务类型加载
            this.typeAction();   
            //获取所有类型
            this.$api.list.getCategoryContentType().then(res=> {
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