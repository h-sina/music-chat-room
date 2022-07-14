import service from './musicHttp';

export default function musicRequest(method, url, data = {}, headers = {}) {
  const dataType = method.toLowerCase() === 'get' ? 'params' : 'data';
  const options = {
    method,
    url,
    [dataType]: data,
    headers: {
      ...headers,
    },
  };
  return service(options);
}
