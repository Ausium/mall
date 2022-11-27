<template>
  <div class="goods-item" @click="clickItem">
    <img v-lazy="showImages" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      typeof: Object,
      default() {
        return []
      }
    }
  },
  computed: {
    showImages() {
      // 逻辑或，如果前面为空的时候，就执行后面的
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      
    }
  },
  methods: {
    clickItem() {
      this.$router.push('/detail/' + this.goodsItem.iid)
      
    }
  },
  
}
</script>


<!-- 有个bug是因为没有使用style的 scoped属性做样式的区分，
     所以和其他使用到这个组件的样式重叠了 -->
<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    /* 图片大小 */
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>