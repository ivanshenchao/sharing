<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index" class="padding10">
        <el-row class="index">
            <el-col class="index-content" :span="24">
                 <el-row class="index-content-item">
                    <el-col class="index-item index-item1 margin-pre2">
                        <div class="medical-task">
                            <div class="index-title font-size16 margin-left20 line-height60 color-balck font-weight">我的任务</div>
                            <div class="medical-task-empty" v-if="taskEmpty">
                                <div class="color-balck font-size16 text-center line-space1 medical-news-empty-title">您暂时还没有在进行中的任务，快去<span class="color-yellow">任务管理</span>处理进行发布吧。</div>
                            </div>
                            <div class="medical-task-list color-balck text-left" v-for="(item,index) in task" :key="index">
                                <p class="font-size16">{{index+1}}、《{{item.taskName}}》</p>
                                <p class="font-size14">进度：{{item.progress*100}}%</p>
                                <p class="font-size14">截止：{{item.endTime}}</p>
                                <p class="font-size14">已进行：{{item.days}}天</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="index-item index-item1">
                        <div class="medical-news">
                            <div class="index-title font-size16 margin-left20 line-height60 color-balck font-weight">我的消息</div>
                            <div class="medical-news-empty" v-if="newsEmpty">
                                <div class="color-balck font-size16 padding10 text-center line-space1 medical-news-empty-title">抱歉！您暂时还没有收到任何消息通知，快去<span class="color-yellow">任务管理</span>发布任务吧</div>
                            </div>
                            <div class="medical-news-list" v-for="(item,index) in news" :key="index">
                                <p class="color-balck text-left font-size16">{{index+1}}、{{item.msgTitle}}</p>
                                <p class="color-balck text-right font-size12">{{item.createTime}}</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="index-content-item">
                    <el-col class="index-item index-item2 margin-pre2">
                        <div class="medical-statistics-type">
                            <div class="index-title font-size16 margin-left20 line-height60 color-balck font-weight">
                                统计--任务类型
                                <el-select v-model="days" placeholder="请选择时间" class="text-right margin-left20" @change="selectCapital">
                                    <el-option label="近一个月" value="30"></el-option>
                                    <el-option label="近三个月" value="90"></el-option>
                                    <el-option label="近半年" value="180"></el-option>
                                    <el-option label="近一年" value="360"></el-option>
                                </el-select>
                                </div>
                            <div class="medical-statistics-type-empty text-center" v-if="typeEmpty">
                                <img src="../../assets/images/img.png" alt="暂无数据">
                            </div>
                            <div class="medical-statistics-type-list text-center padding-left20">
                                <div id='typeChart' style="width: 92%;height: 320px;margin-top: -10px;"></div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="index-item index-item2">
                        <div class="medical-statistics-status">
                            <div class="index-title font-size16 margin-left20 line-height60 color-balck font-weight">本月统计--任务状态</div>
                            <div class="medical-statistics-status-list">
                                <div id='statusChart' style="width: 98%;height: 360px;margin-top: -50px"></div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>


<script>
import store from '../../vuex/store.js'
    export default{
        data(){
            return{
                msg:'药企首页',
                agencyList: [],
                agencyAdd: [],
                task : [],
                news : [],
                type : [],
                taskEmpty: true,
                newsEmpty: true,
                typeEmpty: true,
                dialogVisible: false,
                radio: '',
                agencyRef : [],
                agencyAll : [],
                agencyid : '',
                agencyOid : 0,
                days : '30'
            }
        },
        methods:{
            // 合作代理加载、新增、替换
            agencyLoad(data){
                this.agencyList = data;
                let len = this.agencyList.length;
                this.agencyAdd = [];
                if(len<3){
                    for(let i=0; i<3-len; i++){
                        this.agencyAdd.push(i);
                    }
                }else{
                    return false
                }
            },
            // 合作代理加载
            agencyAllLoad(){
                this.$api.list.cooperation().then(res=> {
                    if(res.data.code == 1){
                        let data = res.data.data;
                        console.log(data.list.length);
                        this.agencyLoad(data.list);
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            // 合作代理新增
            add(){
                // 所有代理商加载
                let params= 0;
                this.$api.list.allAgent(params).then(res=> {
                    if(res.data.code == 1){
                        this.agencyOid = 0;
                        this.agencyRef = res.data.data;
                        this.dialogVisible = true;
                        
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            // 合作代理替换
            replace(id){
                // 所有代理商加载
                let params= id;
                this.agencyOid = params;
                this.$api.list.allAgent(params).then(res=> {
                    if(res.data.code == 1){
                        this.agencyRef = res.data.data;
                        this.dialogVisible = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            //弹窗关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            cancleBtn(msg){
                this.dialogVisible = false;
			    this.$message(msg);
            },
            changeAgent(){
                // 提交所选合作代理商
                let params= {
                    id : this.radio,
                    oid : this.agencyOid
                };
                this.$api.list.cooperationPost(params).then(res=> {
                    console.log(res);
                    if(res.data.code == 1){
                        this.$message.success(res.data.msg);
                        this.dialogVisible = false;
                        this.agencyAllLoad();
                        //this.$router.go(0)
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    
                }).catch(error=>{
                    console.log(error);
                })
            },
            drawLine(xData,yData,tip){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('typeChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['柱状图','折线图'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    toolbox: {        //工具盒
                        show: true,
                        feature: {
                            magicType: {type: ['line', 'bar']},
                        },
                        iconStyle:{
                            normal:{
                                borderColor:'#409EFF',//设置颜色
                            },
                            emphasis:{
                                textPosition:'center',
                                borderColor:'#409EFF',
                            }
                        }
                    },
                    xAxis: [
                        {
                            axisLabel:{
                                interval: 0,
                                rotate: 45,
                                show: true,
                            },
                            type: 'category',
                            axisLine: {
                                lineStyle: {
                                    color: '#1111111'
                                }
                            },
                            data: xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '数量：',
                            axisLine: {
                                lineStyle: {
                                    color: '#1111111'
                                }
                            },
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [{
                    name:tip+'数量',
                    data: yData,
                    type: 'bar',
                    symbolSize: 6,
                    symbol : 'circle',
                    itemStyle:{  //折线拐点的样式
                        normal:{
                            opacity:1,
                            borderWidth: 1,
                            color: function(params) { //折线拐点的颜色
                                // build a color map as your need.
                                var colorList = [
                                    '#DA8964','#D15B57','#75B0B5','#4A859D','#c5ee4a',
                                    '#87ee4a','#46eda9','#47e4ed','#4bbbee','#7646d8',
                                    '#924ae2','#C6E579','#F4E001','#F0805A','#26C0C0'
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    lineStyle:{  //线条的样式
                        normal:{
                            color:'#FF9400',  //折线颜色
                            opacity: 1
                        }
                    },
                }]
            });
            },
             drawCycle(name,data){
                 // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('statusChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        left: 'right',
                        data: name,
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    series : [
                        {
                            name: '完成度',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal: {
                                    label:{
                                        show : true,
                                        formatter: '{b} : {c}({d})%',
                                    },
                                    labelLine :{show:true}
                                }
                            }
                        }
                    ]
                })
             },
             //选择时间加载任务类型
             selectCapital(){
                 this.gettypeCensus()
             },
             // 任务类型加载
             gettypeCensus(){
                 this.$api.list.typeCensus(this.days).then(res=> {
                    if(res.data.status == 200){
                        console.log(res);
                        let data = res.data.data;
                        if(data.length>0){
                            this.typeEmpty = false;
                            let xData = [];
                            let yData=[];
                            data.forEach(element => {
                                xData.push(element.taskType);
                                yData.push(element.countSum);
                            });
                            let tip='';
                            this.drawLine(xData,yData,tip);
                        }
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
             }
            
        },
        mounted(){
            // 我的任务加载
            this.$api.list.taskYaoQi().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    if(data.list.length>0){
                         this.taskEmpty = false;
                         this.task = data.list;
                    }
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            // 消息加载
            this.$api.list.notices().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    if(data.length>0){
                        this.newsEmpty = false;
                        this.news = data;
                    }
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            // 本月统计加载
            // 任务类型加载
            this.gettypeCensus();
            // 任务状态加载
            this.$api.list.statusCensus().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    let statusName = ["待发布","待验收","待打款","已完成"];
                    let statusData = [
                            {value:data.dfb,name:statusName[0],itemStyle:{color:'#75B0B5'}},
                            {value:data.dys,name:statusName[1],itemStyle:{color:'#F28C8C'}},
                            {value:data.ddk,name:statusName[2],itemStyle:{color:'#75B0B5'}},
                            {value:data.ywc,name:statusName[3],itemStyle:{color:'#92C7B2'}}
                        ];
                    this.drawCycle(statusName,statusData);
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
.index-item{
    width: 49%;
    margin: 0.5% 0.5%;
    background: #ffffff;
    border-radius:10px;
    overflow: hidden;
}
.index-item1{
    height: 420px;
}
.index-item2{
    height: 400px;
}
.cooperation-agency-add,.cooperation-agency-list{
    width: 33%;
    float: left;
}
.cooperation-agency-add-item,.cooperation-agency-list-item{
    margin: 0 auto;
    width:135px;
    height:150px;
    cursor: pointer;
    border:2px solid rgba(255,148,0,1);
    border-radius:5px;
    color: #213b4e;
    overflow: hidden;
}
.cooperation-agency-add-item{
    line-height: 120px;
}
.cooperation-agency-add-item:hover{
    color: rgba(255,148,0,1);
}
.replace{
    width: 60px;
    padding: 5px;
    border-radius: 30px;
    margin: 10px auto;
    background: rgba(255,148,0,1);
}
.replace:hover{
    background: #ff8400;
}
.agency-name{
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}
.medical-task-list{
    margin: 0 30px;
    padding: 0;
    height: 38px;
    border-bottom: 1px solid #eeeeee;
    line-height: 38px;
    overflow: hidden;
}
.medical-task-list:last-child{
    border-bottom: 1px solid #475060;
}
.medical-task-list P{
    float: left;
    margin: 0;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}
.medical-task-list p:first-child{
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.medical-task-list p:last-child{
    float: right;
    width: 101px;
    text-align: right
}
.medical-news-empty-title{
    margin: 100px 0
}
.medical-news-list{
    margin: 0 30px;
    border-bottom: 1px solid #eeeeee;
}
.medical-news-list p{
    margin: 0;
    padding: 0;
}
.medical-news-list p:first-child{
    margin-top: 10px
}
.medical-news-list p:last-child{
    margin-top: 5px;
    margin-bottom: 5px
}
</style>