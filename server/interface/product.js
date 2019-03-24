import Type from '../dbs/models/types';
import Product from '../dbs/models/products';
import Router from 'koa-router';
import axios from './utils/axios';

const geoUrl = 'https://restapi.amap.com/v3/geocode/geo'; // 地理编码api的url
const gdKey = '79e721e2dd35b49aa2a1a3a17d038451'; // 高德api密钥

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
    area,
    imgUrl,
    description,
    tel,
    officeHours,
    hot,
    saleList
  } = ctx.request.body;
  if (
    !name ||
    !type ||
    !price ||
    !address ||
    !adcode ||
    !cityCode ||
    !description ||
    !tel ||
    !officeHours ||
    imgUrl.length === 0 ||
    saleList.length === 0
  ) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const { data: { status, geocodes } } = await axios.get(geoUrl, {
    params: {
      key: gdKey,
      adcode,
      address
    }
  });
  let lng, lat;
  if (status === '1') {
    lng = geocodes[0].location.split(',')[0];
    lat = geocodes[0].location.split(',')[1];
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '获取地理编码信息失败'
    };
    return false;
  }
  const newProduct = await Product.create({
    name,
    type,
    price,
    place,
    address,
    adcode,
    cityCode,
    area,
    imgUrl,
    description,
    tel,
    officeHours,
    hot,
    saleList,
    lng,
    lat
  });
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

// 编辑团购信息
router.post('/editProduct', async (ctx) => {
  const {
    id,
    name,
    type,
    price,
    imgUrl,
    description,
    tel,
    officeHours,
    saleList
  } = ctx.request.body;
  if (
    !id ||
    !name ||
    !type ||
    !price ||
    !description ||
    !tel ||
    !officeHours ||
    imgUrl.length === 0 ||
    saleList.length === 0
  ) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const product = await Product.updateOne({ _id: id }, {
    name,
    type,
    price,
    imgUrl,
    description,
    tel,
    officeHours,
    saleList
  });
  if (product.n) {
    ctx.body = {
      code: 'SUC',
      msg: '编辑团购信息成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '编辑团购信息失败'
    };
  }
});

// 删除团购信息 
router.delete('/deleteProduct', async (ctx) => {
  const { id } = ctx.request.body;
  if (!id) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const product = await Product.deleteOne({ 
    _id: id
  });
  if (product.n) {
    ctx.body = {
      code: 'SUC',
      msg: '删除成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '该商家不存在'
    }
  }
});

// 设置热门团购
router.post('/setHot', async (ctx) => {
  const { id, hot, type } = ctx.request.body;
  if (!id || !type || !hot) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const limit = await Product.find({ type, hot: true });
  if (limit.length === 5 && hot === '1') {
    ctx.body = {
      code: 'CERR',
      msg: '该类别已有5个热门团购'
    };
    return false;
  }
  const result = await Product.updateOne({ _id: id }, { hot: hot === '1' });
  if (result) {
    ctx.body = {
      code: 'SUC',
      msg: hot === '1' ? '设为热门成功' : '取消热门成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '设为热门失败'
    }
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
  const filterBy = {
    '人气最高': { averRate: 'desc'},
    '评价最多': { commentCount: 'desc'},
    '价格降序': { price: 'desc'},
    '价格升序': { price: 'asc'},
  }
  const params = { cityCode };
  if (adcode) {
    params.adcode = adcode;
  }
  if (street) {
    params.place = street;
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

// 获取热门团购信息
router.get('/getHotProduct', async (ctx) => {
  const { type } = ctx.query;
  if (!type) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const data = await Product.find({ type, hot: true }).limit(5).exec();
  if (data) {
    ctx.body = {
      code: 'SUC',
      data,
      msg: '获取热门团购信息成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      data: null,
      msg: '获取热门团购信息成功'
    };
  }
});

// 获取最新团购信息(4条)
router.get('/getNewProduct', async (ctx) => {
  const data = await Product.find().sort({ createdAt: 'desc' }).limit(4).exec();
  if (data) {
    ctx.body = {
      code: 'SUC',
      data,
      msg: '获取最新团购信息成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      data: null,
      msg: '获取最新团购信息失败'
    };
  }
});

export default router;