<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="/my">我的</nuxt-link>
        <dl>
          <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
          <dd><nuxt-link to="/order">我的收藏</nuxt-link></dd>
          <dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
          <dd><nuxt-link to="/order">账号设置</nuxt-link></dd>
        </dl>
      </li>
      <li class="list bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
        <dl>
          <dd><nuxt-link to="/userCenter">登录商家中心</nuxt-link></dd>
          <dd><nuxt-link to="/coop">我想合作</nuxt-link></dd>
          <dd><nuxt-link to="/kaipiao">商家申请开票</nuxt-link></dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/site">网站导航</nuxt-link>
        <div class="subContainer">
          <dl class="hotel">
            <dd>桌游</dd>
            <dd>密室</dd>
            <dd>网咖</dd>
            <dd>KTV</dd>
            <dd>棋牌室</dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>

