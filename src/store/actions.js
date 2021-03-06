export default {
  addCartProductInfo({state,commit},payLoad) {
    return new Promise((resolve,rejict) => {
      // 查找是否添加过相同的商品
      let result = state.cartProduct.find((item,index,arr)=>{
        return item.id === payLoad.obj.id
      });
      if(result) {
        commit('addProductCont',result)
      }else {
        commit({
          type: 'addProductPush',
          state,
          payLoad
        })
      };
      resolve('添加成功');
    })
  }
}