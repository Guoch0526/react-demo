import axios from 'axios'
import NProgress from 'nprogress'
import util from 'src/utils'

const csrftoken = util.getCSRFToken()

NProgress.configure({
  showSpinner: false,
})

let client = axios.create({
  baseURL: '/api/',
  withCredentials: true,
  headers: {'X-CSRFToken': csrftoken},
})


let fileUploadClient = axios.create({})

var initClient = client => {
  client.interceptors.request.use(function(config) {
    NProgress.start()
    return config
  }, function(error) {
    return Promise.reject(error)
  })

  client.interceptors.response.use(function(response) {
    NProgress.done()
    return response
  }, function(error) {
    NProgress.done()
    return Promise.reject(error)
  })
}

let fileDownloadClient = axios.create({
  responseType: 'blob',
})

initClient(client)
initClient(fileUploadClient)
initClient(fileDownloadClient)

export default client
export {fileUploadClient}
export {fileDownloadClient}
