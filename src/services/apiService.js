class ApiService {
  constructor() {
    this.baseURL = 'http://10.0.2.2:8082';
    this.authToken = 'c5bd9007-112e-06a1-3128-8c0698914adb'; //ideal é criar uma variável de ambiente para não ficar direto no código. Ver isso depois
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    };
  }

  async request(method, endpoint, data = null) {
    let url = `${this.baseURL}/${endpoint}`;

    const options = {
      method,
      headers: this.headers,
    };

    if (data !== null) {
      if (method === 'GET') {
        const params = new URLSearchParams(data);
        url += `?${params.toString()}`;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      /* Testa se o código de retorno está dentro da faixa de sucesso (2xx). */
      if (response.status < 200 || response.status >= 300) {
        throw new Error(result.message);
      }

      return result;
    } catch (error) {
      throw new Error(error.message);
    }

  }
}

export default ApiService;
