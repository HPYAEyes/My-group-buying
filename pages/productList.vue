<template>
  <div class="product-list-container">
    <!-- filter start -->
    <div class="filter">
      <div class="filter-box">
        <span class="filter-title">分类：</span>
        <filterbox
          :data="filterType.typeList"
          :default.sync="filterType.choosedType"
          :label="filterType.label"
          :value="filterType.value"
          @change="handleTypeChange"/>
      </div>
      <div class="filter-box">
        <span class="filter-title">地点：</span>
        <filterbox
          :data="filterPlace.placeList"
          :default.sync="filterPlace.choosedPlace"
          :label="filterPlace.label"
          :value="filterPlace.value"
          @change="handlePlaceChange"/>
      </div>
      <div class="filter-box" v-if="filterPlace.choosedPlace !== '全部'">
        <span class="filter-title">街道：</span>
        <filterbox
          :data="filterStreet.streetList"
          :default.sync="filterStreet.choosedStreet"
          :label="filterStreet.label"
          :value="filterStreet.value"
          :key="filterStreet.choosedStreet"
          @change="handleStreetChange"/>
      </div>
    </div>
    <!-- filter end -->
    <div class="product">
      <div class="product-header">
        <el-radio-group v-model="listSort" size="small" @change="handleSortChange">
          <el-radio-button label="人气最高"></el-radio-button>
          <el-radio-button label="评价最多"></el-radio-button>
          <el-radio-button label="价格降序"></el-radio-button>
          <el-radio-button label="价格升序"></el-radio-button>
        </el-radio-group>
      </div>
      <ul class="product-list">
        <li
          class="product-item"
          v-for="item in productList"
          :key="item._id">
          <nuxt-link :to="'/productDetail?id=' + item._id"><img class="item-img" :src="item.imgUrl[0]" :alt="item.name"></nuxt-link>
          <div class="item-content">
            <nuxt-link class="item-header" :to="'/productDetail?id=' + item._id">{{ item.name }}</nuxt-link>
            <div class="item-comment">
              <el-rate
                v-model="item.averRate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score></el-rate>
              <span style="color:#409eff">{{ item.commentCount }}人评论</span>
            </div>
            <div class="item-place">
              <span>{{ item.type }}</span>
              <span style="color: #ccc">|</span>
              <span>{{ item.place }}</span>
              <span>{{ item.address }}</span>
            </div>
            <div class="item-price">人均￥{{ item.price }}</div>
            <div class="item-ticket">
              <i class="iconfont tg-tuan main-color"></i>
              <el-tooltip 
                effect="dark"
                :content="item.description"
                placement="top">
                <p class="text-overflow">{{ item.description }}</p>
              </el-tooltip>
            </div>
          </div>
        </li>
        <li class="product-pagination">
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageInfo.pageSize"
            :current-page.sync="pageInfo.pageNum"
            :total="pageInfo.totalRecords"
            @current-change="handlePageChange">
          </el-pagination>
        </li>
      </ul>
      <div class="product-recommand hot-recommand">
        <p>近期热门推荐</p>
        <ul>
          <li v-for="item in recommand" :key="item._id">
            <nuxt-link :to="{ path: '/productDetail', query: { id: item._id }}">
              <img :src="item.imgUrl[0]" :alt="item.name">
              <p>{{ item.name }}</p>
              <div class="comment">
                <el-rate
                  v-model="item.averRate"
                  disabled
                  allow-half></el-rate>
                <span class="count">{{ item.commentCount }}个评价</span>
              </div>
              <p class="address">{{ item.street }}</p>
              <p class="price">人均￥<span>{{ item.price }}</span></p>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="product-amap">
      <no-ssr>
        <el-amap
          ref="amap"
          vid="myamap"
          :center="gdMap.center"
          :zoom="gdMap.zoom"
          :map-manager="gdMap.amapManager">
        </el-amap>
      </no-ssr>
    </div>

  </div>
</template>
<script>
import Filterbox from '@/components/public/filterbox.vue';
import { AMapManager } from 'vue-amap';
import { createNamespacedHelpers  } from 'vuex';
import {
  queryTypeList,
  queryPlaceList,
  queryProductList
} from 'api/product';

const { mapState, mapActions } = createNamespacedHelpers('product');

export default {
  name: 'productList',
  data() {
    return {
      gdMap: {
        zoom: 11,
        center: ['121.59996', '31.197646'],
        amapManager: AMapManager,
      },
      productList: [],
      pageInfo: {
        pageSize: 12,
        pageNum: 1,
        totalRecords: 0
      },
      rate: 4.5,
      listSort: '人气最高',
      adcode: this.$route.query.adcode
    };
  },
  components: {
    Filterbox
  },
  async asyncData({ route, store }) {
    const { data: { data: typeList } } = await queryTypeList();
    const { data: { data: { areaList: placeList } } } = await queryPlaceList(store.state.geo.choosedCity.adcode);
    const firstList = store.state.product.hotProduct.firstTab.slice(0, 3);
    const secondList = store.state.product.hotProduct.secondTab.slice(0, 3);
    const thirdList = store.state.product.hotProduct.thirdTab.slice(0, 3);
    const recommand = firstList.concat(secondList, thirdList);
    let streetList;
    if (route.query.adcode) {
      const streetIndex = placeList.findIndex((item) => route.query.adcode === item.adcode);
      streetList = placeList[streetIndex].districts;
    } else {
      streetList = [];
    }
    return {
      filterType: {
        choosedType: route.query.type || '全部',
        typeList,
        label: 'name',
        value: 'name'
      },
      filterPlace: {
        choosedPlace: route.query.adcode || '全部',
        placeList,
        label: 'name',
        value: 'adcode'
      },
      filterStreet: {
        choosedStreet: '全部',
        streetList,
        label: 'name',
        value: 'name'
      },
      recommand
    }
  },
  async mounted() {
    // const { data: { data: { areaList: placeList } } } = await queryPlaceList(this.$store.state.geo.choosedCity.adcode);
    // this.filterPlace.placeList = placeList;
    // this.filterPlace.choosedPlace = this.$route.query.adcode;
    this.getProductList();
  },
  watch: {
    $route(to, from) {
      if (to.query.keyword !== from.query.keyword) {
        this.getProductList();
      }
    }
  },
  methods: {
    /**
     * @description 获取团购信息列表
     */
    getProductList() {
      const type = this.filterType.choosedType === '全部' ? undefined : this.filterType.choosedType;
      const street = this.filterStreet.choosedStreet === '全部' ? undefined : this.filterStreet.choosedStreet;
      const adcode = this.filterPlace.choosedPlace === '全部' ? undefined : this.filterPlace.choosedPlace;
      const sort = this.listSort;
      const params = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        cityCode: this.$store.state.geo.choosedCity.adcode,
        keyword: this.$route.query.keyword || '',
        adcode,
        sort,
        type,
        street
      };
      queryProductList(params).then((resp) => {
        const { data } = resp.data;
        this.productList = data.productList;
        this.pageInfo.totalRecords = data.totalRecords;
        this.gdMap.center = [this.productList[0].lng, this.productList[0].lat];
        this.$refs.amap.$$getInstance().clearMap(); // 清空地图上的覆盖物
        this.productList.forEach((item) => {
          const marker = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [item.lng, item.lat]
          });
          this.$refs.amap.$$getInstance().add(marker);
          const infoWindow = this.createMapWindow(item);
          marker.on('click', () => {
            infoWindow.open(this.$refs.amap.$$getInstance(), marker.getPosition());
          });
        });
      });
    },
    createMapWindow(productInfo) {
      const content = [
      ];
      content.push(`<div style="font-size: 12px;"><p>${productInfo.name}</p>`);
      content.push(`<p>电话: ${productInfo.tel}  人均: ${productInfo.price}</p>`);
      content.push(`<p>地址: ${productInfo.address}</p></div>`);
      const infoWindow = new AMap.InfoWindow({
        content: content.join("<br>")  //传入 dom 对象，或者 html 字符串
      });
      return infoWindow;
    },
    /**
     * @description 处理分页
     */
    handlePageChange() {
      this.getProductList();
    },
    /**
     * @description 处理排序
     */
    handleSortChange() {
      this.getProductList();
    },
    /**
     * @description 处理分类
     */
    handleTypeChange(val) {
      this.getProductList();
    },
    /**
     * @description 选择的地点改变时的处理
     */
    handlePlaceChange(val) {
      this.filterStreet.choosedStreet = '全部';
      this.filterStreet.streetList = val === '全部' ? [] : val.districts;
      this.getProductList();
    },
    /**
     * @description 处理街道改变
     */
    handleStreetChange(val) {
      this.getProductList();
    }

  }
}
</script>
<style lang="scss">
@import "../assets/css/variable.scss";

.product-list-container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  .filter {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 16px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid $border;
    border-radius: 4px;
    background-color: #fff;
    font-size: 12px;

    .filter-box {
      display: flex;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      .filter-title {
        padding: 4px;
        flex-basis: 50px;
        color: $lightFont;
      }
    }
  }

  .product {
    position: relative;
    width: 75%;
    min-height: 100vh;
    margin-right: 16px;
    margin-bottom: 16px;
    padding: 0 20px;
    border: 1px solid $border;
    border-radius: 4px;
    background-color: #fff;

    .product-header {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $border;
      font-size: 12px;

      .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        color: $mainColor;
        background-color: #fff;
        box-shadow: none;
      }

      .el-radio-button--small {
        &:first-child {
          .el-radio-button__inner {
            padding: 9px 14px 9px 0;
          }
        }
      }

      .el-radio-button {
        .el-radio-button__inner {
          border: 0;
          border-radius: 0;
        }
      }

    }

    .product-list {

      .product-item {
        display: flex;
        padding: 20px 0;
        border-bottom: 1px solid $border;

        &:last-child {
          border-bottom: 0;
        }

        .item-img {
          width: 220px;
          height: 125px;
          border-radius: 6px;
        }

        .item-content {
          width: 500px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          font-size: 12px;
          color: $lightFont;

          .item-header {
            font-size: 16px;
            color: $mainFont;
          }

          .item-comment {
            display: flex;
            align-items: center;
            margin-top: 8px;

            >span {
              margin-left: 10px;
            }
          }

          .item-place {
            margin-top: 8px;

            span {
              margin-right: 4px;
            }
          }

          .item-price {
            margin-top: 8px;
          }

          .item-ticket {
            display: flex;
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px dashed $border;

            .main-color {
              color: $mainColor;
            }

            p {
              margin-left: 6px;
            }
          }
        }
      }
      
      .product-pagination {
        display: flex;
        justify-content: center;
        margin: 16px 0;
      }
    }
  }

  .product-amap {
    flex-grow: 1;
    height: 250px;
    border: 1px solid $border;
    border-radius: 4px;
  }

  .product-recommand {
    position: absolute;
    top: 270px;
    right: -256px;
    width: calc(25% - 50px);
    border: 1px solid $border;
    border-radius: 4px;
  }
}
</style>
