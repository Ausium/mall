<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" class="center">购物车({{length}})</div>
    </nav-bar>

    <!-- <CartList></CartList> -->
    <cart-list/>
  </div>
</template>



<script>
  import NavBarVue from '@/components/common/navbar/NavBar.vue';
  import { mapGetters } from 'vuex';
  import CartListVue from './childComps/CartList.vue';
  

  export default {
    name: "Cart",
    components: {
      NavBarVue,
      CartListVue
    },
    computed: {
      // cartLength() {
      //   return this.$store.state.cartList.length
      // }
      
      // ...mapGetters(['cartLength', 'cartList'])

      // 更换属性名
      ...mapGetters({
        'length': 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color:  var(--color-tint);
    color: #fff;
  }
  
</style>
