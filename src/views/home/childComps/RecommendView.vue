<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      typeof: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommend {
    display: flex;
    /* 这里设置100%是让div的宽度为100%*/
    width: 100%;
    text-align: center;
    font-size: 12px;
    
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;


  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 70px;
    height: 70  px;
    margin-bottom:  8px;
  }
</style>