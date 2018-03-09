import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'
import source from './CancelToken'

const root_url = 'http://goforeat.hk'
const api_url = 'http://api.goforeat.hk'

const api = {
  getCanteenList(page, filter) {
    const validItem = {}
    const params = {
      page: page,
      condition: 'default',
      limit: 12
    }
    if (typeof filter !== 'undefined') {
      for (let i in filter) {
        if (filter[i] !== 'default') {
          validItem[i] = filter[i]
        }
      }
      Object.assign(params, validItem)
    }
    return axios.get(api_url + '/guide/queryCanteen', {
      params: params,
      timeout: 4500,
      cancelToken: source.token
    })
  },
  getCanteenOptions() {
    return axios.get(api_url + '/guide/getCanteenOption',{
      cancelToken: source.token
    })
  },
  getCanteenDetail(canteenId){
    // let params = new URLSearchParams();
    // params.append('canteenId', canteenId);
    return axios.post(api_url + "/guide/getCanteenDetail", qs.stringify({
      canteenId
    },{cancelToken: source.token}), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  },
  // login
  getCode(mobile,type) {
    return axios.post(api_url + "/passport/register" ,qs.stringify({
      mobile,
      type
    },{cancelToken: source.token}), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  },
  register(mobile,type,token,code,password) {
    return axios.post(api_url + "/passport/checkCode", qs.stringify({
      mobile,
      type,
      token,
      code,
      password
    },{cancelToken: source.token}),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  },
  login(mobile,type,password) {
    return axios.post(api_url + "/passport/login", qs.stringify({
      mobile,
      type,
      password
    },{cancelToken: source.token}),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  },
  logout() {
    return axios.post(api_url + "/passport/logout")
  },
  // article
  getArticleList(offset) {
    return axios.post(api_url + '/cms/getNewsList', qs.stringify({
      limit: 5,
      offset: offset
    },{cancelToken: source.token,timeout: 4500}),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  },
  searchCanteenWithName(name) {
    return axios.post(api_url + '/guide/matchCanteenByName', qs.stringify({
      name
    },{cancelToken: source.token}),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  },
  getIntegralProjectListData() {
    return axios.get(api_url + '/point/getProjects')
  }
}

module.exports = api
