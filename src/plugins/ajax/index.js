import Vue from 'vue'
import axios from 'axios'
import Ajax from './ajax.js'
import {gbs} from '@/config/'

// 响应时间
axios.defaults.timeout = 5000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 配置接口地址
axios.defaults.baseURL = gbs.api_host
Vue.use(Ajax, {axios, gbs})
