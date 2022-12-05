<template>
  <div class="wrapper">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <category-siderbar :SiderbarList="SiderbarList" 
                       @sidebarClick="sidebarClick">
    </category-siderbar>
    <tab-control :titles="TabControlTitle"
                   @tabClick="tabClick"
                   ref="tabControl"
                   class="tab-control1"
                   v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :pull-up-load="true"
            :probe-type="3"
            @scroll="cententScroll">
      <category-sub :subCategoryList="subCategoryList"></category-sub>
      <tab-control :titles="TabControlTitle"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   ></tab-control>
      <goods-list :goods="subTypeData"></goods-list>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <!-- <category-sub :subCategoryList="subCategoryList"></category-sub> -->
    
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
import Scroll from '@/components/common/scroll/Scroll.vue'
import BackTop from '@/components/content/backTop/BackTop.vue';

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
    BackTop,
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
      SiderbarListIndex: 0,
      TabControlTitle: ['流行','新款','精选'],
      //储存一下tabcontrol类型，拿到不同tabControl索引请求不同数据
      typeStyle:['pop','new','sell'],
      subGoodsType: 0,
      subGoodsIndex: 0,
      subTypeData: null,
      subCategoryList: null,
      //拿到当前所处分类，以便后面根据分类拿到type数据
      currentTypeIndex: 0,
      // subGoods数据
      miniWallkey: null,

      // 保存['流行','新款','精选']的当前位置
      tabOffsetTop: 0,
      isTabFixed: false,
      // 判断backTop是否显示
      isShowBackTop: false

      
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
        // 这个是获取所有的sidebar的数据
        this.SiderbarList = res.data.category.list
        // 这个是进入分类时，能先请求一次正在流行的数据展示出来
        this.sidebarClick(0)    
        console.log(this.SiderbarList);
      })
    },

    async getSubCategory(maitKey) {

      const res = await getSubCategory(maitKey)
      this.subCategoryList = res.data.list

      //这是展示第一次分类后，不用点击就可以直接展示流行的goodsItem
      this.tabClick(0)
    },

    async getSubCategoryDetail() {
      const res = await getSubCategoryDetail(this.miniWallkey, this.subGoodsIndex)
      this.subTypeData = res
      // console.log(this.subTypeData);
    },

    sidebarClick(index) {
      // this.getGetCategory()
      
      this.maitKey = this.SiderbarList[index].maitKey
      this.SiderbarListIndex = index
      this.getSubCategory(this.maitKey)
      this.$refs.scroll.scrollTo(0,0)
      
      

    },
    tabClick(index) {
      
      this.currentTypeIndex = index
      
      
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControl1.currentIndex = index

      this.miniWallkey = this.SiderbarList[this.SiderbarListIndex].miniWallkey
      this.subGoodsIndex = this.typeStyle[this.currentTypeIndex]
      

      this.getSubCategoryDetail() 
    },


    // 监听滚动事件 
    backClick() {
        // this.$refs.scroll这里是因为ref放置在组件上，所以获取的是组件，如果是标签，那获取的就是标签
        // 滚动时间500ms
        this.$refs.scroll.scrollTo(0, 0)
    },
    cententScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000 


        // 2.决定tabControl是否吸顶(position: fixed)
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        // console.log(this.isTabFixed);
        

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

.tab-control1 {
  position: relative;
  margin-top: -6px;
  width: calc(100% - 100px);
  left: 100px;
  right: 0;
  z-index: 9;
  
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
