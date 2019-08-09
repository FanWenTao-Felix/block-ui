import request from 'axios'

export const getMenu = () => request({
  url: '/api/menu/routes',
  method: 'get'
})

export const getTopMenu = () => request({
  url: '/api/getTopMenu',
  method: 'get'
})

