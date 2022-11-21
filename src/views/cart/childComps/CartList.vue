<template>
  <div class="cart-list">
    <Scroll class="content" pullUpLoad = "true">
      <cart-list-item 
      v-for="(item, index) in cartList"
      :key="index"
      :item-info="item">

      </cart-list-item>
    </Scroll>
  </div>
</template>


<script>
  import Scroll from '../../../components/common/scroll/Scroll';
  import { mapGetters } from 'vuex';
  import CartListItem from './CartListItem';
  

 export default {
  name: 'CartList',
  props: {
    itemInfo: {
      typeof: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Scroll,
    CartListItem
  },
   computed: {
    ...mapGetters(['cartList'])}
 }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
     
     height: 100%;
     overflow: hidden;
  }
  

</style>
