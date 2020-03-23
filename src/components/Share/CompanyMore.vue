<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="Industry">
       <el-row>
           <el-col :span="24">
               <div class="block">
                   <img src="../../assets/images/login.png" class="company-carousel-logo" alt="exit">
                </div>
           </el-col>
           <el-col :span="24" class="industry-index margin-bottom20"  v-infinite-scroll="load" infinite-scroll-disabled="disableds">
               <el-col :span="14" class="industry-index-content">
                   <el-col :span="24">
                       <el-col :span="24" class="font-size16 margin-top20 margin-bottom20">
                           <el-col :span="6" class="font-weight">企业招商</el-col>
                           <el-col :span="18" class="color-silver text-right"><i class="el-icon-user-solid"></i>您当前位置: 首页 // 行业资讯 // <span class="color-blue">企业招商</span></el-col>
                       </el-col> 
                   </el-col>

                    <el-col :span="24" class="industry-index-content-company">
                        <el-col :span="24" class="industry-index-content-company-item background-white cursor">
                            <el-col :span="3" class="text-center">
                                <p class="font-size14 color-silver padding-top10">结束日期</p>
                                <p class="font-size22 font-weight">28</p>
                                <p class="font-size14 color-silver margin-top20">2019/09</p>
                            </el-col>
                            <el-col :span="6"><img src="../../assets/images/login.png" alt=""></el-col>
                            <el-col :span="15" class="padding-left20">
                                <p class="font-size16 font-weight">华润医药控股有限公司</p>
                                <p class="font-size16 company-item-content">华润的前身是于1938年在香港成立的“联和行”，1948年联和行改组更名为华润公司。1952年隶属关系由中共中央华润的前身是于1938年在香港成立的“联和行”，1948年联和行改组更名为华润公司。1952年隶属关系由中共中央</p>
                                <p class="text-right font-size14 color-silver">已参与：100</p>
                            </el-col>
                        </el-col>
                    </el-col>

                    <el-col :span="24" class="industry-index-content-company">
                        <el-col :span="24" class="industry-index-content-company-item background-white cursor">
                            <el-col :span="3" class="text-center">
                                <p class="font-size14 color-silver padding-top10">结束日期</p>
                                <p class="font-size22 font-weight">28</p>
                                <p class="font-size14 color-silver margin-top20">2019/09</p>
                            </el-col>
                            <el-col :span="6"><img src="../../assets/images/login.png" alt=""></el-col>
                            <el-col :span="15" class="padding-left20">
                                <p class="font-size16 font-weight">华润医药控股有限公司</p>
                                <p class="font-size16 company-item-content">华润的前身是于1938年在香港成立的“联和行”，1948年联和行改组更名为华润公司。1952年隶属关系由中共中央华润的前身是于1938年在香港成立的“联和行”，1948年联和行改组更名为华润公司。1952年隶属关系由中共中央</p>
                                <p class="text-right font-size14 color-silver">已参与：100</p>
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
                hot:[1,1,1,1,1,1],
                status:'',
                submitDate:'',
                box:'',
                disableds: false
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
.industry-index-content-company-item{
    height: 200px;
    padding: 20px;
    border-bottom: 1px solid #EEEEEE;
}
.industry-index-content-company-item img{
    width: 100%;
    height: 160px;
}
.industry-index-content-company-item-title{
    font-size: 16px;
    font-weight: bold;
    white-space:nowrap;
    overflow: hidden;
    padding: 10px 0 10px;
    border-top: 1px solid #EEEEEE
}
.company-item-content{
    height: 82px;
    overflow: hidden;
}




</style>