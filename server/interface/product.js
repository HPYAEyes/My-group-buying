import Type from '../dbs/models/types';
import Product from '../dbs/models/products';
import Router from 'koa-router';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

let router = new Router({
  prefix: '/product'
});

// 获取分类列表
router.get('/getTypeList', async (ctx) => {
  const typeList = await Type.find();
  if (typeList) {
    ctx.body = {
      code: 'SUC',
      data: typeList,
      msg: '获取分类列表成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      data: null,
      msg: '获取分类列表失败'
    };
  }
});

// 新增团购信息
router.post('/addProduct', async (ctx) => {
  const {
    name,
    type,
    price,
    place,
    address,
    adcode,
    imgUrl,
    description
  } = ctx.request.body;
  const newProduct = await Product.create({
    name,
    type,
    price,
    place,
    address,
    adcode,
    imgUrl,
    description
  });
  const createTime = moment(newProduct.createAt).format('YYYY-MM-DD HH:mm:ss');
  console.log(createTime);
  if (newProduct) {
    ctx.body = {
      code: 'SUC',
      msg: '新增团购信息成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '新增团购信息失败'
    };
  }
});

// 

export default router;