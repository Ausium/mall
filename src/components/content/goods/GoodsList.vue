<template>
  <div class="goods">
    <!-- 需要先v-for遍历拿到数据，然后再传给子组件 -->
    <GoodsListItem v-for="item in goods" :goods-item="item"></GoodsListItem>
    <!-- <GoodsListItem :goods-item="goods"></GoodsListItem> -->
  </div>
</template>

<script>

import GoodsListItem from './GoodsListItem';

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },  
  props: {
    goods: {
      typeof: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
/* 父组件设置flex，默认是全部放置在一行上*/
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }


</style>