import base from './base'; // 导入接口域名列表
import instances from './json'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const task = {
    // post提交
    // 用户签约 
    userSinged (params) {
	    return instances.post(`${base}/contractAgent/signContract`, qs.parse(params));
    },
	// 任务模板 新增
    templatePost (params) {
	    return instances.post(`${base}/template/insert`, qs.parse(params));
    },
    // 任务模板 编辑
    templatePostEdit (params) {
	    return instances.post(`${base}/template/update`, qs.parse(params));
    },
   // 任务管理 新增
    taskPost (params) {
	    return instances.post(`${base}/task/com/insert`, qs.parse(params));
    },
    // 任务管理 编辑
    taskPostEdit (params) {
	    return instances.post(`${base}/task/com/update`, qs.parse(params));
    },
    // 修改用户信息
    userPost (params) {
	    return instances.post(`${base}/agent/info/update`, qs.parse(params));
    },
    // 区域任务 分配
    taskDistSavePost (params) {
	    return instances.post(`${base}/task/agent/distTask`, qs.parse(params));
    },
    // 我的任务 提交
    myTaskPost (params) {
	    return instances.post(`${base}/task/agent/myTask/submit`, qs.parse(params));
    },
    // 区域任务 提交
    taskDistPost (params) {
	    return instances.post(`${base}/task/agent/applicationCheck`, qs.parse(params));
    },
    // banner 新增
    insertBanner (params) {
        return instances.post(`${base}/view/banner/bannerInsert`, qs.parse(params));
    },
    // banner 修改
    updateBanner (params) {
        return instances.post(`${base}/view/banner/bannerUpdate`, qs.parse(params));
    },
    // banner 删除
    deleteBanner (params) {
        return instances.post(`${base}/view/banner/bannerDel`, qs.parse(params));
    },
    //资料管理
    // 产品管理 列表
    productList (params) {
        return instances.post(`${base}/products/productsList`, qs.parse(params));
    },
    // 产品管理 新增
    insertProduct (params) {
        return instances.post(`${base}/products/productsInsert`, qs.parse(params));
    },
    // 产品管理 修改
    productBanner (params) {
        return instances.post(`${base}/products/productsUpdate`, qs.parse(params));
    },
    // 产品管理 删除
    deleteProduct (params) {
        return instances.post(`${base}/products/productsDel`, qs.parse(params));
    },
    // 产品管理 查看
    getProductInfo (params) {
        return instances.post(`${base}/products/productsById`, qs.parse(params));
    },
    // 产品管理 剂型
    getProductDosge () {
        return instances.post(`${base}/products/productDosageTypeOption`);
    },
    // 资料管理 列表
    dataList (params) {
        return instances.post(`${base}/material/materialList`, qs.parse(params));
    },
    // 资料管理 新增
    insertData (params) {
        return instances.post(`${base}/material/materialInsert`, qs.parse(params));
    },
    // 资料管理 修改
    dataBanner (params) {
        return instances.post(`${base}/material/materialUpdate`, qs.parse(params));
    },
    // 资料管理 删除
    deleteData (params) {
        return instances.post(`${base}/material/materialDel`, qs.parse(params));
    },
    // 资料管理 查看
    getDataInfo (params) {
        return instances.post(`${base}/material/materialById`, qs.parse(params));
    },
    // 资料管理 类型
    getDataTye () {
        return instances.post(`${base}/material/materialTypeOption`);
    },
    // 资料管理 关联
    getDataproduct () {
        return instances.post(`${base}/products/productOption`);
    },
    //企业模板
    // 企业模板 列表
    makeTempList (params) {
        return instances.post(`${base}/tempCompany/tempCompanyList`, qs.parse(params));
    },
    // 企业模板 新增
    insertMakeTemp (params) {
        return instances.post(`${base}/tempCompany/tempCompanyInsert`, qs.parse(params));
    },
    // 企业模板 修改
    makeTempBanner (params) {
        return instances.post(`${base}/tempCompany/tempCompanyUpdate`, qs.parse(params));
    },
    // 企业模板 删除
    makeTempData (params) {
        return instances.post(`${base}/tempCompany/tempCompanyDel`, qs.parse(params));
    },
    // 企业模板 查看
    getMakeTempInfo (params) {
        return instances.post(`${base}/tempCompany/tempCompanyById`, qs.parse(params));
    },
    // 企业模板 企业
    getMakeTempCompany () {
        return instances.post(`${base}/tempCompany/companyOption`);
    },
    // 企业模板 类型
    getMakeTempType (params) {
        return instances.post(`${base}/tempCompany/tempByCompanyIdAndTaskTypeId`, qs.stringify(params));
    },
    // 其他接口…………
}

export default task;
