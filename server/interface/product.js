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
    cityCode,
    city,
    area,
    imgUrl,
    description,
    tel,
    officeHours,
    hot
  } = ctx.request.body;
  const newProduct = await Product.create({
    name,
    type,
    price,
    place,
    address,
    adcode,
    cityCode,
    city,
    area,
    imgUrl,
    description,
    tel,
    officeHours,
    hot
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

// 获取团购信息列表
router.get('/getProductList', async (ctx) => {
  const { pageSize, pageNum, cityCode, adcode, type, street, sort } = ctx.query;
  if (!pageSize || !pageNum || !cityCode || !sort) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const filterBy = [ // sort: 0为创建时间降序，1为价格降序，2为价格升序，3为人气降序
    { createAt: 'desc'},
    { price: 'desc'},
    { price: 'asc'},
    { averRate: 'desc'},
  ]
  const params = { cityCode };
  if (adcode) {
    params.adcode = adcode;
  }
  if (street) {
    params.street = street;
  }
  if (type) {
    params.type = type;
  }
  const productList = await Product.find(params).skip((pageNum - 1) * pageSize).limit(Number(pageSize)).sort(filterBy[sort]).exec();
  const totalRecords = await Product.countDocuments(params);
  if (productList && totalRecords !== undefined) {
    ctx.body = {
      code: 'SUC',
      data: {
        productList,
        totalRecords
      },
      msg: '获取团购信息列表成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '获取团购信息列表失败'
    };
  }
});

// 获取团购信息详情
router.get('/getProduct', async (ctx)=> {
  const { id } = ctx.query;
  if (!id) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const product = await Product.findOne({
    _id: id
  });
  if (product) {
    ctx.body = {
      code: 'SUC',
      data: product,
      msg: '获取团购信息详情成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      data: product,
      msg: '获取团购信息详情失败'
    };
  }
});

export default router;