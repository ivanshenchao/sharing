<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="share">
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
           <el-col :span="24" class="share-index">
               <el-col :span="14" class="share-index-content">
                   <p class="font-size14 margin20">筛选条件</p>
                   <el-col :span="24" class="share-index-content-condition">

                       <el-col :span="24" class="share-index-content-condition-type" v-if="pickType == 0">
                           <el-col aglin="center" :span="3">需求类型：</el-col>
                                <el-col :span="19" class="noWrap">
                                    <span class="share-index-content-type-item cursor" :class="{active:tabIndex == -1}" @click="typeAction(-1,'')">全部</span>
                                    <span class="share-index-content-type-item cursor" v-for="(item,index) in type" :key="index" :class="{active:index == tabIndex}" @click="typeAction(index,item.taskId)">{{item.taskName}}</span>
                                </el-col>
                            <el-col aglin="right" class="color-blue text-right" :span="2"><span class="cursor" @click="typeDown">更多</span></el-col>
                       </el-col>

                       <el-col :span="24" class="share-index-content-condition-type" v-if="pickType == 1">
                           <el-col aglin="center" :span="3">需求类型：</el-col>
                                <el-col :span="19" class="noWraps">
                                    <span class="share-index-content-type-item cursor" :class="{active:tabIndex == -1}" @click="typeAction(-1,'')">全部</span>
                                    <span class="share-index-content-type-item cursor" v-for="(item,index) in type" :key="index" :class="{active:index == tabIndex}" @click="typeAction(index,item.taskId)">{{item.taskName}}</span>
                                </el-col>
                            <el-col aglin="right" class="color-blue text-right" :span="2"><span class="cursor" @click="typeUp">收起</span></el-col>
                       </el-col>

                       <el-col :span="24" class="share-index-content-condition-type margin-top20" v-if="pickArea == 0">
                           <el-col aglin="center" :span="3">需求地区：</el-col>
                                <el-col :span="19" class="noWrap">
                                    <span class="share-index-content-type-item cursor" :class="{active:tabIndexs == -1}" @click="areaAction(-1,'')">全部</span>
                                     <span class="share-index-content-type-item cursor" v-for="(item,index) in capital" :key="index" :class="{active:index == tabIndexs}" @click="areaAction(index,item.areaId)">{{item.areaName}}</span>
                                </el-col>
                            <el-col aglin="right" class="color-blue text-right" :span="2"><span class="cursor" @click="areaDown">更多</span></el-col>
                       </el-col>
                       
                       <el-col :span="24" class="share-index-content-condition-type margin-top20" v-if="pickArea == 1">
                           <el-col aglin="center" :span="3">需求地区：</el-col>
                                <el-col :span="19" class="noWraps">
                                    <span class="share-index-content-type-item cursor" :class="{active:tabIndexs == -1}" @click="areaAction(-1,'')">全部</span>
                                    <span class="share-index-content-type-item cursor" v-for="(item,index) in capital" :key="index" :class="{active:index == tabIndexs}" @click="areaAction(index,item.areaId)">{{item.areaName}}</span>
                                </el-col>
                            <el-col aglin="right" class="color-blue text-right" :span="2"><span class="cursor" @click="areaUp">收起</span></el-col>
                       </el-col>

                       <el-col :span="24" class="share-index-content-condition-type margin-top20" v-if="pickCity == 1">
                           <el-col aglin="center" :span="3">需求城市：</el-col>
                                <el-col :span="19" class="noWraps">
                                    <span class="share-index-content-type-item cursor" :class="{active:tabIndexc == -1}" @click="cityAction(-1,'')">全部</span>
                                    <span class="share-index-content-type-item cursor" v-for="(item,index) in city" :key="index" :class="{active:index == tabIndexc}" @click="cityAction(index,item.areaId)">{{item.areaName}}</span>
                                </el-col>
                       </el-col>

                       <el-col :span="24" class="share-index-content-condition-type margin-top20">
                           <el-col aglin="center" :span="3">筛 选：</el-col>
                           <el-col :span="4">
                               <el-select v-model="submitDate" placeholder="选择时间顺序" @change="date">
                                    <el-option value="1" label="最新发布"></el-option>
                                    <el-option value="2" label="最早发布"></el-option>
                                </el-select>
                           </el-col>
                           <el-col :span="4" class="margin-left20">
                                <el-select v-model="status" placeholder="进度排序" @change="select">
                                    <el-option value="1" label="进度正序"></el-option>
                                    <el-option value="2" label="进度倒序"></el-option>
                                </el-select>
                            </el-col>
                       </el-col>
         
                    </el-col>
                    <el-col :span="24" class="share-index-content-task infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disableds">

                            <el-col :span="24" class="share-index-content-task-item" v-for="(item,index) in task" :key="index">

                                <el-col :span="24" class="share-index-content-task-item-child" v-show="taskShow[index] == 1">
                                    <el-col :span="24" class="share-index-content-task-title font-size18">{{item.taName}}</el-col>
                                    <el-col :span="24" class="share-index-content-task-content">
                                        <el-col :span="18">
                                            <p>任务要求：{{item.taRemark}}</p>
                                        </el-col>
                                        <el-col :span="6" class="state-img">
                                            <img v-show="item.state==2" src="../../assets/images/images02.png" alt="">
                                            <img v-show="item.state==3" src="../../assets/images/images03.png" alt="">
                                            <img v-show="item.state==4 || item.state==5 || item.state==6 || item.state==7" src="../../assets/images/images04.png" alt="">
                                            <img v-show="item.state==8" src="../../assets/images/images05.png" alt="">
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="share-index-content-task-footer color-silver font-size14 margin-top10">
                                        <el-col :span="5">任务地区：{{item.capitalName}}{{item.ctiyName}}</el-col>
                                        <el-col :span="10">企业名称：{{item.comName}}</el-col>
                                        <el-col :span="5">开始日期：{{item.beginTimeStr}}</el-col>
                                        <el-col :span="4" class="text-center color-blue"><span class="cursor" @click="detailsDown(index)">查看详情</span></el-col>
                                    </el-col>
                                </el-col>

                                <el-col :span="24" class="share-index-content-task-item-child task-background-add" v-show="taskShow[index] == 0">
                                    <el-col :span="24" class="share-index-content-task-title font-size18 padding-left10">{{item.taName}}</el-col>
                                    <el-col :span="24" class="share-index-content-task-content">
                                        <el-col :span="18" class="padding-left20 color-silver task-pick-down">
                                            <p class="task-news">需求详情</p>
                                            <p>任务名称：{{item.taName}}</p>
                                            <p>任务类型：{{item.taskName}}</p>
                                            <p>产品名称：{{item.prodName}}</p>
                                            <p>任务地区：{{item.capitalName}}{{item.ctiyName}}</p>
                                            <p>任务要求：{{item.taRemark}}</p>
                                            <p>开始日期：{{item.beginTimeStr}}</p>
                                            <p>结束日期：{{item.endTimeStr}}</p>
                                            <p>发布日期：{{item.publishTimeStr}}</p>
                                        </el-col>
                                        <el-col :span="6" class="state-img">
                                            <img v-show="item.state==2" src="../../assets/images/images02.png" alt="">
                                            <img v-show="item.state==3" src="../../assets/images/images03.png" alt="">
                                            <img v-show="item.state==4 || item.state==5 || item.state==6 || item.state==7" src="../../assets/images/images04.png" alt="">
                                            <img v-show="item.state==8" src="../../assets/images/images05.png" alt="">
                                        </el-col>
                                    </el-col>
                                    <el-col :span="24" class="share-index-content-task-footer color-silver font-size14 margin-top10 padding-left20">
                                        <el-col :span="20"><p class="task-news">需求详情</p></el-col>
                                        <el-col :span="4" class="text-center color-blue"><span class="cursor" @click="detailsUp(index)">收起</span></el-col>
                                        <el-col :span="20"><p class="margin-tops5  padding-left10">接单团队：已有{{item.getCount}}家接单团队</p></el-col>
                                        <el-col :span="4" class="text-center color-blue" v-show="item.state == 2 || item.state == 3"><span class="cursor" @click="orderReceiving(item.conId)">接收</span></el-col>
                                    </el-col>
                                </el-col>

                            </el-col>                              

                        </el-col>

                </el-col>


               <el-col :span="3" class="background-white padding10 hot-news" id="searchBar">
                   <el-col :span="24">
                       <p class="hot-p font-size16 font-weight"><span class="padding-left20">热门资讯</span></p>
                   </el-col>
                   <el-col :span="24" class="hot-item cursor" v-for="(item,index) in hot" :key="index" @click="newsInfo(item.newsId)">
                       <p class="hot-item-p font-size14 padding10" @click="newsInfo(item.newsId)">{{item.newsTitle}}</p>
                       <img :src="downUrl+item.newsFaceUrl" class="hot-img" alt="" @click="newsInfo(item.newsId)">
                       <p class="text-right font-size12 margin-right10 color-sliver hot-date" @click="newsInfo(item.newsId)">{{item.createTimeStr}}</p>
                   </el-col>
                   <el-col :span="24">
                       <p class="text-right font-size16 font-weight"><span class="padding-left20 cursor" @click="moreHot">更多</span></p>
                   </el-col>
               </el-col>
           
           </el-col>
           <!-- 脚部 -->
           <el-col :span="24">
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
                msg:'首页',
                tabIndex: -1,
                tabIndexs: -1,
                tabIndexc: -1,
                pickType: 0,
                pickArea: 0,
                pickCity: 0,
                task:[],
                downUrl:'',
                taskShow:[],
                hot:[],
                conditionType:[],
                pageSize:10,
                pageNo:0,
                status:'1',
                submitDate:'1',
                capitalId:'',
                cityId:'',
                taskId:'',
                box:'',
                type:[],
                capital:[],
                city: [],
                loadIf: 0,
                images:[],
                disableds: false
            }
        },
        methods:{
            //类型 更多收起 选中
            typeDown(){
                this.pickType = 1
            },
            typeUp(){
                this.pickType = 0
            },
            typeAction(index,id){
                this.tabIndex = index;
                this.taskId = id;
                this.task = [];
                this.pageNo = 1;
                this.getData();
            },
            //地区 更多收起 选中
            areaDown(){
                this.pickArea = 1
            },
            areaUp(){
                this.pickArea = 0
            },
            areaAction(index,id){
                if(this.tabIndexs == index){
                    return false
                }
                this.tabIndexs = index;
                this.pickCity = 1;
                this.tabIndexc = -1;
                if(index == -1){
                    this.pickCity = 0;
                    this.capitalId = id;
                    this.cityId ='';
                    this.task = [];
                    this.pageNo = 1;
                    this.getData();
                    return false
                }
                let parmas = {capitalId : id};
                this.capitalId = id;
                this.cityId ='';
                this.task = [];
                this.pageNo = 1;
                this.getData();
                //获取当前省份城市
                this.$api.list.getCity(parmas).then(res=> {
                    if(res.data.status == 200){
                        this.city = res.data.data.list;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            cityAction(index,id){
                this.tabIndexc = index;
                this.cityId = id;
                this.task = [];
                this.pageNo = 1;
                this.getData();
            },
            //类别筛选
            select(){
                this.task = [];
                this.pageNo = 1;
                this.getData();
                console.log(this.status)
            },
            date(){
                this.task = [];
                this.pageNo = 1;
                this.getData();
                console.log(this.submitDate)
            },
            //详细信息
            detailsDown(index){
                this.taskShow.splice(index,1,0);
            },
            detailsUp(index){
                this.taskShow.splice(index,1,1);
            },
            //接单
            orderReceiving(id){
                this.$message.info('系统暂未开放，请您耐心等待！');
            },
            //热点详情
            newsInfo(id){
                sessionStorage.setItem("DetailsId", id);
                this.$router.push({
                    path : './ShareDetails'
                });
            },
            //热点更多
            moreHot(){
                this.$router.push({
                    path : './ShareIndustry'
                });
            },
            //加载更多
            load(){
                console.log(this.pageNo);
                this.pageNo = this.pageNo + 1;
                this.getData();
            },
            //获取数据
            getData(){
                let parmas = {};
                parmas.capitalId = this.capitalId;
                parmas.cityId = this.cityId;
                parmas.taskId = this.taskId;
                parmas.timerOrder = this.submitDate;
                parmas.stateOrder = this.status;
                parmas.pageNo = this.pageNo;
                parmas.pageSize = this.pageSize;
                this.$api.list.getShareData(parmas).then(res=> {
                    if(res.data.status == 200){
                        let tasks = [];
                        tasks = res.data.data.list;
                        for(var i=0;i<tasks.length;i++){
                            this.task.push(tasks[i]);
                            this.taskShow.push(1);
                        }
                        if(tasks.length == 0){
                            this.disableds = true;
                        }
                        console.log(this.task);
                        this.loadIf = res.data.data.list.length;
                        
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
            //数据加载
            //this.getData();
            //获取所有省份
            this.$api.list.getCapitalIdData().then(res=> {
                if(res.data.status == 200){
                    this.capital = res.data.data.list;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            });
            //获取所有类型
            this.$api.list.getTypeData().then(res=> {
                if(res.data.status == 200){
                    this.type = res.data.data.list;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
            //获取热门资讯
            this.$api.list.getNewsList().then(res=> {
                if(res.data.status == 200){
                    this.hot = res.data.data.list;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
            //获取下载地址
            this.$api.list.getDownUrl().then(res=> {
                if(res.data.status == 200){
                    this.downUrl = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            //获取轮播图
            this.$api.list.getImagesList({typeId:1}).then(res=> {
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
.share-carousel-logo{
    width: 100%;
    height: 100%;
}
.share-index{
    background: #F5F5F5;
    display: block;
    position: relative;
}
.share-index-content{
    margin-left: 15%;
    position: relative;
}
.share-index-content-condition{
    background: white;
    padding: 20px;
    font-size: 14px;
    color: #222222;
    line-height: 30px;
}
.share-index-content-condition-type{
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: 20px
}
.share-index-content-type-item{
    margin: 5px 2px;
    padding: 3px 8px;
    border-radius: 5px;
    cursor: pointer;
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
.noWraps{
    word-wrap:break-word;
}
.share-index-content-task{
    background: white;
    margin: 20px 0;
    font-size: 16px;
    padding: 0 20px;
    overflow: auto;
    height: 800px;
    scrollbar-width:none;
    -ms-overflow-style:none;
}
.share-index-content-task::-webkit-scrollbar {
    display: none;
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
.state-img{
    width: 150px;
    height: auto;
}
</style>