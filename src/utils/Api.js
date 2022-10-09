class Api {
  _handleError(res) {
    return res.ok
      ? res.json()
      : res.json().then((data) => {
        throw new Error(`Ошибка ${res.status}: ${data.message}`);
      })
  }
}

export default Api;
