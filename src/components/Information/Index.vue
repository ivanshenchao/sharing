<template>
    <div id="index">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  to="./index">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">个人信息</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <section class="admin-table">
            <el-col :span="24" class="information">
                <el-col :span="24" class="informations">
                <el-row>
                    <el-col :span="24">
                        <el-form ref="form" :model="form" label-width="150px">
                            <el-row>
                                <el-col :span="24">
                                    <el-col :span="24" class="header-info"><span class="color-red">*</span>认证信息</el-col>
                                    <el-col :span="24" class="header-border">
                                        <p class="border-bottom"></p>
                                    </el-col>
                                    <el-col :span="12" class="padding-info">
                                        <el-form-item label="姓名：">
                                            <el-input placeholder="请填写姓名" v-model="form.accName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" class="padding-info">
                                        <el-form-item label="身份证号：">
                                            <el-input placeholder="请填写身份证号" v-model="form.idCard"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" class="padding-info">
                                        <el-form-item label="开户行：">
                                            <el-input placeholder="请填写开户行" v-model="form.bankName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" class="padding-info">
                                        <el-form-item label="银行卡号：">
                                            <el-input placeholder="请填写银行卡号" v-model="form.bankCard"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                 <el-col :span="24">
                                    <el-col :span="24" class="header-info"><span class="color-red">*</span>基本资料</el-col>
                                    <el-col :span="24" class="header-border">
                                        <p class="border-bottom"></p>
                                    </el-col>
                                    <el-col :span="12" class="padding-info">
                                       <el-form-item label="登录名：">
                                            <el-input v-model="form.accAccount" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" class="padding-info">
                                        <el-form-item label="联系方式：">
                                            <el-input placeholder="请填写联系方式" v-model="form.accPhone"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" class="padding-info">
                                        <el-form-item label="所在地区：">
                                            <el-col :span="12">
                                                <el-select v-model="form.capitalId" placeholder="请选择省份" @change="getCity" clearable>
                                                    <el-option v-for="item in capital" :key="item.areaId" :label="item.areaName" :value="item.areaId">                                            </el-option>
                                                </el-select>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-select v-model="form.cityId" placeholder="请选择城市" clearable>
                                                    <el-option v-for="item in city" :key="item.areaId" :label="item.areaName" :value="item.areaId">                                            </el-option>
                                                </el-select>
                                            </el-col>
                                            
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" class="padding-info">
                                        <el-form-item label="联系地址：">
                                            <el-input placeholder="请填写联系地址" v-model="form.address"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="24">
                                    <el-col :span="24" class="header-info">个人标签</el-col>
                                    <el-col :span="24" class="header-border">
                                        <p class="border-bottom"></p>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="侧重科室：">
                                            <el-checkbox-group v-model="checkDesk">
                                                <el-checkbox-button v-for="(item,index) in desk" :label="item.depId" :key="index">{{item.depName}}</el-checkbox-button>
                                            </el-checkbox-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="侧重类型：">
                                            <el-checkbox-group v-model="checkType">
                                                <el-checkbox-button v-for="(item,index) in type" :label="item.typeId" :key="index">{{item.typeName}}</el-checkbox-button>
                                            </el-checkbox-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="侧重地区(多选)：">
                                            <el-cascader v-model="address" :options="options" :props="{ multiple: true, checkStrictly: true }" clearable></el-cascader>
    
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="其他：">
                                            <el-col :span="16">
                                                <el-input type="textarea" :rows="1" placeholder="请输入..." v-model="otherString"></el-input>
                                            </el-col>
                                            <el-col :span="8" class="padding-left20 padding-top5">
                                                <div class="el-button-copys" @click="submitAdd">确 定</div>
                                            </el-col>
                                            <el-col :span="24" class="margin-top20">
                                                <span class="other" v-for="(item,index) in other" :key="index">{{item}}</span>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="24" class="information-submit text-right">
                                    <div class="el-button-copy" @click="submit">保 存</div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
            </el-col>
            
        </section>
    </div>
</template>

<script>
    
    export default{

        data(){

            return{
                msg:'个人信息',
                form: {},
                capital:[],
                city:[],
                desk:[],
                type:[],
                checkDesk:[],
                checkType:[],
                options:[],
                address:[],
                accAccount:'',
                other:[],
                otherString:'',
            }
        },
        methods:{
            handleChange(value) {
                console.log(value);
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
            //其它添加
            submitAdd(){
                if(this.otherString){
                    this.other.unshift(this.otherString);
                    this.otherString = '';
                }
            },
            //保存返回函数
            addBack(data){
                let params = {};
                params.agId = this.form.accId;
                //params.roleId = this.form.roleId;
                params.agName = this.form.accName;
                params.agConectPhone = this.form.accPhone;
                params.capitalId = this.form.capitalId;
                params.cityId = this.form.cityId;
                params.agBankName = this.form.bankName;
                params.agBankCard = this.form.bankCard;
                params.agCardId = this.form.idCard;
                params.agConAddress = this.form.address;
                params.submitToken = data;
                params.depIds = this.checkDesk.toString();
                params.typeIds = this.checkType.toString();
                params.contents = this.other.toString();
                let arr = [];
                this.address.forEach(element => {
                    let obj = {};
                    if(element.length<2){
                        obj.capitalId = element[0];
                        obj.cityId = 0;
                    }else{
                        obj.capitalId = element[0];
                        obj.cityId = element[1];
                    }
                    arr.push(obj);
                });
                params.areaIds = arr;
                this.$api.task.userPost(params).then(res=> {
                    if(res.data.status == 200){
                        this.$message.success('保存成功');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                   
                }).catch(error=>{
                    console.log(error);
                })
            },
            submit(){
                this.getNewToken(this.addBack);
            },
            //获取重复提交token，用户提交表单验证重复性
            getNewToken(callback){
                this.$api.list.getToken().then(res=> {
                    if(res.data.status == 200){
                        callback(res.data.data);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
        beforeMount(){
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
            //获取所有省份
            this.$api.list.getCapitalAll().then(res=> {
                if(res.data.status == 200){
                    this.options = res.data.data.options;
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
            //获取用户信息
            this.$api.list.userAgent().then(res=> {
                console.log(res);
                if(res.data.status == 200){
                    let data = res.data.data;
                    this.form = data.account;
                    this.desk = data.agDep.allDeps;
                    if(data.agDep.existDeps.length>0){
                        this.checkDesk = data.agDep.existDeps;
                    } 
                    this.type = data.agType.allTypeIds;
                    if(data.agType.existTypeIds.length>0){
                        this.checkType = data.agType.existTypeIds;
                    } 
                    if(data.others.others.length>0){
                        this.other = data.others.others;
                    } 
                    if(data.agArea.length>0){
                        this.address = data.agArea;
                    } 
                    if(data.account.capitalId){
                        let parmas = {capitalId : this.form.capitalId};
                        this.$api.list.getCity(parmas).then(res=> {
                            if(res.data.status == 200){
                                this.city = res.data.data.list;
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
    }
</script>

<style lang="scss">
.information{
    padding: 30px 15px;
}
.informations{
    background-color: white;
}
.header-info{
    padding-left: 30px;
    margin: 15px 0;
    font-size: 16px;
    color: #213b4e;
    border-left: 5px solid rgba(64,158,255,1);
}
.header-border{
    padding: 0 30px;
    margin-bottom: 20px;
}
.border-bottom{
    margin: 0;
    border-bottom: 1px solid rgba(238,238,238,1);
}
.padding-info{
    padding-right: 10%;
}
.information-content .el-form-item__label{
    color: white;
}

.input-item{
    padding-right: 20%;
}
.el-checkbox-button__inner{
    margin-right: 15px;
    border-left: 1px solid #DCDFE6;
    margin-bottom: 15px;
}
.other{
    background-color: rgb(39, 198, 226);
    padding: 10px;
    margin-left: 10px;
    color: white;
    border-radius: 5px;
}
.el-button-copys{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: white;
    background-color: #409EFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
}
.el-button-copys:hover{
    background: rgb(46, 135, 224);
}
.el-button-copys:active{
    background: rgb(21, 101, 180);
}
.information-submit{
    padding: 20px 50px;
}
</style>
