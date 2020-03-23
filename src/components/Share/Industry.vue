<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="Industry">
       <el-row>
           <el-col :span="24">
               <div class="block">
                    <el-carousel>
                    <el-carousel-item v-for="item in images" :key="item.banId">
                        <img :src="downUrl+item.fileUrl" class="share-carousel-logo" alt="exit">
                    </el-carousel-item>
                    </el-carousel>
                </div>
           </el-col>
           <el-col :span="24" class="industry-index margin-bottom20">
               <el-col :span="14" class="industry-index-content">
                   <el-col :span="24">
                       <el-col :span="24" class="text-center">
                           <p>行业资讯</p>
                           <p>I N D U S T R Y &nbsp; &nbsp; &nbsp; I N F O R M A T I O N</p>
                       </el-col>
                       <el-col :span="24" class="margin-bottom20">
                           <el-col :span="20" class="industry-cod font-size16">
                               <span class="industry-cod-item cursor" v-for="(item,index) in hot" :key="index" :class="{active:codIndex == index}" @click="cod(index,item.typeId)">{{item.typeName}}</span>
                           </el-col>
                           <el-col :span="4" class="text-right padding-right20"><span class="font-size14 hover-font cursor" @click="more(1)">更多 <i class="el-icon-arrow-right"></i></span></el-col>
                       </el-col>     
                   </el-col>
                    <el-col :span="24" class="industry-index-content-news">
                        <el-col :span="8" class="industry-index-content-news-item background-white cursor" v-for="(item,index) in task" :key="index">
                            <div class="industry-index-content-news-item-title" @click="newsInfo(item.newsId)">{{item.newsTitle}}</div>
                            <div><img :src="downUrl+item.newsFaceUrl" alt="" @click="newsInfo(item.newsId)"></div>
                            <div class="font-size14 color-silver industry-item-border-bottom">发布日期：{{item.createTimeStr}}</div>
                            <div class="font-size12 color-silver margin-top10 hover-font" @click="newsInfo(item.newsId)"><span class="padding-right20">来源：{{item.source}}</span>详情</div>
                        </el-col>
                    </el-col>

                </el-col>
   
           </el-col>

           <el-col :span="24" class="industry-index background-white margin-top20 padding-bottom20 margin-bottom20">
               <el-col :span="14" class="industry-index-content padding-bottom20">
                   <el-col :span="24">
                       <el-col :span="24" class="text-center">
                           <p>企业专栏</p>
                           <p>C O M P A N Y &nbsp; &nbsp; &nbsp; I N F O R M A T I O N</p>
                       </el-col>
                       <el-col :span="24" class="text-right padding-right20 margin-bottom20">
                           <!-- <span class="font-size14 hover-font cursor" @click="more(2)">更多 <i class="el-icon-arrow-right"></i></span> -->
                       </el-col>     
                   </el-col>
                    <el-col :span="24" class="industry-index-content-news background-white">
                        <el-col :span="8" class="industry-index-content-com-item text-center" v-for="(item,index) in conditionType" :key="index" @click="clumInfo(item.colId)">
                            <div class="industry-index-content-com-items" @click="clumInfo(item.colId)">
                                <div><img :src="downUrl+item.colFaceUrl" alt="" @click="clumInfo(item.colId)"></div>
                                <div class="font-size14 font-weight line-height40 margin-top20" @click="clumInfo(item.colId)">{{item.comName}}</div>
                                <div class="font-size14 color-silver margin-top10 hover-font" @click="clumInfo(item.colId)">内容数量：{{item.colTotal}}单</div>
                            </div>
                        </el-col>
                    </el-col>

                </el-col>
                
   
           </el-col>

           <el-col :span="24" class="industry-index margin-top20">
               <el-col :span="14" class="industry-index-content">
                   <el-col :span="24">
                       <el-col :span="24" class="text-center">
                           <p>企业招商</p>
                           <p>B U S I N E S S  &nbsp; &nbsp; &nbsp; I N F O R M A T I O N</p>
                       </el-col>
                       <el-col :span="24" class="text-right padding-right20 margin-bottom20">
                           <!-- <span class="font-size14 hover-font cursor" @click="more(3)">更多 <i class="el-icon-arrow-right"></i></span> -->
                       </el-col>     
                   </el-col>
                    <el-col :span="24" class="industry-index-content-news">
                        <el-col :span="8" class="industry-index-content-com-item text-center" v-for="(item,index) in conditionType" :key="index">
                            <div class="industry-index-content-com-items background-white">
                                <div><img :src="downUrl+item.colFaceUrl" class="business-img" alt=""></div>
                                <div class="font-size14 font-weight line-height40 margin-top20">{{item.comName}}</div>
                                <div class="font-size14 color-silver margin-top10 hover-font padding-bottom10">已参与：{{10+item.colTotal}}</div>
                                <div class="font-size14 color-silver margin-top10 hover-font padding-bottom20">结束时间：2022/12/31</div>
                            </div>
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
                taskShow:[1,1,1,1,1,1],
                hot:[],
                conditionType:[],
                status:'',
                submitDate:'',
                downUrl:'',
                box:'',
                typeId:'',
                images:[]
            }
        },
        methods:{
            //选择条件 如热点、药企等
            cod(key,data){
                this.codIndex = key;
                this.typeId = data;
                this.getData();
            },
            //详情
            newsInfo(id){
                sessionStorage.setItem("DetailsId", id);
                this.$router.push({
                    path : './ShareDetails'
                });
            },
            //行业
            clumInfo(id){
                sessionStorage.setItem("colId", id);
                this.$router.push({
                    path : './ColumnMore'
                });
            },
            //查看更多
            more(data){
                console.log(data);
                if(data == 1){
                    this.$router.push({path: './InformationMore'})
                    return false
                }
                if(data == 2){
                    this.$router.push({path: './ColumnMore'})
                    return false
                }
                if(data == 3){
                    this.$router.push({path: './CompanyMore'})
                    return false
                }
            },
            //获取数据
            getData(){
                let parmas = {};
                parmas.typeId = this.typeId;
                parmas.pageNo = 1;
                parmas.pageSize = 3;
                this.$api.list.getNewsListByTypeId(parmas).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.task = res.data.data.list;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
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
            //获取企业专栏
            this.$api.list.getAllComanyColumnList().then(res=> {
                if(res.data.status == 200){
                    this.conditionType = res.data.data.list;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
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
            //获取轮播图
            this.$api.list.getImagesList({typeId:2}).then(res=> {
                console.log(res);
                if(res.data.status == 200){
                    this.images = res.data.data.list;
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
.industry-carousel-logo{
    width: 100%;
    height: 100%;
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
    padding: 5px;
}
.industry-cod-item:not(:first-child){
    margin-left: 20px;
}
.industry-cod-item:hover{
    color: rgb(101, 175, 250);
}
.industry-cod .active{
    color: #409EFF
}
.industry-index-content-news-item{
    padding: 20px;
    border-right: 1px solid #EEEEEE;
    border-bottom: 1px solid rgba(245, 243, 243, 0.651)
}
.industry-index-content-news-item img{
    width: 100%;
    height: 200px;
}
.industry-index-content-news-item-title{
    font-size: 16px;
    font-weight: bold;
    white-space:nowrap;
    overflow: hidden;
    padding: 0 0 10px 0;
}
.industry-item-border-bottom{
    padding: 0 0 10px 0;
    border-bottom: 1px solid #EEEEEE;
}
.industry-index-content-news-item:hover{
    color: rgb(101, 175, 250);
}
.industry-index-content-com-item{
    padding: 20px;
}
.industry-index-content-com-items{
    border: 1px solid #EEEEEE;
    border-radius: 10px;
    padding-bottom: 20px;
}
.industry-index-content-com-item img{
    width: 100%;
    height: 300px;
    border-radius: 10px;
}
.industry-index-content-condition img{
    background: white;
    padding: 20px;
    font-size: 14px;
    color: #222222;
    line-height: 30px;
}
.industry-index-content-condition-type{
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: 20px
}
.business-img{
    width: 150px !important;
    height: 150px !important;
    border-radius: 50% !important;
    margin-top: 30px;
}
.share-index-content-type-item{
    margin: 5px 2px;
    padding: 3px 8px;
    border-radius: 5px;
    cursor: pointer;
    white-space:nowrap;
}
.share-index-content-type-item:hover{
    background: rgb(101, 175, 250);
    color: white;
}
.share-index-content-condition-type .active{
    background: #409EFF;
    color: white;
}
.noWrap{
    white-space:nowrap;
    overflow: hidden;
}
.share-index-content-task{
    background: white;
    margin: 20px 0;
    font-size: 16px;
    padding: 0 20px;
    overflow: auto;
}
.share-index-content-task img{
    width: 60%;
    height: auto;
    margin-left: 20%;
}
.share-index-content-task-title{
    font-weight: bold
}
.share-index-content-task-item{
    border-bottom: 1px solid #EEEEEE;
    
}
.share-index-content-task-item-child{
    padding: 25px 0;
}
.task-pick-down{
    font-size: 14px;
}
.task-pick-down p{
    padding: 0;
    margin: 10px 0;
}
.task-news{
    font-size: 16px;
    font-weight: bold;
    color: #3C3C3C;
}
.task-background-add{
    background: #EFEFEF;
}
.hot-item{
    margin: 10px 0 0 0;
    padding: 10px;
    border-bottom: 2px dotted #F5F5F5
}
.hot-img{
    width: 80%;
    height: auto;
    margin-left: 10%;
    display: none;
}
.hot-p{
    border-left: 3px solid #EE2C2C
}
.hot-item-p{
    margin: 0 0 10px 0;
    padding: 0;
    line-height: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    text-indent:20px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.hot-item:hover .hot-item-p{
    color: #409EFF;
}
.hot-item:hover .hot-img{
    display: inline;
}
.hot-date{
    color: silver;
    margin: 0
}
.hot-news{
    margin: 20px;
    left: 75%;
}
#searchBar{
  .isFixed{
    position:fixed;
    top:80px; // 44px是导航标题头的高度
    z-index:999;
  }
}
</style>