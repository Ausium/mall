export default {
  //mutations唯一的目的是修改state中的状态
  //mutations中的每个方法完成的事情尽可能的单一一点
  addCount(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}