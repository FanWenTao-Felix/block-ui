import request from 'axios'

export const loginByUsername = (tenantCode, account, password, type) => request({
  url: '/api/token',
  method: 'post',
  params: {
    tenantCode,
    account,
    password,
    type
  }
})

export const getMenu = () => request({
  url: '/api/menu/routes',
  method: 'get'
})

export const getTopMenu = () => request({
  url: '/api/getTopMenu',
  method: 'get'
})

