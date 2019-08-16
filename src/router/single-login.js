export default function (to, from, next) {
  if (to.query.hasOwnProperty('token')) {
    let params = {jwt_auth: to.query.token, front: '1'}
    // TODO 单点登录
    console.info('single-login', params)
  } else {
    next()
  }
}
