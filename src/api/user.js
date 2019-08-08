import request from 'axios'
import {baseUrl} from '@/config/env'

export const getMenu = () => request({
  url: '/api/block-system/menu/routes',
  method: 'get'
})

export const getTopMenu = () => request({
  url: baseUrl + '/user/getTopMenu',
  method: 'get'
})

