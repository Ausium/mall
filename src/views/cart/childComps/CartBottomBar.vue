<template>
 <div class="bottom-bar">
  <div class="check-content">
    <check-button class="check-botton"></check-button>
    <span>全选</span>
  </div>
  <div class="price">
    合计: {{totalPrice}}
  </div>

  <div class="calculate">
    共计： {{checkLength}}
  </div>
 </div>
</template>

<script>

  import CheckButton from '@/components/content/checkButton/CheckButton';
  
 export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
   },
   computed: {
    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        
        return item.checked
      }).reduce((preValue, item) => {
        console.log(preValue,item);
        return preValue + item.count * parseInt(item.price.substring(1))
      }, 0)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    }
   }
 }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: coral;
    
    
  }
 .check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;

 }
 .check-botton{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
 }

 .price {
  margin-left: 25px;
  flex: 1;
 }

 .calculate {
  width: 100px;
  text-align: center;
  background-color: pink;
 }
</style>
