<template>
    <div id="information">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="../index">首页</el-breadcrumb-item>
                <el-breadcrumb-item to="../ContentMat">行业资讯</el-breadcrumb-item>
                <el-breadcrumb-item><span class="color-blue">内容管理</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="admin-table" style="padding: 50px 30px">
            <div class="margin-top20 margin-bottom20">
                <div class="el-button-copy" @click="back">返回列表</div>
            </div>
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="information-content">
                        <quill-editor ref="text" v-model="form.newsContent" class="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" style="height:500px"/>
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-form ref="form" :model="form" label-width="120px" class="information-content padding20">
                        <el-form-item label="文章标题：">
                            <el-input v-model="form.newsTitle" placeholder="请输入文章标题"></el-input>
                        </el-form-item>
                        <el-form-item label="文章摘要：">
                            <el-input v-model="form.newsAbs" placeholder="请输入文章摘要"></el-input>
                        </el-form-item>
                        <el-form-item label="所属分类：">
                            <el-select v-model="form.colId" placeholder="请选择所属分类">
                                <el-option v-for="item in capital" :key="item.colId" :label="item.colName" :value="item.colId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="文章来源：">
                            <el-select v-model="form.newsCome" placeholder="请选文章来源">
                                <el-option v-for="item in city" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上传封面：">
                            <el-upload :action="url" :headers="myHeaders"  accept=".png,.jpg" :show-file-list="showFile" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="responseAction">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="发布时间：">
                            <el-date-picker v-model="form.createTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </el-form-item>
                        <div class=" text-center">
                            <el-button type="primary" @click="submit">发 布</el-button>
                            <el-button @click="back">取 消</el-button>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>

<script>
    import {quillRedefine} from 'vue-quill-editor-upload'
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import base from '../../request/base';
    import store from '../../vuex/store.js';
    export default{

        data(){
            return{
                msg:'行业资讯--内容管理--新增文章',
                form: {
                    newsTitle:'', //文章标题
                    newsAbs:'', //文章摘要
                    colId:'', //所属分类
                    newsCome:'', //文章来源(1.转载 2.原创)
                    fileId:'', //封面图片ID
                    newsContent:'', //文章内容
                    createTime:'' ,//创建时间 格式:(yyyy-MM-dd HH:mm:ss)
                },
                capital:[], //省份数组
                city:[
                    {id:'1',name:'转载'},
                    {id:'2',name:'原创'}
                ], //城市数组
                aid:'',
                url:'',
                token:'',
                downUrl:'',
                imageUrl:'',
                myHeaders:{},
                showFile: true,
                editorOption: {},
                content:'<h2>I am Example</h2>'
            }
        },
        computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  components: {
    quillEditor,
    quillRedefine
  },
  created () {
      let url = base+"/upload/fileUpload";
      let token = store.state.token;
      let downUrl='';
      this.$api.list.getDownUrl().then(res=> {
            console.log(res);
            if(res.data.status == 200){
                downUrl = res.data.data;
            }else{
                this.$message.error(res.data.msg);
            }
            
        }).catch(error=>{
            console.log(error);
        });
      this.editorOption = quillRedefine(
        {
            modules: {
                        toolbar: [
                        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                        ["blockquote", "code-block"], // 引用  代码块
                        [{ header: 1 }, { header: 2 }], // 1、2 级标题
                        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                        [{ script: "sub" }, { script: "super" }], // 上标/下标
                        [{ indent: "-1" }, { indent: "+1" }], // 缩进
                        // [{'direction': 'rtl'}],                         // 文本方向
                        [{ size: ["small", false, "large", "huge"] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                        [{ font: [] }], // 字体种类
                        [{ align: [] }], // 对齐方式
                        ["clean"], // 清除文本格式
                        ["link", "image", "video"] // 链接、图片、视频
                        ], //工具菜单栏配置
                    },
                    placeholder: '请在这里添加描述', //提示
                    readyOnly: false, //是否只读
                    theme: 'snow', //主题 snow/bubble
          // 图片上传的设置
          uploadConfig: {
            syntax: true,
            action:  url,  // 必填参数 图片上传地址
            methods: 'post',  // 必填参数 图片上传方式
            token: token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
            name: 'file',  // 必填参数 文件的参数名
            size: 5000,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
            res: (respnse) => {
                return downUrl+respnse.data.fileUrl
            },
            header: (xhr) => {
                xhr.setRequestHeader('token', token);
            },
          }
        }
      )
      console.log(this.editorOption)
    },
        methods:{
            handleChange(value) {
                console.log(value);
            },
            back(){
                this.$router.push({path:'/ColumnCont'})
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
                this.imageUrl = this.downUrl+file.url;
            },
            responseActions(response){
                console.log(response);
                this.imageUrls = this.downUrl+response.data.fileUrl;
                this.showFiles = false;
                this.forms.fileId = response.data.fileId;
                console.log(this.imageUrl);
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
                            console.log(params);
                            this.$api.list.insertColumnContent(params).then(res=> {
                                if(res.data.status == 200){
                                    this.$message.success('操作成功！');
                                    this.$router.push({
                                        path:'/ColumnCont'
                                    })
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                            
                            }).catch(error=>{
                                console.log(error);
                            })
                        }else{
                            this.$api.list.editColumnContent(params).then(res=> {
                                if(res.data.status == 200){
                                    this.$message.success('操作成功！');
                                    this.$router.push({
                                        path:'/ColumnCont'
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
                
            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({ editor, html, text }) {
                // console.log('editor change!', editor, html, text)
                this.content = html
            }
        },
        beforeMount(){
            //通过aid判断当前页面：0为新增  
            this.aid = this.$route.params.aid;
            if(this.aid != 0 ){
                this.msg = "企业信息--修改药企";
                //获取修改的企业信息
                let params = {newsId:this.aid}
                this.$api.list.getColumnContentInfo(params).then(res=> {
                    console.log(res);
                    if(res.data.status == 200){
                        this.form = res.data.data.columnNews;
                        this.imageUrl = this.downUrl+this.form.fileUrl;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
            //上传地址
            this.url = base+"/upload/fileUpload";
            //获取token
            this.token = store.state.token;
            //获取token
            this.myHeaders.token = store.state.token;
            //查询所有分类
            this.$api.list.getColumnContentType().then(res=> {
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
                console.log(res);
                if(res.data.status == 200){
                    this.downUrl = res.data.data;
                }else{
                    this.$message.error(res.data.msg);
                }
                
            }).catch(error=>{
                console.log(error);
            });
        }
    }
</script>

<style lang="scss">
.information-content{
    background: white;
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
.informations{
    background: white
}
.cmat-center{
    margin-left: 40%;
}
.editor {
    line-height: normal !important;
    height: 800px;
  }
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      border-right: 0px;
      content: '保存';
      padding-right: 0px;
  }
 
  .ql-snow .ql-tooltip[data-mode=video]::before {
      content: "请输入视频地址:";
  }
 
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }
 
  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }
 
  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }
</style>