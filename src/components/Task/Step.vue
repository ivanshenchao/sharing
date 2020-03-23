<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <el-steps :space="150" :active="statusStep" :finish-status="statusFinish">
            <el-step :title="step1"></el-step>
            <el-step :title="step2"></el-step>
            <el-step :title="step3" :description="description"></el-step>
            <el-step :title="step4"></el-step>
            <el-step :title="step5"></el-step>
        </el-steps>
    </div>

</template>


<script>
    export default{
        props:{
            stepDescription : String,
            stepName : String
        },
        data(){
            return{
                msg:'任务周期',
                statusStep: 0,
                step1:'发布任务',
                step2:'分配任务',
                step3:'提交资料',
                step4:'审核通过',
                step5:'验收通过',
                description:'',
                statusFinish:'success',//wait / process / finish / error / success
            }
        },
        methods:{
            step(){
                let name = this.stepName;
                    if(name == "发布任务"){
                        this.statusStep = 1;
                    }else if(name == "待发布"){
                        this.statusStep = 0;
                    }else if(name == "分配任务"){
                        this.statusStep = 2;
                    }else if(name == "提交资料"){
                        this.statusStep = 3;
                        this.description = '';
                    }else if(name == "审核通过"){
                        this.statusStep = 4;
                        this.description = '';
                    }else if(name == "审核未通过"){
                        this.statusStep = 3;
                        this.description = '审核未通过原因：'+this.stepDescription;
                    }else if(name == "验收通过"){
                        this.statusStep = 5;
                        this.description = '';
                    }else if(name == "验收未通过"){
                        this.statusStep = 4;
                        this.description = '验收未通过原因：'+this.stepDescription;
                    }else{
                        this.statusStep = 5;
                        this.description = '';
                    }          
            }
        },
        components:{},
        mounted(){
            this.step();
        },
        watch:{
            stepName(newValue, oldValue) {
                let thef= this;
                thef.stepName = newValue;
                this.step();
                //console.log(1+newValue);        //父组件param对象改变会触发此函数
            },
            stepDescription(newValue, oldValue) {
                let thef= this;
                thef.stepDescription = newValue;
                this.step();
                //console.log(1+newValue);        //父组件param对象改变会触发此函数
            }

        }

    }
</script>

<style lang="scss" scoped>

</style>