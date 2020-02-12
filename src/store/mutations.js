import store from ".";

export default {
  // 相同商品数量叠加
  addProductCont(state,result) {
    result.cont++
  },
  // 添加新商品
  addProductPush(state,{payLoad}) {
    state.cartProduct.push(payLoad.obj)
  },
  // 全选
  checkboxStatus(state,payload) {
    if(state.cartProduct.length > 0) {
      let falg = !payload;
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
  },
  // 提交订单
  placeOrder(state) {
    for (let [index,value] of state.cartProduct.entries()) {
      if(value.checkout == true) {
        state.cartProduct.splice(index,1);
      }
    }
    console.log(state.cartProduct)
  }
}