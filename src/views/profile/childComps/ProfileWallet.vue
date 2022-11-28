<template>
 <div class="wallet-info">
  <div class="balance flex">
    <div class="flex-center">
      <span>0.00</span>
      <span>元</span>
    </div>
    <div>我的余额</div>
  </div>
  <div class="discount flex">
    <div class="flex-center">
      <span>0</span>
      <span>个</span>
    </div>
    <div>我的优惠</div>
  </div>
  <div class="integral flex">
    <div class="flex-center">
      <span>0</span>
      <span>分</span>
    </div>
    <div>我的积分</div>
  </div>
 </div>
</template>

<script>
 export default {
  name: 'ProfileWallet',
  components: {

   }
 }
</script>

<style scoped>

 .wallet-info {
  display: flex;
  position: relative;
  font-size: 13px;
  border-bottom: 15px solid #eee;
 }
 .flex {
  flex: 1;
  position: relative;
  top: 15px;
  left: 15px;
  bottom: 15px;
  text-align: center;
  margin-bottom: 30px;
 }

  .flex div span:first-child {
    font-size: 20px;
    color: orange;
    font-weight: bold;

  }


</style>
