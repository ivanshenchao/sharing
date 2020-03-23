<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="fill">
        <el-container>
            <el-main>
                <el-row class="fills">
                    <el-col class="fill-content" :span="10">
                        <el-row class="fill-input color-black text-center font-size18 line-height40 line-space2">
                            请完善以下个人信息以便于签约协议：
                        </el-row>
                        <el-row class="fill-input">
                            <el-col :span="10" class="text-right padding-right10 color-black font-size16 line-height40"><span>姓名：</span></el-col>
                            <el-col :span="10"><el-input placeholder="请填写姓名" v-model="form.accName" disabled></el-input><div class="tip-message"></div></el-col>
                        </el-row>
                        <el-row class="fill-input">
                            <el-col :span="10" class="text-right padding-right10 color-black font-size16 line-height40"><span>联系方式：</span></el-col>
                            <el-col :span="10"><el-input placeholder="请填写联系方式" v-model="form.accPhone" disabled></el-input><div class="tip-message"></div></el-col>
                        </el-row>
                        <el-row class="fill-input">
                            <el-col :span="10" class="text-right padding-right10 color-black font-size16 line-height40"><span>开户行：</span></el-col>
                            <el-col :span="10"><el-input placeholder="请填写开户行" v-model="form.bankName"></el-input><div class="tip-message"></div></el-col>
                        </el-row>
                        <el-row class="fill-input">
                            <el-col :span="10" class="text-right padding-right10 color-black font-size16 line-height40"><span>银行卡号：</span></el-col>
                            <el-col :span="10"><el-input placeholder="请填写银行卡号" v-model="form.bankCard"></el-input><div class="tip-message"></div></el-col>
                        </el-row>
                        <el-row class="fill-input">
                            <el-col :span="10" class="text-right padding-right10 color-black font-size16 line-height40"><span>身份证号：</span></el-col>
                            <el-col :span="10"><el-input placeholder="请填写身份证号" v-model="form.idCard"></el-input><div class="tip-message"></div></el-col>
                        </el-row>
                        <el-row class="fill-input submit">
                            <el-col :span="10" class="text-center margin10" style="margin-left:35%"><div class="el-button-copy" @click="singed">提 交</div></el-col>
                        </el-row>

                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>

</template>


<script>
    
    export default{

        data(){

            return{
                msg:'填写信息',
                form: {
                    accName:'',
                    accPhone:'',
                    capitalId:'',
                    cityId:'',
                    bankName:'',
                    bankCard:'',
                    idCard:'',
                    contractId:'',
                    submitToken: ''
                },
                submitToken:'',
            }
        },
        methods:{
             handleChange(value) {
                console.log(value);
            },
            singed(){
                let data = this.form;
                let params = {
                    accName: data.accName,
                    accPhone: data.accPhone,
                    capitalId:'',
                    cityId: '',
                    bankName: data.bankName,
                    bankCard: data.bankCard,
                    idCard: data.idCard,
                    contractId: data.contractId,
                    submitToken: this.submitToken,
                };
                this.$api.task.userSinged(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('签约成功！');
                        this.$parent.singedClose();
                    }else{
                        this.getToken();
                        this.$message.error(res.data.msg);
                    }
                   
                }).catch(error=>{
                    console.log(error);
                })
          },
          getToken(){
              this.$api.list.getToken().then(res=> {
                if(res.data.status == 200){
                    this.submitToken = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
          }
        },
        beforeMount(){
            //获取用户信息
            this.$api.list.privacy().then(res=> {
                if(res.data.status == 200){
                    this.form = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            //获取submitToken
            this.$api.list.getToken().then(res=> {
                if(res.data.status == 200){
                    this.submitToken = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    }
</script>
<style lang="scss">
.fill{
    background-color: #eff1f7;
    margin-top: 90px;
}
    .fills{
       padding: 80px 0;
       background: none
    }
    .fill-content{
        border-radius: 8px;
        margin-left:30%;
        background: #ffffff;
        padding-right: 50px
    }
    .fill-input{
        margin: 10px 0;
    }
    .fill-input .el-input__inner{
      height: 35px;
      line-height: 35px
    }
</style>