import store from ".";

export default {
  addProductCont(state,result) {
    result.cont++
  },
  addProductPush(state,{payLoad}) {
    state.cartProduct.push(payLoad.obj)
  },
  // 全选
  checkboxStatus(state,payload) {
    if(store.getters.cartProductLength > 0) {
      let falg = !payload.checkout;
      state.cartProduct = state.cartProduct.map((item) => {
        item.checkout = falg;
        return item
      })
    }
  },
  // 不全选
  singleStatus(state,payload) {
    let flag = true;
    state.cartProduct.forEach((item)=>{
      if(item.checkout === false) {
        flag = false
      }
    })
    state.isCheckout = flag;
  }
}