<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
       <v-Medical v-if="medical"></v-Medical>
       <v-Agency v-if="agency"></v-Agency>
    </div>

</template>


<script>
import Medical from './Medical'
import Agency from './Agency'
    export default{

        data(){

            return{
                msg:'首页',
                medical: false,
                agency: false
            }
        },
        methods:{},
        components:{
            'v-Medical': Medical,
            'v-Agency': Agency,
        },
        beforeMount(){
            //获取用户信息
            this.$api.list.user().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    if(data.userInfo.roleId == 1){
                        this.$router.push({
                            path: '/EnterpriseInfo'
                        })
                    }else if(data.userInfo.roleId == 2){
                        this.medical = true;
                    }else{
                        this.agency = true;
                    }
                    
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
        }

    }
</script>

<style lang="scss" scoped>

</style>