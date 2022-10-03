class Api {
  _handleError(res) {
    return res.ok ? res.json(): Promise.reject(res.status)
  }
}

export default Api;
