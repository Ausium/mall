<template>
 <div class="center-info">
  <div>
    <img src="~assets/img/profile/message.svg" alt="">
    <span>我的消息</span>
  </div>
  <div>
    <img src="~assets/img/profile/pointer.svg" alt="">
    <span>积分商城</span>
  </div>
  <div>
    <img src="~assets/img/profile/vip.svg" alt="">
    <span>会员卡</span>
  </div>
  <div>
    <img src="~assets/img/profile/cart.svg" alt="">
    <span>我的购物车</span>
  </div>
  <div>
    <img src="~assets/img/profile/shopping.svg" alt="">
    <span>下载购物APP</span>
  </div>
 </div>
</template>

<script>
 export default {
  name: 'ProfileInfo',
  components: {

   }
 }
</script>

<style scoped>

 .center-info img {
  margin: 15px 15px 0px;
  width: 25px;
  height: 25px;
 }

 .center-info span {
  position: relative;
  bottom: 6.5px;
 }

 .center-info div:nth-child(3) {
  border-bottom: 14px solid #eee;
 }

 .center-info div {
  border-bottom: 1px solid #eee;
 }

</style>
