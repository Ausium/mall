<template>
 <div class="category-siderbar">
  <ul class="sider-bar">
    <li v-for="(item, index) in SiderbarList" :key="index"
        class="sider-item-bar"
        :class="{active: index === isActive}"
        @click="sidebarClick(index,item.maitKey)">
      {{item.title}}
    </li>
  </ul>
 </div>
</template>

<script>
 export default {
  name: 'CategorySiderbar',
  components: {

   },
   props: {
    SiderbarList: {
      typeof: Array,
      default() {
        return []
      }
    }
   },
   data() {
    return {
      isActive: 0
    }
   },
   methods: {
    sidebarClick(index,maitKey) {
      this.isActive = index
      this.$emit('sidebarClick',maitKey)
    }
   }
 }
</script>

<style scoped>

  .active {
    background-color: #fff;
    border-left: 4px solid var(--color-tint);
    color: var(--color-tint);
  }

  .category-siderbar {
    width: 100px;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    font-weight: 550;
  }

  .sider-bar {
    text-align: center;
    background-color: #eee;
  }

  .sider-item-bar {
   
  }
 
</style>
