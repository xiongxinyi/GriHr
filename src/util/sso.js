const FULL_CHARTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopgrstuvwxyz'
// 应用ID
const clientId = 'gri-hr-system'
// 统一认证地址
const iamUri = 'https://iam.gribgp.com/'

// 生成随机数
function getState() {
  let state = ''
  for (let i = 0; i < 6; i++) {
    state += FULL_CHARTER[Math.floor(Math.random() * 52)]
  }
  return state
}

// 获取统一认证平台认证地址
export function getAuthorizeUri() {
  const state = getState()
  sessionStorage.setItem('state', state)
  return iamUri + 'sso/authorize?client_id=' + clientId + '&response_type=code&state=' + state
}

// 获取统一认证退出登录地址
export function getLogoutUri() {
  let authorizeUri = getAuthorizeUri()
  return iamUri + 'sso/logout?redirect_uri=' + encodeURIComponent(authorizeUri);
}

// 获取 url 参数
export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
    return pair[1];
    }
  }
  return '';
}
