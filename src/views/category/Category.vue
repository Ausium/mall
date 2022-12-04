<template>
  <div class="wrapper">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <category-siderbar :SiderbarList="SiderbarList" 
                       @sidebarClick="sidebarClick">
    </category-siderbar>
    <scroll class="content" ref="scroll"
            :pull-up-load="true"
            :probe-type="3">
      <category-sub :subCategoryList="subCategoryList"></category-sub>
    </scroll>
    <!-- <category-sub :subCategoryList="subCategoryList"></category-sub> -->
    
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
import Scroll from '@/components/common/scroll/Scroll.vue'
import NavBar from '@/components/common/navbar/NavBar.vue'
import CategorySiderbar from './childComps/CategorySiderbar.vue'
import CategorySub from './childComps/CategorySub.vue'


import { getCategory, getSubCategory } from '@/network/category'

export default {
  name: "Category",
  components: {
    BSscroll,
    Scroll,
    NavBar,
    CategorySiderbar,
    CategorySub
  },
  data() {
    return {
      scroll: null,
      Result: null,
      maitKey: null,
      SiderbarList: [],
      subCategoryList: null
    }
  },
  created() {
    // 1.请求侧边栏数据
    this.getGetCategory()

    // 2.请求侧边栏的分类数据
    // this.getSubCategory(this.maitKey)
  },
  methods: {

    // 网络请求

    getGetCategory() {
      getCategory().then(res => {

        // 这个是进入分类时，能先请求一次正在流行的数据展示出来
        this.SiderbarList = res.data.category.list[0].maitKey
        this.sidebarClick(this.SiderbarList)

        // 这个是获取所有的sidebar的数据
        this.SiderbarList = res.data.category.list

      })
    },

    // getSubCategory(maitKey) {
    //   getSubCategory(maitKey).then(res => {
    //     console.log(res);
    //   })
    // },
    async getSubCategory(maitKey) {

      const res = await getSubCategory(maitKey)
      this.subCategoryList = res.data.list
      // console.log(this.subCategoryList);
    },

    sidebarClick(maitKey) {
      this.getSubCategory(maitKey)

    }

  }
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  position: relative;
}

.wrapper .content {
  position: absolute;
  left: 100px;
  bottom: 49px;
  height: calc(100% - 44px - 49px);
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}
</style>
