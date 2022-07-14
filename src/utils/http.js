import axios from 'axios';

/** 配置基本头路径 超时时间 */
const service = axios.create({
  baseURL: 'http://81.69.234.69:8003',
  timeout: 5000,
});

/** 请求拦截处理 */
service.interceptors.request.use(
  (config) => {
    // 设置token
    return config;
  },
  (error) => Promise.reject(error)
);

/** 响应拦截处理 */
service.interceptors.response.use(
  /** 处理成功的回调 */
  (response) => {
    // console.log(response);
    const res = response;
    // if (![200, 201].includes(res.code)) {
    //   return Promise.reject(new Error(res.message || 'Error'));
    // }
    return res;
  },
  /** 处理失败的回调 */
  (error) => {
    // console.log(error);
    const {status, data} = error.response;
    /** 响应码是500 */
    if (status === 500) {
      /** 返回 */
      return;
    } else if (status === 401) {
      /** 权限不够 返回登录页 */
    }
    return Promise.reject(error);
  }
);

export default service;
