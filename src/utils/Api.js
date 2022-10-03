class Api {
  _handleError(res) {
    console.log(res)
    return res.ok ? res.json(): Promise.reject(res.status)
  }
}

export default Api;
