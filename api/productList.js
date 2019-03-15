import request from 'utils/request';

export function queryTypeList() {
  return request.get('/product/getTypeList');
}

export function queryPlaceList(adcode) {
  return request.get(`/geo/getArea?adcode=${adcode}&subdistrict=2`);
}
