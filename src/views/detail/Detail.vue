<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" ref="scroll"
           :pull-up-load="true" 
           :probe-type="3" 
           @scroll="contentScrollHeight">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <toast :message = "message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import { getDetail, Goods, Shop, GoodsParam ,getRecommend} from '@/network/detail';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from '@/components/common/scroll/Scroll';
import BackTop from '@/components/content/backTop/BackTop';
// toast
import Toast from '@/components/common/toast/Toast';

// 防抖
import {debound} from '../../common/utils'

import GoodsList from '@/components/content/goods/GoodsList';

import { mapActions } from 'vuex';

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Scroll,
    Toast
    

  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTops: null,
      currenIndex: 0,
      isShowBackTop: false,
      message: '',
      show: false
    }
  },
  created() {
    //直接使用this.$refs获取DOM元素
    
    this.$nextTick(() => {
      
      this.$refs.scroll.scrollTo(0,0,0)
      this.$refs.scroll.refresh()
      
      
	})
  },
  activated() {
    // 1.保存iid数据
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result
      console.log(data);
      // 1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      

      // 3.创建店铺信息的对象 
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5. 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      
     })

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    // 给getThemeTopY赋值,防抖处理，防止被调用多次
    this.getThemeTopY = debound(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44 || this.$refs.recommend.$el.offsetTop)  //解决没有评论的情况
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
        
      },200)
    },
  methods: {
    ...mapActions(['addCart']),

    imageLoad() {
      // this.$refs.scroll调用的是组件的对象，用组件对象调用他里面的方法，也就是BScroll的实例化对象
      // 再用实例化对象调用refresh才是正确的，不然会报refresh not a function
      // this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    
    },
    
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      
    },

    // 各组件在detail滚动的高度
    contentScrollHeight(position) {
      const positionY = -position.y

      let length = this.themeTopYs.length
      // 增加了一个无穷大的数Number.MAX_VALUE，length - 1是因为最后的一个无穷大的数字不需要计算了
      for(let i = 0; i < length-1; i++) {
        if(this.currenIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currenIndex = i;
          this.$refs.detailNav.currentIndex = this.currenIndex

        }
      }

      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000 
      // for(let i = 0; i < length; i++) {
      //   if(this.currenIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i]))) {
      //     this.currenIndex = i;
      //     console.log(this.currenIndex);
      //     this.$refs.detailNav.currentIndex = this.currenIndex
      //   }
      // }
    },

    // 返回顶部
    backClick() {
        // this.$refs.scroll这里是因为ref放置在组件上，所以获取的是组件，如果是标签，那获取的就是标签
        // 滚动时间500ms
        this.$refs.scroll.scrollTo(0, 0)
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid

      // 2.将商品添加到购物车上
      // this.$store.cartList.push(product)  state不能直接push，需要经过mutations
      // this.$store.commit('addCart', product)

      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
        // console.log(res);

        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // },1500)

        this.$toast.show(res, 2000)
        // console.log(this.$toast);
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    }
  }
  
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    /* 这里减去49px是因为要减去底部导航栏的高度 */
    height: calc(100% - 44px - 49px);
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>