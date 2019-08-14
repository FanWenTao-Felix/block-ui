export default function (to, from, next) {
  if (to.query.hasOwnProperty('token')) {
    let params = {jwt_auth: to.query.token, front: '1'}
    console.info(1111, params)
  } else {
    next()
  }
}
