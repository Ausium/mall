<template>
 <div class="check-button">
  <img src="../../../assets/img/cart/tick.svg" alt="" 
       :class="{check: isChecked}"
       >
 </div>
</template>

<script>
 export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      typeof: Boolean,
      default: false
    }
  },
  components: {

   },
  methods: {
    
   }
 }
</script>

<style scoped>

 .check-button {
  
  border-radius: 50%;
  border: 2px solid #aaa;
 }

 .check {
  background-color: pink;
  border-color: pink;
 }
</style>
