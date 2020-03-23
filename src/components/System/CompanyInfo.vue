<template>
    <div id="information">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">企业信息</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="admin-table">
            <div class="information-content">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="16" :lg="22" :xl="20" class="information-form">
                        <el-form ref="form" :model="form" label-width="110px">
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="information-form-col">
                                <el-row class="information-form-col-row">
                                    <el-col :span="24">
                                        <el-form-item label="基本信息：">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="企业名称：">
                                            <span>{{form.comName}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="所在地址：">
                                            <span>{{form.comName}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="社会信用代码：">
                                            <span>{{form.comCreditCode}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="营业执照：">
                                            <img v-if="form.fileUrl" :src="downUrl+form.fileUrl" class="avatar">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="电话：">
                                            <span>{{form.comTel}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="公司联系人：">
                                            <span>{{form.comConect}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="联系方式：">
                                            <span>{{form.comConectPhone}}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="information-form-col">
                                <el-row class="information-form-col-row">
                                    <el-col :span="24">
                                        <el-form-item label="发票信息：">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="发票抬头：">
                                            <span>{{form.comInvoice}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="发票类型：">
                                            <span>{{form.comInvoiceType}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="纳税人识别号：">
                                            <span>{{form.comTaxpayer}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="开户银行：">
                                            <span>{{form.comBankName}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="银行账号：">
                                            <span>{{form.comCardId}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="公司地址：">
                                            <span>{{form.comAddress}}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="information-form-col">
                                <el-row class="information-form-col-row">
                                    <el-col :span="24">
                                        <el-form-item label="收件信息：">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="收件人姓名：">
                                            <span>{{form.comGetUser}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="收件人地址：">
                                            <span>{{form.comGetAddress}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="邮政编码：">
                                            <span>{{form.comGetCode}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="手机号码：">
                                            <span>{{form.comGetPhone}}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
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
                msg:'系统管理--企业信息',
                form: {
                    comName:'', //企业名称
                    capitalId:'', //省份ID
                    cityId:'', //城市ID
                    comCreditCode:'', //统一社会信用代码
                    fileUrl:'', //营业执照文件名称
                    fileName:'', //营业执照文件URL
                    comTel:'', //电话
                    comConect:'', //公司联系人
                    comConectPhone:'', //联系方式
                    comInvoice:'', //发票抬头
                    comTaxpayer:'', //纳税人识别号
                    comAddress:'', //公司地址
                    comBankName:'', //开户银行
                    comCardId:'', //银行账号
                    comInvoiceType:'1', //发票类型
                    comGetUser:'', //收件人姓名
                    comGetAddress:'', //收件地址
                    comGetPhone:'', //手机号码
                    comGetCode:'', //邮政编码
                    submitToken:'' //重复提交token
                },
                capital:[], //省份数组
                city:[], //城市数组
                aid:'',
                downUrl:'',
            }
        },
        methods:{
            handleChange(value) {
                console.log(value);
            },
        },
        beforeMount(){
            //通过aid判断当前页面：0为新增  
            this.$api.list.getCompanyInfo().then(res=> {
                    if(res.data.status == 200){
                        this.form = res.data.data.company;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            //获取所有省份
            this.$api.list.getCapital().then(res=> {
                if(res.data.status == 200){
                    this.capital = res.data.data.list;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            });
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
        }
    }
</script>

<style lang="scss">
.information-content .el-form-item__label,.information-content .el-radio__label{
    color: #213b4e;
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