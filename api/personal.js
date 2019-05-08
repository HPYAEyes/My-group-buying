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