import Axios from 'axios'
Axios.defaults.baseURL = 'http://47.99.64.156:8080/uhome' ;//配置向服务器发起请求的地址和端口
// 请求拦截
Axios.interceptors.request.use(
  //通用的配置
  config => {
    //把token添加到header
      let token=sessionStorage.getItem('token');
      // config.headers.Authorization=token;
      console.log(token);
      config.headers.Authorization =token;
      console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
Axios.interceptors.response.use(
  config => {
    //响应的token值储存
    return config
  }
)

export default Axios