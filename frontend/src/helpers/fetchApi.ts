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
      ...(isJson) && { 'Content-Type': 'application/json'}
    },
    ...(!!body) && { body }
  });
};

export default fetchApi;
