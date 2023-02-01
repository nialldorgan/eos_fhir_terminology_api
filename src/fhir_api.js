import axios from 'axios'


class EosFhirTerminologyServer {
  constructor (path, accessToken = null, responseType = 'json') {
    this.api_root = path
    this.accessToken = accessToken
    this.responseType = responseType
  }

  expandValueSet() {
    return this.makeApiCall('GET', `ValueSet/$expand${this.createParamaters()}`)
  }

  /// //////////////////////////////////////////////////////////////////////////////////
  // Refset
  /// //////////////////////////////////////////////////////////////////////////////////

  Refsets (refsets) {
    this.refsets = refsets
    return this
  }

  /// //////////////////////////////////////////////////////////////////////////////////
  // filters
  /// //////////////////////////////////////////////////////////////////////////////////
  Filters (filters) {
    this.filters = ''
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'url') {
        if (this.refsets) {
          this.filters += `${key}=${value}=refset${this.refsets}&`
        } else {
          this.filters += `${key}=${value}&`
        }
      }
      else {
        this.filters += `${key}=${value}&`
      }      
    })
    return this
  }

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // private methods
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  makeApiCall (method, endpoint, data = null, additionalHeaders = null) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: this.createPath(endpoint),
        data: data,
        headers: this.createHeaders(additionalHeaders),
        responseType: this.responseType
      })
        .then(data => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  createPath (endpoint) {
    return this.api_root + endpoint
  }

  createHeaders (additionalHeaders) {
    this.headers = {}
    if (this.accessToken) { this.headers.Authorization = `Bearer ${this.accessToken}` }
    if (additionalHeaders) {
      Object.entries(additionalHeaders).forEach(([key, value]) => {
        this.headers[key] = value
      })
    }
    return this.headers
  }

  createParamaters () {
    var endpoint = '?'
    if (this.filters) {
      endpoint += `${this.filters}`
    }
    return endpoint
  }
}

export {EosFhirTerminologyServer};
export default {EosFhirTerminologyServer};