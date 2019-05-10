import request from 'utils/request';

export function getUserOrderList({
  userId,
  status
}) {
  const statusArr = ['0', '1', '2', '3'];
  let params = '';
  if (statusArr[status] !== undefined) {
    params = `&status=${status}`
  }
  return request.get(`/order/getOrderList?userId=${userId}${params}`);
}

export function updatePersonalInfo({
  _id,
  username,
  avatar
}) {
  return request.post('/users/updateInfo', {
    _id,
    username,
    avatar
  });
}

export function updateUserPwd({
  _id,
  oldPwd,
  newPwd
}) {
  return request.post('/users/modifyPwd', {
    _id,
    oldPwd,
    newPwd
  });
}