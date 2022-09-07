<template>
  <div id="home">
    <NavBar class="home-bav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl class="tab-control" 
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  v-show="isTabFixed"></TabControl>
    <Scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="cententScroll" 
            :pull-up-load="true"
            @pullingUp="moreLoad">
      <HomeSwiperVue :banners="banners"
                     @swiperImageLoad="swiperImageLoad"></HomeSwiperVue>
      <RecommendViewVue :recommends="recommends"></RecommendViewVue>
      <FeatureView></FeatureView>
      <TabControl class="tab-control" 
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl2"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiperVue from './childComps/HomeSwiper';
  import RecommendViewVue from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView'

  import TabControl from '@/components/content/tabControl/TabControl';
  
  // 商品list
  import GoodsList from '@/components/content/goods/GoodsList';
  import Scroll from '@/components/common/scroll/Scroll';
  import BackTop from '@/components/content/backTop/BackTop';
  // 导出方法
  import { getHomeMultidata, getHomeGoods} from '@/network/home';

  export default {
    name: "Home",
    components: {
    NavBar,
    HomeSwiperVue,
    RecommendViewVue,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
    
},
    data() {
      return {
        banners:[],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currrentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    // 注册了组件之后会立刻执行created，我们在created请求数据进行展示
    // 一般在created里只写主要逻辑，可以将具体操作再次封装
    created() {
       // 1.请求多个数据
      //  这里如果函数名同名的话，需要加上this，不然就会调用import的方法
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      
    },
    destroyed() {
      // console.log('111');
    },
    methods: {
      // 时间监听相关方法
      //1.goodslist传递的自定义点击事情，子传父，让goodslist做对应的展示
      tabClick(index) {
        switch (index) {
          case 0:
            this.currrentType = 'pop'
            break
          case 1:
            this.currrentType = 'new'
            break
          case 2:
            this.currrentType = 'sell'
            break
        }
        // setTimeout(() => {
          
        // },100)
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list

        })
      },
      getHomeGoods(type) {
        // 这里page是传递页码参数给的页码值，并没有真正对页码进行+1操作
        const page = this.goods[type].page + 1
        // 这里是import导出的方法
        getHomeGoods(type, page).then(res => {
          // console.log(res); 
          this.goods[type].list.push(...res.data.list)
          // 这里page是对页码进行+1操作
          this.goods[type].page += 1

          // 需要调用finishPullUp函数后,才能再次使用上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      // 监听滚动事件 
      backClick() {
        // this.$refs.scroll这里是因为ref放置在组件上，所以获取的是组件，如果是标签，那获取的就是标签
        // 滚动时间500ms
        this.$refs.scroll.scrollTo(0, 0)
      },
      cententScroll(position) {
        // console.log(position);
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000 

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      moreLoad() {
        console.log('上拉加载更多！！！');
        this.getHomeGoods(this.currrentType)

        // 重新计算高度
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        // 1、获取tabcontrol的offsetTop
        // 所有的组件都会有一个属性$el，用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currrentType].list
      }
    },
    activated() {
      this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  /* 固定购物街样式 */
  .home-bav {
    background-color: var(--color-tint);
    color: #fff;
    
    /* 这个一般是用于原生浏览器的原生滚动才会使用 */
    position: fixed;
    
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /* 吸顶滚动设置 */
  .tab-control {
    position: sticky;
    top: 44px;

    z-index: 9;
  }
 

  .content {
    /* height: 300px; */
    /* height: calc(100% - 49px); */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
