import client from './client'

let user = {
  loginByToken(token) {
    return client.post('/rest/loginByTemporaryToken/', {
      temporaryToken: token,
    })
  },
}

export default user