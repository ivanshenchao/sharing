import axios from 'axios';
import QS from 'qs';
import router from '../router';
import store from '../vuex/store.js';
import {Loading, Message} from 'element-ui';

//load加载
let loadinginstace; 

//提示信息
const tip = msg=> {
	Message.error({
		message : msg
	})
}

//跳转登录页
//登录页面完成登录后返回当前页面
const toLogin = () => {
	router.replace({
		path: '/Login',
		query: {
			redirect: router.currentRoute.fullPath
		}
	})
}

//请求失败后的错误统一处理
const errorHandle = (status, other) => {
	switch (status){
		// 401: 未登录状态，跳转登录页
		case 401:
		toLogin();
		break;
		// 402 token过期
        // 清除token并跳转登录页
		case 402:
		tip('登录过期，请重新登录');
		sessionStorage.removeItem('token');
		store.commit('delToken');
		setTimeout(() => {
			toLogin()
		},1000);
		break;
		// 403 token过期
        // 清除token并跳转登录页
		case 403:
		tip('登录过期，请重新登录');
		sessionStorage.removeItem('token');
		store.commit('delToken');
		setTimeout(() => {
			toLogin()
		},1000);
		break;
		case 404:
		tip('请求的资源不存在');
		break;
		default:
		console.log(other);
	}
}

//axios自定义请求头
//添加使用哪个端口xx-Device-Type(类型：mobile,android,iphone,ipad,web,pc,mac,wxapp)
// axios.defaults.headers.common["Device-Type"] = 'web';
//添加当前使用的版本号,xx-Api-Version(比如1.0.0)
// axios.defaults.headers.common["Api-Version"] = 'v1';

//创建axios实例
var instances = axios.create({ 
	timeout: 1000 * 12
});

//设置post请求头
instances.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//请求拦截
//每次请求前，如果存在token则在请求头中携带token
instances.interceptors.request.use(
    config => {
		// 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
		const token = store.state.token;
		token && (config.headers.token = token);
		loadinginstace = Loading.service({
		  lock: true,
		  text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(100, 100, 100, 0.9)'
		}) ;
		return config;
	},
    error => Promise.error(error)
)

// 响应拦截器
instances.interceptors.response.use(
    // 请求成功
    res => {
		loadinginstace.close();
		if(res.data.code == 401){
			tip('未登录，请您先登录后访问！');
			toLogin();
		}else if(res.data.status == 402){
			tip('登录过期，请您先登录后访问！');
			toLogin();
		}else if(res.data.code == 404){
			tip('登录过期，请您先登录后访问！');
			toLogin();
		}
		else{
			return res.status === 200 ? Promise.resolve(res) : Promise.reject(res);
		}
		
	},
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            //store.commit('changeNetwork', false);
			tip('请链接网络');
        }
    });

export default instances;
