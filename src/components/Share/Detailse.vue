<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="Industry">
       <el-row>
           <el-col :span="24" class="industry-index margin-bottom20">
               <el-col :span="14" class="industry-index-content">
                   <el-col :span="24" class="margin-top20">
                       <el-col :span="24" class="font-size16 margin-top20 margin-bottom20">
                           <el-col :span="6" class="font-weight">详情</el-col>
                           <el-col :span="18" class="color-silver text-right"><i class="el-icon-user-solid"></i>您当前位置: <el-link href="../#/ShareIndex"><span class="font-size16">首页</span></el-link> // <el-link href="../#/ShareIndustry"><span class="font-size16">行业资讯</span></el-link> // <el-link href="../#/InformationMore"><span class="font-size16">行业资讯更多</span></el-link> // <span class="color-blue">详情</span></el-col>
                       </el-col> 
                   </el-col>
                   <el-col :span="24" class="margin-top20 margin-bottom20 padding20 background-white">
                        <el-col :span="24" class="font-size16 font-weight">{{details.newsTitle}}</el-col>
                        <el-col :span="24" class="font-size14 color-silver margin-top10"><span class="padding-left10 margin-right20">来源：<span v-if="details.newsCome == 1">转载</span><span v-if="details.newsCome == 2">原创</span></span><span><i class="el-icon-time"></i>时间：{{details.createTime}}</span></el-col>
                    </el-col>  
                    <el-col :span="24" class="industry-index-content-company margin-top20 background-white padding20">
                        <div v-html="details.newsContent"></div>
                    </el-col>
                </el-col>
   
           </el-col>
        
           <!-- 脚部 -->
           <el-col :span="24" class="margin-top20">
               <v-Footer></v-Footer>
           </el-col>
           
       </el-row>
    </div>

</template>
<script>
import Footer from './Footer'
    export default{
        data(){

            return{
                msg:'行业资讯',
                codIndex: 1,
                tabIndex: -1,
                tabIndexs: -1,
                tabIndexc: -1,
                pickType: 0,
                pickArea: 0,
                pickCity: 0,
                task:[1,1,1,1,1,1],
                taskShow:[1,1,1,1,1,1],
                hot:[1,1,1,1,1,1],
                status:'',
                submitDate:'',
                box:'',
                details:'',
            }
        },
        methods:{
            //选择条件 如热点、药企等
            cod(data){
                this.codIndex = data;
            },
            //查看更多
            more(data){
                console.log(data)
            },
            //加载更多
            load(){
                let loadIf = this.task.length;
                if(loadIf <10){
                    this.loading = false;
                }else{
                    this.loading = true;
                }
            },
        },
        components:{
            'v-Footer': Footer,
        },
        beforeMount(){
            //获取详情id
            let aid=sessionStorage.getItem("DetailsId"); 
            console.log(aid);
            //获取用户信息
            let params = {newsId : aid}
            this.$api.list.getNewsDetailByIds(params).then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    this. details = data.newsInfo;                 
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
        },
        mounted () {
        },
    }
</script>

<style lang="scss" scoped>
.industry-index{
    display: block;
    position: relative;
}
.industry-index-content{
    margin-left: 20%;
    position: relative;
}
.industry-cod-item{
    padding: 5px;
}

.industry-cod-item:hover{
    color: rgb(101, 175, 250);
}
.industry-index-content-company-item{
    height: 220px;
    padding: 20px;
    border-bottom: 1px solid #EEEEEE;
}
.company-item-content{
    height: 120px;
    overflow: hidden;
    display: block;
}
.industry-index-content-company-item img{
    width: 180px;
    height: 100px;
    margin: 20px 10px 0 0;
    display: none;
}
.industry-index-content-company-item-title{
    font-size: 16px;
    font-weight: bold;
    white-space:nowrap;
    overflow: hidden;
    padding: 10px 0 10px;
    border-top: 1px solid #EEEEEE
}
.industry-index-content-company-item:hover{
    background: rgb(241, 238, 238)
}
.industry-index-content-company-item:hover.industry-index-content-company-item img{
    display: inline;
}
</style>