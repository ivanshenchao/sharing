<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="Industry" class="background-white">
       <el-row>
           <el-col :span="24">
               <div class="block">
                   <img src="../../assets/images/banner.png" class="company-carousel-logo" style="height: 20rem" alt="exit">
                </div>
           </el-col>
           <el-col :span="24" class="industry-index margin-bottom20">
               <el-col :span="14" class="industry-index-content margin-top20">
                    <el-col :span="8"><img src="../../assets/images/img02.png" class="company-carousel-logo" alt="exit"></el-col>
                    <el-col :span="16" class="padding-left20">
                        <div class="content-line margin-left20 margin-bottom20"></div>
                        <div class="content-title font-size18 font-weight padding-left20 margin-bottom20">ABOUT US</div>
                        <div class="content-text font-size16 padding-left20 margin-bottom20 line-height30">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                《医事共享经济平台》，是一个基于合规前提下的医药营销成果平台。
                                <br />
 
“共享经济”是国家倡导的经济发展模式。即基于互联网将闲置、流动的优质资源整合起来，从而实现社会效益和经济利益最大化。在共享经济高速发展的浪潮中，建立好世界生态社区。
<br />
《医事共享经济平台》，将医药企业、代理商、医药代表等医药行业从业者以及其所在平台的资源，聚合在共享经济模式中。共同利用本平台，并基于本平台进行线上一站式业务合作对接。基于本平台的业务模式，大大减少了线下交付对接的繁杂程序，节约了沟通成本、人力成本、时间成本、经济成本，实现行业内的多方利益最大化。
 
《医事》，助力医药人更好、更快发展。
                            </div>
                        <el-col :span="24" class="text-center about-number margin-top20 padding-bottom20">
                            <el-col :span="8">
                                <p class="font-size22 font-weight">18</p>
                                <p class="font-size16">合作企业</p>
                            </el-col>
                            <el-col :span="8">
                                <p class="font-size22 font-weight">25</p>
                                <p class="font-size16">合作代理</p>
                            </el-col>
                            <el-col :span="8">
                                <p class="font-size22 font-weight">30</p>
                                <p class="font-size16">合伙公司</p>
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
                task:[1,1,1,1,1,1],
                taskShow:[1,1,1,1,1,1],
                hot:[1,1,1,1,1,1],
                status:'',
                submitDate:'',
                box:''
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
                    alert(1);
                    this.loading = true;
                }
            },
        },
        components:{
            'v-Footer': Footer,
        },
        beforeMount(){
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
.content-line{
    width:120px;
    height:4px;
    background:rgba(1,97,254,1);
    margin-top: 50px;
}
.about-number p{
    margin: 0;
    padding: 0;
    margin-bottom: 10px
}
.industry-index-content img{
    width: 100%;
    height: auto;
}


</style>