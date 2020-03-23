import {MessageBox, Message} from 'element-ui';

//Message Box提示框open("标题","内容","类型(success / info / warning / error)","确定执行回调","取消操作标题") 
export default{
    open(title,content,type,action,ctitle){
        MessageBox.confirm(content, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type
          }).then(() => {
            action()
          }).catch(() => {
            Message({
              type: 'info',
              message: '已取消'+ctitle
            });          
          });
    }
}