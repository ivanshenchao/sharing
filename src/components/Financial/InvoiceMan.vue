<template>
    <div id="information">
        <div class="information">
            <div class="name color-white font-size16 line-space2 margin-tops20"><p>{{msg}}</p></div>
            <div class="information-content">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="16" :lg="22" :xl="20" class="information-form">
                        <el-form ref="form" :model="form" label-width="110px">
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="information-form-col">
                                <el-row class="information-form-col-row">
                                    <el-col :span="24">
                                        <el-form-item label="发票信息：">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="发票抬头：">
                                            <el-input placeholder="请输入发票抬头" v-model="form.invoice_rise"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="发票类型：">
                                            <el-radio v-model="form.invoice_type" label="企业增值税普通发票">企业增值税普通发票</el-radio>
                                            <el-radio v-model="form.invoice_type" label="增值税专用发票">增值税专用发票</el-radio>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="税务登记账号：">
                                            <el-input placeholder="请输入税务登记账号" v-model="form.taxation"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="基本开户银行：">
                                            <el-input placeholder="请请输入基本开户银行名称" v-model="form.deposit_bank"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="基本开户账号：">
                                            <el-input placeholder="请输入基本开户账号" v-model="form.account"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="注册场所地址：">
                                            <el-input placeholder="请输入注册场所地址" v-model="form.place_address"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="注册固定电话：">
                                            <el-input placeholder="请输入注册固定电话" v-model="form.fixed_tel"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="information-form-col">
                                <el-row class="information-form-col-row">
                                    <el-col :span="24">
                                        <el-form-item label="收件地址：">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="收件人姓名：">
                                            <el-input placeholder="请输入收件人姓名" v-model="form.consignee"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="收件人地址：">
                                            <el-input placeholder="请输入收件人地址" v-model="form.address"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="邮政编码：">
                                            <el-input placeholder="请输入邮政编码" v-model="form.zip_code"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="手机号码：">
                                            <el-input placeholder="请输入手机号码" v-model="form.phone_number"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col class="text-center margin-top20">
                                <div class="el-button-copy" @click="submit">提 交</div>
                            </el-col>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default{

        data(){

            return{
                msg:'个人信息',
                form: {
                    id:'',
                    drug_id:'',
                    invoice_rise:'',
                    taxation:'',
                    deposit_bank:'',
                    account:'',
                    place_address:'',
                    invoice_type:'企业增值税普通发票',
                    fixed_tel:'',
                    address:'',
                    zip_code:'',
                    phone_number:''
                }
            }
        },
        methods:{
            handleChange(value) {
                console.log(value);
            },
            submit(){
                let data = this.form;
                let params = data;
                this.$api.list.invoiceManagePost(params).then(res=> {
                    if(res.data.code == 1){
                        this.$message.success(res.data.msg);
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
            this.$api.list.invoiceManage().then(res=> {
                if(res.data.code == 1){
                    let data = res.data.data;
                    this.form = data;
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
.information-content .el-form-item__label,.information-content .el-radio__label{
    color: white;
}
// .information-form{
//     margin: 20px 0 0 30%;
// }
.information-form{
    padding-top: 30px
}
.information-form .el-input__inner{
    width: 350px;
    height: 35px;
    line-height: 35px
}
.information-submit{
    margin: 10px 200px
}
.information-form-col-row{
    width: 460px;
    overflow: hidden;
    margin: 0 auto
}
</style>