<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="Industry">
       <el-row>
           <el-col :span="24" class="industry-index margin-bottom20">
               <el-col :span="14" class="industry-index-content">
                   <el-col :span="24" class="margin-top20">
                       <el-col :span="24" class="font-size18 margin-top20 margin-bottom20">
                           <el-col :span="6" class="font-weight">行业资讯</el-col>
                           <el-col :span="18" class="color-silver text-right"><i class="el-icon-user-solid"></i>您当前位置: <el-link href="../#/Share/ShareIndex"><span class="font-size16">首页</span></el-link> // <el-link href="../#/Share/ShareIndustry"><span class="font-size16">行业资讯</span></el-link> // <span class="color-blue">更多</span></el-col>
                       </el-col> 
                   </el-col>
                   <el-col :span="24" class="margin-top20 margin-bottom20 padding-left10">
                           <el-col :span="20" class="industry-cod font-size18 font-weight">
                               <span class="industry-cod-item cursor" v-for="(item,index) in hot" :key="index" :class="{active:codIndex == index}" @click="cod(index,item.typeId)">{{item.typeName}}</span>
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
                count: 0,
                typeId:'',
                downUrl:'',
                loadIf: 0,
                disableds: false
            }
        },
        methods:{
            cod(key,data){
                this.codIndex = key;
                this.count = 1;
                this.typeId = data;
                this.task = [];
                this.pageNo = 1;
                this.getData();
            },
            //行业详情
            newsInfo(id){
                sessionStorage.setItem("DetailsId", id);
                this.$router.push({
                    path : './ShareDetails'
                });
            },
            //获取数据
            getData(){
                let parmas = {};
                parmas.typeId = this.typeId;
                parmas.pageNo = this.count;
                parmas.pageSize = 10;
                this.$api.list.getNewsListByTypeId(parmas).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
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
                        //this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            //加载更多
            load(){
                console.log(this.count);
                this.count = this.count + 1;
                this.getData();
            },
            
        },
        components:{
            'v-Footer': Footer,
        },
        beforeMount(){
            //获取资讯
            this.$api.list.getAllNewsTypeList().then(res=> {
                if(res.data.status == 200){
                    this.hot = res.data.data.list;
                    this.codIndex = 0;
                    this.typeId = this.hot[0].typeId;
                    //数据加载
                    this.getData();
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            });
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
            //获取用户信息
            // this.$api.list.user().then(res=> {
            //     if(res.data.status == 200){
            //         let data = res.data.data;
            //         if(data.userInfo.roleId == 1){
            //             this.$router.push({
            //                 path: '/EnterpriseInfo'
            //             })
            //         }else if(data.userInfo.roleId == 2){
            //             this.medical = true;
            //         }else{
            //             this.agency = true;
            //         }
                    
            //     }else{
            //         this.$message.error(res.data.msg);
            //     }
                
            // }).catch(error=>{
            //     console.log(error);
            // })
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
.industry-cod-item{
    padding: 5px 15px 5px 5px;
    color: #222222;
}

.industry-cod-item:hover{
    color: rgb(101, 175, 250);
}
.industry-cod .active{
    color: #409EFF
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
</style>