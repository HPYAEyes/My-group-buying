import Comment from '../dbs/models/comments';
import Router from 'koa-router';

let router = new Router({
  prefix: '/comment'
});

// 新增评论
router.post('/addComment', async (ctx) => {
  const { userId, productId, content, rate } = ctx.request.body;
  if (!userId || !productId || !content || !rate) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const comment = await Comment.create({
    userId,
    productId,
    rate,
    content,
  });
  if (comment) {
    ctx.body = {
      code: 'SUC',
      msg: '评论成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '评论失败'
    }
  }
});

// 获取评论列表
router.get('/getCommentList', async (ctx) => {
  const { productId, pageNum, pageSize, sort } = ctx.query;
  if (!productId || !sort) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const filterBy = { // sort: 0为创建时间降序，1为创建时间升序，2为评分降序，3为评分升序
    '按时间降序': { createdAt: 'desc'},
    '按时间升序': { createdAt: 'asc'},
    '按评分降序': { rate: 'desc'},
    '按评分升序': { rate: 'asc'},
  };
  const comment = await Comment.find({ productId }).populate('userId', 'username avatar').skip((pageNum - 1) * pageSize).limit(Number(pageSize)).sort(filterBy[sort]).exec();
  const totalRecords = await Comment.countDocuments({ productId });
  if (comment && totalRecords !== undefined) {
    ctx.body = {
      code: 'SUC',
      data: {
        commentList: comment,
        totalRecords
      },
      msg: '获取评论列表成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      data: null,
      msg: '获取评论失败'
    }
  }
});

// 编辑某个评论
router.post('/editComment', async (ctx) => {
  const { _id, rate, content } = ctx.request.body;
  if (!_id || !rate || !content) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const comment = await Comment.updateOne({ _id }, {
	rate,
	content,
  });
  if (comment.n) {
    ctx.body = {
      code: 'SUC',
      msg: '编辑评论成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '编辑评论失败'
    }
  }
});

// 删除评论
router.delete('/deleteComment', async (ctx) => {
  const { id } = ctx.request.body;
  if (!id) {
    ctx.body = {
      code: 'CERR',
      msg: '参数有误'
    };
    return false;
  }
  const comment = await Comment.deleteOne({
    _id: id
  });
  if (comment) {
    ctx.body = {
      code: 'SUC',
      msg: '删除评论成功'
    };
  } else {
    ctx.body = {
      code: 'SERR',
      msg: '删除评论失败'
    }
  }
});

// 获取首页最新评论(5条)
router.get('/getNewComments', async (ctx) => {
  const data = await Comment.find().populate('productId', 'name type imgUrl').populate('userId', 'username').sort({ createdAt: 'desc' }).limit(5).exec();
  if (data) {
    ctx.body = {
      code: 'SUC',
      data,
      msg: '获取首页最新评论成功'
    };
  } else {
    ctx.body = {
      code: 'DERR',
      data: null,
      msg: '获取首页最新评论失败'
    };
  }
});

export default router;