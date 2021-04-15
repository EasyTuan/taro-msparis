//api状态
export const HTTP_STATUS = {
  success: 200, //请求成功
  moved: 301, //永久重定向
  error: 400, //请求语义有误
  forbidden: 403, //没有权限访问
  not_found: 404, //页面或资源不存在
  bad_gateway: 502, //网关错误
}
export const REFRESH_STATUS = {
  normal: 0,
  refreshing: 1,
  no_more_data: 2,
}
