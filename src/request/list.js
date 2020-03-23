import base from './base'; // 导入接口域名列表
import instance from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const list = {
	// post提交
	//注册
	register (params) {
	    return instance.post(`${base}/common/login`, qs.stringify(params));
	},
	//登录
	login (params) {
	    return instance.post(`${base}/common/login`, qs.stringify(params));
    },
    //退出登录
	logout () {
	    return instance.post(`${base}/common/loginOut`);
    },
    //修改密码
	changePass (params) {
	    return instance.post(`${base}/common/updatePwd`, qs.stringify(params));
    },
    // 新闻列表
    list () {
        return instance.get(`${base}/article/list/1/json`);
    },
    // 获取token
    getToken () {
        return instance.post(`${base}/common/getSubmitToken`);
    },
    // 获取下载地址
    getDownUrl () {
        return instance.post(`${base}/common/getFileServer`);
    },
    // 获取省份
    getCapital () {
        return instance.post(`${base}/area/getAllCapitalList`);
    },
    // 获取所有省份
    getCapitalAll () {
        return instance.post(`${base}/area/getAllCapitalAndCityList`);
    },
    // 获取所有药企
    getAllMedical () {
        return instance.post(`${base}/account/selectCompanyList`);
    },
    // 获取所有代理商
    getAllAgent () {
        return instance.post(`${base}/account/selectAgentList`);
    },
    // 获取未设置费率的药企
    getMedicalNoRate () {
        return instance.post(`${base}/rate/comList`);
    },
    // 获取当前城市
    getCity (params) {
        return instance.post(`${base}/area/getAllCityListByCapitalId`, qs.stringify(params));
    },
    // 企业列表
    getCompanyList (params) {
        return instance.post(`${base}/company/pageList`, qs.stringify(params));
    },
    // 企业列表 上传协议
    updateComTreUrl (params) {
        return instance.post(`${base}/company/updateComTreUrl`, qs.stringify(params));
    },
    // 添加企业信息
    insert (params) {
        return instance.post(`${base}/company/insert`, qs.stringify(params));
    },
    // 企业信息查看
    getInfoCompany (params) {
        return instance.post(`${base}/company/getInfoById`, qs.stringify(params));
    },
    // 修改企业信息
    editCompany (params) {
        return instance.post(`${base}/company/update`, qs.stringify(params));
    },
	// 删除企业信息
    deleteCompany (params) {
        return instance.post(`${base}/company/delete`, qs.stringify(params));
    },
    // 代理团队列表
    getAgentList (params) {
        return instance.post(`${base}/agent/pageList`, qs.stringify(params));
    },
    // 添加代理团队信息
    insertAgent (params) {
        return instance.post(`${base}/agent/insert`, qs.stringify(params));
    },
    // 修改代理团队
    editAgent (params) {
        return instance.post(`${base}/agent/update`, qs.stringify(params));
    },
    // 代理团队信息查看
    getAgentInfo (params) {
        return instance.post(`${base}/agent/getInfoById`, qs.stringify(params));
    },
    // 费率列表
    getRatetList (params) {
        return instance.post(`${base}/rate/pageList`, qs.stringify(params));
    },
    // 费率添加
    insertRate (params) {
        return instance.post(`${base}/rate/insert`, qs.stringify(params));
    },
    // 费率修改
    editRate (params) {
        return instance.post(`${base}/rate/update`, qs.stringify(params));
    },
    // 费率删除
    deleteRate (params) {
        return instance.post(`${base}/rate/delete`, qs.stringify(params));
    },
    // 费率查看
    getRateInfo (params) {
        return instance.post(`${base}/rate/getInfoById`, qs.stringify(params));
    },
    // 合同列表
    getContractList (params) {
        return instance.post(`${base}/contract/pageList`, qs.stringify(params));
    },
    // 合同查看
    getContractInfo (params) {
        return instance.post(`${base}/contract/getInfoById`, qs.stringify(params));
    },
    // 行业资讯
    // 分类列表
    getCategoryList (params) {
        return instance.post(`${base}/newsType/pageList`, qs.stringify(params));
    },
    // 分类添加
    insertCategory (params) {
        return instance.post(`${base}/newsType/insert`, qs.stringify(params));
    },
    // 分类修改
    editCategory (params) {
        return instance.post(`${base}/newsType/update`, qs.stringify(params));
    },
    // 分类删除
    deleteCategory (params) {
        return instance.post(`${base}/newsType/delete`, qs.stringify(params));
    },
    // 分类查看
    getCategoryInfo (params) {
        return instance.post(`${base}/newsType/getInfoById`, qs.stringify(params));
    },
    // 内容列表
    getCategoryContentList (params) {
        return instance.post(`${base}/news/pageList`, qs.stringify(params));
    },
    // 所有类型
    getCategoryContentType () {
        return instance.post(`${base}/news/typeList`);
    },
    // 内容添加
    insertCategoryContent (params) {
        return instance.post(`${base}/news/insert`, qs.stringify(params));
    },
    // 内容修改
    editCategoryContent (params) {
        return instance.post(`${base}/news/update`, qs.stringify(params));
    },
    // 内容删除
    deleteCategoryContent (params) {
        return instance.post(`${base}/news/delete`, qs.stringify(params));
    },
    // 内容热点
    setHot (params) {
        return instance.post(`${base}/news/setHot`, qs.stringify(params));
    },
    // 内容查看
    getCategoryContentInfo (params) {
        return instance.post(`${base}/news/getInfoById`, qs.stringify(params));
    },
    // 企业专栏
    // 管理列表
    getColumnMatList (params) {
        return instance.post(`${base}/column/pageList`, qs.stringify(params));
    },
    getColumnMatCom (params) {
        return instance.post(`${base}/account/selectCompanyList`);
    },
    // 管理添加
    insertColumnMat (params) {
        return instance.post(`${base}/column/insert`, qs.stringify(params));
    },
    // 管理修改
    editColumnMat (params) {
        return instance.post(`${base}/column/update`, qs.stringify(params));
    },
    // 管理删除
    deleteColumnMat (params) {
        return instance.post(`${base}/column/delete`, qs.stringify(params));
    },
    // 管理查看
    getColumnMatInfo (params) {
        return instance.post(`${base}/column/getInfoById`, qs.stringify(params));
    },
    // 内容列表
    getColumnContentList (params) {
        return instance.post(`${base}/columnNews/pageList`, qs.stringify(params));
    },
    // 所有类型
    getColumnContentType () {
        return instance.post(`${base}/columnNews/allList`);
    },
    // 内容添加
    insertColumnContent (params) {
        return instance.post(`${base}/columnNews/insert`, qs.stringify(params));
    },
    // 内容修改
    editColumnContent (params) {
        return instance.post(`${base}/columnNews/update`, qs.stringify(params));
    },
    // 内容删除
    deleteColumnContent (params) {
        return instance.post(`${base}/columnNews/delete`, qs.stringify(params));
    },
    // 内容查看
    getColumnContentInfo (params) {
        return instance.post(`${base}/columnNews/getInfoById`, qs.stringify(params));
    },
    // 系统管理
    // 账号列表
    getAccountList (params) {
        return instance.post(`${base}/account/pageList`, qs.stringify(params));
    },
    // 账号添加
    insertAccount (params) {
        return instance.post(`${base}/account/insert`, qs.stringify(params));
    },
    // 账号修改
    editAccount (params) {
        return instance.post(`${base}/account/update`, qs.stringify(params));
    },
    // 账号删除
    deletAccount (params) {
        return instance.post(`${base}/account/delete`, qs.stringify(params));
    },
    // 账号查看
    infoAccount (params) {
        return instance.post(`${base}/account/getInfoById`, qs.stringify(params));
    },
    // 充值列表
    getInvestList (params) {
        return instance.post(`${base}/invest/pageList`, qs.stringify(params));
    },
    // 充值添加
    insertInvest (params) {
        return instance.post(`${base}/invest/insert`, qs.stringify(params));
    },
    // 开票列表
    getIneRecList (params) {
        return instance.post(`${base}/invoice/pageList`, qs.stringify(params));
    },
    // 开票 邮寄
    makeIneRec (params) {
        return instance.post(`${base}/invoice/updateState`, qs.stringify(params));
    },
    // 通知列表
    getNoticeList (params) {
        return instance.post(`${base}/notice/pageList`, qs.stringify(params));
    },
    // 通知添加
    insertNotice (params) {
        return instance.post(`${base}/notice/insert`, qs.stringify(params));
    },
    // 通知发布
    submitNotice (params) {
        return instance.post(`${base}/notice/publish`, qs.stringify(params));
    },
    // 通知查看
    getNoticeInfo (params) {
        return instance.post(`${base}/notice/getInfoById`, qs.stringify(params));
    },
    // 类型列表
    getTypeList (params) {
        return instance.post(`${base}/taskType/pageList`, qs.stringify(params));
    },
    // 类型添加
    insertType (params) {
        return instance.post(`${base}/taskType/insert`, qs.stringify(params));
    },
    // 类型修改
    editType (params) {
        return instance.post(`${base}/taskType/update`, qs.stringify(params));
    },
    // 类型删除
    deleteType (params) {
        return instance.post(`${base}/taskType/delete`, qs.stringify(params));
    },
    // 类型查看
    getTypeInfo (params) {
        return instance.post(`${base}/taskType/getInfoById`, qs.stringify(params));
    },
    // 打款列表
    getRemitList (params) {
        return instance.post(`${base}/task/manage/pageList`, qs.stringify(params));
    },
    // 打款操作
    insertRemit (params) {
        return instance.post(`${base}/task/manage/pay`, qs.stringify(params));
    },
    // 打款查看
    getRemitInfo (params) {
        return instance.post(`${base}/task/manage/getAccInfoByTaId`, qs.stringify(params));
    },
    // banner 列表
    getbannersList (params) {
        return instance.post(`${base}/view/banner/bannerList`, qs.stringify(params));
    },
    // banner 新增
    insertBanner (params) {
        return instance.post(`${base}/view/banner/bannerInsert`, qs.stringify(params));
    },
    // banner 修改
    updateBanner (params) {
        return instance.post(`${base}/view/banner/bannerUpdate`, qs.stringify(params));
    },
    // banner 删除
    deleteBanner (params) {
        return instance.post(`${base}/view/banner/bannerDel`, qs.stringify(params));
    },
    // banner 查看
    getbannersInfo (params) {
        return instance.post(`${base}/view/banner/bannerList`, qs.stringify(params));
    },
    //资料管理
    // 产品管理 列表
    productList (params) {
        return instance.post(`${base}/products/productsList`, qs.stringify(params));
    },
    // 产品管理 新增
    insertProduct (params) {
        return instance.post(`${base}/products/productsInsert`, qs.stringify(params));
    },
    // 产品管理 修改
    productBanner (params) {
        return instance.post(`${base}/products/productsUpdate`, qs.stringify(params));
    },
    // 产品管理 删除
    deleteProduct (params) {
        return instance.post(`${base}/products/productsDel`, qs.stringify(params));
    },
    // 产品管理 查看
    getProductInfo (params) {
        return instance.post(`${base}/products/productsById`, qs.stringify(params));
    },
    // 产品管理 剂型
    getProductDosge () {
        return instance.get(`${base}/products/productDosageTypeOption`);
    },
    // 资料管理 列表
    dataList (params) {
        return instance.post(`${base}/material/materialList`, qs.stringify(params));
    },
    // 资料管理 新增
    insertData (params) {
        return instance.post(`${base}/material/materialInsert`, qs.stringify(params));
    },
    // 资料管理 修改
    dataBanner (params) {
        return instance.post(`${base}/material/materialUpdate`, qs.stringify(params));
    },
    // 资料管理 删除
    deleteData (params) {
        return instance.post(`${base}/material/materialDel`, qs.stringify(params));
    },
    // 资料管理 查看
    getDataInfo (params) {
        return instance.post(`${base}/material/materialById`, qs.stringify(params));
    },
    // 资料管理 类型
    getDataTye () {
        return instance.get(`${base}/material/materialTypeOption`);
    },
    // 资料管理 关联
    getDataproduct () {
        return instance.get(`${base}/products/producOption`);
    },
    //企业模板
    // 企业模板 列表
    makeTempList (params) {
        return instance.post(`${base}/tempCompany/tempCompanyList`, qs.stringify(params));
    },
    // 企业模板 新增
    insertMakeTemp (params) {
        return instance.post(`${base}/tempCompany/tempCompanyInsert`, qs.stringify(params));
    },
    // 企业模板 修改
    makeTempBanner (params) {
        return instance.post(`${base}/tempCompany/tempCompanyUpdate`, qs.stringify(params));
    },
    // 企业模板 删除
    makeTempData (params) {
        return instance.post(`${base}/tempCompany/tempCompanyDel`, qs.stringify(params));
    },
    // 企业模板 查看
    getMakeTempInfo (params) {
        return instance.post(`${base}/tempCompany/tempCompanyById`, qs.stringify(params));
    },
    // 企业模板 企业
    getMakeTempCompany () {
        return instance.post(`${base}/tempCompany/companyOption`);
    },
    // 企业模板 类型
    getMakeTempType (params) {
        return instance.post(`${base}/tempCompany/tempByCompanyIdAndTaskTypeId`, qs.stringify(params));
    },
    //获取用户协议 首次
    privacy () {
        return instance.post(`${base}/contractAgent/selectByUser`);
    },
    //获取用户协议 再次
    privacys () {
        return instance.post(`${base}/contractAgent/selectContract`);
    },
    // 获取用户信息
    user () {
        return instance.post(`${base}/common/getUserInfo`);
    },
    // 获取代理用户信息
    userAgent () {
        return instance.get(`${base}/agent/info/getInfoById`);
    },
    // 获取省市数据
    region () {
        return instance.get(`${base}/district_region`);
    },
    // 获取所有状态
    status () {
        return instance.get(`${base}/get_task_status`);
    },
    // 获取所有任务类型
    task () {
        return instance.get(`${base}/tasktemplate_get_task_type`);
    },
    // 修改用户信息
    userPost (params) {
	    return instance.post(`${base}/agent/info/update`, qs.stringify(params));
    },
    // 用户签协议
    checked (params) {
	    return instance.post(`${base}/is_checkeds`, qs.stringify(params));
    },
    // 获取导航栏
    navList () {
        return instance.get(`${base}/nav_list`);
    },
    // 获取消息通知数量 未查看的
    noticeCount () {
        return instance.get(`${base}/get_notice_count`);
    },
    // 获取 药企 合作代理
    cooperation () {
        return instance.get(`${base}/get_cooperation`);
    },
    // 获取所有的代理商 单选
    allAgent (params) {
        return instance.get(`${base}/get_agent_radio`,{
            agent_id: params
        });
    },
    // 修改用户信息
    cooperationPost (params) {
	    return instance.post(`${base}/add_cooperation_radio`, qs.stringify(params));
    },
    // 删除合作代理
    delCooperation () {
        return instance.get(`${base}/del_cooperation`);
    },
    // 获取药企任务
    taskYaoQi () {
        return instance.get(`${base}/census/com/myTask`);
    },
    // 查询代理商的任务
    taskDaiLi () {
        return instance.get(`${base}/census/agent/myTask`);
    },
    // 消息通知
    notices () {
        return instance.get(`${base}/census/com/myMessage`);
    },
    // 消息通知
    noticeAgent () {
        return instance.get(`${base}//census/agent/myMessage`);
    },
    // 消息通知 查看
    noticesInfo (id) {
        return instance.get(`${base}/get_notices?id=${id}`);
    },
    // 任务状态统计  药企
    statusCensus () {
        return instance.get(`${base}/census/com/censusTaskState`);
    },
    // 任务状态统计  代理
    wanCensusDaiLi () {
        return instance.get(`${base}/census/agent/completionRate`);
    },
    // 任务完成率加载  代理
    statusCensusDaiLi () {
        return instance.get(`${base}/census/agent/censusTaskState`);
    },
    // 任务类型统计  药企
    typeCensus (days) {
        return instance.get(`${base}/census/com/monthTaskType?days=${days}`);
    },
    // 任务类型统计  代理
    typeCensusDaiLi () {
        return instance.get(`${base}/census/agent/monthTaskType`);
    },
    // 任务类型列表
    typeList (page) {
        return instance.get(`${base}/tasktype_index?page=${page}`);
    },
    // 任务类型 新增 编辑
    typePost (params) {
	    return instance.post(`${base}/tasktype_save_post`, qs.stringify(params));
    },
    // 任务类型  查看
    typeInfo (params) {
        return instance.get(`${base}/get_task_type_info?id=${params}`);
    },
    // 任务类型 状态
    typeStatus (id,status) {
        return instance.get(`${base}/tasktype_change_status?id=${id}&status=${status}`);
    },
    // 任务类型 下拉
    typeSelect () {
        return instance.post(`${base}/taskType/allList`);
    },
    // 任务类型 所有
    typesSelect () {
        return instance.get(`${base}/task_type_name`);
    },
    // 任务模板列表
    templateList (params) {
        return instance.post(`${base}/template/pageList`, qs.stringify(params));
    },
    // 任务模板  查看
    templateInfo (params) {
        return instance.post(`${base}/template/getInfoById`, qs.stringify(params));
    },
    // 任务模板 删除
    templateDelete (params) {
        return instance.post(`${base}/template/delete`, qs.stringify(params));
    },
    // 任务列表
    taskList (params) {
        return instance.post(`${base}/task/com/pageList`, qs.stringify(params));
    },
    // 任务状态 下拉
    taskStatusSelect () {
        return instance.get(`${base}/get_task_status`);
    },
    // 任务列表 查看 
    taskAddInfo (params) {
        return instance.post(`${base}/task/com/getInfoById`, qs.stringify(params));
    },
	// 任务列表 查看 
    taskAddInfos (params) {
        return instance.post(`${base}/template/getInfoById`, qs.stringify(params));
    },
    //任务确认 查看
    getInfoByTaIdAndAgId(params){
        return instance.post(`${base}/task/com/getInfoByTaIdAndAgId`, qs.stringify(params));
    },
    //任务确认 查看
    taskAffSavePost(params){
        return instance.post(`${base}/task/com/setStateOk`, qs.stringify(params));
    },
    // 我的任务状态 下拉
    myTaskStatusSelect () {
        return instance.get(`${base}/get_my_task_status`);
    },
    // 任务模板 下拉
    taskTemplateSelect () {
        return instance.post(`${base}/task/com/allTemplateList`);
    },
    // 任务代理商 下拉
    taskAgentSelect () {
        return instance.get(`${base}/get_all_agent`);
    },
    // 任务所有  查看
    taskInfo (params) {
        return instance.post(`${base}/task/agent/getTaskDetailById`, qs.stringify(params));
    },
    // 任务信息 保存 修改 发布
    taskSavePost (params) {
	    return instance.post(`${base}/task_save_post`, qs.stringify(params));
    },
    // 任务列表 删除
    taskDelete (params) {
        return instance.post(`${base}/task/com/delete`, qs.stringify(params));
    },
    // 任务列表 撤回
    taskRecall (params) {
        return instance.post(`${base}/task/com/cancel`, qs.stringify(params));
    },
    // 任务列表 催单
    taskReminder (params) {
        return instance.post(`${base}/task/com/remind`, qs.stringify(params));
    },
    // 任务列表 验收
    acceptanceTaskPost (params) {
	    return instance.post(`${base}/task/com/examine`, qs.stringify(params));
    },
    // 区域任务 列表
    taskDistList (params) {
        return instance.post(`${base}/task/agent/pageList`, qs.stringify(params));
    },
    // 任务药企 下拉
    medicalSelect () {
        return instance.get(`${base}/task_get_info_bygroup`);
    },
    // 区域任务 获取分配信息
    taskDistAllocation (params) {
        return instance.post(`${base}/task/agent/getInfoById`, qs.stringify(params));
    },
    // 区域任务 查看分配信息
    taskDistAllocations (params) {
        return instance.post(`${base}/task/agent/getInfoDetailById`, qs.stringify(params));
    },
    // 区域任务 分配
    taskDistSavePost (params) {
	    return instance.post(`${base}/task_post_allocation`, qs.stringify(params));
    },
    // 区域任务 验收
    taskDistAcceptancePost (params) {
	    return instance.post(`${base}/task_post_acceptance`, qs.stringify(params));
    },
    // 区域任务  查看
    taskDistInfo (params) {
        return instance.get(`${base}/task_allocation_info?id=${params}`);
    },
    // 区域任务 提交
    taskDistPost (params) {
	    return instance.post(`${base}/task/agent/applicationCheck`, qs.stringify(params));
    },
    // 我的任务 列表
    myTaskList (params) {
        return instance.post(`${base}/task/agent/myTask/pageList`, qs.stringify(params));
    },
    // 我的任务 获取详情信息
    myTaskListInfo (params) {
        return instance.post(`${base}/task/agent/myTask/getInfoById`, qs.stringify(params));
    },
    // 资料上传
    upload (params) {
	    return instance.post(`${base}/upload`, qs.strin, qs.stringify(params));
    },
    // 资料下载
    download (params) {
        return instance.get(`${base}/downloadfile?id=${params}`);
    },
    // 我的任务 提交
    myTaskPost (params) {
	    return instance.post(`${base}/task/agent/myTask/submit`, qs.stringify(params));
    },
    // 任务审核 列表
    auditTaskList (params) {
        return instance.post(`${base}/task/agent/verify/pageList`, qs.stringify(params));
    },
    // 任务审核 提交
    audiTaskPost (params) {
	    return instance.post(`${base}/task/agent/verify/verify`, qs.stringify(params));
    },
    // 任务审核 列表
    auditTaskInfo (params) {
        return instance.post(`${base}/task/agent/myTask/getInfoById`, qs.stringify(params));
    },
    // 财务管理 列表
    financeList (params) {
        return instance.post(`${base}/finance/com/pageList`, qs.stringify(params));
    },
    // 财务状态 余额
    financeBalance () {
        return instance.post(`${base}/finance/com/getBalance`);
    },
    // 财务管理 打款
    financePost (params) {
        return instance.get(`${base}/finance_payment?id=${params}`);
    },
    // 汇款信息 
    financeNews () {
        return instance.get(`${base}/finance_zhanghu`);
    },
    // 财务管理 查看
    financeInfo (params) {
        return instance.post(`${base}/finance/com/getDaiBiaoListByTaId`, qs.stringify(params));
    },
    // 区域财务 列表
    distList (pageNo,pageSize) {
        return instance.get(`${base}/finance/agent/financeArea?pageNo=${pageNo}&pageSize=${pageSize}`);
    },
    // 我的财务 列表
    myFinanceList (pageNo,pageSize) {
        return instance.get(`${base}/finance/agent/financePersonal?pageNo=${pageNo}&pageSize=${pageSize}`);
    },
    // 充值记录  药企
    rechargeList (params) {
        return instance.post(`${base}/invest/com/pageList`, qs.stringify(params));
    },
    // 发票申请  列表
    invoiceList (params) {
        return instance.post(`${base}/invest/com/pageForAplyList`, qs.stringify(params));
    },
    // 索取发票 
    invoiceDemand (params) {
        return instance.post(`${base}/invoice/com/apply`, qs.stringify(params));
    },
    // 发票申请记录  列表
    invoicRecordList (params) {
        return instance.post(`${base}/invoice/com/pageList`, qs.stringify(params));
    },
    // 发票申请记录  开票邮寄
    invoicRecordMake (params) {
        return instance.post(`${base}/invoice/com/remind`, qs.stringify(params));
    },
    // 发票申请记录  接收
    invoicRecordReceive (params) {
        return instance.post(`${base}/invoice/com/updateState`, qs.stringify(params));
    },
    // 发票管理  信息
    invoiceManage () {
        return instance.get(`${base}/invoice_manage`);
    },
    // 发票管理 提交
    invoiceManagePost (params) {
	    return instance.post(`${base}/invoice_add_post`, qs.stringify(params));
    },
    // 合作管理 合作人员 列表
    getCoopMatAgent (params) {
	    return instance.post(`${base}/comAgent/com/pageList`, qs.stringify(params));
    },
    // 合作管理 合作人员 查看
    getCoopMatAgentInfo (params) {
	    return instance.post(`${base}/comAgent/com/getInfoById`, qs.stringify(params));
    },
    // 合作管理 合作人员 开启
    getCoopMatAgentOpen (params) {
	    return instance.post(`${base}/comAgent/com/open`, qs.stringify(params));
    },
    // 合作管理 潜在关系 列表
    getPotpMatAgent (params) {
	    return instance.post(`${base}/comAgent/com/latent/pageList`, qs.stringify(params));
    },
    // 合作管理 潜在关系 查看
    getPotpMatAgentInfo (params) {
	    return instance.post(`${base}/comAgent/com/latent/getAgentInfoById`, qs.stringify(params));
    },
    // 合作管理 潜在关系 添加
    getPotpMatAgentAdd (params) {
	    return instance.post(`${base}/comAgent/com/addTo`, qs.stringify(params));
    },
    // 企业信息查看
    getCompanyInfo () {
        return instance.post(`${base}/companyInfo/getInfo`);
    },
    // 代理合同 查看
    getCompanyInfos () {
        return instance.post(`${base}/contract/getInfoById`);
    },
    // 通知列表  接受人
    noticeList (params) {
        return instance.post(`${base}/notice/com/pageList`, qs.stringify(params));
    },
    // 通知列表  消息
    noticeLists (params) {
        return instance.post(`${base}/msg/pageList`, qs.stringify(params));
    },
    // 通知列表  查看
    noticeListsInfo (params) {
        return instance.post(`${base}/msg/getInfoById`, qs.stringify(params));
    },
    // 共享经济  首页 数据
    getShareData (params) {
        return instance.post(`${base}/index/pageTaskList`, qs.stringify(params));
    },
    // 共享经济  首页 类型
    getTypeData () {
        return instance.post(`${base}/index/getAllTaskType`);
    },
    // 共享经济  首页 省份
    getCapitalIdData () {
        return instance.post(`${base}/area/getAllCapitalList`);
    },
    // 共享经济  首页 城市
    getCityIdData (params) {
        return instance.post(`${base}/area/getAllCityListByCapitalId`, qs.stringify(params));
    },
    // 共享经济  首页 资讯
    getNewsList () {
        return instance.post(`${base}/index/getNewsList`);
    },
    // 共享经济  首页 轮播
    getImagesList (params) {
        return instance.post(`${base}/index/getBannerList`, qs.stringify(params));
    },
    // 共享经济  资讯 分类
    getAllNewsTypeList () {
        return instance.post(`${base}/index/news/getAllNewsTypeList`);
    },
    // 共享经济  资讯 资讯
    getNewsListByTypeId (params) {
        return instance.post(`${base}/index/news/getNewsListByTypeId`, qs.stringify(params));
    },
    // 共享经济  资讯 企业
    getAllComanyColumnList () {
        return instance.post(`${base}/index/news/getAllComanyColumnList`);
    },
    // 共享经济  资讯 企业 分页
    getColumnNewsByColId (params) {
        return instance.post(`${base}/index/news/getColumnNewsByColId`, qs.stringify(params));
    },
    // 共享经济  资讯 详情
    getNewsDetailById (params) {
        return instance.post(`${base}/index/news/getNewsDetailById`, qs.stringify(params));
    },
    // 共享经济  专栏 详情
    getNewsDetailByIds (params) {
        return instance.post(`${base}/index/news/getColumnNewsDetailByColId`, qs.stringify(params));
    },
    // 任务资料 获取 pdf
    getTaskPdfs (params) {
        return instance.post(`${base}/task/agent/previewFile`, qs.stringify(params));
    },
    // 新闻详情,演示
    detail (id, params) {
        return instance.get(`${base}/topic/${id}`, {
            params: params
        });
    }
   
    // 其他接口…………
}

export default list;
