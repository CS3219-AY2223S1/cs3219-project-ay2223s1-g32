const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000'

const PREFIX_USER_SVC = '/api/user'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
export const LOGIN_USER_SVC = URI_USER_SVC + '/api/login'
export const LOGOUT_USER_SVC = URI_USER_SVC + '/api/logout'
