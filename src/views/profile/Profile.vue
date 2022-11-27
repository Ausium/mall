<template>
  <div class="Profile">
    <nav-bar class="nav-bar">
      <div slot="center" class="center">个人中心</div>
    </nav-bar>
    <profile-center></profile-center>
  </div>
</template>

<script>

import NavBar from '@/components/common/navbar/NavBar.vue';
import ProfileCenter from './childComps/ProfileCenter.vue'

  export default {
    name: "Profile",
    components: {
      NavBar,
      ProfileCenter
    }
  }
</script>

<style scoped>

  .nav-bar {
    background-color:  var(--color-tint);
    color: #fff;
  }

</style>
