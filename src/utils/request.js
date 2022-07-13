import service from './http';

export default function request(method, url, data = {}, headers = {}) {
  const dataType = method.toLowerCase() === 'get' ? 'params' : 'data';
  const options = {
    method,
    url,
    [dataType]: data,
    headers: {
      'content-type': 'application/json;charset=utf-8',
      ...headers,
    },
  };
  return service(options);
}
