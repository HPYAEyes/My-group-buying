import Order from '../dbs/models/orders';
import Product from '../dbs/models/products';
import Router from 'koa-router';

let router = new Router({
  prefix: '/order'
});

// 下单
router.get('/placeOrder', async (ctx) => {
  const { saleId, productId, userId } = ctx.query;
  if (!saleId || !productId || !userId) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const productInfo = await Product.findOne({ _id: productId });
  if (!productInfo) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const sales = productInfo.saleList.find((item) => item.id === saleId);
  const newOrder = await Order.create({
    saleId,
    productId,
    userId,
    status: '1',
    imgUrl: productInfo.imgUrl,
    productName: productInfo.name,
    address: productInfo.address,
    type: productInfo.type,
    salePrice: sales.salePrice,
    saleName: sales.name,
    price: sales.offPrice,
    expires: sales.expires,
  });
  if (newOrder) {
    ctx.body = {
      code: 'SUC',
      msg: '下单成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '下单失败'
    };
  }
});

// 使用团购优惠券
router.get('/orderUse', async (ctx) => {
  const { orderId } = ctx.query;
  if (!orderId) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const order = await Order.updateOne({ _id: orderId }, { status: '2' });
  if (order.n) {
    ctx.body = {
      code: 'SUC',
      msg: '使用团购优惠券成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '使用团购优惠券失败'
    };
  }
});

// 查询订单列表
router.get('/getOrderList', async (ctx) => {
  const { userId, status } = ctx.query;
  const params = {};
  if (userId) {
    params.userId = userId;
  }
  if (status) {
    params.status = status;
  }
  const orderList = await Order.find(params);
  if (orderList) {
    ctx.body = {
      code: 'SUC',
      data: orderList,
      msg: '获取订单列表成功'
    }
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '获取订单列表失败'
    };
  }
});

// 查询某个订单
router.get('/getOrderInfo', async (ctx) => {
  const { orderId } = ctx.query;
  if (!orderId) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const order = await Order.findOne({ _id: orderId });
  if (order) {
    ctx.body = {
      code: 'SUC',
      msg: '获取订单信息成功',
      data: order
    };
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '获取订单信息失败'
    };
  }
});

export default router;