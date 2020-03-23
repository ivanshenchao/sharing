<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="index">
        <el-row class="index padding20">
            <el-col class="index-content" :span="24">
                 <el-row class="index-content-item">
                    <el-col class="index-item index-item1 index-items1 margin-pre2">
                        <div class="medical-task">
                            <div class="index-title font-size16 margin-left20 line-height60 color-black font-weight">我的任务</div>
                            <div class="medical-task-empty" v-if="taskEmpty">
                                <div class="text-center margin-top20"><img src="../../assets/images/img.png" alt="暂无数据"></div>
                            </div>
                            <div class="medical-task-list color-black text-left" v-for="(item,key) in task" :key="key">
                                <div class="medical-task-list-title">
                                    <p class="font-size16">{{key+1}}、《{{item.taskName}}》</p>
                                    <p class="font-size14">截止：{{item.endTime}}</p>
                                    <p class="font-size14">剩余：{{item.surplusDay}}天</p>
                                </div>
                                <div class="medical-task-list-item" v-for="(items,keys) in item.taskChildInfo" :key="keys">
                                    <p class="font-size14">{{items.taskName}}</p>
                                    <p class="font-size14">{{items.taskType}}</p>
                                    <p class="font-size14">
                                        <span v-show="items.taskState == 1">待提交</span>
                                        <span v-show="items.taskState == 2">待审核</span>
                                        <span v-show="items.taskState == 3">审核通过</span>
                                        <span v-show="items.taskState == 4">审核失败</span>
                                    </p>
                                    <p class="font-size14 color-yellow" @click="info(items.id)">查看</p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="index-item index-item1 index-items2">
                        <div class="medical-news">
                            <div class="index-title font-size16 margin-left20 line-height60 color-black font-weight">我的消息</div>
                            <div class="medical-news-empty" v-if="newsEmpty">
                                <div class="color-black font-size16 padding10 text-center line-space1 medical-news-empty-title">抱歉！您暂时还没有收到任何消息通知，快去<span class="color-yellow">任务管理</span>发布任务吧</div>
                            </div>
                            <div class="medical-news-list" v-for="(item,index) in news" :key="index">
                                <p class="color-black text-left font-size16">{{index+1}}、{{item.msgTitle}}</p>
                                <p class="color-black text-right font-size12">{{item.createTime}}</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="index-content-item">
                    <el-col class="index-item index-item2 index-items3 margin-pre2">
                        <div class="medical-statistics-type">
                            <div class="index-title font-size16 margin-left20 line-height60 color-black font-weight">本月统计--任务类型</div>
                            <div class="medical-statistics-type-empty text-center" v-if="typeEmpty">
                                <img src="../../assets/images/img.png" alt="暂无数据">
                            </div>
                            <div class="medical-statistics-type-list text-center">
                                <div id='typeChart' style="width: 100%;height: 340px;margin-top: -10px;"></div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="index-item index-item2 index-items4">
                        <div class="medical-statistics-accomplish">
                            <div class="index-title font-size16 margin-left20 line-height60 color-black font-weight">本月统计--完成率</div>
                            <div class="medical-statistics-accomplish-list">
                                <div class="accomplish-list color-black font-size14">
                                    <p class="text-center">任务总量：{{taskGross}}</p>
                                    <p class="text-center">已提交：{{submitNum}}</p>
                                    <p class="text-center">未提交：{{unSubmitNum}}</p>
                                </div>
                                <div id='accomplishChart' style="width: 100%;height: 360px;"></div>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="index-item index-item2 index-items5">
                        <div class="medical-statistics-status">
                            <div class="index-title font-size16 margin-left20 line-height60 color-black font-weight">本月统计--任务状态</div>
                            <div class="medical-statistics-status-list">
                                <div id='statusChart' style="width: 95%;height: 330px;margin-top: -20px"></div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
       
    </div>

</template>


<script>
    export default{
        data(){
            return{
                msg:'代理首页',
                task: [],
                news: [],
                taskObj:{},
                statusObj:{},
                taskEmpty: true,
                newsEmpty: true,
                typeEmpty: true,
                taskGross: 0,
                submitNum: 0,
                unSubmitNum: 0

            }
        },
        methods:{
            //任务查看
            info(id){
                this.$router.push({
                    path: './MyTask'
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
                                    color: '#111111'
                                }
                            },
                            data: xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '本月数量：',
                            axisLine: {
                                lineStyle: {
                                    color: '#111111'
                                }
                            },
                            // min: 0,
                            // max: 250,
                            // interval: 50,
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
                        top: 20,
                        left: 'right',
                        width : 200,
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
                },true)
             },
             drawGauge(name,data){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('accomplishChart'))
                // 绘制图表
                myChart.setOption({
                   tooltip : {
                      formatter: "{a} <br/>{b} : {c}%"
                    },
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            detail: {formatter:'{value}%'},
                            data: [{value: data, name: ''}],
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 5
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 10,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 12,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            axisLabel: {            // 刻度标签。
                                show: false,             // 是否显示标签,默认 true。
                                distance: 5,            // 标签与刻度线的距离,默认 5。
                                color: "#fff",          // 文字的颜色,默认 #fff。
                                fontSize: 22,           // 文字的字体大小,默认 5。
                                formatter: "{value}",   // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                            },
                            title : {               //设置仪表盘中间显示文字样式
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    //fontWeight: 'bolder',
                                    fontSize: 14,
                                    //fontStyle: 'italic',
                                    color:"white"
                                }
                            }
                        }
                    ] 
                })
            }
        },
        mounted(){
            // 我的任务加载
            this.$api.list.taskDaiLi().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    if(data.length>0){
                         this.taskEmpty = false;
                         this.task = data;
                         console.log(this.task);
                    }
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            // 消息加载
            this.$api.list.noticeAgent().then(res=> {
                console.log(res);
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
            this.$api.list.typeCensusDaiLi().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    if(data.length>0){
                        this.typeEmpty = false;
                        let nowDate = new Date();
                        let date = {
                            year: nowDate.getFullYear(),
                            month: nowDate.getMonth() + 1,
                            date: nowDate.getDate(),
                        }
                         let xData = [];
                        let yData=[];
                        data.forEach(element => {
                            xData.push(element.taskType);
                                yData.push(element.countSum);
                        });
                        let tip=date.month+'月';
                        this.drawLine(xData,yData,tip);
                    }
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            // 任务状态加载
            this.$api.list.statusCensusDaiLi().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    let statusName = ["待提交","待审核","审核通过"];
                    let statusData = [
                            {value:data.unSubmitCountRate,name:statusName[0],itemStyle:{color:'#75B0B5'}},
                            {value:data.reviewCountRate,name:statusName[1],itemStyle:{color:'#F28C8C'}},
                            {value:data.submitContRate,name:statusName[2],itemStyle:{color:'#75B0B5'}},
                        ];
                    this.drawCycle(statusName,statusData);
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            })
            //任务完成率加载
            this.$api.list.wanCensusDaiLi().then(res=> {
                if(res.data.status == 200){
                    let data = res.data.data;
                    this.taskGross = data.sumCount;
                    this.submitNum = data.submitCont;
                    this.unSubmitNum = data.unSubmitCount;
                    let percentage = 0;
                    if(this.taskGross>0){
                        percentage = this.submitNum / this.taskGross;
                        percentage = (percentage*100).toFixed(2);
                    }
                    this.drawGauge('任务完成率',percentage);
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
.index-item1{
    height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.index-item1::-webkit-scrollbar {
    display: none;
 }
.index-items1{
    width: 53%;
}
.index-items2{
    width: 45%;    
}
.index-items3{
    width: 40%;
    height: 400px;
    overflow: hidden;
}
.index-items4{
    width: 22%;
    height: 400px;
     overflow: hidden;
}
.index-items5{
    width: 35%;
    height: 400px;
    overflow: hidden;
}
.index-item{
    margin: 0.5% 0.5%;
    background: #ffffff;
    border-radius:10px;
}

.medical-task-list{
    margin: 0 30px 15px 30px;
    padding: 0;
}
.medical-task-list-title{
    height: 22px;
    overflow: hidden;
}
.medical-task-list-item{
    height: 30px;
    margin-top: 10px;
    padding-left: 30px;
    border-bottom: 1px solid #eeeeee;
    overflow: hidden;
}
.medical-task-list-item p{
    float: left;
    margin: 0 0 8px 0;
    padding: 0 10px;
     white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    cursor: pointer;
}
.medical-task-list-item p:first-child{
    width: 40%;
}
.medical-task-list-item p:not(:first-child){
    width: 13%; 
    text-align: right;
}
.medical-task-list-item p:last-child{
    width: 30px; 
    float: right;
    text-align: right
}
.medical-task-list-title P{
    float: left;
    margin: 0;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}
.medical-task-list-title p:first-child{
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.medical-task-list-title p:last-child{
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

@media only screen and (min-width: 1500px) {
   .accomplish-list{
        width: 100%;
        height: 30px;
        overflow: hidden;
    }
    .accomplish-list p{
        float: left;
        width: 30%;
        margin-left: 3%
    }
}
@media only screen and (max-width: 1499px) {
    .accomplish-list{
        width: 100%;
    }
    .accomplish-list p{
        float: left;
        width: 40%;
        padding:0;
        margin:0;
        line-height: 30px;
    }
}
</style>