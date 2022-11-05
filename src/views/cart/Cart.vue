<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center" class="center">购物车({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBarVue from '@/components/common/navbar/NavBar.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: "Cart",
    components: {
      NavBarVue
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
