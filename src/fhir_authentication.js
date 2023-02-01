import axios from 'axios'
import qs from 'qs'

class EosFhirAuthentication {
    constructor (path, client_id, client_secret) {
      this.api_root = path
      this.client_id = client_id
      this.client_secret = client_secret
    }

    getCredentials () {
      let data = qs.stringify({
        grant_type: 'client_credentials',
        client_secret: this.client_secret,
        client_id: this.client_id
      })
      return this.makeApiCall('POST', this.api_root, data)
    }

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // private methods
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  makeApiCall (method, endpoint, data = null) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: endpoint,
        data: data
      })
        .then(data => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }  

}

export {EosFhirAuthentication};
export default {EosFhirAuthentication};