import request from 'utils/request';

export function queryTypeList() {
  return request.get('/product/getTypeList');
}

export function queryPlaceList(adcode) {
  return request.get(`/geo/getArea?adcode=${adcode}&subdistrict=2`);
}

export function queryProductList({
  pageSize,
  pageNum,
  cityCode,
  sort,
  adcode,
  type,
  street
}) {
  let query = `pageSize=${pageSize}&pageNum=${pageNum}&cityCode=${cityCode}&sort=${sort}`;
  if (adcode) {
    query += `&adcode=${adcode}`;
  }
  if (type) {
    query += `&type=${type}`;
  }
  if(street) {
    query += `&street=${street}`;
  }
  return request.get(`/product/getProductList?${query}`);
}

export function queryProduct(id) {
  return request.get(`/product/getProduct?id=${id}`);
}

export function comment({
  userId,
  productId,
  rate,
  content,
  username,
  avatar
}) {
  return request.post('/comment/addComment', {
    userId,
    productId,
    rate,
    content,
    username,
    avatar
  });
}

export function queryCommentList(productId, pageNum = 1, pageSize = 10, sort) {
  return request.get(`/comment/getCommentList?pageNum=${pageNum}&pageSize=${pageSize}&productId=${productId}&sort=${sort}`);
}