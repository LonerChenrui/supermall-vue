export default {
  // 购物车列表长度
  cartProductLength: (state,getters) => { 
    return state.cartProduct.length; 
  },
  // 提交订单的总个数
  cartOrderNum: (state,getters) => {
    return state.cartProduct.filter((filterVal)=>{
      return filterVal.checkout == true;
    })
    
  },
  // 购物车合计价格
  cartTotalPrice: (state,getters) => {
    console.log(getters.cartOrderNum.length)
    if(getters.cartProductLength > 0) {
      let result = getters.cartOrderNum.map((item,index)=>{
        return  item.price * item.cont;
      })
      .reduce((preValue,value) =>{
        return preValue + value
      },0)
      .toFixed(2);
      return result;
    }else {
      return 0.00
    }



      
  }
}