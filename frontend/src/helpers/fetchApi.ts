type params = (url: string,
               method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
               body?: any) => Promise<Response>;

const fetchApi: params = (url, method = 'GET', body) => {
  const apiUrl = process.env.REACT_APP_BACKEND;
  return fetch(`${apiUrl}${url}`, {
    method,
    credentials: 'include',
    headers: {
      'Accept': '*/*',
    },
    ...(!!body) && { body }
  });
};

export default fetchApi;
