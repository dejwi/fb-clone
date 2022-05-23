type params = (url: string,
               method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
               body?: any,
               isJson?: true
) => Promise<Response>;

const fetchApi: params = (url, method = 'GET', body, isJson) => {
  const token = window.localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_BACKEND;
  return fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept': '*/*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36',
      ...(isJson) && { 'Content-Type': 'application/json'}
    },
    ...(!!body) && { body }
  });
};

export default fetchApi;
