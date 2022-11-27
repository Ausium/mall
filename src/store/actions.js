export default {
  addCart(context, payload) {
   return new Promise((resolve, reject) => {
     
    // 1.方法一：
    // let oldProduct = null
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // 1.方法二：
    // 1.查找之前数组中是不是有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.判断oldProduct
    if(oldProduct) {
      // oldProduct.count += 1
      context.commit('addCount',oldProduct)
      resolve('当前商品数量+1')
    } else {
      payload.count = 1
      context.commit('addToCart', payload)
      resolve('添加一件新商品')
    }
   })
  }
}