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
      <li @click="status = ''"><i class="iconfont tg-all-order">全部订单</i></li>
      <li @click="status = '1'"><i class="iconfont tg-daishiyong">待使用</i></li>
      <li @click="status = '2'"><i class="iconfont tg-daipingjia">待评价</i></li>
      <li @click="status = '3'"><i class="iconfont tg-yiguoqi">已过期</i></li>
      <li @click="status = '-1'"><i class="iconfont tg-gerenxinxi">个人信息设置</i></li>
    </ul>
    <div class="personal-container">
      <h2>{{ title }}</h2>
      <el-collapse>
        <el-collapse-item v-for="item in orderList" :key="item._id">
          <template slot="title">
            <div class="order-item">
              <img class="order-img" :src="item.imgUrl[0]">
              <div class="order-info">
                <p>{{ item.saleName }}</p>
                <span>订单编号：{{ item._id }}</span>
                <span>有效期至：{{ item.expires }}</span>
              </div>
              <div class="order-price">总价：¥{{ item.price }}</div>
              <div class="order-status">
                <span v-if="item.status === '0'">已评价</span>
                <span v-else-if="item.status === '1'">待使用</span>
                <span v-else-if="item.status === '2'">待评价</span>
                <span v-else-if="item.status === '3'">已使用</span>
              </div>
            </div>
          </template>
          <div class="order-detail">
            <p>店名：{{ item.productName }}</p>
            <p>地址：{{ item.address }}</p>
            <p>类型：{{ item.type }}</p>
            <p>门店价：{{ item.salePrice }}</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { getUserOrderList } from 'api/personal';

export default {
  name: 'personalCenter',
  data() {
    return {
      orderList: [],
      status: '',
    };
  },
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    return {
      username: store.state.user.userInfo.username,
      avatar: store.state.user.userInfo.avatar,
      email: store.state.user.userInfo.email,
      createdAt: store.state.user.userInfo.createdAt,
    };
  },
  mounted() {
    this.getOrderList();
  },
  computed: {
    title() {
      if (this.status === '') {
        return '全部订单';
      }
      const titleObj = {
        '1': '待使用',
        '2': '待评价',
        '3': '已过期',
        '-1': '个人信息设置'
      };
      return titleObj[this.status];
    }
  },
  watch: {
    status(newVal, oldVal) {
      if (newVal === oldVal) return;
      newVal === '-1' ? '': this.getOrderList(newVal);
    }
  },
  methods: {
    getOrderList(status) {
      getUserOrderList({
        userId: this.$store.state.user.userInfo._id,
        status
      }).then((res) => {
        this.orderList = res.data.data;
      })
    }
  }
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

    h2 {
      padding: 16px 0;
    }

    .el-collapse,
    .el-collapse-item__wrap {
      border: 0;
    }

    .el-collapse-item__header {
      height: auto;
      line-height: inherit;
      color: inherit;
      font-size: inherit;
      border: 0;
    }

    .order-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 0;
      border-top: 1px solid #e5e5e5;
    }

    .order-detail {
      border-top: 1px solid #e5e5e5;
    }

    .order-img {
      width: 90px;
      height: 90px;
      border-radius: 4px;
    }

    .order-info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-left: 20px;

      p {
        margin-bottom: 8px;
        font-size: 16px;
        color: $mainFont;
      }

      span {
        margin-bottom: 4px;
      }
    }

    .order-price {
      flex-basis: 200px;
    }

    .order-status {
      flex-basis: 200px;
    }
  }
}
</style>
