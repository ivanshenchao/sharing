<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="Industry">
       <el-row>
           <el-col :span="24" class="industry-index margin-bottom20">
                <iframe frameborder="0" :src="downUrl+pdfUrl" style="height:100vh;width:100%" ></iframe>
           </el-col> 
       </el-row>
    </div>

</template>
<script>
    export default{
        data(){

            return{
                msg:'pdf预览',
                pdfUrl:'',
                downUrl:'',
            }
        },
        methods:{
        },
        beforeMount(){
            //获取详情pdfUrl
            this.pdfUrl=sessionStorage.getItem("pdfUrl"); 
            console.log(this.pdfUrl);
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
<style lang="scss">
.industry-index-content-company img{
    margin: 0 auto;
    width:100% !important;
}
</style>
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