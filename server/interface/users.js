import Router from 'koa-router';
import Redis from 'koa-redis';
import nodeMailer from 'nodemailer';
import User from '../dbs/models/users';
import Passport from './utils/passport';
import Email from '../dbs/configs';
import axios from './utils/axios';

let router = new Router({
  prefix: '/users'
});

let Store = new Redis().client;


// 注册
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;

  // 校验验证码
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code');
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: 'CERR',
          msg: '验证码已过期，请重新尝试'
        };
        return false;
      } else {
        ctx.body = {
          code: 'CERR',
          msg: '请填写正确的验证码'
        }
      }
    }
  } else {
    ctx.body = {
      code: 'CERR',
      msg: '请填写验证码'
    };
  }

  let newUser = await User.create({
    username,
    password,
    email,
    avatar: 'http://localhost:3333/ec595be91553326938440.png'
  });
  if (newUser) {
    let res = await axios.post('/users/signin', {
      username: email,
      password
    });
    if (res.data && res.data.code === 'SUC') {
      ctx.body = {
        code: 'SUC',
        msg: '注册成功',
        user: res.data.user
      };
    } else {
      ctx.body = {
        code: 'SERR',
        msg: 'error'
      };
    }
  } else {
    ctx.body = {
      code: 'DERR',
      msg: '注册失败'
    }
  }
});

// 登录
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: 'SERR',
        msg: err
      };
      return;
    }
    if (user) {
      ctx.body = {
        code: 'SUC',
        msg: '登陆成功',
        user
      };
      return ctx.login(user);
    } else {
      ctx.body = {
        code: 'SERR',
        msg: info
      }
    }
  })(ctx, next);
});

// 验证码
router.post('/verify', async (ctx, next) => {
  const { username, email } = ctx.request.body;
  let user = await User.find({
    username
  });
  if (user.length) {
    ctx.body = {
      code: 'CERR',
      msg: '该昵称已被注册'
    }
    return;
  }
  user = await User.find({
    email
  });
  if (user.length) {
    ctx.body = {
      code: 'CERR',
      msg: '该邮箱已被注册'
    }
    return;
  }
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
  // if (saveExpire && new Date().getTime() - saveExpire < 0) {
  //   ctx.body = {
  //     code: 'CERR',
  //     msg: '验证请求过于频繁，请稍后再试'
  //   };
  //   return false;
  // }
  // 初始化发送邮件组件
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587, // 发送邮件服务器：smtp.qq.com，使用SSL，端口号465或587
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  });
  //  发送的邮箱验证码相关信息
  let sendCode = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  };
  // 发送的邮件配置
  let mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: sendCode.email,
    subject: '休闲娱乐团购网站注册验证邮件',
    html: `您在"休闲娱乐团购网站"中注册，您的验证码是${sendCode.code}，有效期1分钟`
  };
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log('sendMail error!');
    }
    Store.hmset(`nodemail:${sendCode.user}`, 'code', sendCode.code, 'expire', sendCode.expire, 'email', sendCode.email);
  });
  ctx.body = {
    code: 'SUC',
    msg: '验证码已发送，有效期1分钟'
  };
});

// 登出
router.get('/signout', async (ctx, next) => {
  await ctx.logout();
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 'SUC',
      msg: '登出成功'
    }
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '登出失败'
    }
  }
});

// 获取用户信息
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { email, _id, createdAt } = ctx.session.passport.user;
    const userInfo = await User.findOne({ _id });
    if (userInfo) {
      ctx.body = {
        code: 'SUC',
        email,
        _id,
        createdAt,
        avatar: userInfo.avatar,
        username: userInfo.username
      };
    } else {
      ctx.body = {
        code: 'SUC',
        username: '',
        email: '',
        _id: '',
        avatar: '',
        createdAt: ''
      };
    }
  } else {
    ctx.body = {
      code: 'SUC',
      username: '',
      email: '',
      _id: '',
      avatar: '',
      createdAt: ''
    };
  }
});

// 获取用户列表
router.get('/getUserList', async (ctx) => {
  const { pageSize, pageNum } = ctx.request.body;
  const userList = await User.find().skip((pageNum - 1) * pageSize).limit(Number(pageSize)).exec();
  const totalRecords = await User.countDocuments();
  if (userList && totalRecords !== undefined) {
    ctx.body = {
      code: 'SUC',
      data: {
        userList,
        totalRecords
      },
      msg: '获取用户列表成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      data: null,
      msg: '获取用户列表失败'
    }
  }
});

// 编辑某个用户
router.post('/editUser', async (ctx) => {
  const { _id, username, email, password, avatar } = ctx.request.body;
  if (!_id || !username || !email || !password || ! avatar) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const user = await User.updateOne({ _id }, {
    username,
    email,
    password,
    avatar
  });
  if (user.n) {
    ctx.body = {
      code: 'SUC',
      msg: '编辑用户成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '编辑用户失败'
    }
  }
});

// 用户编辑个人资料
router.post('/updateInfo', async (ctx) => {
  const { _id, username, avatar } = ctx.request.body;
  if (!_id) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const params = {};
  if (username) {
    params.username = username;
  }
  if (avatar) {
    params.avatar = avatar;
  }
  const user = await User.updateOne({ _id }, params);
  if (user.n) {
    ctx.body = {
      code: 'SUC',
      msg: '编辑个人资料成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '编辑个人资料失败'
    }
  }
});

// 用户修改密码
router.post('/modifyPwd', async (ctx) => {
  const { _id, oldPwd, newPwd } = ctx.request.body;
  if (!_id || !oldPwd || !newPwd) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const oldInfo = await User.findOne({ _id }, { password: oldPwd });
  if (!oldInfo) {
    ctx.body = {
      code: 'CERR',
      msg: '用户信息有误'
    };
    return false;
  }
  if (oldPwd !== oldInfo.password) {
    ctx.body = {
      code: 'CERR',
      msg: '旧密码错误'
    };
    return false;
  }
  const user = await User.updateOne({ _id }, { password: newPwd });
  if (user.n) {
    ctx.body = {
      code: 'SUC',
      msg: '修改密码成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '修改密码失败'
    };
  }
});

// 删除某个用户
router.delete('/deleteUser', async (ctx) => {
  const { _id } = ctx.request.body;
  if (!_id) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const user = await User.deleteOne({
    _id
  });
  if (user) {
    ctx.body = {
      code: 'SUC',
      msg: '删除用户成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '删除用户失败'
    }
  }
});

export default router;