<template>
  <div class="product-detail">
    <!-- header -->
    <div class="detail-header">
      <div class="header-description">
        <div class="header-row">
          <h1>{{ productInfo.name }}</h1>
          <div style="display: flex;margin: 8px 0;">
            <el-rate
              v-model="productInfo.averRate"
              text-color="#ff9900"
              disabled
              allow-half
              show-score></el-rate>
            <span style="margin-left: 8px">人均￥{{ productInfo.price }}</span>
          </div>
        </div>
        <div class="header-info">
          <p>地址：{{ productInfo.address }}</p>
          <p>电话：{{ productInfo.tel}}</p>
          <p>营业时间： {{ productInfo.officeHours}}</p>
        </div>
      </div>
      <div class="header-image">
        <img :src="productInfo.imgUrl" :alt="productInfo.name">
      </div>
    </div>
    <!-- header -->
    <!-- content -->
    <h2>商家促销优惠</h2>
    <div class="detail-content">
      <p>4款套餐</p>
      <ul class="content-list">
        <li class="list-item">
          <div style="display: flex;">
            <img src="../assets/img/img1.jpg" alt="">
            <div class="item-info">
              <div class="subtitle">
                <span>眼包温灸</span>
                <i class="iconfont tg-tuan main-color"></i>
              </div>
              <div class="price">
                <span style="color:#f90">￥<span style="font-size:28px">28</span></span>
                <span style="margin-left:16px;color:#999;font-size:12px;">门店价180</span>
              </div>
            </div>
          </div>
          <el-button class="buy-btn" type="primary" size="medium">立即抢购</el-button>
        </li>
      </ul>
    </div>
    <!-- content -->
    <!-- comment -->
    <h2>网友评论(30条)</h2>
    <ul class="detail-comment-list">
      <li>
        <el-radio-group v-model="commentSort" size="small">
          <el-radio-button label="按时间排序"></el-radio-button>
          <el-radio-button label="按评分排序"></el-radio-button>
        </el-radio-group>
      </li>
      <li class="detail-comment">
        <div class="user-info">
          <img src="../assets/img/img1.jpg" alt="">
          <div class="info-detail">
            <span>hpyaeyes</span>
            <span style="margin: 4px 0;font-size:14px;color:#666">眼包温灸</span>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <el-rate
                v-model="averRate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score></el-rate>
              <span style="font-size:12px;color:#999">2019年2月25日</span>
            </div>
          </div>
        </div>
        <div class="user-comment">
          好真好，我自己也是戴的眼镜20多年了，然后我也不希望自己的孩子戴眼镜，去体验了之后，嗯，孩子视力降了50度， 我自己也知道中医好，然后店家也很专业，还给我们再次体验，再让我们来第二次体验嗯，我毫不犹豫的下疗程给女儿调理，摘掉眼镜有希望了。
        </div>
      </li>
      <li class="detail-comment">
        <div class="user-info">
          <img src="../assets/img/img1.jpg" alt="">
          <div class="info-detail">
            <span>hpyaeyes</span>
            <span style="margin: 4px 0;font-size:14px;color:#666">眼包温灸</span>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <el-rate
                v-model="averRate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score></el-rate>
              <span style="font-size:12px;color:#999">2019年2月25日</span>
            </div>
          </div>
        </div>
        <div class="user-comment">
          好真好，我自己也是戴的眼镜20多年了，然后我也不希望自己的孩子戴眼镜，去体验了之后，嗯，孩子视力降了50度， 我自己也知道中医好，然后店家也很专业，还给我们再次体验，再让我们来第二次体验嗯，我毫不犹豫的下疗程给女儿调理，摘掉眼镜有希望了。
        </div>
      </li>
      <li class="detail-comment">
        <div class="user-info">
          <img src="../assets/img/img1.jpg" alt="">
          <div class="info-detail">
            <span>hpyaeyes</span>
            <span style="margin: 4px 0;font-size:14px;color:#666">眼包温灸</span>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <el-rate
                v-model="averRate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score></el-rate>
              <span style="font-size:12px;color:#999">2019年2月25日</span>
            </div>
          </div>
        </div>
        <div class="user-comment">
          好真好，我自己也是戴的眼镜20多年了，然后我也不希望自己的孩子戴眼镜，去体验了之后，嗯，孩子视力降了50度， 我自己也知道中医好，然后店家也很专业，还给我们再次体验，再让我们来第二次体验嗯，我毫不犹豫的下疗程给女儿调理，摘掉眼镜有希望了。
        </div>
      </li>
      <li class="comment-pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="30">
        </el-pagination>
      </li>
    </ul>
    <div class="login-user-comment">
      <div>去过悦壹生视力矫正中心？给大家分享体验！</div>
      <div class="user-info">
        <img src="../assets/img/img1.jpg" alt="">
        <div class="info-detail">
          <span>hpyaeyes</span>
          <span style="margin: 4px 0;font-size:14px;color:#666">眼包温灸</span>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <el-rate
              v-model="userRate"
              text-color="#ff9900"
              allow-half
              show-score></el-rate>
          </div>
        </div>
      </div>
      <div class="user-comment">
        <el-input
        v-model="userComment"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 6}"
        minlength="15"
        maxlength="200"
        placeholder="请输入内容"
        resize="none"></el-input>
        <p v-if="needWords > 0" style="margin: 8px 0;color:#999;font-size:12px">至少需要写15个字哦，还需<span style="color:#409EFF">{{ needWords }}</span>个字</p>
        <p v-else style="margin: 8px 0;color:#999;font-size:12px">您还可以输入<span style="color:#409EFF">{{ applyWords }}</span>个字</p>
        <el-button type="primary" size="medium">评论</el-button>
      </div>
    </div>
    <!-- comment -->
    <div class="product-recommand hot-recommand">
      <p>近期热门推荐</p>
      <ul>
        <li>
          <a href="#">
            <img src="../assets/img/img1.jpg" alt="">
            <p>悦壹生视力矫正中心</p>
            <div class="comment">
              <el-rate
                v-model="rate"
                disabled
                allow-half></el-rate>
              <span class="count">22个评价</span>
            </div>
            <p class="address">北景园</p>
            <p class="price">人均￥<span>92</span></p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/img/img1.jpg" alt="">
            <p>悦壹生视力矫正中心</p>
            <div class="comment">
              <el-rate
                v-model="rate"
                disabled
                allow-half></el-rate>
              <span class="count">22个评价</span>
            </div>
            <p class="address">北景园</p>
            <p class="price">人均￥<span>92</span></p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/img/img1.jpg" alt="">
            <p>悦壹生视力矫正中心</p>
            <div class="comment">
              <el-rate
                v-model="rate"
                disabled
                allow-half></el-rate>
              <span class="count">22个评价</span>
            </div>
            <p class="address">北景园</p>
            <p class="price">人均￥<span>92</span></p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  queryProduct
} from 'api/product';

export default {
  name: 'productDetail',
  data() {
    return {
      averRate: 4.5,
      commentSort: '按时间排序',
      userRate: 0,
      userComment: '',
    };
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const { data: { data: productInfo } } = await queryProduct(route.query.id);
    return {
      productInfo
    }
  },
  computed: {
    needWords() {
      return 15 - this.userComment.trim().length;
    },
    applyWords() {
      return 200 - this.userComment.trim().length;
    }
  },
}
</script>
<style lang="scss">
@import "../assets/css/variable.scss";

.product-detail {
  position: relative;
  width: 1200px;
  min-height: 100vh;
  margin: 0 auto;

  .product-recommand {
    width: calc(25% - 116px);
    position: absolute;
    top: 400px;
    right: 0;
    border: 1px solid $border;
    border-radius: 4px;
  }

  h2 {
    margin-top: 50px;
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 400;
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 16px;
    border: 1px solid $border;
    border-radius: 8px;
    background-color: #fff;
    font-size: 14px;
    color: $greyFont;
    box-shadow: 0 5px 14px 0 rgba(0,0,0,.1);

    .header-description {
      width: 100%;
      margin-right: 16px;

      .header-row {
        padding: 8px 0;
        border-bottom: 1px solid $border;

        h1 {
          font-size: 26px;
          color: #222;
          font-weight: 400;
        }
      }

      .header-info {
        padding: 8px 0;

        p {
          margin: 16px 0;
        }
      }
    }

    .header-image {
      img {
        width: 385px;
        height: 280px;
        border-radius: 4px;
      }
    }
  }

  .detail-content {
    width: 75%;
    padding: 16px 16px 0;
    border: 1px solid $border;
    border-radius: 4px;
    background-color: #fff;

    .content-list {

      .list-item {
        position: relative;
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid $border;

        &:last-child {
          border-bottom: 0;
        }

        img {
          width: 100px;
          height: 100px;
          border-radius: 4px;
        }

        .item-info {
          margin-left: 16px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }

        .buy-btn {
          position: absolute;
          top: calc(50% - 18px);
          right: 0;
        }

        .main-color {
          color: $mainColor;
        }
      }
    }
  }

  .detail-comment-list {
    width: 75%;
    padding: 16px;
    margin-bottom: 20px;
    border: 1px solid $border;
    border-radius: 4px;
    background-color: #fff;

    .detail-comment {
      width: 100%;
      border-bottom: 1px solid $border;

      .user-info {
        display: flex;
        margin-top: 16px;

        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
  
        .info-detail {
          width: 100%;
          margin-left: 16px;
          display: flex;
          flex-direction: column;
        }
      }
  
      .user-comment {
        width: calc(100% - 76px);
        margin-top: 16px;
        margin-left: 76px;
        margin-bottom: 16px;
        font-size: 14px;
      }

    }

    .comment-pagination {
      margin-top: 16px;
      display: flex;
      justify-content: center;
    }
  }

  .login-user-comment {
    width: 75%;
    margin-bottom: 20px;
    padding: 16px;
    border: 1px solid $border;
    background-color: #fff;

    .user-info {
      display: flex;
      margin-top: 16px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      .info-detail {
        width: 100%;
        margin-left: 16px;
        display: flex;
        flex-direction: column;
      }
    }

    .user-comment {
      width: calc(100% - 76px);
      margin-top: 16px;
      margin-left: 76px;
      margin-bottom: 16px;
      font-size: 14px;
    }
  }
}
</style>


