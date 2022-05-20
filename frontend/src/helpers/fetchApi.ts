type params = (url: string,
               method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
               body?: any,
               isJson?: true
) => Promise<Response>;

const fetchApi: params = (url, method = 'GET', body, isJson) => {
  const apiUrl = process.env.REACT_APP_BACKEND;
  return fetch(`${apiUrl}${url}`, {
    method,
    credentials: 'include',
    headers: {
      'Accept': '*/*',
      ...(isJson) && { 'Content-Type': 'application/json'}
    },
    ...(!!body) && { body }
  });
};

export default fetchApi;
