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
          @change="handleTypeChange"/>
      </div>
      <div class="filter-box">
        <span class="filter-title">地点：</span>
        <filterbox
          :data="filterPlace.placeList"
          :default.sync="filterPlace.choosedPlace"
          :label="filterPlace.label"
          @change="handlePlaceChange"/>
      </div>
      <div class="filter-box" v-if="filterPlace.choosedPlace !== '全部'">
        <span class="filter-title">街道：</span>
        <filterbox
          :data="filterStreet.streetList"
          :default.sync="filterStreet.choosedStreet"
          :label="filterStreet.label"
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
        <li class="product-item">
          <a href="#"><img class="item-img" src="../assets/img/img1.jpg" alt=""></a>
          <div class="item-content">
            <a class="item-header" href="#">嫌疑人X实景搜证推理侦探社(杭大店)</a>
            <div class="item-comment">
              <el-rate
                v-model="rate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score></el-rate>
              <span style="color:#409eff">1956人评论</span>
            </div>
            <div class="item-place">
              <span>密室</span>
              <span style="color: #ccc">|</span>
              <span>湖墅南路</span>
              <span>草坝巷密渡桥路15世纪大厦19D</span>
            </div>
            <div class="item-price">人均￥138</div>
            <div class="item-ticket">
              <i class="iconfont tg-tuan main-color"></i>
              <el-tooltip 
                effect="dark"
                content="149元/券，兴家旺足+轻食套餐，299元/券，3D影院·砭石养生套餐，199元/券，3D影院·养肝足疗套餐，289元/券 149元/券，兴家旺足+轻食套餐，299元/券，3D影院·砭石养生套餐，199元/券，3D影院·养肝足疗套餐，289元/券 149元/券，兴家旺足+轻食套餐，299元/券，3D影院·砭石养生套餐，199元/券，3D影院·养肝足疗套餐，289元/券"
                placement="top">
                <p class="text-overflow">149元/券，兴家旺足+轻食套餐，299元/券，3D影院·砭石养生套餐，199元/券，3D影院·养肝足疗套餐，289元/券,149元/券，兴家旺足+轻食套餐，299元/券，3D影院·砭石养生套餐，199元/券，3D影院·养肝足疗套餐，289元/券,149元/券，兴家旺足+轻食套餐，299元/券，3D影院·砭石养生套餐，199元/券，3D影院·养肝足疗套餐，289元/券,149元/券，兴家旺足+轻食套餐，299元/券，3D影院·砭石养生套餐，199元/券，3D影院·养肝足疗套餐，289元/券</p>
              </el-tooltip>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Filterbox from '@/components/public/filterbox.vue';
import { createNamespacedHelpers  } from 'vuex';
import {
  queryTypeList,
  queryPlaceList
} from 'api/productList';

const { mapState, mapActions } = createNamespacedHelpers('product');

export default {
  name: 'productList',
  data() {
    return {
      filterPlace: {
        choosedPlace: '全部',
        placeList: [],
        label: 'name',
      },
      filterStreet: {
        choosedStreet: '全部',
        streetList: [],
        label: 'name',
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
        choosedType: '私人影院',
        typeList,
        label: 'name',
      },
    }
  },
  async mounted() {
    const { data: { data: { areaList: placeList } } } = await queryPlaceList(this.$store.state.geo.choosedCity.adcode);
    this.filterPlace.placeList = placeList;
    console.log(placeList);
  },
  methods: {
    handleTypeChange(val) {
      console.log(val);
    },
    handlePlaceChange(val) {
      console.log(val);
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

  .filter {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 16px;
    padding: 16px;
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
    width: 80%;
    margin-right: 16px;
    padding: 0 20px 16px;
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
      padding: 20px 0;

      .product-item {
        display: flex;

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
}
</style>
