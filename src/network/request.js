import Vue from 'vue'
import axios from 'axios'
import {Toast} from 'vant'
import qs from 'qs';

Vue.use(Toast)

const url = "http://106.54.54.237:8000/api/hy";
const url2 = "http://123.207.32.32:8000/api/hy";

// 封装axios并导出
export function request(config) {

  // 创建axios实例
  const instance = axios.create({
    baseURL: url || url2
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      return config
    },
    (error) => {

      return Promise.reject(error); 
    },
  );


  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      Toast.clear();
      return res.data
    },
    (error) => {
      Toast.clear();
      return Promise.reject(error); 
    },
  );

  return instance(config)
}

