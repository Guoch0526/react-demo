import { ROUTE_CONFIG } from './constants'
import AsyncPageWrapper from './components/common/AsyncPageWrapper'

const pageRoute = [
  {
    path: ROUTE_CONFIG.INDEX,
    component: AsyncPageWrapper(() => {
      return import(
        /* webpackChunkName: 'index' */
        './containers/Index'
      ).then(module => module.default)
    }),
    exact: true,
  },
  {
    path: ROUTE_CONFIG.UPLOAD_RECORD,
    component: AsyncPageWrapper(() => {
      return import(
        /* webpackChunkName: 'upload-record' */
        './containers/UploadRecord'
      ).then(module => module.default)
    }),
  },
]

export default pageRoute