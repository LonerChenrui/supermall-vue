import Vue from 'vue'
import axios from 'axios'
import {Toast} from 'vant'
import qs from 'qs';

Vue.use(Toast)

const url = "http://106.54.54.237:8000/api/v1" || "http://123.207.32.32:8000/api/v2";

// 封装axios并导出
export function request(config) {

  // 创建axios实例
  const instance = axios.create({
    baseURL: url
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
      setTimeout(() => {
        Toast.clear();
      }, 800);
      return res.data
    },
    (error) => {

      return Promise.reject(error); 
    },
  );

  return instance(config)
}

