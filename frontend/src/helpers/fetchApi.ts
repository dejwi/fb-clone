type params = (url: string,
               method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
               body?: any,
               isJson?: true
) => Promise<Response>;

const fetchApi: params = (url, method = 'GET', body, isJson) => {
  const token = window.localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_BACKEND;
  const params: any = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept': '*/*',
    },
  };
  if (isJson)
    params.headers['Content-Type'] = 'application/json';
  if(body)
    params.body = body;
  return fetch(`${apiUrl}${url}`, params);
};

export default fetchApi;
