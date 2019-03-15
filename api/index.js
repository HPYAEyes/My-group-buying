import request from 'utils/request';

export function getChkCode({username, email}) {
  return request.post('/users/verify', {
    username,
    email
  });
}

export function register({
  username,
  password,
  email,
  code
}) {
  return request.post('/users/signup', {
    username,
    password,
    email,
    code
  });
}
export function login({
  username,
  password
}) {
  return request.post('/users/signin', {
    username,
    password
  });
}

export function getUser() {
  return request.get('/users/getUser');
}

export function logout() {
  return request.get('/users/signout');
}

export function getCity(adcode) {
  return request.get(`/geo/getCityInfo?adcode=${adcode}`);
}

export function getHotArea(adcode, hot) {
  return request.get(`/geo/getArea?adcode=${adcode}&hot=${hot}&subdistrict=1`);
}