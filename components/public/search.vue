<template>
  <div class="index-search">
    <img class="index-logo" src="" >
    <div class="search-main">
      <div class="search-form">
        <el-input class="search-input" prefix-icon="el-icon-search" placeholder="搜索商户名、地址等"></el-input>
        <el-button class="search-btn" type="primary">搜索</el-button>
      </div>
      <dl class="hot-search">
        <dt>大家都在搜：</dt>
        <dd>嘉里中心</dd>
        <dd>万象城</dd>
        <dd>外婆家</dd>
        <dd>一点点</dd>
        <dd>星巴克</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  
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
    width: 165px;
    height: 60px;
    margin-right: 300px;
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
