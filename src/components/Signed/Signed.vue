<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="singed">
        <el-container>
            <el-main>
                <el-row>
                    <el-col :span="24" class="singed">
                        <el-col class="singed-felx" :span="18">
                            <el-col class="singed-felxs" :span="24">
                                <div class="singed-title text-center color-black">医盟友共享经济平台服务条款</div>
                                <iframe :src="src" frameborder="0" width="100%" style="height: 35rem"></iframe>
                            </el-col>
                        </el-col>
                        <el-col :span="6" class="singed-new">
                            <el-col :span="24" class="singed-news">
                                <div class="singed-title text-center color-black font-size20">医盟友共享经济平台服务条款</div>
                                <el-col :span="24" class="margin-top20">
                                    <el-col :span="8" class="text-right color-silver">甲方：</el-col>
                                    <el-col :span="16" class="padding-left20">{{privacy.firstPart}}</el-col>
                                </el-col>
                                <el-col :span="24" class="margin-top20">
                                    <el-col :span="8" class="text-right color-silver">乙方：</el-col>
                                    <el-col :span="16" class="padding-left20">{{privacy.accName}}</el-col>
                                </el-col>
                                <el-col :span="24" class="margin-top20">
                                    <el-col :span="8" class="text-right color-silver">发起时间：</el-col>
                                    <el-col :span="16" class="padding-left20">{{gettime}}</el-col>
                                </el-col>
                                <el-col :span="24" class="margin-top20">
                                    <el-col :span="8" class="text-right color-silver">合同状态：</el-col>
                                    <el-col :span="16" class="padding-left20">
                                        <span v-if="status == 1">已查看</span>
                                        <span v-if="status == 2">合同生效</span>
                                    </el-col>
                                </el-col>
                                <el-col :span="24" class="margin-top20">
                                    <el-col :span="8" class="text-right">
                                        <span v-if="status == 1">
                                            <p><span class="circle color1"><span class="circles color2"></span></span></p>      
                                            <p class="margin-top20 margin-right4"><span class="singed-line"></span></p>
                                        </span>
                                        <span v-if="status == 2">
                                            <p><span class="circle color3"><span class="circles color4"></span></span></p>      
                                            <p class="margin-top20 margin-right4"><span class="singed-line"></span></p>
                                        </span>
                                    </el-col>
                                    <el-col :span="16" class="padding-left20 padding-top10">合同生效</el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="8" class="text-right">
                                        <span v-if="status == 1">
                                            <p><span class="circle color1"><span class="circles color2"></span></span></p>      
                                            <p class="margin-top20 margin-right4"><span class="singed-line"></span></p>
                                        </span>
                                        <span v-if="status == 2">
                                            <p><span class="circle color5"><span class="circles color6"></span></span></p>      
                                            <p class="margin-top20 margin-right4"><span class="singed-line"></span></p>
                                        </span>
                                    </el-col>
                                    <el-col :span="16" class="padding-left20 padding-top10">待签署</el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="8" class="text-right">
                                        <span v-if="status == 1">
                                            <p><span class="circle color3"><span class="circles color4"></span></span></p>      
                                            <p class="margin-top20 margin-right4"><span class="singed-line"></span></p>
                                        </span>
                                        <span v-if="status == 2">
                                            <p><span class="circle color5"><span class="circles color6"></span></span></p>      
                                            <p class="margin-top20 margin-right4"><span class="singed-line"></span></p>
                                        </span>
                                    </el-col>
                                    <el-col :span="16" class="padding-left20 padding-top10">{{privacy.accName}}已查看</el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="8" class="text-right">
                                        <p><span class="circle color5"><span class="circles color6"></span></span></p>      
                                        <p class="margin-top20 margin-right4"><span class="singed-line"></span></p>
                                    </el-col>
                                    <el-col :span="16" class="padding-left20 padding-top10">{{privacy.firstPart}}<br>签署</el-col>
                                </el-col>
                                <el-col :span="24" class="margin-bottom20">
                                    <el-col :span="8" class="text-right">
                                        <p><span class="circle color5"><span class="circles color6"></span></span></p>      
                                    </el-col>
                                    <el-col :span="16" class="padding-left20 padding-top10">{{privacy.firstPart}}<br>发起</el-col>
                                </el-col>
                                <el-col :span="24" class="text-center margin-top20 margin-bottom20">
                                    <div class="el-button-copy" @click="singed">签署协议</div>
                                </el-col>
                                 
                            </el-col>
                        </el-col>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>

</template>


<script>
    import { callbackify } from 'util';
    import pdf from 'vue-pdf'
    export default{

        data(){

            return{
                msg:'签约',
                privacy: {},
                gettime:'',
                status: 1,
        　　　　 src: '', // 文件地址
            }
        },
        components: {pdf},
        methods:{
            //获取当前时间
            getTime:function(){
                var _this = this;
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth()+1;
                let dd = new Date().getDate();
                let hh = new Date().getHours();
                let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
                _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            },
            currentTime(){
               this.getTime()
            },
            callbackit(){
                //签约
                if(this.status == 1){
                    this.$parent.singedShow();
                }else{
                    this.$parent.singedSuccess();
                }
            },
            singed(){
                //签约
                if(this.status == 1){
                    this.utils.open("签约","是否确认签约？","warning",this.callbackit,"退出");
                }else{
                    this.$parent.singedSuccess();
                }
            },
        },
        beforeMount(){
            //获取用户信息
            this.$api.list.user().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
					let roleId = res.data.data.userInfo.roleId;
					if(roleId==3 || roleId==4){
						if(data.userInfo.isSgin == 2){
                            this.status = 2;
                            this.$api.list.privacys().then(res=> {
                                if(res.data.status == 200){
                                    this.privacy = res.data.data;
                                    this.src = this.privacy.templateUrl;
                                    console.log(this.src);
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                                
                            }).catch(error=>{
                                console.log(error);
                            })
						}else{
                            this.$api.list.privacy().then(res=> {
                                if(res.data.status == 200){
                                    this.privacy = res.data.data;
                                    this.src = this.privacy.tempUrl;
                                    console.log(this.src);
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                                
                            }).catch(error=>{
                                console.log(error);
                            })
                        }	
					}
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            //获取时间
            this.currentTime();
        }

    }
</script>
<style lang="scss" scoped>
.singed{
    background-color: #eff1f7;
    margin-top: 90px;
}
.singed-felx{ 
    padding: 10px 50px;
}
.singed-felxs{ 
    border-radius: 5px;
    background: #ffffff;
    padding: 20px;
}
.singed-new{
    padding: 10px 50px 0 0;
}
.singed-news{ 
    border-radius: 5px;
    background: #ffffff;
    padding: 20px;
    font-size: 16px;
    color: #213b4e;
}
.singed-title{
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 20px;
}
.singed-content{
    padding: 10px;
    color: #213b4e;
    font-size: 16px;
    line-height: 30px;
    text-align: justify;
    text-justify: newspaper;
    word-break: break-all;
    height: 66vh;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: inset -2px -2px 3px #cecdcd
}
.singed-content::-webkit-scrollbar,#scroll-news::-webkit-scrollbar,.index-task::-webkit-scrollbar,.news-lists::-webkit-scrollbar{
    display: none;
}
.singed-content{
    -ms-overflow-style: none;
}

.singed-content{
    overflow: -moz-scrollbars-none;
}
.circle{
    padding: 8px 8px;
    border-radius: 50%;
}
.circles{
    padding: 0 10px;
    border-radius: 50%;
}
.color1{
    background:rgba(206,218,228,1);
}
.color2{
    background:rgba(166,178,187,1);
}
.color3{
    background:rgba(255,222,198,1);
}
.color4{
    background:rgba(255,159,89,1);
}
.color5{
    background:rgba(174,214,255,1);
}
.color6{
    background:rgba(64,158,255,1);
}
.singed-line{
    margin: 50px 20px 0 0;
    padding: 22px 1px;
    background:rgba(206,218,228,1); 
}
.margin-right4{
    margin-right: -4px;
    margin-top: 25px;
}
</style>