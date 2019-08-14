import request from 'axios'

export const siteInfo = (site, domain) => request({
  url: '/api/site/siteInfo',
  method: 'post',
  params: {
    site,
    domain
  }
})

export const getPages = () => request({
  url: '/api/site/pages',
  method: 'get'
})

export const pageInfo = () => request({
  url: '/api/site/pageInfo',
  method: 'get'
})

