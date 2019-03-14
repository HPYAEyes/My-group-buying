<template>
  <div class="filter-components">
    <span class="filter-item filter-all" :class="{ 'is-active': activeList[0] }" @click="handleClick(0, '全部')">全部</span>
    <ul class="filter-list">
      <template v-for="(item, index) in typeList">
        <li
          class="filter-item"
          :class="{ 'is-active': activeList[index + 1] }"
          :key="index"
          @click="handleClick(index + 1, item)">{{ item }}</li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'filterbox',
  props: ['data', 'default'],
  data() {
    return {
      typeList: this.data,
      lastIndex: 0,
      activeList: ''
    };
  },
  mounted() {
    this.lastIndex = this.typeList.findIndex((item) => item === this.default) === -1 ? 0 :this.typeList.findIndex((item) => item === this.default) ;
    this.activeList = new Array(this.typeList.length + 1).fill(false);
    this.activeList[this.lastIndex] = true;
  },
  methods: {
    handleClick(index, val) {
      this.$set(this.activeList, this.lastIndex, false);
      this.$set(this.activeList, index, true);
      this.lastIndex = index;
      this.$emit('change', val);
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/css/variable.scss';

.filter-components {
  width: 100%;
  display: flex;

  .filter-all {
    min-width: 32px;
    height: 16px;
  }

  .filter-list {
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
  }

  .is-active {
    border-radius: 10px;
    color: #fff;
    background-color: $mainColor;
  }

  .filter-item {
    padding: 4px 6px;
    text-align: center;
    cursor: pointer;
  }

  li {
    margin: 0 10px;
  }

}
</style>

