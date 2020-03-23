<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="Industry">
       <el-row>
           <el-col :span="24">
               <div class="block">
                   <img src="../../assets/images/login.png" class="company-carousel-logo" alt="exit">
                </div>
           </el-col>
           <el-col :span="24" class="industry-index margin-bottom20">
               <el-col :span="14" class="industry-index-content">
                   <el-col :span="24">
                       <el-col :span="24" class="font-size16 margin-top20 margin-bottom20">
                           <el-col :span="6" class="font-weight">企业专栏--{{comName}}</el-col>
                           <el-col :span="18" class="color-silver text-right"><i class="el-icon-user-solid"></i>您当前位置: 首页 // 行业资讯 // <span class="color-blue">企业专栏</span></el-col>
                       </el-col> 
                   </el-col>

                    <el-col :span="24" class="industry-index-content-company" v-infinite-scroll="load" infinite-scroll-disabled="disableds">
                        <el-col :span="24" class="industry-index-content-company-item background-white cursor" v-for="(item,index) in task" :key="index" @click="newsInfo(item.newsId)">
                            <el-col :span="24" class="text-left font-size16 font-weight" @click="newsInfo(item.newsId)">{{item.newsTitle}}</el-col>
                            <el-col :span="24" class="padding-left20 font-size16 company-item-content" @click="newsInfo(item.newsId)"> 
                                <div class="company-item-contents"><img :src="downUrl+item.newsFaceUrl" alt="" @click="newsInfo(item.newsId)"></div> 
                                <p class="font-size16 company-item-content padding-left10 padding-top10" @click="newsInfo(item.newsId)">&nbsp;&nbsp;&nbsp;&nbsp;{{item.newsAbs}}</p>                            
                            </el-col>
                            <el-col :span="24" @click="newsInfo(item.newsId)">
                                <p class="text-right font-size14 color-silver">发布时间：{{item.createTimeStr}}</p>
                            </el-col>
                        </el-col>
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
                task:[],
                taskShow:[],
                hot:[],
                status:'',
                submitDate:'',
                box:'',
                typeId:'',
                count: 0,
                downUrl:'',
                loadIf: 0,
                comName:'',
                disableds: false
            }
        },
        methods:{
            //选择条件 如热点、药企等
            cod(data){
                this.codIndex = data;
            },
            //行业详情
            newsInfo(id){
                sessionStorage.setItem("DetailsId", id);
                this.$router.push({
                    path : './ShareDetailse'
                });
            },
            //获取数据
            getData(){
                let parmas = {};
                parmas.colId = this.typeId;
                parmas.pageNo = this.count;
                parmas.pageSize = 10;
                this.$api.list.getColumnNewsByColId(parmas).then(res=> {
                    
                    if(res.data.status == 200){
                        this.comName= res.data.data.comName;
                        let tasks = [];
                        tasks = res.data.data.list;
                        for(var i=0;i<tasks.length;i++){
                            this.task.push(tasks[i]);
                        }
                        if(tasks.length == 0){
                            this.disableds = true;
                        }
                        console.log(this.task);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //加载更多
            load(){
                this.count = this.count + 1;
                console.log(this.count);
                this.getData();
            },
        },
        components:{
            'v-Footer': Footer,
        },
        beforeMount(){
            ///获取资讯
            this.typeId = sessionStorage.getItem("colId"); 
            //获取下载地址
            this.$api.list.getDownUrl().then(res=> {
                console.log(res);
                if(res.data.status == 200){
                    this.downUrl = res.data.data;
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
.company-carousel-logo{
    width: 100%;
    height: 300px;
}
.industry-index{
    display: block;
    position: relative;
}
.industry-index-content{
    margin-left: 20%;
    position: relative;
}
.industry-index-content-company{
    overflow: auto;
    height: 800px;
    scrollbar-width:none;
    -ms-overflow-style:none;
}
.industry-index-content-company::-webkit-scrollbar {
    display: none;
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
.company-item-contents{
    float: left;
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