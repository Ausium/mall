// const refresh = this.debound(this.$refs.scroll.refresh,50)

export function debound(func, delay) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }

}