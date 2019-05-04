import Router from 'koa-router';
import axios from './utils/axios';

let router = new Router({
  prefix: '/geo'
});

const ipUrl = 'https://restapi.amap.com/v3/ip'; // ip定位api
const cityUrl = 'https://restapi.amap.com/v3/config/district'; // 城市查询api
const gdKey = '79e721e2dd35b49aa2a1a3a17d038451'; // 高德api密钥
const hfKey = '2639e17a06c24fa28f473367f3156ff5'; // 和风api密钥

// 获取地理位置
router.get('/getPosition', async (ctx) => {
  let { 
    data: { 
      status, 
      province, 
      city, 
      adcode 
    }
  } = await axios.get(`${ipUrl}?key=${gdKey}`);
  if (status === '1') {
    ctx.body = {
      code: 'SUC',
      data: {
        province,
        city,
        adcode
      },
      msg: '定位成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      data: null,
      msg: '定位失败'
    }
  };
});

// 获取所有城市
router.get('/getAllCity', async (ctx) => {
  let { 
    data: { 
      status, 
      districts
    }
  } = await axios.get(`${cityUrl}?key=${gdKey}&offset=1000&subdistrict=2`);
  if (status === '1') {
    districts[0].districts.forEach((province) => {
      province.districts.forEach((city) => {
        delete city.districts;
      })
    });
    ctx.body = {
      code: 'SUC',
      data: {
        provinceList: districts[0].districts
      },
      msg: '获取城市列表成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      data: null,
      msg: '获取城市列表失败'
    };
  }
});

// 获取热门城市
router.get('/getHotCity', async (ctx) => {
  const districts = [
    {
      name: '北京市',
      adcode: '110100'
    },
    {
      name: '上海市',
      adcode: '310100'
    },
    {
      name: '广州市',
      adcode: '440100'
    },
    {
      name: '深圳市',
      adcode: '440300'
    },
    {
      name: '天津市',
      adcode: '120100'
    },
    {
      name: '武汉市',
      adcode: '420100'
    },
    {
      name: '杭州市',
      adcode: '330100'
    },
    {
      name: '南京市',
      adcode: '320100'
    },
    {
      name: '重庆市',
      adcode: '500100'
    },
    {
      name: '厦门市',
      adcode: '350200'
    },
  ];
  ctx.body = {
    code: 'SUC',
    data: {
      districts
    },
    msg: '获取热门城市列表成功'
  };
});

// 获取指定城市信息
router.get('/getCityInfo', async (ctx) => {
  const { adcode } = ctx.query;
  const { data: { status, districts }} = await axios.get(`${cityUrl}?key=${gdKey}&keywords=${adcode}&subdistrict=0`);
  if (status === '1') {
    ctx.body = {
      code: 'SUC',
      data: {
        districts
      },
      msg: '获取城市信息成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      data: null,
      msg: '获取城市信息失败'
    };
  }
});

// 获取城市地区
router.get('/getArea', async (ctx) => {
  const { adcode, hot, subdistrict } = ctx.query;
  const { data: { status, districts }} = await axios.get(`${cityUrl}`, {
    params: {
      key: gdKey,
      keywords: adcode,
      subdistrict,
    }
  });
  let areaList;
  if (!districts[0] || !districts[0].districts) {
    areaList = districts[0].districts.sort((pre, next) => pre.adcode - next.adcode);
  } else {
    areaList = [];
  }
  if (status === '1') {
    ctx.body = {
      code: 'SUC',
      data: {
        areaList: hot ? areaList.slice(0, 8) : areaList
      },
      msg: '获取地区成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      data: null,
      msg: '获取地区失败'
    };
  }
});

export default router;