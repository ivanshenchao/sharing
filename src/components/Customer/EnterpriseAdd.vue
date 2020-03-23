<template>
    <div id="information">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="../index">首页</el-breadcrumb-item>
                <el-breadcrumb-item to="../EnterpriseInfo">企业信息</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">新增药企</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="admin-table" style="padding: 60px 30px">
            <div class="information-content">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="16" :lg="22" :xl="20" class="information-form">
                        <el-form ref="form" :model="form" label-width="110px">
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="information-form-col color-black">
                                <el-row class="information-form-col-row">
                                    <el-col :span="24">
                                        <el-form-item label="基本信息：">
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="企业名称：">
                                            <el-input placeholder="请输入企业名称" v-model="form.comName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="所在地址：">
                                            <el-select v-model="form.capitalId" placeholder="请选择所在省份" @change="getCity">
                                                <el-option v-for="item in capital" :key="item.areaId" :label="item.areaName" :value="item.areaId">                                            </el-option>
                                            </el-select>
                                            <el-select v-model="form.cityId" placeholder="请选择所在城市">
                                                <el-option v-for="item in city" :key="item.areaId" :label="item.areaName" :value="item.areaId">                                            </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="社会信用代码：">
                                            <el-input placeholder="请请输入统一社会信用代码" v-model="form.comCreditCode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="营业执照：">
                                            <el-upload :action="url" :headers="myHeaders"  accept=".png,.jpg,.jpeg,.bmp,.tif" :show-file-list="showFile" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="responseAction">
                                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="电话：">
                                            <el-input placeholder="请输入公司电话" v-model="form.comTel"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="公司联系人：">
                                            <el-input placeholder="请输入公司联系人" v-model="form.comConect"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="联系方式：">
                                            <el-input placeholder="请输入联系方式" v-model="form.comConectPhone"></el-input>
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
                                            <el-input placeholder="请输入发票抬头" v-model="form.comInvoice"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="发票类型：">
                                            <el-radio v-model="form.comInvoiceType" label="1">企业增值税普通发票</el-radio>
                                            <el-radio v-model="form.comInvoiceType" label="2">增值税专用发票</el-radio>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="纳税人识别号：">
                                            <el-input placeholder="请输入纳税人识别号" v-model="form.comTaxpayer"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="开户银行：">
                                            <el-input placeholder="请请输入基本开户银行名称" v-model="form.comBankName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="银行账号：">
                                            <el-input placeholder="请输入基本银行账号" v-model="form.comCardId"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="公司地址：">
                                            <el-input placeholder="请输入注册场所地址" v-model="form.comAddress"></el-input>
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
                                            <el-input placeholder="请输入收件人姓名" v-model="form.comGetUser"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="收件人地址：">
                                            <el-input placeholder="请输入收件人地址" v-model="form.comGetAddress"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="邮政编码：">
                                            <el-input placeholder="请输入邮政编码" v-model="form.comGetCode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-form-item label="手机号码：">
                                            <el-input placeholder="请输入手机号码" v-model="form.comGetPhone"></el-input>
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
    import base from '../../request/base';
    import store from '../../vuex/store.js';
    export default{

        data(){

            return{
                msg:'企业信息--新增药企',
                form: {
                    comName:'', //企业名称
                    capitalId:'', //省份ID
                    cityId:'', //城市ID
                    comCreditCode:'', //统一社会信用代码
                    comCreditUrl:'', //营业执照
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
                url:'',
                token:'',
                imageUrl:'',
                myHeaders:{},
                showFile: true,
                downUrl:'',
            }
        },
        methods:{
            handleChange(value) {
                console.log(value);
            },
            //上传
            responseAction(response){
                console.log(response);
                this.imageUrl = this.downUrl+response.data.fileUrl;
                this.showFile = false;
                this.form.fileId = response.data.fileId;
                console.log(this.imageUrl);
            },
            handleRemove(file, fileList) {
                console.log(2);
            },
            handlePictureCardPreview(file) {
                 console.log(3);
                this.imageUrl = file.url;
            },
            responseActions(response){
                console.log(response);
                this.imageUrls =this.downUrl+response.data.fileUrl;
                this.showFiles = false;
                this.forms.fileId = response.data.fileId;
                console.log(this.imageUrl);
            },
            //下拉加载城市
            getCity(){
                this.form.cityId = '';
                let parmas = {capitalId : this.form.capitalId};
                //获取当前省份城市
                this.$api.list.getCity(parmas).then(res=> {
                    if(res.data.status == 200){
                        this.city = res.data.data.list;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            },
            submit(){
                let params = this.form;
                let id = this.aid;
                //获取重复提交token，用户提交表单验证重复性
                this.$api.list.getToken().then(res=> {
                    if(res.data.status == 200){
                        params.submitToken = res.data.data;
                        //提交数据
                        if(id == 0){
                            this.$api.list.insert(params).then(res=> {
                                if(res.data.status == 200){
                                    this.$message.success('操作成功！');
                                    this.$router.push({
                                        path:'/EnterpriseInfo'
                                    })
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                            
                            }).catch(error=>{
                                console.log(error);
                            })
                        }else{
                            this.$api.list.editCompany(params).then(res=> {
                                if(res.data.status == 200){
                                    this.$message.success('操作成功！');
                                    this.$router.push({
                                        path:'/EnterpriseInfo'
                                    })
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                            
                            }).catch(error=>{
                                console.log(error);
                            })
                        }
                        
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
                
            }
        },
        beforeMount(){
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
            //通过aid判断当前页面：0为新增  
            this.aid = this.$route.params.aid;
            if(this.aid != 0 ){
                this.msg = "企业信息--修改药企";
                //获取修改的企业信息
                let params = {comId	: this.aid}
                this.$api.list.getInfoCompany(params).then(res=> {
                    if(res.data.status == 200){
                        let data = res.data.data;
                        this.form = data.company;
                        this.form.fileId = data.file.fileId;
                        this.imageUrl = this.downUrl+data.file.fileUrl;
                        console.log(res);
                        this.form.comInvoiceType = this.form.comInvoiceType.toString();
                        //获取当前省份城市
                        let id = {capitalId : this.form.capitalId};
                        this.$api.list.getCity(id).then(res=> {
                            if(res.data.status == 200){
                                this.city = res.data.data.list;
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        }).catch(error=>{
                            console.log(error);
                        })
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
            //获取所有省份
            this.$api.list.getCapital().then(res=> {
                if(res.data.status == 200){
                    this.capital = res.data.data.list;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
            //上传地址
            this.url = base+"/upload/fileUpload";
            //获取token
            this.token = store.state.token;
            //获取token
            this.myHeaders.token = store.state.token;
            
        }
    }
</script>

<style lang="scss">

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