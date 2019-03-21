import Router from 'koa-router';
import Admin from '../dbs/models/adminusers';

let router = new Router({
  prefix: '/adminusers'
});

// 管理员用户登录
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  const user = await Admin.findOne({ username });
  if (user) {
    if (password === user.password) {
      ctx.body = {
        code: 'SUC',
        msg: '登录成功'
      }
    } else {
      ctx.body = {
        code: 'CERR',
        msg: '密码错误'
      };
    }
  } else {
    ctx.body = {
      code: 'CERR',
      msg: '用户不存在'
    }
  }
});

export default router;