<template>
  <div class="wrapper">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
  </div>
</template>

<script>
  import BSscroll from 'better-scroll'
  import NavBar from '@/components/common/navbar/NavBar.vue'

  import {getCategory} from '@/network/category'

  export default {
    name: "Category",
    components: {
      BSscroll,
      NavBar
    },
    data() {
      return {
        scroll: null,
        categoryResult: null,
        subCategoryList: []
      }
    },
    created() {
      // 1.请求数据
      getCategory().then(res => {
        
        console.log(res.data.category.list);
        this.subCategoryList = res.data.category.list
    
      })
    }
    // created创建完组件后,已经渲染了,但是还没有进行挂载,所以获取不到dom
    // mounted() {
    //   // console.log(document.querySelector('.wrapper'));
    //   this.scroll = new BSscroll('.wrapper', {

    //   })
    // }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
