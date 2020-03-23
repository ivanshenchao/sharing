import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register/Register'
import Login from '@/components/Login/Login'
import Share from '@/components/Share/Index'
import ShareIndex from '@/components/Share/Share'
import ShareIndustry from '@/components/Share/Industry'
import CompanyMore from '@/components/Share/CompanyMore'
import ColumnMore from '@/components/Share/ColumnMore'
import InformationMore from '@/components/Share/InformationMore'
import ShareDetails from '@/components/Share/Details'
import ShareDetailse from '@/components/Share/Detailse'
import ShareDownload from '@/components/Share/Download'
import ShareAbout from '@/components/Share/About'
import Previewpdf from '@/components/Share/Previewpdf'
import Home from '@/components/Home'
import Index from '@/components/Index/Index'
import Information from '@/components/Information/Index'
import Notice from '@/components/Notice/Index'
import Notices from '@/components/Notice/Indexs'
import Template from '@/components/Task/Template'
import Management from '@/components/Task/Management'
import TaskAdd from '@/components/Task/TaskAdd'
import TaskAdds from '@/components/Task/TaskAdds'
import TaskAff from '@/components/Task/TaskAff'
import TaskInfo from '@/components/Task/TaskInfo'
import TaskType from '@/components/Task/TaskType'
import TaskDist from '@/components/Task/TaskDist'
import Allocation from '@/components/Task/Allocation'
import Allocations from '@/components/Task/Allocations'
import MyTask from '@/components/Task/MyTask'
import TaskCheck from '@/components/Task/TaskCheck'
import Financial from '@/components/Financial/Financial'
import Invoice from '@/components/Financial/Invoice'
import InvoiceMan from '@/components/Financial/InvoiceMan'
import InvoicRecord from '@/components/Financial/InvoicRecord'
import Recharge from '@/components/Financial/Recharge'
import FinancialDist from '@/components/Financial/FinancialDist'
import MyFinancial from '@/components/Financial/MyFinancial'
import AgentTeam from '@/components/Customer/AgentTeam'
import EnterpriseInfo from '@/components/Customer/EnterpriseInfo'
import Remit from '@/components/Customer/Remit'
import ContractMat from '@/components/Customer/ContractMat'
import Ratemat from '@/components/Customer/Ratemat'
import EnterpriseAdd from '@/components/Customer/EnterpriseAdd'
import Category from '@/components/Industry/Category'
import ContentMat from '@/components/Industry/ContentMat'
import ContentMatAdd from '@/components/Industry/ContentMatAdd'
import ColumnMat from '@/components/Column/ColumnMat'
import ColumnCont from '@/components/Column/ColumnCont'
import ColumnMatAdd from '@/components/Column/ColumnMatAdd'
import Account from '@/components/System/Account'
import MakeRecharge from '@/components/System/MakeRecharge'
import MakeIneRec from '@/components/System/MakeIneRec'
import NoticeSys from '@/components/System/NoticeSys'
import ReqType from '@/components/System/ReqType'
import CooperativeMat from '@/components/System/CooperativeMat'
import SignInfo from '@/components/System/SignInfo'
import CompanyInfo from '@/components/System/CompanyInfo'
import ContractInfo from '@/components/System/ContractInfo'
import DataSem from '@/components/System/DataMat'
import MakeTemplate from '@/components/System/MakeTemplate'
import Banner from '@/components/System/Banner'
import ProductMat from '@/components/Management/ProductMat'
import DataMat from '@/components/Management/DataMat'
import store from '@/vuex/store.js'

Vue.use(Router)

//刷新页面时重新复值
if(sessionStorage.getItem('token')){
	store.commit('setToken',sessionStorage.getItem('token'));
}

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'Share',
			component: Share,
			redirect:'/ShareIndex',
			children:[
			  {
				  path: 'ShareIndex',
				  name: 'ShareIndex',
				  component: ShareIndex,
				  meta: { title: '共享首页' }
			  },
			  {
				  path: 'ShareIndustry',
				  name: 'ShareIndustry',
				  component: ShareIndustry,
				  meta: { title: '行业资讯' }
			  },
			  {
				  path: 'CompanyMore',
				  name: 'CompanyMore',
				  component: CompanyMore,
				  meta: { title: '企业招商' }
			  },
			  {
				  path: 'ColumnMore',
				  name: 'ColumnMore',
				  component: ColumnMore,
				  meta: { title: '企业专栏' }
			  },
			  {
				  path: 'InformationMore',
				  name: 'InformationMore',
				  component: InformationMore,
				  meta: { title: '行业资讯' }
			  },
			  {
				  path: 'ShareDetails',
				  name: 'ShareDetails',
				  component: ShareDetails,
				  meta: { title: '资讯详情' }
			  },
			  {
				  path: 'ShareDetailse',
				  name: 'ShareDetailse',
				  component: ShareDetailse,
				  meta: { title: '专栏详情' }
			  },
			  {
				  path: 'ShareDownload',
				  name: 'ShareDownload',
				  component: ShareDownload,
				  meta: { title: 'APP下载' }
			  },
			  {
				  path: 'ShareAbout',
				  name: 'ShareAbout',
				  component: ShareAbout,
				  meta: { title: '关于我们' }
			  },
			]
		  },
		{
		  path: '/',
		  name: 'Home',
		  component: Home,
	      meta: {requireAuth:true},
		  children:[
			{
				path: 'Index',
				name: 'Index',
				component: Index,
				meta: {requireAuth:true},
				meta: { title: '首页' }
			},
			{
				path: 'Information',
				name: 'Information',
				component: Information,
				meta: { title: '个人信息' }
			},
			{
				path: 'Notice',
				name: 'Notice',
				component: Notice,
				meta: { title: '通知公告' }
			},
			{
				path: 'Notices',
				name: 'Notices',
				component: Notices,
				meta: { title: '消息通知' }
			},
			{
				path: 'Template',
				name: 'Template',
				component: Template,
				meta: { title: '任务模板' }
			},
			{
				path: 'Management',
				name: 'Management',
				component: Management,
				meta: { title: '任务管理' }
			},
			{
				path: 'TaskAdd/:aid',
				name: 'TaskAdd',
				component: TaskAdd,
				meta: { title: '任务新增' }
			},
			{
				path: 'TaskAdds/:aid',
				name: 'TaskAdds',
				component: TaskAdds,
				meta: { title: '任务模板' }
			},
			{
				path: 'TaskAff/:aid',
				name: 'TaskAff',
				component: TaskAff,
				meta: { title: '任务确认' }
			},
			{
				path: 'TaskInfo/:aid',
				name: 'TaskInfo',
				component: TaskInfo,
				meta: { title: '任务查看' }
			},
			{
				path: 'TaskType',
				name: 'TaskType',
				component: TaskType,
				meta: { title: '任务类型' }
			},
			{
				path: 'TaskDist',
				name: 'TaskDist',
				component: TaskDist,
				meta: { title: '区域任务' }
			},
			{
				path: 'Allocation/:aid',
				name: 'Allocation',
				component: Allocation,
				meta: { title: '任务分配' }
			},
			{
				path: 'Allocations/:aid',
				name: 'Allocations',
				component: Allocations,
				meta: { title: '任务查看' }
			},
			{
				path: 'MyTask',
				name: 'MyTask',
				component: MyTask,
				meta: { title: '我的任务' }
			},
			{
				path: 'TaskCheck',
				name: 'TaskCheck',
				component: TaskCheck,
				meta: { title: '任务审核' }
			},
			{
				path: 'Financial',
				name: 'Financial',
				component: Financial,
				meta: { title: '财务管理' }
			},
			{
				path: 'Invoice',
				name: 'Invoice',
				component: Invoice,
				meta: { title: '发票申请' }
			},
			{
				path: 'InvoiceMan',
				name: 'InvoiceMan',
				component: InvoiceMan,
				meta: { title: '发票管理' }
			},
			{
				path: 'InvoicRecord',
				name: 'InvoicRecord',
				component: InvoicRecord,
				meta: { title: '申请记录' }
			},
			{
				path: 'Recharge',
				name: 'Recharge',
				component: Recharge,
				meta: { title: '充值记录' }
			},
			{
				path: 'FinancialDist',
				name: 'FinancialDist',
				component: FinancialDist,
				meta: { title: '区域财务' }
			},
			{
				path: 'MyFinancial',
				name: 'MyFinancial',
				component: MyFinancial,
				meta: { title: '我的财务' }
			},
			{
				path: 'AgentTeam',
				name: 'AgentTeam',
				component: AgentTeam,
				meta: { title: '代理团队' }
			},
			{
				path: 'EnterpriseInfo',
				name: 'EnterpriseInfo',
				component: EnterpriseInfo,
				meta: { title: '企业信息' }
			},
			{
				path: 'Remit',
				name: 'Remit',
				component: Remit,
				meta: { title: '企业信息' }
			},
			{
				path: 'EnterpriseAdd/:aid',
				name: 'EnterpriseAdd',
				component: EnterpriseAdd,
				meta: { title: '企业新增修改' }
			},
			{
				path: 'ContractMat',
				name: 'ContractMat',
				component: ContractMat,
				meta: { title: '合同管理' }
			},
			{
				path: 'Ratemat',
				name: 'Ratemat',
				component: Ratemat,
				meta: { title: '费率管理' }
			},
			{
				path: 'Banner',
				name: 'Banner',
				component: Banner,
				meta: { title: 'Banner' }
			},
			{
				path: 'Category',
				name: 'Category',
				component: Category,
				meta: { title: '资讯分类' }
			},
			{
				path: 'ContentMat',
				name: 'ContentMat',
				component: ContentMat,
				meta: { title: '内容管理' }
			},
			{
				path: 'ContentMatAdd/:aid',
				name: 'ContentMatAdd',
				component: ContentMatAdd,
				meta: { title: '企业新增修改' }
			},
			{
				path: 'ColumnMat',
				name: 'ColumnMat',
				component: ColumnMat,
				meta: { title: '专栏管理' }
			},
			{
				path: 'ColumnCont',
				name: 'ColumnCont',
				component: ColumnCont,
				meta: { title: '专栏内容' }
			},
			{
				path: 'ColumnMatAdd/:aid',
				name: 'ColumnMatAdd',
				component: ColumnMatAdd,
				meta: { title: '企业新增修改' }
			},
			{
				path: 'Account',
				name: 'Account',
				component: Account,
				meta: { title: '账号管理' }
			},
			{
				path: 'MakeRecharge',
				name: 'MakeRecharge',
				component: MakeRecharge,
				meta: { title: '企业充值' }
			},
			{
				path: 'MakeIneRec',
				name: 'MakeIneRec',
				component: MakeIneRec,
				meta: { title: '开票记录' }
			},
			{
				path: 'NoticeSys',
				name: 'NoticeSys',
				component: NoticeSys,
				meta: { title: '通知公告' }
			},
			{
				path: 'ReqType',
				name: 'ReqType',
				component: ReqType,
				meta: { title: '需求类型' }
			},
			{
				path: 'CooperativeMat',
				name: 'CooperativeMat',
				component: CooperativeMat,
				meta: { title: '合作管理' }
			},
			{
				path: 'SignInfo',
				name: 'SignInfo',
				component: SignInfo,
				meta: { title: '签约信息' }
			},
			{
				path: 'CompanyInfo',
				name: 'CompanyInfo',
				component: CompanyInfo,
				meta: { title: '企业信息' }
			},
			{
				path: 'ContractInfo',
				name: 'ContractInfo',
				component: ContractInfo,
				meta: { title: '合同信息' }
			},
			{
				path: 'DataSem',
				name: 'DataSem',
				component: DataSem,
				meta: { title: '产品资料' }
			},
			{
				path: 'ProductMat',
				name: 'ProductMat',
				component: ProductMat,
				meta: { title: '产品管理' }
			},
			{
				path: 'DataMat',
				name: 'DataMat',
				component: DataMat,
				meta: { title: '资料管理' }
			},
			{
				path: 'MakeTemplate',
				name: 'MakeTemplate',
				component: MakeTemplate,
				meta: { title: '企业模板' }
			}
		  ]
		},
		{
			path: '/Home',
			name: 'Home',
			component: Home,
	    },
		{
		  path: '/Register',
		  name: 'Register',
		  component: Register,
		},
		{
			path: '/Share/Previewpdf',
			name: 'Previewpdf',
			component: Previewpdf,
		},	
		{
		  path: '/Login',
		  name: 'Login',
		  component: Login,
// 		  redirect:'/Password',
// 		  children:[
// 			{path:'Password',component:Password},
// 			{path:'Message',component:Message}
// 		  ]
		},	
		
	]
})

//使用requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
router.beforeEach((to,from,next)=>{
	if(to.matched.some(r => r.meta.requireAuth)){
		if(store.state.token){
			next();
		}else{
			next({
				path:'/Login',
				query:{redirect: to.fullPath} //登录之后返回之前页面
			})
		}
	}else{
		next()
	}
})

export default router