class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:8081';
    this.authToken = 'c5bd9007-112e-06a1-3128-8c0698914adb' //ideal é criar uma variável de ambiente para não ficar direto no código. Ver isso depois
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    };
  }

  async request(endpoint, method, data = null) {
    const url = `${this.baseURL}/${endpoint}`;

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

    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  }
}

export default ApiService;
