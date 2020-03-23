<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">合同信息</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table" style="padding: 60px 30px">
            <el-row>
                <el-col :span="24" class="table padding-left20 padding-right20 margin-top5 background-white">
                    <el-row>
                <el-col :span="6" class="font-size16 padding-left20 margin-top20">
                    <p>甲方：{{forms.firstPart}}</p>
                    <p>乙方：{{forms.accName}}</p>
                    <p>发起时间：{{forms.createTime}}</p>
                    <p>合同状态：
                        <span v-if="forms.conState == 1">甲方发起</span>
                            <span v-if="forms.conState == 2">甲方签署</span>
                            <span v-if="forms.conState == 3">已查看</span>
                            <span v-if="forms.conState == 4">已签署</span>
                            <span v-if="forms.conState == 5">合同生效</span>
                    </p>
                </el-col>
                <el-col :span="18" class="margin-top50 padding-left20 padding-right20 font-size16">
                    <el-col :span="5">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 1}"></span> 
                           <span class="dialog-line">
                               <div class="dialog-line-block"></div>
                           </span>
                        </div>
                        <p class="dialog-title">{{forms.firstPart}}发起</p>  
                    </el-col>
                    <el-col :span="5">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 2}"></span> 
                           <span class="dialog-line">
                               <div class="dialog-line-block"></div>
                           </span>
                        </div>
                        <p class="dialog-title">{{forms.firstPart}}签署</p>  
                    </el-col>
                    <el-col :span="5">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 3}"></span> 
                           <span class="dialog-line">
                               <div class="dialog-line-block"></div>
                           </span>
                        </div>
                        <p class="dialog-title">{{forms.accName}}查看</p>  
                    </el-col>
                    <el-col :span="5">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 4}"></span> 
                           <span class="dialog-line">
                               <div class="dialog-line-block"></div>
                           </span>
                        </div>
                        <p class="dialog-title">{{forms.accName}}签署</p>  
                    </el-col>
                    <el-col :span="3">
                        <div class="dialog-status">
                           <span class="dialog-circle" :class="{'active': forms.conState == 5}"></span> 
                        </div>
                        <p class="dialog-title">合同生效</p>  
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <h3 class="text-center line-space1">{{forms.conName}}平台服务条款</h3>
                    <iframe :src="forms.templateUrl" frameborder="0" width="100%" style="height: 26rem"></iframe>
                </el-col>
            </el-row>
                </el-col>
            </el-row>
        </section>
    </div>

</template>


<script>
    export default{

        data(){

            return{
                msg:'区域财务',
                tableData: [],
                multipleSelection: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                keyword:'',
                forms:{},
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
                this.$api.list.privacys().then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.forms = res.data.data;
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
.el-dialog__body{
    padding: 0 30px !important;
}
.dialog-status{
    height: 20px;
}
.dialog-circle{
    margin: 0;
    padding: 5px 15px;
    background-color: #999;
    border-radius: 50%;
}
.dialog-line-block{
    margin-top: -10px;
    margin-left: 40px;
    margin-right: 10px;
    padding: 1px 20px;
    border-top: 2px solid #999;
}
.dialog-title{
    width: 90px;
}
.dialog-status .active{
    background-color: blue;
}
.el-link.el-link--default{
    color: white;
}

</style>