import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
axios.interceptors.request.use(function (config){
    const {method,data} = config
  
    if (method.toLowerCase() === 'post' && typeof data==='object') {
        config.data = qs.stringify(data)
       
    }
    console.log(config)
    return config
})


axios.interceptors.response.use(function (response){
    console.log(response)
    return response.data
}, function(error){
    message.error('请求出错' + error.message)
    console.log(11)
    return new Promise(()=>{})
});
export default axios