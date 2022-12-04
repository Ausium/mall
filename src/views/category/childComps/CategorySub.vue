<template>
 <div class="CategorySub">
  <div v-for="item in subCategoryList" class="sub">
    <div class="sub-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
 </div>
</template>

<script>
 export default {
  name: 'CategorySub',
  components: {

   },
   props: {
    subCategoryList: {
      typeof: Array,
      default() {
        return []
      }
    }
   }
 }
</script>

<style scoped>
  .CategorySub {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 44px - 49px);

  }

  .sub {
    flex: 1;
    padding: 10px 15px;
    justify-content: space-around;
  }
  
  .sub .sub-item {
    /*  */
    /* font-size: 12px; */
    text-align: center;
  }

  .sub .sub-item span{
    font-size: 14px;
    display: block;
    margin-top: 5px;
  }

  .sub-item img{
    width: 50px;
    height: 50px;
  }
</style>
