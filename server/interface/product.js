import Type from '../dbs/models/types';
import Product from '../dbs/models/products';
import Router from 'koa-router';

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

export default router;