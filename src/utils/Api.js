class Api {
  _handleError(res) {
    return res.ok
      ? res.json()
      : res.json().then((data) => {
        throw new Error(`Ошибка ${res.status}: ${data.message}`);
      })
      // ${res.status}: ${data.message}`);
    // return res.ok ? res.json() : Promise.reject(res.status);
  }
}

export default Api;
