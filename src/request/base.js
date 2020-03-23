//接口域名管理
let root;
 if(process.env.NODE_ENV==='development'){
    root = '/apis';
 }else{
    root = process.env.API_ROOT;
 }

export default root;