<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="footer">
       <div>
                <el-row>
                    <el-col :span="24" class="share-footer">
                        <el-col :span="16" class="footer-news">
                            <p><span class="footer-link cursor"><router-link to="./ShareAbout">公司简介</router-link></span><span class="margin-lr20">|</span><span class="footer-link cursor"><router-link to="./ShareAbout">关于我们</router-link></span><span class="margin-lr20">|</span><span class="footer-link cursor"><router-link to="./ShareAbout">联系我们</router-link></span></p>
                            <p><span class="footer-link cursor">友情链接：<a href="http://medical.cdheiguo.com" target="_blank">黑果科技</a></span><span class="margin-lr20">|</span><span class="footer-link cursor"><a href="http://medical.cdheiguo.com" target="_blank">申鸿科技</a></span></p>
                            <p>版权所有 © 2016-2020 重庆市嘉陵江小三峡*** 渝ICP备36549741号 拷贝 2</p>
                        </el-col>
                        <el-col :span="8" class="footer-image">
                            <img src="../../assets/images/code.png">
                            <p>平台app</p>

                        </el-col>
                    </el-col>
                </el-row>
            </div>
    </div>

</template>
<script>
    export default{

        data(){

            return{
                msg:'脚部',
                medical: false,
                agency: false
            }
        },
        methods:{},
        components:{
            
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
        }

    }
</script>

<style lang="scss" scoped>
.share-footer {
    background-color: #303134 !important;
    color: #838383;
    height: 160px;
    text-align: center;
    font-size: 15px;
}
.footer-news{
    padding-top: 20px;
}
.footer-news p{
    padding: 0;
    margin: 10px;
    height: 30px;
}
.footer-image{
    text-align: left;
}
.footer-image img{
    width: 90px;
    height: 90px;
    margin-top: 25px
}
.footer-image p{
    width: 90px;
    height: 20px;
    text-align: center;
    margin: 0;
}
.footer-link a {
    text-decoration: none;
    color: #838383;
}
</style>