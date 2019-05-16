<template>
  <div class="index-container">
    <div class="section-card">
      <div class="card-title">
        杭州休闲娱乐
      </div>
      <div class="card-list">
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-relax"></i>
            <span>休闲</span>
          </div>
          <ul class="card-container-main">
            <li>私人影院</li>
            <li>密室</li>
            <li>团建扩展</li>
            <li>棋牌室</li>
          </ul>
        </div>
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-sing"></i>
            <span>娱乐</span>
          </div>
          <ul class="card-container-main">
            <li>KTV</li>
            <li>桌游</li>
            <li>网吧/电竞</li>
            <li>VR</li>
          </ul>
        </div>
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-sport"></i>
            <span>运动</span>
          </div>
          <ul class="card-container-main">
            <li>运动健身</li>
            <li>轰趴馆</li>
            <li>新奇体验</li>
          </ul>
        </div>
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-learn"></i>
            <span>文化</span>
          </div>
          <ul class="card-container-main">
            <li>文化艺术</li>
            <li>采摘/农家乐</li>
            <li>游乐游艺</li>
            <li>茶馆</li>
            <li>DIY手工坊</li>
          </ul>
        </div>
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-yangsheng"></i>
            <span>养生</span>
          </div>
          <ul class="card-container-main">
            <li>按摩/足疗</li>
            <li>洗浴/汗蒸</li>
          </ul>
        </div>
      </div>
      <dl class="card-footer">
        <dt>热门地区：</dt>
        <dd
          v-for="item in areaList"
          :key="item.adcode"
          style="cursor:pointer"
          @click="$router.push({ path:'/productList', query: { adcode: item.adcode }})">{{ item.name }}</dd>
        <nuxt-link to="/productList" class="more-info" style="margin: 0;position:absolute;right:36px;">更多</nuxt-link>
      </dl>
    </div>
    <div class="section-card">
      <div class="card-title" style="border-bottom: 0;">
        近期热门推荐
      </div>
      <el-tabs
        class="card-tabs"
        v-model="currentTab"
        stretch 
        type="card">
        <el-tab-pane class="tabs-container" label="桌游" name="first">
          <ul class="pic-list">
            <li v-for="item in firstList" :key="item.name">
              <nuxt-link :to="{ path: '/productDetail', query: { id: item._id }}"><img :src="item.imgUrl[0]" :alt="item.name"></nuxt-link>
              <el-tooltip 
                effect="dark"
                :content="item.name"
                placement="top">
                <span class="pic-shopname">{{ item.name }}</span>
              </el-tooltip>
              <el-rate
                v-model="item.averRate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score>
              </el-rate>
              <span>{{ item.commentCount }}人评分</span>
            </li>
          </ul>
          <nuxt-link class="more-info" :to="{ path: '/productList', query: {type: '桌游'}}">更多桌游</nuxt-link>
        </el-tab-pane>
        <el-tab-pane class="tabs-container" label="密室" name="second">
          <ul class="pic-list">
            <li v-for="item in secondList" :key="item.name">
              <nuxt-link :to="{ path: '/productDetail', query: { id: item._id }}"><img :src="item.imgUrl[0]" :alt="item.name"></nuxt-link>
              <el-tooltip 
                effect="dark"
                :content="item.name"
                placement="top">
                <span class="pic-shopname">{{ item.name }}</span>
              </el-tooltip>
              <el-rate
                v-model="item.averRate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score>
              </el-rate>
              <span>{{ item.commentCount }}人评分</span>
            </li>
          </ul>
          <nuxt-link class="more-info" :to="{ path: '/productList', query: {type: '密室'}}">更多密室</nuxt-link>
        </el-tab-pane>
        <el-tab-pane class="tabs-container" label="按摩/足疗" name="third">
          <ul class="pic-list">
            <li v-for="item in thirdList" :key="item.name">
              <nuxt-link :to="{ path: '/productDetail', query: { id: item._id }}"><img :src="item.imgUrl[0]" :alt="item.name"></nuxt-link>
              <el-tooltip 
                effect="dark"
                :content="item.name"
                placement="top">
                <span class="pic-shopname">{{ item.name }}</span>
              </el-tooltip>
              <el-rate
                v-model="item.averRate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score>
              </el-rate>
              <span>{{ item.commentCount }}人评分</span>
            </li>
          </ul>
          <nuxt-link class="more-info" :to="{ path: '/productList', query: {type: '按摩/足疗'}}">更多按摩/足疗</nuxt-link></el-tab-pane>
      </el-tabs>
    </div>
    <div class="section-card">
      <div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">
        <span>最新团购</span>
        <nuxt-link to="/productList" class="more-info" style="margin: 0 16px 0 0;">更多休闲娱乐团购</nuxt-link>
      </div>
      <ul class="newest-list">
        <li v-for="item in newProductList" :key="item._id">
          <el-card class="list-el-card" shadow="always">
            <img :src="item.imgUrl[0]" :alt="item.name">
            <div class="card-description">
              <p>{{ item.name }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ item.saleList[0].name }}</p>
              <p>原价 ￥{{ item.saleList[0].salePrice }}</p>
              <p class="new-price">团购价<span>￥{{ item.saleList[0].offPrice }}</span></p>
            </div>
            <el-button class="navigate-btn" type="primary" size="mini" round @click="toProductPage(item._id)">去看看</el-button>
          </el-card>
        </li>
      </ul>
    </div>
    <div class="section-card" style="margin-bottom: 20px;">
      <div class="card-title">
        <span>最新点评</span>
      </div>
      <ul class="newest-comment-list">
        <li v-for="item in newCommentList" :key="item._id">
          <div class="comment-header">
            <nuxt-link :to="{ path: '/productDetail', query: { id: item.productId._id }}">
              <img :src="item.productId.imgUrl[0]" alt="用户头像">
            </nuxt-link>
            <div>
              <el-tooltip 
                effect="dark"
                :content="item.productId.name"
                placement="top">
                <nuxt-link :to="{ path: '/productDetail', query: { id: item.productId._id }}">
                  <p class="comment-shopname">{{item.productId.name}}</p>
                </nuxt-link>
              </el-tooltip>
              <el-tag size="medium" style="position: absolute;bottom:0;">{{ item.productId.type }}</el-tag>
            </div>
          </div>
          <el-card class="comment-content" shadow="always">
            <span class="comment-user">{{ item.userId.username }}</span>
            <span class="comment-time">{{ $moment(item.createdAt).fromNow() }}点评：</span>
            <p>{{item.content}}</p>
            <el-rate
              v-model="item.rate"
              disabled
              allow-half></el-rate>
          </el-card>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers  } from 'vuex';
import {
  getHotArea,
  getNewProduct,
  getNewComments
} from 'api/index';

const { mapState, mapActions } = createNamespacedHelpers('geo');

export default {
  name: 'index',
  data() {
    return {
      currentTab: 'first',
      firstTab: [
        {
          name: 'X先生桌游',
          rate: 3.7,
          count: 52
        },
        {
          name: '爆疯桌游',
          rate: 4.3,
          count: 19
        },
        {
          name: '益乐桌游剧情推理社',
          rate: 3.9,
          count: 112
        },
        {
          name: '超级密室',
          rate: 4.5,
          count: 39
        },
        {
          name: '怡聚桌游',
          rate: 4.7,
          count: 325
        },
      ],
      newBuyList: [
        {
          title: '桃花记影院式足道SPA!仅售99元，价值179元【女神节女士专享足疗】，节假日通用！',
          oldPrice: '179',
          newPrice: '99'
        },
        {
          title: '桃花记影院式足道SPA!仅售99元，价值179元【女神节女士专享足疗】，节假日通用！',
          oldPrice: '179',
          newPrice: '99'
        },
        {
          title: '桃花记影院式足道SPA!仅售99元，价值179元【女神节女士专享足疗】，节假日通用！',
          oldPrice: '179',
          newPrice: '99'
        },
        {
          title: '桃花记影院式足道SPA!仅售99元，价值179元【女神节女士专享足疗】，节假日通用！',
          oldPrice: '179',
          newPrice: '99'
        },
      ],
      newCommentList: [
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
      ]
    };
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const { data: { data: newProductList } } = await getNewProduct();
    const { data: { data: newCommentList } } = await getNewComments();
    const firstList = store.state.product.hotProduct.firstTab;
    const secondList = store.state.product.hotProduct.secondTab;
    const thirdList = store.state.product.hotProduct.thirdTab;
    return {
      newProductList,
      newCommentList,
      firstList,
      secondList,
      thirdList
    };
  },
  async mounted() {
    const { data: { data: { areaList } } } = await getHotArea(this.cityAdcode, true);
    console.log(areaList)
    this.setHotArea(areaList);
    document.querySelectorAll('.card-container-main').forEach((item) => {
      item.addEventListener('click', (event) => {
        this.$router.push({
          path: 'productList',
          query: {
            type: event.target.innerText
          }
        });
      });
    });
  },
  computed: {
    ...mapState({
      areaList: state => state.hotArea,
      cityAdcode: state => state.choosedCity ? state.choosedCity.adcode : state.position.adcode
    })
  },
  methods: {
    ...mapActions([
      'setHotArea'
    ]),
    toProductPage(id) {
      this.$router.push({
        path: 'productDetail',
        query: {
          id
        }
      });
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/variable.scss";

.index-container {
  width: 1200px;
  min-height: 100vh;
  margin: 0 auto;

  .section-card {
    margin-top: 10px;
    border: 1px solid $border;
    background-color: #fff;

    .card-title {
      padding: 16px;
      border-bottom: 1px solid $border;
    }

    .card-list {
      display: flex;

      .card-container {
        width: 20%;
        padding: 20px;
        border-right: 1px dashed $border;

        &:last-child {
          border-right: 0;
        }

        .card-container-title {
          display: flex;
          align-items: center;

          i {
            margin-right: 6px;
            font-size: 24px;
            color: $mainColor;
          }

          span {
            font-weight: 700;
          }
        }
      }

      .card-container-main {
        display: flex;
        flex-wrap: wrap;
        margin-top: 16px;
        padding: 0;

        li {
          padding-right: 16px;
          padding-bottom: 10px;
          color: $greyFont;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }

    .card-footer {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0;
      padding: 16px 20px;
      border-top: 1px dashed $border;
      font-size: 14px;

      dt {
        font-weight: 700
      }

      dd {
        margin-left: 10px;
        margin-right: 20px;
        color: $greyFont;
      }
    }

    .card-tabs {
     .tabs-container {
       padding: 20px;

       .pic-list {
        display: flex;
        margin: 0;
        padding: 0;
         
        .pic-shopname {
          display: block;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        li {
          width: 20%;
          padding: 0 16px;
          font-size: 14px;

          img {
            width: 100%;
            height: 150px;
            margin-bottom: 10px;
            border-radius: 4px;
          }

          span {

            &:last-child {
              color: $lightFont;
            }
          }
         }
       }
     }
    }

    .newest-list {
      display: flex;
      flex-wrap: wrap;
      
      li {
        width: calc(50% - 40px);
        padding: 20px;
      }

      .list-el-card {
        padding: 6px;

        .el-card__body {
          flex-direction: row;
          padding: 12px;
        }

        img {
          width: 30%;
          height: 100px;
          margin-right: 14px;
        }

        .card-description {
          justify-content: space-between;
        }

        div {
          position: relative;
          display: flex;
          flex-direction: column;
          font-size: 14px;
        
          p {
            &:nth-child(2) {
              text-decoration: line-through;
              color: $lightFont;
            }
          }

          .new-price {
            color: $price;

            span {
              font-size: 18px;
              font-weight: 700;
            }
          }

        }

        .navigate-btn {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
    }

    .newest-comment-list {
      display: flex;
      padding: 20px;
      font-size: 14px;

      li {
        width: 20%;
        padding: 20px;
      }

      .comment-header {
        position: relative;
        display: flex;

        .comment-shopname {
          width: 110px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
        }

        img {
          width: 65px;
          height: 60px;
          margin-right: 14px;
          border-radius: 4px;
        }
        
        p {
          font-weight: 700;
        }

      }

      .comment-content {
        margin-top: 10px;
        font-size: 12px;

        .el-card__body {
          position: relative;
          padding: 14px;
        }

        .comment-user {
          color: #66c;
        }

        .comment-time {
          position: absolute;
          right: 14px;
          color: $lightFont;
        }

        p {
          margin: 14px 0;
        }
      }
    }

    .more-info {
      float: right;
      margin: 16px;
      font-size: 12px;
      color: $lightFont;
      text-decoration: none;
    }
  }
}
</style>
