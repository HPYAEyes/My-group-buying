<template>
  <el-header class="index-header" height="50px">
    <div class="index-header-left">
      <i class="el-icon-menu"></i>
      <span>首页</span>
      <i class="el-icon-location"></i>
      <span>杭州</span>
    </div>
    <div class="index-header-right">
      <span>登录</span>
      <span>注册</span>
      <span>个人中心</span>
      <span>商户服务</span>
    </div>
  </el-header>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import "../../assets/css/variable.scss";

.index-header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $greyFont;
  .index-header-left {
    span {
      margin-right: 20px;
    }
  }
  .index-header-right {
    span {
      margin-left: 40px;
    }
  }
}
</style>
