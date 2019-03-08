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

export function test(_id) {
  return request.post('/users/getId', {
    _id
  });
}