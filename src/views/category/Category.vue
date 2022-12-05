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
      <tab-control :titles="TabControlTitle"
                   @tabClick="tabClick"
                   ref="tabControl"></tab-control>
      <goods-list :goods="subTypeData"></goods-list>
    </scroll>
    <!-- <category-sub :subCategoryList="subCategoryList"></category-sub> -->
    
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
import Scroll from '@/components/common/scroll/Scroll.vue'
import NavBar from '@/components/common/navbar/NavBar.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import CategorySiderbar from './childComps/CategorySiderbar.vue'
import CategorySub from './childComps/CategorySub.vue'


import { getCategory, getSubCategory, getSubCategoryDetail } from '@/network/category'

export default {
  name: "Category",
  components: {
    BSscroll,
    Scroll,
    NavBar,
    TabControl,
    GoodsList,
    CategorySiderbar,
    CategorySub
  },
  data() {
    return {
      scroll: null,
      Result: null,
      maitKey: null,
      SiderbarList: [],
      TabControlTitle: ['流行','新款','精选'],
      //储存一下tabcontrol类型，拿到不同tabControl索引请求不同数据
      typeStyle:['pop','new','sell'],
      subGoodsType: 0,
      subTypeData: null,
      subCategoryList: null,
      //拿到当前所处分类，以便后面根据分类拿到type数据
      currentTypeIndex: 0,
      // subGoods数据
      miniWallkey: null

      
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

    async getSubCategory(maitKey) {

      const res = await getSubCategory(maitKey)
      this.subCategoryList = res.data.list

      //这是展示第一次分类后，不用点击就可以直接展示流行的goodsItem
      this.tabClick(this.currentTypeIndex)
    },

    async getSubCategoryDetail() {
      const res = await getSubCategoryDetail(this.miniWallkey, this.subGoodsType)
      this.subTypeData = res
      // console.log(this.subTypeData);
    },

    sidebarClick(maitKey) {
      this.getSubCategory(maitKey)
      

    },
    tabClick(index) {
      
      this.currentTypeIndex = index
      
      this.miniWallkey = this.SiderbarList[this.currentTypeIndex].miniWallkey
      this.subGoodsType = this.typeStyle[this.currentTypeIndex]
    
      this.getSubCategoryDetail() 
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
