<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="Industry">
       <el-row>
           <el-col :span="24" class="industry-index margin-bottom20">
              <img src="../../assets/images/download.jpg" alt="">
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