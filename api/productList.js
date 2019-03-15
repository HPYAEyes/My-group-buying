import request from 'utils/request';

export function queryTypeList() {
  return request.get('/product/getTypeList');
}
