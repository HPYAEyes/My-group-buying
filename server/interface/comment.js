import Comment from '../dbs/models/comments';
import Router from 'koa-router';

let router = new Router({
  prefix: '/comment'
});

// 新增评论
router.post('/addComment', async (ctx) => {
  const { userId, productId, content, rate, username, avatar } = ctx.request.body;
  if (!userId || !productId || !content || !rate || !username || !avatar) {
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
    username,
    avatar
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
  const comment = await Comment.find({ productId }).skip((pageNum - 1) * pageSize).limit(Number(pageSize)).sort(filterBy[sort]).exec();
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

export default router;