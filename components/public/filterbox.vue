<template>
  <div class="filter-components">
    <span class="filter-item filter-all" :class="{ 'is-active': activeList[0] }" @click="handleClick(0, '全部')">全部</span>
    <ul class="filter-list">
      <template v-for="(item, index) in data">
        <li
          class="filter-item"
          :class="{ 'is-active': activeList[index + 1] }"
          :key="index"
          @click="handleClick(index + 1, item)">{{ item[label] }}</li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'filterbox',
  props: ['data', 'default', 'label', 'value'],
  data() {
    return {
      lastIndex: 0,
      activeList: ''
    };
  },
  mounted() {
    this.lastIndex = this.data.findIndex((item) => item[this.value] === this.default) === -1 ? 0 : this.data.findIndex((item) => item[this.value] === this.default) + 1;
    this.activeList = new Array(this.data.length + 1).fill(false);
    this.$set(this.activeList, this.lastIndex, true);
  },
  methods: {
    handleClick(index, val) {
      this.$set(this.activeList, this.lastIndex, false);
      this.$set(this.activeList, index, true);
      this.lastIndex = index;
      this.$emit('update:default', val === '全部' ? '全部' : val[this.value]);
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

