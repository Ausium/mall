<template>
  <div class="category-siderbar">
   <scroll :pull-up-load="true"
           class="content">
    <template>
      <ul class="sider-bar">
        <li v-for="(item, index) in SiderbarList" :key="index" class="sider-item-bar"
          :class="{ active: index === isActive }" @click="sidebarClick(item, index)">
          {{ item.title}}
        </li>
      </ul>
    </template>
   </scroll>
  </div>
</template>

<script>

import Scroll from '@/components/common/scroll/Scroll.vue'

export default {

  name: 'CategorySiderbar',
  components: {
    Scroll
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
    sidebarClick(item, index) {
      this.isActive = index
      this.$emit('sidebarClick', index)
    },
    imageLoad() {
      console.log('--------------');
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
.content {
  height: calc(100vh - 93px);
  overflow: hidden;
}

.category-siderbar {
  width: 100px;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  font-weight: 550;
  padding-top: 44px;
}


.sider-bar {
  text-align: center;
  background-color: #eee;

}
</style>
