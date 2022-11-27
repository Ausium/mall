<template>
 <div class="center-info">
  <div class="center-logo">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
  <div class="login">
    <div>
      <span>登录/</span>
      <span>注册</span>
    </div>
  </div>
 </div>
</template>

<script>
 export default {
  name: 'ProfileCenter',
  components: {

   }
 }
</script>

<style scoped>

  .center-info {
    display: flex;
    background-color:  var(--color-tint);
  }
  .center-logo {
    background-color: pink;
    width: 50px;
    height: 50px;
    margin: 10px;
  }
 
</style>
