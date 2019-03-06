<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        class="left"
        :span="3">
        <img src="../../../assets/img/logo.png" alt="团购">
      </el-col>
      <el-col
        class="center"
        :span="15">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点" />
          <button class="el-button el-button-primary">
            <i class="el-icon-search"></i>
          </button>
          <dl class="hotPlace" style="display:none;">
            <dt>热门搜索</dt>
            <dd>运河足浴</dd>
            <dd>运河足浴</dd>
            <dd>运河足浴</dd>
            <dd>运河足浴</dd>
          </dl>
          <dl class="searchList" style="display:none;">
            <dd>纳德自由酒店</dd>
            <dd>纳德会所</dd>
            <dd>纳德会所</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#">舟东电竞馆</a>
          <a href="#">舟东电竞馆</a>
          <a href="#">舟东电竞馆</a>
          <a href="#">舟东电竞馆</a>
          <a href="#">舟东电竞馆</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout">CC网咖</nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business">CC网咖</nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="takeout">CC网咖</nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business">CC网咖</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
        class="right"
        :span="6">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意免单</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  
}
</script>