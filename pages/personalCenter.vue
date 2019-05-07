<template>
  <div id="personal-center">
    <div class="personal-header">
      <img class="user-avatar" :src="avatar" alt="用户头像">
      <div class="user-info">
        <h1>{{ username }}</h1>
        <p class="user-email">{{ email }}</p>
        <p class="user-createtime">于{{ $moment(createdAt).fromNow() }}加入了本网站</p>
      </div>
    </div>
    <ul class="personal-tabs">
      <li><i class="iconfont tg-all-order">全部订单</i></li>
      <li><i class="iconfont tg-daishiyong">待使用</i></li>
      <li><i class="iconfont tg-daipingjia">待评价</i></li>
      <li><i class="iconfont tg-yiguoqi">已过期</i></li>
      <li><i class="iconfont tg-gerenxinxi">个人信息设置</i></li>
    </ul>
    <div class="personal-container">
      <div class="order-item">
        <img class="order-img" src="../assets/img/img1.jpg">
        <div class="order-info">
          <p>音浪KTV(中大银泰店)-黄金档欢唱套餐</p>
          <span>有效期至：2019-05-31</span>
        </div>
        <div class="order-price">总价：¥96.00</div>
        <div class="order-status">待评价</div>
      </div>
      <div class="order-item">
        <img class="order-img" src="../assets/img/img1.jpg">
        <div class="order-info">
          <p>音浪KTV(中大银泰店)-黄金档欢唱套餐</p>
          <span>有效期至：2019-05-31</span>
        </div>
        <div class="order-price">总价：¥96.00</div>
        <div class="order-status">待评价</div>
      </div>
      <div class="order-item">
        <img class="order-img" src="../assets/img/img1.jpg">
        <div class="order-info">
          <p>音浪KTV(中大银泰店)-黄金档欢唱套餐</p>
          <span>有效期至：2019-05-31</span>
        </div>
        <div class="order-price">总价：¥96.00</div>
        <div class="order-status">待评价</div>
      </div>
      <div class="order-item">
        <img class="order-img" src="../assets/img/img1.jpg">
        <div class="order-info">
          <p>音浪KTV(中大银泰店)-黄金档欢唱套餐</p>
          <span>有效期至：2019-05-31</span>
        </div>
        <div class="order-price">总价：¥96.00</div>
        <div class="order-status">待评价</div>
      </div>
      <div class="order-item">
        <img class="order-img" src="../assets/img/img1.jpg">
        <div class="order-info">
          <p>音浪KTV(中大银泰店)-黄金档欢唱套餐</p>
          <span>有效期至：2019-05-31</span>
        </div>
        <div class="order-price">总价：¥96.00</div>
        <div class="order-status">待评价</div>
      </div>
      <div class="order-item">
        <img class="order-img" src="../assets/img/img1.jpg">
        <div class="order-info">
          <p>音浪KTV(中大银泰店)-黄金档欢唱套餐</p>
          <span>有效期至：2019-05-31</span>
        </div>
        <div class="order-price">总价：¥96.00</div>
        <div class="order-status">待评价</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personalCenter',
  data() {
    return {};
  },
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    return {
      username: store.state.user.userInfo.username,
      avatar: store.state.user.userInfo.avatar,
      email: store.state.user.userInfo.email,
      createdAt: store.state.user.userInfo.createdAt
    };
  },
}
</script>
<style lang="scss">
@import "../assets/css/variable.scss";

#personal-center {
  width: 1200px;
  margin: 0 auto;

  .personal-header {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    margin-top: 30px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: #fff;
    background: linear-gradient(90deg, rgb(64, 158, 255), rgb(160, 207, 255));

    .user-avatar {
      width: 110px;
      height: 110px;
      margin-left: 6%;
      border-radius: 50%;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
      // border: 6px solid rgba(255, 255, 255, .16);
    }

    .user-info {
      margin-left: 30px;
      display: flex;
      flex-direction: column;

      h1 {
        margin-bottom: 4px;
      }

      p {
        margin-bottom: 4px;
      }

      .user-createtime {
        font-size: 14px;
      }
    }
  }

  .personal-tabs {
    width: 100%;
    height: 110px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: $greyFont;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    li {
      position: relative;
    }

    i {
      cursor: pointer;
      &:before {
        position: absolute;
        top: 50%;
        transform: translate(-120%, -50%);
        font-size: 32px;
      }
    }

    .tg-all-order {
      &:before {
        color: #409eff;
      }
    }

    .tg-daipingjia {
      &:before {
        color: #e6a23c;
      }
    }

    .tg-daishiyong {
      &:before {
        color: #72baff;
      }
    }

    .tg-yiguoqi {
      &:before {
        color: #f56c6c;
      }
    }

    .tg-gerenxinxi {
      &:before {
        color: #67c23a;        
      }
    }
  }

  .personal-container {
    width: 100%;
    margin-bottom: 30px;
    padding: 0 16px;
    border: 1px solid $border;
    border-radius: 4px;
    background-color: #fff;
    color: $greyFont;
    font-size: 12px;
    box-sizing: border-box;

    .order-item {
      display: flex;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #e5e5e5;

      &:last-child {
        border-bottom: 0;
      }
    }

    .order-img {
      width: 90px;
      height: 90px;
      border-radius: 4px;
    }

    .order-info {
      display: flex;
      flex-direction: column;
      flex-grow: 2;
      margin-left: 20px;

      p {
        margin-bottom: 12px;
        font-size: 16px;
        color: $mainFont;
      }
    }

    .order-price {
      flex-grow: 1;
    }

    .order-status {
      flex-grow: 1;
    }
  }
}
</style>
