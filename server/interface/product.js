import Type from '../dbs/models/types';

let router = new Router({
  prefix: '/product'
});

// 获取分类列表
router.get('/getTypeList', async (ctx) => {
  const type = await Type.find();
  if (type) {

  } else {
    
  }
});