<template>
  <div class="index-search">
    <img class="index-logo" src="../../assets/img/groupbuy.png" >
    <div class="search-main">
      <div class="search-form">
        <el-input class="search-input" prefix-icon="el-icon-search" placeholder="搜索商户名、地址等" v-model="keyword"></el-input>
        <el-button class="search-btn" type="primary" @click="searchProduct">搜索</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search',
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    searchProduct() {
      this.$router.push({ path: '/productList', query: { ...this.$route.query, keyword: this.keyword }});
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable.scss";

.index-search {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  .index-logo {
    width: 250px;
    height: 100px;
    margin-left: 50px;
    margin-right: 100px;
  }

  .search-main {
    display: flex;
    flex-direction: column;

    .search-form {
      display: flex;
      margin-top: 20px;
    }

    .search-input {
      width: 400px;
      height: 40px;

      .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid #409eff;
      }
    }
    .search-btn {
      height: 40px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .hot-search {
      display: flex;
      font-size: 12px;
      margin-top: 8px;

      dt {
        display: flex;
        color: $lightestFont;
      }

      dd {
        display: flex;
        margin-left: 10px;
        color: $lightFont;
      }
    }
  }
}
</style>
