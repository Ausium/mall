<template>
  <div class="wrapper">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <category-siderbar 
        :SiderbarList="SiderbarList"
        @sidebarClick="OnsidebarClick">
    </category-siderbar>
  </div>
</template>

<script>
  import BSscroll from 'better-scroll'
  import NavBar from '@/components/common/navbar/NavBar.vue'
  import CategorySiderbar from './childComps/CategorySiderbar.vue'
 

  import {getCategory, getSubCategory} from '@/network/category'

  export default {
    name: "Category",
    components: {
      BSscroll,
      NavBar,
      CategorySiderbar
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
        console.log(res.data.category.list);
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
      console.log(res);
    },

      OnsidebarClick(maitKey) {
        this.getSubCategory(maitKey)
      }

    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    padding-top: 44px;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
</style>
