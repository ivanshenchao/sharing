// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store';
import api from './request/api';
import utils from './util/util';
import './assets/css/comment.css';
import echarts from 'echarts'

Vue.prototype.$api = api;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.utils = utils;
Vue.prototype.$echarts = echarts;

Vue.directive('focus',{
  bind:function(){
  //指令绑定 到元素上时立即实行该bing函数，只执行一次
  //在每个函数中第一个参数永远书el
  //在元素刚绑定了指令的时候，还没有插入到dom中去这时候调用focus没作用，只有插入dom之后才能获取焦点
  // el.focus()
  },
  nserted:function(el){
 //元素插入到DOM中的时候，会执行inserted，触发一次
    el.focus()
  },
  updated:function(){
//当组件vnode更新的时候执行update可能会触发多次
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
