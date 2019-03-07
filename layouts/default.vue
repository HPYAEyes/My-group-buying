<template>
  <el-container class="main-layout">
    <el-header height="50px">
      <my-header />
    </el-header>
    <div class="search-bar">
      <search />
    </div>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="80px">
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header.vue';
import MyFooter from '@/components/public/footer.vue';
import Search from '@/components/public/search.vue';
export default {
  components: {
    MyHeader,
    MyFooter,
    Search
  }
}
</script>

<style>

</style>
