export default {
  addCart(context, payload) {
    
    // 1.方法一：
    // let oldProduct = null
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // 1.方法二：
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)


    if(oldProduct) {
      // oldProduct.count += 1
      context.commit('addCount',oldProduct)
      console.log(oldProduct.count);
    } else {
      payload.count = 1
      context.commit('addToCart', payload)
    }
  }
}