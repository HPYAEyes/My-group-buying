<template>
  <div class="product-list-container">
    <div class="filter">
      <div class="filter-box">
        <span class="filter-title">分类：</span>
        <filterbox :data="filterType.typeList" :default="filterType.choosedType" @change="handleTypeChange"/>
      </div>
      <div class="filter-box">
        <span class="filter-title">地点：</span>
        <filterbox :data="filterPlace.placeList" :default="filterPlace.choosedPlace" @change="handlePlaceChange"/>
      </div>
      <div class="filter-box">
        <span class="filter-title">街道：</span>
        <filterbox :data="filterStreet.streetList" :default="filterStreet.choosedStreet" @change="handleStreetChange"/>
      </div>
    </div>
  </div>
</template>
<script>
import Filterbox from '@/components/public/filterbox.vue';

export default {
  name: 'productList',
  data() {
    return {
      filterType: {
        choosedType: '全部',
        typeList: ['按摩/足疗', '桌游', 'KTV', '网吧', '茶馆', '运动健身'],
      },
      filterPlace: {
        choosedPlace: '全部',
        placeList: ['西湖区', '拱墅区', '上城区', '下城区', '江干区']
      },
      filterStreet: {
        choosedStreet: '全部',
        streetList: ['灵隐街道', '文新街道', '三墩镇', '西湖街道']
      }
    };
  },
  components: {
    Filterbox
  },
  mounted() {

  },
  methods: {
    handleTypeChange(val) {
      console.log(val);
    },
    handlePlaceChange(val) {
      console.log(val);
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
}
</style>
