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
        <span class="is-select product-sort">默认</span>
        <span class="product-sort">价格排序</span>
        <span class="product-sort">人气最高</span>
        <span class="product-sort">评价最高</span>
      </div>
      <ul class="product-list">
        <li
          class="product-item"
          v-for="item in productList"
          :key="item._id">
          <a href="#"><img class="item-img" :src="item.imgUrl" :alt="item.name"></a>
          <div class="item-content">
            <a class="item-header" href="#">{{ item.name }}</a>
            <div class="item-comment">
              <el-rate
                v-model="item.averRate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score></el-rate>
              <span style="color:#409eff">{{ item.comments.length }}人评论</span>
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
      </ul>
    </div>
    <div class="product-amap">
      <no-ssr>
        <el-amap
          ref="amap"
          vid="myamap"
          :center="gdMap.center"
          :zoom="gdMap.zoom"
          :map-manager="gdMap.amapManager"
          :events="gdMap.events">
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
} from 'api/productList';

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
      marker: {
        position: ['121.59996', '31.197646'],
        template: '<span>1</span>'
      },
      filterPlace: {
        choosedPlace: '全部',
        placeList: [],
        label: 'name',
        value: 'adcode'
      },
      filterStreet: {
        choosedStreet: '全部',
        streetList: [],
        label: 'name',
        value: 'name'
      },
      productList: [],
      pageInfo: {
        pageSize: 12,
        pageNum: 1,
        totalRecords: 0
      },
      rate: 4.5
    };
  },
  components: {
    Filterbox
  },
  async asyncData({ store }) {
    const { data: { data: typeList } } = await queryTypeList();
    return {
      filterType: {
        choosedType: '全部',
        typeList,
        label: 'name',
        value: 'name'
      },
    }
  },
  async mounted() {
    const { data: { data: { areaList: placeList } } } = await queryPlaceList(this.$store.state.geo.choosedCity.adcode);
    this.filterPlace.placeList = placeList;
    console.log(placeList);
    this.getProductList();
    const self = this;
    this.gdMap.events = {
      init(map) {
        AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) =>{
          console.log(self);
          const marker = new SimpleMarker({
            iconStyle: 'red-1',
            iconTheme: 'numv2',
            map: map,
            position: map.getCenter()
          });
          marker.on('click', () => {
            console.log(map.getCenter());
          }, self);
        });
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
      // TODO sort
      const sort = 0;
      const params = {
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        cityCode: this.$store.state.geo.choosedCity.adcode,
        adcode,
        sort,
        type,
        street
      };
      queryProductList(params).then((resp) => {
        const { data } = resp.data;
        this.productList = data.productList;
        this.pageInfo.totalRecords = data.totalRecords;
      });
    },
    handleTypeChange(val) {
      console.log(val);
    },
    /**
     * @description 选择的地点改变时的处理
     */
    handlePlaceChange(val) {
      console.log(val);
      this.filterStreet.choosedStreet = '全部';
      this.filterStreet.streetList = val === '全部' ? [] : val.districts;
    },
    handleStreetChange(val) {
      console.log(val);
    }

  }
}
</script>
<style lang="scss">
@import "../assets/css/variable.scss";

.product-list-container {
  width: 1200px;
  min-height: 100vh;
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
    width: 75%;
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

      .product-sort {
        margin-right: 30px;
        cursor: pointer;
      }

      .is-select {
        color: $mainColor;
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
    }
  }

  .product-amap {
    flex-grow: 1;
    height: 250px;
    border: 1px solid $border;
    border-radius: 4px;
  }
}
</style>
