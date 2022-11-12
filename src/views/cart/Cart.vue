<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" class="center">购物车({{length}})</div>
    </nav-bar>

    <CartList></CartList>
    <cart-list/>
  </div>
</template>



<script>
  import NavBar from '@/components/common/navbar/NavBar';
  import { mapGetters } from 'vuex';
  import CartList from './childComps/CartList';
  

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList
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
  .cart {
    height: 100vh;
  }
  
  .nav-bar {
    background-color:  var(--color-tint);
    color: #fff;
  }
  
  
</style>
